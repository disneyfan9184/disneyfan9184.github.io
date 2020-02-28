const cacheName = 'v2';

// Install service workers
self.addEventListener('install', event => {
  console.log('service worker installed');
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
    fetch(event.request)
      .then(res => {
        // Make copy/clone of response
        const resClone = res.clone();
        // Open cache
        caches.open(cacheName).then(cache => {
          // Add response to cache
          cache.put(event.request, resClone);
        });
        return res;
      })
      .catch(error => caches.match(event.request).then(res => res))
  );
});
