// ============================================================
// caitasika.js
// චෛතසික හා සම්ප්‍රයෝග සංග්‍රහනය
// අභිධර්ම මාතිකා අධ්‍යයන යෙදුම
// ============================================================

// ============================================================
// 1. DARK MODE TOGGLE (samprayoga.js සමඟ සම්බන්ධ)
// ============================================================
function caitasikaToggleDarkMode() {
  var html = document.documentElement;
  var icon = document.getElementById('theme-toggle-icon');
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('caitasika_theme', 'light');
    localStorage.setItem('abhidhamma_theme', 'light');
    if (icon) icon.className = 'fa-solid fa-moon text-lg';
  } else {
    html.classList.add('dark');
    localStorage.setItem('caitasika_theme', 'dark');
    localStorage.setItem('abhidhamma_theme', 'dark');
    if (icon) icon.className = 'fa-solid fa-sun text-lg';
  }
}

// Theme initialize
(function initCaitasikaTheme() {
  var savedTheme = localStorage.getItem('caitasika_theme') || localStorage.getItem('abhidhamma_theme');
  if (savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    var icon = document.getElementById('theme-toggle-icon');
    if (icon) icon.className = 'fa-solid fa-sun text-lg';
  }
})();

// ============================================================
// 2. TAB SWITCHING
// ============================================================
var caitasikaTabs = ['intro', 'sabbacitta', 'pakirnaka', 'akusala', 'sobhana', 'samprayoga'];

