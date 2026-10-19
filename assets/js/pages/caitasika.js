// ============================================================
// caitasika.js
// චෛතසික හා සම්ප්‍රයෝග සංග්‍රහනය
// අභිධර්ම මාතිකා අධ්‍යයන යෙදුම
// Version: 2.1.0 (Dynamic Font Scaler & Conflict-free)
// ============================================================

// ============================================================
// 1. FONT SIZE CONTROLLER (අකුරු විශාල / කුඩා කිරීමේ සක්‍රීය පාලකය)
// ============================================================
var currentFontScale = 100;
var defaultFontScale = 100;
var minFontScale = 85;
var maxFontScale = 160;
var fontStep = 10; // එක් ක්ලික් එකකට 10% ක පැහැදිලි වෙනසක්

function updateFontSizeUI() {
  // Tailwind rem මිනුම් සියල්ල root font-size එක මත පදනම් වන බැවින්
  // html element එකේ font-size ප්‍රතිශතය වෙනස් කිරීමෙන් සියලු අකුරු ක්ෂණිකව පරිමාණය වේ
  document.documentElement.style.fontSize = currentFontScale + '%';

  var display = document.getElementById('font-size-display');
  if (display) {
    display.textContent = currentFontScale + '%';
  }
}

function changeFontSize(direction) {
  var newScale = currentFontScale + (direction * fontStep);
  if (newScale >= minFontScale && newScale <= maxFontScale) {
    currentFontScale = newScale;
    localStorage.setItem('caitasika_font_scale', currentFontScale);
    updateFontSizeUI();
  }
}

function resetFontSize() {
  currentFontScale = defaultFontScale;
  localStorage.setItem('caitasika_font_scale', currentFontScale);
  updateFontSizeUI();
}

// පිටුව පූරණය වන විට සුරකින ලද අකුරු ප්‍රමාණය ක්‍රියාත්මක කිරීම
(function initFontSize() {
  var savedScale = localStorage.getItem('caitasika_font_scale');
  if (savedScale) {
    currentFontScale = parseInt(savedScale, 10);
  }
  updateFontSizeUI();
})();

window.changeFontSize = changeFontSize;
window.resetFontSize = resetFontSize;

// ============================================================
// 2. DARK MODE TOGGLE - caitasika.html සඳහා
// ============================================================
function caitasikaToggleDarkMode() {
  var html = document.documentElement;
  var icon = document.getElementById('theme-toggle-icon');
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('abhidhamma_theme', 'light');
    localStorage.setItem('theme', 'light');
    if (icon) icon.className = 'fa-solid fa-moon text-base sm:text-lg';
  } else {
    html.classList.add('dark');
    localStorage.setItem('abhidhamma_theme', 'dark');
    localStorage.setItem('theme', 'dark');
    if (icon) icon.className = 'fa-solid fa-sun text-base sm:text-lg';
  }
}

if (typeof window.toggleDarkMode === 'undefined') {
  window.toggleDarkMode = caitasikaToggleDarkMode;
}
window.caitasikaToggleDarkMode = caitasikaToggleDarkMode;

(function initCaitasikaTheme() {
  var savedTheme = localStorage.getItem('abhidhamma_theme') || localStorage.getItem('theme');
  if (savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    var icon = document.getElementById('theme-toggle-icon');
    if (icon) icon.className = 'fa-solid fa-sun text-base sm:text-lg';
  }
})();

// ============================================================
// 3. DATA → data/paramattha/caitasika-data.js
//    (sabbacittaData, pakirnakaData2, akusalaData2, sobhanaData, quickSamprayogaData ...)
// ============================================================

// ============================================================
// 8. RENDER FUNCTIONS
// ============================================================
function renderSabbacittaCards() {
  var container = document.getElementById('sabbacitta-cards');
  if (!container) return;
  container.innerHTML = '';
  
  sabbacittaData.forEach(function(item) {
    var div = document.createElement('div');
    div.className = 'cetasika-card sabbacitta';
    div.innerHTML =
      '<div class="flex items-start gap-3">' +
        '<span class="num-pill shrink-0" style="width:2rem;height:2rem;font-size:0.85rem;background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white;">' + item.num + '</span>' +
        '<div class="flex-1">' +
          '<h4 class="font-bold text-sm text-maroon-900 dark:text-saffron-200">' + item.name + '</h4>' +
          '<div class="text-[10px] text-purple-700 dark:text-purple-300 italic mb-1">' + item.pali + '</div>' +
          '<p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">' + item.lakshana + '</p>' +
        '</div>' +
      '</div>';
    container.appendChild(div);
  });
}

