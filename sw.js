// ============================================================
// sw.js - Service Worker for Offline Support
// අභිධර්ම මාතිකා අධ්‍යයන යෙදුම සඳහා නොබැඳි (Offline) සහාය
// Version: 9.1.0
// ============================================================

const CACHE_NAME = 'abhidhamma-matika-v9.1.0';
const OFFLINE_URL = './index.html';

// ============================================================
// යෙදුමට අවශ්‍ය සියලුම ස්ථිතික ගොනු
// ============================================================
const ASSETS_TO_CACHE = [
  // ========== ප්‍රධාන ගොනු ==========
  './',
  './index.html',
  './manifest.json',

  // ========== සතර පරමාර්ථ ==========
  './paramatta.html',

  // ========== දත්ත ගොනු ==========
  './sabbatika-data.js',
  './tika-data.js',
  './duka-data.js',
  './suttanta-data.js',
  './tika-app.js',
  './duka-app.js',
  './suttanta-app.js',

  // ========== HTML ගොනු (root) ==========
  './tika-matika.html',
  './duka-matika.html',
  './suttanta-matika.html',

  // ========== චෛතසික ගොනු (caitasika folder) ==========
  './caitasika/caitasika.html',
  './caitasika/caitasika.js',
  './caitasika/samprayoga.js',

  // ========== චිත්ත ගොනු (Citta folder) ==========
  './Citta/citta.html',
  './Citta/citta.js',

  // ========== රූප ගොනු (Rupa folder) ==========
  './Rupa/rupa.html',
  './Rupa/rupa.js',

  // ========== නිබ්බාන ගොනු (nibbana folder) ==========
  './nibbana/nibbana.html',
  './nibbana/nibbana.js',

  // ========== තික ගොනු 22 (tika folder) ==========
  './tika/01-kusala-tika.js',
  './tika/02-vedana-tika.js',
  './tika/03-vipaka-tika.js',
  './tika/04-upadinnna-tika.js',
  './tika/05-sankilittha-tika.js',
  './tika/06-vitakka-tika.js',
  './tika/07-piti-tika.js',
  './tika/08-dassana-tika.js',
  './tika/09-dassanahetu-tika.js',
  './tika/10-avayagami-tika.js',
  './tika/11-sekha-tika.js',
  './tika/12-paritta-tika.js',
  './tika/13-parittarammana-tika.js',
  './tika/14-hina-tika.js',
  './tika/15-micchatta-tika.js',
  './tika/16-maggarammana-tika.js',
  './tika/17-uppanna-tika.js',
  './tika/18-atita-tika.js',
  './tika/19-atitarammana-tika.js',
  './tika/20-ajjhatta-tika.js',
  './tika/21-ajjhattarammana-tika.js',
  './tika/22-sanidassana-tika.js',

  // ========== දුක ගොනු 13 (js/duka folder) ==========
  './js/duka/gochhaka-01-hetu.js',
  './js/duka/gochhaka-02-cullantara.js',
  './js/duka/gochhaka-03-asava.js',
  './js/duka/gochhaka-04-samyojana.js',
  './js/duka/gochhaka-05-gantha.js',
  './js/duka/gochhaka-06-ogha.js',
  './js/duka/gochhaka-07-yoga.js',
  './js/duka/gochhaka-08-nivarana.js',
  './js/duka/gochhaka-09-paramasa.js',
  './js/duka/gochhaka-10-mahantara.js',
  './js/duka/gochhaka-11-upadana.js',
  './js/duka/gochhaka-12-kilesa.js',
  './js/duka/gochhaka-13-pitthi.js',

  // ========== අයිකන ගොනු ==========
  './launchericon-48x48.png',
  './launchericon-192x192.png',
  './launchericon-512x512.png',
  './screenshot1.png'
];

// ============================================================
// CDN සම්පත් (Optional - අසාර්ථක වුවද යෙදුම ක්‍රියාත්මක වේ)
// ============================================================
const CDN_ASSETS = [
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-regular-400.woff2',
  'https://fonts.googleapis.com/css2?family=Noto+Serif+Sinhala:wght@400;600;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// ============================================================
// 1. INSTALL EVENT - සියලුම ගොනු Cache කිරීම
// ============================================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing version ' + CACHE_NAME + '...');
  
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      
      // ප්‍රධාන ගොනු - අසාර්ථක වුවත් අනෙක්වා දිගටම කරන්න
      console.log('[SW] Caching local assets...');
      const localResults = await Promise.allSettled(
        ASSETS_TO_CACHE.map((url) => 
          cache.add(url).catch((err) => {
            console.warn('[SW] Failed to cache (local):', url, err.message);
          })
        )
      );
      
      // CDN සම්පත් - අසාර්ථක වුවත් ගණන් නොගන්න
      console.log('[SW] Caching CDN assets...');
      await Promise.allSettled(
        CDN_ASSETS.map((url) => 
          cache.add(url).catch((err) => {
            console.warn('[SW] Failed to cache (CDN):', url, err.message);
          })
        )
      );
      
      const successCount = localResults.filter(r => r.status === 'fulfilled').length;
      console.log('[SW] Cached ' + successCount + '/' + ASSETS_TO_CACHE.length + ' local assets');
      
      // නව Service Worker එක වහාම සක්‍රීය කරන්න
      await self.skipWaiting();
      console.log('[SW] Installation complete.');
    })()
  );
});

