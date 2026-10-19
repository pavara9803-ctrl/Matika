// ============================================================
// samprayoga.js
// සම්ප්‍රයෝග නය 16 හා සංග්‍රහනය 33 + පාඩම් 7-13
// samprayoga.html සහ caitasika.html දෙකටම ගැලපේ
// ============================================================

// ============================================================
// 1. DARK MODE TOGGLE
// ============================================================
function toggleDarkMode() {
  var html = document.documentElement;
  var icon = document.getElementById('theme-toggle-icon');
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('samprayoga_theme', 'light');
    localStorage.setItem('abhidhamma_theme', 'light');
    if (icon) icon.className = 'fa-solid fa-moon text-lg';
  } else {
    html.classList.add('dark');
    localStorage.setItem('samprayoga_theme', 'dark');
    localStorage.setItem('abhidhamma_theme', 'dark');
    if (icon) icon.className = 'fa-solid fa-sun text-lg';
  }
}

(function initTheme() {
  var savedTheme = localStorage.getItem('abhidhamma_theme') || localStorage.getItem('samprayoga_theme');
  if (savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    var icon = document.getElementById('theme-toggle-icon');
    if (icon) icon.className = 'fa-solid fa-sun text-lg';
  }
})();

// ============================================================
// 2. TAB SWITCHING - samprayoga.html සඳහා
// ============================================================
var samprayogaTabs = ['samprayoga', 'sangrahana', 'sangraha-5', 'athara',
                      'pakirnaka', 'akusala-cetasika', 'sobhana-cetasika',
                      'citta-sangaha', 'mahaggata-lokuttara'];

function switchTab(tabName) {
  samprayogaTabs.forEach(function(t) {
    var btn = document.getElementById('tab-btn-' + t);
    var content = document.getElementById('tab-content-' + t);
    
    if (!btn || !content) return;
    
    if (t === tabName) {
      btn.className = 'tab-btn flex-1 min-w-[130px] px-3 py-3 text-xs font-bold whitespace-nowrap transition-colors border-b-2 border-saffron-600 text-saffron-700 dark:text-saffron-400 bg-saffron-500/10';
      content.classList.remove('hidden');
      content.classList.add('fade-in');
    } else {
      btn.className = 'tab-btn flex-1 min-w-[130px] px-3 py-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 border-transparent text-amber-800 dark:text-slate-400 hover:bg-amber-50 dark:hover:bg-slate-700';
      content.classList.add('hidden');
      content.classList.remove('fade-in');
    }
  });
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// 3. TAB SWITCHING - caitasika.html සඳහා (Alias)
// ============================================================
function switchCaitasikaTab(tabName) {
  var caitasikaTabs = ['intro', 'sabbacitta', 'pakirnaka', 'akusala', 'sobhana', 'samprayoga'];
  
  caitasikaTabs.forEach(function(t) {
    var btn = document.getElementById('ctab-btn-' + t);
    var content = document.getElementById('ctab-content-' + t);
    
    if (!btn || !content) return;
    
    if (t === tabName) {
      btn.className = 'ctab-btn flex-1 min-w-[120px] px-3 py-3 text-xs font-bold whitespace-nowrap transition-colors border-b-2 border-saffron-600 text-saffron-700 dark:text-saffron-400 bg-saffron-500/10';
      content.classList.remove('hidden');
      content.classList.add('fade-in');
    } else {
      btn.className = 'ctab-btn flex-1 min-w-[120px] px-3 py-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 border-transparent text-amber-800 dark:text-slate-400 hover:bg-amber-50 dark:hover:bg-slate-700';
      content.classList.add('hidden');
      content.classList.remove('fade-in');
    }
  });
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// 4. ACCORDION TOGGLE
// ============================================================
function toggleAccordion(id) {
  var content = document.getElementById('accordion-' + id);
  var icon = document.getElementById('accordion-icon-' + id);
  
  if (!content || !icon) return;
  
  if (content.classList.contains('open')) {
    content.classList.remove('open');
    icon.style.transform = 'rotate(0deg)';
  } else {
    content.classList.add('open');
    icon.style.transform = 'rotate(180deg)';
  }
}

// ============================================================
// 5. SCROLL TO TOP
// ============================================================
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// 6-25. DATA → data/paramattha/caitasika-data.js
//    (samprayogaData, sangraha5Data, lokkuttaraData ... lokuttaraDetailData)
// ============================================================

// ============================================================
// 26. RENDER FUNCTIONS - samprayoga.html සඳහා
// ============================================================

function renderSamprayogaTable() {
  var tbody = document.getElementById('samprayoga-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  samprayogaData.forEach(function(item) {
    var tr = document.createElement('tr');
    if (item.group) {
      tr.className = 'group-row';
      tr.innerHTML = '<td colspan="5" style="font-weight:700;">' + item.group + '</td>';
    } else {
      tr.innerHTML =
        '<td class="num-col">' + item.num + '</td>' +
        '<td style="font-weight:600;">' + item.name + '</td>' +
        '<td style="font-size:0.75rem;line-height:1.6;">' + item.yedena + '</td>' +
        '<td class="count-col highlight">' + item.count + '</td>' +
        '<td style="font-size:0.75rem;line-height:1.6;">' + (item.desc || '') + '</td>';
    }
    tbody.appendChild(tr);
  });
}

function renderLokkuttaraTable() {
  var tbody = document.getElementById('lokkuttara-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  lokkuttaraData.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td><span class="font-bold text-saffron-700 dark:text-saffron-300">' + item.num + '.</span> ' + item.name + '</td>' +
      '<td style="font-size:0.7rem;line-height:1.5;">' + item.yojana + '</td>' +
      '<td style="text-align:center;font-weight:700;">' + item.vitakka + '</td>' +
      '<td style="text-align:center;font-weight:700;">' + item.vicara + '</td>' +
      '<td style="text-align:center;font-weight:700;">' + item.piti + '</td>' +
      '<td class="count-col highlight">' + item.total + '</td>';
    tbody.appendChild(tr);
  });
}

