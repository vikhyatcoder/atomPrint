"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, Weight, CuboidIcon as Cube, DollarSign, Download, Share2, Printer } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import type { AnalysisResults as AnalysisResultsType, PrintSettings, ModelData } from "./types"

interface AnalysisResultsProps {
  results: AnalysisResultsType
  settings: PrintSettings
  modelData: ModelData
}

export default function AnalysisResults({ results, settings, modelData }: AnalysisResultsProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const mins = Math.round(minutes % 60)

    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const formatCurrency = (amount: number): string => {
    return `₹${amount.toFixed(2)}`
  }

  const downloadReport = () => {
    const report = {
      fileName: modelData.fileName,
      analysis: results,
      settings: settings,
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${modelData.fileName}_analysis.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Analysis Results</h2>
          <p className="text-muted-foreground text-sm md:text-base break-all">
            Detailed analysis for {modelData.fileName}
          </p>
        </div>
        <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-2`}>
          <Button variant="outline" onClick={downloadReport} size={isMobile ? "sm" : "default"}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline" size={isMobile ? "sm" : "default"}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <div className={`grid grid-cols-2 ${isMobile ? "gap-3" : "md:grid-cols-4 gap-4"}`}>
        <Card>
          <CardContent className={`${isMobile ? "p-4" : "p-6"}`}>
            <div className="flex items-center space-x-2">
              <Clock className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-blue-500`} />
              <div>
                <p className={`${isMobile ? "text-lg" : "text-2xl"} font-bold`}>{formatTime(results.printTime)}</p>
                <p className={`${isMobile ? "text-xs" : "text-sm"} text-muted-foreground`}>Print Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className={`${isMobile ? "p-4" : "p-6"}`}>
            <div className="flex items-center space-x-2">
              <Weight className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-green-500`} />
              <div>
                <p className={`${isMobile ? "text-lg" : "text-2xl"} font-bold`}>{results.weight.toFixed(1)}g</p>
                <p className={`${isMobile ? "text-xs" : "text-sm"} text-muted-foreground`}>Material Weight</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className={`${isMobile ? "p-4" : "p-6"}`}>
            <div className="flex items-center space-x-2">
              <Cube className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-purple-500`} />
              <div>
                <p className={`${isMobile ? "text-lg" : "text-2xl"} font-bold`}>{results.volume.toFixed(1)} cm³</p>
                <p className={`${isMobile ? "text-xs" : "text-sm"} text-muted-foreground`}>Volume</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className={`${isMobile ? "p-4" : "p-6"}`}>
            <div className="flex items-center space-x-2">
              <DollarSign className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-orange-500`} />
              <div>
                <p className={`${isMobile ? "text-lg" : "text-2xl"} font-bold`}>
                  {formatCurrency(results.materialCost)}
                </p>
                <p className={`${isMobile ? "text-xs" : "text-sm"} text-muted-foreground`}>Material Cost</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader className={`${isMobile ? "pb-3" : "pb-4"}`}>
            <CardTitle className={`${isMobile ? "text-lg" : "text-xl"}`}>Print Details</CardTitle>
            <CardDescription className="text-sm">Detailed breakdown of your print job</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Original Volume:</span>
              <span className="font-medium text-sm">{results.volume.toFixed(2)} cm³</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Effective Volume:</span>
              <span className="font-medium text-sm">{results.effectiveVolume.toFixed(2)} cm³</span>
            </div>
            {results.supportVolume > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Support Volume:</span>
                <span className="font-medium text-sm">{results.supportVolume.toFixed(2)} cm³</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Surface Area:</span>
              <span className="font-medium text-sm">{results.surfaceArea.toFixed(2)} cm²</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Layer Count:</span>
              <span className="font-medium text-sm">{results.layerCount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Triangles:</span>
              <span className="font-medium text-sm">{modelData.triangleCount?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Scaled Dimensions:</span>
              <span className="font-medium text-sm">
                {(modelData.boundingBox.max.x * settings.scaleFactor).toFixed(1)} ×{" "}
                {(modelData.boundingBox.max.y * settings.scaleFactor).toFixed(1)} ×{" "}
                {(modelData.boundingBox.max.z * settings.scaleFactor).toFixed(1)} mm
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className={`${isMobile ? "pb-3" : "pb-4"}`}>
            <CardTitle className={`${isMobile ? "text-lg" : "text-xl"}`}>Print Settings Used</CardTitle>
            <CardDescription className="text-sm">Configuration used for this analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Material:</span>
              <Badge variant="secondary" className="text-xs">
                {settings.material}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Infill:</span>
              <span className="font-medium text-sm">{settings.infillPercentage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Layer Height:</span>
              <span className="font-medium text-sm">{settings.layerHeight}mm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Print Speed:</span>
              <span className="font-medium text-sm">{settings.printSpeed}mm/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Supports:</span>
              <Badge variant={settings.supportsEnabled ? "default" : "secondary"} className="text-xs">
                {settings.supportsEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Scale:</span>
              <span className="font-medium text-sm">{(settings.scaleFactor * 100).toFixed(0)}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className={`${isMobile ? "pb-3" : "pb-4"}`}>
          <CardTitle className={`${isMobile ? "text-lg" : "text-xl"}`}>Cost Breakdown</CardTitle>
          <CardDescription className="text-sm">Estimated costs for this print job</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Material Cost:</span>
              <span className="font-medium text-sm">{formatCurrency(results.materialCost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Electricity (est.):</span>
              <span className="font-medium text-sm">{formatCurrency(results.printTime * 0.002)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Machine Wear (est.):</span>
              <span className="font-medium text-sm">{formatCurrency(results.printTime * 0.001)}</span>
            </div>
            <Separator />
            <div className={`flex justify-between ${isMobile ? "text-base" : "text-lg"} font-semibold`}>
              <span>Total Estimated Cost:</span>
              <span>{formatCurrency(results.materialCost + results.printTime * 0.003)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className={`${isMobile ? "pb-3" : "pb-4"}`}>
          <CardTitle className={`${isMobile ? "text-lg" : "text-xl"}`}>Ready to Print?</CardTitle>
          <CardDescription className="text-sm">Your model analysis is complete</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`flex ${isMobile ? "flex-col" : "flex-col sm:flex-row"} gap-3 md:gap-4`}>
            <Button className="flex-1" size={isMobile ? "default" : "default"}>
              <Printer className="mr-2 h-4 w-4" />
              Start Print Job
            </Button>
            <Button variant="outline" className="flex-1" size={isMobile ? "default" : "default"}>
              Save to Queue
            </Button>
            <Button variant="outline" className="flex-1" size={isMobile ? "default" : "default"}>
              Modify Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
