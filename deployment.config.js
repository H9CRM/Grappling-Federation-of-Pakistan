// Shared by Vite and the SEO generators. Set VITE_SITE_URL for another host.
export function deploymentConfig(env = process.env) {
  const url = new URL(env.VITE_SITE_URL || 'https://www.gfp.org.pk')
  if (!['http:', 'https:'].includes(url.protocol) || url.search || url.hash || url.username || url.password) {
    throw new Error('VITE_SITE_URL must be an absolute HTTP(S) site URL without credentials, query or hash.')
  }
  const pathname = url.pathname.replace(/\/+$/, '')
  return { siteUrl: `${url.origin}${pathname}`, base: `${pathname}/`, origin: url.origin }
}