function switchCaitasikaTab(tabName) {
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
// 3. DATA: සර්වචිත්ත සාධාරණ චෛතසික 7
// ============================================================
var sabbacittaData = [
  {
    num: 1,
    name: 'ඵස්ස',
    pali: 'Phassa',
    lakshana: 'අරමුණ සැපෙන ස්වභාවය',
    yedena: 'සියලු සිත් 89/121',
    desc: 'අරමුණින් සැපෙන ස්වභාවය ඵස්ස නම් වේ. සැපීම ය යනු අතරක් නො සිටින පරිදි ළං වීම ය. එයට ගැවීම යයි ද කියනු ලැබේ.'
  },
  {
    num: 2,
    name: 'වේදනා',
    pali: 'Vedanā',
    lakshana: 'අරමුණෙහි රසය විඳින ස්වභාවය',
    yedena: 'සියලු සිත් 89/121',
    desc: 'අරමුණෙහි හොඳ බව වූ හෝ නරක බව වූ හෝ මධ්‍යස්ථ බව වූ හෝ රසය විඳින ස්වභාවය වේදනා නම් වේ. සෝමනස්ස, දෝමනස්ස, උපෙක්ඛා, සුඛ, දුක්ඛ යන නම්වලින් කියවේ.'
  },
  {
    num: 3,
    name: 'සඤ්ඤා',
    pali: 'Saññā',
    lakshana: 'අරමුණෙහි ආකාරය ගන්නා ස්වභාවය',
    yedena: 'සියලු සිත් 89/121',
    desc: 'අරමුණාගේ ආකාරය ගන්නා ස්වභාවය සඤ්ඤා නම් වේ. ඒ ඒ දෙය අනික් දේවලින් වෙන් කොට හඳින ගැනීමට උපකාර වන විශේෂ ආකාරයක් සැම දෙයක ම ඇත්තේ ය. "අරමුණු හඳින ගන්නා ස්වභාවය සඤ්ඤාවය" යි කියා ද තිබේ.'
  },
  {
    num: 4,
    name: 'චේතනා',
    pali: 'Cetanā',
    lakshana: 'ක්‍රියා සිදු කිරීමේ උත්සාහය',
    yedena: 'සියලු සිත් 89/121',
    desc: 'බැලීම්-ඇසීම්-කැම-පීම්-යැම්-ර්ම්-දීම්-ගැනීම් ආදී ක්‍රියා සිදු කිරීමේ උත්සාහය චේතනා නම් වේ. සත්ත්වයන් විසින් සිදු කරන අපුමාණ ක්‍රියා ඇත්තේ ය. "කර්මය" යි කියනුයේ ද මේ චේතනා චෛතසිකයට ය. චේතනාව සේනාපතියකු වැනි ය.'
  },
  {
    num: 5,
    name: 'ඒකග්ගතා',
    pali: 'Ekaggatā',
    lakshana: 'සිත අරමුණෙහි මනා කොට පිහිටවන ස්වභාවය',
    yedena: 'සියලු සිත් 89/121',
    desc: 'නො සැලෙන පරිදි සිත අරමුණෙහි මනා කොට පිහිටවන ස්වභාවය ඒකග්ගතා නම් වේ. "සමාධිය" යනු ද ඒකග්ගතා චෛතසිකයට කියන තවත් නමකි.'
  },
  {
    num: 6,
    name: 'ජීවිතින්ද්‍රිය',
    pali: 'Jīvitindriya',
    lakshana: 'චිත්ත චෛතසිකයන්ගේ ජීවන බලය',
    yedena: 'සියලු සිත් 89/121',
    desc: 'චිත්ත චෛතසිකයන්ගේ ජීවන බලය - ජීවත් වීමේ ශක්තිය ජීවිතින්ද්‍රිය නම් වේ. නිවනට පැමිණීම දක්වා සත්ත්වයාගේ චිත්ත පරම්පරාව පැවැත්මට උපකාර වන, එය පාලනය කරන දේ මේ ජීවිතින්ද්‍රිය චෛතසිකය ය.'
  },
  {
    num: 7,
    name: 'මනසිකාර',
    pali: 'Manasikāra',
    lakshana: 'සිත අරමුණෙන් ඉවත් නොවී යොදවන ධර්මය',
    yedena: 'සියලු සිත් 89/121',
    desc: 'සිතට අරමුණෙන් ඉවත් වන්නට නො දී නැවත නැවත අරමුණු ගැනීමෙහි සිත යොදවන ධර්මය මනසිකාර නම් වේ. ප්‍රතිසන්ධියෙහි පටන් ම ක්ෂණයක් පාසා බිඳෙමින් අරමුණෙන් ඉවත් වන චිත්ත පරම්පරාව, මේ චෛතසිකය නිසා නැවත නැවතත් ඉපද ඉපද අරමුණු ගැනීමෙහි යෙදෙන බව කියනු ලැබේ.'
  }
];

// ============================================================
// 4. DATA: ප්‍රකීර්ණක චෛතසික 6
// ============================================================
var pakirnakaData2 = [
  {
    num: 1,
    name: 'විතක්ක',
    pali: 'Vitakka',
    lakshana: 'අරමුණ කරා යන, අරමුණට පැමිණෙන ස්වභාවය',
    yedena: 55,
    noyedena: 66,
    desc: 'අරමුණ කරා යන, අරමුණට පැමිණෙන ස්වභාවය විතක්ක නම් වේ. විතක්කය අරමුණට පැමිණෙන කල්හි එය හා උපදනා චිත්ත චෛතසිකයෝ ද එය අනුව අරමුණට පැමිණෙති. එබැවින් චිත්ත චෛතසිකයන් අරමුණට පමුණුවන ධර්මය විතක්කය යි ද කියන් ලැබේ. දුබල විතක්කය අපුකට ය. එය පුකට වන්නේ දීනැ කමින් විතක්ක උපදවන කල්හි ය. කර්මඤ්ඤ වීම ය යි කියන්නේ එසේ වීමට ය.'
  },
  {
    num: 2,
    name: 'විචාර',
    pali: 'Vicāra',
    lakshana: 'විතක්කය පැමිණි අරමුණ පිරිමදින ස්වභාවය',
    yedena: 66,
    noyedena: 55,
    desc: 'විතක්කය පැමිණි අරමුණ පිරිමදින ස්වභාවය විචාරය නම් වේ. මෙහි අදහස් කරන පිරිමැදීම අරමුණෙහි ඇතිල්ලෙන, අරමුණෙහි පැතිරෙන ස්වභාවය ය. විතක්ක බලයෙන් අරමුණට පැමිණියා වූ සිත විචාරයේ බලයෙන් එහි පැතිරේ. විතක්ක විචාර දෙකින් විතක්කය මාදුරිකය. විචාරය සියුම් ය.'
  },
  {
    num: 3,
    name: 'අධිමොක්ඛ',
    pali: 'Adhimokkha',
    lakshana: 'අරමුණ සැටි විනිශ්චය කර ගන්නා ස්වභාවය',
    yedena: 77,
    noyedena: 44,
    desc: 'අරමුණේ සැටි විනිශ්චය කර ගන්නා ස්වභාවය අධිමොක්ඛ නම් වේ. මේ චෛතසිකය නිසා එසේ ද මෙසේ ද කියා දෙතැන් පැතිකර තොර නො ගොස් හරි යට හෝ වැරදී යට හෝ වූ යම් කිසි එක් ආකාරයකින් සිතට අරමුණ ගත හැකි වන්නේ ය.'
  },
  {
    num: 4,
    name: 'විරිය',
    pali: 'Viriya',
    lakshana: 'කටයුත්තෙහි නො පසුබස්නා ස්වභාවය',
    yedena: 73,
    noyedena: 48,
    desc: 'කටයුත්තෙහි නො පසුබස්නා ස්වභාවය, පටන් ගත් දෙය සිදු වන තුරු ඉදිරියට යන ස්වභාවය විරිය නම් වේ. කායික විරිය - චෛතසික විරිය කියා විරිය දෙකක් ඇත්තේ ය. මෙහි අදහස් කරන්නේ චෛතසික විරියය යි.'
  },
  {
    num: 5,
    name: 'පීති',
    pali: 'Pīti',
    lakshana: 'සිත පිනා යන ස්වභාවය',
    yedena: 51,
    noyedena: 70,
    desc: 'සිත පිනා යන ස්වභාවය - මලක් මෙන් ප්‍රබෝධ වන, පිඹෙන ස්වභාවය පීති නම් වේ. මෙය ඉතා ප්‍රකට ස්වභාවයකි.'
  },
  {
    num: 6,
    name: 'ඡන්ද',
    pali: 'Chanda',
    lakshana: 'ඒ දේ කරනු කැමැත්ත',
    yedena: 69,
    noyedena: 52,
    desc: 'ඒ දේ කරනු කැමැත්ත, කිරීමේ ඕනෑකම ඡන්ද නම් වේ. මෙය ලෝභයට මදක් සමාන සේ පෙනෙන චෛතසිකයෙකි. එහෙත් ලෝභයෙහි මෙන් ඇලෙන ස්වභාවයක් ඡන්දයෙහි නැත. ඡන්දය ඇලීමෙන් තොර වූ ඕනෑකමෙකි.'
  }
];

// ============================================================
// 5. DATA: අකුසල චෛතසික 14
// ============================================================
var akusalaData2 = [
  {
    num: 1,
    name: 'මෝහ',
    pali: 'Moha',
    lakshana: 'අරමුණෙහි සැබෑ තත්ත්වය වසන ස්වභාවය',
    yedena: 'සියලු අකුසල සිත් 12',
    desc: 'අරමුණෙහි සැබෑ තත්ත්වය වසන ස්වභාවය මෝහ නම් වේ. මේ මෝහය ඇසෙහි ඇති පටලයක් වැනිය යි ද, අඳුරක් වැනිය යි ද කිය යුතු ය. මේ නිසා සත්ත්වයනට දුක ම මිහිරක් සැටියට, සැපයක් සැටියට පෙනේ. අවිද්‍යාව යයි කියනුයේ ද මේ මෝහයට ය.'
  },
  {
    num: 2,
    name: 'අහිරික',
    pali: 'Ahirika',
    lakshana: 'පාපය පිළිකුල් නො කරන ස්වභාවය',
    yedena: 'සියලු අකුසල සිත් 12',
    desc: 'පාපය පිළිකුල් නො කරන ස්වභාවය අහිරික නමි. මෙයට පාපයට ලජ්ජා නො වන ස්වභාවය යි ද කියනු ලැබේ.'
  },
  {
    num: 3,
    name: 'අනොත්තප්ප',
    pali: 'Anottappa',
    lakshana: 'පාපයට බිය නො වන ස්වභාවය',
    yedena: 'සියලු අකුසල සිත් 12',
    desc: 'පාපයට බිය නො වන ස්වභාවය අනොත්තප්පය නමි. අහිරික - අනොත්තප්ප යන මේ චෛතසික දෙක අකුසල පක්ෂයෙහි මහ බල දෙකකි.'
  },
  {
    num: 4,
    name: 'උද්ධච්ච',
    pali: 'Uddhacca',
    lakshana: 'සිත සැලෙන ස්වභාවය',
    yedena: 'සියලු අකුසල සිත් 12',
    desc: 'සිත සැලෙන ස්වභාවය, අරමුණෙහි මැනවින් තනා පිහිටන ස්වභාවය උද්ධච්ච නමි. මෙය සමාධියට විරුද්ධ ස්වභාවයෙකි.'
  },
  {
    num: 5,
    name: 'ලෝභ',
    pali: 'Lobha',
    lakshana: 'අරමුණ හොඳ දෙයක් සැටියට ගෙන එහි ඇලෙන ස්වභාවය',
    yedena: 'ලෝභ මූල සිත් 8',
    desc: 'අරමුණ හොඳ දෙයක් සැටියට ගෙන, එහි ඇලෙන ස්වභාවය ලෝභ නමි. එය අරමුණට ඇළුම් කරන ස්වභාවය යි ද කිය යුතු ය. රාගය - ප්‍රේමය - ආලය - ආදරය - ආශාව - මිනැකම යන වචනවලින් කියැවෙන්නේ ද ලෝභය ම ය.'
  },
  {
    num: 6,
    name: 'දිට්ඨි',
    pali: 'Diṭṭhi',
    lakshana: 'වරදවා දකින ස්වභාවය',
    yedena: 'දිට්ඨි සම්පයුත්ත සිත් 4',
    desc: 'වරදවා දකින ස්වභාවය, කාරණය වැරදි ලෙස ගන්නා ස්වභාවය දිට්ඨි නමි. දිට්ඨි - සම්මා දිට්ඨි - මිච්ඡා දිට්ඨි කියා දෙ පරිදි වේ. සම්මා දිට්ඨි යනු කාරණය ඇති සැටියට දක්නා නුවණ ය. මිච්ඡා දිට්ඨි යනු වරදවා දකින ස්වභාවය ය.'
  },
  {
    num: 7,
    name: 'මාන',
    pali: 'Māna',
    lakshana: 'තමාගේ තත්ත්වය තමා විසින් ම මැන ගන්නා ස්වභාවය',
    yedena: 'දිට්ඨි විප්පයුත්ත සිත් 4',
    desc: 'මම ලෝකයෙහි එක්තරා උසස් කෙනෙක්මිය යනාදින් තමාගේ තත්ත්වය තමා විසින් ම මැන ගන්නා ස්වභාවය මාන නම් වේ. සෙය්‍ය මානය - සදිස මානය - හීන මානය කියා මානය තෙවැදෑරුම් වේ.'
  },
  {
    num: 8,
    name: 'දෝස',
    pali: 'Dosa',
    lakshana: 'අරමුණට විරුද්ධ ස්වභාවය',
    yedena: 'දෝස මූල සිත් 2',
    desc: 'අරමුණට විරුද්ධ ස්වභාවය දෝසය ය. ද්වේෂය යනු ද එයට නමෙකි. එය ක්‍රෝධය - කෝපය - හය - දෝස - සතුට - පිළිකුල - අප්‍රසාදය යන නම් වලින් කියැවේ.'
  },
  {
    num: 9,
    name: 'ඊර්ෂ්‍යා',
    pali: 'Issā',
    lakshana: 'අනුන්ගේ සැපයට විරුද්ධ ස්වභාවය',
    yedena: 'දෝස මූල සිත් 2 (සමහර විට)',
    desc: 'අනුන්ගේ සැපයට - අනුන්ගේ සම්පත්තියට විරුද්ධ ස්වභාවය ඊර්ෂ්‍යා නමි. ඊර්ෂ්‍යා යනු ද එයට නමෙකි.'
  },
  {
    num: 10,
    name: 'මච්ඡරිය',
    pali: 'Macchariya',
    lakshana: 'තමා අයත් දෙයක් අනිකට අයිති වීමට නො කැමැති වීම',
    yedena: 'දෝස මූල සිත් 2 (සමහර විට)',
    desc: 'තමා අයත් දෙයක් අනිකට අයිති වීමට නො කැමැති වීම මච්ඡරිය නමි. ආවාස මච්ඡරිය - කුල මච්ඡරිය - ලාභ මච්ඡරිය - වර්ණ මච්ඡරිය - ධම්ම මච්ඡරිය යයි මච්ඡරිය පසක් වේ.'
  },
  {
    num: 11,
    name: 'කුක්කුච්ච',
    pali: 'Kukkucca',
    lakshana: 'කළ පව් ගැන හෝ නො කළ පින් ගැන පසුතැවෙන ස්වභාවය',
    yedena: 'දෝස මූල සිත් 2 (සමහර විට)',
    desc: 'කළ පව් ගැන හෝ නො කළ පින් ගැන පසුතැවෙන ස්වභාවය කුක්කුච්ච නම් වේ.'
  },
  {
    num: 12,
    name: 'ථීන',
    pali: 'Thīna',
    lakshana: 'සිතෙහි දුබල බව',
    yedena: 'සසංඛාරික සිත් 5',
    desc: 'සිතෙහි දුබල බව, චිත්ත වේගයේ හීන බව, සිතෙහි අලස බව ථීන නම් වේ. සමහරවිට නිදිමත ද ඇති වේ.'
  },
  {
    num: 13,
    name: 'මිද්ධ',
    pali: 'Middha',
    lakshana: 'චෛතසිකයන්ගේ දුබල බව',
    yedena: 'සසංඛාරික සිත් 5',
    desc: 'චෛතසිකයන්ගේ දුබල බව, අලස බව මිද්ධ නම් වේ. ථීන මිද්ධ ඇති වීමෙන් සිත හැකිළේ. වීරිය හීන වේ.'
  },
  {
    num: 14,
    name: 'විචිකිච්ඡා',
    pali: 'Vicikicchā',
    lakshana: 'අරමුණ පිළිබඳ වූ සැකය',
    yedena: 'මෝහ මූල සිත් 2 (එකක් පමණක්)',
    desc: 'අරමුණ පිළිබඳ වූ සැකය විශ්වාසයක් නැති බව විචිකිච්ඡා නම් වේ. මෙය ශ්‍රද්ධාවට හා ඤාණයටත් විපක්ෂ චෛතසිකයෙකි. බුදුන් ගැන සැක කිරීම්, දහම් ගැන සැක කිරීම් ආදිය අකුසල විචිකිච්ඡාවන් වේ.'
  }
];

// ============================================================
// 6. DATA: සොභන චෛතසික 25
// ============================================================
var sobhanaData = [
  // සොභන සාධාරණ 19
  { num: 1, name: 'සද්ධා', pali: 'Saddhā', lakshana: 'බුද්ධාදීන් කෙරෙහි විශ්වාසය', yedena: 'සියලු සොභන සිත් 59', desc: 'බුද්ධාදීන් කෙරෙහි විශ්වාසය, බුද්ධ ගුණාදිය පිළිගන්නා ස්වභාවය සද්ධා නම් වේ. එයට ශ්‍රද්ධාව යයි ද කියනු ලැබේ. කුසල් කිරීමේ දී මහා බලයකි.' },
  { num: 2, name: 'සති', pali: 'Sati', lakshana: 'සිහිය', yedena: 'සියලු සොභන සිත් 59', desc: 'සිහිය සති නම් වේ. අකුශල පක්ෂයෙහි ම ගමන් කිරීම - පැවතීම සත්ත්වයාගේ සිතෙහි ස්වභාවය ය. මේ චෛතසිකයෙන් සත්ත්වයාගේ සිතට අකුශල පක්ෂයෙහි ම ගමන් කරන්නට නො දී, කුශල පක්ෂයෙහි පිහිටුවීම සිදු කරනු ලැබේ.' },
  { num: 3, name: 'හිරි', pali: 'Hiri', lakshana: 'පාපයට ලජ්ජා වන ස්වභාවය', yedena: 'සියලු සොභන සිත් 59', desc: 'පාපය පිළිකුල් කරන පාපයට ලජ්ජා වන ස්වභාවය හිරි නම් වේ.' },
  { num: 4, name: 'ඔත්තප්ප', pali: 'Ottappa', lakshana: 'පවට බිය වන ස්වභාවය', yedena: 'සියලු සොභන සිත් 59', desc: 'පවට බිය වන ස්වභාවය ඔත්තප්ප නම් වේ. සත්පුරුෂයෝ හිරි - ඔත්තප්ප දෙක නිසා පවින් වැළකී යහපත් ව කටයුතු කරති.' },
  { num: 5, name: 'අලෝභ', pali: 'Alobha', lakshana: 'අරමුණෙහි නො ඇලෙන ස්වභාවය', yedena: 'සියලු සොභන සිත් 59', desc: 'අරමුණෙහි නො ඇලෙන ස්වභාවය අලෝභ නම් වේ. අලෝභයෙන් යුක්ත වන සිත, නෙළුම් පතෙහි දිය මෙන් නො ඇලී අරමුණෙහි පවතී.' },
  { num: 6, name: 'අදෝස', pali: 'Adosa', lakshana: 'මෙත්තාව', yedena: 'සියලු සොභන සිත් 59', desc: 'අදෝස යනු මෛත්‍රිය ය. එය ද්වේෂයට විරුද්ධ ස්වභාවය ය.' },
  { num: 7, name: 'තත්‍රමජ්ඣත්තතා', pali: 'Tatramajjhattatā', lakshana: 'සමව පවත්වන ස්වභාවය', yedena: 'සියලු සොභන සිත් 59', desc: 'එකට බැඳී උපදනා චිත්ත - චෛතසිකයන්ගේ වේගයන් අඩු වැඩි වන්නට නො දී, සමව පවත්වන ස්වභාවය තත්‍රමජ්ඣත්තතා නම් වේ.' },
  { num: 8, name: 'කායපස්සද්ධි', pali: 'Kāyapassaddhi', lakshana: 'චෛතසිකයන්ගේ සන්සුන් බව', yedena: 'සියලු සොභන සිත් 59', desc: 'කායපස්සද්ධි යන මෙහි "කාය" යයි කියනුයේ චෛතසිකයන්ට ය. චෛතසිකයන්ගේ සන්සුන් බව කායපස්සද්ධි නම් වේ.' },
  { num: 9, name: 'චිත්තපස්සද්ධි', pali: 'Cittapassaddhi', lakshana: 'සිතේ සන්සුන් බව', yedena: 'සියලු සොභන සිත් 59', desc: 'චිත්තපස්සද්ධි යන මෙහි "චිත්තය" යි කියනුයේ සොභන චිත්තයට ය. චිත්තයාගේ සන්සුන් බව චිත්තපස්සද්ධි නම් වේ.' },
  { num: 10, name: 'කායලහුතා', pali: 'Kāyalahutā', lakshana: 'චෛතසිකයන්ගේ සැහැල්ලු බව', yedena: 'සියලු සොභන සිත් 59', desc: 'චෛතසිකයන්ගේ සැහැල්ලු බව කායලහුතා නම් වේ.' },
  { num: 11, name: 'චිත්තලහුතා', pali: 'Cittalahutā', lakshana: 'සිතේ සැහැල්ලු බව', yedena: 'සියලු සොභන සිත් 59', desc: 'සිතෙහි සැහැල්ලු බව චිත්තලහුතා නම් වේ.' },
  { num: 12, name: 'කායමුදුතා', pali: 'Kāyamudutā', lakshana: 'චෛතසිකයන්ගේ මෘදු බව', yedena: 'සියලු සොභන සිත් 59', desc: 'චෛතසිකයන්ගේ මෘදු බව කායමුදුතා නම් වේ.' },
  { num: 13, name: 'චිත්තමුදුතා', pali: 'Cittamudutā', lakshana: 'සිතේ මෘදු බව', yedena: 'සියලු සොභන සිත් 59', desc: 'සිතේ මෘදු බව චිත්තමුදුතා නම් වේ.' },
  { num: 14, name: 'කායකම්මඤ්ඤතා', pali: 'Kāyakammaññatā', lakshana: 'චෛතසිකයන්ගේ කර්මණ්‍ය බව', yedena: 'සියලු සොභන සිත් 59', desc: 'චෛතසිකයන්ගේ කර්මණ්‍ය භාවය කායකම්මඤ්ඤතා නම් වේ.' },
  { num: 15, name: 'චිත්තකම්මඤ්ඤතා', pali: 'Cittakammaññatā', lakshana: 'සිතේ කර්මණ්‍ය බව', yedena: 'සියලු සොභන සිත් 59', desc: 'සිතේ කර්මණ්‍ය භාවය චිත්තකම්මඤ්ඤතා නම් වේ. කර්මණ්‍යතාව යනු ඕනෑ ම සියුම් කර්මාන්තයකට, තර්කනයට, විභාගයට, අවබෝධයට හැකි බව ය.' },
  { num: 16, name: 'කායපාගුඤ්ඤතා', pali: 'Kāyapāguññatā', lakshana: 'චෛතසිකයන්ගේ හුරු බව', yedena: 'සියලු සොභන සිත් 59', desc: 'චෛතසිකයන්ගේ ඒ ඒ ක්‍රියා විෂයයෙහි හුරු බව කායපාගුඤ්ඤතා නම් වේ.' },
  { num: 17, name: 'චිත්තපාගුඤ්ඤතා', pali: 'Cittapāguññatā', lakshana: 'සිතේ හුරු බව', yedena: 'සියලු සොභන සිත් 59', desc: 'සිතෙහි හුරු බව චිත්තපාගුඤ්ඤතා නම් වේ.' },
  { num: 18, name: 'කායුජුකතා', pali: 'Kāyujukatā', lakshana: 'චෛතසිකයන්ගේ ඍජු බව', yedena: 'සියලු සොභන සිත් 59', desc: 'චෛතසිකයන්ගේ සෘජු බව (ඇද නැති බව) කායුජුකතා නම් වේ.' },
  { num: 19, name: 'චිත්තුජුකතා', pali: 'Cittujukatā', lakshana: 'සිතේ ඍජු බව', yedena: 'සියලු සොභන සිත් 59', desc: 'සිතේ සෘජු බව චිත්තුජුකතා නම් වේ. මේ ධර්ම දෙක මායා - සාඨෙය්‍යාදියට විපක්ෂ ය.' },
  
  // විරති 3
  { num: 20, name: 'සම්මා වාචා', pali: 'Sammā Vācā', lakshana: 'වචනයෙන් සිදුවන පව්වලින් වැළකීම', yedena: 'සිත් 16', desc: 'බොරු කීම - කේලාම් කීම - ඵරුෂ වචන කීම - නිෂ්ඵල වචන කීම යන කටින් සිදුවන පවි කම් සතරින් වැළක්නා ස්වභාවය සම්මා වාචා නම් වේ.' },
  { num: 21, name: 'සම්මා කම්මන්ත', pali: 'Sammā Kammanta', lakshana: 'කයින් සිදුවන පව්වලින් වැළකීම', yedena: 'සිත් 16', desc: 'සතුන් මැරීම - සොරකම් කිරීම - පරදර සේවනය යන කයින් සිදුවන පවි කම් තුනෙන් වැළක්නා ස්වභාවය සම්මා කම්මන්ත නමි.' },
  { num: 22, name: 'සම්මා ආජීව', pali: 'Sammā Ājīva', lakshana: 'දිවි පැවැත්වීමේ දුශ්චරිතවලින් වැළකීම', yedena: 'සිත් 16', desc: 'දිවි පැවැත්වීම සඳහා කරන කාය වාග් දුශ්චරිතවලින් වැළක්නා ස්වභාවය සම්මා ආජීව නමි.' },
  
  // අප්පමඤ්ඤා 2
  { num: 23, name: 'කරුණා', pali: 'Karuṇā', lakshana: 'අනුන් දුකින් මුදවනු කැමැති ස්වභාවය', yedena: 'සිත් 28', desc: 'තමාට දුක් ඇති වෙනවට නො කැමති වන්නාක් මෙන් ම, අනුන් දුක් වීමත් නො කැමති වන, අනුන් දුකින් මුදවනු කැමැති ස්වභාවය කරුණා නම් වේ.' },
  { num: 24, name: 'මුදිතා', pali: 'Muditā', lakshana: 'අනුන්ගේ සම්පත් ගැන සතුටු වන ස්වභාවය', yedena: 'සිත් 28', desc: 'තමාට යම් සම්පතක් ලැබුණ හොත් ඒ ගැන සතුටු වන්නාක් මෙන්, අනුන්ගේ සම්පත් ගැන සතුටු වන්නා වූ ස්වභාවය මුදිතා නම් වේ.' },
  
  // පඤ්ඤා 1
  { num: 25, name: 'පඤ්ඤා', pali: 'Paññā', lakshana: 'අරමුණු ගැඹුරින් දක්නා ස්වභාවය', yedena: 'සිත් 47', desc: 'සිතින් දන ගන්නවාට වඩා හොඳින්, වඩා පිරිසිදු ලෙස - වඩා ගැඹුරු ලෙස අරමුණු දක්නා ස්වභාවය පඤ්ඤා චෛතසිකයයි. එයට "අමෝහය" යි ද, "විද්‍යාව" යයි ද කියනු ලැබේ.' }
];

// ============================================================
// 7. DATA: ඉක්මන් සම්ප්‍රයෝග සාරාංශය
// ============================================================
var quickSamprayogaData = [
  { rashi: 'සර්වචිත්ත සාධාරණ', count: 7, desc: 'සියලු සිත් 89/121 සමඟ යෙදේ' },
  { rashi: 'ප්‍රකීර්ණක', count: 6, desc: 'කුසලාකුසල ලෞකික ලෝකෝත්තර සිත් සමඟ සුදුසු පරිදි යෙදේ' },
  { rashi: 'අකුසල සාධාරණ', count: 4, desc: 'සියලු අකුසල සිත් 12 සමඟ යෙදේ' },
  { rashi: 'අකුසල අසාධාරණ', count: 10, desc: 'අදාළ අකුසල සිත් සමඟ පමණක් යෙදේ' },
  { rashi: 'සොභන සාධාරණ', count: 19, desc: 'සියලු සොභන සිත් 59 සමඟ යෙදේ' },
  { rashi: 'විරති', count: 3, desc: 'සිත් 16 සමඟ යෙදේ' },
  { rashi: 'අප්පමඤ්ඤා', count: 2, desc: 'සිත් 28 සමඟ යෙදේ' },
  { rashi: 'පඤ්ඤා', count: 1, desc: 'සිත් 47 සමඟ යෙදේ' }
];

// ============================================================
// 8. RENDER FUNCTIONS
// ============================================================

/**
 * සර්වචිත්ත සාධාරණ චෛතසික 7 - කාඩ්පත්
 */
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

/**
 * සර්වචිත්ත සාධාරණ චෛතසික 7 - වගුව
 */
function renderSabbacittaTable() {
  var tbody = document.getElementById('sabbacitta-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  
  sabbacittaData.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td class="num-col">' + item.num + '</td>' +
      '<td>' +
        '<div style="font-weight:700;">' + item.name + '</div>' +
        '<div style="font-size:0.7rem;color:#8b5cf6;font-style:italic;">' + item.pali + '</div>' +
        '<div style="font-size:0.7rem;line-height:1.5;margin-top:0.4rem;color:#666;" class="dark:text-slate-400">' + item.desc + '</div>' +
      '</td>' +
      '<td style="font-size:0.75rem;line-height:1.5;">' + item.lakshana + '</td>' +
      '<td class="count-col highlight">' + item.yedena + '</td>';
    tbody.appendChild(tr);
  });
}

