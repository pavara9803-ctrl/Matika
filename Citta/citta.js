/**
 * අභිධර්ම චිත්ත විභාගය - Universal Search & Logic
 * citta.js (සම්පූර්ණ ගොනුව)
 * 
 * ⚠️ වැදගත්: citta-data.js ගොනුව මුලින්ම පූරණය විය යුතුය!
 * 
 * citta-data.js ගොනුවේ අඩංගු variables:
 *   - cittaDetailData  (සිත් - විස්තරාත්මක විග්‍රහය සඳහා)
 *   - citta121Data     (සිත් 121 සඳහා)
 *   - cittaData        (චිත්ත විභාගයට අදාළ)
 *   - stripHtml        (සහායක ශ්‍රිතය)
 */

// ============================================================
// 0. දත්ත පරීක්ෂාව (Data Validation)
// ============================================================
(function validateData() {
  const requiredVars = ['citta121Data', 'cittaData', 'cittaDetailData'];
  const missingVars = [];
  
  requiredVars.forEach(varName => {
    if (typeof window[varName] === 'undefined') {
      missingVars.push(varName);
    }
  });
  
  if (missingVars.length > 0) {
    console.error('❌ citta-data.js ගොනුව පූරණය කර නැත හෝ අසම්පූර්ණයි.');
    console.error('   අතුරුදහන් variables:', missingVars.join(', '));
    console.error('   කරුණාකර citta-data.js ගොනුව citta.js ට පෙර පූරණය කරන්න.');
  } else {
    console.log('✅ citta-data.js දත්ත සාර්ථකව පූරණය විය.');
  }
})();

// ============================================================
// 1. සහායක ශ්‍රිත (Helper Functions)
// ============================================================

/**
 * HTML ඉවත් කර සාමාන්‍ය පෙළ ලබා ගැනීම
 */
