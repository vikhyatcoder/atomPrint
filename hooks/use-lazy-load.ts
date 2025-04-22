"use client"

import { useState, useEffect, useRef } from "react"

interface UseLazyLoadOptions {
  threshold?: number
  rootMargin?: string
  enabled?: boolean
}

export function useLazyLoad(options: UseLazyLoadOptions = {}): [boolean, (node: Element | null) => void] {
  const { threshold = 0.1, rootMargin = "200px 0px", enabled = true } = options

  const [inView, setInView] = useState(false)
  const [node, setNode] = useState<Element | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Skip if disabled or no node
    if (!enabled || !node) return

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Create new observer with optimized options
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // Only update state if it changes
        if (entry.isIntersecting !== inView) {
          setInView(entry.isIntersecting)
        }

        // Once element is in view, stop observing for better performance
        if (entry.isIntersecting && observerRef.current) {
          observerRef.current.unobserve(node)
        }
      },
      { threshold, rootMargin },
    )

    observerRef.current.observe(node)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [node, threshold, rootMargin, enabled, inView])

  return [inView, setNode]
}
