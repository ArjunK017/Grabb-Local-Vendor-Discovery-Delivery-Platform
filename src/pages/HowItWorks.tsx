import { motion } from 'framer-motion'
import { Search, ShoppingBag, Truck, Store, BadgeCheck, Package, Smartphone, MapPin, Sparkles } from 'lucide-react'
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
      <section className="relative overflow-hidden bg-gradient-to-b from-ice to-white py-20 md:py-28 text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-ocean/5 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 bg-ocean/10 text-ocean text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-4 h-4" /> How It Works
            </span>
            <h1 className="font-fraunces text-5xl md:text-6xl font-semibold text-navy leading-tight">How It Works</h1>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
              Whether you're buying or selling, Grabb makes local commerce simple.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionWrapper id="buyer-journey" title="For Buyers" subtitle="See the real shop before it shows up at your door.">
        <div className="max-w-4xl mx-auto space-y-5">
          {buyerSteps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-start gap-5 bg-white rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ice to-ice-dark flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-ocean" />
                </div>
                <div>
                  <h3 className="font-fraunces font-semibold text-navy text-xl mb-1.5">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </SectionWrapper>

      <SectionWrapper id="vendor-journey" title="For Vendors" subtitle="Your shop, online — we handle the delivery." className="bg-white">
        <div className="max-w-4xl mx-auto space-y-5">
          {vendorSteps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-start gap-5 bg-gradient-to-br from-ice to-white rounded-2xl p-6 md:p-7"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ocean/10 to-ocean/5 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-ocean" />
                </div>
                <div>
                  <h3 className="font-fraunces font-semibold text-navy text-xl mb-1.5">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </SectionWrapper>

      <SectionWrapper id="delivery" title="How Delivery Works" subtitle="Speed as a service — not a warehouse in disguise.">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-10 shadow-sm">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="font-fraunces text-2xl font-semibold text-navy mb-5">Delivery that puts shops first</h3>
              <ul className="space-y-4">
                {[
                  'Your order goes directly to the shop you chose — not a dark store or anonymous warehouse.',
                  'Grabb\'s delivery partners pick up from the shop\'s counter, just like you would.',
                  'Orders are delivered within your neighbourhood, keeping delivery times fast and reliable.',
                  'Shopkeepers know their customers by name. It\'s local commerce, made digital.',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 text-gray-600"
                  >
                    <MapPin className="w-5 h-5 text-ocean shrink-0 mt-0.5" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-ice to-white rounded-2xl p-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ocean to-ocean-dark flex items-center justify-center mx-auto mb-4 shadow-lg shadow-ocean/20">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600 font-medium leading-relaxed">
                  "We're not a quick-commerce warehouse. We're your neighbourhood shop, now with delivery."
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span className="text-gray-400">Dark store model</span>
                  <span className="text-ocean">Grabb model</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
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
