import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { MapPin, ShoppingBag, ClipboardList, CreditCard, Bike, Store, PackageCheck, Smartphone, ArrowRight, Sparkles, Check, X } from 'lucide-react'

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

const comparisonRows = [
  { label: 'Local shops only', grabb: true, bigapps: false, others: false },
  { label: 'Direct vendor support', grabb: true, bigapps: false, others: true },
  { label: 'No hidden commissions', grabb: true, bigapps: false, others: false },
  { label: 'Community-focused', grabb: true, bigapps: false, others: false },
  { label: 'Real-time tracking', grabb: true, bigapps: true, others: true },
  { label: 'Support local economy', grabb: true, bigapps: false, others: false },
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

export default function HowItWorks() {
  const [role, setRole] = useState<'buyer' | 'vendor'>('buyer')
  const steps = role === 'buyer' ? buyerSteps : vendorSteps

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
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-5 py-2.5 rounded-full mb-6 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              How It Works
            </div>
            <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-navy">How Grabb Works</h1>
            <p className="text-gray-500 mt-3 text-base md:text-lg max-w-lg mx-auto">From shop to doorstep — it's simple, transparent, and built for local.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Role Toggle + Steps */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Toggle */}
          <AnimatedSection className="flex justify-center mb-14">
            <div className="bg-ice rounded-2xl p-1.5 inline-flex gap-1">
              {(['buyer', 'vendor'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`relative px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    role === r ? 'text-white' : 'text-navy/50 hover:text-navy'
                  }`}
                >
                  {role === r && (
                    <motion.div layoutId="roleToggle" className="absolute inset-0 bg-gradient-to-r from-ocean to-ocean-dark rounded-xl shadow-lg shadow-ocean/20" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                  )}
                  <span className="relative z-10">{r === 'buyer' ? 'For Buyers' : 'For Vendors'}</span>
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Steps Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
            >
              {steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative"
                  >
                    <div className="bg-gradient-to-br from-[#fdf8f0] to-ice/50 rounded-[1.3rem] p-6 h-full border border-gray-100/80 hover:border-ocean/20 hover:shadow-premium-lg transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-ocean/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.3rem]" />
                      <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="font-fraunces text-xs font-bold text-ocean/30">0{i + 1}</span>
                          <motion.div
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean/10 to-sky/10 flex items-center justify-center group-hover:from-ocean group-hover:to-ocean-dark transition-all duration-300 shadow-sm"
                          >
                            <Icon className="w-5 h-5 text-ocean group-hover:text-white transition-colors" />
                          </motion.div>
                        </div>
                        <h3 className="font-fraunces font-bold text-navy text-base mb-1.5">{step.title}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gray-200" />
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Delivery Comparison */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-[#fdf8f0] via-white to-ice/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-5 py-2.5 rounded-full mb-5 tracking-wide uppercase">
              Comparison
            </span>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-navy">Delivery Comparison</h2>
            <p className="text-gray-500 mt-3 text-base">See how Grabb stacks up against the rest.</p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-[1.5rem] border border-gray-100/80 overflow-hidden shadow-premium-xl">
              <div className="grid grid-cols-4 text-xs font-bold text-navy border-b border-gray-100">
                <div className="p-4 md:p-5">Feature</div>
                <div className="p-4 md:p-5 text-center bg-ocean/[0.04]">Grabb</div>
                <div className="p-4 md:p-5 text-center">BigApps</div>
                <div className="p-4 md:p-5 text-center">Others</div>
              </div>
              {comparisonRows.map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className={`grid grid-cols-4 text-sm ${i < comparisonRows.length - 1 ? 'border-b border-gray-50' : ''}`}
                >
                  <div className="p-4 md:p-5 text-gray-600">{row.label}</div>
                  <div className="p-4 md:p-5 text-center bg-ocean/[0.02]">
                    {row.grabb ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-gray-300 mx-auto" />}
                  </div>
                  <div className="p-4 md:p-5 text-center">
                    {row.bigapps ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-gray-300 mx-auto" />}
                  </div>
                  <div className="p-4 md:p-5 text-center">
                    {row.others ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-gray-300 mx-auto" />}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-ocean-dark" />
          <div className="absolute top-[15%] left-[10%] w-2 h-2 rounded-full bg-white/10 animate-float" />
          <div className="absolute bottom-[20%] right-[15%] w-2.5 h-2.5 rounded-full bg-sky/20 animate-float-delayed" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-white">Ready to Get Started?</h2>
            <p className="text-white/60 mt-3 text-base max-w-md mx-auto">Join Grabb today and discover the best local shops in your neighbourhood.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link to="/explore" className="group inline-flex items-center gap-2 bg-white text-navy px-8 py-3.5 rounded-full font-semibold text-sm shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all">
                  Explore Shops <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link to="/become-a-vendor" className="inline-flex items-center gap-2 border-2 border-white/20 text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-white/10 transition-all">
                  Become a Vendor
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
