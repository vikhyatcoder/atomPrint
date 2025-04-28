"use client"

import { useState, useEffect } from "react"

interface DeviceCapabilities {
  isLowEndDevice: boolean
  hasWebGL: boolean
  hasTouchScreen: boolean
  effectiveType: string
  saveData: boolean
}

// Create a singleton to avoid recalculating capabilities
let cachedCapabilities: DeviceCapabilities | null = null

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(
    () =>
      cachedCapabilities || {
        isLowEndDevice: false,
        hasWebGL: true,
        hasTouchScreen: false,
        effectiveType: "4g",
        saveData: false,
      },
  )

  useEffect(() => {
    // Skip if already calculated
    if (cachedCapabilities) {
      setCapabilities(cachedCapabilities)
      return
    }

    // Only run on client
    if (typeof window === "undefined") return

    // Check for WebGL support
    let hasWebGL = true
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      hasWebGL = !!gl
    } catch (e) {
      hasWebGL = false
    }

    // Check for touch screen
    const hasTouchScreen =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      navigator.msMaxTouchPoints > 0

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

    // Simple heuristic for low-end device detection
    const isLowEndDevice =
      // Mobile device
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      // Low DPR
      window.devicePixelRatio < 2 ||
      // Slow connection
      effectiveType === "slow-2g" ||
      effectiveType === "2g" ||
      effectiveType === "3g"

    const newCapabilities = {
      isLowEndDevice,
      hasWebGL,
      hasTouchScreen,
      effectiveType,
      saveData,
    }

    // Cache the capabilities
    cachedCapabilities = newCapabilities
    setCapabilities(newCapabilities)
  }, [])

  return capabilities
}
