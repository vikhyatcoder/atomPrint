"use client"

import { useState, useEffect } from "react"

interface DeviceCapabilities {
  isLowEndDevice: boolean
  hasWebGL: boolean
  hasTouchScreen: boolean
  browserName: string
  devicePixelRatio: number
  effectiveType: string
  saveData: boolean
  cpuCores: number
  memory: number
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isLowEndDevice: false,
    hasWebGL: true,
    hasTouchScreen: false,
    browserName: "unknown",
    devicePixelRatio: 1,
    effectiveType: "4g",
    saveData: false,
    cpuCores: 4,
    memory: 4,
  })

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return

    // Check for WebGL support
    let hasWebGL = true
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      hasWebGL = !!gl

      // Clean up
      if (gl) {
        const ext = gl.getExtension("WEBGL_lose_context")
        if (ext) ext.loseContext()
      }
    } catch (e) {
      hasWebGL = false
    }

    // Check for touch screen
    const hasTouchScreen =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      navigator.msMaxTouchPoints > 0

    // Detect browser
    const userAgent = navigator.userAgent
    let browserName = "unknown"
    if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "chrome"
    } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = "firefox"
    } else if (userAgent.match(/safari/i)) {
      browserName = "safari"
    } else if (userAgent.match(/opr\//i)) {
      browserName = "opera"
    } else if (userAgent.match(/edg/i)) {
      browserName = "edge"
    }

    // Get CPU cores
    // @ts-ignore
    const cpuCores = navigator.hardwareConcurrency || 2

    // Get memory (in GB)
    // @ts-ignore
    const memory = navigator.deviceMemory || 4

    // Performance test - measure time to execute a simple task
    const startTime = performance.now()
    let result = 0
    for (let i = 0; i < 1000000; i++) {
      result += i
    }
    const endTime = performance.now()
    const executionTime = endTime - startTime

    // Check for low-end device
    const isLowEndDevice =
      // Low memory (less than 4GB)
      memory < 4 ||
      // Low CPU cores (less than 4)
      cpuCores < 4 ||
      // Low DPR
      window.devicePixelRatio < 2 ||
      // Slow execution time
      executionTime > 100 ||
      // Mobile device
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    // Network information
    let effectiveType = "4g"
    let saveData = false

    // @ts-ignore
    if (navigator.connection) {
      // @ts-ignore
      effectiveType = navigator.connection.effectiveType || "4g"
      // @ts-ignore
      saveData = !!navigator.connection.saveData
    }

    setCapabilities({
      isLowEndDevice,
      hasWebGL,
      hasTouchScreen,
      browserName,
      devicePixelRatio: window.devicePixelRatio,
      effectiveType,
      saveData,
      cpuCores,
      memory,
    })
  }, [])

  return capabilities
}
