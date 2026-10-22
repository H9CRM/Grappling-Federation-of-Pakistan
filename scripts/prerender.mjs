import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { createServer } from 'vite'

const root = process.cwd()
const dist = path.join(root, 'dist')
const template = await readFile(path.join(dist, 'index.html'), 'utf8')
const server = await createServer({ mode: 'production', server: { middlewareMode: true }, appType: 'custom' })

try {
  const { render, sitePages } = await server.ssrLoadModule('/src/entry-server.jsx')
  for (const page of [...sitePages, { path: '/404' }]) {
    const result = await render(page.path)
    if (!result.html || !/<h1[\s>]/i.test(result.html)) throw new Error(`Missing rendered content: ${page.path}`)
    const headTags = []
    const body = result.html.replace(/<title>[^<]*<\/title>|<meta\s[^>]*>|<link\s+rel="canonical"[^>]*>/gi, (tag) => {
      headTags.push(tag.replace(/^<(\w+)([^>]*?)(\/?)>/, '<$1$2 data-prerender-head=""$3>'))
      return ''
    })
    const cleanTemplate = template
      .replace(/<title>[^<]*<\/title>/i, '')
      .replace(/<meta property="og:site_name"[^>]*>/i, '')
      .replace(/<meta property="og:image"[^>]*>/i, '')
      .replace(/<meta name="twitter:card"[^>]*>/i, '')
    const html = cleanTemplate.replace('</head>', `${headTags.join('')}</head>`).replace('<div id="root"></div>', `<div id="root">${body}</div>`)
    const target = page.path === '/404' ? path.join(dist, '404.html') : page.path === '/' ? path.join(dist, 'index.html') : path.join(dist, page.path.slice(1), 'index.html')
    await mkdir(path.dirname(target), { recursive: true })
    await writeFile(target, html)
  }
  // Pages serves directory indexes but has no server-side redirects or SPA fallback.
  const { assetPath, absoluteUrl } = await server.ssrLoadModule('/src/lib/urls.js')
  for (const [from, to] of [['/rankings', '/results'], ['/policies', '/policies/safeguarding']]) {
    const target = path.join(dist, from.slice(1), 'index.html')
    await mkdir(path.dirname(target), { recursive: true })
    await writeFile(target, `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Page moved | GFP</title><meta name="robots" content="noindex, follow"><link rel="canonical" href="${absoluteUrl(to)}"><meta http-equiv="refresh" content="0;url=${assetPath(to)}"></head><body><h1>Page moved</h1><p><a href="${assetPath(to)}">Continue to the current page</a>.</p></body></html>`)
  }
  await writeFile(path.join(dist, '.nojekyll'), '')
  console.log(`Prerendered ${sitePages.length} routes`)
} finally {
  await server.close()
}
