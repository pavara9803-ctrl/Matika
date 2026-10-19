/* ============================================================
   matika-ui.js — අභිධර්ම මාතිකා : පොදු සංචාලන උපකරණ
   • කියවීමේ ප්‍රගති රේඛාව (header යටින්)
   • ප්‍රධාන සංචාලන තීරුව — tablet / laptop තිරවල (header යටින්)
   • "පටුන" — පිටුවේ ශීර්ෂ වලින් ස්වයංක්‍රීයව සැදෙන අන්තර්ගත ලැයිස්තුව
       – phone / tablet : පාවෙන බොත්තමෙන් විවෘත වන පත්‍රයක්
       – laptop (≥1280px) : දකුණු පසින් ස්ථාවර පටුන් තීරුවක්
   • ඉහළට යාමේ බොත්තම
   අන්තර්ගත පාඨ කිසිවක් වෙනස් නොකරයි; ශීර්ෂ පාඨ එලෙසම පටුනට පිටපත් වේ.
   ============================================================ */
(function () {
  'use strict';
  if (window.__matikaUI) return; window.__matikaUI = true;

  // යෙදුමේ මූල ලිපිනය (මෙම ගොනුව assets/js/ තුළ ඇත)
  var SCRIPT = document.currentScript && document.currentScript.src;
  var ROOT = SCRIPT ? SCRIPT.replace(/assets\/js\/matika-ui\.js(\?.*)?$/, '') : './';

  var NAV = [
    { href: 'index.html',                  label: 'මුල් පිටුව',        match: /^(index\.html)?$/ },
    { href: 'matika/sabbattika.html',      label: 'සබ්බත්තික මාතිකා', match: /^matika\/sabbattika\.html$/ },
    { href: 'matika/tika-matika.html',     label: 'තික මාතිකා',       match: /^matika\/tika-matika\.html$/ },
    { href: 'matika/duka-matika.html',     label: 'දුක මාතිකා',       match: /^matika\/duka-matika\.html$/ },
    { href: 'matika/suttanta-matika.html', label: 'සුත්තන්ත මාතිකා',  match: /^matika\/suttanta-matika\.html$/ },
    { href: 'paramattha/index.html',       label: 'සතර පරමාර්ථ',      match: /^paramattha\// }
  ];

  var SVG = {
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.2" fill="currentColor"/><circle cx="4.5" cy="12" r="1.2" fill="currentColor"/><circle cx="4.5" cy="18" r="1.2" fill="currentColor"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    wheel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.2"/><path d="M12 3.5v6.3M12 14.2v6.3M3.5 12h6.3M14.2 12h6.3M6 6l4.4 4.4M13.6 13.6L18 18M18 6l-4.4 4.4M10.4 13.6L6 18"/></svg>'
  };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var RAIL_MIN = 1280;

  /* පෙර / ඊළඟ බොත්තම්වල ඊළඟ මාතිකාවේ නම පෙන්වීම (tika/duka/suttanta) */
  window.mxPagerNames = function (prevBtn, nextBtn, prevName, nextName) {
    [[prevBtn, prevName], [nextBtn, nextName]].forEach(function (x) {
      var el = x[0] && x[0].querySelector('.mx-pager__name');
      if (el) el.textContent = x[1] || '';
      if (x[0] && x[1]) x[0].setAttribute('title', x[1]);
    });
  };

  function $(s, r) { return (r || document).querySelector(s); }
  function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  function init() {
    var header = $('body > header') || $('header');
    var main = $('main');
    if (!main) return;
    var crumb = $('body > nav');
    var html = document.documentElement;

    function headerH() { return header ? header.offsetHeight : 0; }
    /* ශීර්ෂයට යටින් ඇලී සිටින කොටස් තීරුවක් ඇත්නම් එහි උසද */
    function stickyH() { var b = document.querySelector('.ca-secbar'); return headerH() + (b ? b.offsetHeight : 0); }
    function setHeaderVar() { html.style.setProperty('--m-header-h', headerH() + 'px'); }

    /* ---- 1. ප්‍රගති රේඛාව ---- */
    var bar = null;
    if (header) {
      if (getComputedStyle(header).position === 'static') header.style.position = 'relative';
      bar = document.createElement('div');
      bar.className = 'm-progress';
      bar.setAttribute('aria-hidden', 'true');
      header.appendChild(bar);
    }

    /* ---- 2. ප්‍රධාන සංචාලන තීරුව (tablet / laptop) ---- */
    if (header && !$('.m-topnav', header)) {
      var path = (location.origin + location.pathname).replace(ROOT, '');
      var tn = document.createElement('nav');
      tn.className = 'm-topnav';
      tn.setAttribute('aria-label', 'ප්‍රධාන සංචාලනය');
      var inner = '<div class="m-topnav__in">';
      NAV.forEach(function (n) {
        var cur = n.match.test(path);
        inner += '<a href="' + ROOT + n.href + '"' + (cur ? ' class="is-current" aria-current="page"' : '') + '>' + n.label + '</a>';
      });
      tn.innerHTML = inner + '</div>';
      header.appendChild(tn);
    }
    setHeaderVar();

    /* ---- 3. පාවෙන බොත්තම් ---- */
    var stack = document.createElement('div');
    stack.className = 'm-fab-stack';
    var tocBtn = document.createElement('button');
    tocBtn.type = 'button';
    tocBtn.className = 'm-fab';
    tocBtn.hidden = true;
    tocBtn.setAttribute('aria-label', 'පටුන');
    tocBtn.setAttribute('title', 'පටුන');
    tocBtn.setAttribute('aria-haspopup', 'dialog');
    tocBtn.innerHTML = SVG.list;
    var topBtn = document.createElement('button');
    topBtn.type = 'button';
    topBtn.className = 'm-fab m-fab--top';
    topBtn.setAttribute('aria-label', 'ඉහළට');
    topBtn.setAttribute('title', 'ඉහළට');
    topBtn.innerHTML = SVG.up;
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
    stack.appendChild(tocBtn);
    stack.appendChild(topBtn);
    document.body.appendChild(stack);

    /* ---- 4. පටුන: පත්‍රය (phone/tablet) සහ තීරුව (laptop) ---- */
    var scrim = document.createElement('div');
    scrim.className = 'm-scrim';
    var sheet = document.createElement('aside');
    sheet.className = 'm-sheet';
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-modal', 'true');
    sheet.setAttribute('aria-label', 'පටුන');
    sheet.innerHTML =
      '<div class="m-sheet__head"><div class="m-sheet__title">' + SVG.wheel + '<span>පටුන</span></div>' +
      '<button type="button" class="m-sheet__close" aria-label="වසන්න">' + SVG.x + '</button></div>' +
      '<ol class="m-toc"></ol>';
    document.body.appendChild(scrim);
    document.body.appendChild(sheet);
    var sheetList = $('.m-toc', sheet);

    var rail = document.createElement('aside');
    rail.className = 'm-rail';
    rail.setAttribute('aria-label', 'පටුන');
    rail.hidden = true;
    rail.innerHTML = '<div class="m-rail__title">' + SVG.wheel + '<span>පටුන</span></div><ol class="m-toc"></ol>';
    document.body.appendChild(rail);
    var railList = $('.m-toc', rail);

    var headings = [];
    var uid = 0;

    function visible(el) {
      if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') return false;
      var r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    }
    function collect() {
      var all = $all('main h1, main h2, main h3, main h4').filter(function (h) {
        return visible(h) && h.textContent.replace(/\s+/g, ' ').trim().length > 1 &&
          !h.closest('.m-sheet, .m-rail, [role="dialog"], .fixed, a, button');
      });
      if (!all.length) return [];
      var levels = all.map(function (h) { return +h.tagName[1]; });
      var top = Math.min.apply(null, levels);
      var countTop = levels.filter(function (l) { return l === top; }).length;
      // තනි hero ශීර්ෂය නම්, ඊළඟ මට්ටම ප්‍රධාන ලෙස ගන්න
      if (countTop === 1 && all.length > 3) {
        var rest = levels.filter(function (l) { return l > top; });
        var pri = rest.length ? Math.min.apply(null, rest) : top + 1;
        return all.filter(function (h, i) { return levels[i] === top || levels[i] === pri || levels[i] === pri + 1; })
          .map(function (h) { var l = +h.tagName[1]; return { el: h, lvl: l <= pri ? 2 : 3 }; });
      }
      return all.filter(function (h, i) { return levels[i] <= top + 1; })
        .map(function (h) { return { el: h, lvl: +h.tagName[1] === top ? 2 : 3 }; });
    }
    function fill(list, items, onPick) {
      list.innerHTML = '';
      var n = 0;
      items.forEach(function (it) {
        var h = it.el;
        if (!h.id) h.id = 'm-sec-' + (++uid);
        var li = document.createElement('li');
        li.className = 'lvl-' + it.lvl;
        var a = document.createElement('a');
        a.href = '#' + h.id;
        if (it.lvl === 2) n++;
        var num = document.createElement('span');
        num.className = 'm-toc__n';
        num.textContent = it.lvl === 2 ? String(n) : '';
        var txt = document.createElement('span');
        txt.textContent = h.textContent.replace(/\s+/g, ' ').trim();
        a.appendChild(num); a.appendChild(txt);
        a.addEventListener('click', function (e) {
          e.preventDefault();
          if (onPick) onPick();
          var y = h.getBoundingClientRect().top + window.pageYOffset - stickyH() - 14;
          window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
        });
        li.appendChild(a);
        list.appendChild(li);
      });
    }
    function longPage() { return html.scrollHeight > window.innerHeight * 1.8; }

    /* laptop: දකුණු පස පටුන් තීරුව */
    var railOn = false;
    function layoutRail() {
      var want = window.innerWidth >= RAIL_MIN && longPage() && headings.length >= 3;
      if (!want) {
        if (railOn) {
          railOn = false; rail.hidden = true; html.classList.remove('m-has-rail');
          main.style.marginLeft = ''; if (crumb) crumb.style.marginLeft = '';
        }
        return;
      }
      main.style.marginLeft = ''; if (crumb) crumb.style.marginLeft = '';
      var mainW = main.getBoundingClientRect().width;
      var railW = 272, gap = 36;
      var left = Math.max(32, Math.floor((window.innerWidth - (mainW + gap + railW)) / 2));
      if (left + mainW + gap + railW > window.innerWidth - 16) { // ඉඩ මදි
        if (railOn) { railOn = false; rail.hidden = true; html.classList.remove('m-has-rail'); }
        return;
      }
      railOn = true;
      html.classList.add('m-has-rail');
      main.style.marginLeft = left + 'px';
      if (crumb) crumb.style.marginLeft = left + 'px';
      rail.style.left = (left + mainW + gap) + 'px';
      rail.style.width = railW + 'px';
      rail.hidden = false;
    }

    function refresh() {
      headings = collect().slice(0, 90);
      var show = longPage() && headings.length >= 3;
      layoutRail();
      tocBtn.hidden = !show || railOn;
      if (railOn) { fill(railList, headings); markCurrent(); }
    }

    var lastFocus = null;
    function open() {
      headings = collect().slice(0, 90);
      fill(sheetList, headings, close);
      markCurrent();
      lastFocus = document.activeElement;
      scrim.classList.add('is-open');
      sheet.classList.add('is-open');
      var cur = $('.is-current', sheetList) || $('a', sheetList);
      setTimeout(function () {
        if (cur) { cur.focus({ preventScroll: true }); cur.scrollIntoView({ block: 'center' }); }
      }, 60);
    }
    function close() {
      scrim.classList.remove('is-open');
      sheet.classList.remove('is-open');
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
    tocBtn.addEventListener('click', open);
    scrim.addEventListener('click', close);
    $('.m-sheet__close', sheet).addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sheet.classList.contains('is-open')) close();
    });

    function markCurrent() {
      var off = stickyH() + 48;
      var cur = -1;
      for (var i = 0; i < headings.length; i++) {
        if (headings[i].el.getBoundingClientRect().top <= off) cur = i; else break;
      }
      [sheetList, railList].forEach(function (list) {
        $all('a', list).forEach(function (a, i) { a.classList.toggle('is-current', i === cur); });
      });
      if (railOn && cur >= 0) {
        var a = $all('a', railList)[cur];
        if (a) {
          var rr = rail.getBoundingClientRect(), ar = a.getBoundingClientRect();
          if (ar.top < rr.top + 48 || ar.bottom > rr.bottom - 12) rail.scrollTop += (ar.top - rr.top) - rr.height / 2;
        }
      }
    }

    /* ---- scroll handling ---- */
    var ticking = false;
    function onScroll() {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var max = html.scrollHeight - window.innerHeight;
        var p = max > 0 ? Math.min(1, Math.max(0, window.pageYOffset / max)) : 0;
        if (bar) bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
        topBtn.classList.toggle('is-on', window.pageYOffset > 700);
        if (railOn || sheet.classList.contains('is-open')) markCurrent();
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    var rt = null;
    window.addEventListener('resize', function () {
      setHeaderVar();
      clearTimeout(rt); rt = setTimeout(function () { refresh(); onScroll(); }, 120);
    }, { passive: true });
    onScroll();

    /* ---- අන්තර්ගතය JS මගින් වෙනස් වන විට (views) පටුන නැවත සැකසීම ---- */
    var t = null;
    var mo = new MutationObserver(function (recs) {
      // m-sec id එකතු කිරීම වැනි අපගේම වෙනස්කම් නොසලකා හරින්න
      clearTimeout(t);
      t = setTimeout(function () { refresh(); onScroll(); }, 250);
    });
    mo.observe(main, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'hidden'] });
    setTimeout(refresh, 300);
    window.addEventListener('load', function () { setTimeout(function () { setHeaderVar(); refresh(); }, 300); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
