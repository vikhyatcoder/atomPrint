"use client"

import { useEffect, useState } from "react"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"
import dynamic from "next/dynamic"

// Import the hero component directly for faster initial load
import Hero from "@/components/home/hero"

// Dynamically import non-critical components
const Stats = dynamic(() => import("@/components/home/stats"), {
  ssr: false,
  loading: () => <div className="py-16 bg-muted/30" aria-label="Loading stats"></div>,
})

const Services = dynamic(() => import("@/components/home/services"), {
  ssr: false,
  loading: () => <div className="py-24" aria-label="Loading services"></div>,
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
  const [mounted, setMounted] = useState(false)
  const [loadSecondary, setLoadSecondary] = useState(false)

  // Mount component safely
  useEffect(() => {
    setMounted(true)

    // Defer loading of secondary components
    const timer = setTimeout(
      () => {
        setLoadSecondary(true)
      },
      isLowEndDevice ? 2000 : 1000,
    )

    return () => clearTimeout(timer)
  }, [isLowEndDevice])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Hero />

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
