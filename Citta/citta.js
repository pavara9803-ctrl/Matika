/**
 * අභිධර්ම චිත්ත විභාගය - Universal Search & Logic
 * සම්පූර්ණ citta.js ගොනුව
 * 
 * මෙය citta.html සමඟ භාවිතා කිරීමට නිර්මාණය කර ඇත.
 * 
 * PDF ගොනුවට අනුව නිවැරදි කර ඇත:
 * - සිත්වල 'අර්ථය' කොටස ඉවත් කර ඇත
 * - සෑම සිතක්ම PDF ව්‍යුහයට අනුව වර්ග කර ඇත
 * - සන්තීරණ සහ සම්පටිච්ඡන සිත්වල 'විඤ්ඤාණ' පදය ඉවත් කර ඇත
 * - ධ්‍යාන නම් විස්තරාත්මකව දක්වා ඇත
 */

// ============================================================
// 1. සිත් 121 දත්ත (PDF පදනම් කරගෙන) - සම්පූර්ණ නිවැරදි කළ
// ============================================================
const citta121Data = {
  // --- මූලික සාරාංශය ---
  citta121Summary: {
    title: "සිත් 121 සාරාංශය",
    desc: "<div class='bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-900 p-4 rounded-xl border border-emerald-200 dark:border-slate-700'>" +
          "<p class='mb-2'>සිත් 89 ක් සහ සිත් 121 ක් අතර වෙනස පහත පරිදි වේ:</p>" +
          "<ul class='space-y-1'>" +
          "<li>• <strong>සිත් 89:</strong> ලෝකෝත්තර සිත් 8 ක් ලෙස ගණන් ගැනීම.</li>" +
          "<li>• <strong>සිත් 121:</strong> ලෝකෝත්තර සිත් 8 ම ධ්‍යාන 5 ක් සමඟ ගණන් ගැනීමෙන් 40 ක් වේ.</li>" +
          "<li>• එනම්, 89 - 8 + 40 = 121.</li>" +
          "</ul>" +
          "</div>" +
          "<hr class='my-3 border-amber-200 dark:border-slate-700'>" +
          "<p class='mb-2'><strong>සිත් 121 බෙදීම:</strong></p>" +
          "<div class='grid grid-cols-2 gap-2'>" +
          "<div class='bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg text-center'><span class='font-bold text-blue-800 dark:text-blue-200'>කාමාවචර 54</span></div>" +
          "<div class='bg-green-50 dark:bg-green-900/30 p-2 rounded-lg text-center'><span class='font-bold text-green-800 dark:text-green-200'>රූපාවචර 15</span></div>" +
          "<div class='bg-purple-50 dark:bg-purple-900/30 p-2 rounded-lg text-center'><span class='font-bold text-purple-800 dark:text-purple-200'>අරූපාවචර 12</span></div>" +
          "<div class='bg-amber-50 dark:bg-amber-900/30 p-2 rounded-lg text-center'><span class='font-bold text-amber-800 dark:text-amber-200'>ලෝකෝත්තර 40</span></div>" +
          "</div>"
  },

  // --- A1: අකුසල් සිත් 12 ---
  akusala12Full: {
    title: "A1 - අකුසල් සිත් 12",
    desc: "<p class='mb-3 text-slate-600 dark:text-slate-400'>ලෝභ, දෝස, මෝහ යන අකුසල මූලයන් මත පදනම්ව උපදින සිත් 12 කි.</p>" +
          
          // a ලෝභ 8
          "<div class='mb-4 bg-red-50/50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 overflow-hidden'>" +
          "<div class='bg-red-100 dark:bg-red-900/40 px-4 py-2 font-bold text-red-800 dark:text-red-200 flex items-center gap-2'><i class='fa-solid fa-fire'></i> a. ලෝභ මූලික සිත් 8</div>" +
          "<div class='p-3 space-y-2'><div class='grid grid-cols-1 sm:grid-cols-2 gap-2'>" +
          [1,2,3,4,5,6,7,8].map(i => {
            const feelings = i <= 4 ? 'සෝමනස්ස' : 'උපේක්ෂා';
            const ditthi = (i === 1 || i === 2 || i === 5 || i === 6) ? 'සම්පයුත්ත' : 'විප්පයුත්ත';
            const sankhara = (i % 2 === 1) ? 'අසංඛාරික' : 'සසංඛාරික';
            return `<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-red-100 dark:border-red-900/50 flex items-start gap-2'><span class='bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 text-xs font-bold px-2 py-0.5 rounded-full'>${i}</span><span class='text-sm'>${feelings} සහගත දිට්ඨිගත ${ditthi} ${sankhara} සිත</span></div>`;
          }).join('') +
          "</div></div></div>" +

          // b දෝස 2
          "<div class='mb-4 bg-amber-50/50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 overflow-hidden'>" +
          "<div class='bg-amber-100 dark:bg-amber-900/40 px-4 py-2 font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2'><i class='fa-solid fa-bolt'></i> b. දෝස මූලික සිත් 2</div>" +
          "<div class='p-3 space-y-2'><div class='grid grid-cols-1 sm:grid-cols-2 gap-2'>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-amber-100 dark:border-amber-900/50 flex items-start gap-2'><span class='bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 text-xs font-bold px-2 py-0.5 rounded-full'>9</span><span class='text-sm'>දෝමනස්ස සහගත පටිඝ සම්පයුත්ත අසංඛාරික සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-amber-100 dark:border-amber-900/50 flex items-start gap-2'><span class='bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 text-xs font-bold px-2 py-0.5 rounded-full'>10</span><span class='text-sm'>දෝමනස්ස සහගත පටිඝ සම්පයුත්ත සසංඛාරික සිත</span></div>" +
          "</div></div></div>" +

          // c මෝහ 2
          "<div class='bg-blue-50/50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 overflow-hidden'>" +
          "<div class='bg-blue-100 dark:bg-blue-900/40 px-4 py-2 font-bold text-blue-800 dark:text-blue-200 flex items-center gap-2'><i class='fa-solid fa-cloud'></i> c. මෝහ මූලික සිත් 2</div>" +
          "<div class='p-3 space-y-2'><div class='grid grid-cols-1 sm:grid-cols-2 gap-2'>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-blue-100 dark:border-blue-900/50 flex items-start gap-2'><span class='bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-bold px-2 py-0.5 rounded-full'>11</span><span class='text-sm'>උපේක්ෂා සහගත විචිකිච්ඡා සම්පයුත්ත සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-blue-100 dark:border-blue-900/50 flex items-start gap-2'><span class='bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-bold px-2 py-0.5 rounded-full'>12</span><span class='text-sm'>උපේක්ෂා සහගත උද්ධච්ච සම්පයුත්ත සිත</span></div>" +
          "</div></div></div>"
  },

  // --- A2: අහේතුක සිත් 18 ---
  ahetuka18Full: {
    title: "A2 - අහේතුක සිත් 18",
    desc: "<p class='mb-3 text-slate-600 dark:text-slate-400'>හේතු රහිතව උපදින සිත් 18 කි.</p>" +
          
          // a අකු.වි. 7
          "<div class='mb-4 bg-orange-50/50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800 overflow-hidden'>" +
          "<div class='bg-orange-100 dark:bg-orange-900/40 px-4 py-2 font-bold text-orange-800 dark:text-orange-200 flex items-center gap-2'><i class='fa-solid fa-circle-exclamation'></i> a. අකුසල විපාක සිත් 7</div>" +
          "<div class='p-3 space-y-2'><div class='grid grid-cols-1 sm:grid-cols-2 gap-2'>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-orange-100 dark:border-orange-900/50 flex items-start gap-2'><span class='bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-xs font-bold px-2 py-0.5 rounded-full'>13</span><span class='text-sm'>උපේක්ෂා සහගත චක්ඛු විඤ්ඤාණ සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-orange-100 dark:border-orange-900/50 flex items-start gap-2'><span class='bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-xs font-bold px-2 py-0.5 rounded-full'>14</span><span class='text-sm'>උපේක්ෂා සහගත සෝත විඤ්ඤාණ සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-orange-100 dark:border-orange-900/50 flex items-start gap-2'><span class='bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-xs font-bold px-2 py-0.5 rounded-full'>15</span><span class='text-sm'>උපේක්ෂා සහගත ඝාන විඤ්ඤාණ සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-orange-100 dark:border-orange-900/50 flex items-start gap-2'><span class='bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-xs font-bold px-2 py-0.5 rounded-full'>16</span><span class='text-sm'>උපේක්ෂා සහගත ජිව්හා විඤ්ඤාණ සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-orange-100 dark:border-orange-900/50 flex items-start gap-2'><span class='bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-xs font-bold px-2 py-0.5 rounded-full'>17</span><span class='text-sm'>දුක්ඛ සහගත කාය විඤ්ඤාණ සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-orange-100 dark:border-orange-900/50 flex items-start gap-2'><span class='bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-xs font-bold px-2 py-0.5 rounded-full'>18</span><span class='text-sm'>උපේක්ෂා සහගත සම්පටිච්ඡන සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-orange-100 dark:border-orange-900/50 flex items-start gap-2'><span class='bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-xs font-bold px-2 py-0.5 rounded-full'>19</span><span class='text-sm'>උපේක්ෂා සහගත සන්තීරණ සිත</span></div>" +
          "</div></div></div>" +

          // b කුසල අහේතුක විපාක 8
          "<div class='mb-4 bg-green-50/50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 overflow-hidden'>" +
          "<div class='bg-green-100 dark:bg-green-900/40 px-4 py-2 font-bold text-green-800 dark:text-green-200 flex items-center gap-2'><i class='fa-solid fa-check-circle'></i> b. කුසල අහේතුක විපාක සිත් 8</div>" +
          "<div class='p-3 space-y-2'><div class='grid grid-cols-1 sm:grid-cols-2 gap-2'>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-green-100 dark:border-green-900/50 flex items-start gap-2'><span class='bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-bold px-2 py-0.5 rounded-full'>20</span><span class='text-sm'>උපේක්ෂා සහගත චක්ඛු විඤ්ඤාණ සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-green-100 dark:border-green-900/50 flex items-start gap-2'><span class='bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-bold px-2 py-0.5 rounded-full'>21</span><span class='text-sm'>උපේක්ෂා සහගත සෝත විඤ්ඤාණ සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-green-100 dark:border-green-900/50 flex items-start gap-2'><span class='bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-bold px-2 py-0.5 rounded-full'>22</span><span class='text-sm'>උපේක්ෂා සහගත ඝාන විඤ්ඤාණ සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-green-100 dark:border-green-900/50 flex items-start gap-2'><span class='bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-bold px-2 py-0.5 rounded-full'>23</span><span class='text-sm'>උපේක්ෂා සහගත ජිව්හා විඤ්ඤාණ සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-green-100 dark:border-green-900/50 flex items-start gap-2'><span class='bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-bold px-2 py-0.5 rounded-full'>24</span><span class='text-sm'>සුඛ සහගත කාය විඤ්ඤාණ සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-green-100 dark:border-green-900/50 flex items-start gap-2'><span class='bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-bold px-2 py-0.5 rounded-full'>25</span><span class='text-sm'>උපේක්ෂා සහගත සම්පටිච්ඡන සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-green-100 dark:border-green-900/50 flex items-start gap-2'><span class='bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-bold px-2 py-0.5 rounded-full'>26</span><span class='text-sm'>සෝමනස්ස සහගත සන්තීරණ සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-green-100 dark:border-green-900/50 flex items-start gap-2'><span class='bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-bold px-2 py-0.5 rounded-full'>27</span><span class='text-sm'>උපේක්ෂා සහගත සන්තීරණ සිත</span></div>" +
          "</div></div></div>" +

          // c ක්‍රියා 3
          "<div class='bg-purple-50/50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800 overflow-hidden'>" +
          "<div class='bg-purple-100 dark:bg-purple-900/40 px-4 py-2 font-bold text-purple-800 dark:text-purple-200 flex items-center gap-2'><i class='fa-solid fa-person-running'></i> c. අහේතුක ක්‍රියා සිත් 3</div>" +
          "<div class='p-3 space-y-2'><div class='grid grid-cols-1 sm:grid-cols-2 gap-2'>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-purple-100 dark:border-purple-900/50 flex items-start gap-2'><span class='bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs font-bold px-2 py-0.5 rounded-full'>28</span><span class='text-sm'>උපේක්ෂා සහගත පංචද්වාරාවජ්ජන සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-purple-100 dark:border-purple-900/50 flex items-start gap-2'><span class='bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs font-bold px-2 py-0.5 rounded-full'>29</span><span class='text-sm'>උපේක්ෂා සහගත මනෝද්වාරාවජ්ජන සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-purple-100 dark:border-purple-900/50 flex items-start gap-2'><span class='bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs font-bold px-2 py-0.5 rounded-full'>30</span><span class='text-sm'>සෝමනස්ස සහගත හසිතුප්පාද සිත</span></div>" +
          "</div></div></div>"
  },

  // --- A3: කාම සෝභන 24 ---
  kamaKusala24Full: {
    title: "A3 - කාම සෝභන සිත් 24",
    desc: "<p class='mb-3 text-slate-600 dark:text-slate-400'>කාම සෝභන සිත් 24 කි. (කුසල් 8, විපාක 8, ක්‍රියා 8)</p>" +
          "<div class='grid grid-cols-1 md:grid-cols-3 gap-3'>" +
          
          // a කුසල් 8
          "<div class='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800 p-3'>" +
          "<div class='font-bold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2'><i class='fa-solid fa-seedling'></i> a. කුසල් සිත් 8</div>" +
          "<ul class='space-y-1 text-sm'>" +
          [1,2,3,4,5,6,7,8].map(i => {
            const feelings = i <= 4 ? 'සෝමනස්ස' : 'උපේක්ෂා';
            const nana = (i % 2 === 1) ? 'සම්පයුත්ත' : 'විප්පයුත්ත';
            const sankhara = (i % 2 === 0) ? 'සසංඛාරික' : 'අසංඛාරික';
            return `<li class='flex items-start gap-2'><span class='text-green-600 font-bold'>${i}.</span> ${feelings} සහගත ඤාණ${nana} ${sankhara} සිත</li>`;
          }).join('') +
          "</ul></div>" +

          // b විපාක 8
          "<div class='bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-3'>" +
          "<div class='font-bold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2'><i class='fa-solid fa-rotate-right'></i> b. විපාක සිත් 8</div>" +
          "<ul class='space-y-1 text-sm'>" +
          [1,2,3,4,5,6,7,8].map(i => {
            const feelings = i <= 4 ? 'සෝමනස්ස' : 'උපේක්ෂා';
            const nana = (i % 2 === 1) ? 'සම්පයුත්ත' : 'විප්පයුත්ත';
            const sankhara = (i % 2 === 0) ? 'සසංඛාරික' : 'අසංඛාරික';
            return `<li class='flex items-start gap-2'><span class='text-blue-600 font-bold'>${i}.</span> ${feelings} සහගත ඤාණ${nana} ${sankhara} සිත</li>`;
          }).join('') +
          "</ul></div>" +

          // c ක්‍රියා 8
          "<div class='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800 p-3'>" +
          "<div class='font-bold text-purple-800 dark:text-purple-200 mb-2 flex items-center gap-2'><i class='fa-solid fa-hand'></i> c. ක්‍රියා සිත් 8</div>" +
          "<ul class='space-y-1 text-sm'>" +
          [1,2,3,4,5,6,7,8].map(i => {
            const feelings = i <= 4 ? 'සෝමනස්ස' : 'උපේක්ෂා';
            const nana = (i % 2 === 1) ? 'සම්පයුත්ත' : 'විප්පයුත්ත';
            const sankhara = (i % 2 === 0) ? 'සසංඛාරික' : 'අසංඛාරික';
            return `<li class='flex items-start gap-2'><span class='text-purple-600 font-bold'>${i}.</span> ${feelings} සහගත ඤාණ${nana} ${sankhara} සිත</li>`;
          }).join('') +
          "</ul></div></div>"
  },

  // --- B1: රූපාවචර කුසල් 5 ---
  rupaKusala5Full: {
    title: "B1 - රූපාවචර කුසල් සිත් 5",
    desc: "<p class='mb-3 text-slate-600 dark:text-slate-400'>රූපාවචර කුසල් සිත් 5 කි.</p>" +
          "<div class='grid grid-cols-1 gap-2'>" +
          "<div class='bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800 flex items-start gap-2'><span class='bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-bold px-2 py-0.5 rounded-full'>1</span><span class='text-sm'><strong>විතක්ක, විචාර, පීති, සුඛ, ඒකග්ගතා</strong> සහිත ප්‍රථම ධ්‍යානය කුසල් සිත</span></div>" +
          "<div class='bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800 flex items-start gap-2'><span class='bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-bold px-2 py-0.5 rounded-full'>2</span><span class='text-sm'><strong>විචාර, පීති, සුඛ, ඒකග්ගතා</strong> සහිත දුතිය ධ්‍යානය කුසල් සිත</span></div>" +
          "<div class='bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800 flex items-start gap-2'><span class='bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-bold px-2 py-0.5 rounded-full'>3</span><span class='text-sm'><strong>පීති, සුඛ, ඒකග්ගතා</strong> සහිත තෘතීය ධ්‍යානය කුසල් සිත</span></div>" +
          "<div class='bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800 flex items-start gap-2'><span class='bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-bold px-2 py-0.5 rounded-full'>4</span><span class='text-sm'><strong>සුඛ, ඒකග්ගතා</strong> සහිත චතුර්ථ ධ්‍යානය කුසල් සිත</span></div>" +
          "<div class='bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800 flex items-start gap-2'><span class='bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-bold px-2 py-0.5 rounded-full'>5</span><span class='text-sm'><strong>උපේක්ෂා, ඒකග්ගතා</strong> සහිත පඤ්චම ධ්‍යානය කුසල් සිත</span></div>" +
          "</div>"
  },

  // --- B2: රූපාවචර විපාක 5 ---
  rupaVipaka5Full: {
    title: "B2 - රූපාවචර විපාක සිත් 5",
    desc: "<p class='mb-3 text-slate-600 dark:text-slate-400'>රූපාවචර විපාක සිත් 5 කි.</p>" +
          "<div class='grid grid-cols-1 gap-2'>" +
          [
            'විතක්ක විචාර පීති සුඛ ඒකග්ගතා සහිත ප්‍රථම ධ්‍යානය',
            'විචාර පීති සුඛ ඒකග්ගතා සහිත දුතිය ධ්‍යානය',
            'පීති සුඛ ඒකග්ගතා සහිත තෘතීය ධ්‍යානය',
            'සුඛ ඒකග්ගතා සහිත චතුර්ථ ධ්‍යානය',
            'උපේක්ෂා ඒකග්ගතා සහිත පඤ්චම ධ්‍යානය'
          ].map((n, i) => 
            `<div class='bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800 flex items-start gap-2'><span class='bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-bold px-2 py-0.5 rounded-full'>${i+1}</span><span class='text-sm'>${n} විපාක සිත</span></div>`
          ).join('') +
          "</div>"
  },

  // --- B3: රූපාවචර ක්‍රියා 5 ---
  rupaKriya5Full: {
    title: "B3 - රූපාවචර ක්‍රියා සිත් 5",
    desc: "<p class='mb-3 text-slate-600 dark:text-slate-400'>රූපාවචර ක්‍රියා සිත් 5 කි. මේවා රහතන් වහන්සේට පමණක් උපදින සිත් වේ.</p>" +
          "<div class='grid grid-cols-1 gap-2'>" +
          [
            'විතක්ක විචාර පීති සුඛ ඒකග්ගතා සහිත ප්‍රථම ධ්‍යානය',
            'විචාර පීති සුඛ ඒකග්ගතා සහිත දුතිය ධ්‍යානය',
            'පීති සුඛ ඒකග්ගතා සහිත තෘතීය ධ්‍යානය',
            'සුඛ ඒකග්ගතා සහිත චතුර්ථ ධ්‍යානය',
            'උපේක්ෂා ඒකග්ගතා සහිත පඤ්චම ධ්‍යානය'
          ].map((n, i) => 
            `<div class='bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800 flex items-start gap-2'><span class='bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs font-bold px-2 py-0.5 rounded-full'>${i+1}</span><span class='text-sm'>${n} ක්‍රියා සිත</span></div>`
          ).join('') +
          "</div>"
  },

  // --- C1: අරූපාවචර කුසල් 4 ---
  arupaKusala4Full: {
    title: "C1 - අරූපාවචර කුසල් සිත් 4",
    desc: "<p class='mb-3 text-slate-600 dark:text-slate-400'>අරූපාවචර කුසල් සිත් 4 කි.</p>" +
          "<div class='grid grid-cols-1 sm:grid-cols-2 gap-2'>" +
          ['ආකාසානඤ්චායතන', 'විඤ්ඤාණඤ්චායතන', 'ආකිඤ්චඤ්ඤායතන', 'නේවසඤ්ඤානාසඤ්ඤායතන'].map((n, i) => 
            `<div class='bg-green-50 dark:bg-green-900/20 p-2 rounded-lg border border-green-200 dark:border-green-800 flex items-start gap-2'><span class='bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-bold px-2 py-0.5 rounded-full'>${i+1}</span><span class='text-sm'>${n} කුසල් සිත</span></div>`
          ).join('') +
          "</div>"
  },

  // --- C2: අරූපාවචර විපාක 4 ---
  arupaVipaka4Full: {
    title: "C2 - අරූපාවචර විපාක සිත් 4",
    desc: "<p class='mb-3 text-slate-600 dark:text-slate-400'>අරූපාවචර විපාක සිත් 4 කි.</p>" +
          "<div class='grid grid-cols-1 sm:grid-cols-2 gap-2'>" +
          ['ආකාසානඤ්චායතන', 'විඤ්ඤාණඤ්චායතන', 'ආකිඤ්චඤ්ඤායතන', 'නේවසඤ්ඤානාසඤ්ඤායතන'].map((n, i) => 
            `<div class='bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg border border-blue-200 dark:border-blue-800 flex items-start gap-2'><span class='bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-bold px-2 py-0.5 rounded-full'>${i+1}</span><span class='text-sm'>${n} විපාක සිත</span></div>`
          ).join('') +
          "</div>"
  },

  // --- C3: අරූපාවචර ක්‍රියා 4 ---
  arupaKriya4Full: {
    title: "C3 - අරූපාවචර ක්‍රියා සිත් 4",
    desc: "<p class='mb-3 text-slate-600 dark:text-slate-400'>අරූපාවචර ක්‍රියා සිත් 4 කි. මේවා රහතන් වහන්සේට පමණක් උපදින සිත් වේ.</p>" +
          "<div class='grid grid-cols-1 sm:grid-cols-2 gap-2'>" +
          ['ආකාසානඤ්චායතන', 'විඤ්ඤාණඤ්චායතන', 'ආකිඤ්චඤ්ඤායතන', 'නේවසඤ්ඤානාසඤ්ඤායතන'].map((n, i) => 
            `<div class='bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg border border-purple-200 dark:border-purple-800 flex items-start gap-2'><span class='bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs font-bold px-2 py-0.5 rounded-full'>${i+1}</span><span class='text-sm'>${n} ක්‍රියා සිත</span></div>`
          ).join('') +
          "</div>"
  },

  // --- D1: ලෝකෝත්තර මාර්ග සිත් 20 ---
  lokuttaraMagga20Full: {
    title: "D1 - ලෝකෝත්තර මාර්ග සිත් 20",
    desc: "<p class='mb-3 text-slate-600 dark:text-slate-400'>ලෝකෝත්තර මාර්ග සිත් 20 කි. (ලෝකෝත්තර සිත් 8 ම ධ්‍යාන 5 සමඟ = 40)</p>" +
          "<div class='mb-4 bg-amber-50/50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 overflow-hidden'>" +
          "<div class='bg-amber-100 dark:bg-amber-900/40 px-4 py-2 font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2'><i class='fa-solid fa-road'></i> සෝතාපත්ති මග්ග සිත් 5</div>" +
          "<div class='p-3'><div class='grid grid-cols-1 gap-2'>" +
          [
            'විතක්ක විචාර පීති සුඛ ඒකග්ගතා සහිත ප්‍රථම ධ්‍යානය',
            'විචාර පීති සුඛ ඒකග්ගතා සහිත දුතිය ධ්‍යානය',
            'පීති සුඛ ඒකග්ගතා සහිත තෘතීය ධ්‍යානය',
            'සුඛ ඒකග්ගතා සහිත චතුර්ථ ධ්‍යානය',
            'උපේක්ෂා ඒකග්ගතා සහිත පඤ්චම ධ්‍යානය'
          ].map((n, i) => `<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-amber-100 dark:border-amber-900/50'><span class='text-sm'>${i+1}. සෝතාපත්ති මග්ග සිත - ${n}</span></div>`).join('') +
          "</div></div></div>" +
          "<div class='mb-4 bg-amber-50/50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 overflow-hidden'>" +
          "<div class='bg-amber-100 dark:bg-amber-900/40 px-4 py-2 font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2'><i class='fa-solid fa-road'></i> සකදාගාමි මග්ග සිත් 5</div>" +
          "<div class='p-3'><div class='grid grid-cols-1 gap-2'>" +
          [
            'විතක්ක විචාර පීති සුඛ ඒකග්ගතා සහිත ප්‍රථම ධ්‍යානය',
            'විචාර පීති සුඛ ඒකග්ගතා සහිත දුතිය ධ්‍යානය',
            'පීති සුඛ ඒකග්ගතා සහිත තෘතීය ධ්‍යානය',
            'සුඛ ඒකග්ගතා සහිත චතුර්ථ ධ්‍යානය',
            'උපේක්ෂා ඒකග්ගතා සහිත පඤ්චම ධ්‍යානය'
          ].map((n, i) => `<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-amber-100 dark:border-amber-900/50'><span class='text-sm'>${i+6}. සකදාගාමි මග්ග සිත - ${n}</span></div>`).join('') +
          "</div></div></div>" +
          "<div class='mb-4 bg-amber-50/50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 overflow-hidden'>" +
          "<div class='bg-amber-100 dark:bg-amber-900/40 px-4 py-2 font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2'><i class='fa-solid fa-road'></i> අනාගාමි මග්ග සිත් 5</div>" +
          "<div class='p-3'><div class='grid grid-cols-1 gap-2'>" +
          [
            'විතක්ක විචාර පීති සුඛ ඒකග්ගතා සහිත ප්‍රථම ධ්‍යානය',
            'විචාර පීති සුඛ ඒකග්ගතා සහිත දුතිය ධ්‍යානය',
            'පීති සුඛ ඒකග්ගතා සහිත තෘතීය ධ්‍යානය',
            'සුඛ ඒකග්ගතා සහිත චතුර්ථ ධ්‍යානය',
            'උපේක්ෂා ඒකග්ගතා සහිත පඤ්චම ධ්‍යානය'
          ].map((n, i) => `<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-amber-100 dark:border-amber-900/50'><span class='text-sm'>${i+11}. අනාගාමි මග්ග සිත - ${n}</span></div>`).join('') +
          "</div></div></div>" +
          "<div class='bg-amber-50/50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 overflow-hidden'>" +
          "<div class='bg-amber-100 dark:bg-amber-900/40 px-4 py-2 font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2'><i class='fa-solid fa-road'></i> අරහත් මග්ග සිත් 5</div>" +
          "<div class='p-3'><div class='grid grid-cols-1 gap-2'>" +
          [
            'විතක්ක විචාර පීති සුඛ ඒකග්ගතා සහිත ප්‍රථම ධ්‍යානය',
            'විචාර පීති සුඛ ඒකග්ගතා සහිත දුතිය ධ්‍යානය',
            'පීති සුඛ ඒකග්ගතා සහිත තෘතීය ධ්‍යානය',
            'සුඛ ඒකග්ගතා සහිත චතුර්ථ ධ්‍යානය',
            'උපේක්ෂා ඒකග්ගතා සහිත පඤ්චම ධ්‍යානය'
          ].map((n, i) => `<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-amber-100 dark:border-amber-900/50'><span class='text-sm'>${i+16}. අරහත් මග්ග සිත - ${n}</span></div>`).join('') +
          "</div></div></div>"
  },

  // --- D2: ලෝකෝත්තර ඵල සිත් 20 ---
  lokuttaraPhala20Full: {
    title: "D2 - ලෝකෝත්තර ඵල සිත් 20",
    desc: "<p class='mb-3 text-slate-600 dark:text-slate-400'>ලෝකෝත්තර ඵල සිත් 20 කි.</p>" +
          "<div class='mb-4 bg-rose-50/50 dark:bg-rose-900/20 rounded-xl border border-rose-200 dark:border-rose-800 overflow-hidden'>" +
          "<div class='bg-rose-100 dark:bg-rose-900/40 px-4 py-2 font-bold text-rose-800 dark:text-rose-200 flex items-center gap-2'><i class='fa-solid fa-trophy'></i> සෝතාපත්ති ඵල සිත් 5</div>" +
          "<div class='p-3'><div class='grid grid-cols-1 gap-2'>" +
          [
            'විතක්ක විචාර පීති සුඛ ඒකග්ගතා සහිත ප්‍රථම ධ්‍යානය',
            'විචාර පීති සුඛ ඒකග්ගතා සහිත දුතිය ධ්‍යානය',
            'පීති සුඛ ඒකග්ගතා සහිත තෘතීය ධ්‍යානය',
            'සුඛ ඒකග්ගතා සහිත චතුර්ථ ධ්‍යානය',
            'උපේක්ෂා ඒකග්ගතා සහිත පඤ්චම ධ්‍යානය'
          ].map((n, i) => `<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-rose-100 dark:border-rose-900/50'><span class='text-sm'>${i+1}. සෝතාපත්ති ඵල සිත - ${n}</span></div>`).join('') +
          "</div></div></div>" +
          "<div class='mb-4 bg-rose-50/50 dark:bg-rose-900/20 rounded-xl border border-rose-200 dark:border-rose-800 overflow-hidden'>" +
          "<div class='bg-rose-100 dark:bg-rose-900/40 px-4 py-2 font-bold text-rose-800 dark:text-rose-200 flex items-center gap-2'><i class='fa-solid fa-trophy'></i> සකදාගාමි ඵල සිත් 5</div>" +
          "<div class='p-3'><div class='grid grid-cols-1 gap-2'>" +
          [
            'විතක්ක විචාර පීති සුඛ ඒකග්ගතා සහිත ප්‍රථම ධ්‍යානය',
            'විචාර පීති සුඛ ඒකග්ගතා සහිත දුතිය ධ්‍යානය',
            'පීති සුඛ ඒකග්ගතා සහිත තෘතීය ධ්‍යානය',
            'සුඛ ඒකග්ගතා සහිත චතුර්ථ ධ්‍යානය',
            'උපේක්ෂා ඒකග්ගතා සහිත පඤ්චම ධ්‍යානය'
          ].map((n, i) => `<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-rose-100 dark:border-rose-900/50'><span class='text-sm'>${i+6}. සකදාගාමි ඵල සිත - ${n}</span></div>`).join('') +
          "</div></div></div>" +
          "<div class='mb-4 bg-rose-50/50 dark:bg-rose-900/20 rounded-xl border border-rose-200 dark:border-rose-800 overflow-hidden'>" +
          "<div class='bg-rose-100 dark:bg-rose-900/40 px-4 py-2 font-bold text-rose-800 dark:text-rose-200 flex items-center gap-2'><i class='fa-solid fa-trophy'></i> අනාගාමි ඵල සිත් 5</div>" +
          "<div class='p-3'><div class='grid grid-cols-1 gap-2'>" +
          [
            'විතක්ක විචාර පීති සුඛ ඒකග්ගතා සහිත ප්‍රථම ධ්‍යානය',
            'විචාර පීති සුඛ ඒකග්ගතා සහිත දුතිය ධ්‍යානය',
            'පීති සුඛ ඒකග්ගතා සහිත තෘතීය ධ්‍යානය',
            'සුඛ ඒකග්ගතා සහිත චතුර්ථ ධ්‍යානය',
            'උපේක්ෂා ඒකග්ගතා සහිත පඤ්චම ධ්‍යානය'
          ].map((n, i) => `<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-rose-100 dark:border-rose-900/50'><span class='text-sm'>${i+11}. අනාගාමි ඵල සිත - ${n}</span></div>`).join('') +
          "</div></div></div>" +
          "<div class='bg-rose-50/50 dark:bg-rose-900/20 rounded-xl border border-rose-200 dark:border-rose-800 overflow-hidden'>" +
          "<div class='bg-rose-100 dark:bg-rose-900/40 px-4 py-2 font-bold text-rose-800 dark:text-rose-200 flex items-center gap-2'><i class='fa-solid fa-trophy'></i> අරහත් ඵල සිත් 5</div>" +
          "<div class='p-3'><div class='grid grid-cols-1 gap-2'>" +
          [
            'විතක්ක විචාර පීති සුඛ ඒකග්ගතා සහිත ප්‍රථම ධ්‍යානය',
            'විචාර පීති සුඛ ඒකග්ගතා සහිත දුතිය ධ්‍යානය',
            'පීති සුඛ ඒකග්ගතා සහිත තෘතීය ධ්‍යානය',
            'සුඛ ඒකග්ගතා සහිත චතුර්ථ ධ්‍යානය',
            'උපේක්ෂා ඒකග්ගතා සහිත පඤ්චම ධ්‍යානය'
          ].map((n, i) => `<div class='bg-white dark:bg-slate-800 p-2 rounded-lg border border-rose-100 dark:border-rose-900/50'><span class='text-sm'>${i+16}. අරහත් ඵල සිත - ${n}</span></div>`).join('') +
          "</div></div></div>"
  },

  // ============================================================
  // වෙනම සිත් කාණ්ඩ (PDF අනුව වෙන් වෙන්ව)
  // ============================================================
  
  lobha8Full: {
    title: "a. ලෝභ මූලික සිත් 8 (A1)",
    desc: "<div class='grid grid-cols-1 sm:grid-cols-2 gap-2'>" +
          [1,2,3,4,5,6,7,8].map(i => {
            const feelings = i <= 4 ? 'සෝමනස්ස' : 'උපේක්ෂා';
            const ditthi = (i === 1 || i === 2 || i === 5 || i === 6) ? 'සම්පයුත්ත' : 'විප්පයුත්ත';
            const sankhara = (i % 2 === 1) ? 'අසංඛාරික' : 'සසංඛාරික';
            return `<div class='bg-red-50 dark:bg-red-900/20 p-2 rounded-lg border border-red-200 dark:border-red-800 flex items-start gap-2'><span class='bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 text-xs font-bold px-2 py-0.5 rounded-full'>${i}</span><span class='text-sm'>${feelings} සහගත දිට්ඨිගත ${ditthi} ${sankhara} සිත</span></div>`;
          }).join('') +
          "</div>"
  },
  
  dosa2Full: {
    title: "b. දෝස මූලික සිත් 2 (A1)",
    desc: "<div class='grid grid-cols-1 sm:grid-cols-2 gap-2'>" +
          "<div class='bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg border border-amber-200 dark:border-amber-800 flex items-start gap-2'><span class='bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 text-xs font-bold px-2 py-0.5 rounded-full'>9</span><span class='text-sm'>දෝමනස්ස සහගත පටිඝ සම්පයුත්ත අසංඛාරික සිත</span></div>" +
          "<div class='bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg border border-amber-200 dark:border-amber-800 flex items-start gap-2'><span class='bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 text-xs font-bold px-2 py-0.5 rounded-full'>10</span><span class='text-sm'>දෝමනස්ස සහගත පටිඝ සම්පයුත්ත සසංඛාරික සිත</span></div>" +
          "</div>"
  },
  
  moha2Full: {
    title: "c. මෝහ මූලික සිත් 2 (A1)",
    desc: "<div class='grid grid-cols-1 sm:grid-cols-2 gap-2'>" +
          "<div class='bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg border border-blue-200 dark:border-blue-800 flex items-start gap-2'><span class='bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-bold px-2 py-0.5 rounded-full'>11</span><span class='text-sm'>උපේක්ෂා සහගත විචිකිච්ඡා සම්පයුත්ත සිත</span></div>" +
          "<div class='bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg border border-blue-200 dark:border-blue-800 flex items-start gap-2'><span class='bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-bold px-2 py-0.5 rounded-full'>12</span><span class='text-sm'>උපේක්ෂා සහගත උද්ධච්ච සම්පයුත්ත සිත</span></div>" +
          "</div>"
  },
  
  akusalaVipaka7Full: {
    title: "a. අකුසල විපාක සිත් 7 (A2)",
    desc: "<div class='grid grid-cols-1 sm:grid-cols-2 gap-2'>" +
          [13,14,15,16,17,18,19].map(i => {
            const feeling = (i === 17) ? 'දුක්ඛ' : 'උපේක්ෂා';
            const door = i === 13 ? 'චක්ඛු' : i === 14 ? 'සෝත' : i === 15 ? 'ඝාන' : i === 16 ? 'ජිව්හා' : i === 17 ? 'කාය' : i === 18 ? 'සම්පටිච්ඡන' : 'සන්තීරණ';
            const suffix = (door === 'සම්පටිච්ඡන' || door === 'සන්තීරණ') ? '' : ' විඤ්ඤාණ';
            return `<div class='bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg border border-orange-200 dark:border-orange-800 flex items-start gap-2'><span class='bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-xs font-bold px-2 py-0.5 rounded-full'>${i}</span><span class='text-sm'>${feeling} සහගත ${door}${suffix} සිත</span></div>`;
          }).join('') +
          "</div>"
  },
  
  kusalaAhetuka8Full: {
    title: "b. කුසල අහේතුක විපාක සිත් 8 (A2)",
    desc: "<div class='grid grid-cols-1 sm:grid-cols-2 gap-2'>" +
          [20,21,22,23,24,25,26,27].map(i => {
            const feeling = (i === 24) ? 'සුඛ' : (i === 26) ? 'සෝමනස්ස' : 'උපේක්ෂා';
            const door = i === 20 ? 'චක්ඛු' : i === 21 ? 'සෝත' : i === 22 ? 'ඝාන' : i === 23 ? 'ජිව්හා' : i === 24 ? 'කාය' : i === 25 ? 'සම්පටිච්ඡන' : 'සන්තීරණ';
            const suffix = (door === 'සම්පටිච්ඡන' || door === 'සන්තීරණ') ? '' : ' විඤ්ඤාණ';
            return `<div class='bg-green-50 dark:bg-green-900/20 p-2 rounded-lg border border-green-200 dark:border-green-800 flex items-start gap-2'><span class='bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-bold px-2 py-0.5 rounded-full'>${i}</span><span class='text-sm'>${feeling} සහගත ${door}${suffix} සිත</span></div>`;
          }).join('') +
          "</div>"
  },
  
  ahetukaKriya3Full: {
    title: "c. අහේතුක ක්‍රියා සිත් 3 (A2)",
    desc: "<div class='grid grid-cols-1 sm:grid-cols-2 gap-2'>" +
          "<div class='bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg border border-purple-200 dark:border-purple-800 flex items-start gap-2'><span class='bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs font-bold px-2 py-0.5 rounded-full'>28</span><span class='text-sm'>උපේක්ෂා සහගත පංචද්වාරාවජ්ජන සිත</span></div>" +
          "<div class='bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg border border-purple-200 dark:border-purple-800 flex items-start gap-2'><span class='bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs font-bold px-2 py-0.5 rounded-full'>29</span><span class='text-sm'>උපේක්ෂා සහගත මනෝද්වාරාවජ්ජන සිත</span></div>" +
          "<div class='bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg border border-purple-200 dark:border-purple-800 flex items-start gap-2'><span class='bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs font-bold px-2 py-0.5 rounded-full'>30</span><span class='text-sm'>සෝමනස්ස සහගත හසිතුප්පාද සිත</span></div>" +
          "</div>"
  },
  
  kamaKusala8Full: {
    title: "a. කාම සෝභන කුසල් සිත් 8 (A3)",
    desc: "<div class='grid grid-cols-1 sm:grid-cols-2 gap-2'>" +
          [1,2,3,4,5,6,7,8].map(i => {
            const feelings = i <= 4 ? 'සෝමනස්ස' : 'උපේක්ෂා';
            const nana = (i % 2 === 1) ? 'සම්පයුත්ත' : 'විප්පයුත්ත';
            const sankhara = (i % 2 === 0) ? 'සසංඛාරික' : 'අසංඛාරික';
            return `<div class='bg-green-50 dark:bg-green-900/20 p-2 rounded-lg border border-green-200 dark:border-green-800 flex items-start gap-2'><span class='bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-bold px-2 py-0.5 rounded-full'>${i}</span><span class='text-sm'>${feelings} සහගත ඤාණ${nana} ${sankhara} සිත</span></div>`;
          }).join('') +
          "</div>"
  },
  
  kamaVipaka8Full: {
    title: "b. කාම සෝභන විපාක සිත් 8 (A3)",
    desc: "<div class='grid grid-cols-1 sm:grid-cols-2 gap-2'>" +
          [1,2,3,4,5,6,7,8].map(i => {
            const feelings = i <= 4 ? 'සෝමනස්ස' : 'උපේක්ෂා';
            const nana = (i % 2 === 1) ? 'සම්පයුත්ත' : 'විප්පයුත්ත';
            const sankhara = (i % 2 === 0) ? 'සසංඛාරික' : 'අසංඛාරික';
            return `<div class='bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg border border-blue-200 dark:border-blue-800 flex items-start gap-2'><span class='bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-bold px-2 py-0.5 rounded-full'>${i}</span><span class='text-sm'>${feelings} සහගත ඤාණ${nana} ${sankhara} සිත</span></div>`;
          }).join('') +
          "</div>"
  },
  
  kamaKriya8Full: {
    title: "c. කාම සෝභන ක්‍රියා සිත් 8 (A3)",
    desc: "<div class='grid grid-cols-1 sm:grid-cols-2 gap-2'>" +
          [1,2,3,4,5,6,7,8].map(i => {
            const feelings = i <= 4 ? 'සෝමනස්ස' : 'උපේක්ෂා';
            const nana = (i % 2 === 1) ? 'සම්පයුත්ත' : 'විප්පයුත්ත';
            const sankhara = (i % 2 === 0) ? 'සසංඛාරික' : 'අසංඛාරික';
            return `<div class='bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg border border-purple-200 dark:border-purple-800 flex items-start gap-2'><span class='bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs font-bold px-2 py-0.5 rounded-full'>${i}</span><span class='text-sm'>${feelings} සහගත ඤාණ${nana} ${sankhara} සිත</span></div>`;
          }).join('') +
          "</div>"
  }
};

