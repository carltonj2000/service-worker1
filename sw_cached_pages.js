const cacheName = "v2";

const cacheAssets = [
  "index.html",
  "about.html",
  "/css/style.css",
  "/js/main.js"
];

self.addEventListener("install", e => {
  console.log("service worker installed");
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log("Service Worker: Caching files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  console.log("service worker activated");
  e.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== cacheName) {
              console.log("clearing cache", cache);
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("fetch", e => {
  console.log("fetching", e);
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
