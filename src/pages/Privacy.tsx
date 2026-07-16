import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, ArrowUp } from 'lucide-react'

const sections = [
  { id: 'info', number: '01', title: 'Information We Collect', content: 'We collect information you provide directly, such as your name, email, phone number, and delivery address when you create an account or place an order. We also collect usage data to improve our services.' },
  { id: 'use', number: '02', title: 'How We Use Your Information', content: 'We use your information to process orders, communicate with you about your orders, improve our services, send promotional communications (with your consent), and ensure the security of our platform.' },
  { id: 'share', number: '03', title: 'Information Sharing', content: 'We share your information with vendors to fulfill your orders, with delivery partners to complete deliveries, and with service providers who assist in operating our platform. We do not sell your personal information to third parties.' },
  { id: 'cookies', number: '04', title: 'Cookies & Tracking', content: 'We use cookies and similar technologies to enhance your experience, analyze usage patterns, and personalize content. You can control cookie settings through your browser preferences.' },
  { id: 'security', number: '05', title: 'Data Security', content: 'We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits.' },
  { id: 'retention', number: '06', title: 'Data Retention', content: 'We retain your information for as long as your account is active or as needed to provide services. We may retain certain information as required by law or for legitimate business purposes.' },
  { id: 'rights', number: '07', title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal information. You can also opt out of marketing communications at any time. Contact us to exercise these rights.' },
  { id: 'third', number: '08', title: 'Third-Party Services', content: 'Our platform may contain links to third-party services. We are not responsible for the privacy practices of these services.' },
  { id: 'changes', number: '09', title: 'Changes to This Policy', content: 'We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website or through email notification.' },
  { id: 'contact', number: '10', title: 'Contact Us', content: 'If you have questions about this Privacy Policy, please contact us at privacy@grabb.com or through our Contact page.' },
]

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

export default function Privacy() {
  const [activeSection, setActiveSection] = useState('info')

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fdf8f0] via-ice to-white pt-20 pb-10 md:pt-28 md:pb-14">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-ocean/[0.03] blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-3%] w-[400px] h-[400px] rounded-full bg-gold/[0.04] blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-ocean/[0.06] border border-ocean/10 text-ocean text-xs font-semibold px-5 py-2.5 rounded-full mb-6 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Legal
            </div>
            <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-navy">Privacy Policy</h1>
            <p className="text-gray-500 mt-3 text-base max-w-lg mx-auto">Last updated: July 2026</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100 sticky top-14 md:top-[72px] z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none">
            {sections.map((s) => (
              <button key={s.id} onClick={() => { setActiveSection(s.id); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  activeSection === s.id ? 'bg-gradient-to-r from-ocean to-ocean-dark text-white shadow-md shadow-ocean/20' : 'bg-ice text-navy/50 hover:bg-ocean/10 hover:text-ocean'
                }`}>
                {s.number} {s.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {sections.map((s, i) => (
            <AnimatedSection key={s.id} delay={i * 0.04}>
              <div id={s.id} className="bg-white rounded-[1.3rem] p-6 md:p-8 border border-gray-100/80 hover:shadow-premium transition-all duration-400 scroll-mt-32">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean/10 to-sky/10 flex items-center justify-center font-fraunces font-bold text-ocean text-sm shrink-0">{s.number}</span>
                  <h2 className="font-fraunces text-xl font-bold text-navy">{s.title}</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{s.content}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <div className="fixed bottom-6 right-6 z-40">
        <motion.button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} whileHover={{ y: -4, scale: 1.08 }} whileTap={{ scale: 0.9 }}
          className="w-11 h-11 rounded-xl bg-white border border-gray-200 shadow-premium-lg flex items-center justify-center text-navy hover:bg-ice transition-all">
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  )
}
