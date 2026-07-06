import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Search, HelpCircle } from 'lucide-react'

const faqSections = [
  {
    category: 'Orders & Delivery',
    items: [
      { q: 'How do I place an order?', a: 'Browse vendors on the Explore page, select a shop, choose your products, and place your order. You\'ll get a confirmation once the vendor accepts.' },
      { q: 'How long does delivery take?', a: 'Delivery typically takes 30–45 minutes depending on your location and the vendor\'s preparation time.' },
      { q: 'Can I track my order?', a: 'Yes! Once your order is confirmed, you can track it in real-time from the order status page.' },
      { q: 'What if my order is late?', a: 'If your order exceeds the estimated delivery time, contact support and we\'ll make it right.' },
      { q: 'Can I cancel my order?', a: 'You can cancel within 2 minutes of placing the order. After that, please contact the vendor directly.' },
    ],
  },
  {
    category: 'Payment & Pricing',
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept credit/debit cards, Google Pay, Apple Pay, and cash on delivery where available.' },
      { q: 'Are there any hidden fees?', a: 'No. The price you see is the price you pay. A small delivery fee may apply based on distance.' },
      { q: 'How do refunds work?', a: 'If there\'s an issue with your order, contact the vendor or our support team for a full refund.' },
      { q: 'Do you offer discounts?', a: 'Yes. Many vendors offer first-order discounts and loyalty rewards. Check the shop page for details.' },
    ],
  },
  {
    category: 'Vendors & Shops',
    items: [
      { q: 'How do I become a vendor?', a: 'Visit the Become a Vendor page and fill out the application form. Our team will reach out within 48 hours.' },
      { q: 'Are vendors verified?', a: 'Every vendor on Grabb is verified through our onboarding process to ensure quality and trust.' },
      { q: 'Can I contact a vendor directly?', a: 'Yes. Once you place an order, you can message the vendor directly through the platform.' },
    ],
  },
  {
    category: 'Account & Support',
    items: [
      { q: 'How do I create an account?', a: 'Simply sign up with your email or Google account. It takes less than a minute.' },
      { q: 'How do I reset my password?', a: 'Use the "Forgot Password" link on the login page. We\'ll send a reset link to your email.' },
      { q: 'How can I contact support?', a: 'Email us at hello@grabb.com or use the Contact page. We\'re available 7 days a week.' },
      { q: 'Is my data safe?', a: 'Absolutely. We use industry-standard encryption and never share your data with third parties.' },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
  const [search, setSearch] = useState('')

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const filtered = faqSections.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((s) => s.items.length > 0)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ice to-white pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-ocean/6 blur-3xl animate-float" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[25%] h-[25%] rounded-full bg-gold/6 blur-3xl animate-float-delayed" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
            <h1 className="font-fraunces text-4xl md:text-5xl font-semibold text-navy">Frequently Asked Questions</h1>
            <p className="text-gray-600 mt-2 text-lg">Everything you need to know about Grabb.</p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-8 relative max-w-md mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm shadow-sm transition-all"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {filtered.length > 0 ? (
            filtered.map((section, si) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: si * 0.06 }}
              >
                <h2 className="font-fraunces text-xl font-semibold text-navy mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 rounded-full bg-gradient-to-b from-ocean to-sky inline-block" />
                  {section.category}
                </h2>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  {section.items.map((item, ii) => {
                    const key = `${si}-${ii}`
                    return (
                      <motion.div key={key} variants={itemVariants}>
                        <button
                          onClick={() => toggle(key)}
                          className={`w-full text-left glass rounded-2xl p-5 transition-all duration-300 ${
                            openItems[key] ? 'shadow-lg shadow-navy/5 ring-1 ring-ocean/20' : 'hover:shadow-lg hover:scale-[1.005]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="font-medium text-navy text-sm md:text-base">{item.q}</span>
                            <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${openItems[key] ? 'rotate-180' : ''}`} />
                          </div>
                          <div className={`overflow-hidden transition-all duration-300 ${openItems[key] ? 'max-h-40 mt-3' : 'max-h-0'}`}>
                            <p className="text-gray-600 text-sm">{item.a}</p>
                          </div>
                        </button>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="font-fraunces text-xl text-navy/50">No results found</p>
              <p className="text-gray-500 text-sm mt-1">Try a different search term.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
