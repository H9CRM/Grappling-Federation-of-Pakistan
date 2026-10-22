import { createBrowserRouter, RouterProvider } from 'react-router'
import { MotionConfig } from 'motion/react'
import { routes } from '@/routes'
import { BASE_PATH } from '@/lib/urls'

const router = createBrowserRouter(routes, { basename: BASE_PATH })

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  )
}
