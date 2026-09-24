// ============================================================
// දුක මාතිකා App Logic
// ============================================================

var dukaGochhakaData = [
  gochhaka01Hetu,
  gochhaka02Cullantara,
  gochhaka03Asava,
  gochhaka04Samyojana,
  gochhaka05Gantha,
  gochhaka06Ogha,
  gochhaka07Yoga,
  gochhaka08Nivarana,
  gochhaka09Paramasa,
  gochhaka10Mahantara,
  gochhaka11Upadana,
  gochhaka12Kilesa,
  gochhaka13Pitthi
];

var dukaState = {
  currentGochhaka: null,
  currentDukaPair: null,
  currentPada: null,
  currentPadaIndex: 0,
  activeTab: 'skandha',
  bookmarks: JSON.parse(localStorage.getItem('duka_bookmarks') || '[]')
};

// ============================================================
// දත්ත ව්‍යුහය ලබා ගැනීමේ helper
// ============================================================
function getGochhakaPadas(gochhaka) {
  if (!gochhaka) return [];
  if (gochhaka.padas && Array.isArray(gochhaka.padas)) return gochhaka.padas;
  if (gochhaka.dukas && Array.isArray(gochhaka.dukas)) {
    var allPadas = [];
    gochhaka.dukas.forEach(function(duka) {
      if (duka && duka.padas && Array.isArray(duka.padas)) {
        duka.padas.forEach(function(pada) { allPadas.push(pada); });
      }
    });
    return allPadas;
  }
  return [];
}

// ✅ දුක් ලැයිස්තුව ලබා ගැනීම
function getGochhakaDukas(gochhaka) {
  if (!gochhaka) return [];

  // 'dukas' array එක තිබේ නම් (13 වන ගොච්ඡකය) - එයම return කරන්න
  if (gochhaka.dukas && Array.isArray(gochhaka.dukas) && gochhaka.dukas.length > 0) {
    return gochhaka.dukas;
  }

  // 'padas' array එක තිබේ නම් (01-12) - පද 2 බැගින් දුකයක් සාදන්න
  if (gochhaka.padas && Array.isArray(gochhaka.padas) && gochhaka.padas.length > 0) {
    var dukas = [];
    var dukaNumber = 1;
    for (var i = 0; i < gochhaka.padas.length; i += 2) {
      var pada1 = gochhaka.padas[i];
      var pada2 = gochhaka.padas[i + 1] || null;
      dukas.push({
        number: dukaNumber,
        name: 'දුක මාතිකා ' + dukaNumber,
        pali: pada1.name + (pada2 ? ' - ' + pada2.name : ''),
        padas: pada2 ? [pada1, pada2] : [pada1]
      });
      dukaNumber++;
    }
    return dukas;
  }

  return [];
}

// ============================================================
// INIT
// ============================================================
function initDukaApp() {
  console.log('[Duka App] Initializing...');
  console.log('[Duka App] Total gochhakas:', dukaGochhakaData.length);

  dukaGochhakaData.forEach(function(g, i) {
    if (g) {
      var dukas = getGochhakaDukas(g);
      console.log('[Duka App] ' + (i + 1) + '. ' + g.title + ' → ' + dukas.length + ' dukas');
    }
  });

  renderGochhakaList();
  updateDukaBookmarkBadge();
}

// ============================================================
// දර්ශන මාරු කිරීමේ helper
// ============================================================
function showDukaView(viewId) {
  ['duka-view-list', 'duka-view-duka-list', 'duka-view-pada-pair', 'duka-view-pada-detail', 'duka-view-bookmarks'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) {
      if (id === viewId) el.classList.remove('hidden');
      else el.classList.add('hidden');
    }
  });
}

