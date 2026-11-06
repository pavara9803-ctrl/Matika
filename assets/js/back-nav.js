/* ============================================================
   back-nav.js — දුරකථනයේ (Android / Play Store TWA) Back බොත්තම
   ------------------------------------------------------------
   ප්‍රශ්නය: ඇප් එකේ ඇතුළත පිටු මාරු වීම් (ලැයිස්තුව → විස්තරය, ☰ මෙනුව,
   අදහස් පෝරමය ආදිය) browser history එකේ සටහන් නොවන නිසා, Back ඔබන විට
   එක් පියවරක් ආපසු යෑම වෙනුවට පිටුවෙන්ම / ඇප් එකෙන්ම පිටවෙයි.

   විසඳුම: root නොවන view එකක් හෝ overlay එකක් විවෘත වූ විට history හි
   entry එකක් එක් කර, Back ඔබන විට අදාළ view/overlay එක වසයි.
   • MxBack.view(fn|null) — දැන් පෙන්වන view එක root නොවේ නම්, Back මගින් parent
     view එකට යන ශ්‍රිතය (root නම් null)
   • MxBack.add(closeFn) / MxBack.remove(closeFn) — overlay විවෘත / වසා ඇති බව
   ============================================================ */
(function () {
  'use strict';
  if (window.MxBack) return;

  var overlays = [];      // විවෘත overlay වල close ශ්‍රිත (අලුත්ම අවසානයේ)
  var viewBack = null;    // root නොවන view එකකදී parent එකට යන ශ්‍රිතය
  var have = 0;           // අප විසින් history එකට එක් කළ entries ගණන
  var pending = false, pendingTimer = null, cleanTimer = null, leaving = false;

  function desired() { return overlays.length + (viewBack ? 1 : 0); }

  function endPending() { pending = false; clearTimeout(pendingTimer); }
  function startPending() {
    pending = true;
    clearTimeout(pendingTimer);
    pendingTimer = setTimeout(function () { pending = false; sync(); }, 700);
  }

  // අවශ්‍ය entries ප්‍රමාණය history හි තබන්න
  function sync() {
    if (pending) return;
    var d = desired();
    while (have < d) {
      try { history.pushState({ mxb: have + 1 }, '', location.href); } catch (e) { have = d; break; }
      have++;
    }
    // UI බොත්තමකින් වසා ඇත්නම් ඉතිරි වූ entries ටික පසුව (ඉක්මනින් නොව) ඉවත් කරන්න.
    // (වෙනත් පිටුවකට යමින් සිටියදී history.go() කර යාම වැළැක්වීමට ප්‍රමාද කරයි.)
    if (have > d && !cleanTimer) cleanTimer = setTimeout(cleanup, 250);
  }

  function cleanup() {
    cleanTimer = null;
    if (leaving || pending) { if (have > desired()) sync(); return; }
    var n = have - desired();
    if (n <= 0) return;
    have -= n;
    startPending();
    try { history.go(-n); } catch (e) { endPending(); }
  }

  window.addEventListener('popstate', function () {
    if (pending) { endPending(); sync(); return; }
    if (have <= 0) return;               // අපේ entry එකක් නොවේ
    have--;
    if (overlays.length) {
      var close = overlays.pop();
      try { close(); } catch (e) {}
    } else if (viewBack) {
      var back = viewBack; viewBack = null;
      try { back(); } catch (e) {}
    } else {
      // වසන්න දෙයක් නැත, ඉතිරි වූ පැරණි entries පමණි — පිටුවෙන් පිටවන්න
      var n = have + 1; have = 0;
      startPending();
      try { history.go(-n); } catch (e) { endPending(); }
      return;
    }
    sync();
  });

  // වෙනත් පිටුවකට යන විට cleanup නොකරන්න
  function markLeaving() { leaving = true; setTimeout(function () { leaving = false; }, 1500); }
  window.addEventListener('beforeunload', markLeaving);
  window.addEventListener('pagehide', markLeaving);
  window.addEventListener('pageshow', function () { leaving = false; });

  var api = {
    view: function (fn) { viewBack = fn || null; sync(); },
    add: function (fn) { if (typeof fn === 'function' && overlays.indexOf(fn) < 0) { overlays.push(fn); sync(); } },
    remove: function (fn) { var i = overlays.indexOf(fn); if (i >= 0) { overlays.splice(i, 1); sync(); } }
  };
  window.MxBack = api;

  // ---------- class / hidden වෙනස් වීම් නිරීක්ෂණය කර overlay ලියාපදිංචි කිරීම ----------
  function watch(el, isOpen, close) {
    if (!el || !window.MutationObserver) return;
    var was = !!isOpen(el);
    if (was) api.add(close);
    new MutationObserver(function () {
      var now = !!isOpen(el);
      if (now === was) return;
      was = now;
      if (now) api.add(close); else api.remove(close);
    }).observe(el, { attributes: true, attributeFilter: ['class', 'hidden', 'style'] });
  }

  function wireOverlays() {
    var menu = document.getElementById('custom-menu');            // ☰ මෙනුව
    watch(menu, function (el) { return !el.classList.contains('hidden'); },
      function () { menu.classList.add('hidden'); });

    var tree = document.getElementById('home-tree');              // අන්තර්ගත රුක
    watch(tree, function (el) { return !el.hidden; },
      function () { if (window.closeHomeTree) window.closeHomeTree(); else tree.hidden = true; });

    var fb = document.getElementById('feedback-modal');           // අදහස් පෝරමය
    watch(fb, function (el) { return !el.classList.contains('hidden'); },
      function () { if (window.closeFeedbackModal) window.closeFeedbackModal(); else fb.classList.add('hidden'); });
  }

  // ---------- පිටු තුළ view මාරු කරන ශ්‍රිත වෙත සම්බන්ධ කිරීම ----------
  // සෑම පිටුවකම "view එක පෙන්වන" ශ්‍රිතය wrap කර, root නොවන view එකකදී Back ශ්‍රිතය ලියාපදිංචි කරයි.
  function wrap(showName, backOf) {
    var orig = window[showName];
    if (typeof orig !== 'function') return;
    window[showName] = function (id) {
      var r = orig.apply(this, arguments);
      var name = backOf(id);
      api.view(name ? function () { if (typeof window[name] === 'function') window[name](); } : null);
      return r;
    };
  }

  function wireViews() {
    // තික මාතිකා
    wrap('showTikaView', function (id) { return id === 'tika-view-list' ? null : 'backToTikaList'; });

    // දුක මාතිකා: විස්තරය → පද යුගලය → දුක ලැයිස්තුව → ගොච්ඡක ලැයිස්තුව
    wrap('showDukaView', function (id) {
      switch (id) {
        case 'duka-view-pada-detail': return 'backToPadaPair';
        case 'duka-view-pada-pair': return 'backToDukaList';
        case 'duka-view-duka-list':
        case 'duka-view-bookmarks': return 'backToGochhakaList';
        default: return null;                                     // duka-view-list
      }
    });

    // සුත්තන්ත මාතිකා
    wrap('showSuttantaView', function (name) { return name === 'list' ? null : 'backToSuttantaList'; });
  }

  function init() { wireOverlays(); wireViews(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
