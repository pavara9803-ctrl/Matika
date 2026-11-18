// Windows ඇප් එක (Tauri) ඇතුළේ පමණක් ක්‍රියා කරයි: බාහිර සබැඳි (http/https/mailto)
// ඇප් එක ඇතුළේ විවෘත කිරීම වෙනුවට පරිගණකයේ පෙරනිමි browser / email ඇප් එකේ විවෘත කරයි.
(function () {
  var t = window.__TAURI__;
  if (!t || !t.core || typeof t.core.invoke !== 'function') return; // බ්‍රවුසරයේ නම් කිසිවක් නොකරයි

  function external(href) {
    return /^(https?:|mailto:)/i.test(href || '');
  }

  function open(href) {
    t.core.invoke('open_url', { url: href }).catch(function () {});
  }

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href');
    if (!external(href)) return;
    e.preventDefault();
    open(a.href);
  }, true);

  var nativeOpen = window.open;
  window.open = function (url) {
    if (external(url)) { open(url); return null; }
    return nativeOpen ? nativeOpen.apply(window, arguments) : null;
  };
})();
