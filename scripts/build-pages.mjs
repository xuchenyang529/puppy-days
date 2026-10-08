import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const base = process.env.PAGES_BASE_PATH || '/puppy-days/';
if (!/^\/(?:[A-Za-z0-9._-]+\/)*$/.test(base)) throw new Error('Invalid Pages base path');
execFileSync(process.execPath, ['scripts/check-mobile-runtime.mjs'], { stdio: 'inherit' });
execFileSync(process.execPath, ['node_modules/typescript/bin/tsc', '--noEmit'], { stdio: 'inherit' });
execFileSync(process.execPath, ['node_modules/vite/bin/vite.js', 'build', '--base', base], { stdio: 'inherit' });
// Adapt runtime and catalog asset URLs in the deployment output; preserve runtime source.
function visit(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, e.name);
    if (e.isDirectory()) visit(file);
    else if (/\.(js|css|html)$/.test(e.name)) {
      const text = readFileSync(file, 'utf8');
      writeFileSync(file, text.replace(/(["'`(])\/(assets\/|pets\/|recommendation\.js)/g, `$1${base}$2`));
    }
  }
}
visit('dist/client');
writeFileSync('dist/client/.nojekyll', '');
console.log(`GitHub Pages output ready at dist/client with base ${base}`);
