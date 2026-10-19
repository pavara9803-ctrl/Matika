// ============================================================
// citta-atlas.js — සිත් 89 / 121 සිතියම
//   භූමිය අනුව පටි (කාම / රූප / අරූප / ලෝකෝත්තර), ජාතිය අනුව වර්ණ
//   දත්ත: data/paramattha/citta-data.js (citta121Data, cittaDetailData)
// ============================================================
(function () {
  'use strict';
  if (typeof PMAtlas === 'undefined' || typeof citta121Data === 'undefined') return;

  var JATI = { ak: 'අකුසල', ku: 'කුසල', vi: 'විපාක', ki: 'ක්‍රියා' };
  var BHUMI = { kama: 'කාමාවචර', rupa: 'රූපාවචර', arupa: 'අරූපාවචර', lok: 'ලෝකෝත්තර' };
  var VED = { so: 'සෝමනස්ස', up: 'උපේක්ෂා', dom: 'දෝමනස්ස', su: 'සුඛ', du: 'දුක්ඛ' };
  var HETU = ['අහේතුක', 'ඒකහේතුක', 'ද්විහේතුක', 'ත්‍රිහේතුක'];
  var JHANA = ['ප්‍රථම', 'දුතිය', 'තෘතීය', 'චතුර්ථ', 'පඤ්චම'];
  var JH_ANGA = ['විතක්ක, විචාර, පීති, සුඛ, ඒකග්ගතා', 'විචාර, පීති, සුඛ, ඒකග්ගතා', 'පීති, සුඛ, ඒකග්ගතා', 'සුඛ, ඒකග්ගතා', 'උපේක්ෂා, ඒකග්ගතා'];
  var ESSAY = { lobha8Full: 1, dosa2Full: 2, moha2Full: 3, akusalaVipaka7Full: 4, kusalaAhetuka8Full: 4, ahetukaKriya3Full: 4,
    kamaKusala8Full: 5, rupaKusala5Full: 6, arupaKusala4Full: 7, lokuttaraMagga20Full: 8, lokuttaraPhala20Full: 9 };

  var I = {};      // id → සිත
  var no = 0;
  function add(id, o) { o.id = String(id); I[o.id] = o; return o.id; }

  // ---------- අකුසල 12 ----------
  var AK = [], lobhaNames = [
    'සෝමනස්ස සහගත දිට්ඨිගත සම්පයුත්ත අසංඛාරික සිත', 'සෝමනස්ස සහගත දිට්ඨිගත සම්පයුත්ත සසංඛාරික සිත',
    'සෝමනස්ස සහගත දිට්ඨිගත විප්පයුත්ත අසංඛාරික සිත', 'සෝමනස්ස සහගත දිට්ඨිගත විප්පයුත්ත සසංඛාරික සිත',
    'උපේක්ෂා සහගත දිට්ඨිගත සම්පයුත්ත අසංඛාරික සිත', 'උපේක්ෂා සහගත දිට්ඨිගත සම්පයුත්ත සසංඛාරික සිත',
    'උපේක්ෂා සහගත දිට්ඨිගත විප්පයුත්ත අසංඛාරික සිත', 'උපේක්ෂා සහගත දිට්ඨිගත විප්පයුත්ත සසංඛාරික සිත'];
  var LOBHA = lobhaNames.map(function (n, i) {
    return add(++no, { no: no, name: n, short: 'ලෝභ ' + (i + 1), bhumi: 'kama', jati: 'ak', ved: i < 4 ? 'so' : 'up', hetu: 2,
      sankhara: i % 2 ? 'සසංඛාරික' : 'අසංඛාරික', grp: 'lobha8Full', cet: 'ak:' + i, root: 'ලෝභ මූල' });
  });
  var DOSA = ['දෝමනස්ස සහගත පටිඝ සම්පයුත්ත අසංඛාරික සිත', 'දෝමනස්ස සහගත පටිඝ සම්පයුත්ත සසංඛාරික සිත'].map(function (n, i) {
    return add(++no, { no: no, name: n, short: 'දෝස ' + (i + 1), bhumi: 'kama', jati: 'ak', ved: 'dom', hetu: 2,
      sankhara: i ? 'සසංඛාරික' : 'අසංඛාරික', grp: 'dosa2Full', cet: 'ak:' + (8 + i), root: 'දෝස මූල' });
  });
  var MOHA = [['උපේක්ෂා සහගත විචිකිච්ඡා සම්පයුත්ත සිත', 'විචිකිච්ඡා'], ['උපේක්ෂා සහගත උද්ධච්ච සම්පයුත්ත සිත', 'උද්ධච්ච']].map(function (n, i) {
    return add(++no, { no: no, name: n[0], short: n[1], bhumi: 'kama', jati: 'ak', ved: 'up', hetu: 1, grp: 'moha2Full', cet: 'ak:' + (10 + i), root: 'මෝහ මූල' });
  });

  // ---------- අහේතුක 18 ----------
  var vinn = ['චක්ඛු', 'සෝත', 'ඝාන', 'ජිව්හා', 'කාය'];
  var AV = [], KV = [], AKR = [];
  vinn.forEach(function (v, i) {
    AV.push(add(++no, { no: no, name: (i === 4 ? 'දුක්ඛ' : 'උපේක්ෂා') + ' සහගත ' + v + ' විඤ්ඤාණ සිත', short: v + ' විඤ්ඤාණ', bhumi: 'kama', jati: 'vi', ved: i === 4 ? 'du' : 'up', hetu: 0, grp: 'akusalaVipaka7Full', cet: 'ah:0', vk: 'අකුසල විපාක' }));
  });
  AV.push(add(++no, { no: no, name: 'උපේක්ෂා සහගත සම්පටිච්ඡන සිත', short: 'සම්පටිච්ඡන', bhumi: 'kama', jati: 'vi', ved: 'up', hetu: 0, grp: 'akusalaVipaka7Full', cet: 'ah:1', vk: 'අකුසල විපාක' }));
  AV.push(add(++no, { no: no, name: 'උපේක්ෂා සහගත සන්තීරණ සිත', short: 'සන්තීරණ', bhumi: 'kama', jati: 'vi', ved: 'up', hetu: 0, grp: 'akusalaVipaka7Full', cet: 'ah:1', vk: 'අකුසල විපාක' }));
  vinn.forEach(function (v, i) {
    KV.push(add(++no, { no: no, name: (i === 4 ? 'සුඛ' : 'උපේක්ෂා') + ' සහගත ' + v + ' විඤ්ඤාණ සිත', short: v + ' විඤ්ඤාණ', bhumi: 'kama', jati: 'vi', ved: i === 4 ? 'su' : 'up', hetu: 0, grp: 'kusalaAhetuka8Full', cet: 'ah:0', vk: 'කුසල අහේතුක විපාක' }));
  });
  KV.push(add(++no, { no: no, name: 'උපේක්ෂා සහගත සම්පටිච්ඡන සිත', short: 'සම්පටිච්ඡන', bhumi: 'kama', jati: 'vi', ved: 'up', hetu: 0, grp: 'kusalaAhetuka8Full', cet: 'ah:1', vk: 'කුසල අහේතුක විපාක' }));
  KV.push(add(++no, { no: no, name: 'සෝමනස්ස සහගත සන්තීරණ සිත', short: 'සන්තීරණ (සෝම.)', bhumi: 'kama', jati: 'vi', ved: 'so', hetu: 0, grp: 'kusalaAhetuka8Full', cet: 'ah:2', vk: 'කුසල අහේතුක විපාක' }));
  KV.push(add(++no, { no: no, name: 'උපේක්ෂා සහගත සන්තීරණ සිත', short: 'සන්තීරණ (උපෙ.)', bhumi: 'kama', jati: 'vi', ved: 'up', hetu: 0, grp: 'kusalaAhetuka8Full', cet: 'ah:1', vk: 'කුසල අහේතුක විපාක' }));
  [['උපේක්ෂා සහගත පංචද්වාරාවජ්ජන සිත', 'පඤ්චද්වාරාවජ්ජන', 'up', 'ah:1'], ['උපේක්ෂා සහගත මනෝද්වාරාවජ්ජන සිත', 'මනෝද්වාරාවජ්ජන', 'up', 'ah:3'], ['සෝමනස්ස සහගත හසිතුප්පාද සිත', 'හසිතුප්පාද', 'so', 'ah:4']].forEach(function (a) {
    AKR.push(add(++no, { no: no, name: a[0], short: a[1], bhumi: 'kama', jati: 'ki', ved: a[2], hetu: 0, grp: 'ahetukaKriya3Full', cet: a[3] }));
  });

  // ---------- කාමසෝභන 24 ----------
  function kamaSobhana(jati, grp, base, label) {
    var out = [];
    for (var j = 0; j < 8; j++) {
      var som = j < 4, nana = (j % 4) < 2, sas = j % 2 === 1;
      out.push(add(++no, { no: no,
        name: (som ? 'සෝමනස්ස' : 'උපේක්ෂා') + ' සහගත ඤාණ' + (nana ? 'සම්පයුත්ත' : 'විප්පයුත්ත') + ' ' + (sas ? 'සසංඛාරික' : 'අසංඛාරික') + ' සිත',
        short: (som ? 'සෝම.' : 'උපෙ.') + ' ඤාණ' + (nana ? 'සම්.' : 'වි.') + ' ' + (sas ? 'සසං.' : 'අසං.'),
        bhumi: 'kama', jati: jati, ved: som ? 'so' : 'up', hetu: nana ? 3 : 2, sankhara: sas ? 'සසංඛාරික' : 'අසංඛාරික',
        grp: grp, cet: 'ks:' + (base + Math.floor(j / 2)), kl: label }));
    }
    return out;
  }
  var KK = kamaSobhana('ku', 'kamaKusala8Full', 0, 'මහාකුසල්');
  var KVP = kamaSobhana('vi', 'kamaVipaka8Full', 8, 'මහාවිපාක');
  var KKR = kamaSobhana('ki', 'kamaKriya8Full', 4, 'මහාක්‍රියා');

  // ---------- රූපාවචර 15 ----------
  function rupa(jati, grp, word) {
    return JHANA.map(function (j, r) {
      return add(++no, { no: no, name: JH_ANGA[r] + ' සහිත ' + j + ' ධ්‍යාන ' + word + ' සිත', short: j + ' ධ්‍යාන',
        bhumi: 'rupa', jati: jati, ved: r < 4 ? 'so' : 'up', hetu: 3, jh: r, grp: grp, cet: 'mg:' + r });
    });
  }
  var RK = rupa('ku', 'rupaKusala5Full', 'කුසල්'), RV = rupa('vi', 'rupaVipaka5Full', 'විපාක'), RKR = rupa('ki', 'rupaKriya5Full', 'ක්‍රියා');

  // ---------- අරූපාවචර 12 ----------
  var ARU = ['ආකාසානඤ්චායතන', 'විඤ්ඤාණඤ්චායතන', 'ආකිඤ්චඤ්ඤායතන', 'නේවසඤ්ඤානාසඤ්ඤායතන'];
  function arupa(jati, grp, word) {
    return ARU.map(function (a) {
      return add(++no, { no: no, name: a + ' ' + word + ' සිත', short: a, bhumi: 'arupa', jati: jati, ved: 'up', hetu: 3, grp: grp, cet: 'mg:5' });
    });
  }
  var AK4 = arupa('ku', 'arupaKusala4Full', 'කුසල්'), AV4 = arupa('vi', 'arupaVipaka4Full', 'විපාක'), AKR4 = arupa('ki', 'arupaKriya4Full', 'ක්‍රියා');

  // ---------- ලෝකෝත්තර 8 / 40 ----------
  var PATH = ['සෝතාපත්ති', 'සකදාගාමි', 'අනාගාමි', 'අරහත්'];
  var L8M = [], L8P = [], L40 = { m: [], p: [] };
  var no82 = no;
  PATH.forEach(function (p) { L8M.push(add('l' + (++no), { no: no, name: p + ' මග්ග සිත', short: p + ' මග්ග', bhumi: 'lok', jati: 'ku', hetu: 3, grp: 'lokuttaraMagga20Full' })); });
  PATH.forEach(function (p) { L8P.push(add('l' + (++no), { no: no, name: p + ' ඵල සිත', short: p + ' ඵල', bhumi: 'lok', jati: 'vi', hetu: 3, grp: 'lokuttaraPhala20Full' })); });
  var n121 = no82;
  ['m', 'p'].forEach(function (mp) {
    PATH.forEach(function (p) {
      var arr = [];
      JHANA.forEach(function (j, r) {
        arr.push(add('x' + (++n121), { no: n121, name: p + ' ' + (mp === 'm' ? 'මග්ග' : 'ඵල') + ' සිත - ' + JH_ANGA[r].replace(/,/g, '') + ' සහිත ' + j + ' ධ්‍යාන',
          short: j, bhumi: 'lok', jati: mp === 'm' ? 'ku' : 'vi', ved: r < 4 ? 'so' : 'up', hetu: 3, jh: r,
          grp: mp === 'm' ? 'lokuttaraMagga20Full' : 'lokuttaraPhala20Full', cet: 'lk:' + r, path: p }));
      });
      L40[mp].push({ name: p + ' ' + (mp === 'm' ? 'මග්ග' : 'ඵල'), ids: arr });
    });
  });

  function more(key) { var d = citta121Data[key]; return d ? { title: d.title, html: d.desc } : null; }

  function bands(mode) {
    var kama = { key: 'kama', name: 'කාමාවචර', count: 54, cls: 'plain', more: more('citta121Summary') && { title: 'කාමාවචර සිත් 54', html: citta121Data.akusala12Full.desc + citta121Data.ahetuka18Full.desc + citta121Data.kamaKusala24Full.desc }, subs: [
      { name: 'ලෝභ මූල', cls: 'ak', ids: LOBHA }, { name: 'දෝස මූල', cls: 'ak', ids: DOSA }, { name: 'මෝහ මූල', cls: 'ak', ids: MOHA },
      { name: 'අකුසල විපාක (අහේතුක)', cls: 'vi', ids: AV }, { name: 'කුසල විපාක (අහේතුක)', cls: 'vi', ids: KV }, { name: 'අහේතුක ක්‍රියා', cls: 'ki', ids: AKR },
      { name: 'මහාකුසල්', cls: 'ku', ids: KK, wide: true }, { name: 'මහාවිපාක', cls: 'vi', ids: KVP, wide: true }, { name: 'මහාක්‍රියා', cls: 'ki', ids: KKR, wide: true } ] };
    var rup = { key: 'rupa', name: 'රූපාවචර', count: 15, cls: 'plain', more: more('rupa15Full'), subs: [
      { name: 'කුසල්', cls: 'ku', ids: RK, wide: true }, { name: 'විපාක', cls: 'vi', ids: RV, wide: true }, { name: 'ක්‍රියා', cls: 'ki', ids: RKR, wide: true } ] };
    var aru = { key: 'arupa', name: 'අරූපාවචර', count: 12, cls: 'plain', more: more('arupa12Full'), subs: [
      { name: 'කුසල්', cls: 'ku', ids: AK4, wide: true }, { name: 'විපාක', cls: 'vi', ids: AV4, wide: true }, { name: 'ක්‍රියා', cls: 'ki', ids: AKR4, wide: true } ] };
    var lok = mode === 121
      ? { key: 'lok', name: 'ලෝකෝත්තර', count: 40, cls: 'plain', more: more('lokuttara40Full'),
          subs: L40.m.map(function (s) { return { name: s.name, cls: 'ku', ids: s.ids }; }).concat(L40.p.map(function (s) { return { name: s.name, cls: 'vi', ids: s.ids }; })) }
      : { key: 'lok', name: 'ලෝකෝත්තර', count: 8, cls: 'plain', more: more('lokuttara40Full'), subs: [
          { name: 'මග්ග', cls: 'ku', ids: L8M }, { name: 'ඵල', cls: 'vi', ids: L8P } ] };
    rup.moreLabel = aru.moreLabel = lok.moreLabel = kama.moreLabel = 'විස්තරය';
    return [kama, rup, aru, lok];
  }

  function idsOf(mode) {
    var out = [];
    bands(mode).forEach(function (b) { b.subs.forEach(function (s) { out = out.concat(s.ids); }); });
    return out;
  }
  function breakdown(ids) {
    var c = {}; ids.forEach(function (id) { var b = I[id].bhumi; c[b] = (c[b] || 0) + 1; });
    var parts = []; ['kama', 'rupa', 'arupa', 'lok'].forEach(function (b) { if (c[b]) parts.push(BHUMI[b] + ' ' + c[b]); });
    return parts.length > 1 ? parts.join(' + ') + ' = ' + ids.length : '';
  }
  function opt(label, ids, title, extra) {
    var o = { label: label + ' ' + ids.length, title: title || label, ids: ids, note: breakdown(ids) };
    if (extra) for (var k in extra) o[k] = extra[k];
    return o;
  }

  var mode = 89, atlas;
  function pickers(m) {
    var all = idsOf(m), f = function (fn) { return all.filter(function (id) { return fn(I[id]); }); };
    var v121 = idsOf(121), f121 = function (fn) { return v121.filter(function (id) { return fn(I[id]); }); };
    var to121 = function () { if (mode !== 121) setMode(121, true); };
    return [
      { key: 'bh', name: 'භූමිය', options: ['kama', 'rupa', 'arupa', 'lok'].map(function (b) { return opt(BHUMI[b], f(function (c) { return c.bhumi === b; }), BHUMI[b] + ' සිත්'); }) },
      { key: 'ja', name: 'ජාතිය', options: ['ak', 'ku', 'vi', 'ki'].map(function (j) { return opt(JATI[j], f(function (c) { return c.jati === j; }), JATI[j] + ' සිත්'); }) },
      { key: 'he', name: 'හේතු', options: [0, 1, 2, 3].map(function (h) { return opt(HETU[h], f(function (c) { return c.hetu === h; }), HETU[h] + ' සිත්'); }) },
      { key: 've', name: 'වේදනාව', onPick: to121, options: ['su', 'du', 'so', 'dom', 'up'].map(function (v) {
        return opt(VED[v], f121(function (c) { return c.ved === v; }), VED[v] + ' සහගත සිත්', { sub: 'සිත් (වේදනා අනුව ගණන් කරන්නේ සිත් 121 ක්‍රමයෙනි)' }); }) },
      { key: 'so', name: 'සෝභන', options: [
        opt('සෝභන', f(function (c) { return c.jati !== 'ak' && c.hetu > 0; }), 'සෝභන සිත්'),
        opt('අසෝභන', f(function (c) { return c.jati === 'ak' || c.hetu === 0; }), 'අසෝභන සිත් (අකුසල 12 + අහේතුක 18)') ] }
    ];
  }

  function setMode(m, keep) {
    mode = m;
    document.querySelectorAll('#ca-mode button').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.dataset.m === m)); });
    var sel = atlas.state.opt;
    atlas.setBands(bands(m));
    var p = pickers(m);
    if (keep && sel) {
      // වේදනා තේරීම රඳවා ගැනීම
      atlas.setPickers(p); atlas.select(sel);
    } else atlas.setPickers(p);
    var t = document.getElementById('ca-total'); if (t) t.textContent = m;
  }

  function fact(label, v) { return v ? '<div><span>' + label + '</span><strong>' + v + '</strong></div>' : ''; }

  function detail(id) {
    var c = I[id], g = citta121Data[c.grp] || {};
    var h = '<p class="ca-d__path">' + BHUMI[c.bhumi] + ' › ' + (g.title || '') + '</p>';
    h += '<h2 class="ca-d__name" id="ca-d-title"><span class="ca-d__no">' + c.no + '</span>' + c.name + '</h2>';
    h += '<div class="ca-d__grid">' + fact('භූමිය', BHUMI[c.bhumi]) + fact('ජාතිය', c.vk || c.kl || JATI[c.jati]) +
      fact('වේදනාව', c.ved && VED[c.ved]) + fact('හේතු', HETU[c.hetu]) + fact('මූලය', c.root) + fact('සංඛාරය', c.sankhara) +
      fact('ධ්‍යාන අංග', c.jh != null ? JH_ANGA[c.jh] : '') + '</div>';
    if (c.cet) h += '<a class="ca-d__link" href="caitasika.html#sit=' + c.cet + '">මේ සිත සමඟ යෙදෙන චෛතසික බලන්න</a>';
    else if (c.bhumi === 'lok') h += '<p class="ca-d__path" style="margin-top:12px">ධ්‍යාන අනුව චෛතසික බැලීමට ඉහළින් "සිත් 121" තෝරන්න.</p>';
    h += '<h3 class="ca-d__h">' + (g.title || '') + '</h3><div class="ca-d__group">' + (g.desc || '') + '</div>';
    var e = ESSAY[c.grp];
    if (e != null && cittaDetailData[e]) {
      h += '<details class="ca-acc" style="margin-top:16px"><summary>' + cittaDetailData[e].title + '</summary><div class="ca-acc__body">' + cittaDetailData[e].desc + '</div></details>';
    }
    return h;
  }

  var items = {};
  Object.keys(I).forEach(function (k) { var c = I[k]; c.search = c.name + ' ' + c.short + ' ' + (c.root || '') + ' ' + (c.vk || '') + ' ' + (c.kl || '') + ' ' + JATI[c.jati] + ' ' + BHUMI[c.bhumi]; items[k] = c; });

  atlas = PMAtlas.create({
    items: items, bands: bands(89), pickers: pickers(89), unit: 'සිත්', hash: 'c', detail: detail,
    onReady: function (api) {
      document.querySelectorAll('#ca-mode button').forEach(function (b) {
        b.addEventListener('click', function () { setMode(+b.dataset.m); });
      });
      if (/^#cx/.test(location.hash)) { setMode(121); api.open(location.hash.slice(2)); }
      buildReading();
    }
  });

  // සිත් 121 වගුවෙන් (citta121-table.js) සිතක විස්තරය විවෘත කිරීම
  window.CITTA_ATLAS = {
    openCitta: function (id, needs121) {
      if (needs121 && mode !== 121) setMode(121);
      if (I[id]) atlas.open(id);
    }
  };

  // ---------- කියවීමේ කොටස් ----------
  function acc(n, title, html, open) {
    return '<details class="ca-acc"' + (open ? ' open' : '') + '><summary>' + (n != null ? '<span class="ca-acc__n">' + n + '</span>' : '') + '<span>' + title + '</span></summary><div class="ca-acc__body">' + html + '</div></details>';
  }
  function buildReading() {
    var d = document.getElementById('citta-essays');
    if (d) d.innerHTML = cittaDetailData.map(function (x, i) { return acc(null, x.title, x.desc, i === 0); }).join('');
  }
})();
