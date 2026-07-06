import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Store, TrendingUp, Users, Globe, Shield, BarChart3,
  ChevronDown, ArrowRight, Check, Upload
} from 'lucide-react'

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function BecomeAVendor() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', email: '', store: '', category: '', area: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ice to-white pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-ocean/6 blur-3xl animate-float" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[25%] h-[25%] rounded-full bg-gold/6 blur-3xl animate-float-delayed" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ocean/10 text-ocean text-xs font-medium mb-4">
                <Store className="w-3.5 h-3.5" /> Vendor Program
              </div>
              <h1 className="font-fraunces text-4xl md:text-5xl font-semibold text-navy leading-tight">
                Sell Local.<br />Grow Faster.
              </h1>
              <p className="text-gray-600 mt-4 text-lg max-w-md">
                Join Grabb and reach customers in your neighbourhood. Free to join, easy to use.
              </p>
              <motion.a
                href="#signup"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-6 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-ocean to-ocean-dark text-white font-medium text-sm shadow-md shadow-ocean/20 hover:shadow-lg transition-all duration-300"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="w-full max-w-sm aspect-square rounded-3xl bg-gradient-to-br from-ocean/10 via-ice to-gold/10 flex items-center justify-center border border-gray-200/60 shadow-xl shadow-navy/5">
                <Store className="w-24 h-24 text-ocean/30" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-fraunces text-3xl md:text-4xl font-semibold text-navy">Why Sell on Grabb?</h2>
            <p className="text-gray-600 mt-2">Everything you need to run a successful local shop.</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  className="glass rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean/10 to-sky/10 flex items-center justify-center text-ocean group-hover:scale-110 transition-transform duration-300 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-fraunces text-base font-semibold text-navy mb-1">{b.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-fraunces text-3xl md:text-4xl font-semibold text-navy">How It Works</h2>
            <p className="text-gray-600 mt-2">Get your shop live in 5 simple steps.</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex gap-6 items-start pb-10 last:pb-0"
              >
                {i < processSteps.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-0 w-px bg-gradient-to-b from-ocean/30 to-transparent" />
                )}
                <div className="relative shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-ocean to-ocean-dark text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-ocean/20 z-10">
                  {step.number}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-fraunces text-lg font-semibold text-navy">{step.title}</h3>
                  <p className="text-gray-600 text-sm mt-0.5">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section id="signup" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8 md:p-10 shadow-xl shadow-navy/5"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="font-fraunces text-2xl font-semibold text-navy">You're on the list!</h3>
                  <p className="text-gray-600 text-sm mt-2">We'll reach out within 48 hours to get you set up.</p>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-fraunces text-2xl font-semibold text-navy mb-2">Become a Vendor</h3>
                  <p className="text-gray-600 text-sm mb-6">Fill in your details and we'll be in touch.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Owner Name</label>
                        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all duration-300"
                          placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Store Name</label>
                        <input type="text" required value={form.store} onChange={(e) => setForm({ ...form, store: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all duration-300"
                          placeholder="My Local Store" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Category</label>
                        <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all duration-300 appearance-none">
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
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Address / Area</label>
                        <input type="text" required value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all duration-300"
                          placeholder="Indiranagar, Bangalore" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Phone Number</label>
                        <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all duration-300"
                          placeholder="+1 (555) 000-0000" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Email Address</label>
                        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all duration-300"
                          placeholder="john@example.com" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Shop Photo <span className="text-gray-300 font-normal">(optional)</span></label>
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-gray-200 bg-white/50 text-sm text-gray-400">
                        <div className="w-8 h-8 rounded-lg bg-ocean/5 flex items-center justify-center text-ocean/40">
                          <Upload className="w-4 h-4" />
                        </div>
                        <span>Upload a photo of your shop</span>
                      </div>
                    </div>
                    <button type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-ocean to-ocean-dark text-white font-medium text-sm shadow-md shadow-ocean/20 hover:shadow-lg transition-all duration-300">
                      Submit Application
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-fraunces text-3xl font-semibold text-navy">Vendor FAQs</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full text-left glass rounded-2xl p-5 transition-all duration-300 ${
                    openFaq === i ? 'shadow-lg shadow-navy/5 ring-1 ring-ocean/20' : 'hover:shadow-lg hover:scale-[1.005]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-navy text-sm md:text-base">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 mt-3' : 'max-h-0'}`}>
                    <p className="text-gray-600 text-sm">{faq.a}</p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