function renderMahaggataTable() {
  var tbody = document.getElementById('mahaggata-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  mahaggataData.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td><span class="font-bold text-saffron-700 dark:text-saffron-300">' + item.num + '.</span> ' + item.name + '</td>' +
      '<td style="font-size:0.7rem;line-height:1.5;">' + item.yojana + '</td>' +
      '<td style="text-align:center;font-weight:700;">' + item.vitakka + '</td>' +
      '<td style="text-align:center;font-weight:700;">' + item.vicara + '</td>' +
      '<td style="text-align:center;font-weight:700;">' + item.piti + '</td>' +
      '<td style="text-align:center;font-weight:700;">' + item.appamanna + '</td>' +
      '<td class="count-col highlight">' + item.total + '</td>';
    tbody.appendChild(tr);
  });
}

function renderKamasohanaTable() {
  var tbody = document.getElementById('kamasohana-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  var currentGroup = '';
  kamasohanaData.forEach(function(item) {
    if (item.name !== currentGroup) {
      currentGroup = item.name;
      var gr = document.createElement('tr');
      gr.className = 'group-row';
      gr.innerHTML = '<td></td><td style="font-weight:700;">' + item.name + '</td><td class="count-col" style="font-weight:700;">' + item.maxLabel + '</td>';
      tbody.appendChild(gr);
    }
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td class="num-col">' + item.num + '</td>' +
      '<td style="font-size:0.75rem;">' + item.sub + '</td>' +
      '<td class="count-col highlight">' + item.count + '</td>';
    tbody.appendChild(tr);
  });
}

function renderAkusalaTable() {
  var tbody = document.getElementById('akusala-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  akusalaData.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td><span class="font-bold text-saffron-700 dark:text-saffron-300">' + item.num + '.</span> ' + item.name + '</td>' +
      '<td class="count-col highlight">' + item.count + '</td>';
    tbody.appendChild(tr);
  });
}

function renderAhetukaTable() {
  var tbody = document.getElementById('ahetuka-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  ahetuka18Data.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td><span class="font-bold text-saffron-700 dark:text-saffron-300">' + item.num + '.</span> ' + item.name + '</td>' +
      '<td class="count-col highlight">' + item.count + '</td>';
    tbody.appendChild(tr);
  });
}