// ============================================================
// 1. ගොච්ඡක ලැයිස්තුව render කිරීම
// ============================================================
function renderGochhakaList() {
  var container = document.getElementById('gochhaka-list');
  if (!container) return;

  container.innerHTML = '';

  dukaGochhakaData.forEach(function(gochhaka) {
    if (!gochhaka) return;

    var dukas = getGochhakaDukas(gochhaka);

    var card = document.createElement('div');
    card.className = 'bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer transition-all fade-in';
    card.onclick = function() { openGochhaka(gochhaka.id); };

    var dukasHtml = '';
    if (dukas.length > 0) {
      dukasHtml = dukas.slice(0, 3).map(function(d) {
        return '<span class="inline-block bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-700 text-amber-900 dark:text-saffron-300 text-[10px] px-2 py-0.5 rounded mr-1 mb-1">' + (d.name || '') + '</span>';
      }).join('');
      if (dukas.length > 3) {
        dukasHtml += '<span class="inline-block text-amber-600 text-[10px] px-2 py-0.5">+' + (dukas.length - 3) + ' more</span>';
      }
    }

    card.innerHTML =
      '<div class="flex items-center justify-between mb-2">' +
        '<div class="flex items-center gap-2">' +
          '<span class="w-8 h-8 rounded-full bg-saffron-500 text-maroon-950 font-bold text-sm flex items-center justify-center">' + gochhaka.id + '</span>' +
          '<h3 class="font-bold text-base text-maroon-900 dark:text-saffron-200">' + gochhaka.title + '</h3>' +
        '</div>' +
        '<span class="text-xs bg-saffron-500/20 text-saffron-600 font-bold px-2 py-1 rounded-full">දුක ' + dukas.length + '</span>' +
      '</div>' +
      '<div class="flex flex-wrap mt-2">' + dukasHtml + '</div>' +
      '<div class="text-right mt-2"><i class="fa-solid fa-chevron-right text-slate-400"></i></div>';

    container.appendChild(card);
  });
}

