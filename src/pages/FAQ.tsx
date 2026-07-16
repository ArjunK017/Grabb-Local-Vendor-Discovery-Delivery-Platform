import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Search, ChevronDown, Sparkles } from 'lucide-react'

const categories = [
  {
    name: 'Orders & Delivery',
    faqs: [
      { q: 'How do I place an order?', a: 'Browse a shop, pick your products, and submit your order through the platform. The shop receives it instantly.' },
      { q: 'How long does delivery take?', a: 'Most orders are delivered within 30-45 minutes, depending on your area and the shop\'s preparation time.' },
      { q: 'Can I track my order?', a: 'Yes! Once your order is confirmed, you\'ll receive real-time updates on its status and estimated arrival.' },
      { q: 'What if my order is late?', a: 'Contact the shop directly or reach out to our support team. We\'ll make sure you get your order or a full refund.' },
      { q: 'Can I cancel my order?', a: 'You can cancel an order before the shop starts preparing it. Once preparation begins, cancellation may not be possible.' },
    ],
  },
  {
    name: 'Payment & Pricing',
    faqs: [
      { q: 'What payment methods do you accept?', a: 'We accept credit/debit cards, UPI, net banking, and popular digital wallets.' },
      { q: 'Are there any hidden fees?', a: 'No. The price you see is the price you pay. Delivery charges, if any, are shown upfront before you confirm.' },
      { q: 'How do refunds work?', a: 'Refunds are processed within 3-5 business days to your original payment method.' },
      { q: 'Do you offer discounts?', a: 'Yes! Check the app for ongoing promotions, first-order discounts, and seasonal offers from local shops.' },
    ],
  },
  {
    name: 'Vendors & Shops',
    faqs: [
      { q: 'How do I become a vendor?', a: 'Visit our Become a Vendor page, fill out the registration form, and our team will get in touch within 48 hours.' },
      { q: 'Are vendors verified?', a: 'Yes. Every shop on Grabb goes through a verification process to ensure quality and trust.' },
      { q: 'Can I contact a vendor directly?', a: 'Yes! Each shop has phone, WhatsApp, and email contact options available on their storefront.' },
    ],
  },
  {
    name: 'Account & Support',
    faqs: [
      { q: 'How do I create an account?', a: 'You can browse without an account. To place orders, simply sign up with your email or phone number.' },
      { q: 'How do I reset my password?', a: 'Click "Forgot Password" on the login page and follow the instructions sent to your email.' },
      { q: 'How can I contact support?', a: 'Visit our Contact page or email us at hello@grabb.com. We respond within 24 hours.' },
      { q: 'Is my data safe?', a: 'Absolutely. We use industry-standard encryption and never share your personal data with third parties.' },
    ],
  },
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

export default function FAQ() {
  const [search, setSearch] = useState('')
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!search) return categories
    const q = search.toLowerCase()
    return categories
      .map((cat) => ({ ...cat, faqs: cat.faqs.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)) }))
      .filter((cat) => cat.faqs.length > 0)
  }, [search])

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fdf8f0] via-ice to-white pt-20 pb-10 md:pt-28 md:pb-14">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-ocean/[0.03] blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-3%] w-[400px] h-[400px] rounded-full bg-gold/[0.04] blur-[100px]" />
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-[30%] left-[10%] w-2.5 h-2.5 rounded-full bg-ocean/20" />
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, delay: -2 }} className="absolute top-[15%] right-[15%] w-3 h-3 rounded-full bg-sky/25" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-5 py-2.5 rounded-full mb-6 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" /> FAQ
            </div>
            <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-navy">Frequently Asked Questions</h1>
            <p className="text-gray-500 mt-3 text-base md:text-lg max-w-lg mx-auto">Everything you need to know about Grabb.</p>
          </AnimatedSection>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input type="text" placeholder="Search questions..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/60 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean/30 transition-all duration-300 shadow-sm hover:shadow-md" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 bg-white rounded-[1.5rem] border border-gray-100">
              <p className="font-fraunces text-xl text-navy/50">No results found</p>
              <p className="text-gray-400 text-sm mt-1">Try a different search term.</p>
            </motion.div>
          ) : (
            <div className="space-y-10">
              {filtered.map((cat, ci) => (
                <AnimatedSection key={cat.name} delay={ci * 0.08}>
                  <h2 className="font-fraunces text-xl font-bold text-navy mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 rounded-full bg-gradient-to-b from-ocean to-sky shrink-0" />
                    {cat.name}
                  </h2>
                  <div className="space-y-2.5">
                    {cat.faqs.map((faq, fi) => {
                      const key = `${ci}-${fi}`
                      const isOpen = openFaq === key
                      return (
                        <motion.div key={fi} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: fi * 0.04 }}>
                          <button onClick={() => setOpenFaq(isOpen ? null : key)}
                            className={`w-full text-left bg-white rounded-[1.3rem] p-5 transition-all duration-400 border ${
                              isOpen ? 'shadow-premium-lg border-ocean/20 ring-1 ring-ocean/10' : 'border-gray-100/80 hover:shadow-premium hover:-translate-y-0.5'
                            }`}>
                            <div className="flex items-center justify-between gap-4">
                              <span className="font-semibold text-navy text-sm">{faq.q}</span>
                              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                              </motion.div>
                            </div>
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                                  <p className="text-gray-500 text-sm mt-3 leading-relaxed">{faq.a}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </button>
                        </motion.div>
                      )
                    })}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
