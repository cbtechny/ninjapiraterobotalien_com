// Discover every published route, including legacy redirects, from the staged site.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(process.env.SITE_ROOT || '_site');
const base = process.env.SITE_URL || 'http://127.0.0.1:8897';
const output = '.test-server/sitewide';
fs.mkdirSync(output, { recursive: true });
function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const name = path.join(dir, entry.name);
    return entry.isDirectory() ? files(name) : [name];
  });
}
const pages = files(root).filter(p => p.endsWith('.html') && !path.relative(root, p).startsWith('partials' + path.sep));
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const results = { checks: [], errors: [], externalFailures: [] };
  try {
    for (const file of pages) {
      const route = '/' + path.relative(root, file).split(path.sep).join('/');
      const source = fs.readFileSync(file, 'utf8');
      const redirect = source.match(/http-equiv="refresh"[^>]*content="[^";]*;\s*url=([^"]+)"/i);
      for (const width of [320, 390, 768, 1440]) {
        const p = await browser.newPage({ viewport: { width, height: 900 } });
        const bad = [];
        p.on('pageerror', error => results.errors.push({ route, width, error: error.message }));
        p.on('response', response => { if (response.url().startsWith(base) && response.status() >= 400) bad.push(response.url()); });
        p.on('requestfailed', request => {
          if (request.url().startsWith(base)) bad.push(request.url());
          else results.externalFailures.push(request.url());
        });
        await p.goto(base + route, { waitUntil: 'networkidle' });
        if (redirect) await p.waitForURL(base + redirect[1]);
        await p.evaluate(() => document.fonts.ready);
        for (const image of await p.locator('main img').all()) await image.scrollIntoViewIfNeeded();
        await p.waitForLoadState('networkidle');
        const state = await p.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth,
          charset: document.characterSet,
          h1: document.querySelectorAll('h1').length,
          main: document.querySelectorAll('main').length,
          title: document.title.trim(),
          description: document.querySelector('meta[name="description"]')?.content,
          images: [...document.images].every(i => i.complete && i.naturalWidth > 0 && i.hasAttribute('alt')),
          unnamedLinks: [...document.querySelectorAll('a')].filter(a => !a.textContent.trim() && !a.getAttribute('aria-label') && !a.querySelector('img[alt]')).map(a => a.href),
          corruptText: /[\u0080-\u009f\ufffd]|\u00c2[\u00a0-\u00bf]|\u00e2[\u0080-\u00bf\u20ac]/.test(document.body.innerText),
          fonts: [...document.fonts].map(f => ({ family: f.family, status: f.status })),
        }));
        const label = route + ' at ' + width;
        assert(!state.overflow, label + ': overflow');
        assert.equal(state.charset, 'UTF-8', label);
        assert.equal(state.main, 1, label);
        assert.equal(state.h1, 1, label);
        assert(state.title && state.description, label + ': metadata');
        assert(state.images, label + ': image/alt');
        assert(!state.corruptText, label + ': corrupted text');
        assert.deepEqual(state.unnamedLinks, [], label);
        assert.deepEqual(bad, [], label);
        // Google Fonts includes subsets that remain unloaded when unused.
        assert(state.fonts.every(f => f.status !== 'error'), label + ': font load');
        for (const family of ['Bangers', 'Inter']) assert(state.fonts.some(f => f.family === family && f.status === 'loaded'), label + ': ' + family);
        if (width <= 768) {
          await p.locator('.mobile-menu-toggle').click();
          assert(await p.locator('.main-nav a').first().isVisible(), label + ': menu');
          await p.keyboard.press('Escape');
        }
        await p.evaluate(() => scrollTo(0, 0));
        if (!redirect && [390, 1440].includes(width)) await p.screenshot({ path: `${output}/${route.slice(1).replaceAll('/', '-')}-${width}.png`, fullPage: true });
        results.checks.push({ route, width, final: new URL(p.url()).pathname + new URL(p.url()).hash, ...state });
        await p.close();
      }
    }
    assert.deepEqual(results.errors, []);
    console.log(JSON.stringify({ routes: pages.length, layouts: results.checks.length, errors: results.errors, externalFailures: [...new Set(results.externalFailures)] }));
  } finally {
    fs.writeFileSync(`${output}/results.json`, JSON.stringify(results, null, 2));
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
