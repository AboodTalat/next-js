"use client";
import { useEffect } from "react";
import { handler } from "@/pages/api/subscribe";

export default function Home() {
  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
  };


  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Proceed with subscription
      alert("Notification permission granted!");
      // Your subscription code goes here
    } else {
      alert("Notification permission denied.");
    }
  };
  
  // Inside your component
  return (
    <button onClick={requestNotificationPermission}>
      Enable Notifications
    </button>
  );
  



  useEffect(() => {
    if ("serviceWorker" in navigator) {
      alert("good")
      const key = urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY);
      alert("after good")
      navigator.serviceWorker.register("/sw.js").then(async (registration) => {
        alert("after after good")
        const permission = await Notification.requestPermission();
        alert("permission")
        if (permission === "granted") {
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: key,
          });
  
          alert(subscription)
  
          // Convert the PushSubscription to a plain object
          const plainSubscription = {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.getKey('p256dh') ? btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')))) : '',
              auth: subscription.getKey('auth') ? btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth')))) : ''
            }
          };
  
          // Send the plainSubscription to the server
          await handler(plainSubscription);
        }
      });
      alert("registered")
    }
  }, []);
  

  return <div><h1>Notification</h1></div>;
}
