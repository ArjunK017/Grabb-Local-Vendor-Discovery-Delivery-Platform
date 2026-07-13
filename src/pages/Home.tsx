import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
          HERO SECTION (FR-01, FR-02)
          Warm cream background, decorative floating elements,
          two-column layout with premium visual composition
          ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fdf8f0] via-[#f8f4ec] to-ice">
        {/* Decorative floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[8%] left-[5%] w-3 h-3 rounded-full bg-ocean/20 animate-float" />
          <div className="absolute top-[15%] right-[12%] w-2 h-2 rounded-full bg-sky/30 animate-float-delayed" />
          <div className="absolute bottom-[20%] left-[8%] w-4 h-4 rounded-full bg-gold/15 animate-float" />
          <div className="absolute top-[40%] right-[6%] w-2.5 h-2.5 rounded-full bg-ocean/15 animate-float-delayed" />
          <div className="absolute top-[60%] left-[15%] w-2 h-2 rounded-full bg-sky/20 animate-float" />
          <div className="absolute top-[10%] left-[30%] w-1.5 h-1.5 rounded-full bg-gold/25 animate-float-delayed" />
          <div className="absolute bottom-[30%] right-[20%] w-3 h-3 rounded-full bg-ocean/10 animate-float" />
          {/* Soft gradient orbs */}
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-ocean/[0.03] to-transparent blur-[120px]" />
          <div className="absolute bottom-[-15%] left-[-8%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-gold/[0.04] to-transparent blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center min-h-[480px] lg:min-h-[540px]">
            {/* Left — Copy */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl lg:max-w-lg"
            >
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide uppercase"
              >
                <Sparkles className="w-3.5 h-3.5" /> Shop Local. Delivered.
              </motion.div>

              <h1 className="font-fraunces text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4rem] font-bold text-navy leading-[1.06] tracking-tight">
                Real local shops.
                <br />
                <span className="bg-gradient-to-r from-ocean to-ocean-dark bg-clip-text text-transparent">Delivered to your door.</span>
              </h1>

              <p className="mt-5 text-base md:text-lg text-gray-500 leading-relaxed max-w-md">
                See the real shop, know who you're buying from, and get it delivered fast — all without the anonymity of dark-store warehouses.
              </p>

              <div className="flex flex-wrap gap-3.5 mt-8">
                <Link to="/explore"
                  className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-ocean to-ocean-dark text-white px-7 py-3.5 rounded-2xl font-semibold text-sm shadow-xl shadow-ocean/20 hover:shadow-2xl hover:shadow-ocean/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98]"
                >
                  Explore Local Shops
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link to="/become-a-vendor"
                  className="group inline-flex items-center gap-2.5 border-2 border-navy/10 text-navy px-7 py-3.5 rounded-2xl font-semibold text-sm hover:border-ocean hover:text-ocean hover:bg-ocean/[0.04] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Become a Vendor
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* Trust micro-stats */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="flex items-center gap-6 mt-10 pt-8 border-t border-gray-200/60"
              >
                <div>
                  <p className="font-fraunces text-2xl font-bold text-navy">200+</p>
                  <p className="text-xs text-gray-400 mt-0.5">Local shops</p>
                </div>
                <div className="w-px h-9 bg-gray-200/60" />
                <div>
                  <p className="font-fraunces text-2xl font-bold text-navy">15+</p>
                  <p className="text-xs text-gray-400 mt-0.5">Neighbourhoods</p>
                </div>
                <div className="w-px h-9 bg-gray-200/60" />
                <div>
                  <p className="font-fraunces text-2xl font-bold text-navy">4.8<span className="text-gold">★</span></p>
                  <p className="text-xs text-gray-400 mt-0.5">Avg. rating</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right — Visual Composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="relative w-full max-w-lg">
                {/* Main hero image */}
                <div className="absolute inset-0 bg-gradient-to-br from-ocean/10 via-sky/5 to-gold/5 rounded-[2rem] transform rotate-3 scale-105" />
                <img
                  src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=640&h=480&fit=crop"
                  alt="Local shopfront with fresh produce"
                  className="relative rounded-[1.5rem] shadow-2xl shadow-navy/10 w-full h-[380px] object-cover"
                />

                {/* Floating card — Verified */}
                <motion.div
                  initial={{ opacity: 0, y: 20, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 0.55, duration: 0.5 }}
                  className="absolute -bottom-5 -left-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-navy/8 p-4 flex items-center gap-3 border border-white/60"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-ocean to-sky flex items-center justify-center shrink-0">
                    <BadgeCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">Verified Local Shop</p>
                    <p className="text-[11px] text-gray-400">Know exactly who you buy from</p>
                  </div>
                </motion.div>

                {/* Floating card — Rating */}
                <motion.div
                  initial={{ opacity: 0, y: -20, x: 20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 0.65, duration: 0.5 }}
                  className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-navy/8 px-4 py-3 flex items-center gap-2.5 border border-white/60"
                >
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-gold" fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-navy">4.8</span>
                  <span className="text-[10px] text-gray-400">rating</span>
                </motion.div>

                {/* Floating card — Delivery */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.75, duration: 0.5 }}
                  className="absolute top-1/2 -right-10 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-navy/8 px-4 py-3 flex items-center gap-2.5 border border-white/60"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
                    <Truck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy">30 min</p>
                    <p className="text-[10px] text-gray-400">Avg. delivery</p>
                  </div>
                </motion.div>

                {/* Floating card — Shops nearby */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute bottom-16 -right-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-navy/8 px-4 py-3 flex items-center gap-2.5 border border-white/60"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold/10 to-amber-50 flex items-center justify-center">
                    <Store className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy">12 nearby</p>
                    <p className="text-[10px] text-gray-400">Shops in your area</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          HOW IT WORKS (FR-03)
          Card-based section with numbered steps
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-1.5 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Simple Steps
            </span>
            <h2 className="font-fraunces text-3xl md:text-4xl lg:text-5xl font-bold text-navy">How It Works</h2>
            <p className="text-gray-500 mt-3 text-base md:text-lg max-w-lg mx-auto">From shop to doorstep — in four simple steps.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group relative"
                >
                  <div className="bg-gradient-to-br from-[#fdf8f0] to-ice/50 rounded-2xl p-6 md:p-7 h-full border border-gray-100/80 hover:border-ocean/20 hover:shadow-xl hover:shadow-ocean/5 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean/10 to-sky/10 flex items-center justify-center mb-5 group-hover:from-ocean group-hover:to-ocean-dark transition-all duration-300">
                      <Icon className="w-6 h-6 text-ocean group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-fraunces text-xs font-bold text-ocean/40">0{i + 1}</span>
                      <h3 className="font-fraunces font-semibold text-navy text-lg">{step.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CATEGORIES (FR-04)
          Product-style cards with organic feel
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#fdf8f0] via-white to-ice/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-1.5 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Categories
            </span>
            <h2 className="font-fraunces text-3xl md:text-4xl lg:text-5xl font-bold text-navy">Browse by Category</h2>
            <p className="text-gray-500 mt-3 text-base md:text-lg max-w-lg mx-auto">From daily groceries to artisan gifts — find the shop that has what you need.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {categories.map((cat, i) => (
              <CategoryTile key={cat.id} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FEATURED VENDORS (FR-05)
          Carousel with premium card layout
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-1.5 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Featured
            </span>
            <h2 className="font-fraunces text-3xl md:text-4xl lg:text-5xl font-bold text-navy">Featured Local Shops</h2>
            <p className="text-gray-500 mt-3 text-base md:text-lg max-w-lg mx-auto">Meet some of the shops already on Grabb.</p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35 }}
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
                <button
                  onClick={prevSlide}
                  className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-navy hover:bg-ice hover:border-ocean/20 transition-all shadow-sm hover:shadow-md"
                  aria-label="Previous vendors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCarouselIndex(i)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        i === carouselIndex ? 'bg-ocean scale-110' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-navy hover:bg-ice hover:border-ocean/20 transition-all shadow-sm hover:shadow-md"
                  aria-label="Next vendors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-ocean to-ocean-dark text-white px-7 py-3.5 rounded-2xl font-semibold text-sm shadow-lg shadow-ocean/20 hover:shadow-xl hover:shadow-ocean/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98]"
            >
              View All Shops <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          VALUES / WHAT MAKES GRABB DIFFERENT
          Premium card layout inspired by the organic design
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#fdf8f0] via-white to-ice/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-1.5 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Why Grabb
            </span>
            <h2 className="font-fraunces text-3xl md:text-4xl lg:text-5xl font-bold text-navy">What Makes Us Different</h2>
            <p className="text-gray-500 mt-3 text-base md:text-lg max-w-lg mx-auto">Not another delivery app — a platform built for local shops and the people who love them.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-6 md:p-7 h-full border border-gray-100/80 hover:border-ocean/20 hover:shadow-xl hover:shadow-ocean/5 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean/10 to-sky/10 flex items-center justify-center mb-5 group-hover:from-ocean group-hover:to-ocean-dark transition-all duration-300">
                      <Icon className="w-6 h-6 text-ocean group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-fraunces font-semibold text-navy text-lg mb-2">{v.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TRUST / IMPACT STRIP (FR-06)
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-1.5 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Impact
            </span>
            <h2 className="font-fraunces text-3xl md:text-4xl lg:text-5xl font-bold text-navy">Growing the Local Economy</h2>
            <p className="text-gray-500 mt-3 text-base md:text-lg max-w-lg mx-auto">Every order through Grabb supports a real neighbourhood business.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-[#fdf8f0] to-ice/50 rounded-2xl p-6 md:p-8 text-center border border-gray-100/80 hover:border-ocean/20 hover:shadow-xl hover:shadow-ocean/5 transition-all duration-300 hover:-translate-y-1">
                  <div className="font-fraunces text-3xl md:text-4xl font-bold text-ocean group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CTA SECTION — BECOME A VENDOR
          Premium bottom section with gradient background
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-navy via-navy to-ocean-dark relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-2 h-2 rounded-full bg-white/10 animate-float" />
          <div className="absolute top-[25%] right-[15%] w-3 h-3 rounded-full bg-sky/20 animate-float-delayed" />
          <div className="absolute bottom-[20%] left-[20%] w-2.5 h-2.5 rounded-full bg-ocean-light/15 animate-float" />
          <div className="absolute bottom-[30%] right-[8%] w-2 h-2 rounded-full bg-white/10 animate-float-delayed" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              <Store className="w-3.5 h-3.5" /> For Vendors
            </span>
            <h2 className="font-fraunces text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Your Shop, Online.
              <br />
              <span className="text-sky-light">We Handle the Delivery.</span>
            </h2>
            <p className="text-white/60 mt-5 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
              Join Grabb and reach customers in your neighbourhood. Free to join, easy to use, zero delivery hassle.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-9">
              <Link to="/become-a-vendor"
                className="group inline-flex items-center gap-2.5 bg-white text-navy px-8 py-4 rounded-2xl font-semibold text-sm shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98]"
              >
                Become a Vendor
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link to="/how-it-works"
                className="group inline-flex items-center gap-2.5 border-2 border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                See How It Works
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
