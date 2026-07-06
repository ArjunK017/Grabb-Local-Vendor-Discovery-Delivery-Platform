import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

const sections = [
  { id: 'info', number: '01', title: 'Information We Collect', content: 'We collect information you provide directly, such as your name, email, and delivery address. We also automatically collect usage data, device information, and location data when you use the platform.' },
  { id: 'use', number: '02', title: 'How We Use Your Information', content: 'We use your information to process orders, improve our services, send relevant communications, and ensure platform security. We do not sell your personal data to third parties.' },
  { id: 'share', number: '03', title: 'Information Sharing', content: 'We share necessary information with vendors to fulfil orders. We may share anonymised data with analytics partners. We never share your data for advertising purposes without consent.' },
  { id: 'cookies', number: '04', title: 'Cookies & Tracking', content: 'We use essential cookies for platform functionality. Analytics cookies help us understand usage patterns. You can manage cookie preferences in your browser settings.' },
  { id: 'security', number: '05', title: 'Data Security', content: 'We implement industry-standard encryption and security measures to protect your data. However, no method of transmission is 100% secure.' },
  { id: 'retention', number: '06', title: 'Data Retention', content: 'We retain your data as long as your account is active or as needed to provide services. You may request deletion of your data at any time.' },
  { id: 'rights', number: '07', title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal data. You can also object to or restrict certain processing activities. Contact us at hello@grabb.com to exercise your rights.' },
  { id: 'third', number: '08', title: 'Third-Party Services', content: 'Grabb may link to third-party services. We are not responsible for their privacy practices. We encourage you to review their policies.' },
  { id: 'changes', number: '09', title: 'Changes to This Policy', content: 'We may update this policy periodically. We will notify you of significant changes via email or platform notice.' },
  { id: 'contact', number: '10', title: 'Contact Us', content: 'For privacy-related inquiries, contact our Data Protection Officer at hello@grabb.com.' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Privacy() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ice to-white pt-20 pb-14 md:pt-28 md:pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-3%] w-80 h-80 rounded-full bg-ocean/[0.04] blur-3xl animate-float" />
          <div className="absolute bottom-[-10%] left-[-3%] w-72 h-72 rounded-full bg-sky/[0.04] blur-3xl animate-float-delayed" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ocean/5 border border-ocean/10 text-ocean text-xs font-medium mb-5">
              <Shield className="w-3.5 h-3.5" /> Privacy
            </div>
            <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-semibold text-navy leading-[1.08]">Privacy Policy</h1>
            <p className="text-gray-500 mt-3 text-sm">Last updated: January 2025</p>
          </motion.div>
        </div>
      </section>

      {/* Horizontal TOC */}
      <section className="mt-6 pb-8 md:pb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="glass rounded-2xl p-1.5 shadow-lg shadow-navy/5 overflow-x-auto"
          >
            <div className="flex gap-1 min-w-max px-1 py-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="shrink-0 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-500 hover:text-navy hover:bg-gray-100/50 transition-all duration-300 whitespace-nowrap"
                >
                  <span className="font-mono text-[10px] mr-1.5 opacity-60">{s.number}</span>
                  {s.title}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} className="space-y-5">
            {sections.map((s) => (
              <motion.div
                key={s.id}
                id={s.id}
                variants={cardVariants}
                className="glass rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 scroll-mt-28 group"
              >
                <div className="flex items-start gap-5">
                  <div className="hidden md:flex w-10 h-10 rounded-xl bg-gradient-to-br from-ocean/[0.06] to-sky/[0.06] items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-300">
                    <span className="font-fraunces text-sm font-bold text-ocean/30">{s.number}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-fraunces text-lg font-semibold text-navy mb-3">{s.title}</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">{s.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
