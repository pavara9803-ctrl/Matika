// ============================================================
// native-review.js — Play Store "තරු දීම" (In-App Review) ඉල්ලීම
//   • Android ඇප් එකේ පමණක් ක්‍රියා කරයි (window.MatikaNative.requestReview).
//   • පාඩම් පිටු (matika/ , paramattha/) කිහිපයක් බැලූ පසු, එක් වරක් පමණක් ඉල්ලයි.
//   • Play Store විසින් කවුළුව පෙන්වනවා ද නැද්ද යන්න තීරණය කරයි (quota ඇත);
//     පෙන්වූවත් නැතත් ඇප් එකේ ක්‍රියාකාරිත්වයට බලපෑමක් නැත.
//   • window.MX_REVIEW.ask() — අවශ්‍ය තැනකින් (උදා: බොත්තමකින්) කෙලින්ම ඉල්ලීමට.
//   • prepare-assets.mjs මගින් සෑම HTML පිටුවකටම එක් කරයි.
// ============================================================
(function () {
  'use strict';
  var N = window.MatikaNative;
  if (!N || typeof N.requestReview !== 'function') return;

  var KEY = 'mx-review';
  var MIN_VIEWS = 8;      // බැලූ පාඩම් පිටු ගණන
  var MIN_DAYS = 1;       // පළමු වරට ඇප් එක භාවිත කර ගත විය යුතු දින ගණන

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; }
  }
  function save(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
  }
  function ask() {
    try { N.requestReview(); } catch (e) {}
  }

  window.MX_REVIEW = {
    ask: function () { var s = load(); s.done = 1; s.at = Date.now(); save(s); ask(); },
    state: load
  };

  var s = load();
  if (s.done) return;
  if (!s.first) s.first = Date.now();

  // පාඩම් පිටුවක් ද?
  var p = location.pathname || '';
  if (p.indexOf('/matika/') >= 0 || p.indexOf('/paramattha/') >= 0) s.views = (s.views || 0) + 1;

  var days = (Date.now() - s.first) / 86400000;
  if ((s.views || 0) >= MIN_VIEWS && days >= MIN_DAYS) {
    s.done = 1;
    s.at = Date.now();
    // පිටුව සැකසී ටික වේලාවකට පසු (කියවීමට බාධා නොවන ලෙස)
    setTimeout(ask, 2500);
  }
  save(s);
})();
