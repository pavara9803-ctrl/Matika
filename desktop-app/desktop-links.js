// Windows ඇප් එක (Tauri) ඇතුළේ පමණක් ක්‍රියා කරයි: බාහිර සබැඳි (වෙනත් වෙබ් අඩවි, mailto)
// පරිගණකයේ පෙරනිමි browser / email ඇප් එකේ විවෘත කරයි.
// වැදගත්: ඇප් එක ඇතුළේම ඇති පිටු (http://tauri.localhost/...) බාහිර ලෙස නොසලකයි —
// site-header.js වැනි ස්ක්‍රිප්ට් සබැඳි ගොඩනඟන්නේ absolute URL ලෙස බැවින්,
// origin එක සසඳා තීරණය කරයි.
(function () {
  var t = window.__TAURI__;
  if (!t || !t.core || typeof t.core.invoke !== 'function') return; // බ්‍රවුසරයේ නම් කිසිවක් නොකරයි

  try { document.documentElement.classList.add('is-desktop-app'); } catch (e) {}

  function external(url) {
    if (!url) return false;
    if (/^mailto:/i.test(url)) return true;
    if (!/^https?:/i.test(url)) return false;          // relative / hash / javascript: → ඇප් එක ඇතුළේ
    try {
      return new URL(url, location.href).origin !== location.origin;
    } catch (e) {
      return false;
    }
  }

  function open(href) {
    t.core.invoke('open_url', { url: href }).catch(function () {});
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var raw = a.getAttribute('href');
    if (/^(#|javascript:)/i.test(raw || '')) return;
    var abs = a.href;                                   // resolved absolute URL
    if (!external(abs)) return;                         // ඇප් එක ඇතුළේ නම් සාමාන්‍ය ලෙසම යයි
    e.preventDefault();
    open(abs);
  }, true);

  var nativeOpen = window.open;
  window.open = function (url) {
    var abs = url;
    try { abs = new URL(url, location.href).href; } catch (e) {}
    if (external(abs)) { open(abs); return null; }
    if (nativeOpen) { try { return nativeOpen.apply(window, arguments); } catch (e) {} }
    if (abs) location.href = abs;                       // ඇප් එක ඇතුළේ නම් එම පිටුවටම යයි
    return null;
  };
})();
