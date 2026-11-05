// භාවිතය:  node tools/generate-search-index.js
// තික / දුක / සුත්තන්ත / සබ්බත්තික දත්ත ගොනු කියවා සෙවුම් දර්ශකය (data/search/search-index.js) සාදයි.
// දත්ත ගොනු (data/matika/**) වෙනස් කළ සෑම විටම මෙය නැවත ධාවනය කර, ඉන්පසු tools/generate-precache.js ධාවනය කරන්න.
const vm = require('vm'), fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const sb = { console: { log() {}, warn() {}, error() {} }, document: { addEventListener() {}, readyState: 'loading', getElementById() { return null; } }, localStorage: { getItem() { return null; } } };
sb.window = sb; sb.globalThis = sb; vm.createContext(sb);
const load = f => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), sb, { filename: f });
const dir = d => fs.readdirSync(path.join(ROOT, d)).sort();

load('data/matika/tika/tika-data.js');
dir('data/matika/tika').filter(f => /^\d\d-/.test(f)).forEach(f => load('data/matika/tika/' + f));
dir('data/matika/duka').filter(f => /\.js$/.test(f)).forEach(f => load('data/matika/duka/' + f));
['1', '2', '3', '4'].forEach(n => load('data/matika/suttanta/suttanta-data-' + n + '.js'));
load('data/matika/sabbatika-data.js');

// පරමාර්ථ (සිත් / චෛතසික / රූප / නිබ්බාන) දත්ත — atlas ස්ක්‍රිප්ට් වල PMAtlas.create() ග්‍රහණය කර රූප විස්තර ලබාගනී
const caps = [];
const sb2 = { console: sb.console, localStorage: sb.localStorage, location: { hash: '', search: '', pathname: '' }, history: { replaceState() {} }, navigator: {}, matchMedia() { return { matches: false }; }, setTimeout() {}, addEventListener() {},
  document: Object.assign({}, sb.document, { querySelector() { return null; }, querySelectorAll() { return []; } }),
  PMAtlas: { create(c) { caps.push(c); return { open() {}, openHtml() {}, state: {} }; } } };
sb2.window = sb2; sb2.globalThis = sb2; vm.createContext(sb2);
const load2 = f => { try { vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), sb2, { filename: f }); } catch (e) { console.error('⚠', f, e.message.slice(0, 80)); } };
['data/paramattha/citta-data.js', 'data/paramattha/citta121-table.js', 'data/paramattha/caitasika-data.js', 'data/paramattha/rupa-data.js', 'data/paramattha/rupa-deta-full.js', 'data/paramattha/rupa-deta.js', 'assets/js/pages/rupa-atlas.js'].forEach(load2);
const g2 = n => { try { return vm.runInContext(n, sb2); } catch (e) { return undefined; } };
const plain = h => String(h || '').replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ').replace(/<br\s*\/?>|<\/(p|div|li|tr|h\d)>/gi, ' · ').replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/\s*·\s*(·\s*)+/g, ' · ').replace(/\s+/g, ' ').trim();

const LBL = {
  desc: 'විස්තරය', padaArtha: 'පදාර්ථ', svartha: 'ස්වරූපාර්ථ', nirukthi: 'නිරුක්ති', abhidheya: 'අභිධෙය්‍යාර්ථ', sangraha: 'සංග්‍රහ',
  vishesha: 'විශේෂ සටහන්', skandha: 'ස්කන්ධ', ayatana: 'ආයතන', dhatu: 'ධාතු', sathya: 'සත්‍ය', mukta: 'මුක්ත ධර්ම', notes: 'සටහන්', note: 'සටහන්', pali: 'පාළි'
};
const SKIP = new Set(['id', 'num', 'number', 'count', 'dukaCount', 'mishrakaCount']);
const clean = s => String(s).replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
function collect(o, label, out) {
  if (o == null) return;
  if (typeof o === 'string') { const t = clean(o); if (t) (out[label] = out[label] || []).push(t); return; }
  if (Array.isArray(o)) { o.forEach(x => collect(x, label, out)); return; }
  if (typeof o === 'object') Object.keys(o).forEach(k => { if (!SKIP.has(k)) collect(o[k], LBL[k] || label, out); });
}
function sections(o, firstLabel) {
  const out = {}; collect(o, firstLabel || 'විස්තරය', out);
  return Object.keys(out).map(k => [k, Array.from(new Set(out[k])).join(' · ')]);
}
const E = [];
const push = (y, n, c, l, p, s) => { const sec = s.filter(x => x[1]); E.push({ y, n: clean(n), c: clean(c), l, p: p ? clean(p) : '', s: sec }); };

