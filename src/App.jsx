import { lazy, Suspense, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useLenis } from './hooks/useLenis.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Pricing from './components/Pricing.jsx'
import CaseStudies from './components/CaseStudies.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import MeshBackground from './components/MeshBackground.jsx'
import Cursor from './components/Cursor.jsx'

// Lazy-loaded — the WebGL hero background pulls Three.js + R3F. Same
// shared chunk as AuraCanvas; main bundle stays under 180 KB gzipped.
const HeroShaderBackground = lazy(() =>
  import('./components/HeroShaderBackground.jsx'),
)

// Picks the right ambient backdrop: MeshBackground (CSS, cheap) on
// reduced-motion or mobile (<md); the WebGL plasma shader otherwise. The
// fallback renders MeshBackground while the WebGL chunk is loading so the
// page never shows a blank backdrop.
function Backdrop() {
  const reduce = useReducedMotion()
  const [desktop, setDesktop] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  if (reduce || !desktop) return <MeshBackground />

  return (
    <Suspense fallback={<MeshBackground />}>
      <HeroShaderBackground />
    </Suspense>
  )
}

export default function App() {
  useLenis()

  return (
    <div className="min-h-screen bg-ink text-mist">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-mist focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <Backdrop />
      <Cursor />
      <Nav />
      <main id="main-content">
        <Hero />
        <Services />
        <Pricing />
        <CaseStudies />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
