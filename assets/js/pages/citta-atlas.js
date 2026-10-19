// ============================================================
// citta-atlas.js — සිත් පිටුව: සිත් 121 හි ලක්ෂණ, විස්තර පත්‍රය සහ කියවීමේ කොටස්
//   (සිත් 121 වගුවේ පේළියක් එබූ විට විස්තර පත්‍රය විවෘත වේ)
//   දත්ත: data/paramattha/citta-data.js (citta121Data, cittaDetailData, cittaData)
// ============================================================
(function () {
  'use strict';
  if (typeof citta121Data === 'undefined') return;

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

  // PDF වගුවේ අංකය (1-121) → සිතේ හැඳුනුම
  //   (වගුවේ 26 = උපෙක්ඛා සන්තීරණ, 27 = සෝමනස්ස සන්තීරණ)
  function idOf(n) { return n === 26 ? '27' : n === 27 ? '26' : n >= 82 ? 'x' + n : String(n); }

  function fact(label, v) { return v ? '<div><span>' + label + '</span><strong>' + v + '</strong></div>' : ''; }

  function detail(id) {
    var c = I[id], g = citta121Data[c.grp] || {};
    var h = '<p class="ca-d__path">' + BHUMI[c.bhumi] + ' › ' + (g.title || '') + '</p>';
    h += '<h2 class="ca-d__name" id="ca-d-title"><span class="ca-d__no">' + c.no + '</span>' + c.name + '</h2>';
    h += '<div class="ca-d__grid">' + fact('භූමිය', BHUMI[c.bhumi]) + fact('ජාතිය', c.vk || c.kl || JATI[c.jati]) +
      fact('වේදනාව', c.ved && VED[c.ved]) + fact('හේතු', HETU[c.hetu]) + fact('මූලය', c.root) + fact('සංඛාරය', c.sankhara) +
      fact('ධ්‍යාන අංග', c.jh != null ? JH_ANGA[c.jh] : '') + '</div>';
    if (c.cet) h += '<a class="ca-d__link" href="caitasika.html#sit=' + c.cet + '">මේ සිත සමඟ යෙදෙන චෛතසික බලන්න</a>';
    h += '<h3 class="ca-d__h">' + (g.title || '') + '</h3><div class="ca-d__group">' + (g.desc || '') + '</div>';
    var e = ESSAY[c.grp];
    if (e != null && cittaDetailData[e]) {
      h += '<details class="ca-acc" style="margin-top:16px"><summary>' + cittaDetailData[e].title + '</summary><div class="ca-acc__body">' + cittaDetailData[e].desc + '</div></details>';
    }
    return h;
  }

  // ---------- විස්තර පත්‍රය (සිත් 121 වගුවේ පේළියක් එබූ විට) ----------
  var dlg = document.getElementById('ca-detail'), body = dlg && dlg.querySelector('.ca-d__body'), curN = 0;
  function openN(n) {
    if (!dlg || n < 1 || n > 121) return;
    curN = n;
    var c = I[idOf(n)];
    body.innerHTML = detail(idOf(n)).replace('<span class="ca-d__no">' + c.no + '</span>', '<span class="ca-d__no">' + n + '</span>');
    document.getElementById('ca-prev').disabled = n <= 1;
    document.getElementById('ca-next').disabled = n >= 121;
    document.getElementById('ca-pos').textContent = n + ' / 121';
    body.scrollTop = 0;
    if (!dlg.open) { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', ''); }
    try { history.replaceState(null, '', '#c' + n); } catch (e) {}
  }
  if (dlg) {
    var close = function () { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); };
    dlg.querySelector('.ca-d__x').addEventListener('click', close);
    dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); });
    dlg.addEventListener('close', function () {
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
      var r = document.querySelector('.ct-row[data-n="' + curN + '"]'); if (r) r.focus();
    });
    document.getElementById('ca-prev').addEventListener('click', function () { openN(curN - 1); });
    document.getElementById('ca-next').addEventListener('click', function () { openN(curN + 1); });
    dlg.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') openN(curN + 1); if (e.key === 'ArrowLeft') openN(curN - 1); });
  }

  // සිත් 121 වගුව (citta121-table.js) සඳහා
  window.CITTA_ATLAS = {
    open: openN,
    info: function (n) { var c = I[idOf(n)]; return c ? { jati: c.jati, hetu: c.hetu, ved: c.ved, bhumi: c.bhumi } : null; }
  };

  function start() {
    buildReading();
    if (window.PMAtlas) PMAtlas.sections();
    var m = /^#c(\d{1,3})$/.exec(location.hash); if (m) openN(+m[1]);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();


  // ---------- කියවීමේ කොටස් ----------
  function acc(n, title, html, open) {
    return '<details class="ca-acc"' + (open ? ' open' : '') + '><summary>' + (n != null ? '<span class="ca-acc__n">' + n + '</span>' : '') + '<span>' + title + '</span></summary><div class="ca-acc__body">' + html + '</div></details>';
  }
  function buildReading() {
    var g = document.getElementById('citta-groups');
    if (g) {
      var order = [['citta121Summary'], ['akusala12Full', 'lobha8Full', 'dosa2Full', 'moha2Full'], ['ahetuka18Full', 'akusalaVipaka7Full', 'kusalaAhetuka8Full', 'ahetukaKriya3Full'],
        ['kamaKusala24Full', 'kamaKusala8Full', 'kamaVipaka8Full', 'kamaKriya8Full'], ['rupa15Full', 'rupaKusala5Full', 'rupaVipaka5Full', 'rupaKriya5Full'],
        ['arupa12Full', 'arupaKusala4Full', 'arupaVipaka4Full', 'arupaKriya4Full'], ['lokuttara40Full', 'lokuttaraMagga20Full', 'lokuttaraPhala20Full']];
      g.innerHTML = order.map(function (grp, i) {
        var head = citta121Data[grp[0]];
        var inner = head.desc + grp.slice(1).map(function (k) { return '<h4 class="ca-d__h">' + citta121Data[k].title + '</h4>' + citta121Data[k].desc; }).join('');
        return acc(null, head.title, inner, i === 0);
      }).join('');
    }
    var d = document.getElementById('citta-essays');
    if (d) d.innerHTML = cittaDetailData.map(function (x, i) { return acc(null, x.title, x.desc, i === 0); }).join('');
    var c = document.getElementById('citta-cards');
    if (c && typeof cittaData !== 'undefined') {
      c.innerHTML = cittaData.map(function (s) {
        return '<div class="ca-card"><h3>' + s.category + '</h3><p>' + s.description + '</p><ul>' +
          s.items.map(function (it) { return '<li>' + it.name + ' — <strong>' + it.role + '</strong></li>'; }).join('') + '</ul></div>';
      }).join('');
    }
  }
})();
