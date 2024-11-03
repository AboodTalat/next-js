import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

let socket; // Keep socket outside the component

export default function AdminChat() {
  const [customers, setCustomers] = useState([]);
  const [activeCustomer, setActiveCustomer] = useState(null);
  const [chatHistory, setChatHistory] = useState({});
  const [message, setMessage] = useState("");
  const chatEndRef = useRef(null); // Reference for scrolling

  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
  };

  async function initPushNotifications() {
    const registration = await navigator?.serviceWorker?.register("/sw.js");
    console.log("Service Worker registered:", registration);


    if ("Notification" in window) {
      // Request notification permission
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        console.log("Notification permission granted.");
        const existingSubscription = await registration?.pushManager?.getSubscription();
        if (existingSubscription) {
          console.log("Existing subscription:", existingSubscription);
          // Handle existing subscription (update or use it)
        } else {
          await subscribeToPushNotifications(registration);
        }
      } else {
        console.error("Notification permission denied.");
      }
    } else {
      alert("can't notify");
    }
  }

  async function subscribeToPushNotifications(registration) {
    const applicationServerKey = urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY);

    try {
      console.log("object")
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey,
      });
      console.log("after")

      console.log("Push subscription:", subscription);

      // Send the subscription to your server
      await fetch("https://ca19-176-29-239-171.ngrok-free.app/api/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Failed to subscribe to push notifications:", error);
    }
  }

  useEffect(() => {
    initPushNotifications();
  }, []);

  const handleNewCustomerMessage = (data) => {
    // Update chat history for the specific customer
    setChatHistory((prevChatHistory) => {
      const customerChat = prevChatHistory[data.customerId] || [];

      if (customerChat[customerChat.length - 1]?.uniqueID === data?.uniqueID) {
        return prevChatHistory; // Prevent duplicate messages
      }

      return {
        ...prevChatHistory,
        [data.customerId]: [
          ...customerChat,
          {
            message: data.message,
            from: data.name,
            createdAt: new Date().toISOString(),
            uniqueID: data.uniqueID,
          },
        ],
      };
    });

    // Update the customer list
    setCustomers((prevCustomers) => {
      const existingCustomerIndex = prevCustomers.findIndex((customer) => customer.customerId === data.customerId);

      let updatedCustomers;

      if (existingCustomerIndex !== -1) {
        // Customer exists, update their last message
        updatedCustomers = prevCustomers.map((customer) =>
          customer.customerId === data.customerId ? { ...customer, lastMessage: data.message, unreadCount: (customer.unreadCount || 0) + 1 } : customer
        );
      } else {
        // Customer doesn't exist, add a new entry
        updatedCustomers = [
          ...prevCustomers,
          {
            customerId: data.customerId,
            customerName: data.name,
            lastMessage: data.message,
            unreadCount: 1, // New customer, so assume 1 unread message
          },
        ];
      }

      // Move the customer with the new message to the top of the list
      const sortedCustomers = [...updatedCustomers.filter((c) => c.customerId === data.customerId), ...updatedCustomers.filter((c) => c.customerId !== data.customerId)];

      return sortedCustomers;
    });
  };

  const socketInitializer = async () => {
    console.log("Socket initializer called");

    // await fetch("/api/socket");
    socket = io("https://ca19-176-29-239-171.ngrok-free.app");

    // Join admin room
    socket.emit("joinAdmin");

    // Clear previous listeners to prevent duplicates
    socket.off("allCustomersChatHistory");
    socket.off("newCustomerMessage");

    // Listen for all customers and their chat histories
    socket.on("allCustomersChatHistory", (data) => {
      const history = {};

      const customerList = data.map((customer) => {
        // Ensure the messages are sorted by `createdAt` in ascending order
        const sortedMessages = [...customer.messages].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        // Populate the chat history with sorted messages
        history[customer.customerId] = sortedMessages.map((msg) => ({
          message: msg.message,
          from: msg.fromAdmin ? "Admin" : customer.customerName,
          createdAt: msg.createdAt,
        }));

        return {
          customerId: customer.customerId,
          customerName: customer.customerName,
          lastMessage: sortedMessages[sortedMessages.length - 1]?.message || "",
          unreadCount: customer.unreadCount,
        };
      });

      setCustomers(customerList);
      setChatHistory(history);
    });

    // Listen for new customer messages
    socket.on("newCustomerMessage", handleNewCustomerMessage);
  };

  useEffect(() => {
    console.log("Component mounted");

    socketInitializer(); // Call the initializer

    // Cleanup the socket on unmount
  }, []);

  const selectCustomer = (customerId, index) => {
    setActiveCustomer(customerId);
    socket.emit("customerClicked", { customerId: customerId });

    setCustomers((prevState) => {
      return prevState.map((customer, i) => {
        if (i === index) {
          return {
            ...customer,
            unreadCount: 0,
          };
        }
        return customer;
      });
    });
  };

  const sendMessage = () => {
    if (activeCustomer) {
      socket.emit("adminMessage", { customerId: activeCustomer, message });
      setChatHistory((prevChatHistory) => {
        const customerChat = prevChatHistory[activeCustomer] || [];
        return { ...prevChatHistory, [activeCustomer]: [...customerChat, { message, from: "Admin" }] };
      });

      // Move the active customer to the top of the list after admin sends a message
      setCustomers((prevCustomers) => {
        const existingCustomerIndex = prevCustomers.findIndex((customer) => customer.customerId === activeCustomer);
        if (existingCustomerIndex >= 0) {
          const updatedCustomer = { ...prevCustomers[existingCustomerIndex], lastMessage: message };
          const updatedCustomers = prevCustomers.filter((_, idx) => idx !== existingCustomerIndex);
          const newCustomers = [updatedCustomer, ...updatedCustomers];
          console.log("Customers after sending message:", newCustomers);
          return newCustomers;
        } else {
          return prevCustomers;
        }
      });

      setMessage("");
    }
  };

  // Scroll to the bottom of the chat area
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, activeCustomer]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col md:flex-row">
      <button onClick={() => initPushNotifications()}>push notify</button>
      {/* Customer List Section */}
      <div className="md:w-1/3 bg-white p-4 rounded-lg shadow-md md:mr-4 mb-4 md:mb-0">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Customers</h2>
        {customers.map((customer, index) => (
          <div key={index} className="mb-2 flex items-center">
            <button className="w-full text-left p-2 bg-gray-200 hover:bg-gray-300 rounded-md" onClick={() => selectCustomer(customer.customerId, index)}>
              {customer.customerName} (Last Message: {customer.lastMessage})
            </button>
            {/* Badge for new messages */}
            {customer?.unreadCount > 0 ? <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-2">New</span> : ""}
          </div>
        ))}
      </div>
      {/* Chat Section that spans the remaining space */}
      <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
        {activeCustomer ? (
          <>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Chat with {customers.find((c) => c.customerId === activeCustomer)?.customerName}</h2>
            <div className="flex-1 max-h-[500px] overflow-y-auto bg-gray-50 shadow-md rounded-lg p-4 mb-4">
              {chatHistory[activeCustomer]?.map((msg, index) => (
                <div key={index} className={`p-2 flex ${msg.from === "Admin" ? "justify-end" : "justify-start"}`}>
                  <div className={`p-2 rounded-lg ${msg.from === "Admin" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                    <strong>{msg.from}: </strong>
                    {msg.message}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} /> {/* Scroll to this element */}
            </div>
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-l-lg"
                placeholder="Type your message here..."
              />
              <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600">
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="text-gray-500">Select a customer to start chatting.</div>
        )}
      </div>
    </div>
  );
}
