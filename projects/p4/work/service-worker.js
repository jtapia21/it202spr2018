var cacheName = 'weatherPWA-step-6-1';
var filesToCache = [
  '/',
  '/projects/p4/work/index.html',
  '/projects/p4/work/scripts/app.js',
  '/projects/p4/work/styles/inline.css',
  '/projects/p4/work/images/clear.png',
  '/projects/p4/work/images/cloudy-scattered-showers.png',
  '/projects/p4/work/images/cloudy.png',
  '/projects/p4/work/images/fog.png',
  '/projects/p4/work/images/ic_add_white_24px.svg',
  '/projects/p4/work/images/ic_refresh_white_24px.svg',
  '/projects/p4/work/images/partly-cloudy.png',
  '/projects/p4/work/images/rain.png',
  '/projects/p4/work/images/scattered-showers.png',
  '/projects/p4/work/images/sleet.png',
  '/projects/p4/work/images/snow.png',
  '/projects/p4/work/images/thunderstorm.png',
  '/projects/p4/work/images/wind.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});