"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, ZoomIn, ZoomOut, Move3D, Maximize2, Minimize2, Play, Pause } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"
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
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 })
  const [autoRotate, setAutoRotate] = useState(true)
  const [lastPinchDistance, setLastPinchDistance] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [renderQuality, setRenderQuality] = useState<"high" | "medium" | "low">("high")

  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")
  const { isLowEndDevice, hasTouchScreen } = useDeviceCapabilities()

  // Adaptive quality based on device capabilities
  useEffect(() => {
    if (isLowEndDevice) {
      setRenderQuality("low")
    } else if (isMobile) {
      setRenderQuality("medium")
    } else {
      setRenderQuality("high")
    }
  }, [isLowEndDevice, isMobile])

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

    // Clear canvas with adaptive gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    if (isFullscreen) {
      gradient.addColorStop(0, "#0f172a")
      gradient.addColorStop(1, "#1e293b")
    } else {
      gradient.addColorStop(0, "#f8fafc")
      gradient.addColorStop(1, "#e2e8f0")
    }
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

    const scale = (Math.min(width, height) * 0.35) / maxDim

    // Adaptive triangle rendering based on quality
    const qualitySettings = {
      high: { step: 1, maxTriangles: 8000, lineWidth: 0.5 },
      medium: { step: 2, maxTriangles: 3000, lineWidth: 0.8 },
      low: { step: 4, maxTriangles: 1000, lineWidth: 1.2 },
    }

    const { step: triangleStep, maxTriangles, lineWidth } = qualitySettings[renderQuality]

    // Collect triangles with depth for sorting
    const triangles: Array<{
      points: Array<{ x: number; y: number; z: number }>
      avgZ: number
    }> = []

    for (let i = 0; i < vertices.length && triangles.length < maxTriangles; i += 9 * triangleStep) {
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

    // Render triangles with enhanced mobile-friendly styling
    triangles.forEach((triangle, index) => {
      const { points } = triangle

      // Enhanced lighting calculation
      const lightIntensity = 0.4 + 0.6 * Math.sin(index * 0.008 + rotation.y)
      const alpha = Math.max(0.15, Math.min(0.9, lightIntensity))

      // Fill triangle with gradient effect
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      ctx.lineTo(points[1].x, points[1].y)
      ctx.lineTo(points[2].x, points[2].y)
      ctx.closePath()

      // Adaptive colors based on fullscreen mode
      const baseColor = isFullscreen ? [0, 255, 136] : [0, 200, 120]
      ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${alpha * 0.4})`
      ctx.fill()

      // Enhanced wireframe with better visibility
      ctx.strokeStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${alpha * 0.8})`
      ctx.lineWidth = lineWidth
      ctx.stroke()
    })

    // Enhanced info overlay with better mobile design
    const overlayWidth = isMobile ? 180 : 220
    const overlayHeight = isMobile ? 70 : 85
    const fontSize = isMobile ? 11 : 13
    const padding = isMobile ? 8 : 12

    // Rounded overlay background
    ctx.fillStyle = isFullscreen ? "rgba(15, 23, 42, 0.9)" : "rgba(0, 0, 0, 0.8)"
    ctx.beginPath()
    ctx.roundRect(padding, padding, overlayWidth, overlayHeight, 8)
    ctx.fill()

    // Info text with better spacing
    ctx.fillStyle = isFullscreen ? "#e2e8f0" : "white"
    ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, sans-serif`

    const lineHeight = fontSize + 4
    ctx.fillText(`Triangles: ${modelData.triangleCount?.toLocaleString()}`, padding + 8, padding + lineHeight)
    ctx.fillText(`Volume: ${modelData.volume.toFixed(2)} cm³`, padding + 8, padding + lineHeight * 2)

    if (!isMobile || isFullscreen) {
      ctx.fillText(`Quality: ${renderQuality.toUpperCase()}`, padding + 8, padding + lineHeight * 3)
      ctx.fillText(`Zoom: ${(zoom * 100).toFixed(0)}%`, padding + 8, padding + lineHeight * 4)
    }
  }, [modelData, project3D, isMobile, isFullscreen, renderQuality, rotation.y, zoom])

  // Optimized animation loop with frame rate control
  useEffect(() => {
    let lastFrameTime = 0
    const targetFPS = isLowEndDevice ? 30 : isMobile ? 45 : 60
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number) => {
      if (currentTime - lastFrameTime >= frameInterval) {
        if (autoRotate && !isDragging) {
          setRotation((prev) => ({
            ...prev,
            y: prev.y + (isLowEndDevice ? 0.003 : 0.005),
          }))
        }
        render()
        lastFrameTime = currentTime
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [render, autoRotate, isDragging, isLowEndDevice])

  // Enhanced touch event handlers with better gesture recognition
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    setAutoRotate(false)

    if (e.touches.length === 1) {
      setIsDragging(true)
      setLastTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    } else if (e.touches.length === 2) {
      // Pinch to zoom
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2),
      )
      setLastPinchDistance(distance)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()

    if (e.touches.length === 1 && isDragging) {
      const deltaX = e.touches[0].clientX - lastTouch.x
      const deltaY = e.touches[0].clientY - lastTouch.y

      // Enhanced sensitivity for mobile
      const sensitivity = isMobile ? 0.012 : 0.01
      setRotation((prev) => ({
        ...prev,
        x: Math.max(-Math.PI / 2, Math.min(Math.PI / 2, prev.x + deltaY * sensitivity)),
        y: prev.y + deltaX * sensitivity,
      }))

      setLastTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    } else if (e.touches.length === 2) {
      // Enhanced pinch to zoom
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2),
      )

      if (lastPinchDistance > 0) {
        const scale = distance / lastPinchDistance
        const newZoom = zoom * scale
        setZoom(Math.max(0.2, Math.min(8, newZoom)))
      }

      setLastPinchDistance(distance)
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(false)
    setLastPinchDistance(0)

    // Resume auto-rotation after interaction
    setTimeout(() => setAutoRotate(true), 3000)
  }

  // Enhanced mouse event handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setAutoRotate(false)
    setLastTouch({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - lastTouch.x
    const deltaY = e.clientY - lastTouch.y

    setRotation((prev) => ({
      ...prev,
      x: Math.max(-Math.PI / 2, Math.min(Math.PI / 2, prev.x + deltaY * 0.01)),
      y: prev.y + deltaX * 0.01,
    }))

    setLastTouch({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setTimeout(() => setAutoRotate(true), 2000)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setZoom((prev) => Math.max(0.2, Math.min(8, prev * delta)))
  }

  const resetView = () => {
    setRotation({ x: 0.3, y: 0.3, z: 0 })
    setZoom(1)
    setAutoRotate(true)
  }

  const zoomIn = () => {
    setZoom((prev) => Math.min(8, prev * 1.3))
  }

  const zoomOut = () => {
    setZoom((prev) => Math.max(0.2, prev * 0.7))
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate)
  }

  const canvasHeight = isFullscreen ? window.innerHeight - 100 : compact ? (isMobile ? 280 : 320) : isMobile ? 350 : 500

  const canvasWidth = isFullscreen ? window.innerWidth - 40 : isMobile ? 700 : 900

  return (
    <Card className={`relative overflow-hidden ${isFullscreen ? "fixed inset-4 z-50 bg-slate-900" : ""}`}>
      <CardContent className="p-0 relative">
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className={`w-full rounded-lg border-0 touch-none ${
            isFullscreen
              ? "bg-slate-900"
              : "bg-gradient-to-b from-slate-50 to-slate-200 dark:from-slate-800 dark:to-slate-900"
          }`}
          style={{ height: canvasHeight }}
          // Touch events
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          // Mouse events (for desktop)
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        />

        {/* Enhanced Control Panel */}
        <div
          className={`absolute ${isMobile ? "top-2 right-2" : "top-4 right-4"} flex ${
            isMobile ? "flex-row gap-1" : "flex-col gap-2"
          } z-10`}
        >
          <Button
            size={isMobile ? "sm" : "sm"}
            variant="secondary"
            onClick={resetView}
            title="Reset View"
            className="bg-white/90 hover:bg-white shadow-lg"
          >
            <RotateCcw className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
          </Button>
          <Button
            size={isMobile ? "sm" : "sm"}
            variant="secondary"
            onClick={zoomIn}
            title="Zoom In"
            className="bg-white/90 hover:bg-white shadow-lg"
          >
            <ZoomIn className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
          </Button>
          <Button
            size={isMobile ? "sm" : "sm"}
            variant="secondary"
            onClick={zoomOut}
            title="Zoom Out"
            className="bg-white/90 hover:bg-white shadow-lg"
          >
            <ZoomOut className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
          </Button>
          {!compact && (
            <>
              <Button
                size={isMobile ? "sm" : "sm"}
                variant="secondary"
                onClick={toggleAutoRotate}
                title={autoRotate ? "Pause Rotation" : "Start Rotation"}
                className="bg-white/90 hover:bg-white shadow-lg"
              >
                {autoRotate ? (
                  <Pause className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
                ) : (
                  <Play className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
                )}
              </Button>
              <Button
                size={isMobile ? "sm" : "sm"}
                variant="secondary"
                onClick={toggleFullscreen}
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                className="bg-white/90 hover:bg-white shadow-lg"
              >
                {isFullscreen ? (
                  <Minimize2 className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
                ) : (
                  <Maximize2 className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
                )}
              </Button>
            </>
          )}
        </div>

        {/* Enhanced Status Bar */}
        <div
          className={`absolute bottom-2 left-2 right-2 flex ${
            isMobile ? "flex-col gap-2" : "flex-row justify-between items-center"
          }`}
        >
          <div
            className={`bg-black/60 text-white px-3 py-2 rounded-lg backdrop-blur-sm ${
              isMobile ? "text-xs" : "text-sm"
            }`}
          >
            <div className="flex items-center gap-2">
              <Move3D className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
              <span>
                {hasTouchScreen ? "Touch to rotate • Pinch to zoom" : "Click and drag to rotate • Scroll to zoom"}
              </span>
            </div>
          </div>

          {!isMobile && (
            <div className="flex gap-2">
              <Badge variant="secondary" className="text-xs">
                Quality: {renderQuality.toUpperCase()}
              </Badge>
              {autoRotate && (
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                  Auto-rotating
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Mobile-specific quality indicator */}
        {isMobile && (
          <div className="absolute top-2 left-2">
            <Badge
              variant={renderQuality === "low" ? "destructive" : renderQuality === "medium" ? "default" : "secondary"}
              className="text-xs"
            >
              {renderQuality.toUpperCase()}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
