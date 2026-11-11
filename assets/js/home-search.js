// home-search.js — මුල් පිටුවේ (index.html) ශීර්ෂයේ ඇති සෙවුම් තීරුව: මාතිකා ඇප් එකේ සියලු කරුණු ඕනෑම පදයකින් සෙවීම
//   • data/search/search-index.js (tools/generate-search-index.js මගින් සාදන) දර්ශකය පූරණය කරයි.
//   • සිංහල / පාලි (රෝම අකුරු) / English / မြန်မာ / 中文 — ඕනෑම අකුරකින් සෙවිය හැක.
//   • වචන කිහිපයක් ලිව්වොත් සියල්ලම අඩංගු සටහන් පමණක් පෙන්වයි.
(function () {
  'use strict';
  var UI = {
    ph: { si: 'පදයක් සොයන්න', en: 'Search any term', my: 'ပုဒ်ရှာရန်', zh: '搜索词条', 'zh-Hant': '搜尋詞條' },
    all: { si: 'සියල්ල', en: 'All', my: 'အားလုံး', zh: '全部', 'zh-Hant': '全部' },
    tika: { si: 'තික', en: 'Tika', my: 'တိက', zh: '三法', 'zh-Hant': '三法' },
    duka: { si: 'දුක', en: 'Duka', my: 'ဒုက', zh: '二法', 'zh-Hant': '二法' },
    suttanta: { si: 'සුත්තන්ත', en: 'Suttanta', my: 'သုတ္တန်', zh: '经藏', 'zh-Hant': '經藏' },
    sabbattika: { si: 'සබ්බත්තික', en: 'Sabbattika', my: 'သဗ္ဗတ္တိက', zh: '总摄', 'zh-Hant': '總攝' },
    citta: { si: 'සිත්', en: 'Citta', my: 'စိတ်', zh: '心', 'zh-Hant': '心' },
    cetasika: { si: 'චෛතසික', en: 'Cetasika', my: 'စေတသိက်', zh: '心所', 'zh-Hant': '心所' },
    rupa: { si: 'රූප', en: 'Rūpa', my: 'ရူပ', zh: '色', 'zh-Hant': '色' },
    nibbana: { si: 'නිබ්බාන', en: 'Nibbāna', my: 'နိဗ္ဗာန်', zh: '涅槃', 'zh-Hant': '涅槃' },
    found: { si: 'ප්‍රතිඵල', en: 'results', my: 'ရလဒ်', zh: '条结果', 'zh-Hant': '條結果' },
    shown: { si: 'පෙන්වන්නේ', en: 'showing', my: 'ပြသနေသည်', zh: '显示', 'zh-Hant': '顯示' },
    more: { si: 'තවත් පෙන්වන්න', en: 'Show more', my: 'ထပ်ပြရန်', zh: '显示更多', 'zh-Hant': '顯示更多' },
    none: { si: 'ගැළපෙන කරුණක් නැත. වෙනත් පදයකින් හෝ කෙටි පදයකින් උත්සාහ කරන්න.', en: 'Nothing matched. Try another or a shorter term.', my: 'ကိုက်ညီသည် မတွေ့ပါ။ အခြား သို့မဟုတ် ပိုတိုသော ပုဒ်ဖြင့် ကြိုးစားပါ။', zh: '没有找到匹配内容，请换一个或更短的词再试。', 'zh-Hant': '沒有找到相符內容，請換一個或更短的詞再試。' },
    hint: { si: 'ඉහත පෙට්ටියේ පදයක් ලියන්න. උදාහරණ:', en: 'Type a term in the box above. Examples:', my: 'အထက်ကွက်တွင် ပုဒ်တစ်ခု ရိုက်ပါ။ ဥပမာ -', zh: '请在上方输入词条。例如：', 'zh-Hant': '請在上方輸入詞條。例如：' },
    loading: { si: 'දර්ශකය පූරණය වෙමින්…', en: 'Loading index…', my: 'အညွှန်း ဖွင့်နေသည်…', zh: '正在加载索引…', 'zh-Hant': '正在載入索引…' },
    err: { si: 'සෙවුම් දර්ශකය පූරණය කළ නොහැකි විය. පිටුව නැවත පූරණය කරන්න.', en: 'Could not load the search index. Please reload the page.', my: 'ရှာဖွေရေး အညွှန်း မဖွင့်နိုင်ပါ။ စာမျက်နှာကို ပြန်ဖွင့်ပါ။', zh: '无法加载搜索索引，请刷新页面。', 'zh-Hant': '無法載入搜尋索引，請重新整理頁面。' }
  };
  var CODE = { en: 'e', my: 'm', zh: 'z', 'zh-Hant': 'h' };
  var PAGE = 40;

  var rows = null, filter = 'all', shown = PAGE, lastQ = '', timer = 0;
  var $ = function (id) { return document.getElementById(id); };
  function lang() { return (window.MX_I18N && window.MX_I18N.lang && window.MX_I18N.lang()) || 'si'; }
  function L(o) { var l = lang(); return o[l] || o.en || o.si; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function root() { return window.MX_ROOT || './'; }

  // ── ප්‍රමිතිකරණය: ZWJ/ZWNJ ඉවත්, කුඩා අකුරු, රෝම diacritic ඉවත් (ā→a), විරාම ලකුණු → හිස්තැන ──
  function normChar(ch) {
    var c = ch.charCodeAt(0);
    if (c === 0x200d || c === 0x200c || c === 0xad || c === 0x200b || c === 0xfeff) return '';
    var s = ch.toLowerCase();
    if (c > 0x7f && c < 0x250 || c >= 0x1e00 && c < 0x1f00) { try { s = s.normalize('NFD').replace(/[̀-ͯ]/g, ''); } catch (e) {} }
    if (/[“”‘’"'`´‘’,.;:!?()\[\]{}<>|\/\\·•—–\-_=+*&^%$#@~«»「」『』（）、。，；：！？《》]/.test(s)) return ' ';
    return s;
  }
  function norm(str) {
    var out = '';
    for (var i = 0; i < str.length; i++) out += normChar(str.charAt(i));
    return out.replace(/\s+/g, ' ').trim();
  }
  // snippet සඳහා: සාමාන්‍යකරණය කළ අකුරු → මුල් පාඨයේ ස්ථාන සිතියම
  function normMap(str) {
    var out = '', map = [];
    for (var i = 0; i < str.length; i++) {
      var r = normChar(str.charAt(i));
      for (var k = 0; k < r.length; k++) { out += r.charAt(k); map.push(i); }
    }
    return { t: out, m: map };
  }

  // ── "ලිහිල්" සැසඳීම: රෝම අකුරින් (diacritic නැතිව) ලියූ පාලි පද සිංහල පාඨයට ගැළපීමට ──
  //    දීර්ඝ/හ්‍රස්ව, මහාප්‍රාණ/අල්පප්‍රාණ, මූර්ධජ/දන්තජ සහ හල් කිරීම (්) නොසලකයි.
  var FOLD = {
    'ආ': 'අ', 'ා': '', 'ඈ': 'ඇ', 'ෑ': 'ැ', 'ඊ': 'ඉ', 'ී': 'ි', 'ඌ': 'උ', 'ූ': 'ු', 'ඒ': 'එ', 'ේ': 'ෙ', 'ො': 'ෙ', 'ෝ': 'ෙ', 'ඔ': 'එ', 'ඕ': 'එ',
    '්': '', 'ං': 'ම', 'ඛ': 'ක', 'ඝ': 'ග', 'ඞ': 'න', 'ඟ': 'ග', 'ඡ': 'ච', 'ඣ': 'ජ', 'ඤ': 'න', 'ට': 'ත', 'ඨ': 'ත', 'ඩ': 'ද', 'ඪ': 'ද', 'ණ': 'න',
    'ථ': 'ත', 'ධ': 'ද', 'ඵ': 'ප', 'භ': 'බ', 'ළ': 'ල', 'ශ': 'ස', 'ෂ': 'ස'
  };
  function looseCh(c) { return Object.prototype.hasOwnProperty.call(FOLD, c) ? FOLD[c] : c; }
  function loose(s) { var o = ''; for (var i = 0; i < s.length; i++) o += looseCh(s.charAt(i)); return o; }
  function looseMap(nm) { var o = '', m = []; for (var i = 0; i < nm.t.length; i++) { var r = looseCh(nm.t.charAt(i)); for (var k = 0; k < r.length; k++) { o += r.charAt(k); m.push(nm.m[i]); } } return { t: o, m: m }; }
  var LC = { k: 'ක', g: 'ග', c: 'ච', j: 'ජ', t: 'ත', d: 'ද', n: 'න', p: 'ප', b: 'බ', m: 'ම', y: 'ය', r: 'ර', l: 'ල', v: 'ව', w: 'ව', s: 'ස', h: 'හ', f: 'ප', z: 'ස', q: 'ක', x: 'ක' };
  var LV = { a: ['අ', ''], i: ['ඉ', 'ි'], u: ['උ', 'ු'], e: ['එ', 'ෙ'], o: ['එ', 'ෙ'] };
  // රෝම අකුරු (ASCII) → ලිහිල් සිංහල ආකෘතිය (loose() යෙදූ පසු පාඨයට සමාන)
  function latinToLoose(tok) {
    var out = '', afterCons = false;
    for (var i = 0; i < tok.length; i++) {
      var ch = tok.charAt(i);
      if (LV[ch]) { out += LV[ch][afterCons ? 1 : 0]; afterCons = false; }
      else if (LC[ch]) {
        var nx = tok.charAt(i + 1);
        if (nx === 'h' && 'kgcjtdpb'.indexOf(ch) >= 0) i++;      // kh gh ch jh th dh ph bh
        out += LC[ch]; afterCons = true;
      } else return '';
    }
    return out;
  }
  function isLatinTok(tok) { return /^[a-z]+$/.test(tok); }

  function prepare(data) {
    return data.map(function (e) {
      var names = [e.n, e.p || ''], ctxs = [e.c];
      ['e', 'm', 'z', 'h'].forEach(function (k) { if (e[k]) { names.push(e[k][0] || ''); ctxs.push(e[k][1] || ''); } });
      return { e: e, name: ' ' + norm(names.join(' ')) + ' ', ctx: ' ' + norm(ctxs.join(' ')) + ' ', n0: norm(e.n), ln: null, ln0: null, secs: e.s.map(function (s) { return { l: s[0], t: s[1], nt: norm(s[1]), lt: null }; }) };
    });
  }

  function count(hay, tok) { var n = 0, i = -1; while ((i = hay.indexOf(tok, i + 1)) >= 0) { n++; if (n > 5) break; } return n; }

  function scoreTok(n0, name, ctx, secs, key, tok, hitSecs, mult) {
    var ts = 0;
    if (n0 === tok) ts += 120;
    else if (n0.indexOf(tok) === 0) ts += 80;
    else if (name.indexOf(' ' + tok) >= 0) ts += 60;
    else if (name.indexOf(tok) >= 0) ts += 45;
    if (ctx.indexOf(tok) >= 0) ts += 20;
    for (var s = 0; s < secs.length; s++) {
      var c = count(secs[s][key], tok);
      if (c) { ts += 4 + c * 2; hitSecs[s] = (hitSecs[s] || 0) + (1 + c / 10) * mult; }
    }
    return ts * mult;
  }
  function run(q) {
    var toks = norm(q).split(' ').filter(Boolean);
    if (!toks.length) return [];
    var lt = toks.map(function (x) { return isLatinTok(x) ? latinToLoose(x) : ''; });
    var out = [];
    for (var r = 0; r < rows.length; r++) {
      var R = rows[r], score = 0, ok = true, hitSecs = {};
      for (var t = 0; t < toks.length && ok; t++) {
        var h1 = {}, ts = scoreTok(R.n0, R.name, R.ctx, R.secs, 'nt', toks[t], h1, 1);
        if (lt[t]) {
          if (R.ln === null) { R.ln = loose(R.name); R.ln0 = loose(R.n0); R.secs.forEach(function (s) { s.lt = loose(s.nt); }); R.lctx = loose(R.ctx); }
          var h2 = {}, tl = scoreTok(R.ln0, R.ln, R.lctx, R.secs, 'lt', lt[t], h2, 0.9);
          if (tl > ts) { ts = tl; h1 = h2; }
        }
        if (!ts) ok = false;
        else { score += ts; Object.keys(h1).forEach(function (k) { hitSecs[k] = (hitSecs[k] || 0) + h1[k]; }); }
      }
      if (ok) out.push({ R: R, score: score, hs: hitSecs });
    }
    out.sort(function (a, b) { return b.score - a.score; });
    return out;
  }

  function mark(text, toks) {
    var nm = normMap(text), lm = null, ranges = [];
    toks.forEach(function (tok) {
      var i = -1; while ((i = nm.t.indexOf(tok, i + 1)) >= 0) { ranges.push([nm.m[i], nm.m[i + tok.length - 1] + 1]); }
      if (isLatinTok(tok)) {
        var lk = latinToLoose(tok); if (!lk) return;
        if (!lm) lm = looseMap(nm);
        var j = -1; while ((j = lm.t.indexOf(lk, j + 1)) >= 0) { ranges.push([lm.m[j], lm.m[j + lk.length - 1] + 1]); }
      }
    });
    // අකුරක කොටසක් (උදා: පිළිස්සුම් ස්වර ලකුණු) පමණක් ඉස්මතු නොවන සේ, මුල් පාඨයේ ඒවා ඇතුළත් කර දිගු කරන්න
    var isMk = function (c) { return c >= 0x0dca && c <= 0x0ddf || c === 0x0d82 || c === 0x0d83 || c === 0x0df2 || c === 0x0df3 || c === 0x200c || c === 0x200d || c >= 0x0300 && c <= 0x036f || c >= 0x102b && c <= 0x103e; };
    ranges.forEach(function (r) {
      while (r[1] < text.length && isMk(text.charCodeAt(r[1]))) r[1]++;
      while (r[0] > 0 && isMk(text.charCodeAt(r[0]))) r[0]--;
    });
    ranges.sort(function (a, b) { return a[0] - b[0]; });
    return { nm: nm, ranges: ranges };
  }
  function snippet(sec, toks) {
    var text = sec.t, mk = mark(text, toks), rg = mk.ranges;
    if (!rg.length) return esc(text.slice(0, 150));
    var a = Math.max(0, rg[0][0] - 55), b = Math.min(text.length, rg[0][0] + 110);
    if (a > 0) { var sp = text.indexOf(' ', a); if (sp >= 0 && sp < rg[0][0] - 8) a = sp + 1; }      // වචනයක මැද සිට පටන් නොගන්න
    var out = '', pos = a;
    rg.forEach(function (r) {
      if (r[0] < pos || r[0] >= b) return;
      out += esc(text.slice(pos, r[0])) + '<mark>' + esc(text.slice(r[0], Math.min(r[1], b))) + '</mark>';
      pos = Math.min(r[1], b);
    });
    out += esc(text.slice(pos, b));
    return (a > 0 ? '… ' : '') + out + (b < text.length ? ' …' : '');
  }
  function markName(text, toks) {
    var rg = mark(text, toks).ranges, out = '', pos = 0;
    rg.forEach(function (r) { if (r[0] < pos) return; out += esc(text.slice(pos, r[0])) + '<mark>' + esc(text.slice(r[0], r[1])) + '</mark>'; pos = r[1]; });
    return out + esc(text.slice(pos));
  }

  function card(h, toks) {
    var e = h.R.e, l = lang(), code = CODE[l], tr = code && e[code];
    var name = (tr && tr[0]) || e.n, ctx = (tr && tr[1]) || e.c;
    var secIdx = Object.keys(h.hs).map(Number).sort(function (a, b) { return h.hs[b] - h.hs[a] || a - b; }).slice(0, 2);
    var sn = secIdx.map(function (i) { var s = h.R.secs[i]; return '<p class="sr-snip"><b>' + esc(s.l) + '</b>' + snippet(s, toks) + '</p>'; }).join('');
    var href = esc(root() + e.l);
    return '<a class="sr-item" href="' + href + '"><p class="sr-ctx"><span class="sr-tag">' + esc(L(UI[e.y])) + '</span><span>' + esc(ctx) + '</span></p>' +
      '<p class="sr-name">' + markName(name, toks) + '</p>' + (tr && tr[0] && e.n !== name ? '<p class="sr-sub">' + esc(e.n) + '</p>' : '') + sn + '</a>';
  }

  function chips(results) {
    var by = { all: results.length };
    results.forEach(function (h) { by[h.R.e.y] = (by[h.R.e.y] || 0) + 1; });
    var html = '';
    ['all', 'tika', 'duka', 'suttanta', 'sabbattika', 'citta', 'cetasika', 'rupa', 'nibbana'].forEach(function (k) {
      if (k !== 'all' && !by[k]) return;
      html += '<button type="button" class="ca-chip" data-f="' + k + '" aria-pressed="' + (filter === k) + '">' + esc(L(UI[k])) + (lastQ ? ' · ' + (by[k] || 0) : '') + '</button>';
    });
    $('hs-chips').innerHTML = lastQ ? html : '';
  }

  var results = [];
  function showPanel(on) {
    var panel = $('hs-panel'), main = $('view-container');
    if (panel) panel.hidden = !on;
    if (main) main.hidden = on;
  }
  function render() {
    var q = $('hs-q').value;
    lastQ = q.trim();
    $('hs-x').classList.toggle('hidden', !q);
    $('hs-q').placeholder = L(UI.ph);
    $('hs-q').setAttribute('aria-label', L(UI.ph));
    if (!lastQ) { results = []; showPanel(false); return; }
    showPanel(true);
    if (!rows) { $('hs-chips').innerHTML = ''; $('hs-list').innerHTML = ''; $('hs-count').textContent = L(UI.loading); return; }
    results = run(lastQ);
    chips(results);
    var list = filter === 'all' ? results : results.filter(function (h) { return h.R.e.y === filter; });
    var toks = norm(lastQ).split(' ').filter(Boolean);
    var vis = list.slice(0, shown);
    $('hs-count').textContent = list.length + ' ' + L(UI.found) + (list.length > vis.length ? ' · ' + L(UI.shown) + ' ' + vis.length : '');
    $('hs-list').innerHTML = list.length
      ? vis.map(function (h) { return card(h, toks); }).join('') + (list.length > vis.length ? '<button type="button" class="sr-more" id="hs-more">' + esc(L(UI.more)) + '</button>' : '')
      : '<div class="sr-empty">' + esc(L(UI.none)) + '</div>';
  }

  function syncUrl() {
    if (window.MX_NO_URLQ) return;
    try {
      var u = new URL(location.href);
      if (lastQ) u.searchParams.set('q', lastQ); else u.searchParams.delete('q');
      history.replaceState(null, '', u.pathname + u.search);
    } catch (e) {}
  }
  function onInput() { clearTimeout(timer); timer = setTimeout(function () { shown = PAGE; filter = 'all'; render(); syncUrl(); }, 140); }

  function loadIndex() {
    if (rows || loading) return; loading = true;
    var sc = document.createElement('script');
    sc.src = root() + 'data/search/search-index.js';
    sc.onload = function () { rows = prepare(window.MATIKA_SEARCH || []); render(); };
    sc.onerror = function () { loading = false; $('hs-count').textContent = L(UI.err); };
    document.head.appendChild(sc);
  }
  var loading = false;
  function reset() { $('hs-q').value = ''; shown = PAGE; filter = 'all'; render(); syncUrl(); }
  function init() {
    if (!$('hs-q')) return;
    var q0 = ''; try { if (!window.MX_NO_URLQ) q0 = new URLSearchParams(location.search).get('q') || ''; } catch (e) {}
    $('hs-q').value = q0;
    $('hs-q').addEventListener('focus', loadIndex);
    $('hs-q').addEventListener('input', function () { loadIndex(); onInput(); });
    $('hs-q').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); clearTimeout(timer); shown = PAGE; render(); syncUrl(); $('hs-q').blur(); }
      else if (e.key === 'Escape') { reset(); $('hs-q').blur(); }
    });
    $('hs-x').addEventListener('click', function () { reset(); $('hs-q').focus(); });
    $('hs-chips').addEventListener('click', function (e) { var b = e.target.closest('button[data-f]'); if (!b) return; filter = b.getAttribute('data-f'); shown = PAGE; render(); });
    $('hs-list').addEventListener('click', function (e) { if (e.target.closest('#hs-more')) { shown += PAGE; render(); } });
    var refresh = function () { render(); };
    if (window.MX_I18N && window.MX_I18N.onChange) window.MX_I18N.onChange(refresh);
    document.addEventListener('mx-lang-change', refresh);
    render();
    if (q0) loadIndex();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
