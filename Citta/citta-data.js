/**
 * අභිධර්ම චිත්ත විභාගය - විස්තරාත්මක දත්ත
 * citta-data.js
 * 
 * අකුරුවල ප්‍රමාණය කියවීමට පහසු වන සේ විශාල කර ඇත.
 */

// ============================================================
// 1. සිත් - විස්තරාත්මක විග්‍රහය සඳහා දත්ත
// ============================================================

const cittaDetailData = [
  {
    title: "1. චාතුර්භූමක සිත් 89",
    desc: `
      <div class="space-y-4">
        <div class="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-900 p-5 rounded-xl border border-emerald-200 dark:border-slate-700">
          <h4 class="font-bold text-emerald-900 dark:text-emerald-200 text-base sm:text-lg mb-2 flex items-center gap-2">
            <i class="fa-solid fa-circle-info"></i> චාතුර්භූමක චිත්ත යනු කුමක්ද?
          </h4>
          <p class="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
            කාමාවචර, රූපාවචර, අරූපාවචර, ලෝකෝත්තර යන සිත් සතර කොටස එක් වූ කල 
            <strong>චාතුර්භූමක චිත්ත</strong> යැයි කියනු ලැබේ. 
            එනම්, භූමි සතරක උපදින සිත් ය.
          </p>
        </div>
        
        <div class="overflow-x-auto rounded-xl border border-amber-200 dark:border-slate-700">
          <table class="w-full text-left text-base sm:text-lg">
            <thead class="bg-amber-100 dark:bg-slate-900 text-amber-950 dark:text-saffron-300 font-bold">
              <tr>
                <th class="py-3.5 px-4 text-base sm:text-lg">භූමිය</th>
                <th class="py-3.5 px-4 text-center text-base sm:text-lg">සිත් ගණන</th>
                <th class="py-3.5 px-4 text-base sm:text-lg">විස්තරය</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-amber-100 dark:divide-slate-700">
              <tr class="hover:bg-amber-50/50 dark:hover:bg-slate-700/30">
                <td class="py-3.5 px-4 font-bold text-blue-700 dark:text-blue-300">කාමාවචර</td>
                <td class="py-3.5 px-4 text-center font-bold">54</td>
                <td class="py-3.5 px-4 text-sm sm:text-base">කාම ලෝකයට අයත් සිත්</td>
              </tr>
              <tr class="hover:bg-amber-50/50 dark:hover:bg-slate-700/30">
                <td class="py-3.5 px-4 font-bold text-green-700 dark:text-green-300">රූපාවචර</td>
                <td class="py-3.5 px-4 text-center font-bold">15</td>
                <td class="py-3.5 px-4 text-sm sm:text-base">රූප ධ්‍යාන සිත්</td>
              </tr>
              <tr class="hover:bg-amber-50/50 dark:hover:bg-slate-700/30">
                <td class="py-3.5 px-4 font-bold text-purple-700 dark:text-purple-300">අරූපාවචර</td>
                <td class="py-3.5 px-4 text-center font-bold">12</td>
                <td class="py-3.5 px-4 text-sm sm:text-base">අරූප ධ්‍යාන සිත්</td>
              </tr>
              <tr class="hover:bg-amber-50/50 dark:hover:bg-slate-700/30">
                <td class="py-3.5 px-4 font-bold text-amber-700 dark:text-amber-300">ලෝකෝත්තර</td>
                <td class="py-3.5 px-4 text-center font-bold">8 / 40</td>
                <td class="py-3.5 px-4 text-sm sm:text-base">මාර්ග හා ඵල සිත්</td>
              </tr>
              <tr class="bg-emerald-50 dark:bg-slate-900 font-bold">
                <td class="py-3.5 px-4">මුළු ගණන</td>
                <td class="py-3.5 px-4 text-center text-emerald-700 dark:text-emerald-300">89 / 121</td>
                <td class="py-3.5 px-4 text-sm sm:text-base">සිත් 89 හෝ 121</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-amber-50 dark:bg-slate-900/50 p-4 sm:p-5 rounded-lg border border-amber-200 dark:border-slate-700">
          <p class="text-base sm:text-lg text-amber-900 dark:text-saffron-300 text-justify">
            <i class="fa-solid fa-lightbulb mr-1.5 text-amber-600"></i>
            <strong>විශේෂ සටහන:</strong> ලෝකෝත්තර සිත් 8 ධ්‍යාන 5 සමඟ ගණන් ගැනීමෙන් සිත් 40 ක් වේ. 
            එවිට මුළු ගණන 89 - 8 + 40 = 121 කි.
          </p>
        </div>

        <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-900 p-5 rounded-xl border border-purple-200 dark:border-slate-700">
          <h4 class="font-bold text-purple-900 dark:text-purple-200 text-base sm:text-lg mb-2 flex items-center gap-2">
            <i class="fa-solid fa-book-open"></i> අභිධර්ම දේශනාවේ ආරම්භය
          </h4>
          <p class="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
            තථාගතයන් වහන්සේ අභිධර්ම දේශනාවේදී: <em>"කුසලා ධම්මා අකුසලා ධම්මා අව්‍යාකතා ධම්මා"</em> 
            යනුවෙන් පළමුව කුසල ධර්ම දේශනා කළ සේක. අභිධර්මය සංග්‍රහ කළ අනුරුද්ධාචාර්යයන් වහන්සේ 
            ආධුනිකයන්ගේ අවබෝධය සඳහා පළමුව අකුසල දක්වන ලදී.
          </p>
        </div>
      </div>
    `
  },

  {
    title: "2. ලෝභ මූලික සිත් 8 - දීර්ඝ විස්තරය",
    desc: `
      <div class="space-y-4">
        <div class="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-5 rounded-xl border border-red-200 dark:border-red-800">
          <h4 class="font-bold text-red-900 dark:text-red-200 text-base sm:text-lg mb-2 flex items-center gap-2">
            <i class="fa-solid fa-fire"></i> ලෝභ මූලික සිත් 8 හැඳින්වීම
          </h4>
          <p class="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
            ලෝභ මූලික සිත් 8 කි. මේවා <strong>වේදනා - දිට්ඨි - සංඛාර</strong> යන අංග තුනින් 
            ආකාර 8 කට බෙදී ගියේ ය.
          </p>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl border border-red-200 dark:border-red-800 overflow-hidden">
          <div class="bg-red-100 dark:bg-red-900/40 px-4 py-3 font-bold text-red-800 dark:text-red-200 text-base sm:text-lg">
            <i class="fa-solid fa-list-ol mr-2"></i> ලෝභ මූලික සිත් 8
          </div>
          <div class="p-3.5 space-y-2.5">
            ${[1,2,3,4,5,6,7,8].map(i => {
              const feelings = i <= 4 ? 'සෝමනස්ස' : 'උපේක්ෂා';
              const ditthi = (i === 1 || i === 2 || i === 5 || i === 6) ? 'දිට්ඨිගත සම්පයුත්ත' : 'දිට්ඨිගත විප්පයුත්ත';
              const sankhara = (i % 2 === 1) ? 'අසංඛාරික' : 'සසංඛාරික';
              return `<div class="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-900/50 flex items-start gap-2.5">
                <span class="bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 text-sm font-bold px-2.5 py-0.5 rounded-full">${i}</span>
                <span class="text-base sm:text-lg font-medium">${feelings} සහගත ${ditthi}${sankhara} සිත</span>
              </div>`;
            }).join('')}
          </div>
        </div>

        <div class="space-y-3.5">
          <div class="bg-gradient-to-r from-red-50 to-pink-50 dark:from-slate-800 dark:to-slate-900 p-5 rounded-xl border border-red-200 dark:border-slate-700">
            <h4 class="font-bold text-red-900 dark:text-red-200 text-base sm:text-lg mb-2 flex items-center gap-2">
              <i class="fa-solid fa-1"></i> පළමු සිත - සෝමනස්ස සහගත දිට්ඨිගත සම්පයුත්ත අසංඛාරික
            </h4>
            <p class="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
              <strong>සෝමනස්ස සහගත</strong> නම් සන්තෝෂයෙන් යුක්ත බව ය. 
              <strong>දිට්ඨිගත සම්පයුත්ත</strong> නම් කර්ම-ඵල නොඇදහීම් සම්බන්ධ මිථ්‍යාදෘෂ්ටියෙන් යුක්ත බව ය. 
              <strong>අසංඛාරික</strong> නම් තම විසින් හෝ අනුන් විසින් කරුණු ලබන පූර්ව ප්‍රයෝගයක් අනුබල දීමක් නැති වැ 
              ස්වභාවයෙන්ම යුහුසුලු වූ සිතින් කරනු ලබන බව ය.
            </p>
            <div class="bg-white/60 dark:bg-slate-800/60 p-3 rounded-lg mt-2.5">
              <p class="text-sm sm:text-base text-red-800 dark:text-red-300 text-justify">
                <strong>උදාහරණය:</strong> යමෙකු කාම මිථ්‍යාචාරාදී පාපයක් කරන්නේ සන්තෝෂයෙන් යුක්ත වැ 
                "මෙයින් මට විපාක නොලැබේ" යන මිථ්‍යාදෘෂ්ටියෙන් යුක්ත වැ අනුන් විසින් නොමෙහෙයන ලදු වැ 
                ස්වභාවික ශීඝ්‍ර වූ සිතින් ඒ පාපය කෙරේ ද, ඔහුට මෙම පළමු අකුසල විත්තය ලැබෙන්නේ ය.
              </p>
            </div>
          </div>

          <div class="bg-gradient-to-r from-red-50 to-pink-50 dark:from-slate-800 dark:to-slate-900 p-5 rounded-xl border border-red-200 dark:border-slate-700">
            <h4 class="font-bold text-red-900 dark:text-red-200 text-base sm:text-lg mb-2 flex items-center gap-2">
              <i class="fa-solid fa-2"></i> දෙවන සිත - සෝමනස්ස සහගත දිට්ඨිගත සම්පයුත්ත සසංඛාරික
            </h4>
            <p class="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
              <strong>සසංඛාරික</strong> නම් තමා විසින් හෝ අනුන් විසින් හෝ කරුණු ලබන පූර්ව ප්‍රයෝග සහිත බව ය. 
              එනම්, අනුන්ගේ මෙහෙයීමෙන් හෝ තමා ම පසුබැසීමෙන් හෝ කරනු ලබන බව ය.
            </p>
          </div>

          <div class="bg-gradient-to-r from-red-50 to-pink-50 dark:from-slate-800 dark:to-slate-900 p-5 rounded-xl border border-red-200 dark:border-slate-700">
            <h4 class="font-bold text-red-900 dark:text-red-200 text-base sm:text-lg mb-2 flex items-center gap-2">
              <i class="fa-solid fa-3"></i> තුන්වන සිත - සෝමනස්ස සහගත දිට්ඨිගත විප්පයුත්ත අසංඛාරික
            </h4>
            <p class="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
              <strong>දිට්ඨිගත විප්පයුත්ත</strong> නම් "මෙයින් මට විපාක නොලැබේ" යනාදී මිථ්‍යාදෘෂ්ටියක් නැති බව ය. 
              එනම්, කර්ම-ඵල විශ්වාස කරමින් නමුත් ආශාව නිසා පාපයේ යෙදීමයි.
            </p>
          </div>
        </div>
      </div>
    `
  },

  {
    title: "3. දෝස මූලික සිත් 2 - දීර්ඝ විස්තරය",
    desc: `
      <div class="space-y-4">
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
          <h4 class="font-bold text-amber-900 dark:text-amber-200 text-base sm:text-lg mb-2 flex items-center gap-2">
            <i class="fa-solid fa-bolt"></i> දෝස මූලික සිත් 2 හැඳින්වීම
          </h4>
          <p class="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
            දෝස මූලික සිත් 2 කි. මේවා දෝමනස්ස හා පටිඝ යන අංගවලින් යුක්ත වේ.
          </p>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl border border-amber-200 dark:border-amber-800 overflow-hidden">
          <div class="bg-amber-100 dark:bg-amber-900/40 px-4 py-3 font-bold text-amber-800 dark:text-amber-200 text-base sm:text-lg">
            <i class="fa-solid fa-list-ol mr-2"></i> දෝස මූලික සිත් 2
          </div>
          <div class="p-3.5 space-y-2.5">
            <div class="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-900/50 flex items-start gap-2.5">
              <span class="bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 text-sm font-bold px-2.5 py-0.5 rounded-full">9</span>
              <span class="text-base sm:text-lg font-medium">දෝමනස්ස සහගත පටිඝ සම්පයුත්ත අසංඛාරික විත්තය</span>
            </div>
            <div class="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-900/50 flex items-start gap-2.5">
              <span class="bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 text-sm font-bold px-2.5 py-0.5 rounded-full">10</span>
              <span class="text-base sm:text-lg font-medium">දෝමනස්ස සහගත පටිඝ සම්පයුත්ත සසංඛාරික විත්තය</span>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 p-5 rounded-xl border border-amber-200 dark:border-slate-700">
          <h4 class="font-bold text-amber-900 dark:text-amber-200 text-base sm:text-lg mb-2 flex items-center gap-2">
            <i class="fa-solid fa-circle-info"></i> ලක්ෂණ විස්තරය
          </h4>
          <ul class="text-base sm:text-lg text-slate-700 dark:text-slate-300 space-y-2.5 text-justify">
            <li><strong>දෝමනස්ස සහගත:</strong> දොම්නසින් හෙවත් මානසික දුක්ඛ වේදනාවෙන් යුක්ත බව ය.</li>
            <li><strong>පටිඝ සම්පයුත්ත:</strong> ද්වේෂයෙන් හෙවත් කෝපයෙන් යුක්ත බව ය. අරමුණෙහි නොඇලී හැපෙන බැවින් ද්වේෂය පටිඝය යි කියනු ලැබේ.</li>
            <li><strong>අසංඛාරික / සසංඛාරික:</strong> අනුන්ගේ මෙහෙයවීමක් නැතිව ක්ෂණිකව කෝප වීම අසංඛාරික වන අතර, පෙළඹවීමකින් හෝ පසුතැවෙමින් කෝපයට පත්වීම සසංඛාරික වේ.</li>
          </ul>
        </div>
      </div>
    `
  },

  {
    title: "4. මෝහ මූලික සිත් 2 - දීර්ඝ විස්තරය",
    desc: `
      <div class="space-y-4">
        <div class="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-5 rounded-xl border border-blue-200 dark:border-blue-800">
          <h4 class="font-bold text-blue-900 dark:text-blue-200 text-base sm:text-lg mb-2 flex items-center gap-2">
            <i class="fa-solid fa-cloud"></i> මෝහ මූලික සිත් 2 හැඳින්වීම
          </h4>
          <p class="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
            මෝහ මූලික සිත් 2 කි. මේවා උපේක්ෂා වේදනාවෙන් යුක්ත වේ.
          </p>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-800 overflow-hidden">
          <div class="bg-blue-100 dark:bg-blue-900/40 px-4 py-3 font-bold text-blue-800 dark:text-blue-200 text-base sm:text-lg">
            <i class="fa-solid fa-list-ol mr-2"></i> මෝහ මූලික සිත් 2
          </div>
          <div class="p-3.5 space-y-2.5">
            <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900/50 flex items-start gap-2.5">
              <span class="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-sm font-bold px-2.5 py-0.5 rounded-full">11</span>
              <span class="text-base sm:text-lg font-medium">උපේක්ෂා සහගත විචිකිච්ඡා සම්පයුත්ත විත්තය</span>
            </div>
            <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900/50 flex items-start gap-2.5">
              <span class="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-sm font-bold px-2.5 py-0.5 rounded-full">12</span>
              <span class="text-base sm:text-lg font-medium">උපේක්ෂා සහගත උද්ධච්ච සම්පයුත්ත විත්තය</span>
            </div>
          </div>
        </div>
      </div>
    `
  },

  {
    title: "5. අහේතුක සිත් 18 - දීර්ඝ විස්තරය",
    desc: `
      <div class="space-y-4">
        <div class="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-5 rounded-xl border border-orange-200 dark:border-orange-800">
          <h4 class="font-bold text-orange-900 dark:text-orange-200 text-base sm:text-lg mb-2 flex items-center gap-2">
            <i class="fa-solid fa-circle-exclamation"></i> අහේතුක සිත් 18 හැඳින්වීම
          </h4>
          <p class="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
            හේතු නම් ලෝභ, දෝස, මෝහ, අලෝභ, අදෝස, අමෝහ යන ධර්මයන් ය. මෙම හේතු කිසිවක් නොයෙදෙන සිත් 18 
            <strong>අහේතුක සිත්</strong> නම් වේ. (අකුසල විපාක 7, කුසල අහේතුක විපාක 8, අහේතුක ක්‍රියා 3)
          </p>
        </div>
      </div>
    `
  }
];

