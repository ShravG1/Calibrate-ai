import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import WhyAI from './components/WhyAI.jsx'
import Services from './components/Services.jsx'
import Pricing from './components/Pricing.jsx'
import CaseStudies from './components/CaseStudies.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-mist">
      <Nav />
      <main>
        <Hero />
        <WhyAI />
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