function renderSabbacittaTable() {
  var tbody = document.getElementById('sabbacitta-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  
  sabbacittaData.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td class="num-col font-bold text-center">' + item.num + '</td>' +
      '<td>' +
        '<div class="font-bold">' + item.name + '</div>' +
        '<div style="font-size:0.75em;color:#8b5cf6;font-style:italic;">' + item.pali + '</div>' +
        '<div style="font-size:0.75em;line-height:1.6;margin-top:0.4rem;color:#666;" class="dark:text-slate-400">' + item.desc + '</div>' +
      '</td>' +
      '<td style="font-size:0.8em;line-height:1.6;">' + item.lakshana + '</td>' +
      '<td class="count-col highlight font-bold text-center">' + item.yedena + '</td>';
    tbody.appendChild(tr);
  });
}

function renderPakirnakaCards() {
  var container = document.getElementById('pakirnaka-cetasika-cards');
  if (!container) return;
  container.innerHTML = '';
  
  pakirnakaData2.forEach(function(item) {
    var div = document.createElement('div');
    div.className = 'cetasika-card pakirnaka';
    div.innerHTML =
      '<div class="flex items-start gap-3">' +
        '<span class="num-pill shrink-0" style="width:2rem;height:2rem;font-size:0.85rem;background: linear-gradient(135deg, #6366f1, #4f46e5); color: white;">' + item.num + '</span>' +
        '<div class="flex-1">' +
          '<h4 class="font-bold text-sm text-maroon-900 dark:text-saffron-200">' + item.name + '</h4>' +
          '<div class="text-[10px] text-indigo-700 dark:text-indigo-300 italic mb-1">' + item.pali + '</div>' +
          '<p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">' + item.lakshana + '</p>' +
          '<details class="cet-more"><summary>විස්තරය</summary><p>' + item.desc + '</p></details>' +
        '</div>' +
      '</div>';
    container.appendChild(div);
  });
}

function renderAkusalaCards() {
  var container = document.getElementById('akusala-cetasika-cards');
  if (!container) return;
  container.innerHTML = '';
  
  akusalaData2.forEach(function(item) {
    var div = document.createElement('div');
    div.className = 'cetasika-card akusala';
    div.innerHTML =
      '<div class="flex items-start gap-3">' +
        '<span class="num-pill shrink-0" style="width:2rem;height:2rem;font-size:0.85rem;background: linear-gradient(135deg, #ef4444, #dc2626); color: white;">' + item.num + '</span>' +
        '<div class="flex-1">' +
          '<h4 class="font-bold text-sm text-maroon-900 dark:text-saffron-200">' + item.name + '</h4>' +
          '<div class="text-[10px] text-red-700 dark:text-red-300 italic mb-1">' + item.pali + '</div>' +
          '<p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">' + item.lakshana + '</p>' +
        '</div>' +
      '</div>';
    container.appendChild(div);
  });
}

function renderAkusalaCetasikaDetail() {
  var tbody = document.getElementById('akusala-cetasika-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  
  akusalaData2.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td class="num-col font-bold text-center">' + item.num + '</td>' +
      '<td>' +
        '<div class="font-bold">' + item.name + '</div>' +
        '<div style="font-size:0.75em;color:#ef4444;font-style:italic;">' + item.pali + '</div>' +
        '<div style="font-size:0.75em;line-height:1.6;margin-top:0.4rem;color:#666;" class="dark:text-slate-400">' + item.desc + '</div>' +
      '</td>' +
      '<td style="font-size:0.8em;line-height:1.6;">' + item.lakshana + '</td>' +
      '<td style="font-size:0.8em;font-weight:600;color:#dc2626;text-align:center;">' + item.yedena + '</td>';
    tbody.appendChild(tr);
  });
}

function renderSobhanaTable() {
  var tbody = document.getElementById('sobhana-cetasika-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  
  sobhanaData.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td class="num-col font-bold text-center">' + item.num + '</td>' +
      '<td>' +
        '<div class="font-bold">' + item.name + '</div>' +
        '<div style="font-size:0.75em;color:#10b981;font-style:italic;">' + item.pali + '</div>' +
        '<div style="font-size:0.75em;line-height:1.6;margin-top:0.4rem;color:#666;" class="dark:text-slate-400">' + item.desc + '</div>' +
      '</td>' +
      '<td style="font-size:0.8em;line-height:1.6;">' + item.lakshana + '</td>' +
      '<td style="font-size:0.8em;font-weight:600;color:#059669;text-align:center;">' + item.yedena + '</td>';
    tbody.appendChild(tr);
  });
}