// ත්‍රික
sb.tikaFullData.forEach((t, i) => (t.padas || []).forEach((p, j) => {
  const { name, ...rest } = p; push('tika', name, t.title, 'matika/tika-matika.html?t=' + i + '&p=' + j, '', sections(rest));
}));
// දුක
const goch = Object.keys(sb).filter(k => /^gochhaka\d\d/.test(k)).sort().map(k => sb[k]).filter(Boolean);
goch.forEach(g => {
  (g.dukas || []).forEach(d => (d.padas || []).forEach((p, k) => {
    const { name, ...rest } = p;
    const extra = sections({ mukta: d.mukta });
    push('duka', name, g.title + ' › ' + d.number + '. ' + d.name, 'matika/duka-matika.html?g=' + g.id + '&d=' + d.number + '&k=' + k, d.pali, sections(rest).concat(extra));
  }));
  (g.mishrakaDukas || []).forEach(m => push('duka', m.name, g.title + ' › මිශ්‍රක දුක', 'matika/duka-matika.html?g=' + g.id, m.pali, sections({ desc: m.desc, note: m.note })));
  (g.notes || []).forEach(n => push('duka', n.title, g.title + ' › ගොච්ඡක සටහන්', 'matika/duka-matika.html?g=' + g.id, '', sections({ c: n.content })));
});
// සුත්තන්ත
sb.suttantaFullData.forEach((d, i) => (d.padas || []).forEach((p, j) => {
  const { name, ...rest } = p;
  push('suttanta', name, (d.title || '') + ' › ' + (d.name || ''), 'matika/suttanta-matika.html?d=' + i + '&p=' + j, d.pali, sections(rest).concat(sections({ mukta: d.mukta })));
}));
// සබ්බත්තික
const sab = sb.sabbattikaMatika;
Object.keys(sab).forEach(k => {
  const v = sab[k]; const title = (v && v.title) || k;
  const s = sections(Object.assign({}, v, { title: undefined }));
  push('sabbattika', title, 'සබ්බත්තික මාතිකා', 'matika/sabbattika.html', '', s);
});


