// JavaScript File

// self.addEventListener('install', function(event) {
//     console.log("install", event);
// });

//with promise and installing it to the cache
self.addEventListener('install', function(e) {
  console.log('Install',e);
  e.waitUntil(
    caches.open("cache-simple").then(function(cache) {
      console.log('[ServiceWorker] Caching index.html');
      return cache.add("index.html");
    })
  );
});




self.addEventListener('activate', function(event) {
    console.log("activate", event);
});


self.addEventListener('fetch', function(e) {
    // log the event
    console.log('[Service Worker] Fetch', e);
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
});

