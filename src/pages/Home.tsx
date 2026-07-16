import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowRight, Store, Search, Truck, BadgeCheck, ShoppingBag, ChevronLeft, ChevronRight, Sparkles, Star, Leaf, Heart, Shield, Users } from 'lucide-react'
import CategoryTile from '../components/CategoryTile'
import VendorCard from '../components/VendorCard'
import categories from '../data/categories.json'
import vendors from '../data/vendors.json'

const steps = [
  { icon: Store, title: 'Shop Lists on Grabb', desc: 'Local vendors create their storefront — name, products, story, and photos.' },
  { icon: Search, title: 'You Browse & Choose', desc: 'Explore real shops by category or area. See who you\'re buying from before you order.' },
  { icon: ShoppingBag, title: 'You Order Directly', desc: 'Place your order with the shop through Grabb. No anonymous warehouses — just the shop you picked.' },
  { icon: Truck, title: 'Grabb Delivers It', desc: 'Our delivery partners pick it up from the shop counter and bring it straight to your door.' },
]

const stats = [
  { value: '200+', label: 'Local shops onboarded' },
  { value: '15+', label: 'Neighbourhoods covered' },
  { value: '98%', label: 'Delivery satisfaction rate' },
  { value: '4.8★', label: 'Average shop rating' },
]

const values = [
  { icon: Heart, title: 'Community First', desc: 'Every order supports a real neighbourhood business, not a faceless warehouse.' },
  { icon: Shield, title: 'Trust & Safety', desc: 'Know exactly who you\'re buying from — every shop is verified and reviewed.' },
  { icon: Leaf, title: 'Sustainable', desc: 'Local delivery means fewer miles, less waste, and a lighter footprint.' },
  { icon: Users, title: 'For Everyone', desc: 'Every shop, every customer, every neighbourhood — Grabb is built for all.' },
]

