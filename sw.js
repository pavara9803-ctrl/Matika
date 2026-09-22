// sw.js - Service Worker for Offline Support

const CACHE_NAME = 'abhidhamma-matika-v2'; // 1 සිට 2 දක්වා යාවත්කාලීන කර ඇත //

// ඔබගේ යෙදුමට අවශ්‍ය සියලුම ස්ථිතික ගොනු මෙහි ලැයිස්තුගත කරන්න
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './tika-data.js',
  './duka-data.js',
  './suttanta-data.js',
  './sabbatika-data.js',
  // ඔබ භාවිතා කරන අයිකන ගොනු (උදා: 72.png, 96.png, etc.)
  './72.png',
  './96.png',
  './128.png',
  './144.png',
  './152.png',
  './192.png',
  './256.png',
  './512.png',
  // Tailwind CSS සහ Font Awesome CDN ලින්ක්ස්
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Noto+Serif+Sinhala:wght@400;600;700&display=swap'
];

// 1. Install Event - සියලුම ගොනු Cache කිරීම
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching all assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting()) // නව Service Worker එක වහාම සක්‍රීය කරන්න
  );
});

// 2. Activate Event - පැරණි Cache ඉවත් කිරීම
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // සියලුම clients පාලනය කරන්න
  );
});

// 3. Fetch Event - Offline විට Cache එකෙන් දත්ත ලබා දීම
self.addEventListener('fetch', (event) => {
  // අපි ඉල්ලීම් සිදු කරන්නේ GET වලට පමණි
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // 1. Cache එකේ තිබේ නම් එය ලබා දෙන්න
        if (cachedResponse) {
          return cachedResponse;
        }

        // 2. Cache එකේ නැත්නම් අන්තර්ජාලයෙන් ලබාගෙන, එය Cache කරන්න
        return fetch(event.request).then((networkResponse) => {
          // අවලංගු ප්‍රතිචාර Cache නොකරන්න
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        }).catch(() => {
          // 3. අන්තර්ජාලය නොමැති විට සහ Cache එකේ නොමැති විට
          // ඔබට අවශ්‍ය නම් offline.html වැනි පිටුවක් පෙන්විය හැක.
          // උදා: return caches.match('./offline.html');
        });
      })
  );
});
