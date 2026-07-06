import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-ocean font-bold text-xl">
            <ShoppingBag className="w-6 h-6" />
            <span className="font-fraunces">Grabb</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-ocean' : 'text-navy hover:text-ocean'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/become-a-vendor"
              className="bg-ocean text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky transition-colors"
            >
              Become a Vendor
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-navy hover:bg-ice"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block text-sm font-medium transition-colors ${
                    isActive ? 'text-ocean' : 'text-navy hover:text-ocean'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/become-a-vendor"
              onClick={() => setMobileOpen(false)}
              className="block text-center bg-ocean text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky transition-colors"
            >
              Become a Vendor
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