function SectionDivider({ variant = 'white' }: { variant?: 'white' | 'cream' | 'navy' }) {
  const fill = variant === 'navy' ? '#16324F' : variant === 'cream' ? '#fdf8f0' : '#ffffff'
  return (
    <div className="relative h-16 -mt-1 z-10">
      <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
        <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1350,15 1440,30 L1440,60 L0,60 Z" fill={fill} />
      </svg>
    </div>
  )
}

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StatCounter({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const numMatch = value.match(/(\d+)/)
  const num = numMatch ? parseInt(numMatch[1]) : 0
  const suffix = value.replace(/(\d+)/, '')
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const timer = setTimeout(() => {
      let start = 0
      const increment = Math.ceil(num / 30)
      const interval = setInterval(() => {
        start += increment
        if (start >= num) { setCount(num); clearInterval(interval) }
        else { setCount(start) }
      }, 33)
      return () => clearInterval(interval)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [isInView, num, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="text-center"
    >
      <div className="font-fraunces text-3xl md:text-4xl font-bold text-ocean">
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </motion.div>
  )
}

export default function Home() {
  const featuredVendors = vendors.slice(0, 4)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(4)

  useEffect(() => {
    const update = () => setItemsPerPage(window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 2 : 1)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxIndex = Math.max(0, featuredVendors.length - itemsPerPage)

  const nextSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prevSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          HERO — Clean entrance animation, no scroll-linked parallax
          ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fdf8f0] via-[#f8f4ec] to-ice min-h-screen flex items-center">
        {/* Static background orbs — no continuous animation on scroll-heavy elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-ocean/[0.04] to-transparent blur-[140px]" />
          <div className="absolute bottom-[-10%] left-[-8%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-gold/[0.04] to-transparent blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center min-h-[500px] lg:min-h-[580px]">
            {/* Left — Copy */}
            <div className="max-w-xl lg:max-w-lg">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-5 py-2.5 rounded-full mb-8 tracking-wide uppercase"
              >
                <Sparkles className="w-3.5 h-3.5" /> Shop Local. Delivered.
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-fraunces text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold text-navy leading-[1.05] tracking-tight"
              >
                Real local shops.
                <br />
                <span className="text-gradient">Delivered to your door.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-6 text-base md:text-lg text-gray-500 leading-relaxed max-w-md"
              >
                See the real shop, know who you're buying from, and get it delivered fast — all without the anonymity of dark-store warehouses.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                className="flex flex-wrap gap-4 mt-9"
              >
                <Link to="/explore"
                  className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-ocean to-ocean-dark text-white px-8 py-4 rounded-full font-semibold text-sm shadow-xl shadow-ocean/20 hover:shadow-2xl hover:shadow-ocean/30 hover:-translate-y-1 transition-all duration-300 active:scale-[0.97]"
                >
                  Explore Local Shops
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/become-a-vendor"
                  className="group inline-flex items-center gap-2.5 border-2 border-navy/10 text-navy px-8 py-4 rounded-full font-semibold text-sm hover:border-ocean hover:text-ocean hover:bg-ocean/[0.04] transition-all duration-300 hover:-translate-y-1 active:scale-[0.97]"
                >
                  Become a Vendor
                </Link>
              </motion.div>

              {/* Trust micro-stats with animated counters */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex items-center gap-6 mt-10 pt-8 border-t border-gray-200/60"
              >
                <StatCounter value="200+" label="Local shops" delay={0.9} />
                <div className="w-px h-9 bg-gray-200/60" />
                <StatCounter value="15+" label="Neighbourhoods" delay={1.0} />
                <div className="w-px h-9 bg-gray-200/60" />
                <StatCounter value="4.8" label="Avg. rating" delay={1.1} />
              </motion.div>
            </div>

            {/* Right — Hero image composition (no 3D tilt) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="relative w-full max-w-lg h-[480px]">
                {/* Main hero image */}
                <div className="absolute inset-8 rounded-[2rem] overflow-hidden shadow-premium-xl">
                  <img
                    src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=640&h=480&fit=crop"
                    alt="Local shopfront with fresh produce"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent" />
                </div>

                {/* Floating card — Verified */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute -bottom-2 -left-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-premium-lg p-4 flex items-center gap-3 border border-white/60 hover-lift"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean to-sky flex items-center justify-center shrink-0 shadow-lg shadow-ocean/20">
                    <BadgeCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">Verified Local Shop</p>
                    <p className="text-[11px] text-gray-400">Know exactly who you buy from</p>
                  </div>
                </motion.div>

                {/* Floating card — Rating */}
                <motion.div
                  initial={{ opacity: 0, y: -24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.5 }}
                  className="absolute -top-2 -right-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-premium-lg px-5 py-3.5 flex items-center gap-3 border border-white/60 hover-lift"
                >
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-gold" fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-navy">4.8</span>
                  <span className="text-[10px] text-gray-400">rating</span>
                </motion.div>

                {/* Floating card — Delivery */}
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.85, duration: 0.5 }}
                  className="absolute top-[40%] -right-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-premium-lg px-4 py-3.5 flex items-center gap-2.5 border border-white/60 hover-lift"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy">30 min</p>
                    <p className="text-[10px] text-gray-400">Avg. delivery</p>
                  </div>
                </motion.div>

                {/* Floating card — Shops nearby */}
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.95, duration: 0.5 }}
                  className="absolute bottom-16 -right-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-premium-lg px-4 py-3.5 flex items-center gap-2.5 border border-white/60 hover-lift"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/10 to-amber-50 flex items-center justify-center">
                    <Store className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy">12 nearby</p>
                    <p className="text-[10px] text-gray-400">Shops in your area</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider variant="white" />

      {/* ══════════════════════════════════════════════════════════════
          HOW IT WORKS
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white section-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-5 py-2 rounded-full mb-5 tracking-wide uppercase">
              Simple Steps
            </span>
            <h2 className="font-fraunces text-3xl md:text-5xl lg:text-6xl font-bold text-navy">How It Works</h2>
            <p className="text-gray-500 mt-4 text-base md:text-lg max-w-lg mx-auto">From shop to doorstep — in four simple steps.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <AnimatedSection key={step.title} delay={i * 0.08}>
                  <div className="bg-gradient-to-br from-[#fdf8f0] to-ice/50 rounded-[1.3rem] p-7 h-full border border-gray-100/80 hover:border-ocean/20 hover:shadow-premium-lg transition-all duration-400 group card-container">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-fraunces text-xs font-bold text-ocean/30">0{i + 1}</span>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean/10 to-sky/10 flex items-center justify-center group-hover:from-ocean group-hover:to-ocean-dark transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-ocean/20">
                        <Icon className="w-6 h-6 text-ocean group-hover:text-white transition-colors" />
                      </div>
                    </div>
                    <h3 className="font-fraunces font-semibold text-navy text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      <SectionDivider variant="cream" />

      {/* ══════════════════════════════════════════════════════════════
          CATEGORIES
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#fdf8f0] via-white to-ice/30 section-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-5 py-2 rounded-full mb-5 tracking-wide uppercase">
              Categories
            </span>
            <h2 className="font-fraunces text-3xl md:text-5xl lg:text-6xl font-bold text-navy">Browse by Category</h2>
            <p className="text-gray-500 mt-4 text-base md:text-lg max-w-lg mx-auto">From daily groceries to artisan gifts — find the shop that has what you need.</p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {categories.map((cat, i) => (
              <AnimatedSection key={cat.id} delay={i * 0.05}>
                <CategoryTile category={cat} index={i} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="white" />

      {/* ══════════════════════════════════════════════════════════════
          FEATURED VENDORS
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white section-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-5 py-2 rounded-full mb-5 tracking-wide uppercase">
              Featured
            </span>
            <h2 className="font-fraunces text-3xl md:text-5xl lg:text-6xl font-bold text-navy">Featured Local Shops</h2>
            <p className="text-gray-500 mt-4 text-base md:text-lg max-w-lg mx-auto">Meet some of the shops already on Grabb.</p>
          </AnimatedSection>

          <div className="relative">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {featuredVendors
                    .slice(carouselIndex, carouselIndex + itemsPerPage)
                    .map((vendor, i) => (
                      <VendorCard key={vendor.id} vendor={vendor} index={i} />
                    ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {featuredVendors.length > itemsPerPage && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-navy hover:bg-ice hover:border-ocean/20 transition-all shadow-sm hover:shadow-md" aria-label="Previous vendors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2.5">
                  {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button key={i} onClick={() => setCarouselIndex(i)}
                      className={`rounded-full transition-all duration-300 ${
                        i === carouselIndex ? 'w-8 h-3 bg-gradient-to-r from-ocean to-ocean-dark shadow-lg shadow-ocean/30' : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                      }`} aria-label={`Go to slide ${i + 1}`} />
                  ))}
                </div>
                <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-navy hover:bg-ice hover:border-ocean/20 transition-all shadow-sm hover:shadow-md" aria-label="Next vendors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link to="/explore" className="inline-flex items-center gap-2.5 bg-gradient-to-r from-ocean to-ocean-dark text-white px-8 py-4 rounded-full font-semibold text-sm shadow-xl shadow-ocean/20 hover:shadow-2xl hover:shadow-ocean/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.97]">
              View All Shops <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider variant="cream" />

      {/* ══════════════════════════════════════════════════════════════
          VALUES
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#fdf8f0] via-white to-ice/30 section-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-5 py-2 rounded-full mb-5 tracking-wide uppercase">
              Why Grabb
            </span>
            <h2 className="font-fraunces text-3xl md:text-5xl lg:text-6xl font-bold text-navy">What Makes Us Different</h2>
            <p className="text-gray-500 mt-4 text-base md:text-lg max-w-lg mx-auto">Not another delivery app — a platform built for local shops and the people who love them.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <AnimatedSection key={v.title} delay={i * 0.07}>
                  <div className="bg-white rounded-[1.3rem] p-7 h-full border border-gray-100/80 hover:border-ocean/20 hover:shadow-premium-lg transition-all duration-400 group card-container">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ocean/10 to-sky/10 flex items-center justify-center mb-5 group-hover:from-ocean group-hover:to-ocean-dark transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-ocean/20">
                      <Icon className="w-7 h-7 text-ocean group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-fraunces font-semibold text-navy text-lg mb-2">{v.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      <SectionDivider variant="white" />

      {/* ══════════════════════════════════════════════════════════════
          STATS
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white section-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-5 py-2 rounded-full mb-5 tracking-wide uppercase">
              Impact
            </span>
            <h2 className="font-fraunces text-3xl md:text-5xl lg:text-6xl font-bold text-navy">Growing the Local Economy</h2>
            <p className="text-gray-500 mt-4 text-base md:text-lg max-w-lg mx-auto">Every order through Grabb supports a real neighbourhood business.</p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.08}>
                <div className="bg-gradient-to-br from-[#fdf8f0] to-ice/50 rounded-[1.3rem] p-7 md:p-8 text-center border border-gray-100/80 hover:border-ocean/20 hover:shadow-premium-lg transition-all duration-400 group card-container">
                  <StatCounter value={stat.value} label={stat.label} delay={i * 0.12} />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="navy" />

      {/* ══════════════════════════════════════════════════════════════
          CTA — Dark section (no bg-pan animation)
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-ocean/10 blur-[180px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-sky/5 blur-[140px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 text-white/80 text-xs font-semibold px-5 py-2 rounded-full mb-8 tracking-wide uppercase">
              <Store className="w-3.5 h-3.5" /> For Vendors
            </span>
            <h2 className="font-fraunces text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Your Shop, Online.
              <br />
              <span className="text-sky-light">We Handle the Delivery.</span>
            </h2>
            <p className="text-white/50 mt-6 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
              Join Grabb and reach customers in your neighbourhood. Free to join, easy to use, zero delivery hassle.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
              <Link to="/become-a-vendor"
                className="group inline-flex items-center gap-2.5 bg-white text-navy px-9 py-4 rounded-full font-semibold text-sm shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 active:scale-[0.97]"
              >
                Become a Vendor
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/how-it-works"
                className="group inline-flex items-center gap-2.5 border-2 border-white/20 text-white px-9 py-4 rounded-full font-semibold text-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 active:scale-[0.97]"
              >
                See How It Works
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
