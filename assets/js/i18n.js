/* ============================================================
   i18n.js — සිංහල / English භාෂා මාරුව (Language switch)
   • සිංහල මුල් පාඨය කිසිවිටෙක වෙනස් නොකෙරේ; English පෙනෙන්නේ තිරයේ පමණි.
   • මුල් පාඨය → English පරිවර්තන assets/i18n/*.js ගොනුවල ඇත
     (MX_I18N.add({ 'සිංහල පාඨය': 'English text' })).
   • පරිවර්තනයක් නැති පාඨ සිංහලෙන් ම පෙන්වයි (ආපසු සිංහල).
   • තෝරාගත් භාෂාව localStorage('matika-lang') හි සුරැකේ; ?lang=en යොදා ද විවෘත කළ හැක.
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

  var dict = {};          // සිංහල (සාමාන්‍යකරණය කළ) → English
  var patterns = [];      // [RegExp, replacement] — ඉලක්කම් අඩංගු පාඨ සඳහා
  var lang = 'si';
  var listeners = [];
  var observer = null;
  var loaded = {};
  var pending = 0;

  function norm(s) { return String(s).replace(/\s+/g, ' ').trim(); }

  /* ---------- පරිවර්තනය ---------- */
  function lookup(s) {
    var k = norm(s);
    if (!k || !SIN.test(k)) return null;
    if (Object.prototype.hasOwnProperty.call(dict, k)) return dict[k];
    for (var i = 0; i < patterns.length; i++) {
      if (patterns[i][0].test(k)) return k.replace(patterns[i][0], patterns[i][1]);
    }
    return null;
  }

  /* පරිවර්තනය ඇත්නම් English, නැත්නම් මුල් පාඨය */
  function t(s) {
    if (lang !== 'en' || typeof s !== 'string') return s;
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
  }

  var origTitle = null;
  function doHead() {
    if (origTitle === null) origTitle = document.title;
    var en = lang === 'en' ? lookup(origTitle) : null;
    document.title = en != null ? en : origTitle;
    var metas = document.querySelectorAll(
      'meta[name="description"],meta[name="keywords"],meta[property="og:title"],meta[property="og:description"],' +
      'meta[name="twitter:title"],meta[name="twitter:description"],meta[name="apple-mobile-web-app-title"]');
    for (var i = 0; i < metas.length; i++) {
      var m = metas[i];
      if (m.__mxo === undefined) m.__mxo = m.getAttribute('content') || '';
      var r = lang === 'en' ? lookup(m.__mxo) : null;
      m.setAttribute('content', r != null ? r : m.__mxo);
    }
  }

  function applyAll() {
    if (observer) observer.disconnect();
    var html = document.documentElement;
    html.setAttribute('lang', lang === 'en' ? 'en' : 'si');
    html.classList.toggle('lang-en', lang === 'en');
    if (lang === 'en') walk(document, doText, doAttrs);
    else walk(document, undoText, undoAttrs);
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
      if (lang !== 'en') return;
      observer.disconnect();
      muts.forEach(function (m) {
        if (m.type === 'childList') {
          for (var i = 0; i < m.addedNodes.length; i++) walk(m.addedNodes[i], doText, doAttrs);
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

  /* ---------- toggle බොත්තම ---------- */
  var buttons = [];
  function updateButtons() {
    buttons.forEach(function (b) {
      var toEn = lang !== 'en';
      b.textContent = toEn ? 'EN' : 'සිං';
      b.setAttribute('data-no-i18n', '');
      b.setAttribute('title', toEn ? 'Switch to English' : 'සිංහලට මාරු වන්න');
      b.setAttribute('aria-label', toEn ? 'Switch to English' : 'සිංහලට මාරු වන්න');
      b.setAttribute('lang', toEn ? 'en' : 'si');
    });
  }

  function makeButton(cls) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = cls;
    b.setAttribute('data-mx-lang-toggle', '');
    b.addEventListener('click', function () { setLang(lang === 'en' ? 'si' : 'en'); });
    buttons.push(b);
    return b;
  }

  function injectToggle() {
    if (document.querySelector('[data-mx-lang-toggle]')) return;
    var header = document.querySelector('body > header') || document.querySelector('header');
    var cls = 'mx-lang-btn p-2 rounded-lg bg-maroon-800 hover:bg-maroon-700 text-saffron-200 ml-1 font-bold text-sm';
    if (header) {
      var theme = header.querySelector('[onclick*="toggleDarkMode"]') || header.querySelector('[onclick*="toggleMenu"]');
      var bar = header.querySelector('.flex.items-center.justify-between') || header.firstElementChild || header;
      var b = makeButton(cls);
      b.style.minWidth = '2.4rem';
      if (theme && theme.parentNode) theme.parentNode.insertBefore(b, theme);
      else bar.appendChild(b);
    } else {
      var f = makeButton('mx-lang-btn');
      f.style.cssText = 'position:fixed;top:10px;right:10px;z-index:60;padding:6px 10px;border-radius:10px;' +
        'background:#581113;color:#fde68a;font-weight:700;font-size:14px;border:1px solid #f59e0b';
      document.body.appendChild(f);
    }
    updateButtons();
  }

  /* ---------- පරිවර්තන ගොනු පූරණය ---------- */
  function dictFiles() {
    var p = location.pathname;
    var files = ['en-common.js', 'en-app.js'];
    if (/\/paramattha\//.test(p)) files.push('en-paramattha.js');
    if (/\/matika\//.test(p)) files.push('en-matika.js');
    if (/\/sabbattika\.html/.test(p)) files.push('en-sabbattika.js');
    if (/\/tika-matika\.html/.test(p)) files.push('en-tika.js');
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
  function setLang(l) {
    l = l === 'en' ? 'en' : 'si';
    try { localStorage.setItem(KEY, l); } catch (e) {}
    var changed = l !== lang;
    lang = l;
    if (l === 'en') loadDicts(function () { applyAll(); if (changed) fire(); });
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
    add: function (obj) {
      dictVersion++;
      for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) dict[norm(k)] = obj[k];
      if (lang === 'en' && document.body) applyAll();
    },
    addPatterns: function (arr) { patterns = patterns.concat(arr); },
    onChange: function (fn) { listeners.push(fn); }
  };

  /* alert / confirm පණිවිඩද පරිවර්තනය කරයි */
  ['alert', 'confirm'].forEach(function (n) {
    var orig = window[n];
    if (typeof orig !== 'function') return;
    window[n] = function (msg) { return orig.call(window, t(msg)); };
  });

  /* ---------- ආරම්භය ---------- */
  var q = /[?&]lang=(en|si)\b/.exec(location.search);
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  lang = (q && q[1]) || saved || 'si';
  if (lang !== 'en') lang = 'si';
  if (q) { try { localStorage.setItem(KEY, lang); } catch (e) {} }

  function start() {
    try { injectToggle(); } catch (e) { if (window.console) console.warn('[i18n] toggle', e); }
    initObserver();
    if (lang === 'en') loadDicts(function () { applyAll(); fire(); });
    else applyAll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

  /* English අකුරු සඳහා සුළු පෙනුම් සැකසුම් */
  var st = document.createElement('style');
  st.textContent =
    'html.lang-en body{font-family:Inter,"Segoe UI",system-ui,-apple-system,Roboto,"Noto Serif Sinhala",sans-serif}' +
    'html.lang-en p,html.lang-en li,html.lang-en td{hyphens:auto;-webkit-hyphens:auto;line-height:1.7}' +
    'html.lang-en [lang="si"]{font-family:"Noto Serif Sinhala",serif}';
  document.head.appendChild(st);
})();
