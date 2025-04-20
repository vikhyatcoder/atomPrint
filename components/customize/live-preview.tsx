"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, CuboidIcon as Cube, RotateCw } from "lucide-react"

export default function LivePreview() {
  const [viewMode, setViewMode] = useState("3d")
  const [isRotating, setIsRotating] = useState(true)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Eye className="mr-2 h-5 w-5" />
          Live Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={viewMode} onValueChange={setViewMode} className="mb-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="3d">3D View</TabsTrigger>
            <TabsTrigger value="2d">2D Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="3d" className="pt-4">
            <div className="relative bg-muted rounded-lg h-[300px] flex items-center justify-center">
              <div className="text-center">
                <Cube className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Upload a model to see a 3D preview</p>
              </div>

              <Button
                size="sm"
                variant="outline"
                className="absolute bottom-4 right-4"
                onClick={() => setIsRotating(!isRotating)}
              >
                <RotateCw className={`h-4 w-4 mr-2 ${isRotating ? "animate-spin" : ""}`} />
                {isRotating ? "Stop Rotation" : "Start Rotation"}
              </Button>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline" size="sm">
                Zoom In
              </Button>
              <Button variant="outline" size="sm">
                Zoom Out
              </Button>
              <Button variant="outline" size="sm">
                Reset View
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="2d" className="pt-4">
            <div className="bg-muted rounded-lg h-[300px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">2D preview will be generated after model upload</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-medium mb-2">Preview Notes</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Preview is an approximation and may differ slightly from the final print</li>
            <li>• Colors may vary based on material and printer calibration</li>
            <li>• For complex models, our team will provide a manual review</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
