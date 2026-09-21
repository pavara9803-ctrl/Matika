// ============================================================
// Service Worker - Automatic Update Support
// ============================================================
var CACHE_NAME = 'matika-cache-v10';  // v8 සිට v9 දක්වා වැඩි කරන්න
var urlsToCache = [
  './',
  './index.html',
  './tika-data.js?v=10',       // ✅ ?v=10 එක්කරන්න
  './duka-data.js?v=10',       // ✅ ?v=10 එක්කරන්න
  './suttanta-data.js?v=10',   // ✅ ?v=10 එක්කරන්න
  './sabbatika-data.js?v=10',  // ✅ ?v=10 එක්කරන්න
  './manifest.json?v=10',      // ✅ ?v=10 එක්කරන්න
  './launchericon-48x48.png',
  './launchericon-192x192.png',
  './launchericon-512x512.png'
];

// ============ INSTALL EVENT ============
self.addEventListener('install', function(event) {
  console.log('[SW] Installing new version:', CACHE_NAME);
  // නව Service Worker එක ක්ෂණිකව සක්‍රීය කරන්න (පැරණි එක රැඳී නොසිටින්න)
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
      // සියලුම Clients (විවෘත ටැබ්) වෙත පණිවිඩය යවන්න
      return self.clients.claim();
    })
  );
});

// ============ FETCH EVENT (Network First, Fallback to Cache) ============
self.addEventListener('fetch', function(event) {
  // Chrome Extension වැනි දේ නොසලකා හරින්න
  if (!event.request.url.startsWith('http')) return;
  
  var url = event.request.url;
  
  // HTML, JS සහ root සඳහා network-first (cache bypass)
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
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request).then(function(networkResponse) {
        if (networkResponse && networkResponse.status === 200) {
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

// ============ 4. MESSAGE EVENT ============
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