// ───────── පරමාර්ථ ─────────
const P = 'paramattha/';
// සිත්
const CT = g2('CITTA121_TABLE') || [];
CT.forEach(sec => (sec.parts || []).forEach(part => (part.subs || []).forEach(sub => (sub.rows || []).forEach(r => {
  const ctx = ['සිත් 121', sec.title, part.title, sub.name].filter(Boolean).join(' › ');
  push('citta', (r.c || []).join(' '), ctx, P + 'citta.html#c' + r.n, '', [['පාලි', (r.p || []).join(' ')], ['අංකය', 'සිත ' + r.n]]);
}))));
(g2('cittaDetailData') || []).forEach(d => push('citta', d.title, 'සිත් › විස්තරය', P + 'citta.html', '', [['විස්තරය', plain(d.desc)]]));
const c121 = g2('citta121Data') || {};
Object.keys(c121).forEach(k => { const d = c121[k]; if (d && d.title) push('citta', d.title, 'සිත් 121 › විස්තරය', P + 'citta.html', '', [['විස්තරය', plain(d.desc)]]); });
(g2('cittaData') || []).forEach(c => push('citta', c.category, 'සිත් › ' + (c.category || ''), P + 'citta.html', '', sections({ d: c.description, items: c.items })));
// චෛතසික 52 (atlas හි අනුපිළිවෙලම: සබ්බචිත්ත → ප්‍රකීර්ණක → අකුසල → සෝභන)
const CG = [['සර්ව චිත්ත සාධාරණ', 'sabbacittaData'], ['ප්‍රකීර්ණක', 'pakirnakaData2'], ['අකුසල', 'akusalaData2'], ['සෝභන', 'sobhanaData']];
let cn = 0;
CG.forEach(([gname, v]) => (g2(v) || []).forEach(d => { cn++; const { name, pali, num, yedena, ...rest } = d; push('cetasika', name, 'චෛතසික 52 › ' + gname, P + 'caitasika.html#c' + cn, pali, sections({ lakshana: rest.lakshana, y: typeof yedena === 'string' ? yedena : '', desc: rest.desc }, 'විස්තරය').concat([['අංකය', 'චෛතසික ' + cn]])); }));
(g2('CAITASIKA_LESSONS') || []).forEach(l => push('cetasika', l.title, 'චෛතසික › පාඩම ' + l.n, P + 'caitasika.html', '', [['පාඩම', plain(l.html)]]));
const LR = g2('CAITASIKA_LR_DATA');
if (LR) { push('cetasika', LR.title, 'චෛතසික › හැඳින්වීම', P + 'caitasika.html', '', sections({ i: LR.intro })); (LR.categories || []).forEach(c => (c.items || []).forEach(it => push('cetasika', it.name || it.title || c.categoryName, 'චෛතසික › ' + c.categoryName, P + 'caitasika.html', '', sections(it)))); }
// රූප 28 (PMAtlas detail HTML)
const rc = caps.find(c => c.hash === 'r');
if (rc) Object.keys(rc.items).forEach(id => { const it = rc.items[id]; let h = ''; try { h = rc.detail(id, {}); } catch (e) {} push('rupa', it.name, 'රූප 28 › ' + (it.cat || ''), P + 'rupa.html#r' + id, '', [['විස්තරය', plain(h)]]); });
const RD = g2('rupaDetaData') || {}, RF = g2('rupaDetaFull') || {};
Object.keys(Object.assign({}, RD, RF)).forEach(k => { const a = RD[k] || {}, f = RF[k] || {}; push('rupa', a.title || k, 'රූප › ' + (a.subtitle || 'පාඩම'), P + 'rupa.html', '', [['පාඩම', plain(f.html || a.content)]]); });
const RI = g2('rupaIntroData'); if (RI) push('rupa', RI.title, 'රූප › හැඳින්වීම', P + 'rupa.html', '', sections(RI));
const RB = g2('rupaBhavanaMethod'); if (RB) push('rupa', RB.title, 'රූප › භාවනා ක්‍රමය', P + 'rupa.html', '', sections(RB));
const VC = g2('vibhagaCategories') || {}; Object.keys(VC).forEach(k => push('rupa', VC[k].title, 'රූප › විභාග', P + 'rupa.html', '', [['විස්තරය', plain(VC[k].desc)]]));
// නිබ්බාන (static HTML)
{
  const html = fs.readFileSync(path.join(ROOT, 'paramattha/nibbana.html'), 'utf8');
  const re = /<section id="sec-[a-z]+"[^>]*aria-label="([^"]+)"[\s\S]*?(?=<section id="sec-[a-z]+"|<\/main>|$)/g; let m;
  while ((m = re.exec(html))) {
    const label = m[1], parts = m[0].split(/(?=<h[34][^>]*>)/);
    parts.forEach((pt, i) => {
      const hm = /<h[34][^>]*>([\s\S]*?)<\/h[34]>/.exec(pt); const txt = plain(pt.replace(/<h[34][^>]*>[\s\S]*?<\/h[34]>/, ''));
      if (txt.length < 20) return;
      push('nibbana', hm ? plain(hm[1]) : label, 'නිබ්බාන › ' + label, P + 'nibbana.html', '', [['විස්තරය', txt]]);
    });
  }
}

// භාෂා 4 ක නාම/සන්දර්භ පරිවර්තන (assets/i18n) — ඉංග්‍රීසි/බුරුම/චීන අකුරින් ද සෙවීමට
const LANGS = { e: /^en-/, m: /^my-/, z: /^zh-(?!Hant)/, h: /^zh-Hant-/ };
Object.keys(LANGS).forEach(code => {
  const D = {}; const mx = { add(o) { Object.assign(D, o); }, addPatterns() {}, addRegex() {}, addPattern() {} };
  dir('assets/i18n').filter(f => LANGS[code].test(f)).forEach(f => { try { new Function('MX_I18N', 'window', fs.readFileSync(path.join(ROOT, 'assets/i18n/' + f), 'utf8'))(mx, {}); } catch (e) {} });
  const tr = s => s.split(' › ').map(x => D[x] || D[x.replace(/^\d+\.\s*/, '')] || x).join(' › ');
  E.forEach(e => { const n = D[e.n]; const c = tr(e.c); if (n || c !== e.c) e[code] = [n || '', c !== e.c ? c : '']; });
});
const out = 'window.MATIKA_SEARCH = ' + JSON.stringify(E) + ';\n';
fs.mkdirSync(path.join(ROOT, 'data/search'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'data/search/search-index.js'), out);
const by = {}; E.forEach(e => by[e.y] = (by[e.y] || 0) + 1);
console.log('✅ සෙවුම් දර්ශකය: ' + E.length + ' සටහන් ' + JSON.stringify(by) + ' · ' + (out.length / 1024).toFixed(0) + ' KB');
