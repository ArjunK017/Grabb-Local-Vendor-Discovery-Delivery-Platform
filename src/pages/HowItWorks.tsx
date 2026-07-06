import { motion } from 'framer-motion'
import { Search, ShoppingBag, Truck, Store, BadgeCheck, Package, Smartphone, MapPin } from 'lucide-react'
import SectionWrapper from '../components/SectionWrapper'

const buyerSteps = [
  { icon: Search, title: 'Browse Shops', desc: 'Explore real local vendors by category or area. See their products, read their story, and check reviews — all before you order.' },
  { icon: Store, title: 'Pick a Shop', desc: 'Choose the shop you want to order from. Every shop has its own storefront with real photos, products, and a personal message from the shopkeeper.' },
  { icon: ShoppingBag, title: 'Place Your Order', desc: 'Send an enquiry, message on WhatsApp, or call the shop directly. Tell them what you need and where to deliver.' },
  { icon: Truck, title: 'Grabb Delivers', desc: 'Our delivery partner picks up your order from the shop and brings it straight to your door. Track it every step of the way.' },
]

const vendorSteps = [
  { icon: Smartphone, title: 'Register on Grabb', desc: 'Fill out a simple form with your shop details. No tech skills needed — our team helps set up your storefront.' },
  { icon: Package, title: 'Receive Orders', desc: 'When a customer places an order, you get notified instantly. Pack it and hand it to our delivery partner.' },
  { icon: Truck, title: 'We Deliver', desc: 'Grabb\'s delivery network picks up from your counter and delivers to the customer. You don\'t need to worry about logistics.' },
  { icon: BadgeCheck, title: 'Get Paid', desc: 'Receive payments directly. Grabb\'s commission is deducted at source — simple, transparent, and hassle-free.' },
]

export default function HowItWorks() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-b from-ice to-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-fraunces text-4xl md:text-5xl font-semibold text-navy">How It Works</h1>
            <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
              Whether you're buying or selling, Grabb makes local commerce simple.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Buyer Journey (FR-21) ── */}
      <SectionWrapper id="buyer-journey" title="For Buyers" subtitle="See the real shop before it shows up at your door.">
        <div className="max-w-4xl mx-auto space-y-6">
          {buyerSteps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-5 bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-ice flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-ocean" />
                </div>
                <div>
                  <h3 className="font-fraunces font-semibold text-navy text-lg">{step.title}</h3>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </SectionWrapper>

      {/* ── Vendor Journey (FR-22) ── */}
      <SectionWrapper id="vendor-journey" title="For Vendors" subtitle="Your shop, online — we handle the delivery." className="bg-white">
        <div className="max-w-4xl mx-auto space-y-6">
          {vendorSteps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-5 bg-ice rounded-xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-ocean/10 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-ocean" />
                </div>
                <div>
                  <h3 className="font-fraunces font-semibold text-navy text-lg">{step.title}</h3>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </SectionWrapper>

      {/* ── Delivery Explainer (FR-23) ── */}
      <SectionWrapper id="delivery" title="How Delivery Works" subtitle="Speed as a service — not a warehouse in disguise.">
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-fraunces text-xl font-semibold text-navy mb-4">Delivery that puts shops first</h3>
              <ul className="space-y-3">
                {[
                  'Your order goes directly to the shop you chose — not a dark store or anonymous warehouse.',
                  'Grabb\'s delivery partners pick up from the shop\'s counter, just like you would.',
                  'Orders are delivered within your neighbourhood, keeping delivery times fast and reliable.',
                  'Shopkeepers know their customers by name. It\'s local commerce, made digital.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-ocean shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-ice rounded-xl p-6">
              <div className="text-center">
                <Truck className="w-16 h-16 text-ocean mx-auto mb-3" />
                <p className="text-sm text-gray-600 font-medium">
                  "We're not a quick-commerce warehouse. We're your neighbourhood shop, now with delivery."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Dark store model</span>
                  <span className="text-ocean font-medium">Grabb model</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Anonymous warehouse</span>
                  <span>Named local shop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
