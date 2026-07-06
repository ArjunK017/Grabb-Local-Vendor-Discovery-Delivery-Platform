import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BadgeCheck, Star } from 'lucide-react'

export default function VendorCard({ vendor, index = 0 }: { vendor: { id: string; name: string; category: string; area: string; tagline: string; story: string; image: string; logo: string; verified: boolean; products: { name: string; price: string; image: string }[]; reviews: { name: string; rating: number; text: string }[] }; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to={`/vendor/${vendor.id}`}
        className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
      >
        <div className="relative h-44 overflow-hidden">
          <img
            src={vendor.image}
            alt={vendor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {vendor.verified && (
            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-navy text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <BadgeCheck className="w-3.5 h-3.5 text-sky" /> Verified
            </span>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={vendor.logo}
              alt={`${vendor.name} logo`}
              className="w-11 h-11 rounded-full object-cover border-2 border-ice shrink-0"
              loading="lazy"
            />
            <div className="min-w-0">
              <h3 className="font-fraunces font-semibold text-navy text-base truncate">{vendor.name}</h3>
              <p className="text-xs text-gray-500 capitalize truncate">{vendor.category} &middot; {vendor.area}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{vendor.tagline}</p>

          {vendor.reviews && vendor.reviews.length > 0 && (
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-ice">
              <Star className="w-3.5 h-3.5 text-gold fill-gold" />
              <span className="text-xs text-gray-500">
                {vendor.reviews[0].rating}.0 &middot; {vendor.reviews.length} review{vendor.reviews.length > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
