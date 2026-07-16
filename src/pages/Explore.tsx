import { useState, useMemo, useRef, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Search, MapPin, SlidersHorizontal, ArrowRight, Sparkles, X } from 'lucide-react'
import vendors from '../data/vendors.json'
import categories from '../data/categories.json'

const vendorList = vendors as any[]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || ''
  const [areaFilter, setAreaFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const areas = [...new Set(vendorList.map((v: any) => v.area))].sort()

  const scrollToResults = useCallback(() => {
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const setCategory = (catId: string) => {
    const params = new URLSearchParams(searchParams)
    if (catId) params.set('category', catId)
    else params.delete('category')
    setSearchParams(params)
    setTimeout(scrollToResults, 50)
  }

  const filtered = useMemo(() => {
    return vendorList.filter((v: any) => {
      const query = searchQuery.toLowerCase()
      const matchCategory = !activeCategory || v.category === activeCategory
      const matchArea = !areaFilter || v.area === areaFilter
      const matchSearch = !query ||
        v.name.toLowerCase().includes(query) ||
        v.category.toLowerCase().includes(query) ||
        v.tagline.toLowerCase().includes(query) ||
        v.area.toLowerCase().includes(query)
      return matchCategory && matchArea && matchSearch
    })
  }, [activeCategory, areaFilter, searchQuery])

  const activeFilters = [activeCategory, areaFilter, searchQuery].filter(Boolean).length

  const clearFilters = () => {
    setSearchParams({})
    setAreaFilter('')
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fdf8f0] via-ice to-white pt-20 pb-10 md:pt-28 md:pb-14">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-ocean/[0.03] blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-3%] w-[400px] h-[400px] rounded-full bg-gold/[0.04] blur-[100px]" />
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[30%] left-[10%] w-2.5 h-2.5 rounded-full bg-ocean/20" />
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: -2 }} className="absolute top-[15%] right-[15%] w-3 h-3 rounded-full bg-sky/25" />
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: -4 }} className="absolute bottom-[25%] left-[20%] w-2 h-2 rounded-full bg-gold/15" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-5 py-2.5 rounded-full mb-6 tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Discover
              </div>
              <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-navy">Explore Shops</h1>
              <p className="text-gray-500 mt-3 text-base md:text-lg max-w-lg mx-auto">Find real local shops in your neighbourhood — browse by category, area, or search.</p>
            </div>
          </SectionHeader>

          {/* Search + Filters */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="max-w-3xl mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search shops, categories, areas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200/60 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean/30 transition-all duration-300 shadow-sm hover:shadow-md"
                />
                {searchQuery && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </motion.button>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`px-5 py-3.5 rounded-2xl border text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
                  showFilters ? 'bg-gradient-to-r from-ocean to-ocean-dark text-white border-ocean shadow-lg shadow-ocean/20' : 'bg-white/80 border-gray-200/60 text-navy hover:border-ocean/30'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
                {activeFilters > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-white text-ocean text-[10px] font-bold flex items-center justify-center"
                  >
                    {activeFilters}
                  </motion.span>
                )}
              </motion.button>
            </div>

            {/* Expanded Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="bg-white rounded-2xl border border-gray-200/60 p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Area</label>
                        <select
                          value={areaFilter}
                          onChange={(e) => setAreaFilter(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-navy focus:outline-none focus:ring-2 focus:ring-ocean/20 transition-all"
                        >
                          <option value="">All Areas</option>
                          {areas.map((area) => (
                            <option key={area} value={area}>{area}</option>
                          ))}
                        </select>
                      </div>
                      {activeFilters > 0 && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          onClick={clearFilters}
                          className="mt-5 px-4 py-2.5 rounded-xl bg-red-50 text-red-500 text-xs font-medium hover:bg-red-100 transition-colors"
                        >
                          Clear All
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Category Pills — sticky */}
      <section className="bg-white border-b border-gray-100 sticky top-14 md:top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setCategory('')}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                !activeCategory
                  ? 'bg-gradient-to-r from-ocean to-ocean-dark text-white shadow-md shadow-ocean/20'
                  : 'bg-ice text-navy/50 hover:bg-ocean/10 hover:text-ocean'
              }`}
            >
              All Shops
            </motion.button>
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setCategory(cat.id)}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-ocean to-ocean-dark text-white shadow-md shadow-ocean/20'
                    : 'bg-ice text-navy/50 hover:bg-ocean/10 hover:text-ocean'
                }`}
              >
                {cat.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section ref={resultsRef} className="py-10 md:py-14 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results count */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 rounded-full bg-gradient-to-b from-ocean to-sky" />
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-navy">{filtered.length}</span> shop{filtered.length !== 1 ? 's' : ''} found
              </p>
            </div>
            {activeFilters > 0 && (
              <button onClick={clearFilters} className="text-xs text-ocean hover:text-ocean-dark font-medium transition-colors">
                Clear filters
              </button>
            )}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={`${activeCategory}-${areaFilter}-${searchQuery}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filtered.map((vendor: any) => (
                  <motion.div key={vendor.id} variants={cardVariants}>
                    <Link to={`/vendor/${vendor.id}`} className="block group">
                      <div className="bg-white rounded-[1.3rem] overflow-hidden border border-gray-100/80 hover:border-ocean/20 hover:shadow-premium-xl transition-all duration-500 hover:-translate-y-2">
                        {/* Image */}
                        <div className="relative overflow-hidden aspect-[4/3]">
                          <img
                            src={vendor.image}
                            alt={vendor.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-3 group-hover:translate-y-0">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm text-navy text-xs font-semibold shadow-lg">
                              View Shop <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                          {vendor.verified && (
                            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-ocean/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                              Verified
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-fraunces font-semibold text-navy text-base leading-tight group-hover:text-ocean transition-colors">{vendor.name}</h3>
                            <div className="flex items-center gap-1 shrink-0">
                              <svg className="w-3 h-3 text-gold" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-xs font-bold text-navy">{vendor.rating || '4.5'}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-400 mb-2 capitalize">{vendor.category}</p>
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{vendor.tagline}</p>
                          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-[11px] text-gray-400">{vendor.area}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 bg-white rounded-[1.5rem] border border-gray-100 shadow-sm"
              >
                <div className="w-16 h-16 rounded-2xl bg-ocean/5 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-ocean/30" />
                </div>
                <p className="font-fraunces text-xl text-navy/50">No shops found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search query.</p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={clearFilters}
                  className="mt-4 px-5 py-2 rounded-xl bg-ocean/10 text-ocean text-sm font-medium hover:bg-ocean/20 transition-colors"
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
