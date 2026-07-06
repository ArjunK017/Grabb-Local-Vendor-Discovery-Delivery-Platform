import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, BadgeCheck, MapPin, Star, ShoppingBag, Phone, MessageCircle,
  Store, CheckCircle
} from 'lucide-react'
import vendors from '../data/vendors.json'
import categories from '../data/categories.json'

function OrderForm({ vendor, onClose }: { vendor: { id: string; name: string }; onClose: () => void }) {
  const [form, setForm] = useState<{ name: string; phone: string; message: string }>({ name: '', phone: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.phone.trim()) errs.phone = 'Phone is required'
    else if (!/^[+]?[\d\s-]{7,15}$/.test(form.phone)) errs.phone = 'Enter a valid phone number'
    if (!form.message.trim()) errs.message = 'Please tell us what you\'d like to order'
    return errs
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
        <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <h3 className="font-fraunces text-lg font-semibold text-navy">Enquiry Sent!</h3>
        <p className="text-sm text-gray-600 mt-2">{vendor.name} will get back to you shortly.</p>
        <button onClick={onClose} className="mt-4 text-ocean text-sm font-medium hover:underline">Close</button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label className="block text-sm font-medium text-navy mb-1.5">Your Name *</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-shadow ${
            errors.name ? 'border-red-400' : 'border-gray-200'
          }`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-navy mb-1.5">Phone Number *</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-shadow ${
            errors.phone ? 'border-red-400' : 'border-gray-200'
          }`}
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-navy mb-1.5">What would you like to order? *</label>
        <textarea
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-shadow ${
            errors.message ? 'border-red-400' : 'border-gray-200'
          }`}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-ocean to-ocean-dark text-white py-3 rounded-xl font-medium text-sm shadow-md shadow-ocean/20 hover:shadow-lg hover:shadow-ocean/30 hover:-translate-y-0.5 transition-all"
      >
        Send Enquiry
      </button>
    </form>
  )
}

export default function VendorStorefront() {
  const { id } = useParams()
  const vendor = vendors.find((v) => v.id === id)
  const [showOrderForm, setShowOrderForm] = useState(false)

  if (!vendor) {
    return (
      <div className="text-center py-24">
        <div className="w-16 h-16 rounded-2xl bg-ice flex items-center justify-center mx-auto mb-4">
          <Store className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="font-fraunces text-2xl text-navy">Shop not found</h2>
        <p className="text-gray-500 mt-2">This vendor doesn't exist or may have been removed.</p>
        <Link to="/explore" className="inline-flex items-center gap-1 text-ocean mt-4 font-medium hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Explore
        </Link>
      </div>
    )
  }

  const category = categories.find((c) => c.id === vendor.category)

  return (
    <div className="pb-20">
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img src={vendor.image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/explore" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-ocean mt-6 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Explore
        </Link>

        <div className="grid lg:grid-cols-3 gap-10 mt-6">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-5"
            >
              <img
                src={vendor.logo}
                alt={`${vendor.name} logo`}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-white -mt-12 relative z-10 shadow-lg"
              />
              <div className="pt-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-fraunces text-2xl md:text-3xl font-semibold text-navy">{vendor.name}</h1>
                  {vendor.verified && <BadgeCheck className="w-6 h-6 text-sky" />}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-2">
                  <span className="capitalize flex items-center gap-1.5 bg-ice px-3 py-1 rounded-full">
                    <Store className="w-3.5 h-3.5 text-ocean" /> {category?.name || vendor.category}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-ocean" /> {vendor.area}
                  </span>
                  {vendor.reviews && vendor.reviews.length > 0 && (
                    <span className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                      <span className="font-medium text-navy">{vendor.reviews[0].rating}.0</span>
                      <span className="text-gray-400">({vendor.reviews.length})</span>
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-8 bg-white rounded-2xl p-6 md:p-8 shadow-sm"
            >
              <h2 className="font-fraunces text-xl font-semibold text-navy mb-4">About the Shop</h2>
              <p className="text-gray-600 leading-relaxed">{vendor.story}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <h2 className="font-fraunces text-xl font-semibold text-navy mb-5">Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {vendor.products.map((product, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-28 object-cover rounded-lg"
                      loading="lazy"
                    />
                    <p className="text-sm font-medium text-navy mt-3">{product.name}</p>
                    <p className="text-xs text-ocean font-semibold mt-0.5">{product.price}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {vendor.reviews && vendor.reviews.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-10"
              >
                <h2 className="font-fraunces text-xl font-semibold text-navy mb-5">
                  Reviews <span className="text-gray-400 font-normal">({vendor.reviews.length})</span>
                </h2>
                <div className="space-y-4">
                  {vendor.reviews.map((review, i) => (
                    <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-navy">{review.name}</span>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, s) => (
                            <Star
                              key={s}
                              className={`w-4 h-4 ${
                                s < review.rating
                                  ? 'text-gold fill-gold'
                                  : 'text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 md:p-7 shadow-sm sticky top-24 border border-ice">
              <h3 className="font-fraunces text-xl font-semibold text-navy mb-5">Order from this shop</h3>

              {showOrderForm ? (
                <OrderForm vendor={vendor} onClose={() => setShowOrderForm(false)} />
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => setShowOrderForm(true)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-ocean to-ocean-dark text-white py-3 rounded-xl font-medium text-sm shadow-md shadow-ocean/20 hover:shadow-lg hover:shadow-ocean/30 hover:-translate-y-0.5 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" /> Send Enquiry
                  </button>
                  <a
                    href={`https://wa.me/911234567890?text=Hi!%20I'd%20like%20to%20order%20from%20${encodeURIComponent(vendor.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 border-2 border-green-500 text-green-600 py-3 rounded-xl font-medium text-sm hover:bg-green-50 hover:-translate-y-0.5 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" /> Order via WhatsApp
                  </a>
                  <a
                    href="tel:+911234567890"
                    className="w-full flex items-center justify-center gap-2 border-2 border-ocean text-ocean py-3 rounded-xl font-medium text-sm hover:bg-ice hover:-translate-y-0.5 transition-all"
                  >
                    <Phone className="w-4 h-4" /> Call the Shop
                  </a>
                  <p className="text-xs text-gray-400 text-center mt-3 leading-relaxed">
                    Checkout &amp; payments coming soon. For now, the shop will contact you to confirm.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