// ============================================================
// 2. ගොච්ඡකයක් click → දුක ලැයිස්තුව
// ============================================================
function openGochhaka(gochhakaId) {
  var gochhaka = dukaGochhakaData.find(function(g) { return g.id === gochhakaId; });
  if (!gochhaka) return;

  dukaState.currentGochhaka = gochhaka;

  showDukaView('duka-view-duka-list');

  var dukas = getGochhakaDukas(gochhaka);

  document.getElementById('duka-list-title').innerText = gochhaka.title;
  document.getElementById('duka-list-subtitle').innerText = 'මෙම ගොච්ඡකයේ දුක මාතිකා ' + dukas.length + ' ක් ඇත';

  renderDukaList(gochhaka);

  if (typeof updateBreadcrumbDuka === 'function') updateBreadcrumbDuka('duka-list');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// දුක ලැයිස්තුව render කිරීම
// ============================================================
function renderDukaList(gochhaka) {
  var container = document.getElementById('duka-list-container');
  if (!container) return;

  container.innerHTML = '';

  var dukas = getGochhakaDukas(gochhaka);

  dukas.forEach(function(duka, index) {
    if (!duka) return;

    var dukaNumber = duka.number || (index + 1);
    var dukaName = duka.name || ('දුක මාතිකා ' + dukaNumber);
    var dukaPali = duka.pali || '';
    var padas = duka.padas || [];

    var pada1 = padas[0] || null;
    var pada2 = padas[1] || null;

    var card = document.createElement('div');
    card.className = 'bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer transition-all fade-in';

    (function(padaIdx1, padaIdx2, dukaNum) {
      card.onclick = function() { 
        var allPadas = getGochhakaPadas(gochhaka);
        var idx1 = allPadas.indexOf(pada1);
        var idx2 = pada2 ? allPadas.indexOf(pada2) : -1;
        openDukaPair(dukaNum, idx1, idx2, dukaName, dukaPali); 
      };
    })(0, 1, dukaNumber);

    card.innerHTML =
      '<div class="flex items-center justify-between mb-3">' +
        '<div class="flex items-center gap-2 flex-1 min-w-0">' +
          '<span class="w-9 h-9 rounded-full bg-saffron-500 text-maroon-950 font-bold text-sm flex items-center justify-center shrink-0">' + dukaNumber + '</span>' +
          '<div class="flex-1 min-w-0">' +
            '<h3 class="font-bold text-sm text-maroon-900 dark:text-saffron-200">' + dukaName + '</h3>' +
            (dukaPali ? '<p class="text-[10px] text-amber-700 dark:text-saffron-400 truncate">' + dukaPali + '</p>' : '') +
          '</div>' +
        '</div>' +
        '<i class="fa-solid fa-chevron-right text-slate-400 shrink-0"></i>' +
      '</div>' +
      '<div class="grid grid-cols-1 sm:grid-cols-2 gap-2">' +
        (pada1 ?
          '<div class="bg-gradient-to-br from-saffron-500/10 to-saffron-500/5 border border-saffron-500/30 rounded-lg p-3">' +
            '<div class="text-[10px] font-bold text-saffron-600 dark:text-saffron-400 uppercase mb-1">පදය 1</div>' +
            '<div class="text-sm font-bold text-maroon-900 dark:text-saffron-200 mb-1">' + pada1.name + '</div>' +
            '<div class="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">' + (pada1.desc || '') + '</div>' +
          '</div>' : '') +
        (pada2 ?
          '<div class="bg-gradient-to-br from-saffron-500/10 to-saffron-500/5 border border-saffron-500/30 rounded-lg p-3">' +
            '<div class="text-[10px] font-bold text-saffron-600 dark:text-saffron-400 uppercase mb-1">පදය 2</div>' +
            '<div class="text-sm font-bold text-maroon-900 dark:text-saffron-200 mb-1">' + pada2.name + '</div>' +
            '<div class="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">' + (pada2.desc || '') + '</div>' +
          '</div>' : '') +
      '</div>' +
      '<div class="text-center mt-3 text-[10px] text-slate-400"><i class="fa-solid fa-hand-pointer"></i> පද දෙක බැලීමට click කරන්න</div>';

    container.appendChild(card);
  });
}

// ============================================================
// 3. දුකයක් click → පද දෙක
// ============================================================
function openDukaPair(dukaNumber, padaIndex1, padaIndex2, dukaName, dukaPali) {
  var gochhaka = dukaState.currentGochhaka;
  if (!gochhaka) return;

  var allPadas = getGochhakaPadas(gochhaka);
  var pada1 = allPadas[padaIndex1];
  var pada2 = (padaIndex2 >= 0 && padaIndex2 < allPadas.length) ? allPadas[padaIndex2] : null;

  dukaState.currentDukaPair = {
    number: dukaNumber,
    name: dukaName || ('දුක මාතිකා ' + dukaNumber),
    pali: dukaPali || '',
    pada1: pada1,
    pada2: pada2,
    padaIndex1: padaIndex1,
    padaIndex2: padaIndex2
  };

  showDukaView('duka-view-pada-pair');

  document.getElementById('duka-pair-title').innerText = dukaState.currentDukaPair.name;
  document.getElementById('duka-pair-subtitle').innerText = dukaState.currentDukaPair.pali || (gochhaka.title + ' → දුක මාතිකා ' + dukaNumber);

  renderDukaPair(pada1, pada2);

  if (typeof updateBreadcrumbDuka === 'function') updateBreadcrumbDuka('pada-pair');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderDukaPair(pada1, pada2) {
  var container = document.getElementById('duka-pair-container');
  if (!container) return;
  container.innerHTML = '';

  if (pada1) container.appendChild(createPadaPairCard(pada1, 1, dukaState.currentDukaPair.padaIndex1));
  if (pada2) container.appendChild(createPadaPairCard(pada2, 2, dukaState.currentDukaPair.padaIndex2));
}

function createPadaPairCard(pada, number, padaIndex) {
  var card = document.createElement('div');
  card.className = 'bg-gradient-to-br from-saffron-500/10 to-amber-100/30 dark:from-slate-800 dark:to-slate-800/50 border-2 border-saffron-500/40 rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer transition-all fade-in';
  card.onclick = function() { openPadaDetail(padaIndex); };

  card.innerHTML =
    '<div class="flex items-center justify-between mb-3">' +
      '<div class="flex items-center gap-2">' +
        '<span class="w-9 h-9 rounded-full bg-saffron-500 text-maroon-950 font-bold text-sm flex items-center justify-center shrink-0">' + number + '</span>' +
        '<h3 class="font-bold text-base text-maroon-900 dark:text-saffron-200">' + pada.name + '</h3>' +
      '</div>' +
      '<i class="fa-solid fa-chevron-right text-saffron-500"></i>' +
    '</div>' +
    '<p class="text-xs text-slate-600 dark:text-slate-300 mb-3">' + (pada.desc || '') + '</p>' +
    '<div class="text-[10px] text-saffron-600 dark:text-saffron-400 font-bold"><i class="fa-solid fa-hand-pointer"></i> ස්වරූපාර්ථ + ස්කන්ධ/ආයතන/ධාතු/සත්‍ය බැලීමට click කරන්න</div>';

  return card;
}

// ============================================================
// 4. පදයක් click → ස්වරූපාර්ථ + බෙදීම්
// ============================================================
function openPadaDetail(padaIndex) {
  var gochhaka = dukaState.currentGochhaka;
  if (!gochhaka) return;

  var padas = getGochhakaPadas(gochhaka);
  var pada = padas[padaIndex];
  if (!pada) return;

  dukaState.currentPada = pada;
  dukaState.currentPadaIndex = padaIndex;

  showDukaView('duka-view-pada-detail');

  document.getElementById('duka-pada-name').innerText = pada.name;
  document.getElementById('duka-pada-desc').innerText = pada.desc || '';
  document.getElementById('duka-pada-svartha').innerText = pada.svartha || 'ස්වරූපාර්ථය ඇතුළත් කර නැත.';

  updateDukaBookmarkButton();
  renderDukaBreakdowns(pada);
  switchDukaTab('skandha');

  if (typeof updateBreadcrumbDuka === 'function') updateBreadcrumbDuka('pada-detail');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderDukaBreakdowns(pada) {
  renderBreakdown('duka-skandha-list', pada.skandha, 'duka-skandha-count');
  renderBreakdown('duka-ayatana-list', pada.ayatana, 'duka-ayatana-count');
  renderBreakdown('duka-dhatu-list', pada.dhatu, 'duka-dhatu-count');
  renderBreakdown('duka-sathya-list', pada.sathya, 'duka-sathya-count');
}

function renderBreakdown(listId, items, countId) {
  var list = document.getElementById(listId);
  if (!list) return;
  list.innerHTML = '';

  if (!items || items.length === 0) {
    list.innerHTML = '<div class="text-center py-4 text-slate-400 text-xs">දත්ත නොමැත</div>';
    if (countId) {
      var countEl = document.getElementById(countId);
      if (countEl) countEl.innerText = '0';
    }
    return;
  }

  items.forEach(function(item) {
    var div = document.createElement('div');
    div.className = 'breakdown-item';
    div.innerHTML = '<span class="num">' + item.num + '.</span><span class="name">' + item.name + '</span><span class="value">' + item.value + '</span>';
    list.appendChild(div);
  });

  if (countId) {
    var countEl = document.getElementById(countId);
    if (countEl) countEl.innerText = items.length;
  }
}

function switchDukaTab(tabName) {
  dukaState.activeTab = tabName;

  ['skandha', 'ayatana', 'dhatu', 'sathya'].forEach(function(t) {
    var btn = document.getElementById('duka-tab-btn-' + t);
    var panel = document.getElementById('duka-panel-' + t);

    if (t === tabName) {
      if (btn) btn.className = 'tab-btn flex-1 min-w-[110px] px-3 py-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors border-b-2 border-saffron-600 text-saffron-700 dark:text-saffron-400 bg-saffron-500/10';
      if (panel) panel.classList.remove('hidden');
    } else {
      if (btn) btn.className = 'tab-btn flex-1 min-w-[110px] px-3 py-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors border-b-2 border-transparent text-amber-800 dark:text-slate-400 hover:bg-amber-50 dark:hover:bg-slate-700';
      if (panel) panel.classList.add('hidden');
    }
  });
}

function backToGochhakaList() {
  dukaState.currentGochhaka = null;
  dukaState.currentDukaPair = null;
  dukaState.currentPada = null;
  showDukaView('duka-view-list');
  if (typeof updateBreadcrumbDuka === 'function') updateBreadcrumbDuka('list');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToDukaList() {
  if (!dukaState.currentGochhaka) { backToGochhakaList(); return; }
  dukaState.currentDukaPair = null;
  dukaState.currentPada = null;
  showDukaView('duka-view-duka-list');
  if (typeof updateBreadcrumbDuka === 'function') updateBreadcrumbDuka('duka-list');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToPadaPair() {
  if (!dukaState.currentDukaPair) { backToDukaList(); return; }
  dukaState.currentPada = null;
  showDukaView('duka-view-pada-pair');
  if (typeof updateBreadcrumbDuka === 'function') updateBreadcrumbDuka('pada-pair');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// BOOKMARKS
// ============================================================
function toggleDukaBookmark() {
  if (!dukaState.currentGochhaka || !dukaState.currentPada) return;
  var id = 'duka_' + dukaState.currentGochhaka.id + '_' + dukaState.currentPadaIndex;
  var existingIdx = dukaState.bookmarks.findIndex(function(b) { return b.id === id; });

  if (existingIdx > -1) {
    dukaState.bookmarks.splice(existingIdx, 1);
  } else {
    dukaState.bookmarks.push({
      id: id,
      gochhakaId: dukaState.currentGochhaka.id,
      gochhakaTitle: dukaState.currentGochhaka.title,
      padaIndex: dukaState.currentPadaIndex,
      padaName: dukaState.currentPada.name
    });
  }

  localStorage.setItem('duka_bookmarks', JSON.stringify(dukaState.bookmarks));
  updateDukaBookmarkBadge();
  updateDukaBookmarkButton();
}

function updateDukaBookmarkButton() {
  if (!dukaState.currentGochhaka || !dukaState.currentPada) return;
  var id = 'duka_' + dukaState.currentGochhaka.id + '_' + dukaState.currentPadaIndex;
  var icon = document.getElementById('duka-bookmark-icon');
  if (!icon) return;
  var isFav = dukaState.bookmarks.some(function(b) { return b.id === id; });
  icon.className = isFav ? 'fa-solid fa-bookmark text-saffron-500' : 'fa-regular fa-bookmark';
}

function updateDukaBookmarkBadge() {
  var badge = document.getElementById('duka-fav-badge');
  if (!badge) return;
  if (dukaState.bookmarks.length > 0) {
    badge.classList.remove('hidden');
    badge.innerText = dukaState.bookmarks.length;
  } else {
    badge.classList.add('hidden');
  }
}

// ============================================================
// OPEN DUKA MATIKA (බැනරය ක්ලික් කිරීම)
// ============================================================
function openDukaMatika() {
  var section = document.getElementById('gochhaka-section');
  if (!section) return;
  section.classList.remove('hidden');
  renderGochhakaList();
  setTimeout(function() {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// ============================================================
// SEARCH - පුළුල් කළ සෙවුම
// ============================================================
function searchDukaMatika(query) {
  if (!query || query.trim() === '') return [];
  
  var q = query.toLowerCase().trim();
  var results = [];
  
  dukaGochhakaData.forEach(function(gochhaka) {
    if (!gochhaka) return;
    
    var dukas = getGochhakaDukas(gochhaka);
    
    // ගොච්ඡකයේ නමින් සොයන්න
    if (gochhaka.title.toLowerCase().indexOf(q) > -1) {
      results.push({
        type: 'gochhaka',
        gochhakaId: gochhaka.id,
        gochhakaTitle: gochhaka.title,
        matchText: gochhaka.title,
        matchType: 'ගොච්ඡකය'
      });
    }
    
    // දුක්වල නමින් සොයන්න
    dukas.forEach(function(duka) {
      var dukaName = duka.name || '';
      if (dukaName.toLowerCase().indexOf(q) > -1) {
        results.push({
          type: 'duka',
          gochhakaId: gochhaka.id,
          gochhakaTitle: gochhaka.title,
          dukaNumber: duka.number,
          dukaName: dukaName,
          matchText: dukaName,
          matchType: 'දුක'
        });
      }
    });
    
    // පදවල නමින් සහ ස්වරූපාර්ථයෙන් සොයන්න
    var allPadas = getGochhakaPadas(gochhaka);
    allPadas.forEach(function(pada, padaIdx) {
      if (!pada || !pada.name) return;
      
      var nameMatch = pada.name.toLowerCase().indexOf(q) > -1;
      var descMatch = pada.desc && pada.desc.toLowerCase().indexOf(q) > -1;
      var svarthaMatch = pada.svartha && pada.svartha.toLowerCase().indexOf(q) > -1;
      
      if (nameMatch || descMatch || svarthaMatch) {
        var dukaNumber = Math.floor(padaIdx / 2) + 1;
        var matchType = nameMatch ? 'පදය' : (descMatch ? 'විස්තරය' : 'ස්වරූපාර්ථය');
        
        results.push({
          type: 'pada',
          gochhakaId: gochhaka.id,
          gochhakaTitle: gochhaka.title,
          dukaNumber: dukaNumber,
          padaIndex: padaIdx,
          padaName: pada.name,
          padaDesc: pada.desc || '',
          matchText: pada.name,
          matchType: matchType
        });
      }
    });
  });
  
  return results;
}

function renderDukaSearchResults(results) {
  var container = document.getElementById('gochhaka-list');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (results.length === 0) {
    container.innerHTML = 
      '<div class="text-center py-8 text-slate-500 text-sm">' +
        '<i class="fa-solid fa-magnifying-glass text-2xl mb-2 opacity-30"></i><br>' +
        'ගැලපෙන ප්‍රතිඵල හමු නොවීය.' +
      '</div>';
    return;
  }
  
  var summary = document.createElement('div');
  summary.className = 'text-xs text-amber-800 dark:text-saffron-400 bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-700 rounded-lg p-3 mb-3';
  summary.innerHTML = '<i class="fa-solid fa-circle-info"></i> <strong>' + results.length + '</strong> ප්‍රතිඵල හමු විය';
  container.appendChild(summary);
  
  results.forEach(function(result) {
    var card = document.createElement('div');
    card.className = 'bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer transition-all fade-in';
    
    if (result.type === 'pada') {
      card.onclick = function() {
        dukaState.currentGochhaka = dukaGochhakaData.find(function(g) { return g.id === result.gochhakaId; });
        showDukaView('duka-view-pada-detail');
        openPadaDetail(result.padaIndex);
      };
      
      card.innerHTML =
        '<div class="flex items-start gap-3">' +
          '<div class="w-9 h-9 rounded-full bg-saffron-500 text-maroon-950 font-bold text-xs flex items-center justify-center shrink-0">' +
            '<i class="fa-solid fa-book"></i>' +
          '</div>' +
          '<div class="flex-1 min-w-0">' +
            '<div class="flex items-center gap-2 mb-1 flex-wrap">' +
              '<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-saffron-500/20 text-saffron-700 dark:text-saffron-300">' + result.matchType + '</span>' +
              '<span class="text-[10px] text-slate-500">' + result.gochhakaTitle + '</span>' +
            '</div>' +
            '<h4 class="font-bold text-sm text-maroon-900 dark:text-saffron-200 mb-1">' + result.padaName + '</h4>' +
            (result.padaDesc ? '<p class="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">' + result.padaDesc + '</p>' : '') +
          '</div>' +
          '<i class="fa-solid fa-chevron-right text-slate-400 shrink-0"></i>' +
        '</div>';
      
    } else if (result.type === 'duka') {
      card.onclick = function() {
        openGochhaka(result.gochhakaId);
      };
      
      card.innerHTML =
        '<div class="flex items-start gap-3">' +
          '<div class="w-9 h-9 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0">' +
            '<i class="fa-solid fa-layer-group"></i>' +
          '</div>' +
          '<div class="flex-1 min-w-0">' +
            '<div class="flex items-center gap-2 mb-1 flex-wrap">' +
              '<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">දුක</span>' +
              '<span class="text-[10px] text-slate-500">' + result.gochhakaTitle + '</span>' +
            '</div>' +
            '<h4 class="font-bold text-sm text-maroon-900 dark:text-saffron-200 mb-1">' + result.dukaName + '</h4>' +
          '</div>' +
          '<i class="fa-solid fa-chevron-right text-slate-400 shrink-0"></i>' +
        '</div>';
      
    } else {
      card.onclick = function() { openGochhaka(result.gochhakaId); };
      
      card.innerHTML =
        '<div class="flex items-start gap-3">' +
          '<div class="w-9 h-9 rounded-full bg-maroon-700 text-saffron-200 font-bold text-xs flex items-center justify-center shrink-0">' +
            result.gochhakaId +
          '</div>' +
          '<div class="flex-1 min-w-0">' +
            '<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-maroon-500/20 text-maroon-700 dark:text-maroon-300 mb-1 inline-block">ගොච්ඡකය</span>' +
            '<h4 class="font-bold text-sm text-maroon-900 dark:text-saffron-200">' + result.matchText + '</h4>' +
          '</div>' +
          '<i class="fa-solid fa-chevron-right text-slate-400 shrink-0"></i>' +
        '</div>';
    }
    
    container.appendChild(card);
  });
}

function performDukaSearch(query) {
  var results = searchDukaMatika(query);
  renderDukaSearchResults(results);
}

function handleDukaSearch(query) {
  var clearBtn = document.getElementById('duka-search-clear');

  if (!query || query.trim() === '') {
    if (clearBtn) clearBtn.classList.add('hidden');
    renderGochhakaList();
    return;
  }

  if (clearBtn) clearBtn.classList.remove('hidden');

  if (typeof performDukaSearch === 'function') {
    performDukaSearch(query);
  } else {
    console.warn('[Duka App] performDukaSearch not found, using fallback');
    var results = searchDukaMatika(query);
    renderDukaSearchResults(results);
  }
}

function clearDukaSearch() {
  var searchInput = document.getElementById('duka-search');
  if (searchInput) searchInput.value = '';
  var clearBtn = document.getElementById('duka-search-clear');
  if (clearBtn) clearBtn.classList.add('hidden');
  renderGochhakaList();
}

// ============================================================
// BOOKMARKS VIEW
// ============================================================
function showDukaBookmarksView() {
  showDukaView('duka-view-bookmarks');
  if (typeof updateBreadcrumbDuka === 'function') updateBreadcrumbDuka('bookmarks');
  renderDukaBookmarks();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderDukaBookmarks() {
  var container = document.getElementById('duka-bookmarks-container');
  if (!container) return;
  container.innerHTML = '';

  if (dukaState.bookmarks.length === 0) {
    container.innerHTML = '<div class="text-center py-12 text-slate-500 text-sm"><i class="fa-regular fa-bookmark text-4xl mb-3 opacity-30"></i><br>සුරැකි මාතිකා පද කිසිවක් නොමැත.</div>';
    return;
  }

  dukaState.bookmarks.forEach(function(b) {
    var gochhaka = dukaGochhakaData.find(function(g) { return g.id === b.gochhakaId; });
    if (!gochhaka) return;

    var card = document.createElement('div');
    card.className = 'bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer transition-all flex items-center justify-between gap-2';

    card.onclick = function(e) {
      if (e.target.closest('button')) return;
      dukaState.currentGochhaka = gochhaka;
      showDukaView('duka-view-pada-detail');
      openPadaDetail(b.padaIndex);
    };

    card.innerHTML =
      '<div class="flex-1 min-w-0">' +
        '<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-saffron-500/20 text-saffron-700 dark:text-saffron-300 mb-1 inline-block">' + gochhaka.title + '</span>' +
        '<h4 class="font-bold text-sm text-maroon-900 dark:text-saffron-200 truncate">' + b.padaName + '</h4>' +
      '</div>' +
      '<button onclick="event.stopPropagation(); removeDukaBookmark(\'' + b.id + '\')" class="text-slate-400 hover:text-red-500 p-2 transition-colors shrink-0">' +
        '<i class="fa-solid fa-trash-can text-sm"></i>' +
      '</button>';
    container.appendChild(card);
  });
}

function removeDukaBookmark(id) {
  dukaState.bookmarks = dukaState.bookmarks.filter(function(b) { return b.id !== id; });
  localStorage.setItem('duka_bookmarks', JSON.stringify(dukaState.bookmarks));
  updateDukaBookmarkBadge();
  renderDukaBookmarks();
}

// ============================================================
// BREADCRUMB UPDATE
// ============================================================
function updateBreadcrumbDuka(view) {
  var sep = document.getElementById('bc-sep-gochhaka');
  var gochhakaSpan = document.getElementById('bc-gochhaka');
  if (!sep || !gochhakaSpan) return;

  var text = '';

  if (view === 'duka-list' && dukaState.currentGochhaka) {
    text = dukaState.currentGochhaka.title;
  } else if (view === 'pada-pair' && dukaState.currentDukaPair) {
    text = dukaState.currentDukaPair.name || dukaState.currentGochhaka.title;
  } else if (view === 'pada-detail' && dukaState.currentPada) {
    text = dukaState.currentGochhaka.title + ' → ' + dukaState.currentPada.name;
  } else if (view === 'bookmarks') {
    text = 'සුරැකි මාතිකා';
  }

  if (text) {
    sep.classList.remove('hidden');
    gochhakaSpan.classList.remove('hidden');
    gochhakaSpan.innerText = text;
  } else {
    sep.classList.add('hidden');
    gochhakaSpan.classList.add('hidden');
  }
}

// ============================================================
// THEME TOGGLE
// ============================================================
function toggleDarkMode() {
  var html = document.documentElement;
  var icon = document.getElementById('theme-toggle-icon');
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('duka_theme', 'light');
    if (icon) icon.className = 'fa-solid fa-moon text-lg';
  } else {
    html.classList.add('dark');
    localStorage.setItem('duka_theme', 'dark');
    if (icon) icon.className = 'fa-solid fa-sun text-lg';
  }
}

// Theme initialize
if (localStorage.getItem('duka_theme') === 'dark' ||
    (!localStorage.getItem('duka_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
  var themeIcon = document.getElementById('theme-toggle-icon');
  if (themeIcon) themeIcon.className = 'fa-solid fa-sun text-lg';
}

// ============================================================
// INIT - DOMContentLoaded
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  console.log('[Duka App] DOMContentLoaded fired');
  initDukaApp();
});