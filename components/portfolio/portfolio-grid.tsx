"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import OptimizedImage from "@/components/optimized-image"
import { portfolioItems } from "./portfolio-data"

interface PortfolioGridProps {
  activeFilter?: string
  searchQuery?: string
}

export default function PortfolioGrid({ activeFilter = "all", searchQuery = "" }: PortfolioGridProps) {
  const router = useRouter()

  const filteredItems = useMemo(() => {
    let filtered = portfolioItems

    if (activeFilter !== "all") {
      filtered = filtered.filter(
        (item) =>
          item.category.toLowerCase() === activeFilter.toLowerCase() || item.tags.includes(activeFilter.toLowerCase()),
      )
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    return filtered
  }, [activeFilter, searchQuery])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredItems.length > 0 ? (
        filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
            className="group cursor-pointer"
            onClick={() => router.push(`/portfolio?project=${item.id}`)}
            layout="position"
          >
            <div className="relative h-64 overflow-hidden rounded-lg">
              <OptimizedImage
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <Badge className="mb-2">{item.category}</Badge>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <h3 className="text-xl font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  )
}
