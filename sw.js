// sw.js - Service Worker for Offline Support
// දුක මාතිකා යෙදුම සඳහා නොබැඳි (Offline) සහාය

const CACHE_NAME = 'duka-matika-v3.2.1'; // ✅ අලුත් version
const OFFLINE_URL = './index.html';

// ============================================================
// ඔබගේ යෙදුමට අවශ්‍ය සියලුම ස්ථිතික ගොනු මෙහි ලැයිස්තුගත කරන්න
// ============================================================
const ASSETS_TO_CACHE = [
  // ප්‍රධාන ගොනු
  './',
  './index.html',
  './duka-matika.html',
  './manifest.json',

  // දුක මාතිකා App ගොනු
  './duka-app.js',

  // Gochhaka දත්ත ගොනු 13
  './gochhaka-01-hetu.js',
  './gochhaka-02-cullantara.js',
  './gochhaka-03-asava.js',
  './gochhaka-04-samyojana.js',
  './gochhaka-05-gantha.js',
  './gochhaka-06-ogha.js',
  './gochhaka-07-yoga.js',
  './gochhaka-08-nivarana.js',
  './gochhaka-09-paramasa.js',
  './gochhaka-10-mahantara.js',
  './gochhaka-11-upadana.js',
  './gochhaka-12-kilesa.js',
  './gochhaka-13-pitthi.js',

  // අනෙක් දත්ත ගොනු
  './sabbatika-data.js',
  './maggarammana-tika.js',
  './tika-data.js',
  './suttanta-data.js',

  // අයිකන ගොනු (ඔබගේ repository එකේ ඇති ඒවා පමණක්)
  './launchericon-48x48.png',
  './launchericon-72x72.png',
  './launchericon-96x96.png',
  './launchericon-144x144.png',
  './launchericon-192x192.png',
  './launchericon-512x512.png'

  // ⚠️ සටහන: CDN සම්පත් (Tailwind, Font Awesome, Google Fonts) මෙහි නොදාන්න.
  // ඒවා CORS නිසා cache කළ නොහැක. ඒවා offline වලදී load නොවේ.
  // Offline වලදී සම්පූර්ණයෙන්ම ක්‍රියා කිරීමට නම්, ඒවා local folder එකට ගෙන එන්න.
];

// ============================================================
// 1. INSTALL EVENT - සියලුම ගොනු Cache කිරීම
// ============================================================
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching all assets...');
        return Promise.all(
          ASSETS_TO_CACHE.map((url) => {
            return cache.add(url).catch((error) => {
              console.warn('[Service Worker] Failed to cache:', url, error.message);
            });
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Installation complete. Skipping waiting...');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] Installation failed:', error);
      })
  );
});

// ============================================================
// 2. ACTIVATE EVENT - පැරණි Cache ඉවත් කිරීම
// ============================================================
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              console.log('[Service Worker] Deleting old cache:', cache);
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activation complete. Claiming clients...');
        return self.clients.claim();
      })
  );
});

// ============================================================
// 3. FETCH EVENT - Offline විට Cache එකෙන් දත්ත ලබා දීම
// ============================================================
self.addEventListener('fetch', (event) => {
  // GET ඉල්ලීම් පමණක් handle කරන්න
  if (event.request.method !== 'GET') return;

  // http/https ඉල්ලීම් පමණක් handle කරන්න
  if (!event.request.url.startsWith('http')) return;

  // CDN සම්පත් සඳහා cache bypass කරන්න (offline වලදී මේවා load නොවේ)
  const url = event.request.url;
  if (url.includes('cdn.tailwindcss.com') ||
      url.includes('cdnjs.cloudflare.com') ||
      url.includes('fonts.googleapis.com') ||
      url.includes('fonts.gstatic.com')) {
    // CDN සම්පත් සඳහා network-first, offline නම් හිස් response
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response('', {
          status: 408,
          statusText: 'Offline - CDN resource not available'
        });
      })
    );
    return;
  }

  // දේශීය ගොනු සඳහා Cache-first strategy
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
      .then((cachedResponse) => {
        // 1. Cache එකේ තිබේ නම් එය ලබා දෙන්න
        if (cachedResponse) {
          return cachedResponse;
        }

        // 2. Cache එකේ නැත්නම් අන්තර්ජාලයෙන් ලබාගෙන, එය Cache කරන්න
        return fetch(event.request)
          .then((networkResponse) => {
            // අවලංගු ප්‍රතිචාර Cache නොකරන්න
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
              return networkResponse;
            }

            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });

            return networkResponse;
          })
          .catch((error) => {
            console.warn('[Service Worker] Fetch failed for:', event.request.url, error.message);

            // 3. Offline විට සහ Cache එකේ නොමැති විට
            //    HTML ඉල්ලීමක් නම් index.html ලබා දෙන්න
            if (event.request.headers.get('accept')?.includes('text/html')) {
              return caches.match(OFFLINE_URL);
            }

            // අනෙක් ගොනු සඳහා හිස් ප්‍රතිචාරයක් ලබා දෙන්න
            return new Response('', {
              status: 408,
              statusText: 'Offline - Resource not available'
            });
          });
      })
  );
});

// ============================================================
// 4. MESSAGE EVENT - SKIP_WAITING සහ අනෙකුත් පණිවිඩ
// ============================================================
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[Service Worker] Received SKIP_WAITING message');
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(event.data.urls);
      })
    );
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => caches.delete(cache))
        );
      })
    );
  }
});
