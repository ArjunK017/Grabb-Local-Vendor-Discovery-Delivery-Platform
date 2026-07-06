import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Store, Search, Truck, BadgeCheck, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react'
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
  const itemsPerPage = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 2 : 1
  const maxIndex = Math.max(0, featuredVendors.length - itemsPerPage)

  const nextSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prevSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  /* Auto-rotate every 5s */
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <>
      {/* ── Hero Section (FR-01, FR-02) ── */}
      <section className="bg-gradient-to-b from-ice to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-ocean/10 text-ocean text-sm font-medium px-3 py-1 rounded-full mb-4">
                Shop Local. Delivered.
              </span>
              <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-semibold text-navy leading-tight">
                Real local shops.
                <br />
                <span className="text-ocean">Delivered to your door.</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-lg">
                Grabb is the opposite of quick-commerce warehouses. See the real shop, know who you're buying from, and get it delivered fast — all without the anonymity.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-2 bg-ocean text-white px-6 py-3 rounded-lg font-medium hover:bg-sky transition-colors"
                >
                  Explore Local Shops <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/become-a-vendor"
                  className="inline-flex items-center gap-2 border-2 border-ocean text-ocean px-6 py-3 rounded-lg font-medium hover:bg-ocean hover:text-white transition-colors"
                >
                  Become a Vendor <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Right: Hero visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=400&fit=crop"
                alt="Local shopfront"
                className="rounded-2xl shadow-lg w-full h-72 md:h-96 object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
                <BadgeCheck className="w-8 h-8 text-sky" />
                <div>
                  <p className="text-sm font-medium text-navy">Verified Local Shop</p>
                  <p className="text-xs text-gray-500">Know exactly who you buy from</p>
                </div>
              </div>
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-ice flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-ocean" />
                </div>
                <h3 className="font-fraunces font-semibold text-navy text-lg">{step.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{step.desc}</p>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
          {/* Carousel viewport */}
          <div className="overflow-x-hidden">
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

          {/* Carousel controls */}
          {featuredVendors.length > itemsPerPage && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-navy hover:bg-ice transition-colors"
                aria-label="Previous vendors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      i === carouselIndex ? 'bg-ocean' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-navy hover:bg-ice transition-colors"
                aria-label="Next vendors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-ocean font-medium hover:text-sky transition-colors"
          >
            View All Shops <ArrowRight className="w-4 h-4" />
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
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-fraunces text-3xl md:text-4xl font-bold text-ocean">{stat.value}</div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
