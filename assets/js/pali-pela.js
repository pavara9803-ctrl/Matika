/* ============================================================
 * pali-pela.js — මාතිකා පදයට අදාළ ධම්මසඞ්ගණීපාළි පාඨ
 *   නික්ඛෙපකණ්ඩය (§985–1383) සහ අට්ඨකථාකණ්ඩය (§1384–1616)
 *   තික / දුක / සුත්තන්ත පිටුවල පද විස්තරයට "මූල පාළිය" කාඩ්පතක් එක් කරයි.
 *   දත්ත: data/matika/pali/dhammasangani-pali.js (මුලින්ම අවශ්‍ය වූ විට පමණක් load වේ)
 * ============================================================ */
(function () {
  'use strict';
  var SRC = (document.currentScript && document.currentScript.src) || '';
  var ROOT = SRC ? SRC.replace(/assets\/js\/pali-pela\.js.*$/, '') : '../';
  var DATA_URL = ROOT + 'data/matika/pali/dhammasangani-pali.js';
  var TAB_KEY = 'mx-pali-tab';
  var loading = null;

  function load() {
    if (window.MX_PALI_PELA) return Promise.resolve(window.MX_PALI_PELA);
    if (loading) return loading;
    loading = new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = DATA_URL; s.async = true;
      s.onload = function () { res(window.MX_PALI_PELA); };
      s.onerror = function () { loading = null; rej(new Error('pali data')); };
      document.head.appendChild(s);
    });
    return loading;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function getTab() { try { return localStorage.getItem(TAB_KEY) || 'nk'; } catch (e) { return 'nk'; } }
  function setTab(t) { try { localStorage.setItem(TAB_KEY, t); } catch (e) {} }

  /* පාඨය HTML කිරීම: ප්‍රශ්නය, …පෙ.…, [පාඨාන්තර], අවසාන “ඉමෙ ධම්මා …” වාක්‍යය */
  function fmtLine(line) {
    var h = esc(line);
    h = h.replace(/\[([^\]]+)\]/g, '<span class="pp-var" title="පාඨාන්තරය">[$1]</span>');
    h = h.replace(/…\s*පෙ\s*\.\s*…|\.\.\.\s*පෙ\s*\.\s*\.\.\./g, '<span class="pp-pe" title="පෙය්‍යාලය — පෙර පරිදි">…පෙ.…</span>');
    h = h.replace(/(තත්ථ\s+කතම[ාංොෙ]\s+[^?]{1,60}\?)/g, '<b class="pp-sq">$1</b>');
    h = h.replace(/(\s–\s)(ඉමෙ\s+(?:ධම්මා|තයො|චත්තාරො|ඉමානි)?[^–]*?\.)$/, '$1<span class="pp-end">$2</span>');
    return h;
  }
  function fmtPara(n, text) {
    var lines = String(text).split('\n');
    var first = lines.shift();
    var q = '', rest = first;
    var m = first.match(/^(කතමෙ\s+ධම්මා\s+[^?]+\?|කතමෙ\s+ධම්මා\s+[^.]+\.|තත්ථ\s+කතම[ාංො]\s+[^?]+\?)\s*(.*)$/);
    if (m) { q = m[1]; rest = m[2]; }
    else { var m2 = first.match(/^([^–]{2,60}?(?:ති|න්ති|ීති))\s+–\s*(.*)$/); if (m2) { q = m2[1] + ' –'; rest = m2[2]; } }
    var html = '<article class="pp-leaf" data-n="' + n + '">' +
      '<span class="pp-no" aria-label="ඡේද අංකය">§' + n + '</span>' +
      (q ? '<p class="pp-q">' + esc(q) + '</p>' : '') +
      (rest ? '<p class="pp-a' + (rest.length < 160 ? ' pp-short' : '') + '">' + fmtLine(rest) + '</p>' : '') +
      lines.map(function (l) { return '<p class="pp-a pp-tail">' + fmtLine(l) + '</p>'; }).join('') +
      '<button type="button" class="pp-copy" data-n="' + n + '" aria-label="ඡේදය පිටපත් කරන්න"><i class="fa-regular fa-copy" aria-hidden="true"></i><span>පිටපත්</span></button>' +
      '</article>';
    return html;
  }

  var KANDA = {
    nk: { t: 'නික්ඛෙපකණ්ඩය', s: '§985–1383', d: 'මාතිකා පදය මූල, ස්කන්ධ, ද්වාර, භූමි ආදී වශයෙන් නික්ෂේප කොට (තබා) විස්තර කරන කොටස.' },
    ak: { t: 'අට්ඨකථාකණ්ඩය', s: '§1384–1616', d: 'එම පදයම භූමි හා චිත්තුප්පාද වශයෙන් කෙටියෙන් නිර්ණය කරන කොටස (අත්ථුද්ධාරකණ්ඩය).' }
  };

  function notes(key, entry, data, which) {
    var out = [];
    if (/^d:(6|7),/.test(key)) out.push('පාළියේ මෙම ගොච්ඡකය ආසව ගොච්ඡකයේ ක්‍රමයටම “…පෙ.…” යොදා සංක්ෂිප්ත කර ඇත; ගොච්ඡකයේ සියලු පද සඳහා එකම ඡේදය දැක්වේ.');
    else {
      // එකම ඡේදය සහෝදර පදයකටද පොදු නම්
      var parts = key.split(':'), idx = parts[1].split(','), sib = [];
      var last = parseInt(idx[idx.length - 1], 10);
      [last - 1, last + 1, last - 2, last + 2].forEach(function (j) {
        if (j < 0) return;
        var k2 = parts[0] + ':' + idx.slice(0, -1).concat([j]).join(',');
        var e2 = data.map[k2];
        if (e2 && e2[which] && entry[which] && e2[which].join() === entry[which].join()) sib.push(j);
      });
      if (sib.length) out.push('මෙම ඡේදය ' + (parts[0] === 't' ? 'ත්‍රිකයේ' : 'දුකයේ') + ' අනෙක් පදයටද පොදු ය — පදය අදාළ වන ස්ථානය පාඨයේ ම සොයන්න.');
    }
    return out.map(function (t) { return '<p class="pp-note"><i class="fa-solid fa-circle-info" aria-hidden="true"></i> ' + esc(t) + '</p>'; }).join('');
  }

  function render(host, key, data) {
    var entry = data.map[key];
    if (!entry) { host.hidden = true; host.innerHTML = ''; return; }
    host.hidden = false;
    var tab = getTab();
    if (!entry[tab]) tab = entry.nk ? 'nk' : 'ak';
    var tabs = ['nk', 'ak'].map(function (w) {
      var has = !!entry[w];
      return '<button type="button" role="tab" class="pp-tab' + (w === tab ? ' is-on' : '') + '" data-w="' + w + '" aria-selected="' + (w === tab) + '"' + (has ? '' : ' disabled') + '>' +
        '<span class="pp-tab__t">' + KANDA[w].t + '</span><span class="pp-tab__s">' + (has ? KANDA[w].s : 'මෙම පදය සඳහා නැත') + '</span></button>';
    }).join('');
    var nums = entry[tab] || [];
    var MAXV = 3;
    var body = nums.map(function (n, i) {
      var h = fmtPara(n, data.text[n] || '');
      return i >= MAXV ? h.replace('<article class="pp-leaf"', '<article class="pp-leaf pp-more" hidden') : h;
    }).join('');
    var more = nums.length > MAXV ? '<button type="button" class="pp-showall">තවත් ඡේද ' + (nums.length - MAXV) + ' ක් පෙන්වන්න <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>' : '';
    var noAk = (!entry.ak && key.charAt(0) === 's') ? '<p class="pp-note"><i class="fa-solid fa-circle-info" aria-hidden="true"></i> අට්ඨකථාකණ්ඩයෙහි විග්‍රහ කෙරෙන්නේ අභිධර්ම මාතිකාව (තික 22, දුක 100) පමණි; සුත්තන්තික දුක එහි නොදැක්වේ.</p>' : '';
    host.innerHTML =
      '<div class="pp-head">' +
        '<span class="pp-ico" aria-hidden="true"><i class="fa-solid fa-scroll"></i></span>' +
        '<span class="pp-ttl"><b>මූල පාළිය</b><small>ධම්මසඞ්ගණීපාළි — ' + KANDA[tab].t + '</small></span>' +
      '</div>' +
      '<div class="pp-tabs" role="tablist" aria-label="පාළි කණ්ඩ">' + tabs + '</div>' +
      '<p class="pp-desc">' + esc(KANDA[tab].d) + '</p>' +
      notes(key, entry, data, tab) + noAk +
      '<div class="pp-leaves">' + body + '</div>' + more +
      '<p class="pp-src">මූලාශ්‍රය: ධම්මසඞ්ගණීපාළි (අභිධම්මපිටක) — ' + KANDA[tab].t + ', ඡේද අංක ' + nums.join(', ') + '.</p>';
    host.querySelectorAll('.pp-tab').forEach(function (b) {
      b.addEventListener('click', function () { if (b.disabled) return; setTab(b.dataset.w); render(host, key, data); });
    });
    var sa = host.querySelector('.pp-showall');
    if (sa) sa.addEventListener('click', function () { host.querySelectorAll('.pp-more').forEach(function (e) { e.hidden = false; }); sa.remove(); });
    host.querySelectorAll('.pp-copy').forEach(function (b) {
      b.addEventListener('click', function () {
        var n = b.dataset.n, txt = n + '. ' + (data.text[n] || '') + '\n— ධම්මසඞ්ගණීපාළි';
        var done = function () { b.classList.add('is-done'); b.querySelector('span').textContent = 'පිටපත් විය'; setTimeout(function () { b.classList.remove('is-done'); b.querySelector('span').textContent = 'පිටපත්'; }, 1600); };
        try { navigator.clipboard.writeText(txt).then(done, function () {}); } catch (e) {}
      });
    });
  }

  function mount(beforeId, hostId, key) {
    var host = document.getElementById(hostId);
    if (!host) {
      var ref = document.getElementById(beforeId);
      if (!ref || !ref.parentNode) return;
      host = document.createElement('section');
      host.id = hostId; host.className = 'pp-card'; host.setAttribute('aria-label', 'මූල පාළිය');
      ref.parentNode.insertBefore(host, ref);
    }
    if (!key) { host.hidden = true; return; }
    host.dataset.key = key;
    load().then(function (d) { if (host.dataset.key === key) render(host, key, d); }, function () { host.hidden = true; });
  }

  function wrap(name, after) {
    var orig = window[name];
    if (typeof orig !== 'function' || orig.__pp) return;
    var w = function () { var r = orig.apply(this, arguments); try { after(); } catch (e) {} return r; };
    w.__pp = true; window[name] = w;
  }

  var HOOKS = {
    selectTikaPada: function () {
      if (typeof currentTikaIndex === 'undefined' || typeof currentPadaIndex === 'undefined') return;
      mount('tika-pada-artha-section', 'tika-pali-pela', 't:' + currentTikaIndex + ',' + currentPadaIndex);
    },
    openPadaDetail: function () {
      var st = window.dukaState || (typeof dukaState !== 'undefined' ? dukaState : null);
      if (!st || !st.currentGochhaka || !st.currentPada) return;
      var key = null;
      (st.currentGochhaka.dukas || []).forEach(function (d) {
        var k = (d.padas || []).indexOf(st.currentPada);
        if (k > -1) key = 'd:' + st.currentGochhaka.id + ',' + d.number + ',' + k;
      });
      mount('duka-pada-artha-section', 'duka-pali-pela', key);
    },
    selectSuttantaPada: function () {
      if (typeof suttantaCurrentMatikaIndex === 'undefined') return;
      mount('suttanta-pada-artha-section', 'suttanta-pali-pela', 's:' + suttantaCurrentMatikaIndex + ',' + suttantaCurrentPadaIndex);
    }
  };
  function boot() {
    Object.keys(HOOKS).forEach(function (n) {
      if (typeof window[n] !== 'function') return;
      wrap(n, HOOKS[n]);
      try { HOOKS[n](); } catch (e) {}   // පිටුව දැනටමත් පදයක් පෙන්වයි නම්
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  window.MXPaliPela = { load: load, mount: mount };
})();
