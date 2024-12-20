importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js");

workbox.routing.registerRoute(({ request }) => request.destination === "image", new workbox.strategies.CacheFirst());

const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = ["/", "/index.html", "/styles.css", "/script.js", "/images/icon.png"];

self.addEventListener("push", (event) => {
  let data = {};

  if (event.data) {
    data = event.data.json(); // Get the JSON data from the push notification
  }

  const title = data.title || "New message"; // Fallback title
  const options = {
    body: data.body || "You have a new message.", // Fallback message
    icon: "/icon.png", // URL to an icon for the notification
  };

  // Show the notification
  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Close the notification

  // You can open a specific URL or perform any action
  event.waitUntil(
    clients.openWindow("http://localhost:3000") // Open your app URL
  );
});
