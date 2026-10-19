// ============================================================
// සිත් 121 වගුව — මූලාශ්‍රය: "සිත් 121" වගු PDF (Pavarachitta, 2022)
//   PDF එකේ ඇති පාඨය හා අංක එලෙසම. පැහැදිලි මුද්‍රණ දෝෂ 4ක් පමණක් නිවැරදි කර ඇත
//   (පහත FIXES බලන්න).
//   ව්‍යුහය: CITTA121_TABLE = [ { title, count, parts:[ { title, count, cols:[...], subs:[ { name, rows:[ {n, c:[...]} ] } ] } ] } ]
// ============================================================
(function () {
  var SO = 'සෝමනස්ස සහගත', UP = 'උපෙක්ඛා සහගත', DOM = 'දෝමනස්ස සහගත', DU = 'දුක්ඛ සහගත', SU = 'සුඛ සහගත';
  var DS = 'දිට්ඨිගත සම්පයුත්ත', DV = 'දිට්ඨිගත විප්පයුත්ත';
  var NS = 'ඥාණ සම්පයුත්ත', NV = 'ඥාණ විප්පයුත්ත';
  var A = 'අසඞ්ඛාරික', S = 'සසඞ්ඛාරික';

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
  function rupa() { return JH.map(function (j, i) { var x = r(j[0] + ' ' + j[1] + ' සිත'); x.jh = i; return x; }); }
  var ARU = ['ආකාසානඤ්චායතනය', 'විඤ්ඤාණඤ්චායතනය', 'ආකිඤ්චඤ්ඤායතනය', 'නෙවසඤ්ඤානාසඤ්ඤායතනය'];
  function arupa() { return ARU.map(function (a) { return r(a); }); }
  var PATH = ['සෝතාපත්ති', 'සකදාගාමි', 'අනාගාමි', 'අරිහත්'];
  function lok(kind) {
    var subs = [];
    PATH.forEach(function (p) {
      subs.push({ name: p + ' ' + kind, rows: JH.map(function (j, i) {
        var x = r(j[0].replace(' සහිත', 'සහිත') + ' ' + j[1] + ' ' + p + ' ' + kind + ' සිත'); x.jh = i; return x; }) });
    });
    return subs;
  }
  var vinn = ['චක්ඛුවිඤ්ඤාණය', 'සෝතවිඤ්ඤාණය', 'ඝානවිඤ්ඤාණය', 'ජිව්හාවිඤ්ඤාණය', 'කායවිඤ්ඤාණය'];

  var kama = { title: 'කාමාවචර සිත්', count: 54, parts: [
    { title: 'අකුසල් සිත්', count: 12, subs: [
      { name: 'ලෝභ', cols: ['වේදනා', 'දිට්ඨි', 'සඞ්ඛාර'], rows: eight(DS, DV) },
      { name: 'දෝස', cols: ['වේදනා', '', 'සඞ්ඛාර'], rows: [r(DOM, 'පටිඝ සම්පයුත්ත', A), r(DOM, 'පටිඝ සම්පයුත්ත', S)] },
      { name: 'මෝහ', cols: ['වේදනා', 'විචිකිච්ඡා & උද්ධච්ච'], rows: [r(UP, 'විචිකිච්ඡා සම්පයුත්ත'), r(UP, 'උද්ධච්ච සම්පයුත්ත')] }
    ] },
    { title: 'අහේතුක සිත්', count: 18, subs: [
      { name: 'අකුසල විපාක', cols: ['වේදනා', 'සිත'], rows: vinn.map(function (v, i) { return r(i === 4 ? DU : UP, v); }).concat([r(UP, 'සම්පටිච්ඡනචිත්තය'), r(UP, 'සන්තීරණචිත්තය')]) },
      { name: 'කුසල විපාක', cols: ['වේදනා', 'සිත'], rows: vinn.map(function (v, i) { return r(i === 4 ? SU : UP, v); }).concat([r(UP, 'සම්පටිච්ඡනචිත්තය'), r(UP, 'සන්තීරණචිත්තය'), r(SO, 'සන්තීරණචිත්තය')]) },
      { name: 'ක්‍රියා සිත්', cols: ['වේදනා', 'සිත'], rows: [r(UP, 'පඤ්චද්වාරාවජ්ජනය'), r(UP, 'මනෝද්වාරාවජ්ජනය'), r(SO, 'හසිතුප්පාදය')] }
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

  window.CITTA121_TABLE = [kama, mahaggata, lokuttara];
  window.CITTA121_TABLE_FIXES = [
    'රූපාවචර පඨමජ්ඣාන පේළිවල "පඨමජ්ඣා සිත" → "පඨමජ්ඣාන සිත"',
    'මෝහ මූල ශීර්ෂයේ "උද්ධච්ඡ" → "උද්ධච්ච", 12 වන සිතේ "උද්ධච්චස ම්පයුත්ත" → "උද්ධච්ච සම්පයුත්ත"',
    '119, 120 වන සිත් (ඵල සිත් කොටසේ) "අරිහත් මාර්ග සිත" → "අරිහත් ඵල සිත"'
  ];
})();
