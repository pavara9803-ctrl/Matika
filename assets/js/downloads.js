// මුල් පිටුවේ "ඇප් එක බාගත කරන්න" කොටස — app-version.json හි දත්ත අනුව
// සෑම platform එකකටම අලුත්ම ගොනුවේ සබැඳිය, අනුවාදය සහ ප්‍රමාණය පුරවයි.
// JS ක්‍රියා නොකළත් කාඩ්පත් GitHub Releases පිටුවට යයි (HTML හි ඇති පෙරනිමි සබැඳිය).
(function () {
  var SOURCES = [
    'app-version.json',
    'https://raw.githubusercontent.com/pavara9803-ctrl/Matika/main/app-version.json'
  ];

  function mb(b) {
    b = Number(b);
    if (!b) return '';
    return b >= 1048576 ? (b / 1048576).toFixed(b >= 10485760 ? 0 : 1) + ' MB' : Math.round(b / 1024) + ' KB';
  }

  function getJson(url) {
    return fetch(url + (url.indexOf('?') < 0 ? '?t=' : '&t=') + Date.now(), { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
  }

  function load(i) {
    i = i || 0;
    if (i >= SOURCES.length) return Promise.reject(new Error('no source'));
    return getJson(SOURCES[i]).catch(function () { return load(i + 1); });
  }

  function fill(id, info, extra) {
    var card = document.getElementById(id);
    if (!card || !info) return;
    var url = info.url || info.page;
    if (url) card.href = url;
    var meta = card.querySelector('.dl__meta');
    if (meta) {
      var bits = [];
      if (info.version) bits.push('v' + info.version);
      if (info.size) bits.push(mb(info.size));
      if (extra) bits.push(extra);
      meta.textContent = bits.join(' · ');
    }
    card.classList.remove('dl__card--wait');
  }

  // දැනට භාවිත කරන ඇප් එකට අදාළ කාඩ්පත "ස්ථාපිතයි" ලෙස සලකුණු කරයි
  function markInstalled(id) {
    var card = document.getElementById(id);
    if (!card) return;
    var meta = card.querySelector('.dl__meta');
    if (meta) meta.textContent = 'ස්ථාපිතයි';
    card.classList.add('dl__card--installed');
  }

  function os() {
    var u = (navigator.userAgent || '') + ' ' + (navigator.platform || '');
    if (/Android/i.test(u)) return 'android';
    if (/iPhone|iPad|iPod/i.test(u)) return 'ios';
    if (/Mac/i.test(u)) return 'macos';
    if (/Linux/i.test(u)) return 'linux';
    if (/Win/i.test(u)) return 'windows';
    return '';
  }

  // මේ මොහොතේ ඇප් එකක් ඇතුළේද?
  function inApp() {
    if (window.MatikaNative) return 'android';                 // Android ඇප් එක
    if (window.__TAURI__ || document.documentElement.classList.contains('is-desktop-app')) {
      var o = os();
      return (o === 'macos' || o === 'linux') ? o : 'windows'; // desktop ඇප් එක
    }
    try {
      var standalone = navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
      if (standalone && os() === 'ios') return 'ios';          // මුල් තිරයට එක් කළ iPhone/iPad
    } catch (e) {}
    return '';
  }

  // Google Play ඇප් එක දුරකථනයේ ස්ථාපිතද යන්න (Chrome/Android)
  function markAndroidIfInstalled() {
    if (!navigator.getInstalledRelatedApps) return;
    navigator.getInstalledRelatedApps().then(function (apps) {
      if (apps && apps.length) markInstalled('dl-android');
    }).catch(function () {});
  }

  function run() {
    var box = document.getElementById('downloads');
    if (!box) return;
    var here = inApp();
    if (here) markInstalled('dl-' + (here === 'macos' ? 'macos' : here));
    markAndroidIfInstalled();
    iosHelp();
    load().then(function (d) {
      fill('dl-windows', d.windows, '.exe');
      fill('dl-macos', d.macos, '.dmg');
      fill('dl-linux', d.linux, '.deb');
      if (d.android && d.android.versionName) {
        var a = document.querySelector('#dl-android .dl__meta');
        if (a) a.textContent = 'v' + d.android.versionName + ' · Google Play';
      }
      ['dl-windows', 'dl-macos', 'dl-linux'].forEach(function (id) {
        var c = document.getElementById(id);
        if (c && c.classList.contains('dl__card--wait')) {
          var m = c.querySelector('.dl__meta');
          if (m) m.textContent = 'ළඟදී';                    // තවම build කර නැත
        }
      });
    }).catch(function () {
      // දත්ත නොලැබුණොත් කාඩ්පත් Releases පිටුවට යයි; meta හිස් කරයි
      box.querySelectorAll('.dl__card--wait .dl__meta').forEach(function (m) { m.textContent = ''; });
    });
  }

  // iPhone / iPad: "මුල් තිරයට එක් කරන්න" උපදෙස් කවුළුව
  function iosHelp() {
    var btn = document.getElementById('dl-ios');
    var box = document.getElementById('dl-ios-help');
    if (!btn || !box) return;
    function open() {
      box.hidden = false;
      document.addEventListener('keydown', onKey);
      var x = document.getElementById('dl-ios-close');
      if (x) x.focus();
    }
    function close() {
      box.hidden = true;
      document.removeEventListener('keydown', onKey);
      btn.focus();
    }
    function onKey(e) { if (e.key === 'Escape') close(); }
    btn.addEventListener('click', open);
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    var x = document.getElementById('dl-ios-close');
    if (x) x.addEventListener('click', close);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