// ============================================================
// 2. චිත්ත විභාගයට අදාළ මූලික දත්ත (PDF ගොනුවට අනුව නිවැරදි කළ)
// 'අර්ථය' කොටස ඉවත් කර ඇත
// ============================================================
const cittaData = [
  {
    category: "සිත් 89 (මූලික විභාගය)",
    description: "බුදුරජාණන් වහන්සේ විසින් දේශනා කරන ලද සියලුම සිත් 89 ක් පහත පරිදි වර්ගීකරණය කළ හැක.",
    items: [
      { name: "කාමාවචර සිත්", role: "54" },
      { name: "රූපාවචර සිත්", role: "15" },
      { name: "අරූපාවචර සිත්", role: "12" },
      { name: "ලෝකෝත්තර සිත්", role: "8" }
    ]
  },
  {
    category: "A. කාමාවචර සිත් 54",
    description: "කාම ලෝකයට අයත් සිත් 54 කි. (අකුසල් 12, අහේතුක 18, කාම සෝහන 24)",
    items: [
      { name: "A1. අකුසල් සිත්", role: "12" },
      { name: "A2. අහේතුක සිත්", role: "18" },
      { name: "A3. කාම සෝහන සිත්", role: "24" }
    ]
  },
  {
    category: "A1. අකුසල් සිත් 12",
    description: "ලෝභ, දෝස, මෝහ යන අකුසල මූලයන් මත පදනම්ව උපදින සිත් 12 කි.",
    items: [
      { name: "a. ලෝභ මූලික සිත්", role: "8" },
      { name: "b. දෝස මූලික සිත්", role: "2" },
      { name: "c. මෝහ මූලික සිත්", role: "2" }
    ]
  },
  {
    category: "A2. අහේතුක සිත් 18",
    description: "හේතු රහිතව උපදින සිත් 18 කි.",
    items: [
      { name: "a. අකුසල විපාක සිත්", role: "7" },
      { name: "b. කුසල අහේතුක විපාක සිත්", role: "8" },
      { name: "c. අහේතුක ක්‍රියා සිත්", role: "3" }
    ]
  },
  {
    category: "A3. කාම සෝහන සිත් 24",
    description: "කාම සෝභන සිත් 24 කි.",
    items: [
      { name: "a. කුසල් සිත්", role: "8" },
      { name: "b. විපාක සිත්", role: "8" },
      { name: "c. ක්‍රියා සිත්", role: "8" }
    ]
  },
  {
    category: "B. රූපාවචර සිත් 15",
    description: "රූපාවචර ධ්‍යාන සිත් 15 කි.",
    items: [
      { name: "B1. කුසල් සිත්", role: "5" },
      { name: "B2. විපාක සිත්", role: "5" },
      { name: "B3. ක්‍රියා සිත්", role: "5" }
    ]
  },
  {
    category: "B1. රූපාවචර කුසල් සිත් 5",
    description: "රූපාවචර කුසල් සිත් 5 කි. (ප්‍රථම, දුතිය, තෘතීය, චතුර්ථ, පඤ්චම ධ්‍යාන)",
    items: [
      { name: "ප්‍රථම ධ්‍යානය", role: "විතක්ක, විචාර, පීති, සුඛ, ඒකග්ගතා" },
      { name: "දුතිය ධ්‍යානය", role: "විචාර, පීති, සුඛ, ඒකග්ගතා" },
      { name: "තෘතීය ධ්‍යානය", role: "පීති, සුඛ, ඒකග්ගතා" },
      { name: "චතුර්ථ ධ්‍යානය", role: "සුඛ, ඒකග්ගතා" },
      { name: "පඤ්චම ධ්‍යානය", role: "උපේක්ෂා, ඒකග්ගතා" }
    ]
  },
  {
    category: "B2. රූපාවචර විපාක සිත් 5",
    description: "රූපාවචර විපාක සිත් 5 කි. (ප්‍රථම, දුතිය, තෘතීය, චතුර්ථ, පඤ්චම ධ්‍යාන)",
    items: [
      { name: "ප්‍රථම ධ්‍යානය", role: "විතක්ක, විචාර, පීති, සුඛ, ඒකග්ගතා" },
      { name: "දුතිය ධ්‍යානය", role: "විචාර, පීති, සුඛ, ඒකග්ගතා" },
      { name: "තෘතීය ධ්‍යානය", role: "පීති, සුඛ, ඒකග්ගතා" },
      { name: "චතුර්ථ ධ්‍යානය", role: "සුඛ, ඒකග්ගතා" },
      { name: "පඤ්චම ධ්‍යානය", role: "උපේක්ෂා, ඒකග්ගතා" }
    ]
  },
  {
    category: "B3. රූපාවචර ක්‍රියා සිත් 5",
    description: "රූපාවචර ක්‍රියා සිත් 5 කි. (රහතන් වහන්සේට පමණක්)",
    items: [
      { name: "ප්‍රථම ධ්‍යානය", role: "විතක්ක, විචාර, පීති, සුඛ, ඒකග්ගතා" },
      { name: "දුතිය ධ්‍යානය", role: "විචාර, පීති, සුඛ, ඒකග්ගතා" },
      { name: "තෘතීය ධ්‍යානය", role: "පීති, සුඛ, ඒකග්ගතා" },
      { name: "චතුර්ථ ධ්‍යානය", role: "සුඛ, ඒකග්ගතා" },
      { name: "පඤ්චම ධ්‍යානය", role: "උපේක්ෂා, ඒකග්ගතා" }
    ]
  },
  {
    category: "C. අරූපාවචර සිත් 12",
    description: "අරූපාවචර ධ්‍යාන සිත් 12 කි.",
    items: [
      { name: "C1. කුසල් සිත්", role: "4" },
      { name: "C2. විපාක සිත්", role: "4" },
      { name: "C3. ක්‍රියා සිත්", role: "4" }
    ]
  },
  {
    category: "C1. අරූපාවචර කුසල් සිත් 4",
    description: "අරූපාවචර කුසල් සිත් 4 කි.",
    items: [
      { name: "ආකාසානඤ්චායතන කුසල් සිත", role: "1" },
      { name: "විඤ්ඤාණඤ්චායතන කුසල් සිත", role: "1" },
      { name: "ආකිඤ්චඤ්ඤායතන කුසල් සිත", role: "1" },
      { name: "නේවසඤ්ඤානාසඤ්ඤායතන කුසල් සිත", role: "1" }
    ]
  },
  {
    category: "C2. අරූපාවචර විපාක සිත් 4",
    description: "අරූපාවචර විපාක සිත් 4 කි.",
    items: [
      { name: "ආකාසානඤ්චායතන විපාක සිත", role: "1" },
      { name: "විඤ්ඤාණඤ්චායතන විපාක සිත", role: "1" },
      { name: "ආකිඤ්චඤ්ඤායතන විපාක සිත", role: "1" },
      { name: "නේවසඤ්ඤානාසඤ්ඤායතන විපාක සිත", role: "1" }
    ]
  },
  {
    category: "C3. අරූපාවචර ක්‍රියා සිත් 4",
    description: "අරූපාවචර ක්‍රියා සිත් 4 කි. (රහතන් වහන්සේට පමණක්)",
    items: [
      { name: "ආකාසානඤ්චායතන ක්‍රියා සිත", role: "1" },
      { name: "විඤ්ඤාණඤ්චායතන ක්‍රියා සිත", role: "1" },
      { name: "ආකිඤ්චඤ්ඤායතන ක්‍රියා සිත", role: "1" },
      { name: "නේවසඤ්ඤානාසඤ්ඤායතන ක්‍රියා සිත", role: "1" }
    ]
  },
  {
    category: "D. ලෝකෝත්තර සිත් 8/40",
    description: "ලෝකෝත්තර සිත් 8 කි. ධ්‍යාන 5 සමඟ ගණන් ගැනීමෙන් 40 ක් වේ.",
    items: [
      { name: "D1. කුසල් (මාර්ග) සිත්", role: "4 / 20" },
      { name: "D2. විපාක (ඵල) සිත්", role: "4 / 20" }
    ]
  },
  {
    category: "D1. ලෝකෝත්තර මාර්ග සිත් 4/20",
    description: "ලෝකෝත්තර මාර්ග සිත් 4 කි. ධ්‍යාන 5 සමඟ ගණන් ගැනීමෙන් 20 ක් වේ.",
    items: [
      { name: "සෝතාපත්ති මග්ග සිත්", role: "1 / 5" },
      { name: "සකදාගාමි මග්ග සිත්", role: "1 / 5" },
      { name: "අනාගාමි මග්ග සිත්", role: "1 / 5" },
      { name: "අරහත් මග්ග සිත්", role: "1 / 5" }
    ]
  },
  {
    category: "D2. ලෝකෝත්තර ඵල සිත් 4/20",
    description: "ලෝකෝත්තර ඵල සිත් 4 කි. ධ්‍යාන 5 සමඟ ගණන් ගැනීමෙන් 20 ක් වේ.",
    items: [
      { name: "සෝතාපත්ති ඵල සිත්", role: "1 / 5" },
      { name: "සකදාගාමි ඵල සිත්", role: "1 / 5" },
      { name: "අනාගාමි ඵල සිත්", role: "1 / 5" },
      { name: "අරහත් ඵල සිත්", role: "1 / 5" }
    ]
  }
];

