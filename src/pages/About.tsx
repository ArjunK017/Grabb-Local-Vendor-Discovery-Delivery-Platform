import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Heart, Shield, Leaf, Users, ArrowRight, Sparkles, Target, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

const values = [
  { icon: Heart, title: 'Community First', desc: 'We believe strong neighbourhoods start with strong local businesses.' },
  { icon: Shield, title: 'Trust & Safety', desc: 'Every vendor is verified. Every order is protected.' },
  { icon: Leaf, title: 'Sustainability', desc: 'Local delivery means fewer miles, less waste, better for the planet.' },
  { icon: Users, title: 'Inclusivity', desc: 'Grabb is for everyone — every shop, every customer, every neighbourhood.' },
]

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const numMatch = value.match(/(\d+)/)
  const num = numMatch ? parseInt(numMatch[1]) : 0
  const suffix = value.replace(/(\d+)/, '')
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const increment = Math.ceil(num / 35)
    const interval = setInterval(() => {
      start += increment
      if (start >= num) { setCount(num); clearInterval(interval) }
      else { setCount(start) }
    }, 30)
    return () => clearInterval(interval)
  }, [isInView, num])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="font-fraunces text-3xl md:text-4xl font-bold text-ocean">{count}{suffix}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </motion.div>
  )
}

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fdf8f0] via-ice to-white pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-ocean/[0.03] blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-3%] w-[400px] h-[400px] rounded-full bg-gold/[0.04] blur-[100px]" />
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-[20%] left-[8%] w-2.5 h-2.5 rounded-full bg-ocean/20" />
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, delay: -2 }} className="absolute top-[40%] right-[12%] w-3 h-3 rounded-full bg-sky/25" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-5 py-2.5 rounded-full mb-6 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" /> About Us
            </div>
            <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-navy">Our Story</h1>
            <p className="text-gray-500 mt-4 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
              We're on a mission to make shopping local the easiest choice for everyone.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-10 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter value="50+" label="Local Vendors" />
            <AnimatedCounter value="10K+" label="Orders Delivered" />
            <AnimatedCounter value="15+" label="Neighbourhoods" />
            <AnimatedCounter value="4.8" label="Avg. Rating" />
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-gradient-to-br from-[#fdf8f0] via-white to-ice/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-5 py-2.5 rounded-full mb-5 tracking-wide uppercase">
                <Target className="w-3.5 h-3.5" /> Our Mission
              </span>
              <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-navy leading-tight">Shopping local shouldn't be harder than ordering from a big corporation.</h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1} className="space-y-4 text-gray-600 leading-relaxed">
              <p>We saw neighbourhood shops struggling to compete with giant delivery apps that charge high commissions and bury small businesses.</p>
              <p>So we built something different. A platform that puts local vendors first. No hidden fees. No algorithms that favour the big players.</p>
              <p>Grabb is the opposite of quick-commerce warehouses. We reveal the source and sell speed as a service on top of it.</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-5 py-2.5 rounded-full mb-5 tracking-wide uppercase">
              <Eye className="w-3.5 h-3.5" /> Values
            </span>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-navy">What We Stand For</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <AnimatedSection key={v.title} delay={i * 0.08}>
                  <div className="bg-gradient-to-br from-[#fdf8f0] to-ice/50 rounded-[1.3rem] p-6 h-full border border-gray-100/80 hover:border-ocean/20 hover:shadow-premium-lg transition-all duration-500 hover:-translate-y-1 text-center group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-ocean/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.3rem]" />
                    <div className="relative">
                      <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ocean/10 to-sky/10 flex items-center justify-center mx-auto mb-5 group-hover:from-ocean group-hover:to-ocean-dark transition-all duration-300 shadow-sm">
                        <Icon className="w-7 h-7 text-ocean group-hover:text-white transition-colors" />
                      </motion.div>
                      <h3 className="font-fraunces font-bold text-navy text-lg mb-2">{v.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-ocean-dark" />
          <div className="absolute top-[15%] left-[10%] w-2 h-2 rounded-full bg-white/10 animate-float" />
          <div className="absolute bottom-[20%] right-[15%] w-2.5 h-2.5 rounded-full bg-sky/20 animate-float-delayed" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-white">Join the Movement</h2>
            <p className="text-white/60 mt-3 text-base max-w-md mx-auto">Whether you're a shopper or a shopkeeper, Grabb is for you.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link to="/explore" className="group inline-flex items-center gap-2 bg-white text-navy px-8 py-3.5 rounded-full font-semibold text-sm shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all">
                  Explore Shops <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link to="/become-a-vendor" className="inline-flex items-center gap-2 border-2 border-white/20 text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-white/10 transition-all">
                  Become a Vendor
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
