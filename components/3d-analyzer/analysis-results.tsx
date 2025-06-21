"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, Weight, CuboidIcon as Cube, DollarSign, Download, Share2, Printer } from "lucide-react"
import type { AnalysisResults as AnalysisResultsType, PrintSettings, ModelData } from "./types"

interface AnalysisResultsProps {
  results: AnalysisResultsType
  settings: PrintSettings
  modelData: ModelData
}

export default function AnalysisResults({ results, settings, modelData }: AnalysisResultsProps) {
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analysis Results</h2>
          <p className="text-muted-foreground">Detailed analysis for {modelData.fileName}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={downloadReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{formatTime(results.printTime)}</p>
                <p className="text-sm text-muted-foreground">Print Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Weight className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{results.weight.toFixed(1)}g</p>
                <p className="text-sm text-muted-foreground">Material Weight</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Cube className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{results.volume.toFixed(1)} cm³</p>
                <p className="text-sm text-muted-foreground">Volume</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{formatCurrency(results.materialCost)}</p>
                <p className="text-sm text-muted-foreground">Material Cost</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Print Details</CardTitle>
            <CardDescription>Detailed breakdown of your print job</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Original Volume:</span>
              <span className="font-medium">{results.volume.toFixed(2)} cm³</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Effective Volume:</span>
              <span className="font-medium">{results.effectiveVolume.toFixed(2)} cm³</span>
            </div>
            {results.supportVolume > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Support Volume:</span>
                <span className="font-medium">{results.supportVolume.toFixed(2)} cm³</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Surface Area:</span>
              <span className="font-medium">{results.surfaceArea.toFixed(2)} cm²</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Layer Count:</span>
              <span className="font-medium">{results.layerCount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Triangles:</span>
              <span className="font-medium">{modelData.triangleCount?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Scaled Dimensions:</span>
              <span className="font-medium">
                {(modelData.boundingBox.max.x * settings.scaleFactor).toFixed(1)} ×{" "}
                {(modelData.boundingBox.max.y * settings.scaleFactor).toFixed(1)} ×{" "}
                {(modelData.boundingBox.max.z * settings.scaleFactor).toFixed(1)} mm
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Print Settings Used</CardTitle>
            <CardDescription>Configuration used for this analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Material:</span>
              <Badge variant="secondary">{settings.material}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Infill:</span>
              <span className="font-medium">{settings.infillPercentage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Layer Height:</span>
              <span className="font-medium">{settings.layerHeight}mm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Print Speed:</span>
              <span className="font-medium">{settings.printSpeed}mm/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Supports:</span>
              <Badge variant={settings.supportsEnabled ? "default" : "secondary"}>
                {settings.supportsEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Scale:</span>
              <span className="font-medium">{(settings.scaleFactor * 100).toFixed(0)}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown</CardTitle>
          <CardDescription>Estimated costs for this print job</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Material Cost:</span>
              <span className="font-medium">{formatCurrency(results.materialCost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Electricity (est.):</span>
              <span className="font-medium">{formatCurrency(results.printTime * 0.002)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Machine Wear (est.):</span>
              <span className="font-medium">{formatCurrency(results.printTime * 0.001)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Estimated Cost:</span>
              <span>{formatCurrency(results.materialCost + results.printTime * 0.003)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ready to Print?</CardTitle>
          <CardDescription>Your model analysis is complete</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1">
              <Printer className="mr-2 h-4 w-4" />
              Start Print Job
            </Button>
            <Button variant="outline" className="flex-1">
              Save to Queue
            </Button>
            <Button variant="outline" className="flex-1">
              Modify Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
