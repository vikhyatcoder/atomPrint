"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Upload, Eye, Calculator, Settings } from "lucide-react"
import FileUploader from "./file-uploader"
import ModelViewer from "./simple-3d-renderer"
import PrintSettings from "./print-settings"
import AnalysisResults from "./analysis-results"
import { useMediaQuery } from "@/hooks/use-media-query"
import type { ModelData, PrintSettings as PrintSettingsType, AnalysisResults as AnalysisResultsType } from "./types"

export default function ModelAnalyzer() {
  const [modelData, setModelData] = useState<ModelData | null>(null)
  const [printSettings, setPrintSettings] = useState<PrintSettingsType>({
    material: "PLA",
    infillPercentage: 20,
    supportsEnabled: false,
    layerHeight: 0.2,
    printSpeed: 50,
    scaleFactor: 1.0,
  })
  const [analysisResults, setAnalysisResults] = useState<AnalysisResultsType | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleFileUpload = useCallback((data: ModelData) => {
    setModelData(data)
    setAnalysisResults(null)
    setActiveTab("viewer")
  }, [])

  const handleAnalyze = useCallback(async () => {
    if (!modelData) return

    setIsAnalyzing(true)

    // Simulate analysis delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Calculate analysis results
    const results = calculateAnalysis(modelData, printSettings)
    setAnalysisResults(results)
    setIsAnalyzing(false)
    setActiveTab("analysis")
  }, [modelData, printSettings])

  const calculateAnalysis = (model: ModelData, settings: PrintSettingsType): AnalysisResultsType => {
    // Material densities (g/cm³)
    const materialDensities = {
      PLA: 1.24,
      ABS: 1.04,
      PETG: 1.27,
      TPU: 1.2,
      WOOD: 1.28,
    }

    // Apply scale factor to volume (volume scales with cube of linear scale)
    const scaledVolume = model.volume * Math.pow(settings.scaleFactor, 3)
    const scaledSurfaceArea = (model.surfaceArea || 0) * Math.pow(settings.scaleFactor, 2)

    // Calculate effective volume based on infill
    const solidVolume = scaledVolume * (settings.infillPercentage / 100)
    const shellVolume = scaledVolume * 0.15 // Approximate shell volume (15% of total)
    const effectiveVolume = solidVolume + shellVolume

    // Add support volume if enabled
    const supportVolume = settings.supportsEnabled ? scaledVolume * 0.05 : 0 // 5% of model volume
    const totalVolume = effectiveVolume + supportVolume

    // Calculate weight
    const density = materialDensities[settings.material as keyof typeof materialDensities]
    const weight = totalVolume * density

    // Calculate print time (simplified formula) - larger models take longer
    const baseTimePerCm3 = 30 // minutes per cm³ at standard settings
    const infillFactor = 0.5 + settings.infillPercentage / 200 // 0.5 to 1.0
    const supportFactor = settings.supportsEnabled ? 1.3 : 1.0
    const layerHeightFactor = 0.2 / settings.layerHeight // normalized to 0.2mm
    const speedFactor = 50 / settings.printSpeed // normalized to 50mm/s
    const scaleFactor = Math.pow(settings.scaleFactor, 2.5) // Print time scales more than linearly

    const printTimeMinutes =
      scaledVolume * baseTimePerCm3 * infillFactor * supportFactor * layerHeightFactor * speedFactor * scaleFactor

    // Calculate material cost (approximate)
    const costPerGram = {
      PLA: 5.0,
      ABS: 0.023,
      PETG: 0.03,
      TPU: 0.045,
      WOOD: 0.035,
    }
    const materialCost = weight * costPerGram[settings.material as keyof typeof costPerGram]

    // Calculate scaled layer count
    const scaledHeight = model.boundingBox.max.z * settings.scaleFactor
    const layerCount = Math.ceil(scaledHeight / settings.layerHeight)

    return {
      volume: scaledVolume, // Return scaled volume
      effectiveVolume: totalVolume,
      weight,
      printTime: printTimeMinutes,
      materialCost,
      surfaceArea: scaledSurfaceArea,
      supportVolume,
      layerCount,
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">3D Model Analyzer</h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Upload your 3D model, configure print settings, and get detailed analysis for optimal 3D printing results.
          </p>
        </div>

        <Alert className="mb-4 md:mb-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertDescription className="text-blue-800 dark:text-blue-200 text-sm">
            <strong>How it works:</strong> Upload your STL file, configure your print settings, then analyze to get
            detailed information about print time, material usage, and costs.
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
          <TabsList className={`grid w-full ${isMobile ? "grid-cols-2" : "grid-cols-4"} gap-1`}>
            <TabsTrigger value="upload" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
              <Upload className="h-3 w-3 md:h-4 md:w-4" />
              {!isMobile && "Upload"}
            </TabsTrigger>
            <TabsTrigger
              value="viewer"
              disabled={!modelData}
              className="flex items-center gap-1 md:gap-2 text-xs md:text-sm"
            >
              <Eye className="h-3 w-3 md:h-4 md:w-4" />
              {!isMobile && "Viewer"}
            </TabsTrigger>
            {isMobile ? (
              <TabsTrigger value="settings" disabled={!modelData} className="flex items-center gap-1 text-xs">
                <Settings className="h-3 w-3" />
              </TabsTrigger>
            ) : (
              <TabsTrigger value="settings" disabled={!modelData} className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            )}
            <TabsTrigger
              value="analysis"
              disabled={!analysisResults}
              className="flex items-center gap-1 md:gap-2 text-xs md:text-sm"
            >
              <Calculator className="h-3 w-3 md:h-4 md:w-4" />
              {!isMobile && "Analysis"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg md:text-xl">Upload 3D Model</CardTitle>
                <CardDescription className="text-sm">
                  Upload your STL file to begin analysis. Maximum file size: 50MB.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUploader onFileUpload={handleFileUpload} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="viewer" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg md:text-xl">3D Model Viewer</CardTitle>
                    <CardDescription className="text-sm">
                      {isMobile
                        ? "Touch to rotate, pinch to zoom"
                        : "Interact with your model: rotate, zoom, and pan to inspect all angles."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 md:p-6">{modelData && <ModelViewer modelData={modelData} />}</CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg md:text-xl">Model Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {modelData && (
                      <>
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">File Name:</span>
                          <p className="font-medium text-sm md:text-base break-all">{modelData.fileName}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">File Size:</span>
                          <p className="font-medium">{(modelData.fileSize / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Triangles:</span>
                          <p className="font-medium">{modelData.triangleCount?.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Dimensions (mm):</span>
                          <p className="font-medium text-sm">
                            {modelData.boundingBox.max.x.toFixed(1)} × {modelData.boundingBox.max.y.toFixed(1)} ×{" "}
                            {modelData.boundingBox.max.z.toFixed(1)}
                          </p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <PrintSettings
                settings={printSettings}
                onSettingsChange={setPrintSettings}
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
                disabled={!modelData}
              />
              {!isMobile && (
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg">Preview</CardTitle>
                      <CardDescription className="text-sm">
                        Live preview of your model with current settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {modelData && (
                        <div className="h-64">
                          <ModelViewer modelData={modelData} compact />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4 md:space-y-6">
            {analysisResults && (
              <AnalysisResults results={analysisResults} settings={printSettings} modelData={modelData!} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
