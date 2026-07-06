import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, Sparkles } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState<{ name: string; email: string; subject: string; message: string }>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.subject.trim()) errs.subject = 'Subject is required'
    if (!form.message.trim()) errs.message = 'Message is required'
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

  return (
    <div className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <span className="inline-flex items-center gap-1.5 bg-ocean/10 text-ocean text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="w-4 h-4" /> Get in Touch
          </span>
          <h1 className="font-fraunces text-5xl md:text-6xl font-semibold text-navy leading-tight">Contact Us</h1>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">We'd love to hear from you.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mt-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="space-y-5"
          >
            {[
              { icon: Mail, title: 'Email', details: ['hello@grabb.com', 'support@grabb.com'] },
              { icon: Phone, title: 'Phone', details: ['+91 1800-123-GRAB', 'Mon–Sat, 9 AM – 8 PM'] },
              { icon: MapPin, title: 'Address', details: ['Grabb Technologies', 'Indiranagar, Bangalore', 'Karnataka, India'] },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-ice to-ice-dark flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-ocean" />
                    </div>
                    <div>
                      <h3 className="font-fraunces font-semibold text-navy">{item.title}</h3>
                      {item.details.map((d, j) => (
                        <p key={j} className={`${j === 0 ? 'text-sm text-gray-600 mt-0.5' : 'text-xs text-gray-400'}`}>{d}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-2xl p-8 md:p-9 shadow-sm"
          >
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="font-fraunces text-xl font-semibold text-navy">Message Sent!</h2>
                <p className="text-gray-600 text-sm mt-2">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full px-3.5 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-shadow ${errors.name ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full px-3.5 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-shadow ${errors.email ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Subject *</label>
                  <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={`w-full px-3.5 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-shadow ${errors.subject ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Message *</label>
                  <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`w-full px-3.5 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean transition-shadow ${errors.message ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <button type="submit"
                  className="w-full bg-gradient-to-r from-ocean to-ocean-dark text-white py-3.5 rounded-xl font-medium shadow-lg shadow-ocean/20 hover:shadow-xl hover:shadow-ocean/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
