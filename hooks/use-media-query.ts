"use client"

import { useState, useEffect, useRef } from "react"

export function useMediaQuery(query: string): boolean {
  // Default to false to avoid hydration mismatch
  const [matches, setMatches] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Use ref to store the media query to avoid recreating it on each render
  const mediaQueryRef = useRef<MediaQueryList | null>(null)

  useEffect(() => {
    setMounted(true)

    // Skip on server
    if (typeof window === "undefined") return

    // Create media query only once
    if (!mediaQueryRef.current) {
      mediaQueryRef.current = window.matchMedia(query)
    }

    const media = mediaQueryRef.current

    // Set initial value
    setMatches(media.matches)

    // Define listener with useRef to avoid recreating on each render
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // Add listener safely (with browser compatibility)
    if (media.addEventListener) {
      media.addEventListener("change", listener)
    } else {
      // Fallback for older browsers
      media.addListener(listener)
    }

    // Cleanup
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", listener)
      } else {
        // Fallback for older browsers
        media.removeListener(listener)
      }
    }
  }, [query])

  // Return false during SSR, and actual value after mounting
  return mounted ? matches : false
}
