import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Store, TrendingUp, Users, Globe, Shield, BarChart3, ChevronDown, ArrowRight, Check, Upload, Sparkles } from 'lucide-react'

const benefits = [
  { icon: TrendingUp, title: 'Grow Your Business', desc: 'Reach new customers in your neighbourhood and beyond with zero upfront cost.' },
  { icon: Users, title: 'Build Community', desc: 'Connect with local customers who value neighbourhood businesses.' },
  { icon: Globe, title: 'Digital Storefront', desc: 'Get a beautiful, mobile-optimised shop in minutes. No tech skills needed.' },
  { icon: Shield, title: 'Secure Payments', desc: 'Reliable, fast payouts with full fraud protection.' },
  { icon: BarChart3, title: 'Real Insights', desc: 'See what sells, when, and to whom with simple analytics.' },
  { icon: Store, title: 'Your Brand, Your Way', desc: 'Full control over pricing, listings, and your story.' },
]

const processSteps = [
  { number: '01', title: 'Sign Up', desc: 'Create your vendor account in under 2 minutes.' },
  { number: '02', title: 'Set Up Shop', desc: 'Add your logo, banner, and shop details.' },
  { number: '03', title: 'List Products', desc: 'Upload photos, set prices, and write descriptions.' },
  { number: '04', title: 'Go Live', desc: 'Publish your storefront and start receiving orders.' },
  { number: '05', title: 'Get Paid', desc: 'Receive payments directly — no middleman.' },
]

