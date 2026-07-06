import { motion } from 'framer-motion'

export default function SectionWrapper({ children, className = '', id, title, subtitle }: { children: React.ReactNode; className?: string; id?: string; title?: string; subtitle?: string }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={`py-20 md:py-28 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-center mb-16"
          >
            <h2 className="font-fraunces text-4xl md:text-5xl font-semibold text-navy">{title}</h2>
            {subtitle && <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </motion.section>
  )
}
