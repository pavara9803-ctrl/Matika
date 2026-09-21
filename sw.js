// ============================================================
// Service Worker - Automatic Update Support
// ============================================================
var CACHE_NAME = 'matika-cache-v11';  // ✅ සෑම අප්ලෝඩ් එකකදීම මෙය පමණක් වෙනස් කරන්න
var urlsToCache = [
  './',
  './index.html',
  './tika-data.js',
  './duka-data.js',
  './suttanta-data.js',
  './sabbatika-data.js',
  './manifest.json',
  './launchericon-48x48.png',
  './launchericon-192x192.png',
  './launchericon-512x512.png'
];

// ============ INSTALL EVENT ============
self.addEventListener('install', function(event) {
  console.log('[SW] Installing new version:', CACHE_NAME);
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('[SW] Caching all files');
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.warn('[SW] Cache addAll failed:', error);
      })
  );
});

// ============ ACTIVATE EVENT ============
self.addEventListener('activate', function(event) {
  console.log('[SW] Activating new version:', CACHE_NAME);
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// ============ FETCH EVENT ============
self.addEventListener('fetch', function(event) {
  if (!event.request.url.startsWith('http')) return;

  var url = event.request.url;
  
  // HTML, JS සහ root සඳහා network-first
  if (url.endsWith('.html') || url.endsWith('.js') || 
      url.endsWith('/') || url.endsWith('.json')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then(function(response) {
          if (response && response.status === 200 && response.type === 'basic') {
            var responseToCache = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(function() {
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // අනෙකුත් (images, icons) සඳහා cache-first
  event.respondWith(
    caches.match(event.request).then(function(cachedResponse) {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then(function(networkResponse) {
        if (networkResponse && networkResponse.status === 200 && 
            networkResponse.type === 'basic') {
          var responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
    })
  );
});

// ============ MESSAGE EVENT ============
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
