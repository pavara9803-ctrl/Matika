// ============================================================
// caitasika-atlas.js — චෛතසික 52 සිතියම
//   • චෛතසික 52 වර්ගීකරණය අනුව ටයිල් ලෙස
//   • සිතක් තේරූ විට ඒ සිත සමඟ යෙදෙන චෛතසික දීප්තිමත් වේ
//   • ටයිලයක් එබූ විට සම්පූර්ණ විස්තරය (ලක්ඛණාදි චතුක්කය සමඟ)
//   දත්ත: data/paramattha/caitasika-data.js
// ============================================================
(function () {
  'use strict';
  if (typeof sabbacittaData === 'undefined') return;

  // ---------- 1. චෛතසික 52 ----------
  var LIST = [].concat(sabbacittaData, pakirnakaData2, akusalaData2, sobhanaData);
  var LR = [];
  (CAITASIKA_LR_DATA.categories || []).forEach(function (c) {
    (c.items || []).forEach(function (i) { LR.push(i); });
    (c.subCategories || []).forEach(function (s) { (s.items || []).forEach(function (i) { LR.push(i); }); });
  });

  function range(a, b) { var r = []; for (var i = a; i <= b; i++) r.push(i); return r; }

  var RASI = [
    { key: 'an', name: 'අඤ්ඤසමාන', count: 13, tpl: 'tpl-an', subs: [
      { name: 'සබ්බචිත්තසාධාරණ', ids: range(1, 7) },
      { name: 'පකිණ්ණක', ids: range(8, 13) } ] },
    { key: 'ak', name: 'අකුසල', count: 14, tpl: 'tpl-ak', subs: [
      { name: 'මෝහචතුක්ක', ids: range(14, 17) },
      { name: 'ලෝභත්තික', ids: range(18, 20) },
      { name: 'දෝසචතුක්ක', ids: range(21, 24) },
      { name: 'ථීනද්වික', ids: [25, 26] },
      { name: 'විචිකිච්ඡා', ids: [27] } ] },
    { key: 'so', name: 'සොභන', count: 25, tpl: 'tpl-so', subs: [
      { name: 'සොභන සාධාරණ', ids: range(28, 46) },
      { name: 'විරති', ids: range(47, 49) },
      { name: 'අප්පමඤ්ඤා', ids: [50, 51] },
      { name: 'පඤ්ඤින්ද්‍රිය', ids: [52] } ] }
  ];

  // යෙදෙන සිත් ගණන (සම්ප්‍රයෝග නය 16 අනුව)
  var CITTA_N = {};
  range(1, 7).forEach(function (i) { CITTA_N[i] = 89; });
  [55, 66, 78, 73, 51, 69].forEach(function (n, k) { CITTA_N[8 + k] = n; });
  range(14, 17).forEach(function (i) { CITTA_N[i] = 12; });
  CITTA_N[18] = 8; CITTA_N[19] = 4; CITTA_N[20] = 4;
  range(21, 24).forEach(function (i) { CITTA_N[i] = 2; });
  CITTA_N[25] = 5; CITTA_N[26] = 5; CITTA_N[27] = 1;
  range(28, 46).forEach(function (i) { CITTA_N[i] = 59; });
  range(47, 49).forEach(function (i) { CITTA_N[i] = 16; });
  CITTA_N[50] = 28; CITTA_N[51] = 28; CITTA_N[52] = 47;

  var META = {};
  RASI.forEach(function (r) { r.subs.forEach(function (s) { s.ids.forEach(function (id) { META[id] = { rasi: r, sub: s }; }); }); });

  // ---------- 2. සිත් සහ ඒවා සමඟ යෙදෙන චෛතසික ----------
  // req = නියතව යෙදෙන, opt = විටෙක යෙදෙන
  var AN7 = range(1, 7), SOB19 = range(28, 46), MOHA4 = range(14, 17);
  function C(label, title, req, opt) { return { label: label, title: title, req: req, opt: opt || [] }; }

  var CITTA_GROUPS = [];

  // අකුසල 12
  var ak = [];
  lobha8Data.forEach(function (d, i) {
    var som = i < 4, dit = (i % 4) < 2, sas = (i % 2) === 1;
    var req = AN7.concat([8, 9, 10, 11, 13], som ? [12] : [], MOHA4, [18], dit ? [19] : []);
    var opt = (dit ? [] : [20]).concat(sas ? [25, 26] : []);
    ak.push(C('ලෝභ ' + (i + 1), d.name, req, opt));
  });
  dosa2Data.forEach(function (d, i) {
    var req = AN7.concat([8, 9, 10, 11, 13], MOHA4, [21]);
    var opt = [22, 23, 24].concat(i === 1 ? [25, 26] : []);
    ak.push(C('දෝස ' + (i + 1), d.name, req, opt));
  });
  ak.push(C('මෝහ 1', moha2Data[0].name, AN7.concat([8, 9, 11], MOHA4, [27])));
  ak.push(C('මෝහ 2', moha2Data[1].name, AN7.concat([8, 9, 10, 11], MOHA4)));
  CITTA_GROUPS.push({ key: 'ak', name: 'අකුසල 12', items: ak });

  // අහේතුක 18
  var ahSets = [[], [8, 9, 10], [8, 9, 10, 12], [8, 9, 10, 11], [8, 9, 10, 11, 12]];
  var ahLabels = ['ද්විපඤ්චවිඤ්ඤාණ 10', 'සිත් 5', 'සෝමනස්ස සන්තීරණ', 'මනෝද්වාරාවජ්ජන', 'හසිතුප්පාද'];
  CITTA_GROUPS.push({ key: 'ah', name: 'අහේතුක 18', items: ahetuka18Detail.map(function (d, i) {
    return C(ahLabels[i], d.name, AN7.concat(ahSets[i]));
  }) });

  // කාමසෝභන 24
  var ks = [], kinds = ['මහාකුසල්', 'මහාක්‍රියා', 'මහාවිපාක'];
  kamasohanaData.forEach(function (d, k) {
    var kind = Math.floor(k / 4), j = k % 4, som = j < 2, nana = (j % 2) === 0;
    var req = AN7.concat([8, 9, 10, 11, 13], som ? [12] : [], SOB19, nana ? [52] : []);
    var opt = [];
    if (kind === 0) opt = opt.concat([47, 48, 49]);
    if (kind < 2) opt = opt.concat([50, 51]);
    ks.push(C(kinds[kind] + ' ' + (j * 2 + 1) + '-' + (j * 2 + 2), kinds[kind] + ' ' + d.sub, req, opt));
  });
  CITTA_GROUPS.push({ key: 'ks', name: 'කාමසෝභන 24', items: ks });

  // මහග්ගත 27
  function jhana(r) { return [10, 11, 13].concat(r === 0 ? [8] : [], r <= 1 ? [9] : [], r <= 2 ? [12] : []); }
  var mgLabels = ['ප්‍රථම ධ්‍යාන', 'ද්විතීය ධ්‍යාන', 'තෘතීය ධ්‍යාන', 'චතුර්ථ ධ්‍යාන', 'පඤ්චම ධ්‍යාන', 'අරූපාවචර'];
  CITTA_GROUPS.push({ key: 'mg', name: 'මහග්ගත 27', items: rupavacaraData.map(function (d, i) {
    var r = Math.min(i, 4);
    return C(mgLabels[i], d.name, AN7.concat(jhana(r), SOB19, [52]), r <= 3 ? [50, 51] : []);
  }) });

  // ලෝකෝත්තර 40
  CITTA_GROUPS.push({ key: 'lk', name: 'ලෝකෝත්තර 40', items: lokuttaraDetailData.map(function (d, i) {
    return C(mgLabels[i], d.name, AN7.concat(jhana(i), SOB19, [47, 48, 49, 52]));
  }) });

  // ---------- 3. උපකාරක ----------
  function $(s, r) { return (r || document).querySelector(s); }
  function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/‍/g, ''); }

  var state = { citta: null, group: null, q: '' };

  // ---------- 4. සිතියම ----------
  function buildMap() {
    var map = $('#ca-map'); if (!map) return;
    RASI.forEach(function (r) {
      var band = el('section', 'ca-band ca-band--' + r.key);
      band.setAttribute('aria-label', r.name + ' ' + r.count);
      var head = el('div', 'ca-band__head');
      head.innerHTML = '<h3 class="ca-band__name">' + r.name + ' <span class="ca-band__n">' + r.count + '</span></h3>';
      var more = el('button', 'ca-band__more', 'රාශිය ගැන');
      more.type = 'button';
      more.addEventListener('click', function () { openRasi(r); });
      head.appendChild(more);
      band.appendChild(head);
      var subs = el('div', 'ca-subs');
      r.subs.forEach(function (s) {
        var sub = el('div', 'ca-sub' + (s.ids.length >= 7 ? ' ca-sub--wide' : ''));
        sub.appendChild(el('div', 'ca-sub__name', s.name + ' <span>' + s.ids.length + '</span>'));
        var tiles = el('div', 'ca-tiles');
        s.ids.forEach(function (id) {
          var c = LIST[id - 1];
          var b = el('button', 'ca-tile');
          b.type = 'button';
          b.dataset.id = id;
          b.setAttribute('aria-label', id + ' ' + c.name + ' — සිත් ' + CITTA_N[id] + 'ක යෙදේ');
          b.innerHTML = '<span class="ca-hole">' + id + '</span><span class="ca-nm">' + c.name + '</span><span class="ca-ct" aria-hidden="true">' + CITTA_N[id] + '</span>';
          b.addEventListener('click', function () { openCet(id); });
          tiles.appendChild(b);
        });
        sub.appendChild(tiles);
        subs.appendChild(sub);
      });
      band.appendChild(subs);
      map.appendChild(band);
    });
  }

  // ---------- 5. සිත තේරීම ----------
  function buildPicker() {
    var gRow = $('#ca-groups'), oRow = $('#ca-options'); if (!gRow) return;
    CITTA_GROUPS.forEach(function (g) {
      var b = el('button', 'ca-chip', g.name);
      b.type = 'button'; b.dataset.g = g.key;
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', function () {
        state.group = state.group === g.key ? null : g.key;
        renderOptions();
        if (!state.group) setCitta(null);
        else setCitta(g.key + ':0');
      });
      gRow.appendChild(b);
    });
    function renderOptions() {
      $all('.ca-chip', gRow).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.g === state.group)); });
      oRow.innerHTML = '';
      oRow.hidden = !state.group;
      if (!state.group) return;
      var g = CITTA_GROUPS.filter(function (x) { return x.key === state.group; })[0];
      g.items.forEach(function (c, i) {
        var b = el('button', 'ca-opt', c.label);
        b.type = 'button'; b.dataset.k = g.key + ':' + i; b.title = c.title;
        b.addEventListener('click', function () { setCitta(b.dataset.k); });
        oRow.appendChild(b);
      });
    }
    $('#ca-clear').addEventListener('click', function () { state.group = null; renderOptions(); setCitta(null); });
    $('#ca-q').addEventListener('input', function (e) { state.q = norm(e.target.value.trim()); paint(); });
  }

  function cittaOf(k) {
    if (!k) return null;
    var p = k.split(':'), g = CITTA_GROUPS.filter(function (x) { return x.key === p[0]; })[0];
    return g ? g.items[+p[1]] : null;
  }

  function setCitta(k) {
    state.citta = k;
    $all('.ca-opt').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.k === k)); });
    paint();
  }

  function breakdown(c) {
    var all = c.req.concat(c.opt), parts = [];
    RASI.forEach(function (r) { r.subs.forEach(function (s) {
      var n = s.ids.filter(function (id) { return all.indexOf(id) >= 0; }).length;
      if (n) parts.push(s.name + ' ' + n);
    }); });
    return parts;
  }

  function paint() {
    var c = cittaOf(state.citta), q = state.q;
    var map = $('#ca-map'); if (!map) return;
    map.classList.toggle('is-filtering', !!(c || q));
    $all('.ca-tile', map).forEach(function (t) {
      var id = +t.dataset.id, cet = LIST[id - 1];
      var inC = !c || c.req.indexOf(id) >= 0 || c.opt.indexOf(id) >= 0;
      var inQ = !q || norm(cet.name).indexOf(q) >= 0 || norm(cet.pali).indexOf(q) >= 0 || String(id) === q;
      t.classList.toggle('is-on', !!c && inC && inQ);
      t.classList.toggle('is-opt', !!c && c.opt.indexOf(id) >= 0);
      t.classList.toggle('is-dim', !(inC && inQ));
    });
    var bar = $('#ca-result');
    if (c) {
      var total = c.req.length + c.opt.length;
      bar.hidden = false;
      bar.innerHTML =
        '<div class="ca-result__top"><span class="ca-result__n">' + total + '</span>' +
        '<div><div class="ca-result__t">' + c.title + '</div>' +
        '<div class="ca-result__s">සමඟ යෙදෙන චෛතසික' + (c.opt.length ? ' — නියත ' + c.req.length + ' + විටෙක ' + c.opt.length : '') + '</div></div></div>' +
        '<p class="ca-result__f">' + breakdown(c).join(' + ') + ' = ' + total + '</p>';
    } else if (q) {
      var n = $all('.ca-tile:not(.is-dim)', map).length;
      bar.hidden = false;
      bar.innerHTML = n ? '<p class="ca-result__f">සෙවුමට ගැළපෙන චෛතසික ' + n + 'ක් ඇත.</p>'
        : '<p class="ca-result__f">ගැළපෙන චෛතසිකයක් නැත. නම සිංහලෙන් හෝ පාළි රෝම අකුරින් (උදා: phassa) ලියන්න.</p>';
    } else {
      bar.hidden = true;
    }
    $('#ca-legend').hidden = !(c && c.opt.length);
    $('#ca-clear').hidden = !(c || state.group);
  }

  // ---------- 6. විස්තර පත්‍රය ----------
  var dlg, body, cur = 0;

  function lrRow(label, f) {
    if (!f || !f.sinhala) return '';
    return '<div class="ca-lr__row"><dt>' + label + '</dt><dd>' + f.sinhala +
      (f.pali ? '<span class="ca-lr__pali pali-text">' + f.pali + '</span>' : '') + '</dd></div>';
  }

  function openCet(id) {
    cur = id;
    var c = LIST[id - 1], lr = LR[id - 1] || {}, m = META[id];
    var h = '';
    h += '<p class="ca-d__path">' + m.rasi.name + ' › ' + m.sub.name + '</p>';
    h += '<h2 class="ca-d__name" id="ca-d-title"><span class="ca-d__no">' + id + '</span>' + c.name + '</h2>';
    h += '<p class="ca-d__pali pali-text">' + c.pali + '</p>';
    h += '<p class="ca-d__lak">' + c.lakshana + '</p>';
    h += '<div class="ca-d__facts"><div><span>යෙදෙන සිත්</span><strong>' + (typeof c.yedena === 'number' ? 'සිත් ' + c.yedena : c.yedena) + '</strong></div>' +
      (c.noyedena ? '<div><span>නොයෙදෙන සිත්</span><strong>සිත් ' + c.noyedena + '</strong></div>' : '') + '</div>';
    h += '<h3 class="ca-d__h">විස්තරය</h3><p class="ca-d__desc">' + c.desc + '</p>';
    if (lr.lakkhana) {
      h += '<h3 class="ca-d__h">ලක්ඛණාදි චතුක්කය</h3>';
      if (lr.pali_definition) h += '<p class="ca-d__def pali-text">' + lr.pali_definition + '</p>';
      h += '<dl class="ca-lr">' + lrRow('ලක්ඛණ', lr.lakkhana) + lrRow('රස', lr.rasa) + lrRow('පච්චුපට්ඨාන', lr.paccupatthana) + lrRow('පදට්ඨාන', lr.padatthana) + '</dl>';
      if (lr.notes && lr.notes.length) h += '<ul class="ca-d__notes">' + lr.notes.map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ul>';
    }
    body.innerHTML = h;
    $('#ca-prev').hidden = false; $('#ca-next').hidden = false;
    $('#ca-prev').disabled = id <= 1; $('#ca-next').disabled = id >= 52;
    $('#ca-pos').textContent = id + ' / 52';
    show();
    try { history.replaceState(null, '', '#c' + id); } catch (e) {}
  }

  function openRasi(r) {
    cur = 0;
    var tpl = document.getElementById(r.tpl);
    var h = '<p class="ca-d__path">චෛතසික රාශිය</p><h2 class="ca-d__name" id="ca-d-title">' + r.name + ' <span class="ca-d__cnt">' + r.count + '</span></h2>';
    body.innerHTML = h;
    if (tpl) body.appendChild(tpl.content.cloneNode(true));
    var list = el('div', 'ca-d__members');
    r.subs.forEach(function (s) {
      list.appendChild(el('h3', 'ca-d__h', s.name + ' ' + s.ids.length));
      var row = el('div', 'ca-d__chips');
      s.ids.forEach(function (id) {
        var b = el('button', 'ca-opt', id + ' ' + LIST[id - 1].name);
        b.type = 'button';
        b.addEventListener('click', function () { openCet(id); });
        row.appendChild(b);
      });
      list.appendChild(row);
    });
    body.appendChild(list);
    $('#ca-prev').hidden = true; $('#ca-next').hidden = true;
    $('#ca-pos').textContent = '';
    show();
  }

  function show() {
    body.scrollTop = 0;
    if (!dlg.open) { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', ''); }
    $('.ca-d__x', dlg).focus();
  }
  function hide() {
    if (dlg.close) dlg.close(); else dlg.removeAttribute('open');
  }

  function buildDialog() {
    dlg = $('#ca-detail'); if (!dlg) return;
    body = $('.ca-d__body', dlg);
    $('.ca-d__x', dlg).addEventListener('click', hide);
    dlg.addEventListener('click', function (e) { if (e.target === dlg) hide(); });
    dlg.addEventListener('close', function () {
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
      var t = cur && $('.ca-tile[data-id="' + cur + '"]'); if (t) t.focus();
    });
    $('#ca-prev').addEventListener('click', function () { if (cur > 1) openCet(cur - 1); });
    $('#ca-next').addEventListener('click', function () { if (cur < 52) openCet(cur + 1); });
    dlg.addEventListener('keydown', function (e) {
      if (!cur) return;
      if (e.key === 'ArrowRight' && cur < 52) openCet(cur + 1);
      if (e.key === 'ArrowLeft' && cur > 1) openCet(cur - 1);
    });
  }

  // ---------- 7. කොටස් (හැඳින්වීම / සම්ප්‍රයෝගය ...) ----------
  function buildSections() {
    var nav = $('#ca-secnav'); if (!nav) return;
    var btns = $all('button', nav);
    function go(key, scroll) {
      btns.forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.sec === key)); });
      btns.forEach(function (b) { if (b.dataset.sec === key) nav.scrollLeft = Math.max(0, b.offsetLeft - 24); });
      $all('.ca-sec').forEach(function (s) { s.hidden = s.id !== 'sec-' + key; });
      store('ca-sec', key);
      if (scroll) {
        var bar = nav.closest('.ca-secbar') || nav; var y = bar.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--m-header-h')) || 64);
        if (window.scrollY > y) window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    btns.forEach(function (b) { b.addEventListener('click', function () { go(b.dataset.sec, true); }); });
    var saved = store('ca-sec');
    go(saved && $('#sec-' + saved) ? saved : 'intro', false);
    window.caShowSection = go;
  }

  function init() {
    if (!$('#ca-map')) return;
    buildMap(); buildPicker(); buildDialog(); buildSections(); paint();
    var m = /^#c(\d{1,2})$/.exec(location.hash);
    if (m && +m[1] >= 1 && +m[1] <= 52) openCet(+m[1]);
    // සිත් පිටුවෙන් ආ සබැඳිය: #sit=ak:3 → ඒ සිත තෝරා පෙන්වීම
    var s = /^#sit=(\w+):(\d+)$/.exec(location.hash);
    if (s) {
      var chip = $('.ca-chip[data-g="' + s[1] + '"]');
      if (chip) {
        chip.click();
        var o = $('.ca-opt[data-k="' + s[1] + ':' + s[2] + '"]'); if (o) o.click();
        var tools = $('.ca-tools'); if (tools) setTimeout(function () { tools.scrollIntoView({ block: 'start' }); window.scrollBy(0, -80); }, 60);
      }
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    }
  }

  window.CAITASIKA_ATLAS = { list: LIST, cittaGroups: CITTA_GROUPS, openCet: function (id) { openCet(id); } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
