// භාවිතය:  node generate-precache.js
// ප්‍රොජෙක්ට් folder එකේ ඇති සියලු ගොනු scan කර precache-manifest.js සාදයි.
// sw.js එය ස්වයංක්‍රීයව import කර offline cache එකට ඇතුළත් කරයි.
// ගොනු වෙනස් කළ සෑම විටම නැවත run කරන්න (cache version ද ස්වයංක්‍රීයව වෙනස් වේ).
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const ROOT = __dirname;
const SKIP_DIRS = new Set(['node_modules', '.git', 'screenshots']);
const SKIP_FILES = new Set(['sw.js', 'precache-manifest.js', 'generate-precache.js', 'tailwind.min.css', 'tailwind_min.css']);
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
const urls = files.map(f => {
  hash.update(fs.readFileSync(f));
  return './' + path.relative(ROOT, f).split(path.sep).map(encodeURIComponent).join('/');
});
const version = 'v' + hash.digest('hex').slice(0, 10);
fs.writeFileSync(path.join(ROOT, 'precache-manifest.js'),
  'self.PRECACHE_VERSION = ' + JSON.stringify(version) + ';\nself.PRECACHE_URLS = ' + JSON.stringify(urls, null, 2) + ';\n');
console.log('✅ ' + urls.length + ' ගොනු ලැයිස්තුගත කළා. version = ' + version);