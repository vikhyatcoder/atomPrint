"use client"

import { useState, useEffect, useCallback } from "react"

interface PerformanceMetrics {
  fps: number
  memory: number | null
  cpuUsage: number | null
  isLowPerformance: boolean
}

export function usePerformanceMonitor(sampleInterval = 1000): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: null,
    cpuUsage: null,
    isLowPerformance: false,
  })

  const measurePerformance = useCallback(() => {
    let frameCount = 0
    const lastTime = performance.now()
    let animFrameId: number

    // Memory usage (Chrome only)
    let memory: number | null = null
    // @ts-ignore
    if (performance.memory) {
      // @ts-ignore
      memory = performance.memory.usedJSHeapSize / (1024 * 1024) // MB
    }

    const countFrame = () => {
      frameCount++
      animFrameId = requestAnimationFrame(countFrame)
    }

    animFrameId = requestAnimationFrame(countFrame)

    // Measure FPS after interval
    const timerId = setTimeout(() => {
      cancelAnimationFrame(animFrameId)
      const now = performance.now()
      const elapsed = now - lastTime
      const fps = Math.round((frameCount / elapsed) * 1000)

      // Determine if performance is low
      const isLowPerformance = fps < 30 || (memory !== null && memory > 300)

      setMetrics({
        fps,
        memory,
        cpuUsage: null, // Not directly measurable in browser
        isLowPerformance,
      })
    }, sampleInterval)

    return () => {
      clearTimeout(timerId)
      cancelAnimationFrame(animFrameId)
    }
  }, [sampleInterval])

  useEffect(() => {
    // Only measure in production or with query param
    if (process.env.NODE_ENV === "production" || window.location.search.includes("perf=1")) {
      return measurePerformance()
    }
  }, [measurePerformance])

  return metrics
}
