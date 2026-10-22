import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { createServer } from 'vite'

const root = process.cwd()
const dist = path.join(root, 'dist')
const template = await readFile(path.join(dist, 'index.html'), 'utf8')
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })

try {
  const { render, sitePages } = await server.ssrLoadModule('/src/entry-server.jsx')
  for (const page of sitePages) {
    const result = await render(page.path)
    if (!result.html || !/<h1[\s>]/i.test(result.html)) throw new Error(`Missing rendered content: ${page.path}`)
    const headTags = []
    const body = result.html.replace(/<title>[^<]*<\/title>|<meta\s[^>]*>|<link\s+rel="canonical"[^>]*>/gi, (tag) => {
      headTags.push(tag)
      return ''
    })
    const cleanTemplate = template
      .replace(/<title>[^<]*<\/title>/i, '')
      .replace(/<meta property="og:site_name"[^>]*>/i, '')
      .replace(/<meta property="og:image"[^>]*>/i, '')
      .replace(/<meta name="twitter:card"[^>]*>/i, '')
    const html = cleanTemplate.replace('</head>', `${headTags.join('')}</head>`).replace('<div id="root"></div>', `<div id="root">${body}</div>`)
    const target = page.path === '/' ? path.join(dist, 'index.html') : path.join(dist, page.path.slice(1), 'index.html')
    await mkdir(path.dirname(target), { recursive: true })
    await writeFile(target, html)
  }
  console.log(`Prerendered ${sitePages.length} routes`)
} finally {
  await server.close()
}
