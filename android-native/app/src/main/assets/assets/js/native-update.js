// ============================================================
// native-update.js — Android ඇප් එකේ "නව අනුවාදයක් ඇත" දැනුම්දීම
//   • MainActivity (Kotlin) Play Store හි යාවත්කාලීනයක් ඇත්දැයි පරීක්ෂා කර,
//     window.MX_NATIVE_UPDATE.set(state) ඇමතීමෙන් මෙම දැනුම්දීම පෙන්වයි.
//   • state: 'none' | 'available' | 'downloading' | 'ready'
//   • දැනුම්දීමේ පෙනුම PWA අනුවාදයේ (sw-update.js) දැනුම්දීමටම සමානයි (#sw-update).
//   • sw-update.js මගින් (සියලු පිටුවල) android bridge (window.MatikaNative) ඇති විට පූරණය වේ.
// ============================================================
(function () {
  'use strict';
  if (!window.MatikaNative || window.MX_NATIVE_UPDATE) return;

  var DISMISS_KEY = 'mx-native-update-dismissed';   // පරිශීලකයා "පසුව" එබූ state (මෙම session එකට)
  var current = 'none';

  function dismissedFor() {
    try { return sessionStorage.getItem(DISMISS_KEY); } catch (e) { return null; }
  }
  function setDismissed(v) {
    try { sessionStorage.setItem(DISMISS_KEY, v); } catch (e) {}
  }

  function css() {
    if (document.getElementById('sw-update-css')) return;
    var s = document.createElement('style');
    s.id = 'sw-update-css';
    s.textContent =
      '#sw-update{position:fixed;left:50%;bottom:calc(16px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:2147483000;display:flex;align-items:stretch;max-width:min(92vw,460px);width:max-content;' +
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

  function remove() {
    var b = document.getElementById('sw-update');
    if (b && b.parentNode) b.parentNode.removeChild(b);
  }

  var TEXT = {
    available:   ['නව අනුවාදයක් ඇත', 'යාවත්කාලීන කිරීමට මෙය ටච් කරන්න', false, true],
    downloading: ['යාවත්කාලීනය බාගනිමින්…', 'මදක් රැඳී සිටින්න', true, false],
    ready:       ['යාවත්කාලීනය සූදානම්', 'ඇප් එක නැවත ආරම්භ කිරීමට මෙය ටච් කරන්න', false, true]
  };

  function render(state) {
    var t = TEXT[state];
    if (!t) { remove(); return; }
    if (!document.body) { document.addEventListener('DOMContentLoaded', function () { render(state); }); return; }
    css();
    remove();
    var b = document.createElement('div');
    b.id = 'sw-update';
    b.setAttribute('role', 'status');
    b.setAttribute('aria-live', 'polite');
    if (t[2]) b.setAttribute('data-busy', '1');
    var tag = t[3] ? 'button' : 'div';
    b.innerHTML =
      '<' + tag + (t[3] ? ' type="button"' : '') + ' class="swu-go" aria-label="' + t[0] + '">' +
        '<svg class="swu-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>' +
        '<span class="swu-tx"><strong>' + t[0] + '</strong><span>' + t[1] + '</span></span>' +
      '</' + tag + '>' +
      '<button type="button" class="swu-x" aria-label="පසුව">×</button>';
    document.body.appendChild(b);
    if (t[3]) {
      b.querySelector('.swu-go').addEventListener('click', function () {
        try { window.MatikaNative.startUpdate(); } catch (e) {}
      });
    }
    b.querySelector('.swu-x').addEventListener('click', function () {
      setDismissed(state);
      remove();
    });
  }

  window.MX_NATIVE_UPDATE = {
    set: function (state) {
      current = state || 'none';
      // "පසුව" එබූ state එකම නැවත නොපෙන්වයි (එහෙත් අලුත් state — උදා: ready — පෙන්වයි)
      if (current !== 'none' && dismissedFor() === current) { remove(); return; }
      render(current);
    },
    state: function () { return current; }
  };

  // script එක පූරණය වූ පසු, Kotlin පැත්තේ වත්මන් state එක ඉල්ලා ගන්න
  // (onPageFinished හි push කිරීම මීට කලින් සිදු වූවා නම් එය මග හැරීම වැළැක්වීමට)
  try {
    var st = window.MatikaNative.updateState && window.MatikaNative.updateState();
    if (st && st !== 'none') window.MX_NATIVE_UPDATE.set(st);
  } catch (e) {}
})();
