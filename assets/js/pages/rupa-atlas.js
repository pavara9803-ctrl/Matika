// ============================================================
// rupa-atlas.js — රූප 28 සිතියම
//   නිප්ඵන්න 18 / අනිප්ඵන්න 10, විභාග හා සමුට්ඨාන අනුව දීප්තිමත් කිරීම,
//   එක් එක් රූපයේ ලක්ඛණ, රස, පච්චුපට්ඨාන, පදට්ඨාන
//   දත්ත: data/paramattha/rupa-data.js
// ============================================================
(function () {
  'use strict';
  if (typeof PMAtlas === 'undefined' || typeof rupaLrData === 'undefined') return;

  var SHORT = ['පඨවි', 'ආපෝ', 'තේජෝ', 'වායෝ', 'චක්ඛු', 'සෝත', 'ඝාන', 'ජිව්හා', 'කාය', 'රූප (වණ්ණ)', 'සද්ද', 'ගන්ධ', 'රස',
    'ඉත්ථි භාව', 'පුරිස භාව', 'ජීවිත', 'හදය', 'ආහාර (ඕජා)', 'ආකාස', 'කාය විඤ්ඤත්ති', 'වචී විඤ්ඤත්ති',
    'ලහුතා', 'මුදුතා', 'කම්මඤ්ඤතා', 'උපචය', 'සන්තති', 'ජරතා', 'අනිච්චතා'];

  function r(a, b) { var o = []; for (var i = a; i <= b; i++) o.push(String(i)); return o; }
  function not(ids) { return r(1, 28).filter(function (i) { return ids.indexOf(i) < 0; }); }

  var PASADA = r(5, 9), AVINIB = ['1', '2', '3', '4', '10', '12', '13', '18'], VIKARA = r(22, 24);
  var OLARIKA = ['1', '3', '4'].concat(r(5, 13));
  var EK_KAMMA = PASADA.concat(['14', '15', '16', '17']);
  var KAMMAJA = EK_KAMMA.concat(AVINIB, ['19']);
  var CITTAJA = AVINIB.concat(['19', '11', '20', '21'], VIKARA);
  var UTUJA = AVINIB.concat(['19', '11'], VIKARA);
  var AHARAJA = AVINIB.concat(['19'], VIKARA);

  // විභාගය: [vibhagaCategories යතුර, රූප]
  var SETS = {
    ajjhattika5: PASADA, bahira23: not(PASADA), vatthu6: PASADA.concat(['17']), dvara7: PASADA.concat(['20', '21']),
    indriya8: PASADA.concat(['14', '15', '16']), olarika12: OLARIKA, sukhuma16: not(OLARIKA), santike12: OLARIKA, dure16: not(OLARIKA),
    gocaraggahika5: PASADA, avinibbhoga8: AVINIB, vinibbhoga20: not(AVINIB),
    kammaja18: KAMMAJA, cittaja15: CITTAJA, utuja13: UTUJA, aharaja12: AHARAJA, asamutthana4: r(25, 28),
    ekantaKammaja9: EK_KAMMA, anekantaKammaja9: AVINIB.concat(['19']), ekantaCittaja2: ['20', '21'],
    anekantaCittaja13: AVINIB.concat(['19', '11'], VIKARA), anekantaUtuja13: UTUJA, anekantaAharaja12: AHARAJA,
    ekantaAharajaNovana: PASADA.concat(['14', '15', '16', '17', '11', '20', '21'])
  };
  // ගණන් සහ මාතෘකා එකඟදැයි පරීක්ෂාව
  Object.keys(SETS).forEach(function (k) {
    var m = /(\d+)\)?$/.exec((vibhagaCategories[k] || {}).title || '');
    if (m && +m[1] !== SETS[k].length && window.console) console.warn('[rupa-atlas] ගණන නොගැළපේ:', k, m[1], SETS[k].length);
  });

  function opt(k, label) {
    var c = vibhagaCategories[k];
    return { label: label || c.title.replace(/ රූප/, ''), title: c.title, ids: SETS[k], desc: c.desc, key: k };
  }
  var PICKERS = [
    { key: 'vb', name: 'රූප විභාගය', options: [opt('ajjhattika5', 'අජ්ඣත්තික 5'), opt('bahira23', 'බාහිර 23'), opt('vatthu6', 'වත්ථු 6'), opt('dvara7', 'ද්වාර 7'),
      opt('indriya8', 'ඉන්ද්‍රිය 8'), opt('olarika12', 'ඔළාරික 12'), opt('sukhuma16', 'සුඛුම 16'), opt('santike12', 'සන්තිකේ 12'), opt('dure16', 'දූරේ 16'),
      opt('gocaraggahika5', 'ගෝචරග්ගාහික 5'), opt('avinibbhoga8', 'අවිනිබ්භෝග 8'), opt('vinibbhoga20', 'විනිබ්භෝග 20')] },
    { key: 'sm', name: 'සමුට්ඨානය', options: [opt('kammaja18', 'කර්මජ 18'), opt('cittaja15', 'චිත්තජ 15'), opt('utuja13', 'උතුජ 13'), opt('aharaja12', 'ආහාරජ 12'), opt('asamutthana4', 'නූපදින 4')] },
    { key: 'ek', name: 'ඒකාන්ත / අනේකාන්ත', options: [opt('ekantaKammaja9', 'ඒකාන්ත කර්මජ 9'), opt('anekantaKammaja9', 'අනේකාන්ත කර්මජ 9'),
      opt('ekantaCittaja2', 'ඒකාන්ත චිත්තජ 2'), opt('anekantaCittaja13', 'අනේකාන්ත චිත්තජ 13'), opt('anekantaUtuja13', 'අනේකාන්ත උතුජ 13'),
      opt('anekantaAharaja12', 'අනේකාන්ත ආහාරජ 12'), opt('ekantaAharajaNovana', 'ආහාරයෙන් නූපදින 12')] }
  ];
  PICKERS.forEach(function (p) { p.options.forEach(function (o) { o.sub = 'රූප'; }); });

  var items = {};
  rupaLrData.forEach(function (d, i) {
    var id = String(i + 1);
    items[id] = { no: i + 1, name: d.name, short: SHORT[i], cat: d.category, data: d,
      search: d.name + ' ' + SHORT[i] + ' ' + d.id + ' ' + d.category };
  });

  var BANDS = [
    { key: 'nip', name: 'නිප්ඵන්න රූප', count: 18, cls: 'an', more: { title: vibhagaCategories.rupa28.title, html: vibhagaCategories.rupa28.desc }, subs: [
      { name: 'මහාභූත', cls: 'vi', ids: r(1, 4) }, { name: 'පසාද', cls: 'vi', ids: r(5, 9) }, { name: 'ගෝචර', cls: 'vi', ids: r(10, 13) },
      { name: 'භාව', cls: 'vi', ids: ['14', '15'] }, { name: 'ජීවිත', cls: 'vi', ids: ['16'] }, { name: 'හදය', cls: 'vi', ids: ['17'] }, { name: 'ආහාර', cls: 'vi', ids: ['18'] } ] },
    { key: 'anip', name: 'අනිප්ඵන්න රූප', count: 10, cls: 'ki', subs: [
      { name: 'පරිච්ඡේද', cls: 'ki', ids: ['19'] }, { name: 'විඤ්ඤත්ති', cls: 'ki', ids: ['20', '21'] }, { name: 'විකාර', cls: 'ki', ids: r(22, 24) }, { name: 'ලක්ඛණ', cls: 'ki', ids: r(25, 28) } ] }
  ];

  function lrRow(label, v) { return v ? '<div class="ca-lr__row"><dt>' + label + '</dt><dd>' + v + '</dd></div>' : ''; }

  function detail(id) {
    var it = items[id], d = it.data;
    var member = [];
    PICKERS.forEach(function (p) { p.options.forEach(function (o) { if (o.ids.indexOf(id) >= 0) member.push(o.label); }); });
    var h = '<p class="ca-d__path">' + (+id <= 18 ? 'නිප්ඵන්න' : 'අනිප්ඵන්න') + ' › ' + d.category + '</p>';
    h += '<h2 class="ca-d__name" id="ca-d-title"><span class="ca-d__no">' + id + '</span>' + d.name + '</h2>';
    if (d.pali && d.pali.length) h += '<div class="ca-d__palis pali-text">' + d.pali.map(function (p) { return '<div>' + p + '</div>'; }).join('') + '</div>';
    h += '<h3 class="ca-d__h">ලක්ඛණාදි චතුක්කය</h3><dl class="ca-lr">' + lrRow('ලක්ඛණ', d.lakhana) + lrRow('රස', d.rasa) + lrRow('පච්චුපට්ඨාන', d.paccupatthana) + lrRow('පදට්ඨාන', d.padatthana) + '</dl>';
    if (d.note) h += '<ul class="ca-d__notes"><li>' + d.note + '</li></ul>';
    if (member.length) h += '<h3 class="ca-d__h">අයත් වන කොටස්</h3><div class="ca-d__chips">' + member.map(function (m) { return '<span class="ca-opt">' + m + '</span>'; }).join('') + '</div>';
    return h;
  }

  PMAtlas.create({ items: items, bands: BANDS, pickers: PICKERS, unit: 'රූප', hash: 'r', detail: detail, onReady: buildReading });

  // ---------- කියවීමේ කොටස් ----------
  function buildReading() {
    var v = document.getElementById('rupa-vibhaga');
    if (v) {
      var groups = [['රූප විභාගය', ['rupa28', 'ajjhattika5', 'bahira23', 'vatthu6', 'dvara7', 'indriya8', 'olarika12', 'sukhuma16', 'santike12', 'dure16', 'gocaraggahika5', 'avinibbhoga8', 'vinibbhoga20']],
        ['සමුට්ඨාන නය', ['kammaja18', 'cittaja15', 'utuja13', 'aharaja12', 'asamutthana4']],
        ['ඒකාන්ත සහ අනේකාන්ත', ['ekantaKammaja9', 'anekantaKammaja9', 'ekantaCittaja2', 'anekantaCittaja13', 'ekantaUtuja', 'anekantaUtuja13', 'ekantaAharaja', 'anekantaAharaja12', 'ekantaAharajaNovana']]];
      v.innerHTML = groups.map(function (g) {
        return '<h3 class="ca-d__h" style="font-size:17px">' + g[0] + '</h3><div class="ca-cards">' + g[1].map(function (k) {
          var c = vibhagaCategories[k];
          return '<div class="ca-card"><h3>' + c.title + '</h3><div>' + c.desc + '</div>' + (SETS[k] ? '<button type="button" data-k="' + k + '">සිතියමේ පෙන්වන්න</button>' : '') + '</div>';
        }).join('') + '</div>';
      }).join('');
      v.addEventListener('click', function (e) {
        var b = e.target.closest('button[data-k]'); if (!b) return;
        var k = b.getAttribute('data-k');
        PICKERS.forEach(function (p) { p.options.forEach(function (o, i) { if (o.key === k) {
          var chip = document.querySelector('.ca-chip[data-g="' + p.key + '"]');
          if (chip && chip.getAttribute('aria-pressed') !== 'true') chip.click();
          var ob = document.querySelector('.ca-opt[data-k="' + p.key + ':' + i + '"]'); if (ob) ob.click();
          document.querySelector('.ca-tools').scrollIntoView({ behavior: 'smooth', block: 'start' });
        } }); });
      });
    }
    var lr = document.getElementById('rupa-lr-intro');
    if (lr && typeof rupaIntroData !== 'undefined') {
      var I = rupaIntroData, w = I.whyMeditate, p = I.patisambhida, d = I.definitions, m = rupaBhavanaMethod;
      var h = '<div class="ca-panel"><p class="ca-hero__kicker" style="text-align:center">' + I.namaskara + '</p>';
      h += '<h3 class="ca-d__h">' + w.heading + '</h3><p class="ca-d__path">' + w.suttaSource + '</p>';
      h += '<p class="ca-d__palis pali-text">' + w.paliText + '</p><p>' + w.sinhalaMeaning + '</p><p>' + w.commentaryExplanation + '</p>';
      h += '<h3 class="ca-d__h">' + d.heading + '</h3><dl class="ca-lr">' + d.items.map(function (x) {
        return '<div class="ca-lr__row"><dt>' + x.term + '</dt><dd>' + x.desc + '<span class="ca-lr__pali pali-text">' + x.pali + '</span></dd></div>'; }).join('') + '</dl>';
      h += '<h3 class="ca-d__h">' + p.heading + '</h3><dl class="ca-lr">' + p.items.map(function (x) {
        return '<div class="ca-lr__row"><dt>' + x.name + '</dt><dd>' + x.desc + '</dd></div>'; }).join('') + '</dl>';
      if (p.causes) h += '<p>' + (typeof p.causes === 'string' ? p.causes : (p.causes.heading ? '<strong>' + p.causes.heading + '</strong> ' : '') + (p.causes.items || p.causes.list || []).join(', ')) + '</p>';
      h += '</div>';
      h += '<div class="ca-panel"><h3 class="ca-d__h" style="margin-top:0">' + m.title + '</h3><ol style="list-style:none;padding:0;margin:0;display:grid;gap:10px">' +
        m.instructions.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol><p><strong>' + m.conclusion + '</strong></p></div>';
      lr.innerHTML = h;
    }
    if (typeof initRupaDeta === 'function') initRupaDeta();
  }
})();
