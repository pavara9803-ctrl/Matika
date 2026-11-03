// භාවිතය:  node tools/generate-precache.js
// ප්‍රොජෙක්ට් folder එකේ ඇති සියලු ගොනු scan කර precache-manifest.js සාදයි.
// sw.js එය ස්වයංක්‍රීයව import කර offline cache එකට ඇතුළත් කරයි.
// ගොනු වෙනස් කළ සෑම විටම නැවත run කරන්න (cache version ද ස්වයංක්‍රීයව වෙනස් වේ).
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..');
const SKIP_DIRS = new Set(['node_modules', '.git', 'screenshots', 'tools', '.well-known']);
const SKIP_FILES = new Set(['vercel.json', 'google8495547c2c561a1f.html', 'sw.js', 'precache-manifest.js', 'generate-precache.js', 'tailwind.min.css', 'tailwind_min.css']);
const EXT = /\.(html|js|css|json|png|jpe?g|svg|webp|ico|woff2?|ttf)$/i;
const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(full); }
    else if (EXT.test(e.name) && !SKIP_FILES.has(e.name)) files.push(full);
  }
})(ROOT);
files.sort();
const hash = crypto.createHash('md5');
const toUrl = f => './' + path.relative(ROOT, f).split(path.sep).map(encodeURIComponent).join('/');
// CORE  = ඇප් එක offline ක්‍රියා කිරීමට අත්‍යවශ්‍ය (html/js/css/data + මූලික අයිකන). install විට සියල්ල බාගත විය යුතුයි.
// LATER = භාෂා (i18n) ගොනු සහ අමතර අයිකන ප්‍රමාණ — පසුබිමේ බාගැනේ (අසාර්ථක වුවද ඇප් එකට හානියක් නැත).
const CORE_ICONS = new Set(['favicon.svg', 'icon.svg', '50.png', '180.png', '192.png', '512.png', 'maskable-192.png', 'maskable-512.png']);
const isLater = f => {
  const rel = path.relative(ROOT, f).split(path.sep);
  if (rel[0] === 'assets' && rel[1] === 'i18n') return true;
  if (rel[0] === 'assets' && rel[1] === 'icons') return !CORE_ICONS.has(rel[rel.length - 1]);
  return false;
};
const core = [], later = [];
files.forEach(f => { hash.update(fs.readFileSync(f)); (isLater(f) ? later : core).push(toUrl(f)); });
const version = 'v' + hash.digest('hex').slice(0, 10);
fs.writeFileSync(path.join(ROOT, 'precache-manifest.js'),
  'self.PRECACHE_VERSION = ' + JSON.stringify(version) + ';\n' +
  'self.PRECACHE_CORE = ' + JSON.stringify(core, null, 2) + ';\n' +
  'self.PRECACHE_LATER = ' + JSON.stringify(later, null, 2) + ';\n');
console.log('✅ core ' + core.length + ' + later ' + later.length + ' ගොනු ලැයිස්තුගත කළා. version = ' + version);
