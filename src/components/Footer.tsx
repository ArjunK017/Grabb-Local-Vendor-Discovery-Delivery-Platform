import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { ShoppingBag, Mail, Phone, MapPin, ArrowUp, Send } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
}

const colVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

const linkVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.4 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-navy text-white relative overflow-hidden">
      {/* Wavy top border */}
      <div className="relative h-16 -mb-1">
        <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
          <path
            d="M0,30 C360,60 720,0 1080,30 C1260,45 1350,15 1440,30 L1440,60 L0,60 Z"
            className="fill-navy"
          />
          <path
            d="M0,35 C360,65 720,5 1080,35 C1260,50 1350,20 1440,35 L1440,60 L0,60 Z"
            fill="rgba(31,111,178,0.15)"
          />
        </svg>
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-ocean/5 to-transparent blur-[150px] animate-morph" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-sky/5 to-transparent blur-[120px]" />
        <div className="absolute top-[50%] left-[50%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-gold/3 to-transparent blur-[100px]" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[8%] w-2 h-2 rounded-full bg-sky/15 animate-float" />
        <div className="absolute top-[30%] right-[12%] w-3 h-3 rounded-full bg-ocean/10 animate-float-delayed" />
        <div className="absolute bottom-[25%] left-[15%] w-2.5 h-2.5 rounded-full bg-gold/10 animate-float-slow" />
        <div className="absolute top-[60%] right-[20%] w-2 h-2 rounded-full bg-sky/10 animate-float" />
      </div>

      {/* Background watermark */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <span className="text-[clamp(6rem,20vw,16rem)] font-fraunces font-bold text-white/[0.02] select-none tracking-tight leading-none">
          Grabb
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-16 md:pb-20">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Brand column */}
          <motion.div variants={colVariants} className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <motion.div
                whileHover={{ rotate: -8, scale: 1.1 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky to-ocean flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-ocean/20"
              >
                <ShoppingBag className="w-5 h-5" />
              </motion.div>
              <span className="font-fraunces text-xl font-bold tracking-tight">Grabb</span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Shop local. Delivered. Connecting you with the best local shops in your neighbourhood — real shops, real people, real delivery.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { letter: 'X', label: 'Twitter' },
                { letter: 'IG', label: 'Instagram' },
                { letter: 'fb', label: 'Facebook' },
                { letter: 'in', label: 'LinkedIn' },
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href="#"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  whileHover={{ y: -4, scale: 1.15, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:bg-gradient-to-br hover:from-ocean hover:to-ocean-dark hover:text-white transition-all duration-300 text-xs font-bold border border-white/5 hover:border-ocean/30 hover:shadow-lg hover:shadow-ocean/20"
                  aria-label={social.label}
                >
                  {social.letter}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={colVariants} className="lg:col-span-2">
            <h4 className="font-fraunces text-sm font-semibold mb-5 text-sky-light uppercase tracking-[0.15em]">Links</h4>
            <ul className="space-y-2.5">
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
                    className="group text-sm text-white/40 hover:text-white transition-all duration-300 flex items-center gap-2.5"
                  >
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-white/15 group-hover:bg-ocean group-hover:scale-150 transition-all duration-300"
                    />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={colVariants} className="lg:col-span-2">
            <h4 className="font-fraunces text-sm font-semibold mb-5 text-sky-light uppercase tracking-[0.15em]">Support</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/contact', label: 'Contact Us' },
                { to: '/terms', label: 'Terms of Use' },
                { to: '/privacy', label: 'Privacy Policy' },
              ].map((link, i) => (
                <motion.li key={link.to} custom={i} variants={linkVariants}>
                  <Link
                    to={link.to}
                    className="group text-sm text-white/40 hover:text-white transition-all duration-300 flex items-center gap-2.5"
                  >
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-white/15 group-hover:bg-ocean group-hover:scale-150 transition-all duration-300"
                    />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact + Newsletter */}
          <motion.div variants={colVariants} className="lg:col-span-4">
            <h4 className="font-fraunces text-sm font-semibold mb-5 text-sky-light uppercase tracking-[0.15em]">Get in Touch</h4>
            <ul className="space-y-2.5 mb-7">
              {[
                { icon: Mail, label: 'hello@grabb.com' },
                { icon: Phone, label: '+91 1800-123-GRAB' },
                { icon: MapPin, label: 'Bangalore, India' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.li key={i} custom={i} variants={linkVariants} className="group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-ocean/20 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-4 h-4 text-sky" />
                      </div>
                      <span className="text-sm text-white/40 group-hover:text-white transition-colors duration-300">
                        {item.label}
                      </span>
                    </div>
                  </motion.li>
                )
              })}
            </ul>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-white/[0.03] rounded-2xl p-5 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-colors duration-300"
            >
              <p className="text-xs text-white/30 mb-3 font-medium uppercase tracking-wider">Stay Updated</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 text-white text-xs placeholder:text-white/25 border border-white/8 focus:outline-none focus:border-ocean/40 focus:bg-white/10 transition-all duration-300"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-ocean to-ocean-dark text-white text-xs font-medium shadow-md shadow-ocean/20 hover:shadow-lg transition-all flex items-center gap-1.5"
                >
                  {subscribed ? (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-emerald-300">&#10003;</motion.span>
                  ) : (
                    <Send className="w-3 h-3" />
                  )}
                </motion.button>
              </form>
              <AnimatePresence>
                {subscribed && (
                  <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-emerald-400 mt-2">
                    Subscribed successfully!
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Grabb. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 text-xs text-white/25 hover:text-white transition-colors duration-300 group"
          >
            Back to top
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
