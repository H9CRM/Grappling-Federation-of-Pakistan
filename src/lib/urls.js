export const SITE_URL = import.meta.env.VITE_SITE_URL
export const BASE_PATH = import.meta.env.BASE_URL

// Public assets must work both at a domain root and under a Pages repository path.
export function assetPath(value) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return value
  if (BASE_PATH === '/' || value.startsWith(BASE_PATH)) return value
  return `${BASE_PATH}${value.slice(1)}`
}

export function absoluteUrl(value = '/') {
  if (/^https?:\/\//.test(value)) return value
  return new URL(assetPath(value), new URL(SITE_URL).origin).href
}
