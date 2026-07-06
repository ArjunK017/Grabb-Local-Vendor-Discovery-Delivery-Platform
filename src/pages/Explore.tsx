import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal } from 'lucide-react'
import VendorCard from '../components/VendorCard'
import categories from '../data/categories.json'
import vendors from '../data/vendors.json'

const areas = [...new Set(vendors.map((v) => v.area))]

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
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-fraunces text-4xl md:text-5xl font-semibold text-navy">Explore Local Shops</h1>
          <p className="text-gray-600 mt-2 text-lg">Browse real shops in your neighbourhood. See who you're buying from.</p>
        </motion.div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search shops or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-shadow"
            />
          </div>

          <select
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%222%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10"
          >
            <option value="">All Areas</option>
            {areas.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setCategory('')}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              !activeCategory
                ? 'bg-gradient-to-r from-ocean to-ocean-dark text-white shadow-md shadow-ocean/20'
                : 'bg-white text-navy hover:bg-ice border border-gray-200'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-ocean to-ocean-dark text-white shadow-md shadow-ocean/20'
                  : 'bg-white text-navy hover:bg-ice border border-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <p className="mt-8 text-sm text-gray-500">
          {filtered.length} shop{filtered.length !== 1 ? 's' : ''} found
        </p>

        {filtered.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((vendor, i) => (
              <VendorCard key={vendor.id} vendor={vendor} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 text-center text-gray-500"
          >
            <div className="w-16 h-16 rounded-2xl bg-ice flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal className="w-8 h-8 text-gray-400" />
            </div>
            <p className="font-fraunces text-xl text-navy">No shops found</p>
            <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
