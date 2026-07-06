import { motion } from 'framer-motion'
import { Store, Heart, Shield, Sparkles } from 'lucide-react'

export default function About() {
  return (
    <div className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-1.5 bg-ocean/10 text-ocean text-sm font-medium px-4 py-1.5 rounded-full mb-6 mx-auto w-fit">
            <Sparkles className="w-4 h-4" /> About Us
          </span>
          <h1 className="font-fraunces text-5xl md:text-6xl font-semibold text-navy text-center leading-tight">About Grabb</h1>
          <p className="text-center text-gray-600 mt-4 text-lg max-w-2xl mx-auto">Real shops. Real people. Real delivery.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-14 bg-white rounded-2xl p-8 md:p-10 shadow-sm"
        >
          <h2 className="font-fraunces text-2xl font-semibold text-navy mb-5">Our Story</h2>
          <div className="text-gray-600 space-y-5 leading-relaxed">
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: Store, title: 'Support Local', desc: 'Every order strengthens a real neighbourhood business, not a warehouse.' },
            { icon: Heart, title: 'Trust Through Transparency', desc: 'You see the shop, the shopkeeper, and the products before you order. No smoke and mirrors.' },
            { icon: Shield, title: 'Dependability', desc: 'Reliable delivery from shops you can count on. We hold ourselves to the same standard.' },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ice to-ice-dark flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-ocean" />
                </div>
                <h3 className="font-fraunces font-semibold text-navy text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
