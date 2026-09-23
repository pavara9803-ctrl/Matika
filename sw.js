// sw.js - Service Worker for Offline Support
// අභිධර්ම මාතිකා අධ්‍යයන යෙදුම සඳහා නොබැඳි (Offline) සහාය

const CACHE_NAME = 'abhidhamma-matika-v2.9.1'; // v1.0.7 සිට v1.0.8 දක්වා යාවත්කාලීන කර ඇත
const OFFLINE_URL = './index.html';

// ============================================================
// ඔබගේ යෙදුමට අවශ්‍ය සියලුම ස්ථිතික ගොනු මෙහි ලැයිස්තුගත කරන්න
// ============================================================
const ASSETS_TO_CACHE = [
  // ප්‍රධාන ගොනු
  './',
  './index.html',
  './manifest.json',

  // දත්ත ගොනු (sabbatika-data.js පළමුව - එහි helper functions ඇත)
  './sabbatika-data.js',
  './maggarammana-tika.js', 
  './tika-data.js',
  './duka-data.js',
  './suttanta-data.js',

  // අයිකන ගොනු (index.html හි භාවිතා කරන නම් වලට ගැලපෙන පරිදි)
  './launchericon-48x48.png',
  './launchericon-72x72.png',
  './launchericon-96x96.png',
  './launchericon-144x144.png',
  './launchericon-192x192.png',
  './launchericon-256x256.png',
  './launchericon-384x384.png',
  './launchericon-512x512.png',

  // Tailwind CSS සහ Font Awesome CDN ලින්ක්ස්
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-regular-400.woff2',
  'https://fonts.googleapis.com/css2?family=Noto+Serif+Sinhala:wght@400;600;700&display=swap'
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
        // addAll අසාර්ථක වුවද යෙදුම ක්‍රියාත්මක වන පරිදි එක් එක් ගොනුව වෙන් වෙන්ව Cache කරන්න
        return Promise.all(
          ASSETS_TO_CACHE.map((url) => {
            return cache.add(url).catch((error) => {
              console.warn('[Service Worker] Failed to cache:', url, error);
            });
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Installation complete. Skipping waiting...');
        return self.skipWaiting(); // නව Service Worker එක වහාම සක්‍රීය කරන්න
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
        return self.clients.claim(); // සියලුම clients පාලනය කරන්න
      })
  );
});

// ============================================================
// 3. FETCH EVENT - Offline විට Cache එකෙන් දත්ත ලබා දීම
// ============================================================
self.addEventListener('fetch', (event) => {
  // අපි ඉල්ලීම් සිදු කරන්නේ GET වලට පමණි
  if (event.request.method !== 'GET') return;

  // chrome-extension වැනි ඉල්ලීම් මඟ හරින්න
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
      .then((cachedResponse) => {
        // 1. Cache එකේ තිබේ නම් එය ලබා දෙන්න (Network-first සහ Cache-first මිශ්‍ර)
        //    - HTML නම් Network-first, අනෙක්වා Cache-first
        const isHTML = event.request.headers.get('accept')?.includes('text/html');

        if (isHTML) {
          // HTML සඳහා Network-first (නවතම අන්තර්ගතය ලබා ගැනීමට)
          return fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              }
              return networkResponse;
            })
            .catch(() => {
              // Offline නම් Cache එකෙන් ලබා දෙන්න
              return cachedResponse || caches.match(OFFLINE_URL);
            });
        }

        // අනෙක් ගොනු සඳහා Cache-first
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
            console.warn('[Service Worker] Fetch failed for:', event.request.url, error);

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