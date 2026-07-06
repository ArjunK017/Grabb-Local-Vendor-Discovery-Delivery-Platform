import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, ShoppingBag } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore Shops' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-ice-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ocean to-ocean-dark flex items-center justify-center text-white shadow-lg shadow-ocean/20 group-hover:shadow-ocean/30 transition-shadow">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="font-fraunces text-xl font-semibold text-navy">Grabb</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors relative after:absolute after:bottom-[-22px] after:left-0 after:h-[2px] after:rounded-full after:transition-all ${
                    isActive
                      ? 'text-ocean after:bg-ocean after:w-full'
                      : 'text-navy/70 hover:text-navy after:bg-ocean/0 after:w-0 hover:after:w-full'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/become-a-vendor"
              className="bg-gradient-to-r from-ocean to-ocean-dark text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-ocean/20 hover:shadow-xl hover:shadow-ocean/30 hover:-translate-y-0.5 transition-all"
            >
              Become a Vendor
            </Link>
          </nav>

          <button
            className="md:hidden p-2.5 rounded-xl text-navy hover:bg-ice transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-ice-dark"
        >
          <nav className="px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-ice text-ocean' : 'text-navy/70 hover:bg-ice/50 hover:text-navy'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/become-a-vendor"
              onClick={() => setMobileOpen(false)}
              className="block text-center mt-3 bg-gradient-to-r from-ocean to-ocean-dark text-white px-4 py-3 rounded-xl text-sm font-medium shadow-lg shadow-ocean/20"
            >
              Become a Vendor
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  )
}
