import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Clock, Send, Check, MessageCircle, ArrowUpRight } from 'lucide-react'

const contactMethods = [
  { icon: Mail, label: 'Email', value: 'hello@grabb.com', action: 'Send an email', href: 'mailto:hello@grabb.com', gradient: 'from-ocean/15 to-sky/15', iconColor: 'text-ocean', badge: 'ocean' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', action: 'Call us', href: 'tel:+1234567890', gradient: 'from-emerald-50 to-emerald-100', iconColor: 'text-emerald-600', badge: 'emerald' },
  { icon: MapPin, label: 'Location', value: 'Toronto, ON, Canada', action: 'View on map', href: '#', gradient: 'from-gold/10 to-amber-50', iconColor: 'text-gold', badge: 'gold' },
  { icon: Clock, label: 'Hours', value: 'Mon–Sun, 8AM–10PM', action: 'Always open', href: '#', gradient: 'from-ocean/15 to-sky/15', iconColor: 'text-ocean', badge: 'ocean' },
]

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const cardIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ice to-white pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-3%] w-96 h-96 rounded-full bg-ocean/[0.04] blur-3xl animate-float" />
          <div className="absolute bottom-[-10%] left-[-3%] w-80 h-80 rounded-full bg-gold/[0.04] blur-3xl animate-float-delayed" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ocean/5 border border-ocean/10 text-ocean text-xs font-medium mb-5">
              <MessageCircle className="w-3.5 h-3.5" /> Get in touch
            </div>
            <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-semibold text-navy leading-[1.08]">Contact Us</h1>
            <p className="text-gray-500 mt-4 text-lg max-w-lg mx-auto leading-relaxed">Have a question or want to learn more? We're here and ready to help.</p>
          </motion.div>
        </div>
      </section>

      {/* Methods Grid */}
      <section className="mt-6 pb-16 md:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5"
          >
            {contactMethods.map((m, i) => {
              const Icon = m.icon
              return (
                <motion.a
                  key={i}
                  href={m.href}
                  variants={cardIn}
                  className="glass rounded-2xl p-6 md:p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group block"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${m.gradient} flex items-center justify-center ${m.iconColor} group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.1em]">{m.label}</p>
                        <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
                      </div>
                      <p className="font-medium text-navy text-sm md:text-base mt-1">{m.value}</p>
                      <p className="text-gray-400 text-xs mt-1">{m.action} &rarr;</p>
                    </div>
                  </div>
                </motion.a>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Social Links */}
      <section className="pb-12 md:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.15em] mb-4">Follow Us</p>
            <div className="flex items-center justify-center gap-3">
              {[
                { label: 'Twitter', href: '#', letter: '𝕏' },
                { label: 'Instagram', href: '#', letter: 'IG' },
                { label: 'Facebook', href: '#', letter: 'fb' },
                { label: 'LinkedIn', href: '#', letter: 'in' },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-ocean/5 to-sky/5 flex items-center justify-center text-ocean/60 hover:text-ocean hover:bg-ocean/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-xs font-bold"
                  aria-label={s.label}
                >
                  {s.letter}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            className="glass rounded-3xl p-8 md:p-10 lg:p-12 shadow-xl shadow-navy/5"
          >
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 md:py-16">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/10">
                  <Check className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="font-fraunces text-2xl md:text-3xl font-semibold text-navy">Thank You!</h3>
                <p className="text-gray-500 text-sm mt-2 max-w-sm mx-auto leading-relaxed">Your message has been sent. We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-8 md:mb-10">
                  <h3 className="font-fraunces text-2xl md:text-3xl font-semibold text-navy">Send a Message</h3>
                  <p className="text-gray-500 text-sm mt-2">Fill in the form and we'll respond as soon as possible.</p>
                </div>
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Full Name</label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/90 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all duration-300"
                        placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Email Address</label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/90 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all duration-300"
                        placeholder="john@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Subject</label>
                    <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/90 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all duration-300"
                      placeholder="How can we help you?" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Message</label>
                    <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/90 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all duration-300 resize-none"
                      placeholder="Tell us more about your enquiry..." />
                  </div>
                  <div className="text-center pt-2">
                    <button type="submit"
                      className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-ocean to-ocean-dark text-white font-medium text-sm shadow-md shadow-ocean/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                      <Send className="w-4 h-4" /> Send Message
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
