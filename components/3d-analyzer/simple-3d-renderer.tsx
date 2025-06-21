"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, ZoomIn, ZoomOut, Move3D } from "lucide-react"
import type { ModelData } from "./types"

interface Simple3DRendererProps {
  modelData: ModelData
  compact?: boolean
}

export default function Simple3DRenderer({ modelData, compact = false }: Simple3DRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [rotation, setRotation] = useState({ x: 0.3, y: 0.3, z: 0 })
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 })
  const [autoRotate, setAutoRotate] = useState(true)

  const project3D = useCallback(
    (x: number, y: number, z: number, width: number, height: number) => {
      // Apply rotation
      const cosX = Math.cos(rotation.x)
      const sinX = Math.sin(rotation.x)
      const cosY = Math.cos(rotation.y)
      const sinY = Math.sin(rotation.y)
      const cosZ = Math.cos(rotation.z)
      const sinZ = Math.sin(rotation.z)

      // Rotate around Y axis
      let rotX = x * cosY - z * sinY
      let rotZ = x * sinY + z * cosY
      let rotY = y

      // Rotate around X axis
      const tempY = rotY * cosX - rotZ * sinX
      rotZ = rotY * sinX + rotZ * cosX
      rotY = tempY

      // Rotate around Z axis
      const tempX = rotX * cosZ - rotY * sinZ
      rotY = rotX * sinZ + rotY * cosZ
      rotX = tempX

      // Apply perspective projection
      const distance = 500
      const perspective = distance / (distance + rotZ)

      return {
        x: width / 2 + rotX * zoom * perspective,
        y: height / 2 - rotY * zoom * perspective,
        z: rotZ,
      }
    },
    [rotation, zoom],
  )

  const render = useCallback(() => {
    if (!canvasRef.current || !modelData.geometry) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, "#f8fafc")
    gradient.addColorStop(1, "#e2e8f0")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    const vertices = modelData.geometry.vertices
    if (!vertices || vertices.length === 0) return

    // Calculate model bounds and center
    const bounds = modelData.boundingBox
    const centerX = (bounds.min.x + bounds.max.x) / 2
    const centerY = (bounds.min.y + bounds.max.y) / 2
    const centerZ = (bounds.min.z + bounds.max.z) / 2

    const modelWidth = bounds.max.x - bounds.min.x
    const modelHeight = bounds.max.y - bounds.min.y
    const modelDepth = bounds.max.z - bounds.min.z
    const maxDim = Math.max(modelWidth, modelHeight, modelDepth)

    const scale = (Math.min(width, height) * 0.3) / maxDim

    // Collect triangles with depth for sorting
    const triangles: Array<{
      points: Array<{ x: number; y: number; z: number }>
      avgZ: number
    }> = []

    for (let i = 0; i < vertices.length; i += 9) {
      const points = []
      let avgZ = 0

      for (let j = 0; j < 3; j++) {
        const x = (vertices[i + j * 3] - centerX) * scale
        const y = (vertices[i + j * 3 + 1] - centerY) * scale
        const z = (vertices[i + j * 3 + 2] - centerZ) * scale

        const projected = project3D(x, y, z, width, height)
        points.push(projected)
        avgZ += projected.z
      }

      triangles.push({
        points,
        avgZ: avgZ / 3,
      })
    }

    // Sort triangles by depth (back to front)
    triangles.sort((a, b) => a.avgZ - b.avgZ)

    // Render triangles
    triangles.forEach((triangle, index) => {
      const { points } = triangle

      // Calculate lighting based on normal (simplified)
      const lightIntensity = 0.5 + 0.5 * Math.sin(index * 0.01)
      const alpha = Math.max(0.1, Math.min(0.8, lightIntensity))

      // Fill triangle
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      ctx.lineTo(points[1].x, points[1].y)
      ctx.lineTo(points[2].x, points[2].y)
      ctx.closePath()

      ctx.fillStyle = `rgba(0, 255, 136, ${alpha * 0.3})`
      ctx.fill()

      // Draw wireframe
      ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`
      ctx.lineWidth = 0.5
      ctx.stroke()
    })

    // Draw info overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
    ctx.fillRect(10, 10, 200, 75) // Increase height for additional info

    ctx.fillStyle = "white"
    ctx.font = "12px sans-serif"
    ctx.fillText(`Triangles: ${modelData.triangleCount?.toLocaleString()}`, 15, 25)
    ctx.fillText(`Volume: ${modelData.volume.toFixed(2)} cm³`, 15, 40)
    ctx.fillText(`Zoom: ${(zoom * 100).toFixed(0)}%`, 15, 55)
    ctx.fillText(`Scale: 100%`, 15, 70) // Add scale info
  }, [modelData, project3D])

  // Animation loop
  useEffect(() => {
    const animate = () => {
      if (autoRotate && !isDragging) {
        setRotation((prev) => ({
          ...prev,
          y: prev.y + 0.005,
        }))
      }
      render()
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [render, autoRotate, isDragging])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setAutoRotate(false)
    setLastMouse({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - lastMouse.x
    const deltaY = e.clientY - lastMouse.y

    setRotation((prev) => ({
      ...prev,
      x: prev.x + deltaY * 0.01,
      y: prev.y + deltaX * 0.01,
    }))

    setLastMouse({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setTimeout(() => setAutoRotate(true), 2000) // Resume auto-rotation after 2 seconds
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setZoom((prev) => Math.max(0.1, Math.min(5, prev * delta)))
  }

  const resetView = () => {
    setRotation({ x: 0.3, y: 0.3, z: 0 })
    setZoom(1)
    setAutoRotate(true)
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
        className="w-full rounded-lg border bg-gradient-to-b from-slate-50 to-slate-200 dark:from-slate-800 dark:to-slate-900 cursor-grab active:cursor-grabbing"
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
          <span>Click and drag to rotate • Scroll to zoom • Auto-rotating</span>
        </div>
      </div>
    </div>
  )
}
