import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, PackageCheck, MapPin, Smartphone, Store, ClipboardList, Bike, CreditCard, ChevronDown } from 'lucide-react'

type Role = 'buyer' | 'vendor'

const buyerSteps = [
  { icon: MapPin, title: 'Browse Local', desc: 'Explore shops near you by area and category.' },
  { icon: ShoppingBag, title: 'Pick Products', desc: 'Choose from real products listed by local vendors.' },
  { icon: ClipboardList, title: 'Place Your Order', desc: 'Submit your order through the platform.' },
  { icon: CreditCard, title: 'Pay Securely', desc: 'Checkout with multiple payment options.' },
  { icon: Bike, title: 'Get Delivered', desc: 'Lightning-fast delivery to your doorstep.' },
]

const vendorSteps = [
  { icon: Store, title: 'Create Your Shop', desc: 'Sign up and set up your storefront in minutes.' },
  { icon: PackageCheck, title: 'List Products', desc: 'Add what you sell with photos and prices.' },
  { icon: Smartphone, title: 'Receive Orders', desc: 'Get real-time order notifications.' },
  { icon: Bike, title: 'Prepare & Deliver', desc: 'Pack and dispatch or use our delivery network.' },
  { icon: CreditCard, title: 'Get Paid', desc: 'Receive payments directly to your account.' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function HowItWorks() {
  const [role, setRole] = useState<Role>('buyer')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const steps = role === 'buyer' ? buyerSteps : vendorSteps

  const faqs = [
    { q: 'How fast is delivery?', a: 'Most orders arrive within 30–45 minutes depending on your area and the vendor\'s location.' },
    { q: 'Is there a minimum order?', a: 'Minimum orders vary by vendor. Each shop displays their minimum on their storefront.' },
    { q: 'Can I track my order?', a: 'Yes. Real-time tracking is available once your order is confirmed and out for delivery.' },
    { q: 'What if something is wrong?', a: 'Contact the vendor directly through the app. We\'re here to help resolve any issues.' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy to-navy-light text-white pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-ocean/10 blur-3xl animate-float" />
          <div className="absolute bottom-[-15%] left-[-5%] w-[35%] h-[35%] rounded-full bg-sky/8 blur-3xl animate-float-delayed" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-fraunces text-4xl md:text-5xl font-semibold">How It Works</h1>
            <p className="text-white/60 mt-3 text-lg max-w-xl mx-auto">Whether you're shopping or selling, Grabb makes it simple.</p>
          </motion.div>

          {/* Role Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-8 inline-flex p-1 rounded-2xl glass-dark"
          >
            {(['buyer', 'vendor'] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 capitalize ${
                  role === r ? 'bg-white text-navy shadow-lg' : 'text-white/70 hover:text-white'
                }`}
              >
                {r === 'buyer' ? <><ShoppingBag className="w-4 h-4 inline mr-1.5" />For Buyers</> : <><Store className="w-4 h-4 inline mr-1.5" />For Vendors</>}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            >
              {steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={i}
                    variants={stepVariants}
                    className="glass rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ocean/10 to-sky/10 flex items-center justify-center text-ocean group-hover:scale-110 transition-transform duration-300 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-fraunces text-2xl font-bold text-ocean/20 leading-none">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="font-fraunces text-base font-semibold text-navy">{step.title}</h3>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">{step.desc}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Delivery Comparison */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-fraunces text-3xl md:text-4xl font-semibold text-navy">Delivery Comparison</h2>
            <p className="text-gray-600 mt-2">See how Grabb stacks up against the rest.</p>
          </motion.div>
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg shadow-navy/5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left px-6 py-4 font-medium">Feature</th>
                  <th className="text-left px-6 py-4 font-medium">Grabb</th>
                  <th className="text-left px-6 py-4 font-medium">BigApps</th>
                  <th className="text-left px-6 py-4 font-medium">Others</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { feature: 'Local shops only', grabb: true, big: 'Sometimes', other: false },
                  { feature: 'Direct vendor support', grabb: true, big: 'No', other: 'Limited' },
                  { feature: 'No hidden commissions', grabb: true, big: false, other: false },
                  { feature: 'Community-focused', grabb: true, big: false, other: false },
                  { feature: 'Real-time tracking', grabb: true, big: true, other: false },
                  { feature: 'Support local economy', grabb: true, big: false, other: false },
                ].map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white even:bg-ice/30 hover:bg-ice/50 transition-colors"
                  >
                    <td className="px-6 py-3.5 font-medium text-navy">{row.feature}</td>
                    <td className="px-6 py-3.5">
                    {row.grabb === true ? <span className="text-emerald-500 font-semibold">• Yes</span> :
                     row.grabb === false ? <span className="text-red-300">—</span> :
                     <span className="text-gray-500">{row.grabb}</span>}
                    </td>
                    <td className="px-6 py-3.5">
                      {row.big === true ? <span className="text-emerald-500 font-semibold">• Yes</span> :
                       row.big === false ? <span className="text-red-300">—</span> :
                       <span className="text-gray-500">{row.big}</span>}
                    </td>
                    <td className="px-6 py-3.5">
                      {row.other === true ? <span className="text-emerald-500 font-semibold">• Yes</span> :
                       row.other === false ? <span className="text-red-300">—</span> :
                       <span className="text-gray-500">{row.other}</span>}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-fraunces text-3xl font-semibold text-navy">Frequently Asked Questions</h2>
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
