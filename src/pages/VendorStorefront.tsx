import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, BadgeCheck, MapPin, Star, ShoppingBag, Phone, MessageCircle,
  Store
} from 'lucide-react'
import vendors from '../data/vendors.json'
import categories from '../data/categories.json'

/* ── Order Enquiry Form (FR-15) ── */
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
      // Formspree / EmailJS can be wired here; for now simulate success
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <ShoppingBag className="w-12 h-12 text-ocean mx-auto mb-3" />
        <h3 className="font-fraunces text-lg font-semibold text-navy">Enquiry Sent!</h3>
        <p className="text-sm text-gray-600 mt-1">{vendor.name} will get back to you shortly.</p>
        <button onClick={onClose} className="mt-4 text-ocean text-sm font-medium hover:underline">Close</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label className="block text-sm font-medium text-navy mb-1">Your Name *</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 ${
            errors.name ? 'border-red-400' : 'border-gray-200'
          }`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-navy mb-1">Phone Number *</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 ${
            errors.phone ? 'border-red-400' : 'border-gray-200'
          }`}
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-navy mb-1">What would you like to order? *</label>
        <textarea
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 ${
            errors.message ? 'border-red-400' : 'border-gray-200'
          }`}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-ocean text-white py-2.5 rounded-lg font-medium text-sm hover:bg-sky transition-colors"
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
      <div className="text-center py-20">
        <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="font-fraunces text-2xl text-navy">Shop not found</h2>
        <p className="text-gray-500 mt-2">This vendor doesn't exist or may have been removed.</p>
        <Link to="/explore" className="inline-flex items-center gap-1 text-ocean mt-4 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Explore
        </Link>
      </div>
    )
  }

  const category = categories.find((c) => c.id === vendor.category)

  return (
    <div className="pb-16">
      {/* ── Banner (FR-12) ── */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src={vendor.image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link to="/explore" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-ocean mt-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Explore
        </Link>

        <div className="grid lg:grid-cols-3 gap-8 mt-6">
          {/* ── Main Content ── */}
          <div className="lg:col-span-2">
            {/* Profile header (FR-12) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-4"
            >
              <img
                src={vendor.logo}
                alt={`${vendor.name} logo`}
                className="w-20 h-20 rounded-xl object-cover border-4 border-white -mt-4 relative z-10 shadow-md"
              />
              <div className="pt-2">
                <div className="flex items-center gap-2">
                  <h1 className="font-fraunces text-2xl md:text-3xl font-semibold text-navy">{vendor.name}</h1>
                  {vendor.verified && <BadgeCheck className="w-5 h-5 text-sky" />}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                  <span className="capitalize flex items-center gap-1">
                    <Store className="w-3.5 h-3.5" /> {category?.name || vendor.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {vendor.area}
                  </span>
                  {vendor.reviews && vendor.reviews.length > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      {vendor.reviews[0].rating}.0 ({vendor.reviews.length})
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Shop story (FR-13) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-8 bg-white rounded-xl p-6 shadow-sm"
            >
              <h2 className="font-fraunces text-lg font-semibold text-navy mb-3">About the Shop</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{vendor.story}</p>
            </motion.div>

            {/* Product showcase (FR-14) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6"
            >
              <h2 className="font-fraunces text-lg font-semibold text-navy mb-4">Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {vendor.products.map((product, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 shadow-sm text-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-24 object-cover rounded-lg"
                      loading="lazy"
                    />
                    <p className="text-sm font-medium text-navy mt-2">{product.name}</p>
                    <p className="text-xs text-ocean font-medium">{product.price}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews (FR-16) */}
            {vendor.reviews && vendor.reviews.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <h2 className="font-fraunces text-lg font-semibold text-navy mb-4">
                  Reviews ({vendor.reviews.length})
                </h2>
                <div className="space-y-4">
                  {vendor.reviews.map((review, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-navy">{review.name}</span>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s < review.rating
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* ── Sidebar — Order Actions (FR-15) ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="font-fraunces text-lg font-semibold text-navy mb-4">Order from this shop</h3>

              {showOrderForm ? (
                <OrderForm vendor={vendor} onClose={() => setShowOrderForm(false)} />
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => setShowOrderForm(true)}
                    className="w-full flex items-center justify-center gap-2 bg-ocean text-white py-2.5 rounded-lg font-medium text-sm hover:bg-sky transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" /> Send Enquiry
                  </button>
                  <a
                    href={`https://wa.me/911234567890?text=Hi!%20I'd%20like%20to%20order%20from%20${encodeURIComponent(vendor.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 border-2 border-green-500 text-green-600 py-2.5 rounded-lg font-medium text-sm hover:bg-green-50 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Order via WhatsApp
                  </a>
                  <a
                    href="tel:+911234567890"
                    className="w-full flex items-center justify-center gap-2 border-2 border-ocean text-ocean py-2.5 rounded-lg font-medium text-sm hover:bg-ice transition-colors"
                  >
                    <Phone className="w-4 h-4" /> Call the Shop
                  </a>
                  <p className="text-xs text-gray-400 text-center mt-2">
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
