import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, MapPin } from 'lucide-react'
import VendorCard from '../components/VendorCard'
import categories from '../data/categories.json'
import vendors from '../data/vendors.json'

const areas = [...new Set(vendors.map((v) => v.area))]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || ''
  const [searchQuery, setSearchQuery] = useState('')
  const [areaFilter, setAreaFilter] = useState('')

  const filtered = useMemo(() => {
    return vendors.filter((v) => {
      const matchCategory = !activeCategory || v.category === activeCategory
      const matchArea = !areaFilter || v.area === areaFilter
      const query = searchQuery.toLowerCase()
      const matchSearch = !query || v.name.toLowerCase().includes(query) || v.category.toLowerCase().includes(query) || v.tagline.toLowerCase().includes(query)
      return matchCategory && matchArea && matchSearch
    })
  }, [activeCategory, areaFilter, searchQuery])

  const setCategory = (catId: string) => {
    const params = new URLSearchParams(searchParams)
    if (catId) params.set('category', catId)
    else params.delete('category')
    setSearchParams(params)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ice to-white pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-15%] left-[-5%] w-[35%] h-[35%] rounded-full bg-ocean/5 blur-3xl animate-float" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-sky/8 blur-3xl animate-float-delayed" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-fraunces text-4xl md:text-5xl font-semibold text-navy">Explore Local Shops</h1>
            <p className="text-gray-600 mt-2 text-lg max-w-xl">Browse real shops in your neighbourhood. See who you're buying from.</p>
          </motion.div>

          {/* Search + Area filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search shops or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm shadow-sm transition-all duration-300"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="pl-11 pr-10 py-3.5 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean shadow-sm appearance-none transition-all duration-300 min-w-[180px]"
              >
                <option value="">All Areas</option>
                {areas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Category pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            <button
              onClick={() => setCategory('')}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                !activeCategory
                  ? 'bg-gradient-to-r from-ocean to-ocean-dark text-white shadow-md shadow-ocean/20 scale-105'
                  : 'bg-white/80 backdrop-blur-sm text-navy/70 hover:text-navy border border-gray-200 hover:border-ocean/30'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-ocean to-ocean-dark text-white shadow-md shadow-ocean/20 scale-105'
                    : 'bg-white/80 backdrop-blur-sm text-navy/70 hover:text-navy border border-gray-200 hover:border-ocean/30'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="pb-20 md:pb-28 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-7 pt-2"
          >
            <span className="w-1 h-5 rounded-full bg-gradient-to-b from-ocean to-sky shrink-0" />
            <span className="text-sm text-gray-500">
              <span className="font-semibold text-navy text-base">{filtered.length}</span> shop{filtered.length !== 1 ? 's' : ''} found
            </span>
            {(activeCategory || areaFilter || searchQuery) && (
              <span className="text-[11px] text-gray-400 ml-auto">
                {(activeCategory ? 1 : 0) + (areaFilter ? 1 : 0) + (searchQuery ? 1 : 0)} filter{(activeCategory ? 1 : 0) + (areaFilter ? 1 : 0) + (searchQuery ? 1 : 0) !== 1 ? 's' : ''} active
              </span>
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory + areaFilter + searchQuery}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filtered.map((vendor, i) => (
                  <motion.div key={vendor.id} variants={itemVariants}>
                    <VendorCard vendor={vendor} index={i} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-16 text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-ice to-ice-dark flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <SlidersHorizontal className="w-9 h-9 text-gray-400" />
                </div>
                <p className="font-fraunces text-2xl text-navy">No shops found</p>
                <p className="text-gray-500 mt-2 text-sm">Try adjusting your filters or search query.</p>
                <button
                  onClick={() => { setSearchQuery(''); setAreaFilter(''); setCategory('') }}
                  className="mt-5 px-6 py-2.5 rounded-xl bg-ocean text-white text-sm font-medium shadow-md shadow-ocean/20 hover:shadow-lg transition-all"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