function renderSangraha5Table() {
  var tbody = document.getElementById('sangraha5-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  var sum = 0;
  sangraha5Data.forEach(function(item) {
    sum += item.count;
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td class="num-col">' + item.num + '</td>' +
      '<td style="font-weight:700;">' + item.name + '</td>' +
      '<td class="count-col">' + item.max + '</td>' +
      '<td class="count-col highlight">' + item.count + '</td>' +
      '<td style="font-size:0.75rem;line-height:1.6;">' + item.desc + '</td>';
    tbody.appendChild(tr);
  });
  var tf = document.createElement('tr');
  tf.className = 'group-row';
  tf.innerHTML = '<td></td><td style="font-weight:700;">එකතුව</td><td></td><td class="count-col highlight">' + sum + '</td><td></td>';
  tbody.appendChild(tf);
}

function renderAhetuka18Detail() {
  var tbody = document.getElementById('ahetuka18-detail-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  ahetuka18Detail.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td class="num-col">' + item.num + '</td>' +
      '<td style="font-size:0.75rem;">' + item.name + '</td>' +
      '<td style="text-align:center;font-weight:600;">' + item.sabbacitta + '</td>' +
      '<td style="text-align:center;font-weight:600;">' + item.vitakka + '</td>' +
      '<td style="text-align:center;font-weight:600;">' + item.viriya + '</td>' +
      '<td style="text-align:center;font-weight:600;">' + item.piti + '</td>' +
      '<td style="text-align:center;font-weight:600;">' + item.chanda + '</td>' +
      '<td class="count-col highlight">' + item.total + '</td>';
    tbody.appendChild(tr);
  });
  var cards = document.getElementById('ahetuka-naya-cards');
  if (cards && typeof ahetukaNayaData !== 'undefined') {
    cards.innerHTML = ahetukaNayaData.map(function(n) {
      return '<div class="info-card flex items-center gap-3">' +
        '<span class="num-pill shrink-0" style="width:2rem;height:2rem;font-size:0.85rem;">' + n.num + '</span>' +
        '<div><div class="text-xs font-bold">' + n.label + '</div>' +
        '<div class="text-lg font-bold text-saffron-700 dark:text-saffron-300">' + n.count + '</div></div></div>';
    }).join('');
  }
}

function renderKusala8Table() {
  var tbody = document.getElementById('kusala8-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  lobha8Data.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td style="font-weight:700;font-size:0.75rem;">' + item.num + '</td>' +
      '<td style="font-size:0.75rem;">' + item.name + '<div style="font-size:0.68rem;opacity:.75;margin-top:2px;">' + item.common + '</div></td>' +
      '<td style="text-align:center;font-weight:600;">' + item.piti + '</td>' +
      '<td style="text-align:center;font-weight:600;">' + item.ditthi + '</td>' +
      '<td style="text-align:center;font-weight:600;">' + item.mana + '</td>' +
      '<td style="text-align:center;font-weight:600;">' + item.thina + '</td>' +
      '<td class="count-col highlight">' + item.total + '</td>';
    tbody.appendChild(tr);
  });
}

function renderAkusala2Table() {
  var tbody = document.getElementById('akusala2-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  dosa2Data.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td style="font-weight:700;font-size:0.75rem;">' + item.num + '</td>' +
      '<td style="font-size:0.75rem;">' + item.name + '<div style="font-size:0.68rem;opacity:.75;margin-top:2px;">' + item.common + '</div></td>' +
      '<td style="text-align:center;font-weight:600;">' + item.thina + '</td>' +
      '<td class="count-col highlight">' + item.total + '</td>' +
      '<td style="font-size:0.7rem;line-height:1.5;">' + item.desc + '</td>';
    tbody.appendChild(tr);
  });
}

function renderAbyakata2Table() {
  var tbody = document.getElementById('abyakata2-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  moha2Data.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td style="font-weight:700;font-size:0.75rem;">' + item.num + '</td>' +
      '<td style="font-size:0.75rem;">' + item.name + '<div style="font-size:0.68rem;opacity:.75;margin-top:2px;">' + item.common + '</div></td>' +
      '<td style="text-align:center;font-weight:600;">' + item.adhimokkha + '</td>' +
      '<td style="text-align:center;font-weight:600;">' + item.vicikiccha + '</td>' +
      '<td class="count-col highlight">' + item.total + '</td>';
    tbody.appendChild(tr);
  });
}