/**
 * ප්‍රකීර්ණක චෛතසික 6 - කාඩ්පත්
 */
function renderPakirnakaCards() {
  var container = document.getElementById('pakirnaka-cards');
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
        '</div>' +
      '</div>';
    container.appendChild(div);
  });
}

/**
 * ප්‍රකීර්ණක චෛතසික 6 - වගුව
 */
function renderPakirnakaTable() {
  var tbody = document.getElementById('pakirnaka-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  
  pakirnakaData2.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td style="font-weight:700;">' + item.name + '</td>' +
      '<td class="count-col highlight">' + item.yedena + '</td>' +
      '<td style="text-align:center;font-weight:600;color:#ef4444;">' + item.noyedena + '</td>' +
      '<td style="font-size:0.75rem;line-height:1.5;">' + item.desc + '</td>';
    tbody.appendChild(tr);
  });
}

/**
 * අකුසල චෛතසික 14 - කාඩ්පත්
 */
function renderAkusalaCards() {
  var container = document.getElementById('akusala-cards');
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

/**
 * අකුසල චෛතසික 14 - වගුව
 */
function renderAkusalaTable() {
  var tbody = document.getElementById('akusala-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  
  akusalaData2.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td class="num-col">' + item.num + '</td>' +
      '<td>' +
        '<div style="font-weight:700;">' + item.name + '</div>' +
        '<div style="font-size:0.7rem;color:#ef4444;font-style:italic;">' + item.pali + '</div>' +
        '<div style="font-size:0.7rem;line-height:1.5;margin-top:0.4rem;color:#666;" class="dark:text-slate-400">' + item.desc + '</div>' +
      '</td>' +
      '<td style="font-size:0.75rem;line-height:1.5;">' + item.lakshana + '</td>' +
      '<td style="font-size:0.75rem;font-weight:600;color:#dc2626;">' + item.yedena + '</td>';
    tbody.appendChild(tr);
  });
}

