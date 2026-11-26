/* ============================================================
   yt-embed.js — YouTube වීඩියෝ click-to-play facade
   • පිටුව load වන විට YouTube player එක load නොවේ (ඇප් එක ඉක්මන් වේ).
   • පරිශීලකයා thumbnail එක ඔබූ විට පමණක් iframe එක ඇතුළත් වේ.
   • JavaScript නැති විට / offline විට: <noscript> තුළ ඇති සබැඳියෙන් YouTube වෙත යා හැක.
   ============================================================ */
(function () {
  'use strict';

  function play(btn) {
    var id = btn.getAttribute('data-yt');
    if (!id || btn.dataset.loaded === '1') return;
    btn.dataset.loaded = '1';

    var frame = document.createElement('iframe');
    frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) +
                '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
    frame.title = btn.getAttribute('data-title') || 'YouTube වීඩියෝව';
    frame.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    frame.setAttribute('allowfullscreen', '');
    frame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    frame.loading = 'eager';

    btn.innerHTML = '';
    btn.appendChild(frame);

    /* මුල් පිටුවේ කුඩා card එක: player එක සම්පූර්ණ පළලට විහිදීම */
    var card = btn.closest ? btn.closest('.vg-home') : null;
    if (card) card.classList.add('is-playing');
  }

  function init(root) {
    var list = (root || document).querySelectorAll('.ytf[data-yt]');
    for (var i = 0; i < list.length; i++) {
      (function (btn) {
        if (btn.dataset.bound === '1') return;
        btn.dataset.bound = '1';

        /* thumbnail එක load නොවුණොත් (offline ආදී විට) රාමුව හිස්ව තබන්න */
        var img = btn.querySelector('.ytf__img');
        if (img) img.addEventListener('error', function () { img.style.display = 'none'; });

        btn.addEventListener('click', function () { play(btn); });
      })(list[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(); });
  } else {
    init();
  }

  window.MX_YT = { init: init };
})();
