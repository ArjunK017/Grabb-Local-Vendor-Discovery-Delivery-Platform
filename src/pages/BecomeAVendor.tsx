import { useState } from 'react'
import { motion } from 'framer-motion'
import { Store, Users, Truck, TrendingUp, CheckCircle, ChevronRight } from 'lucide-react'
import SectionWrapper from '../components/SectionWrapper'

const benefits = [
  { icon: TrendingUp, title: 'More Visibility', desc: 'Get discovered by customers who want to shop local. No marketing spend needed.' },
  { icon: Users, title: 'New Customers', desc: 'Reach a digital audience while keeping your walk-in trade. Grabb brings buyers to your door.' },
  { icon: Truck, title: 'Zero Delivery Hassle', desc: 'Grabb handles the delivery. You just pack the order; we take it from your counter to the customer.' },
  { icon: Store, title: 'Your Storefront Online', desc: 'A beautiful, customisable page that tells your shop\'s story. No tech skills required.' },
]

const steps = [
  { step: 1, title: 'Submit Your Details', desc: 'Fill out the form below. Tell us about your shop — name, category, area, and a bit about yourself.' },
  { step: 2, title: 'We Review & Verify', desc: 'Our team reviews your application, may give you a quick call, and verifies your shop details.' },
  { step: 3, title: 'We Set Up Your Storefront', desc: 'We create your personalised storefront page with your photos, products, and story — you approve it.' },
  { step: 4, title: 'You Go Live!', desc: 'Start receiving orders. Grabb handles delivery. You focus on what you do best — running your shop.' },
]

const faqs = [
  { q: 'Is there any cost to register?', a: 'Registration is completely free. Grabb takes a small commission on each order delivered, so you only pay when you earn.' },
  { q: 'What commission does Grabb charge?', a: 'Our standard commission is 15% per order, which covers delivery logistics, platform fees, and customer support. Volume discounts are available for high-order shops.' },
  { q: 'Which areas do you deliver to?', a: 'We are currently active in Indiranagar, Koramangala, JP Nagar, HSR Layout, Whitefield, BTM Layout, and MG Road. We are expanding to new areas every month.' },
  { q: 'How soon can I go live?', a: 'Most shops are live within 3–5 business days after submitting their details and photos.' },
  { q: 'Do I need a computer or technical skills?', a: 'Not at all. Our team sets everything up for you. You can manage orders through a simple WhatsApp-based system.' },
  { q: 'What if a customer has an issue?', a: 'Our customer support team handles all enquiries and complaints. You just need to fulfil the order correctly and on time.' },
]

export default function BecomeAVendor() {
  const [form, setForm] = useState<{ shopName: string; ownerName: string; category: string; area: string; phone: string; email: string; message: string; photo: string }>({
    shopName: '', ownerName: '', category: '', area: '',
    phone: '', email: '', message: '', photo: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.shopName.trim()) errs.shopName = 'Shop name is required'
    if (!form.ownerName.trim()) errs.ownerName = 'Owner name is required'
    if (!form.category) errs.category = 'Please select a category'
    if (!form.area.trim()) errs.area = 'Area is required'
    if (!form.phone.trim()) errs.phone = 'Phone is required'
    else if (!/^[+]?[\d\s-]{7,15}$/.test(form.phone)) errs.phone = 'Enter a valid phone number'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    return errs
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      // Formspree / EmailJS endpoint goes here
      setSubmitted(true)
    }
  }

  const categories = ['Grocery', 'Bakery', 'Pharmacy', 'Boutique', 'Stationery', 'Florist', 'Meat & Fish', 'Café', 'Other']

  return (
    <div>
      {/* ── Hero / Value Proposition (FR-17) ── */}
      <section className="bg-gradient-to-b from-ice to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-ocean/10 text-ocean text-sm font-medium px-3 py-1 rounded-full mb-4">
              For Shopkeepers
            </span>
            <h1 className="font-fraunces text-4xl md:text-5xl font-semibold text-navy">
              Your shop, online — <span className="text-ocean">we handle the delivery.</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Join Grabb and get your own storefront page. Reach more customers in your neighbourhood without worrying about delivery logistics.
            </p>
          </motion.div>

          {/* Benefits grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-ice flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-ocean" />
                  </div>
                  <h3 className="font-fraunces font-semibold text-navy">{b.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{b.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Registration Form (FR-18) ── */}
      <SectionWrapper id="register" title="Register Your Shop" subtitle="Fill in the details and we'll get back to you within 48 hours." className="bg-white">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="font-fraunces text-2xl font-semibold text-navy">Application Submitted!</h2>
              <p className="text-gray-600 mt-2">Thank you! Our team will review your details and reach out within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Shop Name *</label>
                  <input type="text" value={form.shopName} onChange={(e) => setForm({ ...form, shopName: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 ${errors.shopName ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.shopName && <p className="text-red-500 text-xs mt-1">{errors.shopName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Owner Name *</label>
                  <input type="text" value={form.ownerName} onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 ${errors.ownerName ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.ownerName && <p className="text-red-500 text-xs mt-1">{errors.ownerName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Category *</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 ${errors.category ? 'border-red-400' : 'border-gray-200'}`}>
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Area / Neighbourhood *</label>
                  <input type="text" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 ${errors.area ? 'border-red-400' : 'border-gray-200'}`} placeholder="e.g. Indiranagar" />
                  {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Phone Number *</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 ${errors.phone ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 ${errors.email ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1">Shop Photo (optional)</label>
                <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, photo: e.target.files?.[0]?.name || '' })}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-ocean file:text-white file:text-sm file:font-medium hover:file:bg-sky" />
                <p className="text-xs text-gray-400 mt-1">Upload a photo of your shop front or products.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1">Tell us about your shop (optional)</label>
                <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30" />
              </div>

              <button type="submit" className="w-full bg-ocean text-white py-3 rounded-lg font-medium hover:bg-sky transition-colors">
                Submit Registration
              </button>
            </form>
          )}
        </div>
      </SectionWrapper>

      {/* ── Process Explainer (FR-19) ── */}
      <SectionWrapper id="process" title="What Happens After You Submit" subtitle="Simple. Quick. No tech skills needed.">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {steps.map((s) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: s.step * 0.1 }}
                className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-ocean text-white flex items-center justify-center font-fraunces font-bold shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-fraunces font-semibold text-navy">{s.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── FAQ (FR-20) ── */}
      <SectionWrapper id="faq" title="Vendor FAQ" subtitle="Common questions shopkeepers ask us." className="bg-white">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="bg-ice rounded-xl p-4 group">
              <summary className="font-fraunces font-medium text-navy cursor-pointer list-none flex items-center justify-between">
                {faq.q}
                <ChevronRight className="w-4 h-4 text-ocean transition-transform group-open:rotate-90" />
              </summary>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </SectionWrapper>
    </div>
  )
}
