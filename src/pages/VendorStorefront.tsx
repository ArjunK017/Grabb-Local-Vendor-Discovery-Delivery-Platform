import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Star, MapPin, Phone, MessageCircle, Mail } from 'lucide-react'
import vendors from '../data/vendors.json'

const vendorList = vendors as any[]

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function VendorStorefront() {
  const { id: vendorId } = useParams()
  const vendor = vendorList.find((v: any) => v.id === vendorId)
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null)

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ice to-ice-dark flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-7 h-7 text-gray-400" />
          </div>
          <p className="font-fraunces text-3xl text-navy">Shop not found</p>
          <Link to="/explore" className="mt-4 inline-flex items-center gap-2 text-ocean hover:underline text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Explore
          </Link>
        </div>
      </div>
    )
  }

  const products = vendor.products || []
  const reviews = vendor.reviews || []

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="relative h-[200px] md:h-[260px] overflow-hidden">
        <img src={vendor.image} alt={vendor.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/80" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ice to-transparent" />
        <div className="absolute top-6 inset-x-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/explore" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-xs font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Explore
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-10">
        {/* Shop Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-5 md:p-7 shadow-xl shadow-navy/5"
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <img src={vendor.logo} alt={vendor.name} className="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover shrink-0 shadow-lg ring-2 ring-white" />
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div>
                  <h1 className="font-fraunces text-xl md:text-2xl font-semibold text-navy">{vendor.name}</h1>
                  <p className="text-gray-500 text-sm mt-0.5">{vendor.tagline}</p>
                </div>
                <div className="sm:ml-auto flex gap-2">
                  <a href={`tel:+1234567890`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-ocean/10 text-ocean text-xs font-medium hover:bg-ocean/20 transition-colors"
                  ><Phone className="w-3.5 h-3.5" /> Call</a>
                  <a href={`https://wa.me/1234567890`} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-medium hover:bg-emerald-100 transition-colors"
                  ><MessageCircle className="w-3.5 h-3.5" /> WhatsApp</a>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gray-400" /> {vendor.area}</span>
                <span className="px-2.5 py-0.5 rounded-md bg-ocean/5 text-ocean font-medium capitalize">{vendor.category}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gray-400" /> {vendor.deliveryTime || '30-45 min'}</span>
                <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-gold" fill="currentColor" /> {vendor.rating || '4.5'}</span>
                {vendor.verified && <span className="text-ocean font-medium">Verified</span>}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Story */}
        {vendor.story && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.5 }}
            className="mt-5 glass rounded-2xl p-5 md:p-7 shadow-lg shadow-navy/5"
          >
            <h2 className="font-fraunces text-lg font-semibold text-navy mb-2">About This Shop</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{vendor.story}</p>
          </motion.div>
        )}

        {/* Products + Sidebar */}
        <div className="mt-7 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-ocean to-sky shrink-0" />
              <h2 className="font-fraunces text-lg font-semibold text-navy">Products ({products.length})</h2>
            </motion.div>

            {products.length > 0 ? (
              <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {products.map((p: any, i: number) => (
                  <motion.div key={i} variants={fadeUp}>
                    <div
                      onClick={() => setExpandedProduct(expandedProduct === i ? null : i)}
                      className={`glass rounded-2xl overflow-hidden transition-all duration-400 cursor-pointer group ${
                        expandedProduct === i ? 'ring-1 ring-ocean/30 shadow-2xl shadow-ocean/5' : 'hover:shadow-2xl hover:shadow-navy/5 hover:-translate-y-0.5'
                      }`}
                    >
                      <div className="relative overflow-hidden aspect-[4/3] bg-ice">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm text-navy text-xs font-medium shadow-lg">
                            <MessageCircle className="w-3 h-3" /> Quick Enquire
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-fraunces text-sm font-semibold text-navy">{p.name}</h3>
                          <span className="text-sm font-bold text-ocean whitespace-nowrap shrink-0 bg-ocean/5 px-2.5 py-0.5 rounded-lg">{p.price}</span>
                        </div>
                        {p.description && (
                          <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">{p.description}</p>
                        )}
                      </div>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedProduct === i ? 'max-h-32' : 'max-h-0'}`}>
                        <div className="px-4 pb-4 pt-0">
                          <div className="pt-3 border-t border-gray-100 flex gap-2">
                            <a href={`https://wa.me/1234567890?text=Hi!%20I'd%20like%20to%20enquire%20about%20${encodeURIComponent(p.name)}`}
                              target="_blank" rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-semibold hover:bg-emerald-100 hover:shadow-md transition-all duration-300"
                            ><MessageCircle className="w-3.5 h-3.5" /> Enquire via WhatsApp</a>
                            <a href={`tel:+1234567890`}
                              className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-ocean/10 text-ocean text-xs font-semibold hover:bg-ocean/20 hover:shadow-md transition-all duration-300"
                            ><Phone className="w-3.5 h-3.5" /></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-14 glass rounded-2xl">
                <p className="font-fraunces text-xl text-navy/50">No products listed yet</p>
                <p className="text-gray-500 text-sm mt-1">Check back soon!</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="space-y-5"
          >
            {/* Contact Card */}
            <div className="glass rounded-2xl p-5 shadow-lg shadow-navy/5 sticky top-24">
              <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ocean/10 to-sky/10 flex items-center justify-center text-ocean">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <h3 className="font-fraunces text-base font-semibold text-navy">Contact Shop</h3>
              </div>
              <div className="space-y-2">
                <a href={`tel:+1234567890`}
                  className="group flex items-center gap-3.5 px-4 py-3.5 rounded-xl bg-ocean/[0.04] hover:bg-ocean/[0.08] transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ocean/10 to-sky/10 flex items-center justify-center text-ocean group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-navy">Call</p>
                    <p className="text-[11px] text-gray-400">+1 (555) 123-4567</p>
                  </div>
                  <span className="text-ocean/40 group-hover:text-ocean transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                  </span>
                </a>
                <a href={`https://wa.me/1234567890`} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3.5 px-4 py-3.5 rounded-xl bg-emerald-500/[0.04] hover:bg-emerald-500/[0.08] transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-navy">WhatsApp</p>
                    <p className="text-[11px] text-gray-400">Send a message</p>
                  </div>
                  <span className="text-emerald-400 group-hover:text-emerald-600 transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                  </span>
                </a>
                <a href={`mailto:hello@grabb.com`}
                  className="group flex items-center gap-3.5 px-4 py-3.5 rounded-xl bg-ocean/[0.04] hover:bg-ocean/[0.08] transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ocean/10 to-sky/10 flex items-center justify-center text-ocean group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-navy">Email</p>
                    <p className="text-[11px] text-gray-400">hello@grabb.com</p>
                  </div>
                  <span className="text-ocean/40 group-hover:text-ocean transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews — full width */}
        {reviews.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-gold to-amber-400 shrink-0" />
              <h2 className="font-fraunces text-lg font-semibold text-navy">
                Reviews
                <span className="text-sm font-normal text-gray-400 ml-2">({reviews.length})</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((r: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06 }}
                  className="glass rounded-2xl p-5 shadow-lg shadow-navy/5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-3 h-3 ${j < (r.rating || 5) ? 'text-gold' : 'text-gray-200'}`} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">"{r.text}"</p>
                  <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-gray-100">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold/20 to-amber-100 flex items-center justify-center text-[10px] font-bold text-gold shrink-0 shadow-sm">
                      {r.name.charAt(0)}
                    </div>
                    <p className="text-xs font-medium text-gray-500">{r.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
