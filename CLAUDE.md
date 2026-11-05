# Matika PWA — වැඩ කිරීමේ රීති

## අන්තර්ගතය නිවැරදි කිරීමේදී (අනිවාර්ය)
ඇප් එකේ තොරතුරු (මාතිකා, අර්ථ විස්තර, සිත්/චෛතසික නම්, ගණන් ආදිය) නිවැරදි කරන සෑම විටම:
1. `data/updates/corrections.js` හි ඉහළින්ම අලුත් සටහනක් (අද්විතීය `id`, `date`, `title`, `items[]`) එක් කරන්න.
   - සෑම item එකකම `areas`, `where`, `what` (si, en, my, zh, zh-Hant), `before`, `after`, `link`.
   - තික පිටුව සඳහා `link`: `matika/tika-matika.html?t=<ත්‍රිකය 0 සිට>&p=<පදය 0 සිට>&open=<nirukthi|abhidheya|sangraha|vishesha>`.
   - දුක සඳහා `link`: `matika/duka-matika.html?g=<ගොච්ඡක අංකය>&d=<දුක අංකය>&k=<පදය 0|1>`; සුත්තන්ත සඳහා: `matika/suttanta-matika.html?d=<දුකය 0 සිට>&p=<පදය 0|1>`.
2. `node tools/generate-precache.js` ධාවනය කරන්න (ඕනෑම ගොනු වෙනසකට පසු).
   - `corrections.js` හි සටහන් කරන්නේ ධර්ම කරුණු සහ පරිවර්තන නිවැරදි කිරීම් පමණි; තාක්ෂණික/දෘශ්‍ය වෙනස්කම් නොයොදන්න.
   - පරිශීලකයන් දන්වන දෝෂ (updates.html හි “දෝෂයක් දුටුවාද?” කොටස) පරීක්ෂා කර, නිවැරදි කළ යුතු නම් පමණක් සකසා සටහන් කරන්න.
3. පරිශීලකයාට ඇප් එක යාවත්කාලීන වූ පසු දැනුම්දීම (`assets/js/updates-notice.js`) සහ `updates.html` පිටුව මගින් එය පෙනේ.

## i18n
සිංහල පාඨ `assets/i18n/<lang>-<page>.js` හි නිවැරදි සිංහල පාඨයෙන්ම යතුරු කර ඇත; පාඨය වෙනස් කළ විට පරිවර්තන යතුරද යාවත්කාලීන කරන්න.

## සෙවුම (search.html)
`data/matika/**` (තික / දුක / සුත්තන්ත / සබ්බත්තික), `data/paramattha/**` (සිත් / චෛතසික / රූප) සහ `paramattha/nibbana.html` වෙනස් කළ සෑම විටම `node tools/generate-search-index.js` ධාවනය කර `data/search/search-index.js` යාවත්කාලීන කරන්න (ඉන්පසු `node tools/generate-precache.js`).
