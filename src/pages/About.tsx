import { motion } from 'framer-motion'
import { Store, Heart, Shield } from 'lucide-react'

export default function About() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-fraunces text-4xl md:text-5xl font-semibold text-navy text-center">About Grabb</h1>
          <p className="text-center text-gray-600 mt-3 text-lg">Real shops. Real people. Real delivery.</p>
        </motion.div>

        {/* ── Founding Story ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-12 bg-white rounded-xl p-8 shadow-sm"
        >
          <h2 className="font-fraunces text-2xl font-semibold text-navy mb-4">Our Story</h2>
          <div className="prose prose-gray max-w-none text-sm text-gray-600 space-y-4">
            <p>
              Grabb started with a simple observation: quick-commerce apps had made delivery incredibly fast, but in the process, they had erased the shopkeeper. Your order came from a warehouse you'd never heard of, packed by someone you'd never meet.
            </p>
            <p>
              Meanwhile, the local grocery store, the neighbourhood bakery, the pharmacy that knew your name — these shops were being left behind. They had the products, the trust, and the relationships. They just didn't have delivery.
            </p>
            <p>
              So we built Grabb — not as another anonymous delivery app, but as a way to put real local shops back at the centre of the experience. We give every shopkeeper their own storefront page, we connect them with nearby customers, and we handle the delivery logistics so they don't have to.
            </p>
            <p>
              We believe that convenience doesn't have to come at the cost of connection. You can have your groceries delivered in 30 minutes <em>and</em> know exactly which shop they came from.
            </p>
          </div>
        </motion.div>

        {/* ── Mission & Values ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: Store, title: 'Support Local', desc: 'Every order strengthens a real neighbourhood business, not a warehouse.' },
            { icon: Heart, title: 'Trust Through Transparency', desc: 'You see the shop, the shopkeeper, and the products before you order. No smoke and mirrors.' },
            { icon: Shield, title: 'Dependability', desc: 'Reliable delivery from shops you can count on. We hold ourselves to the same standard.' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-12 h-12 rounded-full bg-ice flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-ocean" />
                </div>
                <h3 className="font-fraunces font-semibold text-navy">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
