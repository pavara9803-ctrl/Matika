// ============================================================
// sw.js - Service Worker for Offline Support
// Version: 25.0.0 (core/later precache; install අසාර්ථක වුවහොත් අඩක් cache වූ අනුවාදයක් නොපවතී; clear-cache පසු ස්වයං-අලුත්වැඩියාව)
// Version: 24.0.0 (html/js/css/json: network-first නමුත් තත්පර 1.5-2ක් තුළ පිළිතුරු නොලැබුණහොත් cache එක වහාම පෙන්වයි —
//   දත්ත අවසන් / සංඥාව දුර්වල විට ඇප් එක පමාවීම නැති කිරීමට; නව අනුවාදය සක්‍රිය වන්නේ පරිශීලකයා යාවත්කාලීන කිරීමට එබූ විට පමණි)
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
  './assets/css/tailwind-built.css',
];

// CORE: offline ක්‍රියාවට අත්‍යවශ්‍ය ගොනු — install විට සියල්ලම cache විය යුතුයි (එසේ නොවුණහොත් install අසාර්ථක වී පසුව නැවත උත්සාහ කරයි;
//       එබැවින් අඩක් cache වූ "කැඩුණු" අනුවාදයක් කිසිදා ක්‍රියාත්මක නොවේ).
// LATER: භාෂා (i18n) ගොනු, අමතර අයිකන — පිටුව විවෘත වී ටික වෙලාවකින් පසුබිමේ බාගැනේ (අසාර්ථක වුවද ප්‍රශ්නයක් නැත).
const CORE_ASSETS = Array.from(new Set(ASSETS_TO_CACHE.concat(self.PRECACHE_CORE || self.PRECACHE_URLS || [])));
const LATER_ASSETS = (self.PRECACHE_LATER || []).filter((u) => CORE_ASSETS.indexOf(u) === -1);

// ============================================================
// CDN සම්පත් (අසාර්ථක වුවද යෙදුම ක්‍රියාත්මක වේ)
// ============================================================
const CDN_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Noto+Serif+Sinhala:wght@400;600;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+Myanmar:wght@400;600;700&display=swap',
];

// ============================================================
// 1. INSTALL EVENT
// ============================================================
// එක් ගොනුවක් cache කරයි. network දෝෂයක් → throw (install අසාර්ථක). 404 → ගොනුව මඟ හැර ඉදිරියට.
async function putOne(cache, url) {
  const res = await fetch(new Request(url, { cache: 'reload' }));
  if (res.ok) { await cache.put(url, res); return; }
  if (res.status === 404) { console.warn('[SW] Missing (404), skipped:', url); return; }
  throw new Error('HTTP ' + res.status + ' for ' + url);
}

// cache එකේ නැති CORE ගොනු පමණක් නැවත ගෙන එයි (clear cache / storage evict වූ පසු ස්වයං-අලුත්වැඩියාව)
async function ensureCore() {
  const cache = await caches.open(CACHE_NAME);
  const have = new Set((await cache.keys()).map((r) => new URL(r.url).href));
  const missing = CORE_ASSETS.filter((u) => !have.has(new URL(u, self.location.href).href));
  for (let i = 0; i < missing.length; i += 6) {
    await Promise.all(missing.slice(i, i + 6).map((u) => putOne(cache, u)));
  }
  return missing.length;
}

