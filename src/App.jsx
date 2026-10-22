import { createBrowserRouter, RouterProvider } from 'react-router'
import { MotionConfig } from 'motion/react'
import { routes } from '@/routes'

const router = createBrowserRouter(routes)

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  )
}
