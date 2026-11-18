/* font-size.js — අකුරු ප්‍රමාණය වෙනස් කිරීම (සැකසුම් මෙනුවේ A− / A+). ඇප් එකේදී WebView textZoom (සියලු අකුරු), බ්‍රවුසරයේදී html font-size. */
(function () {
  'use strict';
  var STEPS = [80, 90, 100, 110, 125, 150, 175];
  var N = window.MatikaNative;
  function cur() {
    var v = 100;
    try { v = N && N.getTextZoom ? N.getTextZoom() : parseInt(localStorage.getItem('mx_zoom') || '100', 10); } catch (e) {}
    return STEPS.indexOf(v) >= 0 ? v : 100;
  }
  function apply(p) {
    try { if (N && N.setTextZoom) N.setTextZoom(p); else document.documentElement.style.fontSize = p + '%'; } catch (e) {}
    try { localStorage.setItem('mx_zoom', String(p)); } catch (e) {}
    var el = document.getElementById('mx-zoom-val'); if (el) el.textContent = p + '%';
  }
  function init() {
    if (!(N && N.setTextZoom)) { var s = cur(); if (s !== 100) document.documentElement.style.fontSize = s + '%'; }
    var list = document.querySelector('#custom-menu .py-1');
    if (!list || document.getElementById('mx-zoom-row')) return;
    var cls = 'w-8 h-8 rounded-lg bg-amber-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold';
    var row = document.createElement('div');
    row.id = 'mx-zoom-row';
    row.className = 'w-full px-4 py-3 flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-amber-100 dark:border-slate-700';
    row.innerHTML = '<i class="fa-solid fa-text-height text-saffron-600 text-lg w-5"></i><span>අකුරු ප්‍රමාණය</span>' +
      '<span class="ml-auto flex items-center gap-1" data-no-i18n><button type="button" data-zoom="-1" class="' + cls + '" aria-label="A−">A−</button>' +
      '<span id="mx-zoom-val" class="w-11 text-center text-xs">' + cur() + '%</span>' +
      '<button type="button" data-zoom="1" class="' + cls + '" aria-label="A+">A+</button></span>';
    var fb = list.lastElementChild;
    list.insertBefore(row, fb);
    row.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-zoom]'); if (!b) return;
      e.stopPropagation();
      var i = STEPS.indexOf(cur()) + parseInt(b.getAttribute('data-zoom'), 10);
      apply(STEPS[Math.max(0, Math.min(STEPS.length - 1, i))]);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