// ============================================================
// 2. ACTIVATE EVENT - පැරණි Cache ඉවත් කිරීම
// ============================================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    (async () => {
      // පැරණි cache ඉවත් කරන්න
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
      
      // සියලුම clients පාලනය කරන්න
      await self.clients.claim();
      console.log('[SW] Activation complete.');
    })()
  );
});

// ============================================================
// 3. FETCH EVENT - Offline විට Cache එකෙන් දත්ත ලබා දීම
// ============================================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // GET ඉල්ලීම් පමණක් හසුරුවන්න
  if (request.method !== 'GET') return;
  
  // http/https ඉල්ලීම් පමණක් හසුරුවන්න
  if (!request.url.startsWith('http')) return;
  
  // Chrome extension සහ අනෙකුත් non-http ඉල්ලීම් මඟ හරින්න
  const url = new URL(request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // HTML navigation ඉල්ලීම් - Network-first
  const isHTMLNavigation = request.mode === 'navigate' || 
    (request.headers.get('accept') || '').includes('text/html');

  if (isHTMLNavigation) {
    event.respondWith(handleHTMLRequest(request));
    return;
  }

  // අනෙක් සම්පත් - Cache-first with network fallback
  event.respondWith(handleAssetRequest(request));
});

// ============================================================
// HTML ඉල්ලීම් සඳහා - Network-first strategy
// ============================================================
async function handleHTMLRequest(request) {
  try {
    // අන්තර්ජාලයෙන් ලබා ගැනීමට උත්සාහ කරන්න
    const networkResponse = await fetch(request);
    
    // සාර්ථක නම් cache එකේ save කරන්න
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Offline නම් cache එකෙන් ලබා දෙන්න
    console.log('[SW] Network failed for HTML, using cache:', request.url);
    
    const cachedResponse = await caches.match(request, { ignoreSearch: true });
    if (cachedResponse) return cachedResponse;
    
    // Cache එකේ නැත්නම් offline page එක ලබා දෙන්න
    const offlinePage = await caches.match(OFFLINE_URL);
    if (offlinePage) return offlinePage;
    
    // කිසිවක් නැත්නම් error response එකක්
    return new Response(
      '<html><body style="font-family:sans-serif;text-align:center;padding:2rem;">' +
      '<h1>නොබැඳි තත්ත්වයේ සිටී</h1>' +
      '<p>කරුණාකර අන්තර්ජාල සම්බන්ධතාවය පරීක්ෂා කරන්න.</p>' +
      '</body></html>',
      { 
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      }
    );
  }
}

// ============================================================
// අනෙක් සම්පත් සඳහා - Cache-first strategy
// ============================================================
async function handleAssetRequest(request) {
  try {
    // මුලින්ම cache එකේ බලන්න
    const cachedResponse = await caches.match(request, { ignoreSearch: true });
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Cache එකේ නැත්නම් අන්තර්ජාලයෙන් ලබා ගන්න
    const networkResponse = await fetch(request);
    
    // සාර්ථක ප්‍රතිචාර පමණක් cache කරන්න
    if (networkResponse && 
        networkResponse.status === 200 && 
        networkResponse.type !== 'opaque') {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('[SW] Fetch failed:', request.url, error.message);
    
    // Offline සහ cache එකේ නැති විට
    return new Response('', {
      status: 408,
      statusText: 'Offline - Resource not available'
    });
  }
}

// ============================================================
// 4. MESSAGE EVENT - SKIP_WAITING සහ අනෙකුත් පණිවිඩ
// ============================================================
self.addEventListener('message', (event) => {
  if (!event.data) return;
  
  const { type, urls } = event.data;
  
  // නව Service Worker එක වහාම සක්‍රීය කරන්න
  if (type === 'SKIP_WAITING') {
    console.log('[SW] Received SKIP_WAITING message');
    self.skipWaiting();
    return;
  }
  
  // නිශ්චිත URL cache කරන්න
  if (type === 'CACHE_URLS' && Array.isArray(urls)) {
    console.log('[SW] Caching requested URLs:', urls.length);
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return Promise.allSettled(
          urls.map((url) => 
            cache.add(url).catch((err) => {
              console.warn('[SW] Failed to cache:', url, err.message);
            })
          )
        );
      })
    );
    return;
  }
  
  // සියලුම cache ඉවත් කරන්න
  if (type === 'CLEAR_CACHE') {
    console.log('[SW] Clearing all caches...');
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(cacheNames.map((cache) => caches.delete(cache)));
      }).then(() => {
        console.log('[SW] All caches cleared.');
      })
    );
    return;
  }
  
  // Cache තොරතුරු ලබා දෙන්න (debug සඳහා)
  if (type === 'GET_CACHE_INFO') {
    event.waitUntil(
      caches.keys().then((names) => {
        console.log('[SW] Cache names:', names);
      })
    );
  }
});

// ============================================================
// 5. ERROR HANDLING - Global error handler
// ============================================================
self.addEventListener('error', (event) => {
  console.error('[SW] Global error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('[SW] Unhandled promise rejection:', event.reason);
});