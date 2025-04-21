"use client"

import { useState, useEffect } from "react"

export function useLazyLoad(threshold = 0.1): [boolean, (node: any) => void] {
  const [inView, setInView] = useState(false)
  const [node, setNode] = useState<Element | null>(null)

  useEffect(() => {
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [node, threshold])

  return [inView, setNode]
}