function renderAkusalaSangraha7Table() {
  var tbody = document.getElementById('akusala-sangraha7-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  akusalaSangraha7Data.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td class="num-col">' + item.num + '</td>' +
      '<td style="font-weight:600;">' + item.name + '</td>' +
      '<td class="count-col highlight">' + item.count + '</td>';
    tbody.appendChild(tr);
  });
}

// ============================================================
// 27. RENDER FUNCTIONS - පාඩම් 7-13 සඳහා
// ============================================================

function renderPakirnakaTable() {
  var tbody = document.getElementById('pakirnaka-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  pakirnakaData.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td style="font-weight:700;">' + item.name + '</td>' +
      '<td class="count-col highlight">' + item.yedena + '</td>' +
      '<td style="text-align:center;font-weight:600;color:#ef4444;">' + item.noyedena + '</td>' +
      '<td style="font-size:0.75rem;line-height:1.5;">' + item.desc + '</td>';
    tbody.appendChild(tr);
  });
}

function renderAkusalaCetasikaTable() {
  var tbody = document.getElementById('akusala-sampayoga-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  akusalaCetasikaData.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td style="font-weight:700;">' + item.name + '</td>' +
      '<td style="font-size:0.75rem;">' + item.yedena + '</td>' +
      '<td style="font-size:0.75rem;line-height:1.5;">' + item.desc + '</td>';
    tbody.appendChild(tr);
  });
}

function renderSobhanaCetasikaTable() {
  var tbody = document.getElementById('sobhana-sampayoga-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  sobhanaCetasikaData.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td style="font-weight:700;">' + item.name + '</td>' +
      '<td style="font-size:0.75rem;text-align:center;">' + item.yedena + '</td>' +
      '<td style="font-size:0.75rem;line-height:1.5;">' + item.desc + '</td>';
    tbody.appendChild(tr);
  });
}

function renderAkusalaCittaTable() {
  var tbody = document.getElementById('akusala-citta-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  akusalaCittaData.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td class="num-col">' + item.num + '</td>' +
      '<td style="font-size:0.75rem;">' + item.name + '</td>' +
      '<td class="count-col highlight">' + item.count + '</td>';
    tbody.appendChild(tr);
  });
}

function renderAhetukaCittaTable() {
  var tbody = document.getElementById('ahetuka-citta-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  ahetukaCittaData.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td class="num-col">' + item.num + '</td>' +
      '<td style="font-size:0.75rem;">' + item.name + '</td>' +
      '<td class="count-col highlight">' + item.count + '</td>';
    tbody.appendChild(tr);
  });
}

function renderKamasohanaCittaTable() {
  var tbody = document.getElementById('kamasohana-citta-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  kamasohanaCittaData.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td class="num-col">' + item.num + '</td>' +
      '<td style="font-size:0.75rem;">' + item.name + '</td>' +
      '<td class="count-col highlight">' + item.count + '</td>';
    tbody.appendChild(tr);
  });
}

function renderRupavacaraTable() {
  var tbody = document.getElementById('rupavacara-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  rupavacaraData.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td style="font-weight:600;font-size:0.75rem;">' + item.name + '</td>' +
      '<td style="text-align:center;font-weight:700;">' + item.vitakka + '</td>' +
      '<td style="text-align:center;font-weight:700;">' + item.vicara + '</td>' +
      '<td style="text-align:center;font-weight:700;">' + item.piti + '</td>' +
      '<td style="text-align:center;font-weight:700;">' + item.appamanna + '</td>' +
      '<td style="text-align:center;font-weight:700;">' + item.virati + '</td>' +
      '<td class="count-col highlight">' + item.total + '</td>';
    tbody.appendChild(tr);
  });
}

function renderLokuttaraDetailTable() {
  var tbody = document.getElementById('lokuttara-detail-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  lokuttaraDetailData.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td style="font-weight:600;font-size:0.75rem;">' + item.name + '</td>' +
      '<td style="text-align:center;font-weight:700;">' + item.vitakka + '</td>' +
      '<td style="text-align:center;font-weight:700;">' + item.vicara + '</td>' +
      '<td style="text-align:center;font-weight:700;">' + item.piti + '</td>' +
      '<td class="count-col highlight">' + item.total + '</td>';
    tbody.appendChild(tr);
  });
}

