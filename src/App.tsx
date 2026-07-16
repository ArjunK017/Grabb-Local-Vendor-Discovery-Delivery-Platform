import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import CustomCursor from './components/CustomCursor'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Explore from './pages/Explore'
import VendorStorefront from './pages/VendorStorefront'
import HowItWorks from './pages/HowItWorks'
import BecomeAVendor from './pages/BecomeAVendor'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'

/* ── Scroll to top on route change ── */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/* ── Analytics hook placeholder (FR-32) ── */
const AnalyticsHook = () => {
  // Reserved space for Plausible/GA4 script injection
  return null
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnalyticsHook />
      <ScrollToTop />
      <CustomCursor />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/vendor/:id" element={<VendorStorefront />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/become-a-vendor" element={<BecomeAVendor />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
