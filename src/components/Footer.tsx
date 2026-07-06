import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Mail, Phone, MapPin, ArrowUp } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const colVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const linkVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.3 },
  }),
}

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-navy text-white relative overflow-hidden">
      {/* Gradient top border */}
      <div className="h-1 w-full bg-gradient-to-r from-ocean via-sky to-ocean-dark" />

      {/* Background watermark */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <span className="text-[clamp(6rem,20vw,16rem)] font-fraunces font-bold text-white/[0.02] select-none tracking-tight leading-none">
          Grabb
        </span>
      </div>

      {/* Background glow */}
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-ocean/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Brand column - 4 cols */}
          <motion.div variants={colVariants} className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky to-ocean flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-ocean/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="font-fraunces text-xl font-semibold tracking-tight">Grabb</span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Shop local. Delivered. Connecting you with the best local shops in your neighbourhood — real shops, real people, real delivery.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {['T', 'I', 'G'].map((letter, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:bg-ocean hover:text-white transition-all duration-300 hover:-translate-y-0.5 text-xs font-bold"
                  aria-label={`Social link ${i + 1}`}
                >
                  {letter}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links - 2 cols */}
          <motion.div variants={colVariants} className="lg:col-span-2">
            <h4 className="font-fraunces text-sm font-semibold mb-6 text-sky-light uppercase tracking-[0.15em]">Links</h4>
            <ul className="space-y-3.5">
              {[
                { to: '/explore', label: 'Explore Shops' },
                { to: '/how-it-works', label: 'How It Works' },
                { to: '/become-a-vendor', label: 'Become a Vendor' },
                { to: '/about', label: 'About Us' },
                { to: '/faq', label: 'FAQ' },
              ].map((link, i) => (
                <motion.li key={link.to} custom={i} variants={linkVariants}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/50 hover:text-white transition-all duration-300 relative inline-block after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-ocean after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support - 2 cols */}
          <motion.div variants={colVariants} className="lg:col-span-2">
            <h4 className="font-fraunces text-sm font-semibold mb-6 text-sky-light uppercase tracking-[0.15em]">Support</h4>
            <ul className="space-y-3.5">
              {[
                { to: '/contact', label: 'Contact Us' },
                { to: '/terms', label: 'Terms of Use' },
                { to: '/privacy', label: 'Privacy Policy' },
              ].map((link, i) => (
                <motion.li key={link.to} custom={i} variants={linkVariants}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/50 hover:text-white transition-all duration-300 relative inline-block after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-ocean after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact + CTA - 4 cols */}
          <motion.div variants={colVariants} className="lg:col-span-4">
            <h4 className="font-fraunces text-sm font-semibold mb-6 text-sky-light uppercase tracking-[0.15em]">Get in Touch</h4>
            <ul className="space-y-4 mb-8">
              {[
                { icon: Mail, label: 'hello@grabb.com' },
                { icon: Phone, label: '+91 1800-123-GRAB' },
                { icon: MapPin, label: 'Bangalore, India' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.li
                    key={i}
                    custom={i}
                    variants={linkVariants}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-ocean/20 transition-all duration-300">
                      <Icon className="w-4 h-4 text-sky" />
                    </div>
                    <span className="text-sm text-white/50 group-hover:text-white transition-colors duration-300">
                      {item.label}
                    </span>
                  </motion.li>
                )
              })}
            </ul>
            {/* Mini newsletter */}
            <div className="bg-white/5 rounded-2xl p-5 backdrop-blur-sm border border-white/5">
              <p className="text-xs text-white/40 mb-3 font-medium uppercase tracking-wider">Stay Updated</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/10 text-white text-xs placeholder:text-white/30 border border-white/10 focus:outline-none focus:border-ocean/50 transition-colors"
                />
                <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-ocean to-ocean-dark text-white text-xs font-medium shadow-md shadow-ocean/20 hover:shadow-lg transition-all active:scale-95">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Grabb. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 text-xs text-white/30 hover:text-white transition-colors duration-300 group"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