function renderQuickSamprayogaTable() {
  var tbody = document.getElementById('quick-samprayoga-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  quickSamprayogaData.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td style="font-weight:700;">' + item.rashi + '</td>' +
      '<td class="count-col highlight">' + item.count + '</td>' +
      '<td style="font-size:0.75rem;line-height:1.5;">' + item.desc + '</td>';
    tbody.appendChild(tr);
  });
}

function renderNiyataCards() {
  var box = document.getElementById('niyata-aniyata-cards');
  if (!box || typeof niyataAniyataData === 'undefined') return;
  box.innerHTML = niyataAniyataData.map(function(n) {
    return '<div class="' + (n.key === 'niyata' || n.key === 'aniyata' ? 'highlight-card' : 'info-card') + '">' +
      '<div class="flex items-center gap-2 mb-2"><span class="badge ' + (n.key === 'niyata' ? 'badge-green' : (n.key === 'aniyata' ? 'badge-red' : '')) + '">' + n.badge + '</span>' +
      '<span class="text-xs font-bold">' + n.title + '</span></div>' +
      '<p class="text-xs text-justify leading-relaxed">' + n.desc + '</p></div>';
  }).join('');
}

function renderLessons() {
  var box = document.getElementById('caitasika-lessons');
  if (!box || typeof CAITASIKA_LESSONS === 'undefined') return;
  box.innerHTML = CAITASIKA_LESSONS.map(function(l, i) {
    return '<details class="les"' + (i === 0 ? ' open' : '') + '><summary><span class="les-n">' + l.n + '</span><span class="les-t">' + l.title + '</span></summary>' +
      '<div class="les-body rd-full">' + l.html + '</div></details>';
  }).join('');
}

// ============================================================
// 28. INITIALIZE APP
// ============================================================
function initSamprayogaApp() {
  console.log('[samprayoga] Initializing...');
  
  // samprayoga.html tables
  renderSamprayogaTable();
  renderLokkuttaraTable();
  renderMahaggataTable();
  renderKamasohanaTable();
  renderAkusalaTable();
  renderAhetukaTable();
  renderSangraha5Table();
  renderAhetuka18Detail();
  renderKusala8Table();
  renderAkusala2Table();
  renderAbyakata2Table();
  renderAkusalaSangraha7Table();
  
  // පාඩම් 7-13 tables
  renderPakirnakaTable();
  renderAkusalaCetasikaTable();
  renderSobhanaCetasikaTable();
  renderAkusalaCittaTable();
  renderAhetukaCittaTable();
  renderKamasohanaCittaTable();
  renderRupavacaraTable();
  renderLokuttaraDetailTable();
  
  // caitasika.html
  renderQuickSamprayogaTable();
  renderNiyataCards();
  renderLessons();
  
  // පළමු accordion එක විවෘත කරන්න
  setTimeout(function() {
    var firstAccordion = document.getElementById('accordion-lokkuttara');
    var firstIcon = document.getElementById('accordion-icon-lokkuttara');
    if (firstAccordion && firstIcon) {
      firstAccordion.classList.add('open');
      firstIcon.style.transform = 'rotate(180deg)';
    }
  }, 300);
  
  console.log('[samprayoga] Initialization complete');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSamprayogaApp);
} else {
  initSamprayogaApp();
}

// ============================================================
// 29. GLOBAL EXPORTS
// ============================================================
window.toggleDarkMode = toggleDarkMode;
window.switchTab = switchTab;
window.switchCaitasikaTab = switchCaitasikaTab;
window.toggleAccordion = toggleAccordion;
window.scrollToTop = scrollToTop;

console.log('[samprayoga.js] Loaded successfully - ready for samprayoga.html and caitasika.html');// ============================================================
// 30. TAB SWITCHING - caitasika.html සඳහා (switchMainTab)
// ============================================================
// ⚠️ window.scrollTo() ඉවත් කර ඇත.
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

window.switchMainTab = switchMainTab;

// ============================================================
// 31. ALIAS - switchTab සහ switchCaitasikaTab
// ============================================================
if (typeof window.switchTab === 'undefined') {
  window.switchTab = switchMainTab;
}
if (typeof window.switchCaitasikaTab === 'undefined') {
  window.switchCaitasikaTab = switchMainTab;
}