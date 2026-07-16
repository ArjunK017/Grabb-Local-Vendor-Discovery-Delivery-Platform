import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MapPin, Phone, Clock, Send, Check, MessageCircle, ArrowUpRight } from 'lucide-react'

const contactMethods = [
  { icon: Mail, label: 'Email', value: 'hello@grabb.com', action: 'Send an email', href: 'mailto:hello@grabb.com', gradient: 'from-ocean/15 to-sky/15', iconColor: 'text-ocean' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', action: 'Call us', href: 'tel:+1234567890', gradient: 'from-emerald-50 to-emerald-100', iconColor: 'text-emerald-600' },
  { icon: MapPin, label: 'Location', value: 'Toronto, ON, Canada', action: 'View on map', href: '#', gradient: 'from-gold/10 to-amber-50', iconColor: 'text-gold' },
  { icon: Clock, label: 'Hours', value: 'Mon-Sun, 8AM-10PM', action: 'Always open', href: '#', gradient: 'from-ocean/15 to-sky/15', iconColor: 'text-ocean' },
]

const socials = [
  { label: 'Twitter', letter: 'X', href: '#' },
  { label: 'Instagram', letter: 'IG', href: '#' },
  { label: 'Facebook', letter: 'fb', href: '#' },
  { label: 'LinkedIn', letter: 'in', href: '#' },
]

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  )
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fdf8f0] via-ice to-white pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-ocean/[0.03] blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-3%] w-[400px] h-[400px] rounded-full bg-gold/[0.04] blur-[100px]" />
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-[20%] left-[8%] w-2.5 h-2.5 rounded-full bg-ocean/20" />
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, delay: -2 }} className="absolute top-[40%] right-[12%] w-3 h-3 rounded-full bg-sky/25" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-5 py-2.5 rounded-full mb-6 tracking-wide uppercase">
              <MessageCircle className="w-3.5 h-3.5" /> Get in Touch
            </div>
            <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-navy">Contact Us</h1>
            <p className="text-gray-500 mt-4 text-base md:text-lg max-w-lg mx-auto leading-relaxed">Have a question or want to learn more? We're here and ready to help.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {contactMethods.map((m, i) => {
              const Icon = m.icon
              return (
                <AnimatedSection key={i} delay={i * 0.06}>
                  <a href={m.href} className="bg-white rounded-[1.3rem] p-6 md:p-7 hover:shadow-premium-lg transition-all duration-400 group block border border-gray-100/80 hover:border-ocean/20 hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${m.gradient} flex items-center justify-center ${m.iconColor} group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.1em]">{m.label}</p>
                          <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
                        </div>
                        <p className="font-semibold text-navy text-sm md:text-base mt-1">{m.value}</p>
                        <p className="text-gray-400 text-xs mt-1">{m.action} →</p>
                      </div>
                    </div>
                  </a>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      <section className="pb-10 md:pb-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-4">Follow Us</p>
            <div className="flex items-center justify-center gap-3">
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4, scale: 1.15 }}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-ocean/5 to-sky/5 flex items-center justify-center text-ocean/60 hover:text-white hover:from-ocean hover:to-ocean-dark transition-all duration-300 text-xs font-bold border border-gray-100/80 hover:border-ocean/30 hover:shadow-lg hover:shadow-ocean/20"
                  aria-label={s.label}
                >
                  {s.letter}
                </motion.a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-[#fdf8f0] to-ice/50 rounded-[1.8rem] p-8 md:p-10 shadow-premium-xl border border-gray-100/50">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 md:py-16">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }} className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/10">
                    <Check className="w-8 h-8 text-emerald-500" />
                  </motion.div>
                  <h3 className="font-fraunces text-2xl md:text-3xl font-bold text-navy">Thank You!</h3>
                  <p className="text-gray-500 text-sm mt-2 max-w-sm mx-auto leading-relaxed">Your message has been sent. We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-8 md:mb-10">
                    <h3 className="font-fraunces text-2xl md:text-3xl font-bold text-navy">Send a Message</h3>
                    <p className="text-gray-500 text-sm mt-2">Fill in the form and we'll respond as soon as possible.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Full Name</label>
                        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all duration-300 hover:border-ocean/30" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email Address</label>
                        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all duration-300 hover:border-ocean/30" placeholder="john@example.com" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Subject</label>
                      <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all duration-300 hover:border-ocean/30" placeholder="How can we help you?" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Message</label>
                      <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all duration-300 resize-none hover:border-ocean/30" placeholder="Tell us more about your enquiry..." />
                    </div>
                    <div className="text-center pt-2">
                      <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-ocean to-ocean-dark text-white font-semibold text-sm shadow-lg shadow-ocean/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <Send className="w-4 h-4" /> Send Message
                      </motion.button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
