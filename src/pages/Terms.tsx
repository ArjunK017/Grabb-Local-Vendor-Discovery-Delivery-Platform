import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'

const sections = [
  { id: 'acceptance', number: '01', title: 'Acceptance of Terms', content: 'By accessing or using Grabb, you agree to be bound by these Terms of Service. If you do not agree, do not use the platform.' },
  { id: 'eligibility', number: '02', title: 'Eligibility', content: 'You must be at least 18 years old to use Grabb. By using the platform, you represent that you meet this requirement and that all information you provide is accurate.' },
  { id: 'accounts', number: '03', title: 'Accounts', content: 'You are responsible for maintaining the confidentiality of your account credentials. Grabb is not liable for any loss resulting from unauthorised use of your account.' },
  { id: 'orders', number: '04', title: 'Orders & Payments', content: 'All orders placed through Grabb are subject to vendor acceptance. Payments are processed securely through third-party providers. Prices are set by vendors and may change at any time.' },
  { id: 'delivery', number: '05', title: 'Delivery', content: 'Delivery times are estimates. Grabb is not responsible for delays caused by factors outside our control. Risk of loss passes to you upon delivery.' },
  { id: 'returns', number: '06', title: 'Returns & Refunds', content: 'Refund and return policies are set by individual vendors. Grabb will facilitate dispute resolution but does not guarantee refunds.' },
  { id: 'conduct', number: '07', title: 'User Conduct', content: 'You agree not to misuse the platform, including but not limited to: fraud, harassment, or violating any applicable laws.' },
  { id: 'liability', number: '08', title: 'Limitation of Liability', content: 'Grabb is provided "as is" without warranties of any kind. To the maximum extent permitted by law, Grabb disclaims all liability for damages arising from your use of the platform.' },
  { id: 'changes', number: '09', title: 'Changes to Terms', content: 'We may update these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.' },
  { id: 'contact', number: '10', title: 'Contact', content: 'For questions about these terms, contact us at hello@grabb.com.' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Terms() {

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
              <BookOpen className="w-3.5 h-3.5" /> Terms & Conditions
            </div>
            <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-semibold text-navy leading-[1.08]">Terms of Service</h1>
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
