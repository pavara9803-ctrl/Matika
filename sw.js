// ============================================================
// sw.js - Service Worker for Offline Support
// Version: 23.0.0 (js/css/json network-first; නව අනුවාදය සක්‍රිය වන්නේ පරිශීලකයා යාවත්කාලීන කිරීමට එබූ විට පමණි)
// ============================================================

// precache-manifest.js (generate-precache.js මගින් සාදයි) - සියලු ගොනු ස්වයංක්‍රීයව ඇතුළත් කරයි
try { importScripts('./precache-manifest.js'); } catch (e) { console.warn('[SW] precache-manifest.js not found - using static list only'); }
const CACHE_NAME = 'abhidhamma-matika-' + (self.PRECACHE_VERSION || 'v28.0.0');
const OFFLINE_URL = './index.html';

// ============================================================
// යෙදුමට අවශ්‍ය සියලුම ස්ථිතික ගොනු
// ============================================================
const ASSETS_TO_CACHE = [
  // ප්‍රධාන ගොනු — අනෙක් සියලු ගොනු precache-manifest.js (tools/generate-precache.js) මගින් ස්වයංක්‍රීයව එක් වේ
  './',
  './index.html',
  './about.html',
  './privacy.html',
  './manifest.json',
  './assets/css/matika-ui.css',
  './assets/js/matika-ui.js',
  './assets/js/matika-theme.js',
  './assets/js/app.js',
  './assets/js/vendor/tailwind.min.js',
];

const ALL_ASSETS = Array.from(new Set(ASSETS_TO_CACHE.concat(self.PRECACHE_URLS || [])));

// ============================================================
// CDN සම්පත් (අසාර්ථක වුවද යෙදුම ක්‍රියාත්මක වේ)
// ============================================================
const CDN_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Noto+Serif+Sinhala:wght@400;600;700&display=swap',
];

// ============================================================
// 1. INSTALL EVENT
// ============================================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing version ' + CACHE_NAME + '...');
  
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      
      console.log('[SW] Caching local assets...');
      await Promise.allSettled(
        ALL_ASSETS.map((url) => 
          cache.add(new Request(url, { cache: 'reload' })).catch((err) => {
            console.warn('[SW] Failed to cache (local):', url, err.message);
          })
        )
      );
      
      console.log('[SW] Caching CDN assets...');
      await Promise.allSettled(
        CDN_ASSETS.map((url) => 
          cache.add(url).catch((err) => {
            console.warn('[SW] Failed to cache (CDN):', url, err.message);
          })
        )
      );
      
      // skipWaiting() මෙතැන කැඳවන්නේ නැත — පරිශීලකයා "යාවත්කාලීන කරන්න" එබූ විට
      // sw-update.js මගින් එවන SKIP_WAITING පණිවිඩයෙන් පමණක් සක්‍රිය වේ.
      console.log('[SW] Installation complete (waiting for user to apply update).');
    })()
  );
});

// ============================================================
// 2. ACTIVATE EVENT
// ============================================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
      
      await self.clients.claim();
      console.log('[SW] Activation complete.');
    })()
  );
});

// ============================================================
// 3. FETCH EVENT
// ============================================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  if (request.method !== 'GET') return;
  if (!request.url.startsWith('http')) return;
  
  const url = new URL(request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // HTML navigation - Network-first
  const isHTMLNavigation = request.mode === 'navigate' || 
    (request.headers.get('accept') || '').includes('text/html');

  if (isHTMLNavigation) {
    event.respondWith(handleHTMLRequest(request));
    return;
  }

  // Assets - Cache-first
  event.respondWith(handleAssetRequest(request));
});

async function handleHTMLRequest(request) {
  try {
    // අන්තර්ජාලය අඩු/නැති විට තත්පර 4කින් පසු cache එකට මාරු වේ
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const networkResponse = await fetch(request, { signal: controller.signal });
    clearTimeout(timer);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed for HTML, using cache:', request.url);
    const cachedResponse = await caches.match(request, { ignoreSearch: true });
    if (cachedResponse) return cachedResponse;
    
    const offlinePage = await caches.match(OFFLINE_URL);
    if (offlinePage) return offlinePage;
    
    return new Response(
      '<html><body style="font-family:sans-serif;text-align:center;padding:2rem;">' +
      '<h1>නොබැඳි තත්ත්වයේ සිටී</h1>' +
      '<p>කරුණාකර අන්තර්ජාල සම්බන්ධතාවය පරීක්ෂා කරන්න.</p>' +
      '</body></html>',
      { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
}

// js / css / json ගොනු සෑම විටම network-first (වෙනස්කම් වහාම පෙනේ; offline විට cache භාවිතා වේ)
function isCodeAsset(url) {
  return url.origin === self.location.origin && /\.(js|css|json)$/i.test(url.pathname);
}

async function handleAssetRequest(request) {
  const url = new URL(request.url);

  if (isCodeAsset(url)) {
    try {
      const networkResponse = await fetch(request, { cache: 'no-cache' });
      if (networkResponse && networkResponse.status === 200) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      const cached = await caches.match(request, { ignoreSearch: true });
      if (cached) return cached;
      console.warn('[SW] Fetch failed:', request.url, error.message);
      return new Response('', { status: 408, statusText: 'Offline - Resource not available' });
    }
  }

  // රූප, fonts, CDN - cache-first
  try {
    const cachedResponse = await caches.match(request, { ignoreSearch: true });
    if (cachedResponse) return cachedResponse;
    
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200 && networkResponse.type !== 'opaque') {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('[SW] Fetch failed:', request.url, error.message);
    return new Response('', { status: 408, statusText: 'Offline - Resource not available' });
  }
}

// ============================================================
// 4. MESSAGE EVENT
// ============================================================
self.addEventListener('message', (event) => {
  if (!event.data) return;
  const { type, urls } = event.data;
  
  if (type === 'SKIP_WAITING') {
    self.skipWaiting();
    return;
  }
  
  if (type === 'CACHE_URLS' && Array.isArray(urls)) {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return Promise.allSettled(urls.map((url) => cache.add(url)));
      })
    );
  }
});

self.addEventListener('error', (event) => console.error('[SW] Global error:', event.error));
self.addEventListener('unhandledrejection', (event) => console.error('[SW] Unhandled rejection:', event.reason));