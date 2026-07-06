import { Link } from 'react-router-dom'
import * as LucideIcons from 'lucide-react'
import { motion } from 'framer-motion'

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  ShoppingCart: LucideIcons.ShoppingCart,
  Croissant: LucideIcons.Croissant,
  Pill: LucideIcons.Pill,
  Shirt: LucideIcons.Shirt,
  BookOpen: LucideIcons.BookOpen,
  Flower2: LucideIcons.Flower2,
  Fish: LucideIcons.Fish,
  Coffee: LucideIcons.Coffee,
}

export default function CategoryTile({ category, index = 0 }: { category: { id: string; name: string; icon: string; description: string }; index?: number }) {
  const IconComponent = iconMap[category.icon] || LucideIcons.Store

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to={`/explore?category=${category.id}`}
        className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ice to-ice-dark flex items-center justify-center text-ocean group-hover:from-ocean group-hover:to-ocean-dark group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-ocean/20">
          <IconComponent className="w-7 h-7" />
        </div>
        <span className="font-fraunces font-semibold text-navy text-sm text-center">{category.name}</span>
        <span className="text-xs text-gray-500 text-center leading-relaxed">{category.description}</span>
      </Link>
    </motion.div>
  )
}
