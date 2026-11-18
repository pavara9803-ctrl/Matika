/* ============================================================
 * pali-pela.js — මාතිකා පදයට අදාළ ධම්මසඞ්ගණීපාළි, අට්ඨසාලිනී, මූලටීකා, අනුටීකා පාඨ
 *   නික්ඛෙපකණ්ඩය (§985–1383) සහ අට්ඨකථාකණ්ඩය (§1384–1616)
 *   තික / දුක / සුත්තන්ත පිටුවල පද විස්තරයට "මූල පාළිය" කාඩ්පතක් එක් කරයි.
 *   දත්ත: data/matika/pali/dhammasangani-pali.js (මුලින්ම අවශ්‍ය වූ විට පමණක් load වේ)
 * ============================================================ */
(function () {
  'use strict';
  var SRC = (document.currentScript && document.currentScript.src) || '';
  var ROOT = SRC ? SRC.replace(/assets\/js\/pali-pela\.js.*$/, '') : '../';
  var TAB_KEY = 'mx-pali-tab', BOOK_KEY = 'mx-pali-book';
  var BOOKS = {
    pali: { t: 'මූල පාළිය', s: 'ධම්මසඞ්ගණීපාළි', file: 'dhammasangani-pali.js', v: 'MX_PALI_PELA', parts: ['nk', 'ak'] },
    attha: { t: 'අට්ඨකථාව', s: 'අට්ඨසාලිනී', file: 'atthasalini.js', v: 'MX_ATTHASALINI', parts: ['mv', 'nk', 'ak'] },
    mula: { t: 'මූලටීකාව', s: 'ධම්මසඞ්ගණී මූලටීකා', file: 'mulatika.js', v: 'MX_MULATIKA', parts: ['mv', 'nk', 'ak'] },
    anu: { t: 'අනුටීකාව', s: 'ධම්මසඞ්ගණී අනුටීකා', file: 'anutika.js', v: 'MX_ANUTIKA', parts: ['mv', 'nk', 'ak'] }
  };
  var BOOK_ORDER = ['pali', 'attha', 'mula', 'anu'];
  var loadingB = {};
  function load(book) {
    book = book || 'pali';
    var B = BOOKS[book];
    if (window[B.v]) return Promise.resolve(window[B.v]);
    if (loadingB[book]) return loadingB[book];
    loadingB[book] = new Promise(function (res, rej) {
      var sc = document.createElement('script');
      sc.src = ROOT + 'data/matika/pali/' + B.file; sc.async = true;
      sc.onload = function () { res(window[B.v]); };
      sc.onerror = function () { loadingB[book] = null; rej(new Error(book)); };
      document.head.appendChild(sc);
    });
    return loadingB[book];
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function lsGet(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

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

  /* අට්ඨකථා / ටීකා ඡේදය: මුල “8.” / “1-6.” / “1006.” අංකය ලේබලයක් ලෙස; ‘‘උද්ධෘත’’ ඉස්මතු */
  function fmtComm(id, text, part) {
    var m = String(text).match(/^(\d+(?:\s*[-–]\s*\d+)?)\.\s+([\s\S]*)$/), lab = '', body = text;
    if (m) { lab = m[1].replace(/\s/g, ''); body = m[2]; }
    var h = esc(body)
      .replace(/‘‘([^’]{1,400})’’/g, '<span class="pp-quote">‘‘$1’’</span>')
      .replace(/\(([^()]{1,40}\d[^()]{0,20})\)/g, '<span class="pp-ref">($1)</span>')
      .replace(/…\s*පෙ\s*\.\s*…/g, '<span class="pp-pe">…පෙ.…</span>')
      .replace(/\[([^\]]+)\]/g, '<span class="pp-var">[$1]</span>');
    var verse = /^\s{2}/.test(text);
    var no = lab ? (part === 'mv' ? (lab.indexOf('-') > -1 || lab.indexOf('–') > -1 ? 'දුක ' + lab : (+lab > 100 ? 'දුක ' + lab : 'තික ' + lab)) : '§' + lab) : '';
    return '<article class="pp-leaf pp-cm' + (lab ? '' : ' pp-cont') + (verse ? ' pp-verse' : '') + '" data-n="' + id + '">' +
      (no ? '<span class="pp-no">' + no + '</span>' : '') +
      '<p class="pp-a' + (body.length < 160 ? ' pp-short' : '') + '">' + h + '</p>' +
      '<button type="button" class="pp-copy" data-n="' + id + '" aria-label="ඡේදය පිටපත් කරන්න"><i class="fa-regular fa-copy" aria-hidden="true"></i><span>පිටපත්</span></button>' +
      '</article>';
  }

  var KANDA = {
    nk: { t: 'නික්ඛෙපකණ්ඩය', s: '§985–1383', d: 'මාතිකා පදය මූල, ස්කන්ධ, ද්වාර, භූමි ආදී වශයෙන් නික්ෂේප කොට (තබා) විස්තර කරන කොටස.' },
    ak: { t: 'අට්ඨකථාකණ්ඩය', s: '§1384–1616', d: 'එම පදයම භූමි හා චිත්තුප්පාද වශයෙන් කෙටියෙන් නිර්ණය කරන කොටස (අත්ථුද්ධාරකණ්ඩය).' }
  };
  var CKANDA = {
    mv: { t: 'මාතිකාපද', s: 'වණ්ණනා', full: 'මාතිකාපදවණ්ණනා', d: 'මාතිකා පදයේ වචනාර්ථය සහ අදහස විවරණය කරන කොටස.' },
    nk: { t: 'නික්ඛෙපකණ්ඩ', s: 'වණ්ණනා · §985–1383', full: 'නික්ඛෙපකණ්ඩවණ්ණනා', d: 'නික්ඛෙපකණ්ඩයේ පාළි ඡේදවලට (§) අදාළ විවරණය.' },
    ak: { t: 'අට්ඨකථාකණ්ඩ', s: 'වණ්ණනා · §1384–1616', full: 'අට්ඨකථාකණ්ඩවණ්ණනා', d: 'අට්ඨකථාකණ්ඩයේ (අත්ථුද්ධාර) පාළි ඡේදවලට අදාළ විවරණය.' }
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

  function render(host, key, data, book) {
    book = book || host.dataset.book || 'pali';
    host.dataset.book = book;
    var B = BOOKS[book], isPali = book === 'pali', K = isPali ? KANDA : CKANDA;
    var entry = data.map[key] || {};
    var open = host.dataset.open === '1';
    var tab = lsGet(TAB_KEY + '-' + book, B.parts[0]);
    if (!entry[tab]) tab = B.parts.filter(function (w) { return entry[w]; })[0] || B.parts[0];
    var books = BOOK_ORDER.map(function (b) {
      return '<button type="button" role="tab" class="pp-book' + (b === book ? ' is-on' : '') + '" data-b="' + b + '" aria-selected="' + (b === book) + '">' +
        '<span class="pp-book__t">' + BOOKS[b].t + '</span><span class="pp-book__s">' + BOOKS[b].s + '</span></button>';
    }).join('');
    var tabs = B.parts.map(function (w) {
      var has = !!entry[w];
      return '<button type="button" role="tab" class="pp-tab' + (w === tab ? ' is-on' : '') + '" data-w="' + w + '" aria-selected="' + (w === tab) + '"' + (has ? '' : ' disabled') + '>' +
        '<span class="pp-tab__t">' + K[w].t + '</span><span class="pp-tab__s">' + (has ? K[w].s : 'මෙම පදයට නැත') + '</span></button>';
    }).join('');
    var nums = entry[tab] || [];
    var MAXV = isPali ? 3 : 4;
    var body = nums.map(function (n, i) {
      var h = isPali ? fmtPara(n, data.text[n] || '') : fmtComm(n, data.text[n] || '', tab);
      return i >= MAXV ? h.replace('<article class="pp-leaf', '<article hidden class="pp-more pp-leaf') : h;
    }).join('');
    if (!nums.length) body = '<p class="pp-empty">මෙම පදය සඳහා ' + B.s + ' ග්‍රන්ථයේ වෙනම විවරණයක් නැත.</p>';
    var more = nums.length > MAXV ? '<button type="button" class="pp-showall">තවත් ඡේද ' + (nums.length - MAXV) + ' ක් පෙන්වන්න <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>' : '';
    var extra = '';
    if (isPali) {
      extra = notes(key, entry, data, tab) + ((!entry.ak && key.charAt(0) === 's') ? '<p class="pp-note"><i class="fa-solid fa-circle-info" aria-hidden="true"></i> අට්ඨකථාකණ්ඩයෙහි විග්‍රහ කෙරෙන්නේ අභිධර්ම මාතිකාව (තික 22, දුක 100) පමණි; සුත්තන්තික දුක එහි නොදැක්වේ.</p>' : '');
    } else if (tab === 'mv' && key.charAt(0) !== 't') {
      extra = '<p class="pp-note"><i class="fa-solid fa-circle-info" aria-hidden="true"></i> දුක මාතිකාවේ විවරණය ගොච්ඡකය (දුක කිහිපයක්) එකට ගෙන කර ඇත; මෙහි ඇත්තේ මෙම දුකය අයත් කොටසයි.</p>';
    } else if (tab === 'mv') {
      extra = '<p class="pp-note"><i class="fa-solid fa-circle-info" aria-hidden="true"></i> මාතිකාපදවණ්ණනාව ත්‍රිකයේ පද තුනම එකට විවරණය කරයි.</p>';
    }
    var srcList = isPali ? 'ඡේද අංක ' + nums.join(', ') : 'ඡේද ' + nums.length;
    host.innerHTML =
      '<button type="button" class="pp-head" aria-expanded="' + open + '" aria-controls="' + host.id + '-body">' +
        '<span class="pp-ico" aria-hidden="true"><i class="fa-solid fa-scroll"></i></span>' +
        '<span class="pp-ttl"><b>පාළිය · අට්ඨකථාව · ටීකාව</b><small>ධම්මසඞ්ගණීපාළි · අට්ඨසාලිනී · මූලටීකා · අනුටීකා</small></span>' +
        '<span class="pp-hint">' + (open ? 'වසන්න' : 'විස්තරය') + '</span>' +
        '<i class="fa-solid fa-chevron-down pp-car" aria-hidden="true"></i>' +
      '</button>' +
      '<div class="pp-body" id="' + host.id + '-body"' + (open ? '' : ' hidden') + '>' +
      '<div class="pp-books" role="tablist" aria-label="ග්‍රන්ථය">' + books + '</div>' +
      '<div class="pp-tabs pp-tabs--' + B.parts.length + '" role="tablist" aria-label="කොටස">' + tabs + '</div>' +
      '<p class="pp-desc">' + esc(K[tab].d) + '</p>' + extra +
      '<div class="pp-leaves' + (isPali ? '' : ' pp-leaves--cm') + '">' + body + '</div>' + more +
      '<p class="pp-src">මූලාශ්‍රය: ' + B.s + ' — ' + (K[tab].full || K[tab].t) + ' (' + srcList + ').</p></div>';
    host.classList.toggle('is-open', open);
    host.querySelector('.pp-head').addEventListener('click', function () { host.dataset.open = open ? '0' : '1'; render(host, key, data, book); });
    host.querySelectorAll('.pp-book').forEach(function (b) {
      b.addEventListener('click', function () {
        var nb = b.dataset.b; lsSet(BOOK_KEY, nb); b.classList.add('is-loading');
        load(nb).then(function (d) { render(host, key, d, nb); }, function () { b.classList.remove('is-loading'); });
      });
    });
    host.querySelectorAll('.pp-tab').forEach(function (b) {
      b.addEventListener('click', function () { if (b.disabled) return; lsSet(TAB_KEY + '-' + book, b.dataset.w); render(host, key, data, book); });
    });
    var sa = host.querySelector('.pp-showall');
    if (sa) sa.addEventListener('click', function () { host.querySelectorAll('.pp-more').forEach(function (e) { e.hidden = false; }); sa.remove(); });
    host.querySelectorAll('.pp-copy').forEach(function (b) {
      b.addEventListener('click', function () {
        var n = b.dataset.n, txt = (isPali ? n + '. ' : '') + (data.text[n] || '') + '\n— ' + B.s;
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
    if (host.dataset.key !== key) host.dataset.open = '0';   // නව පදයකදී වසා ඇත
    host.dataset.key = key;
    var bk = lsGet(BOOK_KEY, 'pali'); if (!BOOKS[bk]) bk = 'pali';
    host.hidden = false;
    load(bk).then(function (d) { if (host.dataset.key === key) render(host, key, d, bk); }, function () {
      load('pali').then(function (d) { if (host.dataset.key === key) render(host, key, d, 'pali'); }, function () { host.hidden = true; });
    });
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
