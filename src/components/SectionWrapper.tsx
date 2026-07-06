import { motion } from 'framer-motion'

export default function SectionWrapper({ children, className = '', id, title, subtitle }: { children: React.ReactNode; className?: string; id?: string; title?: string; subtitle?: string }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`py-16 md:py-20 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12">
            <h2 className="font-fraunces text-3xl md:text-4xl font-semibold text-navy">{title}</h2>
            {subtitle && <p className="mt-3 text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </motion.section>
  )
}
