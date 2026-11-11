/* ============================================================
   site-header.js — මුල් පිටුවේ ශීර්ෂයම (අන්තර්ගත රුක · සෙවුම · භාෂාව · සැකසුම්) අනෙක් පිටු සඳහා
   • පිටුවේ පවතින <header> එක ප්‍රතිස්ථාපනය කරයි (පිටු මාතෘකාව sr-only; "සුරැකි මාතිකා" වැනි බොත්තම් සැකසුම් මෙනුවට)
   • අන්තර්ගත රුක (home-tree.js) සහ සෙවුම (home-search.js) පූරණය කරයි
   • මෙම ගොනුව <header> අවසානයෙන් පසුව, සමකාලීනව (sync) පූරණය විය යුතුයි
   ============================================================ */
(function () {
  'use strict';
  var hdr = document.querySelector('body > header') || document.querySelector('header');
  if (!hdr || hdr.classList.contains('home-header') || document.getElementById('home-tree-btn')) return;

  var cs = document.currentScript;
  var ROOT = (cs && cs.src) ? cs.src.replace(/assets\/js\/site-header\.js(\?.*)?$/, '') : './';
  window.MX_ROOT = ROOT;
  window.MX_NO_URLQ = true;            /* අනෙක් පිටුවල URL එකට ?q= නොලියන්න */

  var SYMS = "<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\" focusable=\"false\">\n<symbol id=\"ic-bodhi\" viewBox=\"0 0 24 24\">\n<path class=\"bo__leaf\" d=\"M12 1.8c.9 2.3 2.2 3.6 4.1 4.9 3.7 2.4 4.8 6.4 2.8 9.8-1.4 2.3-3.9 3.6-6.9 3.4-3 .2-5.5-1.1-6.9-3.4-2-3.4-.9-7.4 2.8-9.8 1.9-1.3 3.2-2.6 4.1-4.9z\" fill=\"currentColor\" fill-opacity=\".16\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linejoin=\"round\"/>\n<path class=\"bo__vein\" d=\"M12 22.4V8.2M12 16.6l-3.9-3.6M12 16.6l3.9-3.6M12 12.6L9.3 10M12 12.6l2.7-2.6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</symbol>\n<symbol id=\"ic-menu\" viewBox=\"0 0 24 24\">\n<path d=\"M4 6.5h16M4 12h10.5M4 17.5h16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n<circle cx=\"19\" cy=\"12\" r=\"1.6\" fill=\"currentColor\"/>\n</symbol>\n<symbol id=\"ic-gear\" viewBox=\"0 0 24 24\">\n<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n<circle cx=\"12\" cy=\"12\" r=\"3\"/>\n<path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\"/>\n</g>\n</symbol>\n</svg>";
  var TREE = "<div id=\"home-tree\" class=\"ht\" role=\"dialog\" aria-labelledby=\"ht-title\" hidden>\n<div class=\"ht__bar\">\n<svg class=\"bo bo--bar\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\"><use href=\"#ic-bodhi\"/></svg>\n<span id=\"ht-title\" class=\"ht__bar-title\"><span class=\"ht__t\">අන්තර්ගත රුක</span></span>\n<button type=\"button\" class=\"ht__x\" onclick=\"closeHomeTree()\" aria-label=\"වසන්න\" title=\"වසන්න\"><i class=\"fa-solid fa-xmark\" aria-hidden=\"true\"></i></button>\n</div>\n<ul class=\"ht__root\" role=\"tree\">\n<li>\n<a class=\"ht__link ht__link--home\" href=\"{R}index.html\" onclick=\"closeHomeTree();\"><i class=\"fa-solid fa-house ht__ico\" aria-hidden=\"true\"></i><span class=\"ht__t\">මුල් පිටුව</span></a>\n<ul>\n<li>\n<details open>\n<summary><i class=\"fa-solid fa-chevron-right ht__caret\" aria-hidden=\"true\"></i><span class=\"ht__grp\"><i class=\"fa-solid fa-book-open ht__ico\" aria-hidden=\"true\"></i><span class=\"ht__t\">මාතිකා</span></span></summary>\n<ul>\n<li><a class=\"ht__link\" href=\"{R}matika/sabbattika.html\"><i class=\"fa-solid fa-book-open ht__ico\" aria-hidden=\"true\"></i><span class=\"ht__t\">සබ්බත්තික මාතිකා සහ ස්වරූපාර්ථ</span></a></li>\n<li>\n<details>\n<summary><i class=\"fa-solid fa-chevron-right ht__caret\" aria-hidden=\"true\"></i><a class=\"ht__link\" href=\"{R}matika/tika-matika.html\"><i class=\"fa-solid fa-layer-group ht__ico\" aria-hidden=\"true\"></i><span class=\"ht__t\">තික මාතිකා</span></a><span class=\"ht__count\">22</span></summary>\n<ul>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">01. කුසල ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">02. වේදනා ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">03. විපාක ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">04. උපාදින්න ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">05. සංකිලිට්ඨ ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">06. විතර්ක ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">07. ප්‍රීති ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">08. දස්සන ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">09. දස්සනහේතු ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">10. ආචයගාමී ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">11. සෙක්ඛ ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">12. පරිත්ත ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">13. පරිත්තාරම්මණ ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">14. හීන ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">15. මිච්ඡත්ත ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">16. මග්ගාරම්මණ ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">17. උප්පන්න ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">18. අතීත ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">19. අතීතාරම්මණ ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">20. අජ්ඣත්ත ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">21. අජ්ඣත්තාරම්මණ ත්‍රිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/tika-matika.html\"><span class=\"ht__t\">22. සනිදස්සන ත්‍රිකය</span></a></li>\n</ul>\n</details>\n</li>\n<li>\n<details>\n<summary><i class=\"fa-solid fa-chevron-right ht__caret\" aria-hidden=\"true\"></i><a class=\"ht__link\" href=\"{R}matika/duka-matika.html\"><i class=\"fa-solid fa-list-ol ht__ico\" aria-hidden=\"true\"></i><span class=\"ht__t\">දුක මාතිකා</span></a><span class=\"ht__count\">100</span></summary>\n<ul>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/duka-matika.html\"><span class=\"ht__t\">01. හේතු ගොච්ඡකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/duka-matika.html\"><span class=\"ht__t\">02. චුල්ලන්තර දුකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/duka-matika.html\"><span class=\"ht__t\">03. ආසව ගොච්ඡකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/duka-matika.html\"><span class=\"ht__t\">04. සංයෝජන ගොච්ඡකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/duka-matika.html\"><span class=\"ht__t\">05. ගන්ථ ගොච්ඡකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/duka-matika.html\"><span class=\"ht__t\">06. ඕඝ ගොච්ඡකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/duka-matika.html\"><span class=\"ht__t\">07. යෝග ගොච්ඡකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/duka-matika.html\"><span class=\"ht__t\">08. නීවරණ ගොච්ඡකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/duka-matika.html\"><span class=\"ht__t\">09. පරාමාස ගොච්ඡකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/duka-matika.html\"><span class=\"ht__t\">10. මහන්තර දුකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/duka-matika.html\"><span class=\"ht__t\">11. උපාදාන ගොච්ඡකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/duka-matika.html\"><span class=\"ht__t\">12. කිලෙස ගොච්ඡකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}matika/duka-matika.html\"><span class=\"ht__t\">13. පිට්ඨි දුකය</span></a></li>\n</ul>\n</details>\n</li>\n<li><a class=\"ht__link\" href=\"{R}matika/suttanta-matika.html\"><i class=\"fa-solid fa-scroll ht__ico\" aria-hidden=\"true\"></i><span class=\"ht__t\">සුත්තන්ත මාතිකා</span></a></li>\n</ul>\n</details>\n</li>\n<li>\n<details open>\n<summary><i class=\"fa-solid fa-chevron-right ht__caret\" aria-hidden=\"true\"></i><a class=\"ht__link\" href=\"{R}paramattha/index.html\"><i class=\"fa-solid fa-gem ht__ico ht__ico--gem\" aria-hidden=\"true\"></i><span class=\"ht__t\">සතර පරමාර්ථ</span></a><span class=\"ht__count\">4</span></summary>\n<ul>\n<li><details><summary><i class=\"fa-solid fa-chevron-right ht__caret\" aria-hidden=\"true\"></i><a class=\"ht__link ht__link--leaf\" href=\"{R}paramattha/citta.html\"><span class=\"ht__dot ht__dot--citta\" aria-hidden=\"true\"></span><span class=\"ht__t\">චිත්තය</span></a></summary><ul><li><a class=\"ht__link ht__link--leaf\" href=\"{R}paramattha/citta.html#sec-vithi\"><span class=\"ht__t\">චිත්තවීථි</span></a></li></ul></details></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}paramattha/caitasika.html\"><span class=\"ht__dot ht__dot--caitasika\" aria-hidden=\"true\"></span><span class=\"ht__t\">චෛතසිකය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}paramattha/rupa.html\"><span class=\"ht__dot ht__dot--rupa\" aria-hidden=\"true\"></span><span class=\"ht__t\">රූපය</span></a></li>\n<li><a class=\"ht__link ht__link--leaf\" href=\"{R}paramattha/nibbana.html\"><span class=\"ht__dot ht__dot--nibbana\" aria-hidden=\"true\"></span><span class=\"ht__t\">නිර්වාණය</span></a></li>\n</ul>\n</details>\n</li>\n</ul>\n</li>\n</ul>\n</div>".replace(/\{R\}/g, ROOT);
  var MENU = "<div id=\"custom-menu\" class=\"hidden fixed top-16 right-4 z-50 bg-white dark:bg-slate-800 border border-amber-300 dark:border-slate-700 rounded-xl shadow-2xl w-64 overflow-hidden\">\n<div class=\"py-1\">\n    <button id=\"menu-install-btn\" onclick=\"menuAction('install')\" class=\"hidden w-full text-left px-4 py-3 hover:bg-amber-100 dark:hover:bg-slate-700 flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-amber-100 dark:border-slate-700\">\n        <i class=\"fa-solid fa-download text-green-600 text-lg w-5\"></i> යෙදුම install කරන්න\n    </button>\n    <button onclick=\"menuAction('rate')\" class=\"w-full text-left px-4 py-3 hover:bg-amber-100 dark:hover:bg-slate-700 flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-amber-100 dark:border-slate-700\">\n        <i class=\"fa-solid fa-star text-yellow-500 text-lg w-5\"></i> මෙම යෙදුමට තරු යොදන්න\n    </button>\n    <button onclick=\"menuAction('share')\" class=\"w-full text-left px-4 py-3 hover:bg-amber-100 dark:hover:bg-slate-700 flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-amber-100 dark:border-slate-700\">\n        <i class=\"fa-solid fa-share-nodes text-blue-500 text-lg w-5\"></i> මෙම යෙදුම බෙදාගන්න\n    </button>\n    <button onclick=\"menuAction('star')\" class=\"w-full text-left px-4 py-3 hover:bg-amber-100 dark:hover:bg-slate-700 flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-amber-100 dark:border-slate-700\">\n        <i class=\"fa-solid fa-star text-yellow-500 text-lg w-5\"></i> 0 තරු යෙදුම\n    </button>\n    <button onclick=\"menuAction('about')\" class=\"w-full text-left px-4 py-3 hover:bg-amber-100 dark:hover:bg-slate-700 flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-amber-100 dark:border-slate-700\">\n        <i class=\"fa-solid fa-circle-info text-saffron-600 text-lg w-5\"></i> මෙම යෙදුම ගැන\n    </button>\n    <a href=\"https://buddhistapps.vercel.app/\" target=\"_blank\" rel=\"noopener\" onclick=\"var m=document.getElementById('custom-menu'); if (m) m.classList.add('hidden');\" class=\"w-full text-left px-4 py-3 hover:bg-amber-100 dark:hover:bg-slate-700 flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-amber-100 dark:border-slate-700\">\n        <i class=\"fa-solid fa-dharmachakra text-maroon-700 dark:text-saffron-400 text-lg w-5\"></i> අප ගැන\n        <i class=\"fa-solid fa-arrow-up-right-from-square text-xs text-slate-400 ml-auto\" aria-hidden=\"true\"></i>\n    </a>\n    <button onclick=\"menuAction('help')\" class=\"w-full text-left px-4 py-3 hover:bg-amber-100 dark:hover:bg-slate-700 flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-amber-100 dark:border-slate-700\">\n        <i class=\"fa-solid fa-circle-question text-purple-600 text-lg w-5\"></i> ඇප් එක භාවිත කරන ආකාරය\n    </button>\n    <button onclick=\"menuAction('updates')\" class=\"w-full text-left px-4 py-3 hover:bg-amber-100 dark:hover:bg-slate-700 flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-amber-100 dark:border-slate-700\">\n        <i class=\"fa-solid fa-clipboard-check text-green-600 text-lg w-5\"></i> නිවැරදි කළ කරුණු\n        <span data-mxu-badge data-no-i18n class=\"hidden ml-auto min-w-[22px] h-[22px] px-1.5 rounded-full bg-green-600 text-white text-xs font-bold leading-[22px] text-center\"></span>\n    </button>\n    <button onclick=\"toggleDarkMode()\" class=\"w-full text-left px-4 py-3 hover:bg-amber-100 dark:hover:bg-slate-700 flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-amber-100 dark:border-slate-700\">\n        <i id=\"theme-toggle-icon\" class=\"fa-solid fa-moon text-indigo-500 text-lg w-5\"></i> ආලෝක / අඳුරු තේමාව\n    </button>\n    <button onclick=\"menuAction('feedback')\" class=\"w-full text-left px-4 py-3 hover:bg-amber-100 dark:hover:bg-slate-700 flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200\">\n        <i class=\"fa-solid fa-comment-dots text-saffron-600 text-lg w-5\"></i> අදහස් එවන්න\n    </button>\n</div>\n</div>";
  var TREEBTN = "<button id=\"home-tree-btn\" type=\"button\" onclick=\"toggleHomeTree()\" aria-haspopup=\"true\" aria-expanded=\"false\" aria-controls=\"home-tree\" class=\"ht-btn p-2 rounded-lg bg-maroon-800 hover:bg-maroon-700 text-saffron-200\" title=\"අන්තර්ගත රුක\" aria-label=\"අන්තර්ගත රුක\"><svg class=\"bo bo--menu\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\"><use href=\"#ic-menu\"/></svg><i class=\"fa-solid fa-caret-down ht-btn__caret\" aria-hidden=\"true\"></i></button>";
  var GEAR = "<button onclick=\"toggleMenu()\" class=\"ht-btn ht-btn--gear p-2 rounded-lg bg-maroon-800 hover:bg-maroon-700 text-saffron-200 ml-1\" title=\"සැකසුම්\" aria-label=\"සැකසුම්\">\n    <svg class=\"bo bo--gear\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\"><use href=\"#ic-gear\"/></svg>\n</button>";

  /* ── පිටුවේ මාතෘකාව සහ විශේෂ බොත්තම් එකතු කරගැනීම ── */
  var h1 = hdr.querySelector('h1');
  var grp = h1 && h1.parentElement;
  var titleNode = !h1 ? null : ((grp && grp !== hdr && !grp.classList.contains('justify-between') && !grp.querySelector('button,a')) ? grp : h1);
  var extras = [];
  Array.prototype.forEach.call(hdr.querySelectorAll('button, a'), function (el) {
    if (titleNode && titleNode.contains(el)) return;
    var oc = el.getAttribute('onclick') || '';
    if (/toggleDarkMode|toggleMenu|toggleHomeTree/.test(oc)) return;                    /* තේමාව: දැන් සැකසුම් මෙනුවේ */
    var href = el.getAttribute('href') || '';
    if (el.tagName === 'A' && /(^|\/)index\.html(#.*)?$/.test(href)) return;            /* මුල් පිටුවට / ආපසු: රුකේ තිබේ */
    if (el.tagName === 'A' && /^\.\.?\/?$/.test(href)) return;
    if (/scrollToTop/.test(oc)) return;                                                 /* ඉහළට: අවශ්‍ය නැත */
    extras.push(el);
  });

  /* ── නව ශීර්ෂය ── */
  var svg = document.createElement('div');
  svg.innerHTML = SYMS;
  document.body.insertBefore(svg.firstChild, document.body.firstChild);

  var header = document.createElement('header');
  header.className = 'home-header sticky top-0 z-30 bg-maroon-900 text-amber-100 shadow-md border-b-2 border-saffron-500';
  header.setAttribute('data-mx-site-header', '');
  header.innerHTML =
    '<div class="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">' +
    '<div class="flex items-center space-x-2 space-x-reverse">' + TREEBTN + '</div>' +
    '<form class="hs-wrap" role="search" onsubmit="return false" data-no-i18n>' +
    '<i class="fa-solid fa-magnifying-glass hs-ico" aria-hidden="true"></i>' +
    '<input id="hs-q" class="hs-input" type="search" inputmode="search" enterkeyhint="search" autocomplete="off" autocapitalize="off" spellcheck="false">' +
    '<button type="button" id="hs-x" class="hs-x hidden" aria-label="✕">✕</button></form>' +
    GEAR + '</div>';

  /* පිටුවේ මාතෘකාව (h1) screen-reader සඳහා පමණක් තබයි */
  if (h1) { h1.className = 'sr-only'; header.appendChild(h1); }

  hdr.parentNode.insertBefore(header, hdr);
  hdr.parentNode.removeChild(hdr);

  /* ── මෙනුව, රුක, සෙවුම් ප්‍රතිඵල පැනලය ── */
  var wrap = document.createElement('div');
  wrap.innerHTML = MENU + TREE;
  while (wrap.firstChild) document.body.appendChild(wrap.firstChild);
  var MI = 'w-full text-left px-4 py-3 hover:bg-amber-100 dark:hover:bg-slate-700 flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-amber-100 dark:border-slate-700 relative';
  var list = document.querySelector('#custom-menu > div');
  extras.slice().reverse().forEach(function (el) {
    var label = el.getAttribute('title') || '';
    el.className = MI;
    el.removeAttribute('title');
    var i = el.querySelector('i'); if (i) i.className = i.className.replace(/\btext-lg\b/, '') + ' text-saffron-600 text-lg w-5';
    var span = document.createElement('span'); span.textContent = label; el.appendChild(span);
    if (list) list.insertBefore(el, list.firstChild);
  });
  var panel = document.createElement('section');
  panel.id = 'hs-panel'; panel.className = 'hs-panel hs-panel--overlay'; panel.hidden = true;
  panel.setAttribute('aria-live', 'polite'); panel.setAttribute('data-no-i18n', '');
  panel.innerHTML = '<div class="sr-chips" id="hs-chips" role="group"></div><p class="sr-count" id="hs-count"></p><div id="hs-list"></div>';
  document.body.appendChild(panel);
  function place() { panel.style.top = header.getBoundingClientRect().bottom + 'px'; }
  place(); window.addEventListener('resize', place);
  panel.addEventListener('transitionend', place);
  new MutationObserver(place).observe(panel, { attributes: true, attributeFilter: ['hidden'] });

  /* ── සැකසුම් මෙනුවේ ක්‍රියා (මුල් පිටුවේ app.js නොමැති පිටු සඳහා) ── */
  if (typeof window.toggleMenu !== 'function') {
    window.toggleMenu = function () { var m = document.getElementById('custom-menu'); if (m) m.classList.toggle('hidden'); };
    document.addEventListener('click', function (e) {
      var m = document.getElementById('custom-menu');
      if (!m || m.classList.contains('hidden')) return;
      if (!m.contains(e.target) && !e.target.closest('button[onclick="toggleMenu()"]')) m.classList.add('hidden');
    });
  }
  if (typeof window.menuAction !== 'function') {
    var PKG = 'app.vercel.matika_snowy.twa';
    window.menuAction = function (a) {
      var m = document.getElementById('custom-menu'); if (m) m.classList.add('hidden');
      if (a === 'about' || a === 'help' || a === 'updates') { location.href = ROOT + a + '.html'; return; }
      if (a === 'feedback') { location.href = ROOT + 'index.html?feedback=1'; return; }
      if (a === 'rate' || a === 'star') {
        var u = 'https://play.google.com/store/apps/details?id=' + PKG;
        try {
          if (/android/i.test(navigator.userAgent)) location.href = 'intent://details?id=' + PKG + '#Intent;scheme=market;package=com.android.vending;S.browser_fallback_url=' + encodeURIComponent(u) + ';end';
          else window.open(u, '_blank', 'noopener');
        } catch (e) { window.open(u, '_blank', 'noopener'); }
        return;
      }
      if (a === 'share') {
        var d = { title: 'අභිධර්ම මාතිකා අධ්‍යයනය', text: 'අභිධර්ම මාතිකා අධ්‍යයනය සඳහා වූ මෙම යෙදුම භාවිතා කර බලන්න.', url: location.href };
        if (navigator.share) navigator.share(d).catch(function () {});
        else if (navigator.clipboard) navigator.clipboard.writeText(d.url).catch(function () {});
      }
    };
  }
  if (typeof window.toggleDarkMode !== 'function') {
    window.toggleDarkMode = function () {
      var h = document.documentElement, dk = !h.classList.contains('dark');
      h.classList.toggle('dark', dk);
      try { localStorage.setItem('abhidhamma_theme', dk ? 'dark' : 'light'); } catch (e) {}
    };
  }

  /* ── රුක සහ සෙවුම් පූරණය ── */
  function load(src) { var s = document.createElement('script'); s.src = ROOT + src; document.body.appendChild(s); }
  load('assets/js/home-tree.js');
  load('assets/js/home-search.js');
})();
