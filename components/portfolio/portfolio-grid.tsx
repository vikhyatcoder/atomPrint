"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OptimizedImage from "@/components/optimized-image"
import ColorSelector from "./color-selector"
import { portfolioItems, type PortfolioItem, type PortfolioItemColor } from "./portfolio-data"

interface PortfolioGridProps {
  activeFilter?: string
  searchQuery?: string
}

export default function PortfolioGrid({ activeFilter = "all", searchQuery = "" }: PortfolioGridProps) {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [activeTab, setActiveTab] = useState("details")
  const [selectedColorIds, setSelectedColorIds] = useState<Record<number, string>>({})

  // Memoize filtered items to prevent unnecessary recalculations
  const filteredItems = useMemo(() => {
    let filtered = portfolioItems

    // Apply tag/category filter
    if (activeFilter !== "all") {
      filtered = filtered.filter(
        (item) =>
          item.category.toLowerCase() === activeFilter.toLowerCase() || item.tags.includes(activeFilter.toLowerCase()),
      )
    }

    // Apply search filter
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

  const handleItemClick = (item: PortfolioItem) => {
    setSelectedItem(item)
    // Initialize with default color if not already selected
    if (!selectedColorIds[item.id]) {
      setSelectedColorIds((prev) => ({
        ...prev,
        [item.id]: item.defaultColorId,
      }))
    }
  }

  const handleColorSelect = (itemId: number, colorId: string) => {
    setSelectedColorIds((prev) => ({
      ...prev,
      [itemId]: colorId,
    }))
  }

  const getSelectedColor = (item: PortfolioItem): PortfolioItemColor => {
    const colorId = selectedColorIds[item.id] || item.defaultColorId
    return item.colors.find((c) => c.id === colorId) || item.colors[0]
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const defaultColor = item.colors.find((c) => c.id === item.defaultColorId) || item.colors[0]

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                className="group cursor-pointer"
                onClick={() => handleItemClick(item)}
                layout="position"
              >
                <div className="relative h-64 overflow-hidden rounded-lg">
                  <OptimizedImage
                    src={defaultColor.image || "/placeholder.svg"}
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
            )
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-medium mb-2">No projects found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedItem.title}</DialogTitle>
                <DialogDescription>
                  <Badge className="mt-2">{selectedItem.category}</Badge>
                </DialogDescription>
              </DialogHeader>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Project Details</TabsTrigger>
                  <TabsTrigger value="specs">Technical Specs</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                      <OptimizedImage
                        src={getSelectedColor(selectedItem).image || "/placeholder.svg"}
                        alt={selectedItem.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    <div>
                      <p className="mb-4">{selectedItem.description}</p>

                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Client:</span>
                          <span className="font-medium">{selectedItem.client}</span>
                        </div>

                        <ColorSelector
                          colors={selectedItem.colors}
                          selectedColorId={selectedColorIds[selectedItem.id] || selectedItem.defaultColorId}
                          onColorSelect={(colorId) => handleColorSelect(selectedItem.id, colorId)}
                          className="mb-4"
                        />

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-medium">
                            {getSelectedColor(selectedItem).price || "Contact for pricing"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {selectedItem.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-6">
                        <Button className="w-full" disabled={!getSelectedColor(selectedItem).inStock}>
                          {getSelectedColor(selectedItem).inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="specs" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Technical Specifications</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Material:</span>
                          <span className="font-medium">{selectedItem.material}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Print Time:</span>
                          <span className="font-medium">{selectedItem.printTime}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Layer Height:</span>
                          <span className="font-medium">0.2mm</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Infill:</span>
                          <span className="font-medium">20%</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Post-Processing:</span>
                          <span className="font-medium">Sanding, Painting</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Available Colors:</span>
                          <span className="font-medium">{selectedItem.colors.length}</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                      <OptimizedImage
                        src={getSelectedColor(selectedItem).image || "/placeholder.svg"}
                        alt={selectedItem.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
