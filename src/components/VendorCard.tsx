import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BadgeCheck, Star } from 'lucide-react'

export default function VendorCard({ vendor, index = 0 }: { vendor: { id: string; name: string; category: string; area: string; tagline: string; story: string; image: string; logo: string; verified: boolean; products: { name: string; price: string; image: string }[]; reviews: { name: string; rating: number; text: string }[] }; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/vendor/${vendor.id}`}
        className="block bg-white rounded-[1.3rem] overflow-hidden shadow-sm hover:shadow-premium-xl transition-all duration-500 hover:-translate-y-2 group border border-gray-100/50"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={vendor.image}
            alt={vendor.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          {vendor.verified && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-navy text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm border border-white/50"
            >
              <BadgeCheck className="w-3.5 h-3.5 text-ocean" /> Verified
            </motion.span>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={vendor.logo}
              alt={`${vendor.name} logo`}
              className="w-11 h-11 rounded-full object-cover border-2 border-ice shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
            <div className="min-w-0">
              <h3 className="font-fraunces font-semibold text-navy text-base truncate group-hover:text-ocean transition-colors duration-300">{vendor.name}</h3>
              <p className="text-xs text-gray-400 capitalize truncate">{vendor.category} &middot; {vendor.area}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{vendor.tagline}</p>

          {vendor.reviews && vendor.reviews.length > 0 && (
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-ice">
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}>
                <Star className="w-3.5 h-3.5 text-gold fill-gold" />
              </motion.div>
              <span className="text-xs text-gray-400">
                {vendor.reviews[0].rating}.0 &middot; {vendor.reviews.length} review{vendor.reviews.length > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
