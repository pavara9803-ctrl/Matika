/* ============================================================
   i18n.js — සිංහල / English / မြန်မာ (Burmese) / (පසුව 中文) භාෂා මාරුව (Language switch)
   • සිංහල මුල් පාඨය කිසිවිටෙක වෙනස් නොකෙරේ; අනෙක් භාෂා පෙනෙන්නේ තිරයේ පමණි.
   • මුල් පාඨය → පරිවර්තන assets/i18n/<භාෂා>-*.js ගොනුවල ඇත:
       MX_I18N.add({ 'සිංහල පාඨය': 'English text' });          // en-*.js
       MX_I18N.add({ 'සිංහල පාඨය': 'မြန်မာ စာသား' }, 'my');   // my-*.js
   • පරිවර්තනයක් නැති පාඨ: මියන්මාර් / චීන දසුනේදී English පෙන්වයි; එයත් නැත්නම් සිංහලෙන් ම.
   • තෝරාගත් භාෂාව localStorage('matika-lang') හි සුරැකේ; ?lang=en|my යොදා ද විවෘත කළ හැක.
   ============================================================ */
(function () {
  'use strict';
  if (window.MX_I18N) return;

  var KEY = 'matika-lang';
  var SIN = /[඀-෿]/;
  var SCRIPT = document.currentScript && document.currentScript.src;
  var ROOT = SCRIPT ? SCRIPT.replace(/assets\/js\/i18n\.js(\?.*)?$/, '') : './';
  var ATTRS = ['title', 'aria-label', 'placeholder', 'alt'];
  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, NOSCRIPT: 1, CODE: 1 };

  /* භාෂා ලැයිස්තුව. READY=false නම් තේරීම් මෙනුවේ නොපෙන්වයි (පරිවර්තනය තවම සූදානම් නැත). */
  var LANGS = [
    { code: 'si', short: 'සිං', name: 'සිංහල', ready: true },
    { code: 'en', short: 'EN', name: 'English', ready: true },
    { code: 'my', short: 'မြန်', name: 'မြန်မာဘာသာ', ready: true },
    { code: 'zh', short: '中文', name: '中文', ready: true }
  ];
  /* බිඳෙන ගොනු (404) පූරණය නොකිරීමට: සූදානම් වූ පරිවර්තන ගොනු මෙහි ලියන්න. */
  var AVAILABLE = {
    my: ['my-app.js', 'my-common.js', 'my-duka.js', 'my-paramattha.js', 'my-paramattha2.js', 'my-paramattha3.js',
         'my-matika.js', 'my-sabbattika.js', 'my-suttanta.js', 'my-tika.js'],
    zh: ['zh-app.js', 'zh-common.js', 'zh-sabbattika.js']
  };
  var dicts = { en: {}, my: {}, zh: {} };       // සිංහල (සාමාන්‍යකරණය කළ) → පරිවර්තනය
  var patterns = { en: [], my: [], zh: [] };    // [RegExp, replacement|function] — ඉලක්කම් අඩංගු පාඨ සඳහා
  var lang = 'si';
  var listeners = [];
  var observer = null;
  var loaded = {};
  var pending = 0;

  function norm(s) { return String(s).replace(/\s+/g, ' ').trim(); }

  /* ---------- පරිවර්තනය ---------- */
  var has = function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };
  /* සෙවුම් පිළිවෙළ: තෝරාගත් භාෂාව → English (පරිවර්තනයක් නැති විට) */
  function chain() { return lang === 'si' ? [] : lang === 'en' ? ['en'] : [lang, 'en']; }
  function dget(k) {
    var c = chain();
    for (var i = 0; i < c.length; i++) if (has(dicts[c[i]], k)) return dicts[c[i]][k];
    return null;
  }
  function lookup(s) {
    var k = norm(s);
    if (!k || !SIN.test(k)) return null;
    var c = chain();
    for (var j = 0; j < c.length; j++) {
      if (has(dicts[c[j]], k)) return dicts[c[j]][k];
      var ps = patterns[c[j]];
      for (var i = 0; i < ps.length; i++) {
        if (ps[i][0].test(k)) return k.replace(ps[i][0], ps[i][1]);
      }
    }
    return null;
  }

  /* පරිවර්තනය ඇත්නම් තෝරාගත් භාෂාවෙන්, නැත්නම් මුල් පාඨය */
  function t(s) {
    if (lang === 'si' || typeof s !== 'string') return s;
    var r = lookup(s);
    return r == null ? s : r;
  }

  /* ---------- DOM ---------- */
  function skipNode(n) {
    for (var p = n.parentNode; p && p.nodeType === 1; p = p.parentNode) {
      if (SKIP[p.nodeName] || p.hasAttribute('data-no-i18n')) return true;
    }
    return false;
  }

  function doText(node) {
    var cur = node.nodeValue;
    if (node.__mxt !== undefined && cur === node.__mxt) return;      // දැනටමත් පරිවර්තිතයි
    var en = lookup(cur);
    if (en == null) { node.__mxo = undefined; node.__mxt = undefined; return; }
    var lead = cur.match(/^\s*/)[0], trail = cur.match(/\s*$/)[0];
    node.__mxo = cur;
    node.__mxt = lead + en + trail;
    node.nodeValue = node.__mxt;
  }

  function undoText(node) {
    if (node.__mxo !== undefined && node.nodeValue === node.__mxt) node.nodeValue = node.__mxo;
    node.__mxo = undefined; node.__mxt = undefined;
  }

  function doAttrs(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i];
      if (!el.hasAttribute(a)) continue;
      var cur = el.getAttribute(a);
      el.__mxa = el.__mxa || {};
      var rec = el.__mxa[a];
      if (rec && cur === rec.t) continue;
      var en = lookup(cur);
      if (en == null) { delete el.__mxa[a]; continue; }
      el.__mxa[a] = { o: cur, t: en };
      el.setAttribute(a, en);
    }
  }

  function undoAttrs(el) {
    if (!el.__mxa) return;
    for (var a in el.__mxa) {
      if (el.getAttribute(a) === el.__mxa[a].t) el.setAttribute(a, el.__mxa[a].o);
    }
    el.__mxa = null;
  }

  function doAttrsH(el) { doAttrs(el); doHtml(el); }
  function undoAttrsH(el) { undoHtml(el); undoAttrs(el); }

  function walk(root, fn, attrFn) {
    if (!root) return;
    if (root.nodeType === 3) { if (!skipNode(root)) fn(root); return; }
    if (root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return;
    if (root.nodeType === 1) {
      if (SKIP[root.nodeName] || root.hasAttribute('data-no-i18n') || skipNode(root)) return;
      attrFn(root);
    }
    var base = root.nodeType === 9 ? root.body : root;
    if (!base) return;
    var w = document.createTreeWalker(base, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (n.nodeType === 1 && (SKIP[n.nodeName] || n.hasAttribute('data-no-i18n'))) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = w.nextNode())) {
      if (n.nodeType === 3) fn(n); else attrFn(n);
    }
    /* <textarea> ඇතුළත පාඨය නොවෙනස් — නමුත් එහි placeholder / title පරිවර්තනය කරයි */
    if (base.querySelectorAll) {
      [].forEach.call(base.querySelectorAll('textarea'), function (ta) {
        if (!ta.hasAttribute('data-no-i18n') && !skipNode(ta)) attrFn(ta);
      });
    }
  }


  /* ---------- Inline markup සහිත block පරිවර්තනය ----------
     <p>සිංහල <strong>සිංහල</strong> ...</p> වැනි අංගයක් (block-level අංග නැති, උප-අංග ඇති) එක් පරිවර්තන
     ඒකකයක් ලෙස සලකයි. යතුර: innerHTML, ඉන් සිංහල නැති අංග ⟦n⟧ ලෙසත්, සිංහල ඇති අංග <n>…</n> ලෙසත් ආදේශ කර ඇත. */
  var BLOCKSEL = 'div,p,ul,ol,li,table,thead,tbody,tr,td,th,h1,h2,h3,h4,h5,h6,section,article,blockquote,details,summary,pre,dl,dt,dd,header,footer,nav,main,figure,form,select,textarea';
  function isCand(el) {
    return el.nodeType === 1 && el.children.length > 0 && !SKIP[el.nodeName] && SIN.test(el.textContent) && !el.querySelector(BLOCKSEL);
  }
  function esc(x) { return x.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function sig(el) {
    var holes = [], tags = [];
    function rec(node) {
      var s = '';
      for (var c = node.firstChild; c; c = c.nextSibling) {
        if (c.nodeType === 3) s += esc(c.nodeValue);
        else if (c.nodeType === 1) {
          if (!SIN.test(c.textContent)) { holes.push(c.outerHTML); s += '⟦' + holes.length + '⟧'; }
          else { tags.push(c); var i = tags.length; s += '<' + i + '>' + rec(c) + '</' + i + '>'; }
        }
      }
      return s;
    }
    return { key: norm(rec(el)), holes: holes, tags: tags };
  }
  function buildHtml(en, sg) {
    var ok = true;
    var out = en.replace(/<(\/?)(\d+)>/g, function (m, sl, n) {
      var c = sg.tags[+n - 1]; if (!c) { ok = false; return ''; }
      if (sl) return '</' + c.nodeName.toLowerCase() + '>';
      var o = c.cloneNode(false).outerHTML; return o.slice(0, o.lastIndexOf('</'));
    }).replace(/⟦(\d+)⟧/g, function (m, n) {
      var h = sg.holes[+n - 1]; if (h == null) { ok = false; return ''; } return h;
    });
    return ok ? out : null;
  }
  function doHtml(el) {
    if (el.__mxh && el.innerHTML === el.__mxh.t) return;
    if (!isCand(el)) { el.__mxh = undefined; return; }
    var sg = sig(el), en = dget(sg.key);
    if (en == null) { el.__mxh = undefined; return; }
    var out = buildHtml(en, sg);
    if (out == null) return;
    var o = el.innerHTML;
    el.innerHTML = out;
    el.__mxh = { o: o, t: el.innerHTML };
  }
  function undoHtml(el) {
    if (el.__mxh && el.innerHTML === el.__mxh.t) el.innerHTML = el.__mxh.o;
    el.__mxh = undefined;
  }
  /* පරිවර්තන යතුරු එකතු කිරීම (මෙවලම් සඳහා): root තුළ ඇති ඒකක (සිංහල) */
  function collect(root) {
    var out = [];
    (function rec(el) {
      for (var c = el.firstChild; c; c = c.nextSibling) {
        if (c.nodeType === 3) { var k = norm(c.nodeValue); if (SIN.test(k)) out.push(k); }
        else if (c.nodeType === 1 && !SKIP[c.nodeName]) {
          if (isCand(c)) out.push(sig(c).key); else rec(c);
        }
      }
    })(root);
    return out;
  }

  var origTitle = null;
  function doHead() {
    if (origTitle === null) origTitle = document.title;
    var en = lang !== 'si' ? lookup(origTitle) : null;
    document.title = en != null ? en : origTitle;
    var metas = document.querySelectorAll(
      'meta[name="description"],meta[name="keywords"],meta[property="og:title"],meta[property="og:description"],' +
      'meta[name="twitter:title"],meta[name="twitter:description"],meta[name="apple-mobile-web-app-title"]');
    for (var i = 0; i < metas.length; i++) {
      var m = metas[i];
      if (m.__mxo === undefined) m.__mxo = m.getAttribute('content') || '';
      var r = lang !== 'si' ? lookup(m.__mxo) : null;
      m.setAttribute('content', r != null ? r : m.__mxo);
    }
  }

  function applyAll() {
    if (observer) observer.disconnect();
    var html = document.documentElement;
    html.setAttribute('lang', lang);
    LANGS.forEach(function (l) { html.classList.toggle('lang-' + l.code, lang === l.code); });
    html.classList.toggle('lang-tr', lang !== 'si');   /* පරිවර්තිත (සිංහල නොවන) දසුන */
    if (lang === 'my') ensureFont('my');
    walk(document, undoText, undoAttrsH);               /* භාෂා දෙකක් අතර මාරුවේදී ද පළමුව මුල් පාඨයට */
    if (lang !== 'si') walk(document, doText, doAttrsH);
    doHead();
    updateButtons();
    observe();
  }

  function observe() {
    if (!observer || !document.body) return;
    observer.observe(document.body, {
      childList: true, subtree: true, characterData: true,
      attributes: true, attributeFilter: ATTRS
    });
  }

  function initObserver() {
    observer = new MutationObserver(function (muts) {
      if (lang === 'si' || pending > 0) return; /* ශබ්දකෝෂ පූරණය වන අතර නවතා ඇත; ඉන් පසු applyAll සියල්ල ආවරණය කරයි */
      observer.disconnect();
      muts.forEach(function (m) {
        if (m.type === 'childList') {
          for (var i = 0; i < m.addedNodes.length; i++) walk(m.addedNodes[i], doText, doAttrsH);
        } else if (m.type === 'characterData') {
          if (m.target.nodeType === 3 && !skipNode(m.target)) doText(m.target);
        } else if (m.type === 'attributes') {
          if (m.target.nodeType === 1 && !skipNode(m.target)) doAttrs(m.target);
        }
      });
      observe();
    });
    observe();
  }

  /* ---------- භාෂා තේරීම (බොත්තම + මෙනුව) ---------- */
  var pickers = [];       // { btn, menu }
  function shortOf(code) { for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === code) return LANGS[i].short; return code; }
  function closeMenus() {
    pickers.forEach(function (p) { p.menu.hidden = true; p.btn.setAttribute('aria-expanded', 'false'); });
  }
  function updateButtons() {
    pickers.forEach(function (p) {
      p.btn.textContent = shortOf(lang);
      p.btn.setAttribute('lang', lang);
      p.btn.setAttribute('title', 'Language / භාෂාව / ဘာသာစကား');
      p.btn.setAttribute('aria-label', 'Language / භාෂාව / ဘာသာစကား');
      [].forEach.call(p.menu.children, function (it) {
        it.setAttribute('aria-checked', String(it.getAttribute('data-lang') === lang));
      });
    });
  }

  function makePicker(cls) {
    var wrap = document.createElement('span');
    wrap.className = 'mx-lang-wrap';
    wrap.setAttribute('data-mx-lang-toggle', '');
    wrap.setAttribute('data-no-i18n', '');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = cls;
    btn.setAttribute('aria-haspopup', 'menu');
    btn.setAttribute('aria-expanded', 'false');
    var menu = document.createElement('div');
    menu.className = 'mx-lang-menu';
    menu.setAttribute('role', 'menu');
    menu.hidden = true;
    LANGS.forEach(function (l) {
      if (!l.ready) return;
      var it = document.createElement('button');
      it.type = 'button';
      it.setAttribute('role', 'menuitemradio');
      it.setAttribute('data-lang', l.code);
      it.setAttribute('lang', l.code);
      it.textContent = l.name;
      it.addEventListener('click', function (e) { e.stopPropagation(); closeMenus(); setLang(l.code); });
      menu.appendChild(it);
    });
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = menu.hidden;
      closeMenus();
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
    });
    wrap.appendChild(btn);
    wrap.appendChild(menu);
    pickers.push({ btn: btn, menu: menu });
    return { wrap: wrap, btn: btn };
  }

  function injectToggle() {
    if (document.querySelector('[data-mx-lang-toggle]')) return;
    var header = document.querySelector('body > header') || document.querySelector('header');
    var cls = 'mx-lang-btn p-2 rounded-lg bg-maroon-800 hover:bg-maroon-700 text-saffron-200 ml-1 font-bold text-sm';
    if (header) {
      var theme = header.querySelector('[onclick*="toggleDarkMode"]') || header.querySelector('[onclick*="toggleMenu"]');
      var bar = header.querySelector('.flex.items-center.justify-between') || header.firstElementChild || header;
      var pk = makePicker(cls);
      pk.btn.style.minWidth = '2.4rem';
      if (theme && theme.parentNode) theme.parentNode.insertBefore(pk.wrap, theme);
      else bar.appendChild(pk.wrap);
    } else {
      var f = makePicker('mx-lang-btn');
      f.wrap.style.cssText = 'position:fixed;top:10px;right:10px;z-index:60';
      f.btn.style.cssText = 'padding:6px 10px;border-radius:10px;background:#581113;color:#fde68a;font-weight:700;font-size:14px;border:1px solid #f59e0b';
      document.body.appendChild(f.wrap);
    }
    document.addEventListener('click', closeMenus);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenus(); });
    updateButtons();
  }

  /* ---------- මියන්මාර් / චීන අකුරු (font) ---------- */
  var FONTS = {
    my: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Myanmar:wght@400;600;700&display=swap',
    zh: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&display=swap'
  };
  var fontLoaded = {};
  function ensureFont(code) {
    if (fontLoaded[code] || !FONTS[code] || !document.head) return;
    fontLoaded[code] = true;
    var l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = FONTS[code];
    document.head.appendChild(l);
  }

  /* ---------- පරිවර්තන ගොනු පූරණය ---------- */
  function dictFiles() {
    var p = location.pathname;
    var files = ['en-common.js', 'en-app.js'];
    if (/\/paramattha\//.test(p)) files.push('en-paramattha.js', 'en-paramattha2.js', 'en-paramattha3.js');
    if (/\/matika\//.test(p)) files.push('en-matika.js');
    if (/\/sabbattika\.html/.test(p)) files.push('en-sabbattika.js');
    if (/\/tika-matika\.html/.test(p)) files.push('en-tika.js');
    if (/\/duka-matika\.html/.test(p)) files.push('en-duka.js');
    if (/\/suttanta-matika\.html/.test(p)) files.push('en-suttanta.js');
    /* මියන්මාර් / චීන: එම පිටුවටම අදාළ <භාෂා>-*.js (සූදානම් ඒවා පමණි); English ගොනු ආපසු පිළිතුර (fallback) */
    if (lang !== 'en' && lang !== 'si') {
      var ok = AVAILABLE[lang] || [];
      files.slice().forEach(function (f) {
        var g = f.replace(/^en-/, lang + '-');
        if (ok.indexOf(g) >= 0) files.push(g);
      });
    }
    return files;
  }

  function loadDicts(done) {
    var files = dictFiles().filter(function (f) { return !loaded[f]; });
    if (!files.length) { done(); return; }
    pending = files.length;
    files.forEach(function (f) {
      loaded[f] = true;
      var s = document.createElement('script');
      s.src = ROOT + 'assets/i18n/' + f;
      s.onload = s.onerror = function () { if (--pending === 0) done(); };
      document.head.appendChild(s);
    });
  }

  /* ---------- API ---------- */
  function validLang(l) {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === l && LANGS[i].ready) return l;
    return 'si';
  }
  function setLang(l) {
    l = validLang(l);
    try { localStorage.setItem(KEY, l); } catch (e) {}
    var changed = l !== lang;
    lang = l;
    if (l !== 'si') loadDicts(function () { applyAll(); if (changed) fire(); });
    else { applyAll(); if (changed) fire(); }
  }

  function fire() {
    listeners.forEach(function (fn) { try { fn(lang); } catch (e) {} });
    try { document.dispatchEvent(new CustomEvent('mx-lang-change', { detail: { lang: lang } })); } catch (e) {}
  }

  var dictVersion = 0;
  window.MX_I18N = {
    lang: function () { return lang; },
    version: function () { return dictVersion; },
    setLang: setLang,
    t: t,
    /* add(obj [, code]) — code: 'en' (පෙරනිමි) | 'my' | 'zh' */
    add: function (obj, code) {
      code = dicts[code] ? code : 'en';
      dictVersion++;
      for (var k in obj) if (has(obj, k)) dicts[code][norm(k)] = obj[k];
      if (lang !== 'si' && document.body && pending === 0) applyAll(); /* පූරණය වන අතර නොකරයි — අවසානයේ එක් වරක් */
    },
    addPatterns: function (arr, code) { code = patterns[code] ? code : 'en'; patterns[code] = patterns[code].concat(arr); },
    languages: function () { return LANGS.filter(function (l) { return l.ready; }).map(function (l) { return l.code; }); },
    onChange: function (fn) { listeners.push(fn); },
    collect: collect,
    sig: sig
  };

  /* alert / confirm පණිවිඩද පරිවර්තනය කරයි */
  ['alert', 'confirm'].forEach(function (n) {
    var orig = window[n];
    if (typeof orig !== 'function') return;
    window[n] = function (msg) { return orig.call(window, t(msg)); };
  });

  /* ---------- ආරම්භය ---------- */
  var q = /[?&]lang=(en|si|my|zh)\b/.exec(location.search);
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  lang = validLang((q && q[1]) || saved || 'si');
  if (q) { try { localStorage.setItem(KEY, lang); } catch (e) {} }

  function start() {
    try { injectToggle(); } catch (e) { if (window.console) console.warn('[i18n] toggle', e); }
    initObserver();
    if (lang !== 'si') loadDicts(function () { applyAll(); fire(); });
    else applyAll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

  /* English අකුරු සඳහා සුළු පෙනුම් සැකසුම් */
  var st = document.createElement('style');
  st.textContent =
    'html.lang-en body{font-family:Inter,"Segoe UI",system-ui,-apple-system,Roboto,"Noto Serif Sinhala",sans-serif}' +
    'html.lang-en p,html.lang-en li,html.lang-en td{hyphens:auto;-webkit-hyphens:auto;line-height:1.7}' +
    'html.lang-en [lang="si"]{font-family:"Noto Serif Sinhala",serif}' +
    /* මියන්මාර්: Noto Sans Myanmar (Google Fonts) → පද්ධතියේ Myanmar Text / Padauk; රේඛා උස වැඩියෙන් */
    'html.lang-my body{font-family:"Noto Sans Myanmar","Myanmar Text","Padauk","Pyidaungsu",system-ui,sans-serif;line-height:1.9}' +
    'html.lang-my p,html.lang-my li,html.lang-my td,html.lang-my summary{line-height:1.95}' +
    'html.lang-my h1,html.lang-my h2,html.lang-my h3,html.lang-my h4{line-height:1.6}' +
    'html.lang-zh body{font-family:"Noto Serif SC","Noto Sans SC","PingFang SC","Microsoft YaHei",system-ui,sans-serif}' +
    'html.lang-my [lang="si"],html.lang-zh [lang="si"]{font-family:"Noto Serif Sinhala",serif}' +
    /* භාෂා මෙනුව */
    '.mx-lang-wrap{position:relative;display:inline-block}' +
    '.mx-lang-menu{position:absolute;right:0;top:calc(100% + 6px);min-width:10rem;background:#fffaf0;color:#3b1010;border:1px solid #f59e0b;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.28);padding:4px;z-index:70;text-align:left}' +
    '.mx-lang-menu[hidden]{display:none}' +
    '.mx-lang-menu button{display:block;width:100%;text-align:left;padding:9px 12px;border-radius:8px;font-size:15px;line-height:1.6;background:none;border:0;cursor:pointer;color:inherit;font-family:inherit}' +
    '.mx-lang-menu button:hover{background:#fef3c7}' +
    '.mx-lang-menu button[aria-checked="true"]{background:#fde68a;font-weight:700}' +
    ':root.dark .mx-lang-menu{background:#2a1a14;color:#f1e6d8;border-color:#b45309}' +
    ':root.dark .mx-lang-menu button:hover{background:#3b2a20}' +
    ':root.dark .mx-lang-menu button[aria-checked="true"]{background:#5a3a1a}';
  document.head.appendChild(st);
})();
