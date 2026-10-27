// ============================================================
// sw-update.js — Service Worker ලියාපදිංචිය + "නව අනුවාදයක් ඇත" දැනුම්දීම
//   • සියලු පිටුවල භාවිත වේ (matika-ui.js අසල).
//   • නව අනුවාදයක් බාගත වූ විට පහළ දැනුම්දීමක් පෙන්වයි.
//   • එය එබූ පසුව පමණක් යාවත්කාලීන වී (sw.js SKIP_WAITING) පිටුව නැවත පූරණය වේ.
// ============================================================
(function () {
  'use strict';
  if (!('serviceWorker' in navigator)) return;

  // sw.js ලිපිනය — මෙම ගොනුවේ ලිපිනයෙන් මූලය සොයයි (/matika/ වැනි උප-පිටුවලටත් නිවැරදි වේ)
  var cs = document.currentScript, src = (cs && cs.src) || '';
  var swUrl = src ? src.replace(/assets\/js\/sw-update\.js(\?.*)?$/, 'sw.js') : './sw.js';

  var wantReload = false;   // පරිශීලකයා යාවත්කාලීන කිරීමට එබූ විට පමණක් reload කරන්න
  var shownFor = null;

  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (wantReload) window.location.reload();
  });

  function css() {
    if (document.getElementById('sw-update-css')) return;
    var s = document.createElement('style');
    s.id = 'sw-update-css';
    s.textContent =
      '#sw-update{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:2147483000;display:flex;align-items:stretch;max-width:min(92vw,460px);width:max-content;' +
      'border-radius:14px;overflow:hidden;box-shadow:0 10px 30px -6px rgba(0,0,0,.55);border:2px solid #fbbf24;background:#5c1414;color:#fde68a;font-family:inherit;animation:swu-in .28s ease-out}' +
      '#sw-update .swu-go{all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;gap:12px;padding:11px 14px;flex:1;min-width:0}' +
      '#sw-update .swu-go:hover,#sw-update .swu-go:focus-visible{background:#7a1c1c}' +
      '#sw-update .swu-go:focus-visible{outline:2.5px solid #fde68a;outline-offset:-4px}' +
      '#sw-update .swu-ic{flex:none;width:22px;height:22px}' +
      '#sw-update .swu-tx{display:flex;flex-direction:column;line-height:1.45;text-align:left}' +
      '#sw-update .swu-tx strong{font-size:14.5px;font-weight:700}' +
      '#sw-update .swu-tx span{font-size:12.5px;opacity:.85}' +
      '#sw-update .swu-x{all:unset;box-sizing:border-box;cursor:pointer;flex:none;width:42px;display:flex;align-items:center;justify-content:center;border-left:1px solid rgba(253,230,138,.3);font-size:20px;line-height:1}' +
      '#sw-update .swu-x:hover,#sw-update .swu-x:focus-visible{background:#7a1c1c}' +
      '#sw-update[data-busy="1"] .swu-ic{animation:swu-spin 1s linear infinite}' +
      '@keyframes swu-in{from{opacity:0;transform:translate(-50%,14px)}to{opacity:1;transform:translate(-50%,0)}}' +
      '@keyframes swu-spin{to{transform:rotate(360deg)}}' +
      '@media (prefers-reduced-motion:reduce){#sw-update,#sw-update[data-busy="1"] .swu-ic{animation:none}}';
    document.head.appendChild(s);
  }

  function show(worker) {
    if (!worker || shownFor === worker || document.getElementById('sw-update')) return;
    shownFor = worker;
    css();
    var b = document.createElement('div');
    b.id = 'sw-update';
    b.setAttribute('role', 'status');
    b.setAttribute('aria-live', 'polite');
    b.innerHTML =
      '<button type="button" class="swu-go" aria-label="නව අනුවාදය ස්ථාපනය කිරීමට ටච් කරන්න">' +
        '<svg class="swu-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>' +
        '<span class="swu-tx"><strong>නව අනුවාදයක් ඇත</strong><span>යාවත්කාලීන කිරීමට මෙය ටච් කරන්න</span></span>' +
      '</button>' +
      '<button type="button" class="swu-x" aria-label="පසුව">×</button>';
    document.body.appendChild(b);

    b.querySelector('.swu-x').addEventListener('click', function () { b.remove(); });
    b.querySelector('.swu-go').addEventListener('click', function () {
      b.setAttribute('data-busy', '1');
      b.querySelector('.swu-tx').innerHTML = '<strong>යාවත්කාලීන වෙමින්…</strong>';
      wantReload = true;
      try { worker.postMessage({ type: 'SKIP_WAITING' }); } catch (e) {}
      // controllerchange නොලැබුණහොත් (උදා: worker දැනටමත් ක්‍රියාත්මක) තත්පර 3කින් reload කරන්න
      setTimeout(function () { window.location.reload(); }, 3000);
    });
  }

  function watch(worker) {
    if (!worker) return;
    if (worker.state === 'installed' && navigator.serviceWorker.controller) { show(worker); return; }
    worker.addEventListener('statechange', function () {
      if (worker.state === 'installed' && navigator.serviceWorker.controller) show(worker);
    });
  }

  function register() {
    navigator.serviceWorker.register(swUrl).then(function (reg) {
      if (reg.waiting && navigator.serviceWorker.controller) show(reg.waiting);   // කලින් බාගත වී බලා සිටින අනුවාදයක්
      if (reg.installing) watch(reg.installing);
      reg.addEventListener('updatefound', function () { watch(reg.installing); });

      function check() { try { reg.update(); } catch (e) {} }
      document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') check(); });
      setInterval(check, 30 * 60 * 1000);
    }).catch(function (err) { console.warn('[SW] ලියාපදිංචිය අසාර්ථකයි:', err); });
  }

  if (document.readyState === 'complete') register(); else window.addEventListener('load', register);
})();
