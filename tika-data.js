// tika-data.js
// ============================================================
// අභිධර්ම මාතිකා අධ්‍යයන ප්‍රවේශය - තික මාතිකා 22
// Helper functions + tikaFullData array + registerTika()
// ============================================================

// ============================================================
// 1. HELPER FUNCTIONS
// ============================================================

function makeSkandha(rupa, vedana, sanna, sankhara, vinnana) {
  return [
    { num: 1, name: 'රූපක්ඛන්ධෝ', value: rupa },
    { num: 2, name: 'වේදනාක්ඛන්ධෝ', value: vedana },
    { num: 3, name: 'සඤ්ඤාක්ඛන්ධෝ', value: sanna },
    { num: 4, name: 'සංඛාරක්ඛන්ධෝ', value: sankhara },
    { num: 5, name: 'විඤ්ඤාණක්ඛන්ධෝ', value: vinnana }
  ];
}

function makeSathya(arr) {
  return arr;
}

function makeAyatana(entries) {
  return entries;
}

function makeDhatu(entries) {
  return entries;
}

// ============================================================
// 2. TIKA DATA ARRAY (හිස් - registerTika() මගින් populate වේ)
// ============================================================

var tikaFullData = [];

// ============================================================
// 3. REGISTER TIKA FUNCTION
// ============================================================

function registerTika(tikaObject) {
  if (!tikaObject || !tikaObject.title) {
    console.warn('[tika-data.js] registerTika: වලංගු නොවන තිකයක්.');
    return;
  }
  
  var exists = tikaFullData.some(function(t) {
    return t.title === tikaObject.title;
  });
  
  if (exists) {
    console.warn('[tika-data.js] registerTika: "' + tikaObject.title + '" දැනටමත් ලියාපදිංචි කර ඇත.');
    return;
  }
  
  tikaFullData.push(tikaObject);
  console.log('[tika-data.js] ලියාපදිංචි කරන ලදී: ' + tikaObject.title + ' (මුළු: ' + tikaFullData.length + ')');
}

// ============================================================
// 4. FALLBACK MECHANISM
// ============================================================
// තික ගොනු 22 සම්පූර්ණ නොවූයේ නම්, placeholder තික 22 පෙන්වන්න.

var tikaPlaceholderTitles = [
  '01. කුසල ත්‍රිකය',
  '02. වේදනා ත්‍රිකය',
  '03. විපාක ත්‍රිකය',
  '04. උපාදින්න ත්‍රිකය',
  '05. සංකිලිට්ඨ ත්‍රිකය',
  '06. විතර්ක ත්‍රිකය',
  '07. ප්‍රීති ත්‍රිකය',
  '08. දස්සන ත්‍රිකය',
  '09. දස්සනහේතු ත්‍රිකය',
  '10. ආචයගාමී ත්‍රිකය',
  '11. සෙක්ඛ ත්‍රිකය',
  '12. පරිත්ත ත්‍රිකය',
  '13. පරිත්තාරම්මණ ත්‍රිකය',
  '14. හීන ත්‍රිකය',
  '15. මිච්ඡත්ත ත්‍රිකය',
  '16. මග්ගාරම්මණ ත්‍රිකය',
  '17. උප්පන්න ත්‍රිකය',
  '18. අතීත ත්‍රිකය',
  '19. අතීතාරම්මණ ත්‍රිකය',
  '20. අජ්ඣත්ත ත්‍රිකය',
  '21. අජ්ඣත්තාරම්මණ ත්‍රිකය',
  '22. සනිදස්සන ත්‍රිකය'
];

// title එකෙන් අංකය සහ "ත්‍රිකය" අගට ඉවත් කර සසඳන්න සුදානම් කරයි
function tikaTitleKey(title) {
  var t = String(title || '').replace(/^\s*\d+\s*[.\-)]*\s*/, '');
  t = t.replace(/\s*(ත්‍රිකය|තිකය|ත්‍රික|තික)\s*$/, '');
  return t.replace(/\s+/g, '').trim();
}

function makePlaceholderTika(title) {
  return {
    title: title,
    isPlaceholder: true,
    padas: [
      {
        name: 'දත්ත ලබාගත නොහැක',
        desc: 'මෙම තිකයට අදාළ ගොනුව තවම සාදා නැත.',
        padaArtha: 'මෙම තිකයට අදාළ ගොනුව (tika/' + String(title.substring(0, 2)).trim() + '-...) තවම සාදා නැත. කරුණාකර ගොනුව සාදන්න.',
        svartha: 'දත්ත නොමැත.',
        skandha: makeSkandha('දත්ත නොමැත', 'දත්ත නොමැත', 'දත්ත නොමැත', 'දත්ත නොමැත', 'දත්ත නොමැත'),
        ayatana: makeAyatana([{ num: 1, name: 'දත්ත නොමැත', value: '-' }]),
        dhatu: makeDhatu([{ num: 1, name: 'දත්ත නොමැත', value: '-' }]),
        sathya: makeSathya([
          { num: 1, name: 'දුක්ඛ සත්‍යය', value: '-' },
          { num: 2, name: 'සමුදය සත්‍යය', value: '-' },
          { num: 3, name: 'නිරෝධ සත්‍යය', value: '-' },
          { num: 4, name: 'මාර්ග සත්‍යය', value: '-' }
        ]),
        mukta: '-'
      }
    ]
  };
}

function fillMissingTikas() {
  var total = tikaPlaceholderTitles.length;
  var slots = new Array(total);
  var extras = [];

  // 1) load වී ඇති එක් එක් තිකය නිවැරදි ස්ථානයට (1–22) ගැළපීම
  tikaFullData.forEach(function(t) {
    var idx = -1;

    // (අ) title හි ආරම්භක අංකය අනුව
    var m = String(t.title || '').match(/^\s*(\d+)/);
    if (m) {
      var n = parseInt(m[1], 10);
      if (n >= 1 && n <= total && !slots[n - 1]) idx = n - 1;
    }

    // (ආ) අංකයක් නැතිනම් නම අනුව
    if (idx < 0) {
      var key = tikaTitleKey(t.title);
      for (var i = 0; i < total; i++) {
        if (!slots[i] && tikaTitleKey(tikaPlaceholderTitles[i]) === key) { idx = i; break; }
      }
    }

    if (idx >= 0) slots[idx] = t; else extras.push(t);
  });

  // 2) ගැළපුණේ නැති ඒවා (අක්ෂර වින්‍යාස වෙනස්) හිස් ස්ථාන වලට load පිළිවෙලින් දැමීම
  if (extras.length > 0) {
    console.warn('[tika-data.js] නම/අංකය ගැළපුණේ නැති තික ' + extras.length + ' ක්: ', extras.map(function(e) { return e.title; }));
  }
  for (var j = 0; j < total && extras.length > 0; j++) {
    if (!slots[j]) slots[j] = extras.shift();
  }

  // 3) තවමත් හිස් ස්ථාන සඳහා placeholder
  for (var k = 0; k < total; k++) {
    if (!slots[k]) slots[k] = makePlaceholderTika(tikaPlaceholderTitles[k]);
  }

  // 4) array එක තැනින්ම නැවත පිරවීම (වෙනත් ස්ථානවල යොමු නොබිඳෙන සේ)
  tikaFullData.length = 0;
  slots.concat(extras).forEach(function(t) { tikaFullData.push(t); });

  console.log('[tika-data.js] Fallback සම්පූර්ණයි. මුළු තික: ' + tikaFullData.length);
}