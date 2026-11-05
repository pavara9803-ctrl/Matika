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
