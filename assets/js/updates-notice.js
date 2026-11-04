// ============================================================
// updates-notice.js — "නිවැරදි කළ කරුණු" දැනුම්දීම
//   • සියලු පිටුවල භාවිත වේ (sw-update.js අසල).
//   • data/updates/corrections.js (නිවැරදි කිරීම් ලඝුව) පූරණය කර, පරිශීලකයා තවම නොබැලූ
//     නිවැරදි කිරීම් ඇත්නම් ඇප් එක යාවත්කාලීන වූ පසු කෙටි දැනුම්දීමක් පෙන්වයි.
//   • එය එබූ විට updates.html (නිවැරදි කළ කරුණු) විවෘත වේ.
//   • window.MX_UPDATES: මෙනු ලකුණ (badge) සහ updates.html පිටුව මගින් භාවිත වේ.
// ============================================================
(function () {
  'use strict';
  if (window.MX_UPDATES) return;

  var KEY = 'matika-updates-seen';        // අන්තිමට "දුටු" සටහනේ id
  var SHOWN = 'matika-updates-shown';     // මෙම session එකේ දැනුම්දීම පෙන්වා ඇත
  var cs = document.currentScript, src = (cs && cs.src) || '';
  var ROOT = src ? src.replace(/assets\/js\/updates-notice\.js(\?.*)?$/, '') : './';
  var isUpdatesPage = /(^|\/)updates\.html$/.test(location.pathname);

  function ls(get, k, v) {
    try { return get ? localStorage.getItem(k) : localStorage.setItem(k, v); } catch (e) { return null; }
  }

  // අලුත් පරිශීලකයෙකුට (ඇප් එක පළමු වරට විවෘත කරන) මුල් දැනුම්දීම අවශ්‍ය නැත —
  // ඒ සඳහා, මෙම script ආරම්භයේදීම ඇප් එකේ පැරණි සටහන් ඇත්දැයි පරීක්ෂා කරයි.
  var existingUser = (function () {
    try {
      if (localStorage.getItem('abhidhamma_theme') || localStorage.getItem('matika-lang') || localStorage.getItem('tika_bookmarks')) return true;
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i) || '';
        if (k.indexOf('matika-offline-ready-') === 0 || k.indexOf('matika-') === 0 && k !== KEY && k !== SHOWN) return true;
      }
    } catch (e) {}
    return false;
  })();

  var data = [];
  var waiting = [];
  var loaded = false;

  function list() { return data; }
  function latestId() { return data.length ? data[0].id : null; }

  // තවම නොබැලූ නිවැරදි කිරීම් අඩංගු සටහන් (අලුත්ම මුලින්)
  function unseenReleases() {
    var seen = ls(true, KEY);
    if (seen === null) return existingUser ? data.slice() : [];
    var out = [];
    for (var i = 0; i < data.length; i++) { if (data[i].id === seen) return out; out.push(data[i]); }
    return out;     // seen id සොයාගත නොහැකි නම් සියල්ල අලුත්
  }
  function unseenCount() {
    return unseenReleases().reduce(function (n, r) { return n + ((r.items && r.items.length) || 0); }, 0);
  }
  function markSeen() { var id = latestId(); if (id) ls(false, KEY, id); updateBadges(); }

  function updateBadges() {
    var n = unseenCount();
    var els = document.querySelectorAll('[data-mxu-badge]');
    for (var i = 0; i < els.length; i++) {
      els[i].textContent = n > 0 ? String(n) : '';
      if (n > 0) els[i].classList.remove('hidden'); else els[i].classList.add('hidden');
    }
    var dots = document.querySelectorAll('[data-mxu-dot]');
    for (var j = 0; j < dots.length; j++) {
      if (n > 0) dots[j].classList.remove('hidden'); else dots[j].classList.add('hidden');
    }
  }

  function css() {
    if (document.getElementById('mxu-css')) return;
    var s = document.createElement('style');
    s.id = 'mxu-css';
    s.textContent =
      '#mxu-notice{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:2147482990;display:flex;align-items:stretch;max-width:min(92vw,460px);width:max-content;' +
      'border-radius:14px;overflow:hidden;box-shadow:0 10px 30px -6px rgba(0,0,0,.55);border:2px solid #86efac;background:#14532d;color:#dcfce7;font-family:inherit;animation:mxu-in .28s ease-out}' +
      '#mxu-notice[data-lift="1"]{bottom:92px}' +
      '#mxu-notice .mxu-go{all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;gap:12px;padding:11px 14px;flex:1;min-width:0}' +
      '#mxu-notice .mxu-go:hover,#mxu-notice .mxu-go:focus-visible{background:#166534}' +
      '#mxu-notice .mxu-go:focus-visible{outline:2.5px solid #dcfce7;outline-offset:-4px}' +
      '#mxu-notice .mxu-ic{flex:none;width:22px;height:22px}' +
      '#mxu-notice .mxu-tx{display:flex;flex-direction:column;line-height:1.45;text-align:left}' +
      '#mxu-notice .mxu-tx strong{font-size:14.5px;font-weight:700}' +
      '#mxu-notice .mxu-tx span{font-size:12.5px;opacity:.9}' +
      '#mxu-notice .mxu-n{flex:none;min-width:24px;height:24px;padding:0 7px;border-radius:12px;background:#dcfce7;color:#14532d;font:700 13px/24px sans-serif;text-align:center}' +
      '#mxu-notice .mxu-x{all:unset;box-sizing:border-box;cursor:pointer;flex:none;width:42px;display:flex;align-items:center;justify-content:center;border-left:1px solid rgba(220,252,231,.3);font-size:20px;line-height:1}' +
      '#mxu-notice .mxu-x:hover,#mxu-notice .mxu-x:focus-visible{background:#166534}' +
      '@keyframes mxu-in{from{opacity:0;transform:translate(-50%,14px)}to{opacity:1;transform:translate(-50%,0)}}' +
      '@media (prefers-reduced-motion:reduce){#mxu-notice{animation:none}}';
    document.head.appendChild(s);
  }

  function showNotice(n) {
    if (document.getElementById('mxu-notice')) return;
    css();
    var b = document.createElement('div');
    b.id = 'mxu-notice';
    b.setAttribute('role', 'status');
    b.setAttribute('aria-live', 'polite');
    b.innerHTML =
      '<a class="mxu-go" href="' + ROOT + 'updates.html" aria-label="නිවැරදි කළ කරුණු බැලීමට">' +
        '<svg class="mxu-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h9"/></svg>' +
        '<span class="mxu-tx"><strong>ඇප් එක යාවත්කාලීන විය</strong><span>නිවැරදි කළ කරුණු බැලීමට මෙය ටච් කරන්න</span></span>' +
        '<span class="mxu-n" aria-hidden="true">' + n + '</span>' +
      '</a>' +
      '<button type="button" class="mxu-x" aria-label="පසුව">×</button>';
    document.body.appendChild(b);
    // යාවත්කාලීන කිරීමේ දැනුම්දීම (#sw-update) ඇත්නම් ඊට උඩින් පෙන්වන්න
    if (document.getElementById('sw-update')) b.setAttribute('data-lift', '1');
    b.querySelector('.mxu-x').addEventListener('click', function () { markSeen(); b.remove(); });
  }

  function onLoaded() {
    loaded = true;
    if (!data.length) return;
    if (ls(true, KEY) === null && !existingUser) ls(false, KEY, latestId());   // අලුත් පරිශීලකයා — නිශ්ශබ්දව සටහන් කරන්න
    updateBadges();
    waiting.splice(0).forEach(function (fn) { try { fn(); } catch (e) {} });
    if (isUpdatesPage) return;
    var n = unseenCount();
    if (n > 0 && ls(true, SHOWN) === null) {
      try { sessionStorage.setItem(SHOWN, '1'); } catch (e) {}
      // තත්පරයක් ගත වී පෙන්වයි (පිටුව පූරණය වන අතර නොකර; sw-update දැනුම්දීම පළමුව ඇත්දැයි බැලීමට)
      setTimeout(function () { showNotice(n); }, 1200);
    }
  }
  // sessionStorage හි SHOWN පරීක්ෂාව
  var _ls = ls;
  ls = function (get, k, v) {
    if (k === SHOWN && get) { try { return sessionStorage.getItem(SHOWN); } catch (e) { return null; } }
    return _ls(get, k, v);
  };

  function load() {
    if (window.MATIKA_UPDATES) { data = window.MATIKA_UPDATES; onLoaded(); return; }
    var s = document.createElement('script');
    s.src = ROOT + 'data/updates/corrections.js';
    s.onload = function () { data = window.MATIKA_UPDATES || []; onLoaded(); };
    s.onerror = function () { /* ගොනුව නොමැති නම් නිශ්ශබ්දව නවතින්න */ };
    document.head.appendChild(s);
  }

  window.MX_UPDATES = {
    list: list,
    root: function () { return ROOT; },
    unseenReleases: unseenReleases,
    unseenCount: unseenCount,
    markSeen: markSeen,
    refreshBadges: updateBadges,
    ready: function (fn) { if (loaded) fn(); else waiting.push(fn); }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load); else load();
})();
