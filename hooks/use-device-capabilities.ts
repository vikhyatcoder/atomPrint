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

    // Check for low-end device
    const isLowEndDevice =
      // Low memory (less than 4GB)
      // @ts-ignore
      (navigator.deviceMemory && navigator.deviceMemory < 4) ||
      // Low CPU cores (less than 4)
      // @ts-ignore
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
      // Low DPR
      window.devicePixelRatio < 2 ||
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
    })
  }, [])

  return capabilities
}
