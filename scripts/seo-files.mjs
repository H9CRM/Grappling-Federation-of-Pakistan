import { readdir, readFile, writeFile, mkdir, copyFile } from 'node:fs/promises'
import path from 'node:path'
import { loadEnv } from 'vite'
import { deploymentConfig } from '../deployment.config.js'

const dist = path.resolve('dist')
const { siteUrl: domain, base, origin } = deploymentConfig({ ...loadEnv('production', process.cwd(), ''), ...process.env })
const xml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const today = new Date().toISOString().slice(0, 10)

async function pages(dir = dist, prefix = '') {
  const entries = await readdir(dir, { withFileTypes: true })
  const found = []
  if (entries.some((entry) => entry.name === 'index.html')) {
    const html = await readFile(path.join(dir, 'index.html'), 'utf8')
    if (!/<meta name="robots" content="noindex/i.test(html)) found.push({ route: prefix || '/', html })
  }
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name !== 'assets' && entry.name !== 'brand' && entry.name !== 'icons') {
      found.push(...await pages(path.join(dir, entry.name), `${prefix}/${entry.name}`))
    }
  }
  return found
}

export async function sitemap() {
  const urls = await pages()
  const body = urls.map(({ route }) => `  <url><loc>${xml(domain + route)}</loc><lastmod>${today}</lastmod><changefreq>${route === '/' || route === '/events' ? 'weekly' : 'monthly'}</changefreq><priority>${route === '/' ? '1.00' : route === '/events' ? '0.90' : '0.70'}</priority></url>`).join('\n')
  await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`)
  await writeFile(path.join(dist, 'sitemap-index.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${domain}/sitemap.xml</loc><lastmod>${today}</lastmod></sitemap><sitemap><loc>${domain}/image-sitemap.xml</loc><lastmod>${today}</lastmod></sitemap></sitemapindex>\n`)
  await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: ${base}\n${['admin', 'private', 'test', 'staging', 'drafts'].map((route) => `Disallow: ${base}${route}/`).join('\n')}\n\nSitemap: ${domain}/sitemap-index.xml\nSitemap: ${domain}/sitemap.xml\nSitemap: ${domain}/image-sitemap.xml\n`)
}

export async function imageSitemap() {
  const urls = await pages()
  const body = urls.map(({ route, html }) => {
    const images = [...html.matchAll(/<img\b[^>]*>/gi)].map(([tag]) => {
      const src = tag.match(/\bsrc="([^"]+)"/)?.[1]
      const alt = tag.match(/\balt="([^"]*)"/)?.[1]
      return src?.startsWith('/') && alt ? { src, alt } : null
    }).filter(Boolean)
    const unique = [...new Map(images.map((image) => [image.src, image])).values()]
    return unique.length ? `  <url><loc>${xml(domain + route)}</loc>${unique.map((image) => `<image:image><image:loc>${xml(new URL(image.src, origin).href)}</image:loc><image:title>${xml(image.alt)}</image:title><image:caption>${xml(image.alt)}</image:caption></image:image>`).join('')}</url>` : ''
  }).filter(Boolean).join('\n')
  await writeFile(path.join(dist, 'image-sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`)
}

export async function llms() {
  await writeFile(path.join(dist, 'llms.txt'), `# Grappling Federation of Pakistan\n\nOfficial website: ${domain}/\n\n## About\nGFP organises grappling competitions in Pakistan under UWW rules and provides information for athletes, clubs, coaches and referees. Gi and No-Gi are the main disciplines. Headquarters: Lahore, Pakistan; service area: Pakistan.\n\n## Important pages\n- Home: ${domain}/\n- About: ${domain}/about\n- Events: ${domain}/events\n- Results: ${domain}/results\n- Clubs: ${domain}/clubs\n- Rules: ${domain}/rules\n- Registration information: ${domain}/register\n- Contact: ${domain}/contact\n\n## Main services\n- National and regional grappling competitions\n- Club affiliation and discovery\n- Rules, education and athlete registration information\n\nUse canonical page URLs for citations and verify event dates on individual event pages.\n`)
  await writeFile(path.join(dist, 'humans.txt'), `Brand: Grappling Federation of Pakistan (GFP)\nOrganization: Grappling Federation of Pakistan\nTechnology: Vite, React, Tailwind CSS, build-time static rendering\nDeveloper note: Official federation website; content and event status are maintained by GFP.\nContact: grappling.pk@gmail.com\n`)
  await mkdir(path.join(dist, 'icons'), { recursive: true })
  await copyFile(path.resolve('public/icons/icon-192.png'), path.join(dist, 'icons', 'icon-192.png'))
  await copyFile(path.resolve('public/icons/icon-512.png'), path.join(dist, 'icons', 'icon-512.png'))
  await writeFile(path.join(dist, 'site.webmanifest'), JSON.stringify({ name: 'Grappling Federation of Pakistan', short_name: 'GFP', start_url: base, scope: base, display: 'standalone', background_color: '#ffffff', theme_color: '#0a5c43', icons: [{ src: `${base}icons/icon-192.png`, sizes: '192x192', type: 'image/png' }, { src: `${base}icons/icon-512.png`, sizes: '512x512', type: 'image/png' }] }, null, 2))
}