/**
 * සොභන චෛතසික 25 - වගුව
 */
function renderSobhanaTable() {
  var tbody = document.getElementById('sobhana-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  
  sobhanaData.forEach(function(item) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td class="num-col">' + item.num + '</td>' +
      '<td>' +
        '<div style="font-weight:700;">' + item.name + '</div>' +
        '<div style="font-size:0.7rem;color:#10b981;font-style:italic;">' + item.pali + '</div>' +
        '<div style="font-size:0.7rem;line-height:1.5;margin-top:0.4rem;color:#666;" class="dark:text-slate-400">' + item.desc + '</div>' +
      '</td>' +
      '<td style="font-size:0.75rem;line-height:1.5;">' + item.lakshana + '</td>' +
      '<td style="font-size:0.75rem;font-weight:600;color:#059669;">' + item.yedena + '</td>';
    tbody.appendChild(tr);
  });
}

/**
 * ඉක්මන් සම්ප්‍රයෝග සාරාංශ වගුව
 */
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

// ============================================================
// 9. INITIALIZE APP
// ============================================================
function initCaitasikaApp() {
  console.log('[caitasika] Initializing...');
  
  // Render all sections
  renderSabbacittaCards();
  renderSabbacittaTable();
  renderPakirnakaCards();
  renderPakirnakaTable();
  renderAkusalaCards();
  renderAkusalaTable();
  renderSobhanaTable();
  renderQuickSamprayogaTable();
  
  console.log('[caitasika] Initialization complete');
  console.log('[caitasika] චෛතසික 52: සර්වචිත්ත 7 + ප්‍රකීර්ණක 6 + අකුසල 14 + සොභන 25');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCaitasikaApp);
} else {
  initCaitasikaApp();
}

// ============================================================
// 10. GLOBAL EXPORTS
// ============================================================
window.switchCaitasikaTab = switchCaitasikaTab;
window.toggleDarkMode = caitasikaToggleDarkMode;
window.caitasikaToggleDarkMode = caitasikaToggleDarkMode;