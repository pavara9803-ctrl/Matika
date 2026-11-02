/* ============================================================
   home-tree.js — මුල් පිටුවේ පමණි (index.html)
   Home බොත්තමෙන් විවෘත වන "අන්තර්ගත රුක" (tree) :
   මාතිකා → තික 22 / දුක 13 / සුත්තන්ත / සබ්බත්තික, සතර පරමාර්ථ → 4
   • අන්තර්ගත පාඨ වෙනස් නොකරයි — සංචාලනයට පමණි
   • පිටත ටච් කිරීමෙන් හෝ Esc මගින් වැසේ
   ============================================================ */
(function () {
  'use strict';

  function panel() { return document.getElementById('home-tree'); }
  function btn() { return document.getElementById('home-tree-btn'); }

  function closeSideMenu() {
    var m = document.getElementById('custom-menu');
    if (m) m.classList.add('hidden');
  }

  window.openHomeTree = function () {
    var p = panel(), b = btn();
    if (!p) return;
    closeSideMenu();
    p.hidden = false;
    if (b) b.setAttribute('aria-expanded', 'true');
  };

  window.closeHomeTree = function () {
    var p = panel(), b = btn();
    if (!p) return;
    p.hidden = true;
    if (b) b.setAttribute('aria-expanded', 'false');
  };

  window.toggleHomeTree = function () {
    var p = panel();
    if (!p) return;
    if (p.hidden) window.openHomeTree(); else window.closeHomeTree();
  };

  /* පිටත ටච් කළ විට වසන්න */
  document.addEventListener('click', function (e) {
    var p = panel();
    if (!p || p.hidden) return;
    if (p.contains(e.target)) return;
    if (e.target.closest && e.target.closest('#home-tree-btn')) return;
    window.closeHomeTree();
  });

  /* Esc යතුරෙන් වසා, focus එක බොත්තමට නැවත දෙන්න */
  document.addEventListener('keydown', function (e) {
    var p = panel();
    if (e.key === 'Escape' && p && !p.hidden) {
      window.closeHomeTree();
      var b = btn();
      if (b) b.focus();
    }
  });

  /* තවත් මෙනුව (☰) විවෘත කළ විට රුක වසන්න */
  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('button[onclick="toggleMenu()"]')) window.closeHomeTree();
  }, true);
})();
