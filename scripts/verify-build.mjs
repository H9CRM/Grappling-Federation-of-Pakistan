import assert from 'node:assert/strict'
import { access, readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { loadEnv } from 'vite'
import { deploymentConfig } from '../deployment.config.js'

const dist = path.resolve('dist')
const { siteUrl, base, origin } = deploymentConfig({ ...loadEnv('production', process.cwd(), ''), ...process.env })
const required = ['robots.txt', 'sitemap.xml', 'sitemap-index.xml', 'image-sitemap.xml', 'llms.txt', 'humans.txt', 'site.webmanifest', 'favicon.ico', 'og-image.jpg', '404.html', '.nojekyll']
await Promise.all(required.map((file) => access(path.join(dist, file))))

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(entries.map((entry) => entry.isDirectory() ? htmlFiles(path.join(dir, entry.name)) : entry.name.endsWith('.html') ? [path.join(dir, entry.name)] : []))
  return nested.flat()
}

const checked = new Set()
async function localTarget(value, file) {
  if (!value || value.startsWith('#') || /^(?:data:|mailto:|tel:|https?:|\/\/)/.test(value)) return
  assert(value.startsWith(base), `URL outside deployment base in ${file}: ${value}`)
  const target = path.join(dist, decodeURIComponent(value.slice(base.length).split(/[?#]/)[0]))
  if (checked.has(target)) return
  checked.add(target)
  try { await access(path.extname(target) ? target : path.join(target, 'index.html')) }
  catch { throw new Error(`Missing local target in ${file}: ${value}`) }
}

let count = 0
for (const file of await htmlFiles(dist)) {
  const html = await readFile(file, 'utf8')
  assert(/<h1[\s>]/i.test(html), `Missing readable H1 in ${file}`)
  assert(/<title\b[^>]*>[^<]+<\/title>/i.test(html), `Missing title in ${file}`)
  for (const [, json] of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) JSON.parse(json)
  if (!/<meta name="robots" content="noindex/.test(html)) {
    count++
    const route = path.relative(dist, path.dirname(file)).split(path.sep).join('/')
    assert(html.includes(`<link rel="canonical" href="${siteUrl}/${route}"`), `Incorrect canonical in ${file}`)
    for (const pattern of [/<meta name="description" content="[^"]+"/, /<meta property="og:title"/, /<meta property="og:description"/, /<meta property="og:image"/, /type="application\/ld\+json"/, /<h2[\s>]/, /<p[\s>]/, /<a\s/, /<img\s/]) {
      assert(pattern.test(html), `Missing content or metadata ${pattern} in ${file}`)
    }
  }
  for (const [tag] of html.matchAll(/<img\b[^>]*>/gi)) assert(/\balt="[^"]*"/.test(tag), `Image missing alt in ${file}`)
  for (const [, value] of html.matchAll(/\b(?:href|src|poster)="([^"]+)"/gi)) await localTarget(value, file)
  for (const [, srcset] of html.matchAll(/\b(?:srcset|imageSrcSet)="([^"]+)"/gi)) {
    for (const candidate of srcset.split(',')) await localTarget(candidate.trim().split(/\s+/)[0], file)
  }
}
assert(count > 1, 'Expected multiple prerendered pages')
for (const name of ['sitemap.xml', 'sitemap-index.xml', 'image-sitemap.xml']) {
  const xml = await readFile(path.join(dist, name), 'utf8')
  for (const [, url] of xml.matchAll(/<(?:loc|image:loc)>([^<]+)<\//g)) {
    assert(url.startsWith(`${siteUrl}/`), `Incorrect deployment URL in ${name}: ${url}`)
    await localTarget(url.slice(origin.length), name)
  }
}
assert((await readFile(path.join(dist, 'image-sitemap.xml'), 'utf8')).includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'))
const manifest = JSON.parse(await readFile(path.join(dist, 'site.webmanifest'), 'utf8'))
assert.equal(manifest.start_url, base)
for (const icon of manifest.icons) await localTarget(icon.src, 'site.webmanifest')
console.log(`Verified ${count} prerendered pages, JSON-LD, metadata, SEO files and ${checked.size} local targets for ${siteUrl}/`)
