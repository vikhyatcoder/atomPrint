"use client"

import { useState, useEffect } from "react"

export function usePerformance() {
  const [isLowPerformance, setIsLowPerformance] = useState(false)

  useEffect(() => {
    // Simple performance check based on device memory and CPU cores
    const checkPerformance = () => {
      // @ts-ignore
      const memory = navigator.deviceMemory || 4
      // @ts-ignore
      const cores = navigator.hardwareConcurrency || 4

      // Consider low performance if memory < 4GB or cores < 4
      setIsLowPerformance(memory < 4 || cores < 4)
    }

    checkPerformance()
  }, [])

  return { isLowPerformance }
}
