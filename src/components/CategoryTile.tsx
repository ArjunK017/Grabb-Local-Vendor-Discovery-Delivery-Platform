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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        to={`/explore?category=${category.id}`}
        className="flex flex-col items-center gap-2 p-5 bg-white rounded-xl shadow-sm hover:shadow-md hover:bg-sky/10 transition-all"
      >
        <div className="w-12 h-12 rounded-full bg-ice flex items-center justify-center text-ocean">
          <IconComponent className="w-6 h-6" />
        </div>
        <span className="font-fraunces font-medium text-navy text-sm text-center">{category.name}</span>
        <span className="text-xs text-gray-500 text-center">{category.description}</span>
      </Link>
    </motion.div>
  )
}
