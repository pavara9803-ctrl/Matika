# අභිධර්ම මාතිකා — ගොනු ව්‍යුහය

```
/                         මූල ෆෝල්ඩරය (වෙනස් කළ නොහැකි ස්ථාන)
├── index.html            මුල් පිටුව
├── about.html            යෙදුම ගැන
├── privacy.html          රහස්‍යතා ප්‍රතිපත්තිය
├── manifest.json         PWA / Android යෙදුම් සැකසුම
├── sw.js                 Offline service worker (මූලයේම තිබිය යුතුය)
├── precache-manifest.js  offline ගොනු ලැයිස්තුව (ස්වයංක්‍රීයව සාදයි)
├── sitemap.xml           Google සඳහා
├── vercel.json           පැරණි URL → නව URL යොමු කිරීම් (redirects)
├── google…html, .well-known/   Google / Android සත්‍යාපන ගොනු
│
├── matika/               මාතිකා පිටු
│   ├── sabbattika.html   සබ්බත්තික මාතිකා
│   ├── tika-matika.html  තික මාතිකා
│   ├── duka-matika.html  දුක මාතිකා
│   └── suttanta-matika.html සුත්තන්ත මාතිකා
│
├── paramattha/           සතර පරමාර්ථ පිටු
│   ├── index.html        සතර පරමාර්ථ (සාරාංශය)
│   ├── citta.html        චිත්ත
│   ├── caitasika.html    චෛතසික හා සම්ප්‍රයෝග
│   ├── caitasika.lr.html චෛතසික — ලක්ඛණ රස පච්චුපට්ඨාන පදට්ඨාන
│   ├── rupa.html         රූප විභාගය
│   ├── rupa-lr.html      රූප — ලක්ඛණ රස පච්චුපට්ඨාන පදට්ඨාන
│   └── nibbana.html      නිබ්බාන
│
├── data/                 අන්තර්ගත දත්ත (පාඨ) — පිටු මෙයින් කියවයි
│   ├── matika/
│   │   ├── sabbatika-data.js
│   │   ├── tika/         tika-data.js + තික 22 ගොනු
│   │   ├── duka/         ගොච්ඡක 13 ගොනු
│   │   └── suttanta/     suttanta-data-1…4.js
│   └── paramattha/       citta-data.js, rupa-deta.js
│
├── assets/
│   ├── css/matika-ui.css     සියලු පිටුවල පොදු පෙනුම
│   ├── js/
│   │   ├── matika-ui.js      පටුන, සංචාලන තීරුව, ඉහළට බොත්තම
│   │   ├── matika-theme.js   වර්ණ / අකුරු සැකසුම
│   │   ├── app.js, feedback.js
│   │   ├── pages/            එක් එක් පිටුවේ ක්‍රියාකාරී කේත
│   │   └── vendor/tailwind.min.js
│   ├── icons/                යෙදුම් අයිකන
│   └── screenshots/          Store / manifest තිර රූප
│
└── tools/generate-precache.js   ගොනු වෙනස් කළ පසු:  node tools/generate-precache.js
```

ගොනු එකතු කළ / වෙනස් කළ සෑම විටම `node tools/generate-precache.js` ධාවනය කරන්න — offline cache අනුවාදය ස්වයංක්‍රීයව යාවත්කාලීන වේ.
