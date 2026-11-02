// ============================================================
// සිත් 121 වගුව — මූලාශ්‍රය: "සිත් 121" වගු PDF (Pavarachitta, 2022)
//   PDF එකේ ඇති පාඨය හා අංක එලෙසම (සෑම සිතකම අගට "සිත" යොදා ඇත).
//   පැහැදිලි මුද්‍රණ දෝෂ කිහිපයක් පමණක් නිවැරදි කර ඇත
//   (පහත FIXES බලන්න).
//   ව්‍යුහය: CITTA121_TABLE = [ { title, count, parts:[ { title, count, cols:[...], subs:[ { name, rows:[ {n, c:[...]} ] } ] } ] } ]
// ============================================================
(function () {
  var SO = 'සෝමනස්ස සහගත', UP = 'උපෙක්ඛා සහගත', DOM = 'දෝමනස්ස සහගත', DU = 'දුක්ඛ සහගත', SU = 'සුඛ සහගත';
  var DS = 'දිට්ඨිගත සම්පයුත්ත', DV = 'දිට්ඨිගත විප්පයුත්ත';
  var NS = 'ඥාණ සම්පයුත්ත', NV = 'ඥාණ විප්පයුත්ත';
  var A = 'අසඞ්ඛාරික සිත', S = 'සසඞ්ඛාරික සිත';

  // ---------- පාලි (රෝමන්) ලේබල — English දසුනේදී වගුවේ පෙන්වීමට ----------
  //   සිංහල පාඨය කිසිවිටෙක වෙනස් නොවේ; මෙය සිංහල → පාලි සිතියමක් පමණි.
  var PA = {};
  function pa(map) { for (var k in map) PA[k] = map[k]; }
  pa({
    // වේදනා / ඥාණ / සඞ්ඛාර
    'සෝමනස්ස සහගත': 'Somanassasahagataṃ', 'උපෙක්ඛා සහගත': 'Upekkhāsahagataṃ', 'දෝමනස්ස සහගත': 'Domanassasahagataṃ',
    'දුක්ඛ සහගත': 'Dukkhasahagataṃ', 'සුඛ සහගත': 'Sukhasahagataṃ',
    'දිට්ඨිගත සම්පයුත්ත': 'Diṭṭhigatasampayuttaṃ', 'දිට්ඨිගත විප්පයුත්ත': 'Diṭṭhigatavippayuttaṃ',
    'ඥාණ සම්පයුත්ත': 'Ñāṇasampayuttaṃ', 'ඥාණ විප්පයුත්ත': 'Ñāṇavippayuttaṃ',
    'අසඞ්ඛාරික සිත': 'Asaṅkhārikaṃ', 'සසඞ්ඛාරික සිත': 'Sasaṅkhārikaṃ',
    'පටිඝ සම්පයුත්ත': 'Paṭighasampayuttaṃ', 'විචිකිච්ඡා සම්පයුත්ත සිත': 'Vicikicchāsampayuttaṃ', 'උද්ධච්ච සම්පයුත්ත සිත': 'Uddhaccasampayuttaṃ',
    // අහේතුක සිත්
    'චක්ඛුවිඤ්ඤාණ සිත': 'Cakkhuviññāṇaṃ', 'සෝතවිඤ්ඤාණ සිත': 'Sotaviññāṇaṃ', 'ඝානවිඤ්ඤාණ සිත': 'Ghānaviññāṇaṃ',
    'ජිව්හාවිඤ්ඤාණ සිත': 'Jivhāviññāṇaṃ', 'කායවිඤ්ඤාණ සිත': 'Kāyaviññāṇaṃ',
    'සම්පටිච්ඡන සිත': 'Sampaṭicchanaṃ', 'සන්තීරණ සිත': 'Santīraṇaṃ',
    'පඤ්චද්වාරාවජ්ජන සිත': 'Pañcadvārāvajjanaṃ', 'මනෝද්වාරාවජ්ජන සිත': 'Manodvārāvajjanaṃ', 'හසිතුප්පාද සිත': 'Hasituppādacittaṃ',
    // අරූපාවචර සිත්
    'ආකාසානඤ්චායතන සිත': 'Ākāsānañcāyatanaṃ', 'විඤ්ඤාණඤ්චායතන සිත': 'Viññāṇañcāyatanaṃ',
    'ආකිඤ්චඤ්ඤායතන සිත': 'Ākiñcaññāyatanaṃ', 'නෙවසඤ්ඤානාසඤ්ඤායතන සිත': 'Nevasaññānāsaññāyatanaṃ',
    // ශීර්ෂ: කොටස් / උප කොටස් / තීරු
    'කාමාවචර සිත්': 'Kāmāvacaracittāni', 'මහග්ගත සිත්': 'Mahaggatacittāni', 'ලෝකෝත්තර සිත්': 'Lokuttaracittāni',
    'අකුසල් සිත්': 'Akusalacittāni', 'අහේතුක සිත්': 'Ahetukacittāni', 'සෝභන සිත්': 'Sobhanacittāni',
    'රූපාවචර සිත්': 'Rūpāvacaracittāni', 'අරූපාවචර සිත්': 'Arūpāvacaracittāni',
    'මාර්ග සිත්': 'Maggacittāni', 'ඵල සිත්': 'Phalacittāni', 'විස්ථාර ක්‍රමයට': 'Vitthāranayena',
    'ලෝභ': 'Lobha', 'දෝස': 'Dosa', 'මෝහ': 'Moha', 'අකුසල විපාක': 'Akusalavipāka', 'කුසල විපාක': 'Kusalavipāka',
    'කුසල් සිත්': 'Kusala', 'විපාක සිත්': 'Vipāka', 'ක්‍රියා සිත්': 'Kiriya',
    'වේදනා': 'Vedanā', 'දිට්ඨි': 'Diṭṭhi', 'සඞ්ඛාර': 'Saṅkhāra', 'සිත': 'Citta', 'ඥාණ': 'Ñāṇa',
    'විචිකිච්ඡා & උද්ධච්ච': 'Vicikicchā & Uddhacca',
    'සෝතාපත්ති මාර්ග': 'Sotāpattimaggo', 'සකදාගාමි මාර්ග': 'Sakadāgāmimaggo', 'අනාගාමි මාර්ග': 'Anāgāmimaggo', 'අරිහත් මාර්ග': 'Arahattamaggo',
    'සෝතාපත්ති ඵල': 'Sotāpattiphalaṃ', 'සකදාගාමි ඵල': 'Sakadāgāmiphalaṃ', 'අනාගාමි ඵල': 'Anāgāmiphalaṃ', 'අරිහත් ඵල': 'Arahattaphalaṃ'
  });
  var JP = [
    ['Vitakkavicārapītisukhekaggatāsahitaṃ', 'paṭhamajjhānaṃ'], ['Vicārapītisukhekaggatāsahitaṃ', 'dutiyajjhānaṃ'],
    ['Pītisukhekaggatāsahitaṃ', 'tatiyajjhānaṃ'], ['Sukhekaggatāsahitaṃ', 'catutthajjhānaṃ'], ['Upekkhekaggatāsahitaṃ', 'pañcamajjhānaṃ']
  ];
  var PP = { 'සෝතාපත්ති': 'sotāpatti', 'සකදාගාමි': 'sakadāgāmi', 'අනාගාමි': 'anāgāmi', 'අරිහත්': 'arahatta' };

  var n = 0;
  function r() { n++; return { n: n, c: Array.prototype.slice.call(arguments) }; }
  function eight(first, second) {
    var out = [];
    [SO, UP].forEach(function (v) { [first, second].forEach(function (d) { [A, S].forEach(function (s) { out.push(r(v, d, s)); }); }); });
    return out;
  }
  var JH = [
    ['විතක්කවිචාරපීතිසුඛෙකග්ගතා සහිත', 'පඨමජ්ඣාන'],
    ['විචාරපීතිසුඛෙකග්ගතා සහිත', 'දුතියජ්ඣාන'],
    ['පීතිසුඛෙකග්ගතා සහිත', 'තතියජ්ඣාන'],
    ['සුඛෙකග්ගතා සහිත', 'චතුත්ථජ්ඣාන'],
    ['උපෙක්ඛෙකග්ගතා සහිත', 'පඤ්චමජ්ඣාන']
  ];
  function rupa() { return JH.map(function (j, i) { var key = j[0] + ' ' + j[1] + ' සිත'; PA[key] = JP[i][0] + ' ' + JP[i][1]; var x = r(key); x.jh = i; return x; }); }
  var ARU = ['ආකාසානඤ්චායතන සිත', 'විඤ්ඤාණඤ්චායතන සිත', 'ආකිඤ්චඤ්ඤායතන සිත', 'නෙවසඤ්ඤානාසඤ්ඤායතන සිත'];
  function arupa() { return ARU.map(function (a) { return r(a); }); }
  var PATH = ['සෝතාපත්ති', 'සකදාගාමි', 'අනාගාමි', 'අරිහත්'];
  function lok(kind) {
    var subs = [];
    PATH.forEach(function (p) {
      subs.push({ name: p + ' ' + kind, rows: JH.map(function (j, i) {
        var key = j[0].replace(' සහිත', 'සහිත') + ' ' + j[1] + ' ' + p + ' ' + kind + ' සිත';
        PA[key] = JP[i][0] + ' ' + JP[i][1] + ' ' + PP[p] + (kind === 'මාර්ග' ? 'maggacittaṃ' : 'phalacittaṃ');
        var x = r(key); x.jh = i; return x; }) });
    });
    return subs;
  }
  var vinn = ['චක්ඛුවිඤ්ඤාණ සිත', 'සෝතවිඤ්ඤාණ සිත', 'ඝානවිඤ්ඤාණ සිත', 'ජිව්හාවිඤ්ඤාණ සිත', 'කායවිඤ්ඤාණ සිත'];

  var kama = { title: 'කාමාවචර සිත්', count: 54, parts: [
    { title: 'අකුසල් සිත්', count: 12, subs: [
      { name: 'ලෝභ', cols: ['වේදනා', 'දිට්ඨි', 'සඞ්ඛාර'], rows: eight(DS, DV) },
      { name: 'දෝස', cols: ['වේදනා', '', 'සඞ්ඛාර'], rows: [r(DOM, 'පටිඝ සම්පයුත්ත', A), r(DOM, 'පටිඝ සම්පයුත්ත', S)] },
      { name: 'මෝහ', cols: ['වේදනා', 'විචිකිච්ඡා & උද්ධච්ච'], rows: [r(UP, 'විචිකිච්ඡා සම්පයුත්ත සිත'), r(UP, 'උද්ධච්ච සම්පයුත්ත සිත')] }
    ] },
    { title: 'අහේතුක සිත්', count: 18, subs: [
      { name: 'අකුසල විපාක', cols: ['වේදනා', 'සිත'], rows: vinn.map(function (v, i) { return r(i === 4 ? DU : UP, v); }).concat([r(UP, 'සම්පටිච්ඡන සිත'), r(UP, 'සන්තීරණ සිත')]) },
      { name: 'කුසල විපාක', cols: ['වේදනා', 'සිත'], rows: vinn.map(function (v, i) { return r(i === 4 ? SU : UP, v); }).concat([r(UP, 'සම්පටිච්ඡන සිත'), r(UP, 'සන්තීරණ සිත'), r(SO, 'සන්තීරණ සිත')]) },
      { name: 'ක්‍රියා සිත්', cols: ['වේදනා', 'සිත'], rows: [r(UP, 'පඤ්චද්වාරාවජ්ජන සිත'), r(UP, 'මනෝද්වාරාවජ්ජන සිත'), r(SO, 'හසිතුප්පාද සිත')] }
    ] },
    { title: 'සෝභන සිත්', count: 24, subs: [
      { name: 'කුසල් සිත්', cols: ['වේදනා', 'ඥාණ', 'සඞ්ඛාර'], rows: eight(NS, NV) },
      { name: 'විපාක සිත්', cols: ['වේදනා', 'ඥාණ', 'සඞ්ඛාර'], rows: eight(NS, NV) },
      { name: 'ක්‍රියා සිත්', cols: ['වේදනා', 'ඥාණ', 'සඞ්ඛාර'], rows: eight(NS, NV) }
    ] }
  ] };
  var mahaggata = { title: 'මහග්ගත සිත්', count: 27, parts: [
    { title: 'රූපාවචර සිත්', count: 15, subs: [{ name: 'කුසල් සිත්', rows: rupa() }, { name: 'විපාක සිත්', rows: rupa() }, { name: 'ක්‍රියා සිත්', rows: rupa() }] },
    { title: 'අරූපාවචර සිත්', count: 12, subs: [{ name: 'කුසල් සිත්', rows: arupa() }, { name: 'විපාක සිත්', rows: arupa() }, { name: 'ක්‍රියා සිත්', rows: arupa() }] }
  ] };
  var lokuttara = { title: 'ලෝකෝත්තර සිත්', count: 40, note: 'විස්ථාර ක්‍රමයට', parts: [
    { title: 'මාර්ග සිත්', count: 20, subs: lok('මාර්ග') },
    { title: 'ඵල සිත්', count: 20, subs: lok('ඵල') }
  ] };

  // සෑම ශීර්ෂයකටම/පේළියකටම පාලි සමානය (.p) එකතු කරයි — සිංහල පාඨයට කිසිදු වෙනසක් නැත
  function P(x) { return Object.prototype.hasOwnProperty.call(PA, x) ? PA[x] : x; }
  [kama, mahaggata, lokuttara].forEach(function (g) {
    g.p = P(g.title); if (g.note) g.pnote = P(g.note);
    g.parts.forEach(function (pt) {
      pt.p = P(pt.title);
      pt.subs.forEach(function (sb) {
        sb.p = P(sb.name);
        if (sb.cols) sb.pcols = sb.cols.map(P);
        sb.rows.forEach(function (rw) { rw.p = rw.c.map(P); });
      });
    });
  });

  window.CITTA121_TABLE = [kama, mahaggata, lokuttara];
  window.CITTA121_TABLE_FIXES = [
    'රූපාවචර පඨමජ්ඣාන පේළිවල "පඨමජ්ඣා සිත" → "පඨමජ්ඣාන සිත"',
    'මෝහ මූල ශීර්ෂයේ "උද්ධච්ඡ" → "උද්ධච්ච", 12 වන සිතේ "උද්ධච්චස ම්පයුත්ත" → "උද්ධච්ච සම්පයුත්ත"',
    '119, 120 වන සිත් (ඵල සිත් කොටසේ) "අරිහත් මාර්ග සිත" → "අරිහත් ඵල සිත"'
  ];
})();
