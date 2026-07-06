import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

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
    <div className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-fraunces text-4xl md:text-5xl font-semibold text-navy text-center">Contact Us</h1>
          <p className="text-center text-gray-600 mt-3">We'd love to hear from you.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-ocean mt-1" />
                <div>
                  <h3 className="font-fraunces font-semibold text-navy">Email</h3>
                  <p className="text-sm text-gray-600">hello@grabb.com</p>
                  <p className="text-sm text-gray-600">support@grabb.com</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-ocean mt-1" />
                <div>
                  <h3 className="font-fraunces font-semibold text-navy">Phone</h3>
                  <p className="text-sm text-gray-600">+91 1800-123-GRAB</p>
                  <p className="text-xs text-gray-400 mt-1">Mon–Sat, 9 AM – 8 PM</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-ocean mt-1" />
                <div>
                  <h3 className="font-fraunces font-semibold text-navy">Address</h3>
                  <p className="text-sm text-gray-600">Grabb Technologies<br />Indiranagar, Bangalore<br />Karnataka, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form (FR-25) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-8 shadow-sm"
          >
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="font-fraunces text-xl font-semibold text-navy">Message Sent!</h2>
                <p className="text-gray-600 text-sm mt-2">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 ${errors.name ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 ${errors.email ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Subject *</label>
                  <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 ${errors.subject ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Message *</label>
                  <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30 ${errors.message ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <button type="submit"
                  className="w-full bg-ocean text-white py-3 rounded-lg font-medium hover:bg-sky transition-colors flex items-center justify-center gap-2">
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
