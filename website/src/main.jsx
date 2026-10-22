import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Brand fonts (§5.10): only the listed weights, self-hosted, font-display: swap
import '@fontsource/barlow-condensed/latin-600.css'
import '@fontsource/barlow-condensed/latin-700.css'
import '@fontsource-variable/inter/wght.css'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App.jsx'
import { SmoothScroll } from '@/components/smooth-scroll'

// Wrap in shadcn's <TooltipProvider> if/when the tooltip component is used.
const app = (
  <StrictMode>
    <SmoothScroll>
      <App />
    </SmoothScroll>
  </StrictMode>
)
const root = document.getElementById('root')
// Every route ships complete static HTML. The browser router then takes over interaction.
// Its initial tree differs from the static router's data state, so mount it cleanly.
if (root.hasChildNodes()) root.replaceChildren()
createRoot(root).render(app)
