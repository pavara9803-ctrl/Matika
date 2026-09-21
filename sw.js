// ============================================================
// Service Worker - Automatic Update Support
// ============================================================
var CACHE_NAME = 'matika-cache-v7';  // v6 සිට v7 දක්වා වැඩි කරන්න
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
  
  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        // අන්තර්ජාලයෙන් ලැබුණු නව දත්ත Cache එකට එක් කරන්න
        if (response && response.status === 200 && response.type === 'basic') {
          var responseToCache = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(function() {
        // අන්තර්ජාලය නොමැති නම් Cache එකෙන් ලබා දෙන්න
        return caches.match(event.request);
      })
  );
});

// ============ MESSAGE EVENT (Update Notification) ============
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
