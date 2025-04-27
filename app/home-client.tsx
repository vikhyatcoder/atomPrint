"use client"

import { Suspense, useEffect, useState } from "react"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"
import { usePerformanceMonitor } from "@/hooks/use-performance-monitor"
import dynamic from "next/dynamic"

// Dynamically import components with different loading priorities
const Stats = dynamic(() => import("@/components/home/stats"), { ssr: false })
const Services = dynamic(() => import("@/components/home/services"), { ssr: false })
const DynamicHero = dynamic(() => import("@/components/home/hero"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse-slow text-primary text-xl">Loading...</div>
    </div>
  ),
})

// Lower priority components loaded after initial render
const FeaturedProjects = dynamic(() => import("@/components/home/featured-projects"), {
  ssr: false,
  loading: () => <div className="py-24 bg-muted/30" aria-label="Loading featured projects"></div>,
})
const AutoTestimonials = dynamic(() => import("@/components/home/auto-testimonials"), {
  ssr: false,
  loading: () => <div className="py-12 bg-muted/30" aria-label="Loading testimonials"></div>,
})

export default function HomeClient() {
  const { isLowEndDevice } = useDeviceCapabilities()
  const { isLowPerformance } = usePerformanceMonitor()
  const [mounted, setMounted] = useState(false)
  const [loadSecondary, setLoadSecondary] = useState(false)

  // Detect if we should reduce features
  const reduceFeatures = isLowEndDevice || isLowPerformance

  // Mount component safely
  useEffect(() => {
    setMounted(true)

    // Defer loading of secondary components
    const timer = setTimeout(
      () => {
        setLoadSecondary(true)
      },
      reduceFeatures ? 2000 : 1000,
    )

    return () => clearTimeout(timer)
  }, [reduceFeatures])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-slow text-primary text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="min-h-screen"></div>}>
        <DynamicHero />
      </Suspense>

      {/* Primary content - always loaded */}
      <Stats />
      <Services />

      {/* Secondary content - conditionally loaded */}
      {loadSecondary && (
        <>
          <FeaturedProjects />
          <AutoTestimonials />
        </>
      )}
    </div>
  )
}
