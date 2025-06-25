"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Upload, Settings, BarChart3, Eye, Smartphone } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"
import FileUploader from "./file-uploader"
import PrintSettings from "./print-settings"
import AnalysisResults from "./analysis-results"
import Simple3DRenderer from "./simple-3d-renderer"
import type { ModelData, PrintSettings as PrintSettingsType, AnalysisResults as AnalysisResultsType } from "./types"

const defaultSettings: PrintSettingsType = {
  material: "PLA",
  infillPercentage: 20,
  layerHeight: 0.2,
  printSpeed: 50,
  supportsEnabled: false,
  scaleFactor: 1.0,
}

export default function ModelAnalyzer() {
  const [modelData, setModelData] = useState<ModelData | null>(null)
  const [settings, setSettings] = useState<PrintSettingsType>(defaultSettings)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResultsType | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")

  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")
  const { isLowEndDevice, hasTouchScreen } = useDeviceCapabilities()

  const handleFileUpload = (data: ModelData) => {
    setModelData(data)
    setActiveTab("preview")
  }

  const handleAnalyze = async () => {
    if (!modelData) return

    setIsAnalyzing(true)

    // Simulate analysis with realistic timing
    await new Promise((resolve) => setTimeout(resolve, isMobile ? 1500 : 2000))

    // Calculate analysis results
    const materialDensities = {
      PLA: 1.24,
      ABS: 1.04,
      PETG: 1.27,
      TPU: 1.2,
      WOOD: 1.28,
    }

    const density = materialDensities[settings.material as keyof typeof materialDensities] || 1.24
    const scaledVolume = modelData.volume * Math.pow(settings.scaleFactor, 3)
    const effectiveVolume = scaledVolume * (settings.infillPercentage / 100)
    const supportVolume = settings.supportsEnabled ? scaledVolume * 0.15 : 0
    const totalVolume = effectiveVolume + supportVolume

    const weight = totalVolume * density
    const layerCount = Math.ceil((modelData.boundingBox.max.z * settings.scaleFactor) / settings.layerHeight)

    // Estimate print time (simplified calculation)
    const baseTime = totalVolume * 2 + layerCount * 0.5 + modelData.surfaceArea * 0.1
    const speedFactor = 50 / settings.printSpeed
    const printTime = baseTime * speedFactor

    // Material cost calculation (₹ per gram)
    const materialCosts = { PLA: 2.5, ABS: 3.0, PETG: 4.0, TPU: 8.0, WOOD: 5.0 }
    const costPerGram = materialCosts[settings.material as keyof typeof materialCosts] || 2.5
    const materialCost = weight * costPerGram

    const results: AnalysisResultsType = {
      volume: scaledVolume,
      effectiveVolume,
      supportVolume,
      surfaceArea: modelData.surfaceArea * Math.pow(settings.scaleFactor, 2),
      weight,
      printTime,
      layerCount,
      materialCost,
    }

    setAnalysisResults(results)
    setIsAnalyzing(false)
    setActiveTab("results")
  }

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "upload":
        return <Upload className="h-4 w-4" />
      case "preview":
        return <Eye className="h-4 w-4" />
      case "settings":
        return <Settings className="h-4 w-4" />
      case "results":
        return <BarChart3 className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 md:p-3 rounded-full bg-primary/10">
              <BarChart3 className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
            {hasTouchScreen && (
              <Badge variant="secondary" className="text-xs">
                <Smartphone className="h-3 w-3 mr-1" />
                Touch Optimized
              </Badge>
            )}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">3D Model Analyzer</h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your 3D models and get detailed analysis for optimal printing results
          </p>
        </div>

        {/* Mobile-optimized Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full ${isMobile ? "grid-cols-2 h-auto p-1" : "grid-cols-4 h-12"} mb-6 md:mb-8`}>
            <TabsTrigger
              value="upload"
              className={`${isMobile ? "flex-col gap-1 py-3 px-2 text-xs" : "flex-row gap-2"}`}
              disabled={false}
            >
              {getTabIcon("upload")}
              <span>Upload</span>
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className={`${isMobile ? "flex-col gap-1 py-3 px-2 text-xs" : "flex-row gap-2"}`}
              disabled={!modelData}
            >
              {getTabIcon("preview")}
              <span>Preview</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className={`${isMobile ? "flex-col gap-1 py-3 px-2 text-xs" : "flex-row gap-2"}`}
              disabled={!modelData}
            >
              {getTabIcon("settings")}
              <span>Settings</span>
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className={`${isMobile ? "flex-col gap-1 py-3 px-2 text-xs" : "flex-row gap-2"}`}
              disabled={!analysisResults}
            >
              {getTabIcon("results")}
              <span>Results</span>
            </TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader className={`${isMobile ? "pb-3" : "pb-6"}`}>
                <CardTitle className={`${isMobile ? "text-lg" : "text-xl"}`}>Upload 3D Model</CardTitle>
                <CardDescription className="text-sm">
                  Support for STL files up to 50MB. Optimized for {isMobile ? "mobile" : "desktop"} upload.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUploader onFileUpload={handleFileUpload} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            {modelData && (
              <>
                <Card>
                  <CardHeader className={`${isMobile ? "pb-3" : "pb-6"}`}>
                    <CardTitle className={`${isMobile ? "text-lg" : "text-xl"}`}>3D Model Preview</CardTitle>
                    <CardDescription className="text-sm">
                      Interactive 3D visualization of your model.{" "}
                      {hasTouchScreen ? "Touch to rotate, pinch to zoom." : "Click and drag to rotate."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Simple3DRenderer modelData={modelData} compact={isMobile} />
                  </CardContent>
                </Card>

                {/* Model Info Card */}
                <Card>
                  <CardHeader className={`${isMobile ? "pb-3" : "pb-4"}`}>
                    <CardTitle className={`${isMobile ? "text-lg" : "text-xl"}`}>Model Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">File Name:</span>
                          <span className="text-sm font-medium truncate ml-2">{modelData.fileName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">File Size:</span>
                          <span className="text-sm font-medium">
                            {(modelData.fileSize / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Triangles:</span>
                          <span className="text-sm font-medium">{modelData.triangleCount?.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Volume:</span>
                          <span className="text-sm font-medium">{modelData.volume.toFixed(2)} cm³</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Surface Area:</span>
                          <span className="text-sm font-medium">{modelData.surfaceArea.toFixed(2)} cm²</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Dimensions:</span>
                          <span className="text-sm font-medium">
                            {modelData.boundingBox.max.x.toFixed(1)} × {modelData.boundingBox.max.y.toFixed(1)} ×{" "}
                            {modelData.boundingBox.max.z.toFixed(1)} mm
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            {modelData && (
              <div className={`grid ${isTablet ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"} gap-6`}>
                <PrintSettings
                  settings={settings}
                  onSettingsChange={setSettings}
                  onAnalyze={handleAnalyze}
                  isAnalyzing={isAnalyzing}
                  disabled={!modelData}
                />

                {!isMobile && (
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl">Live Preview</CardTitle>
                      <CardDescription className="text-sm">See how your settings affect the model</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Simple3DRenderer modelData={modelData} compact={true} />
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            {analysisResults && modelData && (
              <AnalysisResults results={analysisResults} settings={settings} modelData={modelData} />
            )}
          </TabsContent>
        </Tabs>

        {/* Performance indicator for low-end devices */}
        {isLowEndDevice && (
          <div className="mt-6">
            <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
                  <Smartphone className="h-4 w-4" />
                  <span className="text-sm font-medium">Performance Mode Active</span>
                </div>
                <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                  Optimized rendering for your device to ensure smooth performance.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