// CDN CSS (Font Awesome, Google Fonts) සහ ඒවායේ font ගොනු — අසාර්ථක වුවද ඇප් එක ක්‍රියා කරයි
async function cacheCdn(cache) {
  await Promise.allSettled(CDN_ASSETS.map(async (cssUrl) => {
    const res = await fetch(cssUrl);
    if (!res.ok) return;
    const text = await res.clone().text();
    await cache.put(cssUrl, res);
    const base = new URL(cssUrl);
    const fonts = Array.from(new Set((text.match(/url\(([^)]+)\)/g) || []).map((m) =>
      new URL(m.slice(4, -1).replace(/['"]/g, '').trim(), base).href)));
    await Promise.allSettled(fonts.filter((u) => !/^data:/.test(u)).map(async (u) => {
      if (await cache.match(u)) return;
      const r = await fetch(u);
      if (r.ok) await cache.put(u, r);
    }));
  }));
}

let laterRunning = null;
function fillLater() {
  if (laterRunning) return laterRunning;
  laterRunning = (async () => {
    const cache = await caches.open(CACHE_NAME);
    const todo = [];
    for (const u of LATER_ASSETS) { if (!(await cache.match(u))) todo.push(u); }
    for (let i = 0; i < todo.length; i += 4) {
      await Promise.allSettled(todo.slice(i, i + 4).map((u) => putOne(cache, u)));
    }
  })().finally(() => { laterRunning = null; });
  return laterRunning;
}

// ============================================================
// 1. INSTALL EVENT
// ============================================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing version ' + CACHE_NAME + '...');

  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // CORE සියල්ල සාර්ථක විය යුතුයි — එකක් හෝ අසාර්ථක නම් throw වී install අවලංගු වේ
      for (let i = 0; i < CORE_ASSETS.length; i += 6) {
        await Promise.all(CORE_ASSETS.slice(i, i + 6).map((u) => putOne(cache, u)));
      }
      await cacheCdn(cache); // best-effort
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
    event.respondWith(handleHTMLRequest(event, request));
    return;
  }

  // Assets - Cache-first
  event.respondWith(handleAssetRequest(event, request));
});

// ============================================================
// "Network-first, but fast": cache එකේ පිටපතක් තිබේ නම්, network එක
// timeoutMs ඇතුළත පිළිතුරු නොදුන්නොත් (දත්ත අවසන් / සංඥාව දුර්වල / lie-fi)
// වහාම cache එක පෙන්වයි. network ඉල්ලීම පසුබිමේ දිගටම ක්‍රියාත්මක වී
// cache එක අලුත් කරයි (ඊළඟ වතාවේ නව අනුවාදය පෙනේ).
// cache එකේ පිටපතක් නැති නම් පමණක් network එක සම්පූර්ණයෙන්ම බලා සිටී.
// ============================================================
const HTML_TIMEOUT_MS = 2000;
const CODE_TIMEOUT_MS = 1500;
const ASSET_FETCH_TIMEOUT_MS = 8000; // cache නැති රූප/fonts/CDN සඳහා උපරිම බලා සිටීම

async function networkFirstFast(event, request, timeoutMs, fetchOptions) {
  const cached = await caches.match(request, { ignoreSearch: true });

  const networkPromise = fetch(request, fetchOptions || {}).then(async (res) => {
    if (res && res.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, res.clone());
    }
    return res;
  });

  // cache නැත → network එකම බලා සිටින්න (අසාර්ථක වුවහොත් caller හසුරුවයි)
  if (!cached) return networkPromise;

  // පසුබිමේ බාගැනීම නොකැඩී cache යාවත්කාලීන වීමට ඉඩ දෙන්න
  networkPromise.catch(() => {});
  try { event.waitUntil(networkPromise.catch(() => {})); } catch (e) {}

  let timer;
  const timeout = new Promise((resolve) => { timer = setTimeout(() => resolve(null), timeoutMs); });
  try {
    const res = await Promise.race([networkPromise, timeout]);
    clearTimeout(timer);
    if (res && res.status < 500) return res;
    return cached; // timeout හෝ server දෝෂයක්
  } catch (error) {
    clearTimeout(timer);
    return cached; // network දෝෂයක් (offline)
  }
}

async function handleHTMLRequest(event, request) {
  try {
    return await networkFirstFast(event, request, HTML_TIMEOUT_MS);
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

async function handleAssetRequest(event, request) {
  const url = new URL(request.url);

  if (isCodeAsset(url)) {
    try {
      return await networkFirstFast(event, request, CODE_TIMEOUT_MS, { cache: 'no-cache' });
    } catch (error) {
      console.warn('[SW] Fetch failed:', request.url, error.message);
      return new Response('', { status: 408, statusText: 'Offline - Resource not available' });
    }
  }

  // රූප, fonts, CDN - cache-first
  try {
    const cachedResponse = await caches.match(request, { ignoreSearch: true });
    if (cachedResponse) return cachedResponse;

    // cache එකේ නැති ගොනුවක් සඳහා අනන්තයට බලා නොසිට තත්පර 8කින් අත්හරින්න
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ASSET_FETCH_TIMEOUT_MS);
    let networkResponse;
    try {
      networkResponse = await fetch(request, { signal: controller.signal });
    } finally {
      clearTimeout(timer);
    }
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
  
  if (type === 'WARM') {
    // පිටුව විවෘත වූ විට: cache එක සම්පූර්ණදැයි පරීක්ෂා කර අඩුපාඩු පිරවීම, පසුව පසුබිමේ LATER ගොනු
    const port = event.source;
    event.waitUntil((async () => {
      try {
        await ensureCore();
        if (port) port.postMessage({ type: 'OFFLINE_READY', version: CACHE_NAME });
      } catch (e) { console.warn('[SW] ensureCore failed:', e && e.message); }
      try { await fillLater(); } catch (e) {}
    })());
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