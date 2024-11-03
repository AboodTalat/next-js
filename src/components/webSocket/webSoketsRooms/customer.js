import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

let socket;

export default function CustomerChat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [name, setName] = useState("");
  const [entered, setEntered] = useState(false);
  const chatEndRef = useRef(null); // Ref to track the last message

  useEffect(() => {
    if (customerId) {
      socketInitializer();
    }
  }, [customerId]);

  // Function to scroll to the last message
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Scroll to the last message whenever chat changes
    scrollToBottom();
  }, [chat]);

  const socketInitializer = async () => {
    socket = io("https://ca19-176-29-239-171.ngrok-free.app/");
    console.log(socket)
    socket.emit("joinCustomer", { customerId, customerName: name });

    socket.on("previousChatHistory", (messages) => {
      const formattedMessages = messages.map((msg) => ({
        message: msg.message,
        fromAdmin: msg.fromAdmin,
        customerName: msg.Customer.name,
      }));
      setChat((prevChat) => [...prevChat, ...formattedMessages]);
    });

    socket.on("newAdminMessage", (data) => {
      setChat((prevChat) => [...prevChat, { message: data.message, fromAdmin: true }]);
    });
  };

  const startChat = () => {
    const id = uuidv4();
    setCustomerId(id);
    setEntered(true);
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("customerMessage", { customerId, message, name });

      setChat((prevChat) => [...prevChat, { message, fromAdmin: false, customerName: name }]);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Customer Chat</h1>
      {!entered && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <input type="text" placeholder="Enter Your Name" className="w-full p-2 border rounded-md mb-4" onChange={(e) => setName(e.target.value)} />
          <button onClick={startChat} className="w-full py-2 bg-blue-600 text-white rounded-md">
            Start Chat
          </button>

          <a href="/webSocketRooms/admin" >go to admin</a>
        </div>
      )}
      {entered && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-full mx-auto">
          <div className="mb-4 max-h-[60vh] overflow-y-auto space-y-4">
            {chat.map((msg, index) => (
              <div key={index} className={`flex ${msg.fromAdmin ? "justify-start" : "justify-end"}`}>
                <div className={`p-2 rounded-lg shadow-md max-w-xs ${msg.fromAdmin ? "bg-gray-300 text-left" : "bg-blue-600 text-white text-right"}`}>
                  <strong>{msg.fromAdmin ? "Admin" : msg.customerName}:</strong> {msg.message}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} /> {/* Empty div to track the last message */}
          </div>
          <div className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-2 border rounded-md"
              placeholder="Type your message..."
            />
            <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
