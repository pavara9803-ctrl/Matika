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

  // ඇප් එකක් ලෙස (PWA / desktop ඇප්) විවෘත කර ඇත්නම් බාගත කිරීමේ කොටස අවශ්‍ය නැත
  function installed() {
    try {
      if (navigator.standalone) return true;                                  // iOS
      return window.matchMedia('(display-mode: standalone)').matches ||
             window.matchMedia('(display-mode: fullscreen)').matches ||
             window.matchMedia('(display-mode: minimal-ui)').matches;
    } catch (e) { return false; }
  }

  // Google Play ඇප් එක දුරකථනයේ ස්ථාපිතද යන්න (Chrome/Android)
  function markAndroidIfInstalled() {
    if (!navigator.getInstalledRelatedApps) return;
    navigator.getInstalledRelatedApps().then(function (apps) {
      if (!apps || !apps.length) return;
      var card = document.getElementById('dl-android');
      if (!card) return;
      var meta = card.querySelector('.dl__meta');
      if (meta) meta.textContent = 'ස්ථාපිතයි';
      card.classList.add('dl__card--installed');
    }).catch(function () {});
  }

  function run() {
    var box = document.getElementById('downloads');
    if (!box) return;
    if (installed()) { box.hidden = true; return; }
    markAndroidIfInstalled();
    load().then(function (d) {
      fill('dl-windows', d.windows, '.exe');
      fill('dl-macos', d.macos, '.dmg');
      fill('dl-linux', d.linux, '.AppImage');
      if (d.linux && d.linux.url2) {
        var deb = document.getElementById('dl-linux-deb');
        if (deb) {
          deb.href = d.linux.url2;
          deb.textContent = 'Linux: ' + (d.linux.label2 || '.deb') + (d.linux.size2 ? ' · ' + mb(d.linux.size2) : '');
          deb.hidden = false;
        }
      }
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

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
