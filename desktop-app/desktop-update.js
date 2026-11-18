// Windows ඇප් එකේ (Tauri) යාවත්කාලීන දැනුම්දීම — වෙබ් අඩවියට / Android ඇප් එකට බලපෑමක් නැත.
//  • ඇප් එක ඇතුළේ ඇති app-build.json → දැන් ස්ථාපිත අනුවාදය (build වන විට set-version.mjs ලියයි)
//  • වෙබ් අඩවියේ / repo එකේ app-version.json → නවතම අනුවාදය (Windows build workflow එක යාවත්කාලීන කරයි)
// ඇප් එක විවෘත කළ විට (online නම්) නවතම අනුවාදය වැඩි නම් දැනුම්දීම පෙන්වයි.
(function () {
  var T = window.__TAURI__;
  if (!T || !T.core || typeof T.core.invoke !== 'function') return;   // බ්‍රවුසරයේ නම් කිසිවක් නොකරයි

  var ROOT = (function () {
    try { return new URL('.', document.currentScript.src).href; } catch (e) { return './'; }
  })();
  // raw.githubusercontent.com සෑම විටම CORS header එවන නිසා එය මුලින්
  var REMOTE = [
    'https://raw.githubusercontent.com/pavara9803-ctrl/Matika/main/app-version.json',
    'https://matika-snowy.vercel.app/app-version.json'
  ];
  var lastError = '';

  function si() {
    try {
      var l = localStorage.getItem('matika-lang') || document.documentElement.getAttribute('lang') || 'si';
      return String(l).slice(0, 2) === 'si';
    } catch (e) { return true; }
  }
  function L(s, e) { return si() ? s : e; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function cmp(a, b) {
    var pa = String(a || '0').split('.'), pb = String(b || '0').split('.');
    for (var i = 0; i < Math.max(pa.length, pb.length); i++) {
      var d = (parseInt(pa[i], 10) || 0) - (parseInt(pb[i], 10) || 0);
      if (d) return d > 0 ? 1 : -1;
    }
    return 0;
  }
  function getJson(url, ms) {
    var c = new AbortController(), t = setTimeout(function () { c.abort(); }, ms);
    return fetch(url, { cache: 'no-store', signal: c.signal })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (j) { clearTimeout(t); return j; }, function (e) { clearTimeout(t); throw e; });
  }
  function remoteJson(i) {
    i = i || 0;
    if (i >= REMOTE.length) return Promise.reject(new Error('no source'));
    return getJson(REMOTE[i] + '?t=' + Date.now(), 8000).catch(function (e) {
      lastError = (e && e.message) ? e.message : String(e);
      return remoteJson(i + 1);
    });
  }
  function mb(b) {
    b = Number(b);
    if (!b) return '';
    return b >= 1048576 ? (b / 1048576).toFixed(b >= 10485760 ? 0 : 1) + ' MB' : Math.round(b / 1024) + ' KB';
  }
  function day(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ''));
    return m ? m[3] + '/' + m[2] + '/' + m[1] : '';
  }
  function open(url) { if (url) T.core.invoke('open_url', { url: url }).catch(function () {}); }

  var CSS =
    '.mxu-ov{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.5);padding:16px}' +
    '.mxu-bx{background:#fffbeb;color:#1f2937;width:min(460px,100%);max-height:calc(100% - 24px);overflow-y:auto;border-radius:20px;' +
    'box-shadow:0 14px 44px rgba(0,0,0,.4);font-family:inherit;border:1px solid #fcd34d}' +
    ':root.dark .mxu-bx{background:#1e293b;color:#e2e8f0;border-color:#475569}' +
    '.mxu-hd{display:flex;align-items:center;gap:12px;padding:20px 22px 0}' +
    '.mxu-hd img{width:46px;height:46px;border-radius:11px;flex:none}' +
    '.mxu-t{font-size:1.18rem;font-weight:600;line-height:1.4;color:#7c2d12}:root.dark .mxu-t{color:#fcd34d}' +
    '.mxu-bd{padding:14px 22px 20px}.mxu-p{margin:0 0 12px;font-size:.98rem;line-height:1.65;color:#44403c}' +
    ':root.dark .mxu-p{color:#cbd5e1}' +
    '.mxu-meta{font-size:.9rem;line-height:1.7;color:#78716c;border-top:1px solid rgba(0,0,0,.08);padding-top:10px;margin-top:4px}' +
    ':root.dark .mxu-meta{color:#94a3b8;border-color:rgba(255,255,255,.12)}' +
    '.mxu-notes{white-space:pre-line;font-size:.94rem;line-height:1.6;margin:10px 0 0}' +
    '.mxu-ac{display:flex;gap:10px;margin-top:18px;flex-wrap:wrap}' +
    '.mxu-b{flex:1;min-width:120px;min-height:46px;padding:10px 14px;border-radius:999px;cursor:pointer;font:inherit;font-size:1rem;font-weight:600}' +
    '.mxu-b1{background:#b45309;color:#fff;border:1px solid #b45309}.mxu-b1:hover{filter:brightness(1.07)}' +
    '.mxu-b2{background:transparent;color:#b45309;border:1px solid #d6d3d1}.mxu-b2:hover{background:rgba(180,83,9,.08)}' +
    ':root.dark .mxu-b1{background:#fcd34d;color:#422006;border-color:#fcd34d}' +
    ':root.dark .mxu-b2{color:#fcd34d;border-color:#475569}';

  function show(info, installed) {
    if (document.getElementById('mxuUpdate')) return;
    if (!document.getElementById('mxuUpdateCss')) {
      var st = document.createElement('style');
      st.id = 'mxuUpdateCss'; st.textContent = CSS; document.head.appendChild(st);
    }
    var name = L('අභිධර්ම මාතිකා අධ්‍යයනය', 'Abhidhamma Matika');
    var notes = String(info.notes || '').trim();
    var ov = document.createElement('div');
    ov.id = 'mxuUpdate'; ov.className = 'mxu-ov';
    ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true');
    ov.innerHTML =
      '<div class="mxu-bx"><div class="mxu-hd"><img src="' + esc(ROOT) + 'assets/icons/192.png" alt="">' +
      '<div class="mxu-t">' + esc(L('නව යාවත්කාලීනයක් ඇත', 'Update available')) + '</div></div>' +
      '<div class="mxu-bd">' +
      '<p class="mxu-p">' + esc(L(name + ' ඇප් එකේ අලුත් අනුවාදයක් නිකුත් වී ඇත.',
        'A newer version of ' + name + ' is available.')) + '</p>' +
      '<p class="mxu-p">' + esc(L('"යාවත්කාලීන කරන්න" එබූ විට Setup ගොනුව බාගත වේ. බාගත වූ පසු එය විවෘත කර ස්ථාපනය කරන්න — පවතින ඇප් එක ඉවත් කිරීම අවශ්‍ය නැත.',
        'Tap Update to download the Setup file, then open it to install. You do not need to remove the current app.')) + '</p>' +
      (notes ? '<div class="mxu-notes">' + esc(notes) + '</div>' : '') +
      '<div class="mxu-meta">' +
      esc(L('අලුත් අනුවාදය', 'New version')) + ': ' + esc(info.version || '') +
      [mb(info.size), day(info.date)].filter(Boolean).map(function (x) { return ' · ' + esc(x); }).join('') +
      (installed ? '<br>' + esc(L('දැනට ඇති අනුවාදය', 'Installed')) + ': ' + esc(installed) : '') +
      '</div>' +
      '<div class="mxu-ac">' +
      '<button type="button" class="mxu-b mxu-b2">' + esc(L('පසුව', 'Later')) + '</button>' +
      '<button type="button" class="mxu-b mxu-b1">' + esc(L('යාවත්කාලීන කරන්න', 'Update')) + '</button>' +
      '</div></div></div>';
    document.body.appendChild(ov);
    function close() { ov.remove(); document.removeEventListener('keydown', key); }
    function key(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', key);
    ov.querySelector('.mxu-b2').onclick = close;
    ov.querySelector('.mxu-b1').onclick = function () { open(info.url || info.page); close(); };
  }

  // කුඩා දැනුම්දීමක් (අලුත්ම අනුවාදයයි / පරීක්ෂා කළ නොහැකි විය)
  function note(title, msg) {
    if (document.getElementById('mxuUpdate')) return;
    if (!document.getElementById('mxuUpdateCss')) {
      var st = document.createElement('style');
      st.id = 'mxuUpdateCss'; st.textContent = CSS; document.head.appendChild(st);
    }
    var ov = document.createElement('div');
    ov.id = 'mxuUpdate'; ov.className = 'mxu-ov';
    ov.innerHTML = '<div class="mxu-bx"><div class="mxu-hd"><img src="' + esc(ROOT) + 'assets/icons/192.png" alt="">' +
      '<div class="mxu-t">' + esc(title) + '</div></div><div class="mxu-bd"><p class="mxu-p">' + esc(msg) + '</p>' +
      '<div class="mxu-ac"><button type="button" class="mxu-b mxu-b1">' + esc(L('හරි', 'OK')) + '</button></div></div></div>';
    document.body.appendChild(ov);
    ov.querySelector('.mxu-b1').onclick = function () { ov.remove(); };
  }

  // manual = පරිශීලකයා මෙනුවෙන් ඉල්ලූ විට (ප්‍රතිඵලය සැම විටම පෙන්වයි)
  function check(manual) {
    if (!manual && navigator.onLine === false) return;
    return getJson(ROOT + 'app-build.json', 4000)
      .then(function (local) {
        return remoteJson().then(function (remote) {
          var info = remote && remote.windows;
          if (info && (info.url || info.page) && cmp(info.version, local.version) > 0) { show(info, local.version); return; }
          if (manual) note(L('අලුත්ම අනුවාදයයි', 'Up to date'),
            L('ඔබ භාවිත කරන්නේ අලුත්ම අනුවාදයයි (' + local.version + ').',
              'You are on the latest version (' + local.version + ').'));
        });
      })
      .catch(function (err) {
        var m = (err && err.message) ? err.message : String(err);
        console.warn('[update] පරීක්ෂාව මඟහැරියා:', m, lastError);
        if (manual) note(L('පරීක්ෂා කළ නොහැකි විය', 'Could not check'),
          L('අන්තර්ජාල සම්බන්ධය පරීක්ෂා කර නැවත උත්සාහ කරන්න. (' + (lastError || m) + ')',
            'Check your internet connection and try again. (' + (lastError || m) + ')'));
      });
  }

  // සැකසුම් මෙනුවට "යාවත්කාලීන පරීක්ෂා කරන්න" (Windows ඇප් එකේ පමණි)
  function addMenuItem() {
    var list = document.querySelector('#custom-menu .py-1');
    if (!list || document.getElementById('mxu-check')) return;
    var b = document.createElement('button');
    b.id = 'mxu-check';
    b.type = 'button';
    b.setAttribute('data-no-i18n', '');
    b.className = 'w-full text-left px-4 py-3 flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-700';
    b.innerHTML = '<i class="fa-solid fa-rotate text-saffron-600 text-lg w-5"></i><span>' +
      esc(L('යාවත්කාලීන පරීක්ෂා කරන්න', 'Check for updates')) + '</span>';
    b.addEventListener('click', function (e) { e.stopPropagation(); check(true); });
    list.appendChild(b);
  }

  function start() {
    addMenuItem();
    setTimeout(function () { check(false); }, 1500);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') start();
  else window.addEventListener('DOMContentLoaded', start);
})();
