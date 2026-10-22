import { org, SITE_URL } from '@/content/site'

export const absoluteUrl = (path = '/') => (/^https?:/.test(path) ? path : `${SITE_URL}${path === '/' ? '/' : path}`)

// React 19 hoists <title>, <meta> and <link> into <head>; at build time scripts/prerender.mjs
// lifts the same tags into each page's static HTML so crawlers and AI engines get them without JS.
// Canonical URLs match the site's internal links (no trailing slash).
export function Seo({ title, description, path = '/', schema, image, type = 'website', noindex = false }) {
  const url = absoluteUrl(path)
  const img = absoluteUrl(image || '/og-image.jpg')
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : []
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex, follow" /> : <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />}
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={org.name} />
      <meta property="og:locale" content="en_PK" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...s })}
        </script>
      ))}
    </>
  )
}

export const breadcrumbSchema = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.label,
    item: absoluteUrl(it.href),
  })),
})

export const faqSchema = (list) => ({
  '@type': 'FAQPage',
  mainEntity: list.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})
