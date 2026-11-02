/* ============================================================
   pali-script.js — පාලි (රෝමන් / IAST) → මියන්මාර් අකුරු (Myanmar script) පරිවර්තකය
   • පාලි පාඨ මියන්මාර් දසුනේදී ස්වකීය අකුරෙන් (ဗမာအက္ခရာ) පෙන්වීමට.
   • උදා:  "Somanassasahagataṃ" → "သောမနဿသဟဂတံ",  "saṅkhāra" → "သင်္ခါရ"
   • නීති: සංයුක්ත ව්‍යඤ්ජන virama (္) මගින්; ṅ + ව්‍යඤ්ජනය → kinzi (င်္);
           ññ → ည ; ss → ဿ ; ව්‍යඤ්ජන + h (v,n,m,l,y,r,ṇ,ñ) → ှ ;
           ā / o: ခ ဂ င ဒ ပ ဝ පාදක අකුරු සඳහා උස (ါ) — අන් අකුරු සඳහා ටිකක් මිටි (ာ).
   • API:  PaliScript.toMyanmar('Citta 54')  →  'စိတ္တ ၅၄'
           PaliScript.digits('121')          →  '၁၂၁'
   ============================================================ */
(function (root) {
  'use strict';

  var CONS = {
    k: 'က', kh: 'ခ', g: 'ဂ', gh: 'ဃ', 'ṅ': 'င',
    c: 'စ', ch: 'ဆ', j: 'ဇ', jh: 'ဈ', 'ñ': 'ဉ',
    'ṭ': 'ဋ', 'ṭh': 'ဌ', 'ḍ': 'ဍ', 'ḍh': 'ဎ', 'ṇ': 'ဏ',
    t: 'တ', th: 'ထ', d: 'ဒ', dh: 'ဓ', n: 'န',
    p: 'ပ', ph: 'ဖ', b: 'ဗ', bh: 'ဘ', m: 'မ',
    y: 'ယ', r: 'ရ', l: 'လ', v: 'ဝ', s: 'သ', h: 'ဟ', 'ḷ': 'ဠ'
  };
  var DIGRAPH = ['kh', 'gh', 'ch', 'jh', 'ṭh', 'ḍh', 'th', 'dh', 'ph', 'bh'];
  var IND = { a: 'အ', 'ā': 'အာ', i: 'ဣ', 'ī': 'ဤ', u: 'ဥ', 'ū': 'ဦ', e: 'ဧ', o: 'ဩ' };
  var TALL = 'ခဂငဒပဝ';                  // ါ (ရှည်) ගනු ලබන පාදක අකුරු
  var VIRAMA = '္', ASAT = '်', ANUSVARA = 'ံ', MEDIAL_HA = 'ှ';
  var HA_OK = 'ဝနမလယရဏဉင';              // ှ (ha-htoe) ලබාගන්නා අකුරු (v n m l y r ṇ ñ ṅ)
  var VOWELS = 'aāiīuūeo';

  var DIG = '၀၁၂၃၄၅၆၇၈၉';
  function digits(s) { return String(s).replace(/[0-9]/g, function (d) { return DIG.charAt(+d); }); }
  function undigits(s) { return String(s).replace(/[၀-၉]/g, function (d) { return String(DIG.indexOf(d)); }); }

  // අකුරු සංඛ්‍යා → tokens
  function tokenize(str) {
    var out = [], i = 0, low = str.toLowerCase().replace(/ṁ/g, 'ṃ');
    while (i < low.length) {
      var two = low.substr(i, 2), ch = low.charAt(i);
      if (DIGRAPH.indexOf(two) >= 0) { out.push({ t: 'C', k: two }); i += 2; }
      else if (CONS[ch]) { out.push({ t: 'C', k: ch }); i++; }
      else if (VOWELS.indexOf(ch) >= 0) { out.push({ t: 'V', k: ch }); i++; }
      else if (ch === 'ṃ') { out.push({ t: 'M' }); i++; }
      else { out.push({ t: 'O', k: str.charAt(i) }); i++; }
    }
    return out;
  }

  function vowelSigns(v, base) {
    var tall = TALL.indexOf(base) >= 0;
    switch (v) {
      case 'a': return '';
      case 'ā': return tall ? 'ါ' : 'ာ';
      case 'i': return 'ိ';
      case 'ī': return 'ီ';
      case 'u': return 'ု';
      case 'ū': return 'ူ';
      case 'e': return 'ေ';
      case 'o': return tall ? 'ေါ' : 'ော';
    }
    return '';
  }

  function toMyanmar(str) {
    str = String(str == null ? '' : str);
    var toks = tokenize(str), out = '';
    var stack = null;                    // { cons:[glyphs...], keys:[...] } — ස්වරයක් නොලත් ව්‍යඤ්ජන පොකුර
    var wordStart = true;

    function flushCluster(vowel, extraAnusvara) {
      // stack → "kinzi? base (virama sub)* [ှ] vowel"
      var g = stack.cons, k = stack.keys, s = '', base, i0 = 0;
      if (k[0] === 'ṅ' && g.length > 1) { s += 'င' + ASAT + VIRAMA; i0 = 1; }   // kinzi
      base = g[i0];
      s += base;
      for (var i = i0 + 1; i < g.length; i++) {
        if (g[i] === MEDIAL_HA) s += MEDIAL_HA; else s += VIRAMA + g[i];
      }
      if (vowel === null) {               // ස්වරයක් නැත → asat (වචනය අවසානයේ)
        s += ASAT;
      } else if (vowel === 'a') {
        /* inherent */
      } else {
        var vs = vowelSigns(vowel, base);
        // Unicode අනුපිළිවෙළ: ေ  → ိ ී → ු ූ → ါ ာ
        s += vs;
      }
      stack = null;
      return s;
    }

    function push(key) {
      var g = CONS[key];
      if (!stack) { stack = { cons: [g], keys: [key] }; return; }
      var prevKey = stack.keys[stack.keys.length - 1];
      var prevG = stack.cons[stack.cons.length - 1];
      // ññ → ည
      if (prevKey === 'ñ' && key === 'ñ') { stack.cons[stack.cons.length - 1] = 'ည'; stack.keys[stack.keys.length - 1] = 'ññ'; return; }
      // ss → ဿ
      if (prevKey === 's' && key === 's') { stack.cons[stack.cons.length - 1] = 'ဿ'; stack.keys[stack.keys.length - 1] = 'ss'; return; }
      // v/n/m/l/y/r/ṇ/ñ/ṅ + h → ှ
      if (key === 'h' && HA_OK.indexOf(prevG) >= 0 && stack.cons.length === 1) { stack.cons.push(MEDIAL_HA); stack.keys.push('h'); return; }
      stack.cons.push(g); stack.keys.push(key);
    }

    for (var i = 0; i < toks.length; i++) {
      var t = toks[i];
      if (t.t === 'C') { push(t.k); wordStart = false; }
      else if (t.t === 'V') {
        if (stack) { out += flushCluster(t.k); }
        else { out += IND[t.k]; }
        wordStart = false;
      }
      else if (t.t === 'M') {
        if (stack) out += flushCluster(null);
        out += ANUSVARA;
      }
      else {
        if (stack) out += flushCluster(null);
        out += /[0-9]/.test(t.k) ? digits(t.k) : t.k;
        wordStart = true;
      }
    }
    if (stack) out += flushCluster(null);
    return out;
  }

  root.PaliScript = { toMyanmar: toMyanmar, digits: digits, undigits: undigits };
})(typeof window !== 'undefined' ? window : globalThis);