// ============================================================
// 2. සිත් 121 දත්ත (citta.js සමඟ භාවිතයට)
// ============================================================

const citta121Data = {
  citta121Summary: {
    title: "සිත් 121 සාරාංශය",
    desc: "<div class='bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-900 p-5 rounded-xl border border-emerald-200 dark:border-slate-700'>" +
          "<p class='mb-2.5 text-base sm:text-lg leading-relaxed'>සිත් 89 ක් සහ සිත් 121 ක් අතර වෙනස පහත පරිදි වේ:</p>" +
          "<ul class='space-y-2 text-base sm:text-lg'>" +
          "<li>• <strong>සිත් 89:</strong> ලෝකෝත්තර සිත් 8 ක් ලෙස ගණන් ගැනීම.</li>" +
          "<li>• <strong>සිත් 121:</strong> ලෝකෝත්තර සිත් 8 ම ධ්‍යාන 5 ක් සමඟ ගණන් ගැනීමෙන් 40 ක් වේ.</li>" +
          "<li>• එනම්, 89 - 8 + 40 = 121.</li>" +
          "</ul>" +
          "</div>" +
          "<hr class='my-3.5 border-amber-200 dark:border-slate-700'>" +
          "<p class='mb-2.5 text-base sm:text-lg font-bold'>සිත් 121 බෙදීම:</p>" +
          "<div class='grid grid-cols-2 gap-3'>" +
          "<div class='bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg text-center'><span class='font-bold text-blue-800 dark:text-blue-200 text-base sm:text-lg'>කාමාවචර 54</span></div>" +
          "<div class='bg-green-50 dark:bg-green-900/30 p-3 rounded-lg text-center'><span class='font-bold text-green-800 dark:text-green-200 text-base sm:text-lg'>රූපාවචර 15</span></div>" +
          "<div class='bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg text-center'><span class='font-bold text-purple-800 dark:text-purple-200 text-base sm:text-lg'>අරූපාවචර 12</span></div>" +
          "<div class='bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg text-center'><span class='font-bold text-amber-800 dark:text-amber-200 text-base sm:text-lg'>ලෝකෝත්තර 40</span></div>" +
          "</div>"
  },

  akusala12Full: {
    title: "A1 - අකුසල් සිත් 12",
    desc: "<p class='mb-3.5 text-base sm:text-lg text-slate-700 dark:text-slate-300'>ලෝභ, දෝස, මෝහ යන අකුසල මූලයන් මත පදනම්ව උපදින සිත් 12 කි.</p>" +
          "<div class='mb-4 bg-red-50/50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 overflow-hidden'>" +
          "<div class='bg-red-100 dark:bg-red-900/40 px-4 py-2.5 font-bold text-red-800 dark:text-red-200 text-base sm:text-lg flex items-center gap-2'><i class='fa-solid fa-fire'></i> a. ලෝභ මූලික සිත් 8</div>" +
          "<div class='p-3.5 space-y-2.5'><div class='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>" +
          [1,2,3,4,5,6,7,8].map(i => {
            const feelings = i <= 4 ? 'සෝමනස්ස' : 'උපේක්ෂා';
            const ditthi = (i === 1 || i === 2 || i === 5 || i === 6) ? 'සම්පයුත්ත' : 'විප්පයුත්ත';
            const sankhara = (i % 2 === 1) ? 'අසංඛාරික' : 'සසංඛාරික';
            return `<div class='bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-red-100 dark:border-red-900/50 flex items-start gap-2.5'><span class='bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 text-sm font-bold px-2 py-0.5 rounded-full'>${i}</span><span class='text-base'>${feelings} සහගත දිට්ඨිගත ${ditthi} ${sankhara} සිත</span></div>`;
          }).join('') +
          "</div></div></div>"
  },

  ahetuka18Full: {
    title: "A2 - අහේතුක සිත් 18",
    desc: "<p class='mb-3.5 text-base sm:text-lg text-slate-700 dark:text-slate-300'>හේතු රහිතව උපදින සිත් 18 කි.</p>" +
          "<div class='mb-4 bg-orange-50/50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800 overflow-hidden'>" +
          "<div class='bg-orange-100 dark:bg-orange-900/40 px-4 py-2.5 font-bold text-orange-800 dark:text-orange-200 text-base sm:text-lg flex items-center gap-2'><i class='fa-solid fa-circle-exclamation'></i> a. අකුසල විපාක සිත් 7</div>" +
          "<div class='p-3.5 space-y-2.5'><div class='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>" +
          "<div class='bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-orange-100 dark:border-orange-900/50 flex items-start gap-2.5'><span class='bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-sm font-bold px-2 py-0.5 rounded-full'>13</span><span class='text-base'>උපේක්ෂා සහගත චක්ඛු විඤ්ඤාණ සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-orange-100 dark:border-orange-900/50 flex items-start gap-2.5'><span class='bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-sm font-bold px-2 py-0.5 rounded-full'>14</span><span class='text-base'>උපේක්ෂා සහගත සෝත විඤ්ඤාණ සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-orange-100 dark:border-orange-900/50 flex items-start gap-2.5'><span class='bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-sm font-bold px-2 py-0.5 rounded-full'>15</span><span class='text-base'>උපේක්ෂා සහගත ඝාන විඤ්ඤාණ සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-orange-100 dark:border-orange-900/50 flex items-start gap-2.5'><span class='bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-sm font-bold px-2 py-0.5 rounded-full'>16</span><span class='text-base'>උපේක්ෂා සහගත ජිව්හා විඤ්ඤාණ සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-orange-100 dark:border-orange-900/50 flex items-start gap-2.5'><span class='bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-sm font-bold px-2 py-0.5 rounded-full'>17</span><span class='text-base'>දුක්ඛ සහගත කාය විඤ්ඤාණ සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-orange-100 dark:border-orange-900/50 flex items-start gap-2.5'><span class='bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-sm font-bold px-2 py-0.5 rounded-full'>18</span><span class='text-base'>උපේක්ෂා සහගත සම්පටිච්ඡන සිත</span></div>" +
          "<div class='bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-orange-100 dark:border-orange-900/50 flex items-start gap-2.5'><span class='bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-sm font-bold px-2 py-0.5 rounded-full'>19</span><span class='text-base'>උපේක්ෂා සහගත සන්තීරණ සිත</span></div>" +
          "</div></div></div>"
  },

  kamaKusala24Full: {
    title: "A3 - කාම සෝභන සිත් 24",
    desc: "<p class='mb-3.5 text-base sm:text-lg text-slate-700 dark:text-slate-300'>කාම සෝභන සිත් 24 කි. (කුසල් 8, විපාක 8, ක්‍රියා 8)</p>" +
          "<div class='grid grid-cols-1 md:grid-cols-3 gap-3.5'>" +
          "<div class='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800 p-4'>" +
          "<div class='font-bold text-green-800 dark:text-green-200 text-base sm:text-lg mb-2.5 flex items-center gap-2'><i class='fa-solid fa-seedling'></i> a. කුසල් සිත් 8</div>" +
          "<ul class='space-y-1.5 text-sm sm:text-base'>" +
          [1,2,3,4,5,6,7,8].map(i => {
            const feelings = i <= 4 ? 'සෝමනස්ස' : 'උපේක්ෂා';
            const nana = (i % 2 === 1) ? 'සම්පයුත්ත' : 'විප්පයුත්ත';
            const sankhara = (i % 2 === 0) ? 'සසංඛාරික' : 'අසංඛාරික';
            return `<li class='flex items-start gap-2'><span class='text-green-600 font-bold'>${i}.</span> ${feelings} සහගත ඤාණ${nana} ${sankhara} සිත</li>`;
          }).join('') +
          "</ul></div></div>"
  },

  lobha8Full: {
    title: "a. ලෝභ මූලික සිත් 8 (A1)",
    desc: "<div class='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>" +
          [1,2,3,4,5,6,7,8].map(i => {
            const feelings = i <= 4 ? 'සෝමනස්ස' : 'උපේක්ෂා';
            const ditthi = (i === 1 || i === 2 || i === 5 || i === 6) ? 'සම්පයුත්ත' : 'විප්පයුත්ත';
            const sankhara = (i % 2 === 1) ? 'අසංඛාරික' : 'සසංඛාරික';
            return `<div class='bg-red-50 dark:bg-red-900/20 p-2.5 rounded-lg border border-red-200 dark:border-red-800 flex items-start gap-2.5'><span class='bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 text-sm font-bold px-2 py-0.5 rounded-full'>${i}</span><span class='text-base'>${feelings} සහගත දිට්ඨිගත ${ditthi} ${sankhara} සිත</span></div>`;
          }).join('') +
          "</div>"
  },
  
  dosa2Full: {
    title: "b. දෝස මූලික සිත් 2 (A1)",
    desc: "<div class='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>" +
          "<div class='bg-amber-50 dark:bg-amber-900/20 p-2.5 rounded-lg border border-amber-200 dark:border-amber-800 flex items-start gap-2.5'><span class='bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 text-sm font-bold px-2 py-0.5 rounded-full'>9</span><span class='text-base'>දෝමනස්ස සහගත පටිඝ සම්පයුත්ත අසංඛාරික සිත</span></div>" +
          "<div class='bg-amber-50 dark:bg-amber-900/20 p-2.5 rounded-lg border border-amber-200 dark:border-amber-800 flex items-start gap-2.5'><span class='bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 text-sm font-bold px-2 py-0.5 rounded-full'>10</span><span class='text-base'>දෝමනස්ස සහගත පටිඝ සම්පයුත්ත සසංඛාරික සිත</span></div>" +
          "</div>"
  },
  
  moha2Full: {
    title: "c. මෝහ මූලික සිත් 2 (A1)",
    desc: "<div class='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>" +
          "<div class='bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-lg border border-blue-200 dark:border-blue-800 flex items-start gap-2.5'><span class='bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-sm font-bold px-2 py-0.5 rounded-full'>11</span><span class='text-base'>උපේක්ෂා සහගත විචිකිච්ඡා සම්පයුත්ත සිත</span></div>" +
          "<div class='bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-lg border border-blue-200 dark:border-blue-800 flex items-start gap-2.5'><span class='bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-sm font-bold px-2 py-0.5 rounded-full'>12</span><span class='text-base'>උපේක්ෂා සහගත උද්ධච්ච සම්පයුත්ත සිත</span></div>" +
          "</div>"
  }
};

// ============================================================
// 3. චිත්ත විභාගයට අදාළ මූලික දත්ත
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
    category: "C. අරූපාවචර සිත් 12",
    description: "අරූපාවචර ධ්‍යාන සිත් 12 කි.",
    items: [
      { name: "C1. කුසල් සිත්", role: "4" },
      { name: "C2. විපාක සිත්", role: "4" },
      { name: "C3. ක්‍රියා සිත්", role: "4" }
    ]
  },
  {
    category: "D. ලෝකෝත්තර සිත් 8/40",
    description: "ලෝකෝත්තර සිත් 8 කි. ධ්‍යාන 5 සමඟ ගණන් ගැනීමෙන් 40 ක් වේ.",
    items: [
      { name: "D1. කුසල් (මාර්ග) සිත්", role: "4 / 20" },
      { name: "D2. විපාක (ඵල) සිත්", role: "4 / 20" }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    cittaDetailData,
    citta121Data,
    cittaData,
    stripHtml
  };
}