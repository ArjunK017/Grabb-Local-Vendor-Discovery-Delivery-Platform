import { Link } from 'react-router-dom'
import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2.5 text-white font-bold text-lg mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky to-ocean flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="font-fraunces">Grabb</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Shop local. Delivered. Connecting you with the best local shops in your neighbourhood.
            </p>
          </div>

          <div>
            <h4 className="font-fraunces text-sm font-semibold mb-5 text-sky-light uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/explore" className="hover:text-white transition-colors duration-200">Explore Shops</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors duration-200">How It Works</Link></li>
              <li><Link to="/become-a-vendor" className="hover:text-white transition-colors duration-200">Become a Vendor</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors duration-200">About Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors duration-200">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-fraunces text-sm font-semibold mb-5 text-sky-light uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition-colors duration-200">Contact Us</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors duration-200">Terms of Use</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-fraunces text-sm font-semibold mb-5 text-sky-light uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-ocean/20 transition-colors">
                  <Mail className="w-4 h-4 text-sky" />
                </div>
                hello@grabb.com
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-ocean/20 transition-colors">
                  <Phone className="w-4 h-4 text-sky" />
                </div>
                +91 1800-123-GRAB
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-ocean/20 transition-colors">
                  <MapPin className="w-4 h-4 text-sky" />
                </div>
                Bangalore, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Grabb. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
