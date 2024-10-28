if (!self.define) {
  let e,
    s = {};
  const n = (n, i) => (
    (n = new URL(n + ".js", i).href),
    s[n] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, t) => {
    const a = e || ("document" in self ? document.currentScript.src : "") || location.href;
    if (s[a]) return;
    let c = {};
    const o = (e) => n(e, a),
      r = { module: { uri: a }, exports: c, require: o };
    s[a] = Promise.all(i.map((e) => r[e] || o(e))).then((e) => (t(...e), c));
  };
}
define(["./workbox-4754cb34"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "/_next/app-build-manifest.json", revision: "9b4cfd3cb9222e9fe877911c666031e6" },
        { url: "/_next/static/V6hiQRTHK9kNEbt7mB3BZ/_buildManifest.js", revision: "c155cce658e53418dec34664328b51ac" },
        { url: "/_next/static/V6hiQRTHK9kNEbt7mB3BZ/_ssgManifest.js", revision: "b6652df95db52feb4daf4eca35380933" },
        { url: "/_next/static/chunks/117-d8fb6d5e23974fc4.js", revision: "V6hiQRTHK9kNEbt7mB3BZ" },
        { url: "/_next/static/chunks/680-c33902e80f7d0347.js", revision: "V6hiQRTHK9kNEbt7mB3BZ" },
        { url: "/_next/static/chunks/app/_not-found/page-fe9fc664026166c6.js", revision: "V6hiQRTHK9kNEbt7mB3BZ" },
        { url: "/_next/static/chunks/app/layout-bc315ae1cdb82ee5.js", revision: "V6hiQRTHK9kNEbt7mB3BZ" },
        { url: "/_next/static/chunks/app/page-b84c0c5c63b0dc5e.js", revision: "V6hiQRTHK9kNEbt7mB3BZ" },
        { url: "/_next/static/chunks/app/webSocketRooms/admin/page-073a23c30475c358.js", revision: "V6hiQRTHK9kNEbt7mB3BZ" },
        { url: "/_next/static/chunks/app/webSocketRooms/customer/layout-cf77d38100321599.js", revision: "V6hiQRTHK9kNEbt7mB3BZ" },
        { url: "/_next/static/chunks/app/webSocketRooms/customer/page-d4b1304b0df54a65.js", revision: "V6hiQRTHK9kNEbt7mB3BZ" },
        { url: "/_next/static/chunks/fd9d1056-596a8d76c47695b1.js", revision: "V6hiQRTHK9kNEbt7mB3BZ" },
        { url: "/_next/static/chunks/framework-f66176bb897dc684.js", revision: "V6hiQRTHK9kNEbt7mB3BZ" },
        { url: "/_next/static/chunks/main-app-e4e6f38907a1cdad.js", revision: "V6hiQRTHK9kNEbt7mB3BZ" },
        { url: "/_next/static/chunks/main-d1af7734b4d26f4c.js", revision: "V6hiQRTHK9kNEbt7mB3BZ" },
        { url: "/_next/static/chunks/pages/_app-72b849fbd24ac258.js", revision: "V6hiQRTHK9kNEbt7mB3BZ" },
        { url: "/_next/static/chunks/pages/_error-7ba65e1336b92748.js", revision: "V6hiQRTHK9kNEbt7mB3BZ" },
        { url: "/_next/static/chunks/polyfills-42372ed130431b0a.js", revision: "846118c33b2c0e922d7b3a7676f81f6f" },
        { url: "/_next/static/chunks/webpack-246877f281bea89d.js", revision: "V6hiQRTHK9kNEbt7mB3BZ" },
        { url: "/_next/static/css/e79071167a953b64.css", revision: "e79071167a953b64" },
        { url: "/_next/static/media/4473ecc91f70f139-s.p.woff", revision: "78e6fc13ea317b55ab0bd6dc4849c110" },
        { url: "/_next/static/media/463dafcda517f24f-s.p.woff", revision: "cbeb6d2d96eaa268b4b5beb0b46d9632" },
        { url: "/apple-touch-icon.png", revision: "0b203b6ccd580b27f08ebdd9832b0a62" },
        { url: "/favicon-48x48.png", revision: "ba6031a7e4067aff05a9b415a0225586" },
        { url: "/favicon.ico", revision: "b96706cf00830ff3a405ae4287795666" },
        { url: "/favicon.svg", revision: "6c5d85c56021d179b46234908300b8c2" },
        { url: "/icon.png", revision: "2bede9d3786538080858fecc20fb2db5" },
        { url: "/icon512_maskable copy.png", revision: "c98b524e14b47a746ea6602da6f4d3b2" },
        { url: "/icon512_maskable.png", revision: "c98b524e14b47a746ea6602da6f4d3b2" },
        { url: "/icon512_rounded copy.png", revision: "b2893e92bad839c4c1499b574a8d7940" },
        { url: "/icon512_rounded.png", revision: "b2893e92bad839c4c1499b574a8d7940" },
        { url: "/manifest.json", revision: "ed945e6b80faef3dec784ffe4adcfef7" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: n, state: i }) =>
              s && "opaqueredirect" === s.type ? new Response(s.body, { status: 200, statusText: "OK", headers: s.headers }) : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({ cacheName: "google-fonts-webfonts", plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })] }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({ cacheName: "google-fonts-stylesheets", plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })] }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({ cacheName: "static-font-assets", plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })] }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({ cacheName: "static-image-assets", plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })] }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({ cacheName: "next-image", plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })] }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({ cacheName: "static-audio-assets", plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({ cacheName: "static-video-assets", plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({ cacheName: "static-js-assets", plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({ cacheName: "static-style-assets", plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({ cacheName: "next-data", plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({ cacheName: "static-data-assets", plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({ cacheName: "apis", networkTimeoutSeconds: 10, plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })] }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({ cacheName: "others", networkTimeoutSeconds: 10, plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({ cacheName: "cross-origin", networkTimeoutSeconds: 10, plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })] }),
      "GET"
    );
});


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