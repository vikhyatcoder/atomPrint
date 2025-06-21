"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, File, CheckCircle, AlertCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ModelData } from "./types"

interface FileUploaderProps {
  onFileUpload: (modelData: ModelData) => void
}

declare global {
  interface Window {
    THREE: any
  }
}

export default function FileUploader({ onFileUpload }: FileUploaderProps) {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

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
            const buffer = event.target?.result as ArrayBuffer

            // Check if it's binary or ASCII STL
            const view = new Uint8Array(buffer)
            const header = new TextDecoder().decode(view.slice(0, 80))
            const isBinary = !header.toLowerCase().includes("solid")

            let parseResult

            if (isBinary) {
              parseResult = parseSTLBinary(buffer)
            } else {
              const text = new TextDecoder().decode(buffer)
              parseResult = parseSTLASCII(text)
            }

            const { vertices, normals, triangleCount } = parseResult

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

            // Calculate volume and surface area
            const volume = Math.max(calculateMeshVolume(vertices), 0.1)
            const surfaceArea = calculateSurfaceArea(vertices)

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

      try {
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return 90
            }
            return prev + 10
          })
        }, 200)

        const modelData = await processSTLFile(file)

        clearInterval(progressInterval)
        setUploadProgress(100)

        setTimeout(() => {
          onFileUpload(modelData)
          setIsProcessing(false)
        }, 500)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while processing the file")
        setIsProcessing(false)
        setUploadProgress(0)
      }
    },
    [processSTLFile, onFileUpload],
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
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          isProcessing && "pointer-events-none opacity-50",
        )}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 rounded-full bg-muted">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>

          <div>
            <p className="text-lg font-medium">{isDragActive ? "Drop your file here" : "Drag & drop your 3D model"}</p>
            <p className="text-sm text-muted-foreground mt-1">or click to browse files</p>
          </div>

          <Button variant="outline" disabled={isProcessing}>
            Choose File
          </Button>

          <p className="text-xs text-muted-foreground">Supports STL files up to 50MB</p>
        </div>
      </div>

      {uploadedFile && (
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <File className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{uploadedFile.name}</span>
              <span className="text-xs text-muted-foreground">({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
            </div>

            {!isProcessing && (
              <Button variant="ghost" size="sm" onClick={removeFile}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {isProcessing && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {uploadProgress < 90 ? "Uploading..." : "Processing 3D model..."}
              </p>
            </div>
          )}

          {uploadProgress === 100 && !isProcessing && (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">File processed successfully!</span>
            </div>
          )}
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
