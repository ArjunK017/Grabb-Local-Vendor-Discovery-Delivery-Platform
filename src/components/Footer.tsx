import { Link } from 'react-router-dom'
import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg mb-4">
              <ShoppingBag className="w-6 h-6" />
              <span className="font-fraunces">Grabb</span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              Shop local. Delivered. Connecting you with the best local shops in your neighbourhood.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-fraunces text-sm font-semibold mb-4 text-sky">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/explore" className="hover:text-white transition-colors">Explore Shops</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/become-a-vendor" className="hover:text-white transition-colors">Become a Vendor</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-fraunces text-sm font-semibold mb-4 text-sky">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-fraunces text-sm font-semibold mb-4 text-sky">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky shrink-0" />
                hello@grabb.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky shrink-0" />
                +91 1800-123-GRAB
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky shrink-0" />
                Bangalore, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Grabb. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
