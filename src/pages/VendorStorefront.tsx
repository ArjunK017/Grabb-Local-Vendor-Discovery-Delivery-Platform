import { useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowLeft, Clock, Star, MapPin, Phone, MessageCircle, Mail, BadgeCheck, Heart, Share2, ExternalLink } from 'lucide-react'
import vendors from '../data/vendors.json'

const vendorList = vendors as any[]

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function VendorStorefront() {
  const { id: vendorId } = useParams()
  const vendor = vendorList.find((v: any) => v.id === vendorId)
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null)
  const [liked, setLiked] = useState(false)

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-ice to-ice-dark flex items-center justify-center mx-auto mb-5 shadow-lg"
          >
            <MapPin className="w-8 h-8 text-gray-400" />
          </motion.div>
          <p className="font-fraunces text-3xl text-navy mb-2">Shop not found</p>
          <p className="text-gray-400 text-sm mb-5">The shop you're looking for doesn't exist or has been removed.</p>
          <Link to="/explore" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-ocean to-ocean-dark text-white text-sm font-semibold shadow-lg shadow-ocean/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Explore
          </Link>
        </motion.div>
      </div>
    )
  }

  const products = vendor.products || []
  const reviews = vendor.reviews || []

  return (
    <div className="min-h-screen">
      {/* Banner with parallax zoom */}
      <div className="relative h-[240px] md:h-[340px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          src={vendor.image}
          alt={vendor.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/30 to-navy/70" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ice to-transparent" />
        {/* Floating decorative dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-white/15" />
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, delay: -1 }} className="absolute top-[30%] right-[15%] w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <div className="absolute top-6 inset-x-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Link to="/explore" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-xs font-medium bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10 hover:bg-white/20">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Explore
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-16">
        {/* Shop Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-[1.5rem] p-6 md:p-8 shadow-premium-xl border border-gray-100/50"
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            <motion.img
              whileHover={{ scale: 1.08, rotate: -3 }}
              src={vendor.logo}
              alt={vendor.name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover shrink-0 shadow-lg ring-4 ring-white"
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h1 className="font-fraunces text-2xl md:text-3xl font-bold text-navy">{vendor.name}</h1>
                    {vendor.verified && (
                      <BadgeCheck className="w-5 h-5 text-ocean shrink-0" />
                    )}
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{vendor.tagline}</p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setLiked(!liked)}
                    className={`p-2.5 rounded-xl border transition-all duration-300 ${liked ? 'bg-red-50 border-red-200 text-red-500 shadow-lg shadow-red-200/20' : 'bg-white border-gray-200 text-gray-400 hover:text-red-400 hover:border-red-200'}`}
                  >
                    <Heart className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="p-2.5 rounded-xl border border-gray-200 text-gray-400 hover:text-ocean hover:border-ocean/30 transition-all duration-300"
                  >
                    <Share2 className="w-4 h-4" />
                  </motion.button>
                  <a href={`tel:+1234567890`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-ocean/10 text-ocean text-xs font-semibold hover:bg-ocean/20 transition-colors"
                  ><Phone className="w-3.5 h-3.5" /> Call</a>
                  <a href={`https://wa.me/1234567890`} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                  ><MessageCircle className="w-3.5 h-3.5" /> WhatsApp</a>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4">
                <span className="flex items-center gap-1.5 text-xs text-gray-500"><MapPin className="w-3.5 h-3.5 text-gray-400" /> {vendor.area}</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-ocean/5 text-ocean text-xs font-semibold capitalize">{vendor.category}</span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500"><Clock className="w-3.5 h-3.5 text-gray-400" /> {vendor.deliveryTime || '30-45 min'}</span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Star className="w-3.5 h-3.5 text-gold" fill="currentColor" /> {vendor.rating || '4.5'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Story */}
        {vendor.story && (
          <AnimatedSection className="mt-6">
            <div className="bg-white rounded-[1.5rem] p-6 md:p-8 shadow-premium border border-gray-100/50">
              <h2 className="font-fraunces text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="w-8 h-8 rounded-lg bg-gradient-to-br from-ocean/10 to-sky/10 flex items-center justify-center"
                >
                  <ExternalLink className="w-4 h-4 text-ocean" />
                </motion.div>
                About This Shop
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">{vendor.story}</p>
            </div>
          </AnimatedSection>
        )}

        {/* Products + Sidebar */}
        <div className="mt-7 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products */}
          <div className="lg:col-span-2">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-5 rounded-full bg-gradient-to-b from-ocean to-sky shrink-0" />
                <h2 className="font-fraunces text-lg font-bold text-navy">Products ({products.length})</h2>
              </div>
            </AnimatedSection>

            {products.length > 0 ? (
              <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {products.map((p: any, i: number) => (
                  <motion.div key={i} variants={fadeUp}>
                    <div
                      onClick={() => setExpandedProduct(expandedProduct === i ? null : i)}
                      className={`bg-white rounded-[1.3rem] overflow-hidden transition-all duration-400 cursor-pointer border ${
                        expandedProduct === i ? 'ring-2 ring-ocean/20 shadow-premium-xl border-ocean/20' : 'border-gray-100/80 hover:shadow-premium-lg hover:-translate-y-1'
                      }`}
                    >
                      <div className="relative overflow-hidden aspect-[4/3] bg-ice">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-3 left-3 opacity-0 hover:opacity-100 transition-all duration-300 translate-y-3 hover:translate-y-0">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm text-navy text-xs font-semibold shadow-lg">
                            <MessageCircle className="w-3 h-3" /> Quick Enquire
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-fraunces text-sm font-bold text-navy">{p.name}</h3>
                          <span className="text-sm font-bold text-ocean whitespace-nowrap shrink-0 bg-ocean/5 px-2.5 py-0.5 rounded-lg">{p.price}</span>
                        </div>
                        {p.description && (
                          <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">{p.description}</p>
                        )}
                      </div>
                      <AnimatePresence>
                        {expandedProduct === i && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pt-0">
                              <div className="pt-3 border-t border-gray-100 flex gap-2">
                                <a href={`https://wa.me/1234567890?text=Hi!%20I'd%20like%20to%20enquire%20about%20${encodeURIComponent(p.name)}`}
                                  target="_blank" rel="noopener noreferrer"
                                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                                ><MessageCircle className="w-3.5 h-3.5" /> Enquire via WhatsApp</a>
                                <a href={`tel:+1234567890`}
                                  className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-ocean/10 text-ocean text-xs font-semibold hover:bg-ocean/20 transition-colors"
                                ><Phone className="w-3.5 h-3.5" /></a>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16 bg-white rounded-[1.5rem] border border-gray-100/80">
                <p className="font-fraunces text-xl text-navy/50">No products listed yet</p>
                <p className="text-gray-400 text-sm mt-1">Check back soon!</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <AnimatedSection delay={0.1} className="space-y-5">
            {/* Contact Card */}
            <div className="bg-white rounded-[1.5rem] p-6 shadow-premium border border-gray-100/50 sticky top-24">
              <h3 className="font-fraunces text-base font-bold text-navy mb-4">Contact Shop</h3>
              <div className="space-y-2.5">
                {[
                  { icon: Phone, label: 'Call', sub: '+1 (555) 123-4567', href: 'tel:+1234567890', color: 'ocean' },
                  { icon: MessageCircle, label: 'WhatsApp', sub: 'Send a message', href: 'https://wa.me/1234567890', color: 'emerald' },
                  { icon: Mail, label: 'Email', sub: 'hello@grabb.com', href: 'mailto:hello@grabb.com', color: 'ocean' },
                ].map((item) => (
                  <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="group flex items-center gap-3.5 px-4 py-3.5 rounded-xl bg-ice/50 hover:bg-ocean/[0.06] transition-all duration-300"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-${item.color}/10 to-${item.color}/5 flex items-center justify-center text-${item.color} group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-navy">{item.label}</p>
                      <p className="text-[11px] text-gray-400">{item.sub}</p>
                    </div>
                    <ArrowLeft className="w-3.5 h-3.5 text-gray-300 group-hover:text-ocean rotate-180 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Reviews — full width */}
        {reviews.length > 0 && (
          <AnimatedSection delay={0.15} className="mt-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-gold to-amber-400 shrink-0" />
              <h2 className="font-fraunces text-lg font-bold text-navy">Reviews ({reviews.length})</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((r: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-[1.3rem] p-5 shadow-premium border border-gray-100/50 hover:shadow-premium-lg hover:-translate-y-1 transition-all duration-400"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.08 + j * 0.04 }}
                      >
                        <Star className={`w-3.5 h-3.5 ${j < (r.rating || 5) ? 'text-gold' : 'text-gray-200'}`} fill="currentColor" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">"{r.text}"</p>
                  <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-amber-100 flex items-center justify-center text-[10px] font-bold text-gold shrink-0 shadow-sm">
                      {r.name.charAt(0)}
                    </div>
                    <p className="text-xs font-medium text-gray-500">{r.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  )
}
