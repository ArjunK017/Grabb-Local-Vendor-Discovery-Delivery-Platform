import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, ArrowRight } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore Shops' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const mobileMenuVariants = {
  closed: { opacity: 0, height: 0, y: -20 },
  open: {
    opacity: 1,
    height: 'auto',
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const, staggerChildren: 0.06, delayChildren: 0.15 },
  },
  exit: { opacity: 0, height: 0, y: -10, transition: { duration: 0.3, ease: 'easeInOut' as const } },
}

const mobileItemVariants = {
  closed: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* Desktop — Centered pill nav */}
      <header className="fixed top-0 left-0 right-0 z-50 hidden md:block">
        <div className="flex justify-center pt-4 px-4">
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-500 ${
              scrolled
                ? 'glass-strong shadow-premium-xl'
                : 'bg-white/40 backdrop-blur-md border border-white/30'
            }`}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 pl-3 pr-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ocean to-ocean-dark flex items-center justify-center text-white shadow-lg shadow-ocean/25 group-hover:shadow-ocean/40 transition-shadow">
                <ShoppingBag className="w-4.5 h-4.5" />
              </div>
              <span className="font-fraunces text-lg font-bold text-navy tracking-tight">Grabb</span>
            </Link>

            {/* Nav Links */}
            <nav className="flex items-center gap-0.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className="relative px-3.5 py-2 rounded-full text-[13px] font-medium transition-all duration-300"
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="activeNavPill"
                          className="absolute inset-0 bg-gradient-to-r from-ocean to-ocean-dark rounded-full shadow-lg shadow-ocean/20"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className={`relative z-10 ${isActive ? 'text-white font-semibold' : 'text-navy/60 hover:text-navy'}`}>
                        {link.label}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* CTA */}
            <Link
              to="/become-a-vendor"
              className="group relative inline-flex items-center gap-2 bg-navy text-white pl-5 pr-6 py-2.5 rounded-full text-[13px] font-semibold hover:bg-ocean transition-colors duration-300 ml-1"
            >
              <span>Vendor</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile — Compact bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 md:hidden transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-navy/5'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ocean to-ocean-dark flex items-center justify-center text-white shadow-lg shadow-ocean/25">
              <ShoppingBag className="w-4.5 h-4.5" />
            </div>
            <span className="font-fraunces text-lg font-bold text-navy tracking-tight">Grabb</span>
          </Link>

          <button
            className="w-10 h-10 rounded-xl bg-ice flex items-center justify-center text-navy relative z-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="exit"
              className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl z-40 md:hidden shadow-2xl shadow-navy/10 border-b border-white/20"
            >
              <div className="pt-20 pb-8 px-6">
                <nav className="space-y-1">
                  {navLinks.map((link) => (
                    <motion.div key={link.to} variants={mobileItemVariants}>
                      <NavLink
                        to={link.to}
                        end={link.to === '/'}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-5 py-4 rounded-2xl text-base font-medium transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-r from-ocean to-ocean-dark text-white shadow-lg shadow-ocean/20'
                              : 'text-navy/60 hover:bg-ice hover:text-navy'
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    </motion.div>
                  ))}
                  <motion.div variants={mobileItemVariants} className="pt-4">
                    <Link
                      to="/become-a-vendor"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 bg-navy text-white px-6 py-4 rounded-2xl text-base font-semibold shadow-xl shadow-navy/20"
                    >
                      Become a Vendor <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
