// ============================================================
// Service Worker - අභිධර්ම මාතිකා
// ============================================================

var CACHE_NAME = 'abhidhamma-matika-v2.12.0';

var CACHE_ASSETS = [
  './',
  './index.html',
  './Matika/index.html',
  './Matika/duka-matika.html',
  './Matika/duka-app.js',
  './Matika/gochhaka-01-hetu.js',
  './Matika/gochhaka-02-cullantara.js',
  './Matika/gochhaka-03-asava.js',
  './Matika/gochhaka-04-samyojana.js',
  './Matika/gochhaka-05-gantha.js',
  './Matika/gochhaka-06-ogha.js',
  './Matika/gochhaka-07-yoga.js',
  './Matika/gochhaka-08-nivarana.js',
  './Matika/gochhaka-09-paramasa.js',
  './Matika/gochhaka-10-mahantara.js',
  './Matika/gochhaka-11-upadana.js',
  './Matika/gochhaka-12-kilesa.js',
  './Matika/gochhaka-13-pitthi.js',
  './Matika/launchericon-48x48.png',
  './Matika/manifest.json'
];

// Install Event
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[Service Worker] Caching all assets...');
      return Promise.all(
        CACHE_ASSETS.map(function(url) {
          return cache.add(url).catch(function(error) {
            console.warn('[Service Worker] Failed to cache: ' + url, error);
            // එක් ගොනුවක් fail වුවත් අනෙක් ගොනු cache කිරීම දිගටම කරගෙන යන්න
          });
        })
      );
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache: ' + cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event
self.addEventListener('fetch', function(event) {
  var url = event.request.url;

  // External CDN සහ API cache නොකරන්න
  if (url.indexOf('cdn.tailwindcss.com') > -1 ||
      url.indexOf('cdnjs.cloudflare.com') > -1 ||
      url.indexOf('fonts.googleapis.com') > -1 ||
      url.indexOf('fonts.gstatic.com') > -1) {
    return; // Browser එකට සාමාන්‍ය ලෙස fetch කිරීමට ඉඩ දෙන්න
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request).catch(function() {
        // අන්තර්ජාලය නොමැති නම් cache එකෙන් ලබා දෙන්න
        return caches.match('./Matika/duka-matika.html');
      });
    })
  );
});
