import { motion } from 'framer-motion'
import { Store, Heart, Shield, Users, Leaf } from 'lucide-react'

const stats = [
  { label: 'Local Vendors', value: '50+' },
  { label: 'Orders Delivered', value: '10K+' },
  { label: 'Cities', value: '4' },
  { label: 'Happy Customers', value: '5K+' },
]

const values = [
  { icon: Heart, title: 'Community First', desc: 'We believe strong neighbourhoods start with strong local businesses.' },
  { icon: Shield, title: 'Trust & Safety', desc: 'Every vendor is verified. Every order is protected.' },
  { icon: Leaf, title: 'Sustainability', desc: 'Local delivery means fewer miles, less waste, better for the planet.' },
  { icon: Users, title: 'Inclusivity', desc: 'Grabb is for everyone — every shop, every customer, every neighbourhood.' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ice to-white pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[35%] h-[35%] rounded-full bg-ocean/6 blur-3xl animate-float" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-gold/6 blur-3xl animate-float-delayed" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-fraunces text-4xl md:text-5xl font-semibold text-navy">About Grabb</h1>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
              We're on a mission to make shopping local the easiest choice for everyone. Grabb connects
              neighbourhoods with the shops they love — fast, fair, and transparent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 shadow-xl shadow-navy/5"
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="text-center"
              >
                <p className="font-fraunces text-3xl md:text-4xl font-semibold text-gradient">{s.value}</p>
                <p className="text-gray-500 text-sm mt-1">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-fraunces text-3xl md:text-4xl font-semibold text-navy">Our Story</h2>
              <div className="mt-4 space-y-4 text-gray-600 leading-relaxed">
                <p>Grabb was born from a simple idea: shopping local shouldn't be harder than ordering from a big corporation.</p>
                <p>We saw neighbourhood shops — bakeries, grocers, delis, craft stores — struggling to compete with giant delivery apps that charge high commissions and bury small businesses.</p>
                <p>So we built something different. A platform that puts local vendors first. No hidden fees. No algorithms that favour the big players. Just a direct connection between you and the shops around the corner.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl shadow-navy/10"
            >
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-ocean/8 via-ice to-gold/8" />
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 8px 8px, rgba(31,111,178,0.08) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
              {/* Decorative circles */}
              <div className="absolute top-[15%] left-[12%] w-14 h-14 rounded-full bg-ocean/10 animate-float" />
              <div className="absolute bottom-[20%] right-[15%] w-20 h-20 rounded-full bg-gold/8 animate-float-delayed" />
              <div className="absolute top-[40%] right-[25%] w-8 h-8 rounded-full bg-sky/10" />
              {/* Map pins */}
              <div className="absolute top-[25%] left-[35%] flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-ocean shadow-[0_0_0_4px_rgba(31,111,178,0.15)]" />
                <div className="w-px h-5 bg-ocean/30" />
              </div>
              <div className="absolute bottom-[30%] right-[30%] flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_0_4px_rgba(212,168,83,0.15)]" />
                <div className="w-px h-4 bg-gold/30" />
              </div>
              <div className="absolute bottom-[40%] left-[55%] flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-sky shadow-[0_0_0_4px_rgba(127,199,232,0.15)]" />
                <div className="w-px h-4 bg-sky/30" />
              </div>
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center">
                  <Store className="w-8 h-8 text-ocean" />
                </div>
              </div>
              {/* Corner labels */}
              <span className="absolute bottom-4 left-4 text-[10px] font-medium text-gray-400 uppercase tracking-widest">Local Map</span>
              <span className="absolute top-4 right-4 text-[10px] font-medium text-gray-400 uppercase tracking-widest">Grabb Network</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-fraunces text-3xl md:text-4xl font-semibold text-navy">Our Values</h2>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  className="glass rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean/10 to-sky/10 flex items-center justify-center text-ocean mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-fraunces text-base font-semibold text-navy mb-1">{v.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
