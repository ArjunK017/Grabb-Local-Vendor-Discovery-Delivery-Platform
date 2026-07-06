import { ChevronRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const buyerFaqs = [
  { q: 'How do I place an order?', a: 'Browse shops on the Explore page, visit a storefront, and use the "Send Enquiry" form, WhatsApp, or phone option to tell the shop what you need. The shop will confirm and Grabb will handle delivery.' },
  { q: 'Is there a minimum order?', a: 'Minimum order requirements are set by each shop individually. The shop will let you know when you place your enquiry.' },
  { q: 'How fast is delivery?', a: 'Delivery times vary by neighbourhood and shop readiness, but most orders within our service areas are delivered within 30–60 minutes.' },
  { q: 'Can I track my order?', a: 'Real-time tracking is coming in a future update. For now, the shop or our delivery partner will keep you updated on the status.' },
  { q: 'What if something is wrong with my order?', a: 'Contact us at support@grabb.com or call +91 1800-123-GRAB. We\'ll make it right.' },
  { q: 'How do I pay?', a: 'Payment options are being introduced soon. Currently, orders are confirmed with the shop directly, and payment is handled on delivery.' },
]

const vendorFaqs = [
  { q: 'Is there any cost to register?', a: 'Registration is completely free. Grabb takes a small commission on each order delivered.' },
  { q: 'What commission does Grabb charge?', a: 'Our standard commission is 15% per order. Volume discounts are available.' },
  { q: 'Which areas do you cover?', a: 'We are currently active in Indiranagar, Koramangala, JP Nagar, HSR Layout, Whitefield, BTM Layout, and MG Road. We are expanding every month.' },
  { q: 'How soon can I go live?', a: 'Most shops are live within 3–5 business days after submitting their details.' },
  { q: 'Do I need technical skills?', a: 'Not at all. Our team sets everything up. You can manage orders through WhatsApp.' },
  { q: 'What if a customer has an issue?', a: 'Our customer support team handles all enquiries. You just need to fulfil the order correctly.' },
]

function FAQSection({ title, faqs }: { title: string; faqs: { q: string; a: string }[] }) {
  return (
    <div className="mb-14">
      <h2 className="font-fraunces text-2xl font-semibold text-navy mb-6">{title}</h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <details key={faq.q} className="bg-white rounded-2xl p-5 group shadow-sm hover:shadow-md transition-shadow">
            <summary className="font-medium text-navy cursor-pointer list-none flex items-center justify-between">
              {faq.q}
              <ChevronRight className="w-4 h-4 text-ocean transition-transform duration-300 group-open:rotate-90 shrink-0 ml-2" />
            </summary>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}

export default function FAQ() {
  return (
    <div className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <span className="inline-flex items-center gap-1.5 bg-ocean/10 text-ocean text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="w-4 h-4" /> FAQ
          </span>
          <h1 className="font-fraunces text-5xl md:text-6xl font-semibold text-navy leading-tight">Frequently Asked Questions</h1>
          <p className="text-gray-600 mt-4 text-lg">Everything you need to know about Grabb.</p>
        </motion.div>

        <div className="mt-14">
          <FAQSection title="For Buyers" faqs={buyerFaqs} />
          <FAQSection title="For Vendors" faqs={vendorFaqs} />
        </div>
      </div>
    </div>
  )
}
