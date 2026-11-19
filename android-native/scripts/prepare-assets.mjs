// වෙබ් අඩවියේ ගොනු Android ඇප් එකේ assets වෙත පිටපත් කරයි (build වන විට).
//  • Font Awesome CDN සබැඳිය → ඇප් එක ඇතුළේ ඇති පිටපතට (offline සඳහා)
//  • index.html: <html data-mx-lang-home> (භාෂා බොත්තම මුල් පිටුවේ පමණක්)
//  • i18n.js: භාෂා බොත්තම මුල් පිටුවේ පමණක් පෙන්වන ආරක්ෂකය නැවත යොදයි
//  • vendor/fontawesome ගොනු cdnjs වෙතින් බාගත කරයි (git තුළ තබා ගන්නේ නැත)
// ධාවනය: node android-native/scripts/prepare-assets.mjs   (repo මුලේ සිට)
import { cpSync, rmSync, mkdirSync, readdirSync, statSync, readFileSync, writeFileSync, unlinkSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(here, '..');                       // android-native
const root = resolve(appDir, '..');                       // repo මුල
const assets = resolve(appDir, 'app/src/main/assets');

const KEEP_ICONS = new Set(['180.png', '192.png', '50.png', 'favicon.svg', 'icon-maskable.svg', 'icon.svg']);
const SKIP_JS = new Set();
const ROOT_FILES = ['index.html', 'about.html', 'help.html', 'privacy.html', 'updates.html', 'manifest.json'];
const FA_VERSION = '6.4.0';
const FA_LOCAL = '<link rel="stylesheet" href="/assets/vendor/fontawesome/css/all.min.css">';
const FA_CDN = /<link rel="stylesheet" href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/[^"]*">/g;

// ඇප් එකට ආවේණික ගොනු (ඉවත් නොකළ යුතු)
const NATIVE_ONLY = ['assets/js/native-update.js', 'assets/vendor'];

function fixHtml(text, isIndex) {
  text = text.replace(FA_CDN, FA_LOCAL);
  if (isIndex) {
    text = text.replace('<html lang="si" class="h-full">', '<html lang="si" class="h-full" data-mx-lang-home>');
  }
  return text;
}

// 1. පැරණි (generated) ගොනු ඉවත් කර, ආවේණික ඒවා තබා ගනී
for (const name of readdirSync(assets)) {
  if (NATIVE_ONLY.some((p) => p.split('/')[0] === name)) continue;
  if (name === 'assets') {
    for (const sub of readdirSync(join(assets, 'assets'))) {
      if (sub === 'vendor') continue;
      if (sub === 'js') {
        for (const f of readdirSync(join(assets, 'assets/js'))) {
          if (f === 'native-update.js') continue;
          rmSync(join(assets, 'assets/js', f), { recursive: true, force: true });
        }
        continue;
      }
      rmSync(join(assets, 'assets', sub), { recursive: true, force: true });
    }
    continue;
  }
  rmSync(join(assets, name), { recursive: true, force: true });
}

// 2. මුල් පිටුවේ ගොනු
let count = 0;
for (const f of ROOT_FILES) {
  const src = join(root, f);
  if (!existsSync(src)) continue;
  if (f.endsWith('.html')) writeFileSync(join(assets, f), fixHtml(readFileSync(src, 'utf8'), f === 'index.html'));
  else cpSync(src, join(assets, f));
  count++;
}

// 3. ෆෝල්ඩර
const walk = (dir, cb) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) { if (f !== 'screenshots') walk(p, cb); }
    else cb(p);
  }
};
for (const folder of ['assets', 'data', 'matika', 'paramattha']) {
  walk(join(root, folder), (src) => {
    const rel = src.slice(root.length + 1).split('\\').join('/');
    const name = rel.split('/').pop();
    if (rel.startsWith('assets/icons/') && !KEEP_ICONS.has(name)) return;
    if (rel.startsWith('assets/js/') && SKIP_JS.has(name)) return;
    const dest = join(assets, rel);
    mkdirSync(dirname(dest), { recursive: true });
    if (name.endsWith('.html')) writeFileSync(dest, fixHtml(readFileSync(src, 'utf8'), false));
    else if (rel === 'assets/js/i18n.js') {
      let t = readFileSync(src, 'utf8');
      const old = "    var header = document.querySelector('body > header') || document.querySelector('header');";
      const neu = "    /* භාෂා මාරු බොත්තම මුල් පිටුවේ පමණක් (index.html හි <html data-mx-lang-home>) */\n" +
        "    if (!document.documentElement.hasAttribute('data-mx-lang-home')) return;\n" +
        "    var header = document.querySelector('header.home-header') || document.querySelector('body > header') || document.querySelector('header');";
      if (!t.includes('data-mx-lang-home')) {
        if (!t.includes(old)) throw new Error('i18n.js: injectToggle() හි අපේක්ෂිත පේළිය හමු නොවීය');
        t = t.replace(old, neu);
      }
      writeFileSync(dest, t);
    } else cpSync(src, dest);
    count++;
  });
}

// 4. Font Awesome (offline සඳහා) — cdnjs වෙතින්
const faDir = join(assets, 'assets/vendor/fontawesome');
const faFiles = [
  ['css/all.min.css', `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/${FA_VERSION}/css/all.min.css`],
  ['webfonts/fa-brands-400.woff2', `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/${FA_VERSION}/webfonts/fa-brands-400.woff2`],
  ['webfonts/fa-regular-400.woff2', `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/${FA_VERSION}/webfonts/fa-regular-400.woff2`],
  ['webfonts/fa-solid-900.woff2', `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/${FA_VERSION}/webfonts/fa-solid-900.woff2`],
  ['webfonts/fa-v4compatibility.woff2', `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/${FA_VERSION}/webfonts/fa-v4compatibility.woff2`]
];
let fetched = 0;
for (const [rel, url] of faFiles) {
  const dest = join(faDir, rel);
  if (existsSync(dest) && statSync(dest).size > 0) continue;     // දැනටමත් ඇත්නම් බාගත නොකරයි
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Font Awesome බාගත වුණේ නැහැ (${rel}): HTTP ${res.status}`);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  fetched++;
}

console.log(`assets ready: ${count} ගොනු | Font Awesome බාගත කළා: ${fetched}`);
