const cacheName = "v1";

self.addEventListener("install", e => {
  console.log("service worker installed");
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
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const resClone = res.clone();
        caches.open(cacheName).then(cache => {
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(err => caches.match(e.request).then(res => res))
  );
});
