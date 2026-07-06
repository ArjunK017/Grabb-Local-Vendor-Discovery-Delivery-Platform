import { useState } from 'react'
import { motion } from 'framer-motion'
import { Store, Users, Truck, TrendingUp, CheckCircle, ChevronRight, Sparkles } from 'lucide-react'
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
      setSubmitted(true)
    }
  }

  const categories = ['Grocery', 'Bakery', 'Pharmacy', 'Boutique', 'Stationery', 'Florist', 'Meat & Fish', 'Café', 'Other']

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-ice to-white py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-sky/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 bg-ocean/10 text-ocean text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-4 h-4" /> For Shopkeepers
            </span>
            <h1 className="font-fraunces text-5xl md:text-6xl font-semibold text-navy leading-tight">
              Your shop, online — <span className="text-ocean">we handle the delivery.</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join Grabb and get your own storefront page. Reach more customers in your neighbourhood without worrying about delivery logistics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ice to-ice-dark flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-ocean" />
                  </div>
                  <h3 className="font-fraunces font-semibold text-navy text-lg">{b.title}</h3>
                  <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{b.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <SectionWrapper id="register" title="Register Your Shop" subtitle="Fill in the details and we'll get back to you within 48 hours." className="bg-white">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="font-fraunces text-2xl font-semibold text-navy">Application Submitted!</h2>
              <p className="text-gray-600 mt-2">Thank you! Our team will review your details and reach out within 48 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Shop Name *</label>
                  <input type="text" value={form.shopName} onChange={(e) => setForm({ ...form, shopName: e.target.value })}
                    className={`w-full px-3.5 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-shadow ${errors.shopName ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.shopName && <p className="text-red-500 text-xs mt-1">{errors.shopName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Owner Name *</label>
                  <input type="text" value={form.ownerName} onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                    className={`w-full px-3.5 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-shadow ${errors.ownerName ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.ownerName && <p className="text-red-500 text-xs mt-1">{errors.ownerName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Category *</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className={`w-full px-3.5 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-shadow ${errors.category ? 'border-red-400' : 'border-gray-200'}`}>
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Area / Neighbourhood *</label>
                  <input type="text" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}
                    className={`w-full px-3.5 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-shadow ${errors.area ? 'border-red-400' : 'border-gray-200'}`} placeholder="e.g. Indiranagar" />
                  {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Phone Number *</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={`w-full px-3.5 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-shadow ${errors.phone ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full px-3.5 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-shadow ${errors.email ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Shop Photo (optional)</label>
                <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, photo: e.target.files?.[0]?.name || '' })}
                  className="w-full px-3.5 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-ocean file:to-ocean-dark file:text-white file:text-sm file:font-medium hover:file:shadow-md file:transition-all" />
                <p className="text-xs text-gray-400 mt-1.5">Upload a photo of your shop front or products.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Tell us about your shop (optional)</label>
                <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3.5 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-shadow" />
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-ocean to-ocean-dark text-white py-3.5 rounded-xl font-medium shadow-lg shadow-ocean/20 hover:shadow-xl hover:shadow-ocean/30 hover:-translate-y-0.5 transition-all">
                Submit Registration
              </button>
            </form>
          )}
        </div>
      </SectionWrapper>

      <SectionWrapper id="process" title="What Happens After You Submit" subtitle="Simple. Quick. No tech skills needed.">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-5">
            {steps.map((s) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: s.step * 0.1, duration: 0.5 }}
                className="flex items-start gap-5 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-ocean to-ocean-dark text-white flex items-center justify-center font-fraunces font-bold shrink-0 shadow-md shadow-ocean/20">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-fraunces font-semibold text-navy text-lg">{s.title}</h3>
                  <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="faq" title="Vendor FAQ" subtitle="Common questions shopkeepers ask us." className="bg-white">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="bg-ice rounded-2xl p-5 group hover:shadow-sm transition-shadow">
              <summary className="font-fraunces font-medium text-navy cursor-pointer list-none flex items-center justify-between">
                {faq.q}
                <ChevronRight className="w-4 h-4 text-ocean transition-transform duration-300 group-open:rotate-90 shrink-0 ml-2" />
              </summary>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </SectionWrapper>
    </div>
  )
}