function stripHtml(html) {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

// ============================================================
// 2. UI ටොගල් ක්‍රියාකාරීත්වය (UI Toggle Functions)
// ============================================================

/**
 * සිත් 89/121 බටන් එකේ අඩංගු කොටස ටොගල් කිරීම
 */
function toggleCitta121Section() {
  const subContainer = document.getElementById("citta121SubContainer");
  const arrowIcon = document.getElementById("citta121-arrow");
  
  if (subContainer) {
    subContainer.classList.toggle("hidden");
    if (arrowIcon) {
      arrowIcon.classList.toggle("rotate-180");
    }
  } else {
    console.warn('⚠️ citta121SubContainer element එක හමු නොවීය.');
  }
}

/**
 * සිත් - විස්තරාත්මක විග්‍රහය බටන් එකේ අඩංගු කොටස ටොගල් කිරීම
 */
function toggleCittaDetailSection() {
  const subContainer = document.getElementById("cittaDetailSubContainer");
  const arrowIcon = document.getElementById("cittaDetail-arrow");
  
  if (subContainer) {
    subContainer.classList.toggle("hidden");
    if (arrowIcon) {
      arrowIcon.classList.toggle("rotate-180");
    }
  } else {
    console.warn('⚠️ cittaDetailSubContainer element එක හමු නොවීය.');
  }
}

/**
 * පැරණි main section ටොගල් කිරීම (backward compatibility)
 */
function toggleMainSection() {
  const subContainer = document.getElementById("subContainer");
  const arrowIcon = document.getElementById("vibhaga-arrow");
  
  if (subContainer) {
    subContainer.classList.toggle("hidden");
    if (arrowIcon) {
      arrowIcon.classList.toggle("rotate-180");
    }
  }
}

// ============================================================
// 3. තොරතුරු පෙන්වීමේ ශ්‍රිතය (Info Display Function)
// ============================================================

/**
 * සිත් 121 කොටසේ තොරතුරු පෙන්වීම
 * @param {Event} event - ක්ලික් කළ බටන් එකේ event
 * @param {string} key - citta121Data හි key එක
 */
function showInfo121(event, key) {
  if (typeof citta121Data === 'undefined') {
    console.error('❌ citta121Data නොමැත. citta-data.js පූරණය කරන්න.');
    return;
  }

  const data = citta121Data[key];
  if (!data) {
    console.warn('⚠️ No data found for key:', key);
    return;
  }

  const button = event.currentTarget;
  const group = button.closest('.citta-group');
  
  if (!group) {
    console.warn('⚠️ Group not found for button:', button);
    return;
  }

  // සියලු display boxes සඟවන්න
  document.querySelectorAll('[id^="citta121DisplayGroup"]').forEach(el => {
    el.classList.add("hidden");
  });

  // අදාළ display box එක පෙන්වන්න
  const displayBox = group.querySelector('[id^="citta121DisplayGroup"]');
  if (displayBox) {
    const titleEl = displayBox.querySelector('h3');
    const detailsEl = displayBox.querySelector('div');
    
    if (titleEl) titleEl.innerText = data.title;
    if (detailsEl) detailsEl.innerHTML = data.desc;
    
    displayBox.classList.remove("hidden");
  }

  // සියලු buttons වල active state ඉවත් කරන්න
  const buttons = group.querySelectorAll(".sub-btn-121");
  buttons.forEach(btn => {
    btn.classList.remove(
      "bg-emerald-500", "text-white",
      "bg-red-500", "bg-orange-500",
      "bg-green-500", "bg-amber-500",
      "bg-purple-500", "bg-rose-500",
      "bg-blue-500", "bg-teal-500"
    );
    btn.classList.add("bg-white", "dark:bg-slate-900");
  });

  // ක්ලික් කළ button එකට active state එක් කරන්න
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
// 4. සිත් - විස්තරාත්මක විග්‍රහය පූරණය කිරීම
// ============================================================

/**
 * cittaDetailData පූරණය කිරීම
 */
function loadCittaDetail() {
  const detailContainer = document.getElementById("cittaDetailContent");
  
  if (!detailContainer) {
    console.warn('⚠️ cittaDetailContent element එක හමු නොවීය.');
    return;
  }

  if (typeof cittaDetailData === 'undefined' || !Array.isArray(cittaDetailData)) {
    console.error('❌ cittaDetailData නොමැත හෝ array එකක් නොවේ.');
    detailContainer.innerHTML = `
      <div class="text-center py-8 text-red-400 dark:text-red-300">
        <i class="fa-solid fa-exclamation-triangle text-3xl mb-2"></i>
        <p class="text-base font-medium">දත්ත පූරණය කිරීමේ දෝෂයක්!</p>
        <p class="text-sm mt-1">citta-data.js ගොනුව පරීක්ෂා කරන්න.</p>
      </div>
    `;
    return;
  }

  if (cittaDetailData.length === 0) {
    detailContainer.innerHTML = `
      <div class="text-center py-8 text-slate-400 dark:text-slate-500">
        <i class="fa-solid fa-inbox text-3xl mb-2 text-indigo-300 dark:text-slate-600"></i>
        <p class="text-base">විස්තරාත්මක දත්ත තවම එක් කර නැත.</p>
      </div>
    `;
    return;
  }

  // දත්ත HTML ලෙස ජනනය කරන්න (විශාල කළ අකුරු ප්‍රමාණ සහිතව)
  detailContainer.innerHTML = cittaDetailData.map((item, index) => `
    <div class="bg-white dark:bg-slate-800 rounded-xl p-5 border border-indigo-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
      <h3 class="font-bold text-indigo-900 dark:text-indigo-200 text-lg sm:text-xl mb-3 flex items-center gap-2.5">
        <span class="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0">
          ${index + 1}
        </span>
        ${item.title || 'ශීර්ෂයක් නොමැත'}
      </h3>
      <div class="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
        ${item.desc || ''}
      </div>
    </div>
  `).join('');

  console.log(`✅ සිත් - විස්තරාත්මක විග්‍රහය: ${cittaDetailData.length} items පූරණය විය.`);
}

// ============================================================
// 5. Universal Search & Dynamic Rendering
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  console.log('🚀 citta.js: DOM පූරණය විය. UI ආරම්භ කරමින්...');

  const container = document.getElementById("citta-container");
  const searchInput = document.getElementById("search-input");
  const totalCountEl = document.getElementById("total-count");

  loadCittaDetail();

  function renderUnifiedSearch(query = "") {
    if (!container) {
      console.warn('⚠️ citta-container element එක හමු නොවීය.');
      return;
    }

    container.innerHTML = "";
    const cleanQuery = query.trim().toLowerCase();

    // (අ) Search query එකක් නොමැති නම් - සියලු දත්ත පෙන්වන්න
    if (!cleanQuery) {
      let count = 0;

      if (typeof cittaData === 'undefined' || !Array.isArray(cittaData)) {
        console.error('❌ cittaData නොමැත.');
        container.innerHTML = `
          <div class="text-center py-12 text-red-400 bg-white dark:bg-slate-800 rounded-2xl border border-red-200 dark:border-red-800 p-6">
            <i class="fa-solid fa-exclamation-triangle text-3xl mb-2"></i>
            <p class="text-base font-medium">දත්ත පූරණය කිරීමේ දෝෂයක්!</p>
          </div>
        `;
        return;
      }

      cittaData.forEach((section) => {
        count += section.items.length;
        const card = document.createElement("div");
        card.className = "bg-white dark:bg-slate-800 rounded-2xl border border-amber-200/80 dark:border-slate-700 p-5 sm:p-6 shadow-sm space-y-3.5 card-hover";

        const title = document.createElement("h3");
        title.className = "text-xl font-bold text-maroon-900 dark:text-saffron-200 border-b border-amber-100 dark:border-slate-700 pb-2.5";
        title.textContent = section.category;

        const desc = document.createElement("p");
        desc.className = "text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed text-justify";
        desc.textContent = section.description;

        const tableWrapper = document.createElement("div");
        tableWrapper.className = "overflow-x-auto rounded-xl border border-amber-100 dark:border-slate-700 mt-2";

        const table = document.createElement("table");
        table.className = "w-full text-left text-sm sm:text-base";
        table.innerHTML = `
          <thead class="bg-amber-50/70 dark:bg-slate-900/60 text-maroon-950 dark:text-saffron-300 font-bold border-b border-amber-100 dark:border-slate-700">
            <tr>
              <th class="py-3.5 px-4 text-base">සිතේ නම</th>
              <th class="py-3.5 px-4 text-base">ගණන / ලක්ෂණය</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-amber-100/60 dark:divide-slate-700/60">
            ${section.items.map(item => `
              <tr class="hover:bg-amber-50/30 dark:hover:bg-slate-700/30 transition-colors">
                <td class="py-3.5 px-4 font-bold text-amber-950 dark:text-slate-100 whitespace-nowrap text-base">${item.name}</td>
                <td class="py-3.5 px-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base">${item.role}</td>
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

      if (totalCountEl) {
        totalCountEl.textContent = `ප්‍රදර්ශනය වන සිත් ගණන: ${count}`;
      }
      return;
    }

    // (ආ) Search query එකක් ඇත්නම්
    let matchedCittaCount = 0;
    let matched121Count = 0;

    const matchedSections = [];
    if (typeof cittaData !== 'undefined' && Array.isArray(cittaData)) {
      cittaData.forEach((section) => {
        const filtered = section.items.filter(item => 
          item.name.toLowerCase().includes(cleanQuery) ||
          item.role.toLowerCase().includes(cleanQuery) ||
          section.category.toLowerCase().includes(cleanQuery)
        );
        if (filtered.length > 0) {
          matchedSections.push({
            category: section.category,
            description: section.description,
            items: filtered
          });
          matchedCittaCount += filtered.length;
        }
      });
    }

    const matched121 = [];
    if (typeof citta121Data !== 'undefined') {
      Object.keys(citta121Data).forEach(key => {
        const item = citta121Data[key];
        if (!item || !item.title || !item.desc) return;
        
        const plainDesc = stripHtml(item.desc).toLowerCase();
        if (item.title.toLowerCase().includes(cleanQuery) || plainDesc.includes(cleanQuery)) {
          matched121.push(item);
          matched121Count++;
        }
      });
    }

    if (totalCountEl) {
      totalCountEl.textContent = `සෙවුම් ප්‍රතිඵල: සිත් ${matchedCittaCount} | 121 ${matched121Count}`;
    }

    if (matchedCittaCount === 0 && matched121Count === 0) {
      container.innerHTML = `
        <div class="text-center py-12 text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 rounded-2xl border border-amber-200 dark:border-slate-700 p-6">
          <i class="fa-solid fa-magnifying-glass text-3xl mb-2 text-amber-300 dark:text-slate-600"></i>
          <p class="text-base font-medium">"${query}" සඳහා ගැළපෙන සිත් හෝ වර්ගීකරණයන් කිසිවක් හමු නොවීය.</p>
          <p class="text-sm mt-2 text-slate-400">වෙනත් වචනයක් උත්සාහ කරන්න.</p>
        </div>
      `;
      return;
    }

    // සිත් 121 ප්‍රතිඵල පෙන්වීම
    if (matched121.length > 0) {
      const header = document.createElement("div");
      header.className = "flex items-center gap-2 text-base sm:text-lg font-bold text-emerald-900 dark:text-emerald-300 pt-2 border-b border-emerald-200 dark:border-slate-700 pb-2";
      header.innerHTML = `<i class="fa-solid fa-calculator text-emerald-600"></i> සිත් 121 ප්‍රතිඵල (${matched121.length}):`;
      container.appendChild(header);

      const grid = document.createElement("div");
      grid.className = "grid grid-cols-1 gap-3.5";
      
      matched121.forEach(vb => {
        const itemBox = document.createElement("div");
        itemBox.className = "bg-white dark:bg-slate-800 rounded-xl p-5 border border-emerald-200 dark:border-slate-700 shadow-sm space-y-2.5";
        itemBox.innerHTML = `
          <h4 class="font-bold text-lg text-emerald-900 dark:text-emerald-200 border-b border-emerald-100 dark:border-slate-700 pb-1.5">
            ${vb.title}
          </h4>
          <div class="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed overflow-x-auto text-justify">
            ${vb.desc}
          </div>
        `;
        grid.appendChild(itemBox);
      });
      container.appendChild(grid);
    }

    // චිත්ත විභාග ප්‍රතිඵල පෙන්වීම
    if (matchedSections.length > 0) {
      const cittaHeader = document.createElement("div");
      cittaHeader.className = "flex items-center gap-2 text-base sm:text-lg font-bold text-maroon-900 dark:text-saffron-300 pt-4 border-b border-amber-200 dark:border-slate-700 pb-2";
      cittaHeader.innerHTML = `<i class="fa-solid fa-table-list text-saffron-600"></i> චිත්ත විභාග ප්‍රතිඵල (${matchedCittaCount}):`;
      container.appendChild(cittaHeader);

      matchedSections.forEach((section) => {
        const card = document.createElement("div");
        card.className = "bg-white dark:bg-slate-800 rounded-2xl border border-amber-200/80 dark:border-slate-700 p-5 sm:p-6 shadow-sm space-y-3.5";

        const title = document.createElement("h3");
        title.className = "text-xl font-bold text-maroon-900 dark:text-saffron-200 border-b border-amber-100 dark:border-slate-700 pb-2.5";
        title.textContent = section.category;

        const tableWrapper = document.createElement("div");
        tableWrapper.className = "overflow-x-auto rounded-xl border border-amber-100 dark:border-slate-700 mt-2";

        const table = document.createElement("table");
        table.className = "w-full text-left text-sm sm:text-base";
        table.innerHTML = `
          <thead class="bg-amber-50/70 dark:bg-slate-900/60 text-maroon-950 dark:text-saffron-300 font-bold border-b border-amber-100 dark:border-slate-700">
            <tr>
              <th class="py-3.5 px-4 text-base">සිතේ නම</th>
              <th class="py-3.5 px-4 text-base">ගණන / ලක්ෂණය</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-amber-100/60 dark:divide-slate-700/60">
            ${section.items.map(item => `
              <tr class="hover:bg-amber-50/30 dark:hover:bg-slate-700/30 transition-colors">
                <td class="py-3.5 px-4 font-bold text-amber-950 dark:text-slate-100 whitespace-nowrap text-base">${item.name}</td>
                <td class="py-3.5 px-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base">${item.role}</td>
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

window.toggleCitta121Section = toggleCitta121Section;
window.toggleCittaDetailSection = toggleCittaDetailSection;
window.toggleMainSection = toggleMainSection;
window.showInfo121 = showInfo121;
window.loadCittaDetail = loadCittaDetail;