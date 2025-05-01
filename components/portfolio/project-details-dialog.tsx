"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OptimizedImage from "@/components/optimized-image"
import { X } from "lucide-react"

// Import the portfolio items data
import { portfolioItems } from "./portfolio-data"

export default function ProjectDetailsDialog() {
  const [activeTab, setActiveTab] = useState("details")
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedId = searchParams.get("project")
  const selectedItem = portfolioItems.find((item) => String(item.id) === String(selectedId))

  const handleDialogClose = () => {
    router.replace("/portfolio")
  }

  return (
    <Dialog
      open={!!selectedItem}
      onOpenChange={(open) => {
        if (!open) handleDialogClose()
      }}
    >
      <DialogContent className="max-w-4xl relative">
        {selectedItem && (
          <>
            <DialogHeader>
              <DialogTitle>{selectedItem.title}</DialogTitle>
              <DialogDescription>
                <Badge className="mt-2">{selectedItem.category}</Badge>
              </DialogDescription>
              {/* Close button */}
              <button className="absolute top-4 right-4 text-foreground" onClick={handleDialogClose} aria-label="Close">
                <X className="h-6 w-6" />
              </button>
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
                      src={selectedItem.image || "/placeholder.svg"}
                      alt={selectedItem.title}
                      fill
                      className="object-cover"
                      priority
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
                    <OptimizedImage
                      src={selectedItem.image || "/placeholder.svg"}
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
  )
}
