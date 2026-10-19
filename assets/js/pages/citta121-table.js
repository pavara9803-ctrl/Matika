// ============================================================
// citta121-table.js — "සිත් 121 වගුව" කොටස (citta.html)
//   දත්ත: data/paramattha/citta121-table.js (PDF වගුවේ පාඨය එලෙසම)
//   පේළියක් එබූ විට එම සිතේ විස්තර පත්‍රය විවෘත වේ (citta-atlas.js).
// ============================================================
(function () {
  'use strict';
  var T = window.CITTA121_TABLE;
  var box = document.getElementById('ct-root');
  if (!T || !box) return;

  var CLS = {
    'සෝමනස්ස සහගත': 'v-so', 'උපෙක්ඛා සහගත': 'v-up', 'දෝමනස්ස සහගත': 'v-dom', 'සුඛ සහගත': 'v-su', 'දුක්ඛ සහගත': 'v-du',
    'දිට්ඨිගත සම්පයුත්ත': 'k-sam', 'ඥාණ සම්පයුත්ත': 'k-sam', 'දිට්ඨිගත විප්පයුත්ත': 'k-vip', 'ඥාණ විප්පයුත්ත': 'k-vip',
    'පටිඝ සම්පයුත්ත': 'k-pat', 'අසඞ්ඛාරික': 's-a', 'සසඞ්ඛාරික': 's-s'
  };
  var JH = ['පඨම', 'දුතිය', 'තතිය', 'චතුත්ථ', 'පඤ්චම'];
  // පෙරහන්: "a" = සිතේ ලක්ෂණය (සිත් 121 සියල්ලටම), "t" = වගුවේ පාඨය
  var FILTERS = [
    { key: 'ved', mode: 'a', name: 'වේදනාව', opts: [['so', 'සෝමනස්ස'], ['up', 'උපෙක්ඛා'], ['dom', 'දෝමනස්ස'], ['su', 'සුඛ'], ['du', 'දුක්ඛ']] },
    { key: 'jati', mode: 'a', name: 'ජාතිය', opts: [['ak', 'අකුසල'], ['ku', 'කුසල'], ['vi', 'විපාක'], ['ki', 'ක්‍රියා']] },
    { key: 'hetu', mode: 'a', name: 'හේතු', opts: [['0', 'අහේතුක'], ['1', 'ඒකහේතුක'], ['2', 'ද්විහේතුක'], ['3', 'ත්‍රිහේතුක']] },
    { key: 'k', mode: 't', name: 'දිට්ඨි / ඥාණ', opts: ['දිට්ඨිගත සම්පයුත්ත', 'දිට්ඨිගත විප්පයුත්ත', 'ඥාණ සම්පයුත්ත', 'ඥාණ විප්පයුත්ත'] },
    { key: 's', mode: 't', name: 'සඞ්ඛාර', opts: ['අසඞ්ඛාරික', 'සසඞ්ඛාරික'] },
    { key: 'j', mode: 'j', name: 'ධ්‍යානය', opts: JH.map(function (j) { return j + 'ජ්ඣාන'; }) }
  ];
  FILTERS.forEach(function (f) { f.opts = f.opts.map(function (o) { return Array.isArray(o) ? o : [o, o]; }); });
  var state = { q: '' };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // ---------- සැකිල්ල ----------
  var h = '<div class="ct-tools">';
  h += '<div class="ct-jump" role="group" aria-label="කොටසට යන්න">' + T.map(function (g, i) {
    return '<a class="ca-opt" href="#ct-g' + i + '">' + g.title + ' ' + g.count + '</a>'; }).join('') + '</div>';
  h += '<label class="ca-search ct-search"><span class="sr-only">සිතක් හෝ අංකයක් සොයන්න</span><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i><input id="ct-q" type="search" placeholder="සොයන්න: අංකය (උදා: 57) හෝ නම" autocomplete="off"></label>';
  h += FILTERS.map(function (f) {
    return '<div class="ct-frow"><span class="ct-flabel">' + f.name + '</span>' + f.opts.map(function (o) {
      return '<button type="button" class="ca-opt ct-f" data-f="' + f.key + '" data-v="' + esc(o[0]) + '" aria-pressed="false">' + o[1] + '</button>'; }).join('') + '</div>';
  }).join('');
  h += '<div class="ct-status" aria-live="polite"><span id="ct-count"></span><button type="button" id="ct-clear" class="ca-clear" hidden>පෙරහන් ඉවත් කරන්න</button></div>';
  h += '</div>';

  T.forEach(function (g, gi) {
    h += '<section class="ct-group" id="ct-g' + gi + '"><h3 class="ct-gtitle">' + g.title + ' <span>' + g.count + '</span>' + (g.note ? ' <small>(' + g.note + ')</small>' : '') + '</h3>';
    g.parts.forEach(function (p) {
      h += '<div class="ct-part"><h4 class="ct-ptitle">' + p.title + ' <span>' + p.count + '</span></h4>';
      p.subs.forEach(function (s) {
        var cols = s.cols || [];
        h += '<div class="ct-sub"><div class="ct-shead"><span class="ct-sname">' + s.name + '</span>' +
          (cols.length ? '<span class="ct-cols ct-c' + cols.length + '" aria-hidden="true">' + cols.map(function (c) { return '<span>' + c + '</span>'; }).join('') + '</span>' : '') + '</div>';
        s.rows.forEach(function (row) {
          var multi = row.c.length > 1;
          var cells = row.c.map(function (c) { return '<span class="ct-cell ' + (CLS[c] || 'ct-name') + '">' + c + '</span>'; }).join('');
          var inf = (window.CITTA_ATLAS && CITTA_ATLAS.info(row.n)) || {};
          var data = 'data-ved="' + (inf.ved || '') + '" data-jati="' + (inf.jati || '') + '" data-hetu="' + (inf.hetu != null ? inf.hetu : '') + '" ' +
            'data-n="' + row.n + '" data-txt="' + esc(row.c.join(' ') + ' ' + s.name + ' ' + p.title + ' ' + g.title) + '"' +
            (row.jh != null ? ' data-j="' + JH[row.jh] + 'ජ්ඣාන"' : '');
          h += '<button type="button" class="ct-row' + (row.jh != null ? ' ct-jh' + row.jh : '') + '" ' + data + ' title="විස්තරය බලන්න">' +
            '<span class="ct-n">' + row.n + '</span><span class="ct-cells' + (multi ? ' ct-c' + row.c.length : '') + '">' + cells + '</span></button>';
        });
        h += '</div>';
      });
      h += '</div>';
    });
    h += '</section>';
  });
  h += '<p class="ct-empty" hidden>ගැළපෙන සිතක් නැත. පෙරහන් ඉවත් කර නැවත බලන්න.</p>';
  if (window.CITTA121_TABLE_FIXES) {
    h += '<details class="ca-acc ct-src"><summary><span>මූලාශ්‍රය සහ නිවැරදි කළ මුද්‍රණ දෝෂ</span></summary><div class="ca-acc__body"><p>මෙම වගුව "සිත් 121" PDF වගුවේ පාඨය සහ අංක එලෙසම පෙන්වයි. නිවැරදි කළේ පහත මුද්‍රණ දෝෂ පමණි:</p><ul>' +
      CITTA121_TABLE_FIXES.map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ul></div></details>';
  }
  box.innerHTML = h;

  // ---------- පෙරහන් ----------
  var rows = Array.prototype.slice.call(box.querySelectorAll('.ct-row'));
  function norm(s) { return String(s || '').replace(/‍/g, '').toLowerCase(); }
  function apply() {
    var q = norm(state.q.trim()), shown = 0, active = !!q;
    FILTERS.forEach(function (f) { if (state[f.key]) active = true; });
    rows.forEach(function (r) {
      var t = r.getAttribute('data-txt'), ok = true;
      FILTERS.forEach(function (f) {
        var v = state[f.key]; if (!v || !ok) return;
        if (f.mode === 'a') ok = r.getAttribute('data-' + f.key) === v;
        else if (f.mode === 'j') ok = r.getAttribute('data-j') === v;
        else ok = t.indexOf(v) >= 0;
      });
      if (q) { if (/^\d+$/.test(q)) ok = ok && r.getAttribute('data-n') === q; else ok = ok && norm(t).indexOf(q) >= 0; }
      r.hidden = !ok; if (ok) shown++;
    });
    ['.ct-sub', '.ct-part', '.ct-group'].forEach(function (sel) {
      box.querySelectorAll(sel).forEach(function (el) { el.hidden = !el.querySelector('.ct-row:not([hidden])'); });
    });
    document.getElementById('ct-count').textContent = active ? 'ගැළපෙන සිත් ' + shown : 'සිත් 121';
    document.getElementById('ct-clear').hidden = !active;
    box.querySelector('.ct-empty').hidden = shown > 0;
  }
  box.querySelectorAll('.ct-f').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.getAttribute('data-f'), v = b.getAttribute('data-v');
      state[k] = state[k] === v ? null : v;
      box.querySelectorAll('.ct-f[data-f="' + k + '"]').forEach(function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-v') === state[k])); });
      apply();
    });
  });
  document.getElementById('ct-q').addEventListener('input', function (e) { state.q = e.target.value; apply(); });
  document.getElementById('ct-clear').addEventListener('click', function () {
    state = { q: '' };
    document.getElementById('ct-q').value = '';
    box.querySelectorAll('.ct-f').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
    apply();
  });
  box.querySelectorAll('.ct-jump a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(a.getAttribute('href')); if (!t) return;
      e.preventDefault();
      var y = t.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--m-header-h')) || 64) - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // ---------- පේළිය → සිතේ විස්තරය ----------
  box.addEventListener('click', function (e) {
    var r = e.target.closest('.ct-row'); if (!r || !window.CITTA_ATLAS) return;
    window.CITTA_ATLAS.open(+r.getAttribute('data-n'));
  });
  apply();
})();