// ============================================================
// 3. සහායක ශ්‍රිත
// ============================================================
function stripHtml(html) {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

// ============================================================
// 4. UI ටොගල් ක්‍රියාකාරීත්වය
// ============================================================
function toggleCitta121Section() {
  const subContainer = document.getElementById("citta121SubContainer");
  const arrowIcon = document.getElementById("citta121-arrow");
  if (subContainer) {
    subContainer.classList.toggle("hidden");
    if (arrowIcon) arrowIcon.classList.toggle("rotate-180");
  }
}

function toggleMainSection() {
  const subContainer = document.getElementById("subContainer");
  const arrowIcon = document.getElementById("vibhaga-arrow");
  if (subContainer) {
    subContainer.classList.toggle("hidden");
    if (arrowIcon) arrowIcon.classList.toggle("rotate-180");
  }
}

// ============================================================
// 5. තොරතුරු පෙන්වීමේ ශ්‍රිත
// ============================================================
function showInfo121(event, key) {
  const data = citta121Data[key];
  if (!data) {
    console.warn('No data found for key:', key);
    return;
  }

  const button = event.currentTarget;
  const group = button.closest('.citta-group');
  
  if (!group) {
    console.warn('Group not found for button:', button);
    return;
  }

  document.querySelectorAll('[id^="citta121DisplayGroup"]').forEach(el => el.classList.add("hidden"));

  const displayBox = group.querySelector('[id^="citta121DisplayGroup"]');
  if (displayBox) {
    const titleEl = displayBox.querySelector('h3');
    const detailsEl = displayBox.querySelector('div');
    if (titleEl) titleEl.innerText = data.title;
    if (detailsEl) detailsEl.innerHTML = data.desc;
    displayBox.classList.remove("hidden");
  }

  const buttons = group.querySelectorAll(".sub-btn-121");
  buttons.forEach(btn => {
    btn.classList.remove("bg-emerald-500", "text-white", "bg-red-500", "bg-orange-500", "bg-green-500", "bg-amber-500", "bg-purple-500", "bg-rose-500");
    btn.classList.add("bg-white", "dark:bg-slate-900");
  });

  if (button) {
    let activeClass = "bg-emerald-500";
    const groupNum = group.getAttribute('data-group');
    
    switch(groupNum) {
      case '1': activeClass = "bg-emerald-500"; break;
      case '2': activeClass = "bg-red-500"; break;
      case '3': activeClass = "bg-orange-500"; break;
      case '4': activeClass = "bg-green-500"; break;
      case '5': activeClass = "bg-amber-500"; break;
      case '6': activeClass = "bg-purple-500"; break;
      case '7': activeClass = "bg-rose-500"; break;
      default: activeClass = "bg-emerald-500";
    }
    
    button.classList.add(activeClass, "text-white");
    button.classList.remove("bg-white", "dark:bg-slate-900");
  }
}

// ============================================================
// 6. Universal Search & Dynamic Rendering
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("citta-container");
  const searchInput = document.getElementById("search-input");
  const totalCountEl = document.getElementById("total-count");

  function renderUnifiedSearch(query = "") {
    if (!container) return;
    container.innerHTML = "";
    const cleanQuery = query.trim().toLowerCase();

    if (!cleanQuery) {
      let count = 0;
      cittaData.forEach((section) => {
        count += section.items.length;
        const card = document.createElement("div");
        card.className = "bg-white dark:bg-slate-800 rounded-2xl border border-amber-200/80 dark:border-slate-700 p-5 shadow-sm space-y-3 card-hover";

        const title = document.createElement("h3");
        title.className = "text-lg font-bold text-maroon-900 dark:text-saffron-200 border-b border-amber-100 dark:border-slate-700 pb-2";
        title.textContent = section.category;

        const desc = document.createElement("p");
        desc.className = "text-xs sm:text-sm text-slate-600 dark:text-slate-400";
        desc.textContent = section.description;

        const tableWrapper = document.createElement("div");
        tableWrapper.className = "overflow-x-auto rounded-xl border border-amber-100 dark:border-slate-700";

        const table = document.createElement("table");
        table.className = "w-full text-left text-xs sm:text-sm";
        table.innerHTML = `
          <thead class="bg-amber-50/70 dark:bg-slate-900/60 text-maroon-950 dark:text-saffron-300 font-bold border-b border-amber-100 dark:border-slate-700">
            <tr>
              <th class="py-3 px-4">සිතේ නම</th>
              <th class="py-3 px-4">ගණන / ලක්ෂණය</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-amber-100/60 dark:divide-slate-700/60">
            ${section.items.map(item => `
              <tr class="hover:bg-amber-50/30 dark:hover:bg-slate-700/30 transition-colors">
                <td class="py-3 px-4 font-bold text-amber-950 dark:text-slate-100 whitespace-nowrap">${item.name}</td>
                <td class="py-3 px-4 text-slate-700 dark:text-slate-300">${item.role}</td>
              </tr>
            `).join("")}
          </tbody>
        `;

        tableWrapper.appendChild(table);
        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(tableWrapper);
        container.appendChild(card);
      });

      if (totalCountEl) totalCountEl.textContent = `ප්‍රදර්ශනය වන සිත් ගණන: ${count}`;
      return;
    }

    let matchedCittaCount = 0;
    let matched121Count = 0;

    const matchedSections = [];
    cittaData.forEach((section) => {
      const filtered = section.items.filter(item => 
        item.name.toLowerCase().includes(cleanQuery) ||
        item.role.toLowerCase().includes(cleanQuery) ||
        section.category.toLowerCase().includes(cleanQuery)
      );
      if (filtered.length > 0) {
        matchedSections.push({ category: section.category, description: section.description, items: filtered });
        matchedCittaCount += filtered.length;
      }
    });

    const matched121 = [];
    Object.keys(citta121Data).forEach(key => {
      const item = citta121Data[key];
      const plainDesc = stripHtml(item.desc).toLowerCase();
      if (item.title.toLowerCase().includes(cleanQuery) || plainDesc.includes(cleanQuery)) {
        matched121.push(item);
        matched121Count++;
      }
    });

    if (totalCountEl) {
      totalCountEl.textContent = `සෙවුම් ප්‍රතිඵල: සිත් ${matchedCittaCount} | 121 ${matched121Count}`;
    }

    if (matchedCittaCount === 0 && matched121Count === 0) {
      container.innerHTML = `
        <div class="text-center py-12 text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 rounded-2xl border border-amber-200 dark:border-slate-700 p-6">
          <i class="fa-solid fa-magnifying-glass text-3xl mb-2 text-amber-300 dark:text-slate-600"></i>
          <p class="text-sm font-medium">"${query}" සඳහා ගැළපෙන සිත් හෝ වර්ගීකරණයන් කිසිවක් හමු නොවීය.</p>
        </div>
      `;
      return;
    }

    if (matched121.length > 0) {
      const header = document.createElement("div");
      header.className = "flex items-center gap-2 text-sm font-bold text-emerald-900 dark:text-emerald-300 pt-2 border-b border-emerald-200 dark:border-slate-700 pb-2";
      header.innerHTML = `<i class="fa-solid fa-calculator text-emerald-600"></i> සිත් 121 ප්‍රතිඵල (${matched121.length}):`;
      container.appendChild(header);

      const grid = document.createElement("div");
      grid.className = "grid grid-cols-1 gap-3";
      matched121.forEach(vb => {
        const itemBox = document.createElement("div");
        itemBox.className = "bg-white dark:bg-slate-800 rounded-xl p-4 border border-emerald-200 dark:border-slate-700 shadow-sm space-y-2";
        itemBox.innerHTML = `
          <h4 class="font-bold text-base text-emerald-900 dark:text-emerald-200 border-b border-emerald-100 dark:border-slate-700 pb-1">${vb.title}</h4>
          <div class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${vb.desc}</div>
        `;
        grid.appendChild(itemBox);
      });
      container.appendChild(grid);
    }

    if (matchedSections.length > 0) {
      const cittaHeader = document.createElement("div");
      cittaHeader.className = "flex items-center gap-2 text-sm font-bold text-maroon-900 dark:text-saffron-300 pt-4 border-b border-amber-200 dark:border-slate-700 pb-2";
      cittaHeader.innerHTML = `<i class="fa-solid fa-table-list text-saffron-600"></i> චිත්ත විභාග ප්‍රතිඵල (${matchedCittaCount}):`;
      container.appendChild(cittaHeader);

      matchedSections.forEach((section) => {
        const card = document.createElement("div");
        card.className = "bg-white dark:bg-slate-800 rounded-2xl border border-amber-200/80 dark:border-slate-700 p-5 shadow-sm space-y-3";

        const title = document.createElement("h3");
        title.className = "text-lg font-bold text-maroon-900 dark:text-saffron-200 border-b border-amber-100 dark:border-slate-700 pb-2";
        title.textContent = section.category;

        const tableWrapper = document.createElement("div");
        tableWrapper.className = "overflow-x-auto rounded-xl border border-amber-100 dark:border-slate-700";

        const table = document.createElement("table");
        table.className = "w-full text-left text-xs sm:text-sm";
        table.innerHTML = `
          <thead class="bg-amber-50/70 dark:bg-slate-900/60 text-maroon-950 dark:text-saffron-300 font-bold border-b border-amber-100 dark:border-slate-700">
            <tr>
              <th class="py-3 px-4">සිතේ නම</th>
              <th class="py-3 px-4">ගණන / ලක්ෂණය</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-amber-100/60 dark:divide-slate-700/60">
            ${section.items.map(item => `
              <tr class="hover:bg-amber-50/30 dark:hover:bg-slate-700/30 transition-colors">
                <td class="py-3 px-4 font-bold text-amber-950 dark:text-slate-100 whitespace-nowrap">${item.name}</td>
                <td class="py-3 px-4 text-slate-700 dark:text-slate-300">${item.role}</td>
              </tr>
            `).join("")}
          </tbody>
        `;

        tableWrapper.appendChild(table);
        card.appendChild(title);
        card.appendChild(tableWrapper);
        container.appendChild(card);
      });
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderUnifiedSearch(e.target.value);
    });
  }

  renderUnifiedSearch();
});