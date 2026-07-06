import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BadgeCheck, Star } from 'lucide-react'

export default function VendorCard({ vendor, index = 0 }: { vendor: { id: string; name: string; category: string; area: string; tagline: string; story: string; image: string; logo: string; verified: boolean; products: { name: string; price: string; image: string }[]; reviews: { name: string; rating: number; text: string }[] }; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to={`/vendor/${vendor.id}`}
        className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        {/* Shop image */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={vendor.image}
            alt={vendor.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {vendor.verified && (
            <span className="absolute top-2 right-2 bg-sky text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <BadgeCheck className="w-3 h-3" /> Verified
            </span>
          )}
        </div>

        {/* Card body */}
        <div className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={vendor.logo}
              alt={`${vendor.name} logo`}
              className="w-10 h-10 rounded-full object-cover border-2 border-ice"
              loading="lazy"
            />
            <div>
              <h3 className="font-fraunces font-semibold text-navy text-base">{vendor.name}</h3>
              <p className="text-xs text-gray-500 capitalize">{vendor.category} &middot; {vendor.area}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{vendor.tagline}</p>

          {/* Review summary */}
          {vendor.reviews && vendor.reviews.length > 0 && (
            <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span>{vendor.reviews[0].rating}.0 &middot; {vendor.reviews.length} review{vendor.reviews.length > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
