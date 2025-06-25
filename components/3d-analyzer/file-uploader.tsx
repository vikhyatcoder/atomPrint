"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, File, CheckCircle, AlertCircle, X, Smartphone, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"
import type { ModelData } from "./types"

interface FileUploaderProps {
  onFileUpload: (modelData: ModelData) => void
}

export default function FileUploader({ onFileUpload }: FileUploaderProps) {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [processingStage, setProcessingStage] = useState<string>("")

  const isMobile = useMediaQuery("(max-width: 768px)")
  const { isLowEndDevice, hasTouchScreen } = useDeviceCapabilities()

  const parseSTLBinary = useCallback((buffer: ArrayBuffer) => {
    const view = new DataView(buffer)
    const triangleCount = view.getUint32(80, true)

    const vertices: number[] = []
    const normals: number[] = []

    let offset = 84

    for (let i = 0; i < triangleCount; i++) {
      // Read normal vector
      const nx = view.getFloat32(offset, true)
      const ny = view.getFloat32(offset + 4, true)
      const nz = view.getFloat32(offset + 8, true)
      offset += 12

      // Read vertices
      for (let j = 0; j < 3; j++) {
        const x = view.getFloat32(offset, true)
        const y = view.getFloat32(offset + 4, true)
        const z = view.getFloat32(offset + 8, true)

        vertices.push(x, y, z)
        normals.push(nx, ny, nz)

        offset += 12
      }

      offset += 2 // Skip attribute byte count
    }

    return { vertices: new Float32Array(vertices), normals: new Float32Array(normals), triangleCount }
  }, [])

  const parseSTLASCII = useCallback((text: string) => {
    const vertices: number[] = []
    const normals: number[] = []

    const lines = text.split("\n")
    let currentNormal = [0, 0, 0]
    let triangleCount = 0

    for (const line of lines) {
      const trimmed = line.trim()

      if (trimmed.startsWith("facet normal")) {
        const parts = trimmed.split(/\s+/)
        currentNormal = [Number.parseFloat(parts[2]), Number.parseFloat(parts[3]), Number.parseFloat(parts[4])]
      } else if (trimmed.startsWith("vertex")) {
        const parts = trimmed.split(/\s+/)
        vertices.push(Number.parseFloat(parts[1]), Number.parseFloat(parts[2]), Number.parseFloat(parts[3]))
        normals.push(currentNormal[0], currentNormal[1], currentNormal[2])

        if (vertices.length % 9 === 0) {
          triangleCount++
        }
      }
    }

    return { vertices: new Float32Array(vertices), normals: new Float32Array(normals), triangleCount }
  }, [])

  const calculateMeshVolume = useCallback((vertices: Float32Array): number => {
    let volume = 0

    for (let i = 0; i < vertices.length; i += 9) {
      const v1x = vertices[i],
        v1y = vertices[i + 1],
        v1z = vertices[i + 2]
      const v2x = vertices[i + 3],
        v2y = vertices[i + 4],
        v2z = vertices[i + 5]
      const v3x = vertices[i + 6],
        v3y = vertices[i + 7],
        v3z = vertices[i + 8]

      // Calculate signed volume of tetrahedron
      volume += (v1x * (v2y * v3z - v2z * v3y) + v1y * (v2z * v3x - v2x * v3z) + v1z * (v2x * v3y - v2y * v3x)) / 6
    }

    return Math.abs(volume) / 1000 // Convert mm³ to cm³
  }, [])

  const calculateSurfaceArea = useCallback((vertices: Float32Array): number => {
    let area = 0

    for (let i = 0; i < vertices.length; i += 9) {
      const v1x = vertices[i],
        v1y = vertices[i + 1],
        v1z = vertices[i + 2]
      const v2x = vertices[i + 3],
        v2y = vertices[i + 4],
        v2z = vertices[i + 5]
      const v3x = vertices[i + 6],
        v3y = vertices[i + 7],
        v3z = vertices[i + 8]

      // Calculate triangle area using cross product
      const edge1x = v2x - v1x,
        edge1y = v2y - v1y,
        edge1z = v2z - v1z
      const edge2x = v3x - v1x,
        edge2y = v3y - v1y,
        edge2z = v3z - v1z

      const crossX = edge1y * edge2z - edge1z * edge2y
      const crossY = edge1z * edge2x - edge1x * edge2z
      const crossZ = edge1x * edge2y - edge1y * edge2x

      area += Math.sqrt(crossX * crossX + crossY * crossY + crossZ * crossZ) / 2
    }

    return area / 100 // Convert mm² to cm²
  }, [])

  const processSTLFile = useCallback(
    async (file: File): Promise<ModelData> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = async (event) => {
          try {
            setProcessingStage("Reading file...")
            const buffer = event.target?.result as ArrayBuffer

            // Check if it's binary or ASCII STL
            const view = new Uint8Array(buffer)
            const header = new TextDecoder().decode(view.slice(0, 80))
            const isBinary = !header.toLowerCase().includes("solid")

            setProcessingStage("Parsing geometry...")
            let parseResult

            if (isBinary) {
              parseResult = parseSTLBinary(buffer)
            } else {
              const text = new TextDecoder().decode(buffer)
              parseResult = parseSTLASCII(text)
            }

            const { vertices, normals, triangleCount } = parseResult

            setProcessingStage("Calculating bounds...")
            // Calculate bounding box
            let minX = Number.POSITIVE_INFINITY,
              minY = Number.POSITIVE_INFINITY,
              minZ = Number.POSITIVE_INFINITY
            let maxX = Number.NEGATIVE_INFINITY,
              maxY = Number.NEGATIVE_INFINITY,
              maxZ = Number.NEGATIVE_INFINITY

            for (let i = 0; i < vertices.length; i += 3) {
              const x = vertices[i],
                y = vertices[i + 1],
                z = vertices[i + 2]
              minX = Math.min(minX, x)
              maxX = Math.max(maxX, x)
              minY = Math.min(minY, y)
              maxY = Math.max(maxY, y)
              minZ = Math.min(minZ, z)
              maxZ = Math.max(maxZ, z)
            }

            setProcessingStage("Computing volume...")
            // Calculate volume and surface area
            const volume = Math.max(calculateMeshVolume(vertices), 0.1)
            const surfaceArea = calculateSurfaceArea(vertices)

            setProcessingStage("Finalizing...")
            // Create a simple geometry object for Three.js
            const geometry = {
              vertices,
              normals,
              clone: () => geometry,
              computeVertexNormals: () => {},
            }

            const modelData: ModelData = {
              fileName: file.name,
              fileSize: file.size,
              volume,
              surfaceArea,
              triangleCount,
              boundingBox: {
                min: { x: minX, y: minY, z: minZ },
                max: { x: maxX, y: maxY, z: maxZ },
              },
              geometry,
              buffer,
            }

            resolve(modelData)
          } catch (err) {
            reject(new Error("Failed to parse STL file. Please ensure it's a valid STL file."))
          }
        }

        reader.onerror = () => {
          reject(new Error("Failed to read file"))
        }

        reader.readAsArrayBuffer(file)
      })
    },
    [parseSTLBinary, parseSTLASCII, calculateMeshVolume, calculateSurfaceArea],
  )

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      setError(null)
      setUploadedFile(file)
      setIsProcessing(true)
      setUploadProgress(0)
      setProcessingStage("Starting upload...")

      try {
        // Enhanced progress simulation with stages
        const stages = [
          { progress: 20, stage: "Uploading file..." },
          { progress: 40, stage: "Validating format..." },
          { progress: 60, stage: "Processing geometry..." },
          { progress: 80, stage: "Computing metrics..." },
          { progress: 95, stage: "Finalizing..." },
        ]

        for (const { progress, stage } of stages) {
          setUploadProgress(progress)
          setProcessingStage(stage)
          await new Promise((resolve) => setTimeout(resolve, isLowEndDevice ? 400 : 300))
        }

        const modelData = await processSTLFile(file)

        setUploadProgress(100)
        setProcessingStage("Complete!")

        setTimeout(() => {
          onFileUpload(modelData)
          setIsProcessing(false)
        }, 500)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while processing the file")
        setIsProcessing(false)
        setUploadProgress(0)
        setProcessingStage("")
      }
    },
    [processSTLFile, onFileUpload, isLowEndDevice],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/sla": [".stl"],
      "application/octet-stream": [".stl"],
      "model/stl": [".stl"],
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB
  })

  const removeFile = () => {
    setUploadedFile(null)
    setUploadProgress(0)
    setError(null)
    setProcessingStage("")
  }

  return (
    <div className="space-y-4">
      {/* Device capabilities indicator */}
      {(hasTouchScreen || isLowEndDevice) && (
        <div className="flex gap-2 mb-4">
          {hasTouchScreen && (
            <Badge variant="secondary" className="text-xs">
              <Smartphone className="h-3 w-3 mr-1" />
              Touch Optimized
            </Badge>
          )}
          {isLowEndDevice && (
            <Badge variant="outline" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              Performance Mode
            </Badge>
          )}
        </div>
      )}

      {/* Enhanced upload area */}
      <Card
        className={cn(
          "border-2 border-dashed transition-all duration-200",
          isDragActive ? "border-primary bg-primary/5 scale-[1.02]" : "border-muted-foreground/25",
          isProcessing && "pointer-events-none opacity-50",
        )}
      >
        <CardContent
          {...getRootProps()}
          className={cn("cursor-pointer text-center transition-colors", isMobile ? "p-6" : "p-8")}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center space-y-4">
            <div
              className={cn(
                "rounded-full transition-all duration-200",
                isMobile ? "p-4" : "p-6",
                isDragActive ? "bg-primary/20 scale-110" : "bg-muted",
              )}
            >
              <Upload
                className={cn(
                  "text-muted-foreground transition-all duration-200",
                  isMobile ? "h-8 w-8" : "h-10 w-10",
                  isDragActive && "text-primary scale-110",
                )}
              />
            </div>

            <div className="space-y-2">
              <h3
                className={cn(
                  "font-semibold transition-colors",
                  isMobile ? "text-lg" : "text-xl",
                  isDragActive && "text-primary",
                )}
              >
                {isDragActive ? "Drop your file here" : "Upload your 3D model"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {hasTouchScreen ? "Tap to browse files" : "Drag & drop or click to browse"}
              </p>
            </div>

            <Button
              variant={isDragActive ? "default" : "outline"}
              disabled={isProcessing}
              size={isMobile ? "default" : "lg"}
              className="transition-all duration-200"
            >
              <Upload className="mr-2 h-4 w-4" />
              Choose File
            </Button>

            <div className="text-center space-y-1">
              <p className="text-xs text-muted-foreground">Supports STL files up to 50MB</p>
              {isLowEndDevice && (
                <p className="text-xs text-orange-600">Large files may take longer to process on this device</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced file status */}
      {uploadedFile && (
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="p-2 rounded-full bg-primary/10">
                  <File className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{uploadedFile.name}</p>
                  <p className="text-xs text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>

              {!isProcessing && (
                <Button variant="ghost" size="sm" onClick={removeFile}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {isProcessing && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{processingStage}</span>
                    <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>

                {isMobile && (
                  <p className="text-xs text-muted-foreground text-center">
                    Processing may take a moment on mobile devices
                  </p>
                )}
              </div>
            )}

            {uploadProgress === 100 && !isProcessing && (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">File processed successfully!</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Enhanced error display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <div className="space-y-2">
              <p>{error}</p>
              {isMobile && (
                <p className="text-xs opacity-80">
                  Try using a smaller file or ensure your device has sufficient memory.
                </p>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
