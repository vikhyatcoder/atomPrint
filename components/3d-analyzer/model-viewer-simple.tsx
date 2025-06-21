"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, ZoomIn, ZoomOut, Move3D } from "lucide-react"
import type { ModelData } from "./types"

interface ModelViewerProps {
  modelData: ModelData
  compact?: boolean
}

export default function ModelViewer({ modelData, compact = false }: ModelViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!canvasRef.current || !modelData.geometry) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = "#f5f5f5"
    ctx.fillRect(0, 0, width, height)

    // Simple wireframe rendering
    const vertices = modelData.geometry.vertices
    const centerX = width / 2
    const centerY = height / 2

    // Calculate model center and scale
    const bounds = modelData.boundingBox
    const modelWidth = bounds.max.x - bounds.min.x
    const modelHeight = bounds.max.y - bounds.min.y
    const maxDim = Math.max(modelWidth, modelHeight)
    const scale = (Math.min(width, height) * 0.4 * zoom) / maxDim

    ctx.strokeStyle = "#00ff88"
    ctx.lineWidth = 1

    // Simple 2D projection with rotation
    const cosX = Math.cos(rotation.x)
    const sinX = Math.sin(rotation.x)
    const cosY = Math.cos(rotation.y)
    const sinY = Math.sin(rotation.y)

    for (let i = 0; i < vertices.length; i += 9) {
      ctx.beginPath()

      for (let j = 0; j < 3; j++) {
        const x = vertices[i + j * 3] - (bounds.min.x + bounds.max.x) / 2
        const y = vertices[i + j * 3 + 1] - (bounds.min.y + bounds.max.y) / 2
        const z = vertices[i + j * 3 + 2] - (bounds.min.z + bounds.max.z) / 2

        // Apply rotation
        const rotatedX = x * cosY - z * sinY
        const rotatedZ = x * sinY + z * cosY
        const rotatedY = y * cosX - rotatedZ * sinX

        const screenX = centerX + rotatedX * scale
        const screenY = centerY - rotatedY * scale

        if (j === 0) {
          ctx.moveTo(screenX, screenY)
        } else {
          ctx.lineTo(screenX, screenY)
        }
      }

      ctx.closePath()
      ctx.stroke()
    }

    // Draw info
    ctx.fillStyle = "#666"
    ctx.font = "12px sans-serif"
    ctx.fillText(`Triangles: ${modelData.triangleCount?.toLocaleString()}`, 10, 20)
    ctx.fillText(`Volume: ${modelData.volume.toFixed(2)} cm³`, 10, 35)
  }, [modelData, rotation, zoom])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setLastMouse({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - lastMouse.x
    const deltaY = e.clientY - lastMouse.y

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.01,
      y: prev.y + deltaX * 0.01,
    }))

    setLastMouse({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setZoom((prev) => Math.max(0.1, Math.min(5, prev * delta)))
  }

  const resetView = () => {
    setRotation({ x: 0, y: 0 })
    setZoom(1)
  }

  const zoomIn = () => {
    setZoom((prev) => Math.min(5, prev * 1.2))
  }

  const zoomOut = () => {
    setZoom((prev) => Math.max(0.1, prev * 0.8))
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={compact ? 300 : 500}
        className="w-full rounded-lg border bg-gray-50 dark:bg-gray-900 cursor-grab active:cursor-grabbing"
        style={{ height: compact ? 300 : 500 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />

      {!compact && (
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button size="sm" variant="secondary" onClick={resetView} title="Reset View">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="secondary" onClick={zoomIn} title="Zoom In">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="secondary" onClick={zoomOut} title="Zoom Out">
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
        <div className="flex items-center gap-2">
          <Move3D className="h-3 w-3" />
          <span>Click and drag to rotate • Scroll to zoom</span>
        </div>
      </div>
    </div>
  )
}
