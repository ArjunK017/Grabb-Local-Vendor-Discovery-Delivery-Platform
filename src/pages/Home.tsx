import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Store, Search, Truck, BadgeCheck, ShoppingBag, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import SectionWrapper from '../components/SectionWrapper'
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
      {/* ── Hero Section (FR-01, FR-02) ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ice to-white py-20 md:py-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-ocean/5 blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-sky/10 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-1.5 bg-ocean/10 text-ocean text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                <Sparkles className="w-4 h-4" /> Shop Local. Delivered.
              </span>
              <h1 className="font-fraunces text-5xl md:text-6xl lg:text-7xl font-semibold text-navy leading-[1.05] tracking-tight">
                Real local shops.
                <br />
                <span className="text-ocean">Delivered to your door.</span>
              </h1>
              <p className="mt-5 text-lg text-gray-600 max-w-lg leading-relaxed">
                Grabb is the opposite of quick-commerce warehouses. See the real shop, know who you're buying from, and get it delivered fast — all without the anonymity.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-ocean to-ocean-dark text-white px-7 py-3.5 rounded-xl font-medium shadow-lg shadow-ocean/20 hover:shadow-xl hover:shadow-ocean/30 hover:-translate-y-0.5 transition-all"
                >
                  Explore Local Shops <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/become-a-vendor"
                  className="inline-flex items-center gap-2 border-2 border-ocean text-ocean px-7 py-3.5 rounded-xl font-medium hover:bg-ocean hover:text-white transition-all hover:-translate-y-0.5"
                >
                  Become a Vendor <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-ocean/10 to-sky/10 rounded-3xl transform rotate-2 scale-105" />
              <img
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=400&fit=crop"
                alt="Local shopfront"
                className="relative rounded-2xl shadow-xl w-full h-80 md:h-96 object-cover"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky to-ocean flex items-center justify-center">
                  <BadgeCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-navy">Verified Local Shop</p>
                  <p className="text-xs text-gray-500">Know exactly who you buy from</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How It Works Strip (FR-03) ── */}
      <SectionWrapper
        id="how-it-works"
        title="How It Works"
        subtitle="From shop to doorstep — in four simple steps."
        className="bg-white"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ice to-ice-dark flex items-center justify-center mx-auto mb-5 group-hover:from-ocean group-hover:to-ocean-dark group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-ocean/20">
                  <Icon className="w-7 h-7 text-ocean group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-fraunces font-semibold text-navy text-xl mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </SectionWrapper>

      {/* ── Category Tiles (FR-04) ── */}
      <SectionWrapper
        id="categories"
        title="Browse by Category"
        subtitle="From daily groceries to artisan gifts — find the shop that has what you need."
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <CategoryTile key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* ── Featured Vendors Carousel (FR-05) ── */}
      <SectionWrapper
        id="featured"
        title="Featured Local Shops"
        subtitle="Meet some of the shops already on Grabb."
        className="bg-white"
      >
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
            <div className="flex items-center justify-center gap-4 mt-8">
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
        <div className="text-center mt-10">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-ocean font-medium hover:text-ocean-light transition-colors group"
          >
            View All Shops <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </SectionWrapper>

      {/* ── Trust / Impact Strip (FR-06) ── */}
      <SectionWrapper
        id="trust"
        title="Growing the Local Economy"
        subtitle="Every order through Grabb supports a real neighbourhood business."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div className="font-fraunces text-4xl md:text-5xl font-bold text-ocean group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