// ============================================================
// 8a. ලක්ඛණ - රස - පච්චුපට්ඨාන - පදට්ඨාන (caitasika.lr.html)
//     දත්ත: CAITASIKA_LR_DATA (data/paramattha/caitasika-data.js)
// ============================================================
function renderLRSection() {
  var box = document.getElementById('caitasika-lr-section');
  if (!box || typeof CAITASIKA_LR_DATA === 'undefined') return;
  var D = CAITASIKA_LR_DATA;
  var esc = function (s) { return String(s == null ? '' : s); };
  var field = function (label, f) {
    if (!f) return '';
    return '<div class="lr-f"><div class="lr-k">' + label + '</div><div class="lr-v">' + esc(f.sinhala) +
      (f.pali ? '<div class="lr-p pali-text">' + esc(f.pali) + '</div>' : '') + '</div></div>';
  };
  var h = '<div class="section-title"><i class="fa-solid fa-scale-balanced"></i><span>' + esc(D.title) + '</span></div>';
  if (D.intro) {
    h += '<div class="info-card"><p class="text-sm leading-relaxed text-justify">' + esc(D.intro.description) + '</p>' +
      (D.intro.note ? '<p class="text-xs mt-2 text-justify">' + esc(D.intro.note) + '</p>' : '') + '</div>';
  }
  (D.categories || []).forEach(function (cat, ci) {
    h += '<details class="lr-cat"' + (ci === 0 ? ' open' : '') + '><summary><span>' + esc(cat.categoryName) + '</span><span class="lr-n">' + (cat.items || []).length + '</span></summary><div class="lr-items">';
    (cat.items || []).forEach(function (it) {
      h += '<article class="lr-item"><h4><span class="lr-id">' + esc(it.id) + '</span> ' + esc(it.name) + '</h4>' +
        (it.pali_definition ? '<p class="lr-def pali-text">' + esc(it.pali_definition) + '</p>' : '') +
        field('ලක්ඛණ', it.lakkhana) + field('රස', it.rasa) + field('පච්චුපට්ඨාන', it.paccupatthana) + field('පදට්ඨාන', it.padatthana) +
        ((it.notes && it.notes.length) ? '<ul class="lr-notes">' + it.notes.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>' : '') +
        '</article>';
    });
    h += '</div></details>';
  });
  box.innerHTML = h;
}

// ============================================================
// 9. INITIALIZE APP
// ============================================================
function initCaitasikaApp() {
  console.log('[caitasika] Initializing...');
  renderSabbacittaCards();
  renderSabbacittaTable();
  renderPakirnakaCards();
  renderAkusalaCards();
  renderAkusalaCetasikaDetail();
  renderSobhanaTable();
  renderLRSection();
  console.log('[caitasika] Initialization complete');
}

if (typeof window._caitasikaInitialized === 'undefined') {
  window._caitasikaInitialized = true;
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCaitasikaApp);
  } else {
    initCaitasikaApp();
  }
}

console.log('[caitasika.js] Loaded successfully - font scaler ready');console.log('[caitasika.js] Loaded successfully - font scaler ready');

// ============================================================
// 10. TAB SWITCHING - caitasika.html සඳහා (switchMainTab)
// ============================================================
// ⚠️ මෙම ශ්‍රිතයේ window.scrollTo() නොමැත.
// එමගින් ටැබය මාරු වූ විට පිටුව ඉහළට යාම වළකී.
// ============================================================

var caitasikaMainTabs = [
  'intro', 'sabbacitta', 'pakirnaka-cetasika', 'akusala-cetasika', 'sobhana-cetasika',
  'samprayoga', 'sangrahana', 'sangraha-5', 'athara', 'citta-sangaha', 'mahaggata-lokuttara', 'lessons'
];

function switchMainTab(tabName) {
  caitasikaMainTabs.forEach(function(t) {
    var btn = document.getElementById('mtab-btn-' + t);
    var content = document.getElementById('mtab-content-' + t);
    
    if (!btn || !content) return;
    
    if (t === tabName) {
      btn.className = 'mtab-btn flex-1 min-w-[120px] px-3 py-3 text-xs font-bold whitespace-nowrap transition-colors border-b-2 border-saffron-600 text-saffron-700 dark:text-saffron-400 bg-saffron-500/10';
      content.classList.remove('hidden');
      content.classList.add('fade-in');
    } else {
      btn.className = 'mtab-btn flex-1 min-w-[120px] px-3 py-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 border-transparent text-amber-800 dark:text-slate-400 hover:bg-amber-50 dark:hover:bg-slate-700';
      content.classList.add('hidden');
      content.classList.remove('fade-in');
    }
  });
  
  // ❌ මෙතැන window.scrollTo() නොමැත!
}

// ✅ ගෝලීය වශයෙන් අපනයනය
window.switchMainTab = switchMainTab;

// ============================================================
// 11. ALIAS - switchTab (samprayoga.html සඳහා)
// ============================================================
if (typeof window.switchTab === 'undefined') {
  window.switchTab = switchMainTab;
}