"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  allowedTypes?: string[]
  maxSizeMB?: number
  multiple?: boolean
  onFilesSelected?: (files: File[]) => void
  className?: string
}

export default function FileUpload({
  allowedTypes = ["image/*", ".stl", ".obj", ".3mf"],
  maxSizeMB = 50,
  multiple = false,
  onFilesSelected,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [uploadStatus, setUploadStatus] = useState<Record<string, "pending" | "uploading" | "success" | "error">>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (newFiles: File[]) => {
    // Filter files by allowed types and size
    const validFiles = newFiles.filter((file) => {
      const fileType = file.type
      const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`
      const isValidType = allowedTypes.some((type) => {
        if (type.startsWith(".")) {
          return fileExtension === type.toLowerCase()
        } else {
          return fileType.match(new RegExp(type.replace("*", ".*")))
        }
      })

      const isValidSize = file.size <= maxSizeMB * 1024 * 1024

      if (!isValidType) {
        console.warn(`File type not allowed: ${file.name}`)
      }

      if (!isValidSize) {
        console.warn(`File too large: ${file.name}`)
      }

      return isValidType && isValidSize
    })

    if (validFiles.length === 0) return

    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles
    setFiles(updatedFiles)

    // Initialize upload status and progress for new files
    const newUploadStatus: Record<string, "pending" | "uploading" | "success" | "error"> = {}
    const newUploadProgress: Record<string, number> = {}

    validFiles.forEach((file) => {
      const fileId = `${file.name}-${Date.now()}`
      newUploadStatus[fileId] = "pending"
      newUploadProgress[fileId] = 0

      // Simulate upload
      simulateUpload(file, fileId)
    })

    setUploadStatus((prev) => ({ ...prev, ...newUploadStatus }))
    setUploadProgress((prev) => ({ ...prev, ...newUploadProgress }))

    if (onFilesSelected) {
      onFilesSelected(updatedFiles)
    }
  }

  const simulateUpload = (file: File, fileId: string) => {
    setUploadStatus((prev) => ({ ...prev, [fileId]: "uploading" }))

    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 10
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setUploadStatus((prev) => ({ ...prev, [fileId]: "success" }))
      }
      setUploadProgress((prev) => ({ ...prev, [fileId]: Math.min(progress, 100) }))
    }, 300)
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)

    if (onFilesSelected) {
      onFilesSelected(newFiles)
    }
  }

  const getFileIcon = (file: File) => {
    const fileType = file.type
    if (fileType.startsWith("image/")) {
      return URL.createObjectURL(file)
    }
    return null
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const getFileId = (file: File, index: number) => `${file.name}-${index}`

  return (
    <div className={className}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20",
          "cursor-pointer",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          multiple={multiple}
          accept={allowedTypes.join(",")}
          className="hidden"
        />

        <div className="text-center">
          <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-1">Drag and drop your files here</p>
          <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              fileInputRef.current?.click()
            }}
          >
            Select Files
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Max file size: {maxSizeMB}MB. Supported formats: {allowedTypes.join(", ")}
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="font-medium">Uploaded Files</h3>
          <div className="space-y-3">
            {files.map((file, index) => {
              const fileId = getFileId(file, index)
              const status = uploadStatus[fileId] || "pending"
              const progress = uploadProgress[fileId] || 0
              const fileIcon = getFileIcon(file)

              return (
                <Card key={fileId} className="overflow-hidden">
                  <CardContent className="p-3">
                    <div className="flex items-center">
                      <div className="h-12 w-12 mr-3 flex-shrink-0 bg-muted rounded flex items-center justify-center overflow-hidden">
                        {fileIcon ? (
                          <img
                            src={fileIcon || "/placeholder.svg"}
                            alt={file.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <FileText className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>

                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="truncate pr-2">
                            <p className="font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 flex-shrink-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeFile(index)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="mt-2">
                          <Progress value={progress} className="h-1" />
                        </div>

                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-muted-foreground">
                            {status === "uploading" && `Uploading... ${Math.round(progress)}%`}
                            {status === "success" && "Upload complete"}
                            {status === "error" && "Upload failed"}
                            {status === "pending" && "Waiting to upload"}
                          </span>

                          {status === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
                          {status === "error" && <AlertCircle className="h-4 w-4 text-red-500" />}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
