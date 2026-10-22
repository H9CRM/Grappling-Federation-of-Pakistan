import { PassThrough } from 'node:stream'
import { prerenderToNodeStream } from 'react-dom/static'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router'
import { MotionConfig } from 'motion/react'
import { routes, sitePages } from '@/routes'
import { assetPath, BASE_PATH } from '@/lib/urls'

export { sitePages }

/**
 * Render one URL to static HTML. `prerenderToNodeStream` waits for every lazy page and
 * Suspense boundary, so the output contains the full page content, headings and JSON-LD.
 */
export async function render(url) {
  const handler = createStaticHandler(routes, { basename: BASE_PATH })
  const context = await handler.query(new Request(`http://localhost${assetPath(url)}`))
  if (context instanceof Response) return { redirect: context.headers.get('Location') }

  const router = createStaticRouter(handler.dataRoutes, context)
  const { prelude } = await prerenderToNodeStream(
    <MotionConfig reducedMotion="user">
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </MotionConfig>
  )

  const chunks = []
  for await (const chunk of prelude.pipe(new PassThrough())) chunks.push(chunk)
  return { html: Buffer.concat(chunks).toString('utf8'), status: context.statusCode }
}
