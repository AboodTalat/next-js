importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js");

workbox.routing.registerRoute(({ request }) => request.destination === "image", new workbox.strategies.CacheFirst());

const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = ["/", "/index.html", "/styles.css", "/script.js", "/images/icon.png"];

// // Install event
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// Fetch event to serve cached resources
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });

// Activate event to update the cache
// self.addEventListener("activate", (event) => {
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (!cacheWhitelist.includes(cacheName)) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

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
