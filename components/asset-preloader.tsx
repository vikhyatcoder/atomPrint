"use client"

import { useEffect } from "react"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"

export default function AssetPreloader() {
  const { isLowEndDevice, hasWebGL, effectiveType, saveData } = useDeviceCapabilities()

  useEffect(() => {
    // Skip preloading on low-end devices or if user has save-data enabled
    if (isLowEndDevice || saveData || !hasWebGL || effectiveType === "slow-2g" || effectiveType === "2g") {
      return
    }

    // Preload environment map
    const envMapLoader = new Image()
    envMapLoader.src = "/env-map-placeholder.jpg"

    // Preload textures
    const textureUrls = ["/assets/3d/texture_earth.jpg"]

    textureUrls.forEach((url) => {
      const img = new Image()
      img.src = url
    })

    // Preload 3D models if needed
    if (typeof window !== "undefined" && "fetch" in window) {
      fetch("/assets/3d/duck.glb", { method: "HEAD" }).catch(() => {})
    }
  }, [isLowEndDevice, hasWebGL, effectiveType, saveData])

  // This component doesn't render anything
  return null
}
