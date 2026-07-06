import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'
import VendorCard from '../components/VendorCard'
import categories from '../data/categories.json'
import vendors from '../data/vendors.json'

const areas = [...new Set(vendors.map((v) => v.area))]

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || ''
  const [searchQuery, setSearchQuery] = useState('')
  const [areaFilter, setAreaFilter] = useState('')

  /* ── Filter vendors (FR-08, FR-09, FR-10) ── */
  const filtered = useMemo(() => {
    return vendors.filter((v) => {
      const matchCategory = !activeCategory || v.category === activeCategory
      const matchArea = !areaFilter || v.area === areaFilter
      const query = searchQuery.toLowerCase()
      const matchSearch =
        !query ||
        v.name.toLowerCase().includes(query) ||
        v.category.toLowerCase().includes(query) ||
        v.tagline.toLowerCase().includes(query)
      return matchCategory && matchArea && matchSearch
    })
  }, [activeCategory, areaFilter, searchQuery])

  const setCategory = (catId: string) => {
    const params = new URLSearchParams(searchParams)
    if (catId) {
      params.set('category', catId)
    } else {
      params.delete('category')
    }
    setSearchParams(params)
  }

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-fraunces text-3xl md:text-4xl font-semibold text-navy">Explore Local Shops</h1>
          <p className="text-gray-600 mt-2">Browse real shops in your neighbourhood. See who you're buying from.</p>
        </motion.div>

        {/* Filters bar */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          {/* Search (FR-10) */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search shops or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-ocean/30 focus:border-ocean text-sm"
            />
          </div>

          {/* Area filter (FR-09) */}
          <select
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
          >
            <option value="">All Areas</option>
            {areas.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

        {/* Category pills (FR-08) */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setCategory('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !activeCategory ? 'bg-ocean text-white' : 'bg-white text-navy hover:bg-ice'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id ? 'bg-ocean text-white' : 'bg-white text-navy hover:bg-ice'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="mt-6 text-sm text-gray-500">
          {filtered.length} shop{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Vendor grid (FR-11) */}
        {filtered.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((vendor, i) => (
              <VendorCard key={vendor.id} vendor={vendor} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center text-gray-500">
            <SlidersHorizontal className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="font-fraunces text-lg text-navy">No shops found</p>
            <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  )
}
