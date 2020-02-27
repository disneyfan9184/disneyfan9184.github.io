const cacheName = 'v1';
const cacheAssets = [
  'index.html',
  'about.html',
  '/css/styles.css',
  '/js/main.js'
];

// Install service worker
self.addEventListener('install', event => {
  console.log('service worker installed');
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service worker: caching files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  console.log('service worker activated');
  // Remove old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('service worker: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
// Call fetch event
self.addEventListener('fetch', event => {
  console.log('service worker: fetching');
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
