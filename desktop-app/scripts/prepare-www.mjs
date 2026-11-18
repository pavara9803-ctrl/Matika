// වෙබ් අඩවියේ ගොනු Windows ඇප් එක ඇතුළට (desktop-app/www) පිටපත් කරයි.
//  • ඇප් එකට අවශ්‍ය නොවන විශාල ගොනු (screenshots, විශාල icons) ඉවත් කරයි
//  • සෑම HTML පිටුවකටම desktop-links.js එක් කරයි (බාහිර සබැඳි පද්ධති browser එකේ විවෘත කිරීමට)
// ධාවනය: npm run prepare-www   (desktop-app ඇතුළේ)
import { cpSync, rmSync, mkdirSync, readdirSync, statSync, readFileSync, writeFileSync, unlinkSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(here, '..');            // desktop-app
const root = resolve(appDir, '..');            // repo මුල
const www = resolve(appDir, 'www');

// 1. www අලුතෙන්
rmSync(www, { recursive: true, force: true });
mkdirSync(www, { recursive: true });

// 2. මුල් පිටුවේ HTML + manifest
for (const f of readdirSync(root)) {
  if (f.endsWith('.html') || f === 'manifest.json') cpSync(join(root, f), join(www, f));
}

// 3. ඇප් එකට අවශ්‍ය ෆෝල්ඩර
for (const d of ['assets', 'data', 'matika', 'paramattha']) {
  cpSync(join(root, d), join(www, d), { recursive: true });
}

// 4. විශාල, ඇප් එකට අවශ්‍ය නොවන ගොනු ඉවත් කිරීම (.exe ප්‍රමාණය අඩු කිරීමට)
rmSync(join(www, 'assets', 'screenshots'), { recursive: true, force: true });
const keepIcons = new Set(['launchericon-512x512.png', '192.png', '512.png', '16.png', '128.png']);
const iconDir = join(www, 'assets', 'icons');
if (existsSync(iconDir)) {
  for (const f of readdirSync(iconDir)) {
    const p = join(iconDir, f);
    const st = statSync(p);
    if (st.isFile() && !keepIcons.has(f) && st.size > 100 * 1024) unlinkSync(p);
  }
}

// 5. බාහිර සබැඳි සඳහා shim එක + එය සෑම HTML පිටුවකටම
cpSync(join(appDir, 'desktop-links.js'), join(www, 'desktop-links.js'));
let patched = 0;
const addShim = (dir, depth) => {
  const prefix = depth === 0 ? './' : '../'.repeat(depth);
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) {
      if (['assets', 'data'].includes(f)) continue;
      addShim(p, depth + 1);
      continue;
    }
    if (!f.endsWith('.html')) continue;
    let html = readFileSync(p, 'utf8');
    if (html.includes('desktop-links.js')) continue;
    const tag = `<script src="${prefix}desktop-links.js" defer></script>`;
    html = html.includes('</body>') ? html.replace('</body>', `  ${tag}\n</body>`) : html + `\n${tag}\n`;
    writeFileSync(p, html);
    patched++;
  }
};
addShim(www, 0);

console.log('www ready:', www, '| HTML පිටු', patched, 'කට desktop-links.js එක් කළා');