const faqs = [
  { q: 'Is there a fee to join?', a: 'No. Joining Grabb is completely free. We take a small commission only on completed orders.' },
  { q: 'What types of products can I sell?', a: 'Anything local — fresh produce, baked goods, crafts, groceries, meals, and more.' },
  { q: 'How do I get paid?', a: 'Payouts are processed weekly directly to your bank account.' },
  { q: 'Can I set my own delivery area?', a: 'Yes. You define your delivery radius and hours.' },
  { q: 'Do I need a smartphone?', a: 'Grabb works on both desktop and mobile. A smartphone is recommended but not required.' },
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

export default function BecomeAVendor() {
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', email: '', store: '', category: '', area: '', phone: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fdf8f0] via-ice to-white pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-ocean/[0.03] blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-3%] w-[400px] h-[400px] rounded-full bg-gold/[0.04] blur-[100px]" />
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-[20%] left-[8%] w-2.5 h-2.5 rounded-full bg-ocean/20" />
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, delay: -2 }} className="absolute top-[40%] right-[12%] w-3 h-3 rounded-full bg-sky/25" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[400px]">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-5 py-2.5 rounded-full mb-6 tracking-wide uppercase">
                <Store className="w-3.5 h-3.5" /> Vendor Program
              </div>
              <h1 className="font-fraunces text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy leading-[1.08]">
                Sell Local.<br />
                <span className="text-gradient">Grow Faster.</span>
              </h1>
              <p className="text-gray-500 mt-4 text-base md:text-lg max-w-md leading-relaxed">
                Join Grabb and reach customers in your neighbourhood. Free to join, easy to use.
              </p>
              <motion.a
                href="#signup"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-7 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-ocean to-ocean-dark text-white font-semibold text-sm shadow-xl shadow-ocean/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </motion.a>
            </AnimatedSection>
            <AnimatedSection delay={0.15} className="hidden lg:flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-sm aspect-square rounded-[2rem] bg-gradient-to-br from-ocean/10 via-ice to-gold/10 flex items-center justify-center border border-gray-200/60 shadow-premium-xl hover:shadow-premium-xl transition-shadow duration-500"
              >
                <Store className="w-24 h-24 text-ocean/20" />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-5 py-2.5 rounded-full mb-5 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Benefits
            </span>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-navy">Why Sell on Grabb?</h2>
            <p className="text-gray-500 mt-3 text-base">Everything you need to run a successful local shop.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <AnimatedSection key={b.title} delay={i * 0.06}>
                  <div className="bg-gradient-to-br from-[#fdf8f0] to-ice/50 rounded-[1.3rem] p-6 h-full border border-gray-100/80 hover:border-ocean/20 hover:shadow-premium-lg transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-ocean/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.3rem]" />
                    <div className="relative">
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ocean/10 to-sky/10 flex items-center justify-center mb-5 group-hover:from-ocean group-hover:to-ocean-dark transition-all duration-300 shadow-sm"
                      >
                        <Icon className="w-7 h-7 text-ocean group-hover:text-white transition-colors" />
                      </motion.div>
                      <h3 className="font-fraunces font-bold text-navy text-lg mb-2">{b.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-[#fdf8f0] via-white to-ice/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-5 py-2.5 rounded-full mb-5 tracking-wide uppercase">
              Process
            </span>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-navy">How It Works</h2>
            <p className="text-gray-500 mt-3 text-base">Get your shop live in 5 simple steps.</p>
          </AnimatedSection>

          <div className="space-y-4">
            {processSteps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="flex items-start gap-5 bg-white rounded-[1.3rem] p-6 border border-gray-100/80 hover:border-ocean/20 hover:shadow-premium transition-all duration-400 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-ocean/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.3rem]" />
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-ocean/10 to-sky/10 flex items-center justify-center shrink-0 font-fraunces font-bold text-ocean text-sm group-hover:from-ocean group-hover:to-ocean-dark group-hover:text-white transition-all duration-300 shadow-sm">
                    {step.number}
                  </div>
                  <div className="relative">
                    <h3 className="font-fraunces font-bold text-navy text-lg">{step.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="signup" className="py-14 md:py-20 bg-white scroll-mt-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-[#fdf8f0] to-ice/50 rounded-[1.8rem] p-8 md:p-10 shadow-premium-xl border border-gray-100/50">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/10"
                  >
                    <Check className="w-8 h-8 text-emerald-500" />
                  </motion.div>
                  <h3 className="font-fraunces text-2xl font-bold text-navy">You're on the list!</h3>
                  <p className="text-gray-500 text-sm mt-2">We'll reach out within 48 hours to get you set up.</p>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-fraunces text-2xl font-bold text-navy mb-2">Become a Vendor</h3>
                  <p className="text-gray-500 text-sm mb-7">Fill in your details and we'll be in touch.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Owner Name</label>
                        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all duration-300 hover:border-ocean/30" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Store Name</label>
                        <input type="text" required value={form.store} onChange={(e) => setForm({ ...form, store: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all duration-300 hover:border-ocean/30" placeholder="My Local Store" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Category</label>
                        <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all duration-300 appearance-none hover:border-ocean/30">
                          <option value="">Select category</option>
                          <option value="grocery">Grocery</option>
                          <option value="bakery">Bakery</option>
                          <option value="pharmacy">Pharmacy</option>
                          <option value="boutique">Boutique</option>
                          <option value="stationery">Stationery</option>
                          <option value="florist">Florist</option>
                          <option value="meat">Meat & Fish</option>
                          <option value="cafe">Café</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Address / Area</label>
                        <input type="text" required value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all duration-300 hover:border-ocean/30" placeholder="Indiranagar, Bangalore" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Phone Number</label>
                        <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all duration-300 hover:border-ocean/30" placeholder="+1 (555) 000-0000" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email Address</label>
                        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all duration-300 hover:border-ocean/30" placeholder="john@example.com" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Shop Photo <span className="text-gray-300 font-normal">(optional)</span></label>
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-gray-200 bg-white/50 text-sm text-gray-400 hover:border-ocean/30 hover:bg-ocean/[0.02] transition-all duration-300 cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-ocean/5 flex items-center justify-center text-ocean/40">
                          <Upload className="w-5 h-5" />
                        </div>
                        <span>Upload a photo of your shop</span>
                      </div>
                    </div>
                    <motion.button type="submit" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-ocean to-ocean-dark text-white font-semibold text-sm shadow-lg shadow-ocean/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                      Submit Application
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-[#fdf8f0] via-white to-ice/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-5 py-2.5 rounded-full mb-5 tracking-wide uppercase">
              FAQ
            </span>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-navy">Vendor FAQs</h2>
          </AnimatedSection>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full text-left bg-white rounded-[1.3rem] p-5 transition-all duration-400 border ${
                    openFaq === i ? 'shadow-premium-lg border-ocean/20 ring-1 ring-ocean/10' : 'border-gray-100/80 hover:shadow-premium hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-navy text-sm">{faq.q}</span>
                    <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-500 text-sm mt-3 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
