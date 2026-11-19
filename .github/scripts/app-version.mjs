// ඇප් අනුවාද අංක (app-version.json — repo එකේ මුල):
//   next <android|windows|macos|linux>        → ඊළඟ අනුවාදය GITHUB_ENV / stdout වෙත (අවසාන අගය + 1)
//   save <android|windows|macos|linux> <file> → build එකෙන් පසු app-version.json යාවත්කාලීන කරයි
// env: VERSION, VERSION_CODE, URL, PAGE, SIZE, NOTES (save සඳහා)
//      දෙවන ගොනුවක් ඇත්නම් (උදා: Linux .deb): URL2, SIZE2, LABEL2
import { readFileSync, writeFileSync, existsSync, appendFileSync } from 'node:fs';
const [cmd, platform, file = 'app-version.json'] = process.argv.slice(2);
const PLATFORMS = ['android', 'windows', 'macos', 'linux'];
if (!['next', 'save'].includes(cmd) || !PLATFORMS.includes(platform)) {
  console.error(`usage: next|save ${PLATFORMS.join('|')} [file]`); process.exit(1);
}
const data = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : {};
const cur = data[platform] || {};
const e = process.env;
const bumpLast = (v, def) => { const p = String(v || def).split('.'); p[p.length - 1] = String((parseInt(p[p.length - 1], 10) || 0) + 1); return p.join('.'); };

if (cmd === 'next') {
  let out;
  if (platform === 'android') {
    const code = (parseInt(cur.versionCode, 10) || 0) + 1;
    out = { VERSION_CODE: String(code), VERSION_NAME: cur.versionName ? bumpLast(cur.versionName) : '1.0.0.' + code };
  } else {
    out = { APP_VERSION: cur.version ? bumpLast(cur.version) : '1.0.0' };  // පළමු build එක 1.0.0
  }
  for (const [k, v] of Object.entries(out)) {
    console.log(`${k}=${v}`);
    if (e.GITHUB_ENV) appendFileSync(e.GITHUB_ENV, `${k}=${v}\n`);
  }
} else {
  const entry = platform === 'android'
    ? { versionCode: parseInt(e.VERSION_CODE, 10), versionName: e.VERSION }
    : { version: e.VERSION };
  if (e.URL) entry.url = e.URL;
  if (e.PAGE) entry.page = e.PAGE;
  if (e.SIZE) entry.size = parseInt(e.SIZE, 10) || 0;
  if (e.URL2) {
    entry.url2 = e.URL2;
    if (e.SIZE2) entry.size2 = parseInt(e.SIZE2, 10) || 0;
    if (e.LABEL2) entry.label2 = e.LABEL2;
  }
  entry.date = new Date().toISOString().slice(0, 10);
  const notes = (e.NOTES || '').replace(/\\n/g, '\n').trim();
  if (notes) entry.notes = notes;
  if (platform === 'android' && !(entry.versionCode > 0)) { console.error('VERSION_CODE missing'); process.exit(1); }
  if (!entry.version && !entry.versionName) { console.error('VERSION missing'); process.exit(1); }
  data[platform] = entry;
  const out = {};
  for (const k of PLATFORMS) if (data[k]) out[k] = data[k];
  writeFileSync(file, JSON.stringify(out, null, 2) + '\n');
  console.log(platform, JSON.stringify(entry));
}
