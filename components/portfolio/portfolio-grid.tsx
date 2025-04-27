"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// In a real application, this would come from a CMS or API
const portfolioItems = [
  {
    id: 1,
    title: "Modern Architectural House Model",
    category: "Architecture",
    tags: ["architecture", "residential", "models"],
    image: "/images/3d-house.jpg",
    description:
      "A detailed architectural model of a modern minimalist house with multiple levels and open spaces. Perfect for client presentations and design visualization.",
    client: "Architectural Design Studio",
    material: "White PLA",
    printTime: "24 hours",
  },
  {
    id: 2,
    title: "Functional Robotic Arm",
    category: "Engineering",
    tags: ["engineering", "robotics", "functional"],
    image: "/images/robotic-arm.jpg",
    description:
      "A fully functional 3D printed robotic arm with servo motors and electronic components. Features a gripper mechanism and multiple points of articulation.",
    client: "Engineering Research Lab",
    material: "Red & White PLA, Electronic Components",
    printTime: "16 hours",
  },
  {
    id: 3,
    title: "Lord Ganesha Figurine",
    category: "Art & Gifts",
    tags: ["art", "religious", "gifts"],
    image: "/images/lord-ganesha.png",
    description:
      "A detailed small scale model of the printed devotee lord Ghanesha printed with high quality filament and durable in strength",
    client: "Sandeep Mishra",
    material: "PLA, Blue",
    printTime: "40 Minutes",
  },
  {
    id: 4,
    title: "Gradient Phone Stand",
    category: "Tools",
    tags: ["tools", "accessories", "functional"],
    image: "/images/phone-stand.webp",
    description:
      "A stylish phone stand with gradient coloring, designed for optimal viewing angles and cable management.",
    client: "Tech Accessories Shop",
    material: "PLA with Gradient Effect",
    printTime: "4 hours",
  },
  {
    id: 5,
    title: "Miniature Boat Model",
    category: "Education",
    tags: ["education", "toys", "models"],
    image: "/images/boat.jpg",
    description:
      "Detailed model of a boat suitable for decoration and gifting purposes and also available for architectural purposes.",
    client: "Suman Bhati ",
    material: "White PLA",
    printTime: "30 Minutes",
  },
  {
    id: 6,
    title: "Articulated Dinosaur",
    category: "Toys & Games",
    tags: ["toys", "education", "gifts"],
    image: "/images/dinosaur.jpg",
    description:
      "A cheerful model of a dino, expressing about the emotion of Joy optimal for giftings and décor purposes",
    client: "Mandeep Singh",
    material: "Blue and White PLA",
    printTime: "1.5 hours",
  },
  {
    id: 7,
    title: "Spider Model",
    category: "Education",
    tags: ["education", "science", "biology"],
    image: "/images/spider.jpg",
    description:
      "Model of a spider describing about the texture and the physical features of it best for educational purposes and demonstration",
    client: "Jatin Bansal",
    material: "White PLA",
    printTime: "25 Minutes",
  },
]

export default function PortfolioGrid() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredItems, setFilteredItems] = useState(portfolioItems)
  const [activeTab, setActiveTab] = useState("details")

  // Filter items based on active filter and search query
  useEffect(() => {
    let filtered = portfolioItems

    // Apply tag/category filter
    if (activeFilter !== "all") {
      filtered = filtered.filter((item) => item.tags.includes(activeFilter))
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

    setFilteredItems(filtered)
  }, [activeFilter, searchQuery])

  return (
    <>
      <AnimatePresence>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedItem(item)}
                layout
              >
                <div className="relative h-64 overflow-hidden rounded-lg">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 6}
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
              <Button
                className="mt-4"
                onClick={() => {
                  setActiveFilter("all")
                  setSearchQuery("")
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </AnimatePresence>

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
                      <Image
                        src={selectedItem.image || "/placeholder.svg"}
                        alt={selectedItem.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <p className="mb-4">{selectedItem.description}</p>

                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Client:</span>
                          <span className="font-medium">{selectedItem.client}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {selectedItem.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
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
                      </div>
                    </div>

                    <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                      <Image
                        src={selectedItem.image || "/placeholder.svg"}
                        alt={selectedItem.title}
                        fill
                        className="object-cover"
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
