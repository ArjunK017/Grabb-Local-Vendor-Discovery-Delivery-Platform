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

export default function CategoryTile({ category }: { category: { id: string; name: string; icon: string; description: string }; index?: number }) {
  const IconComponent = iconMap[category.icon] || LucideIcons.Store

  return (
    <Link
      to={`/explore?category=${category.id}`}
      className="flex flex-col items-center gap-3 p-6 bg-white rounded-[1.2rem] shadow-sm hover:shadow-premium-lg hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden border border-gray-100/50"
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-ocean/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.2rem]" />
      <div className="relative">
        <motion.div
          whileHover={{ rotate: 12, scale: 1.15 }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ice to-ice-dark flex items-center justify-center text-ocean group-hover:from-ocean group-hover:to-ocean-dark group-hover:text-white transition-all duration-400 shadow-sm group-hover:shadow-lg group-hover:shadow-ocean/20"
        >
          <IconComponent className="w-7 h-7" />
        </motion.div>
      </div>
      <span className="font-fraunces font-semibold text-navy text-sm text-center relative">{category.name}</span>
      <span className="text-xs text-gray-400 text-center leading-relaxed relative">{category.description}</span>
    </Link>
  )
}
