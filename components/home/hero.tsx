"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"
import dynamic from "next/dynamic"

// Dynamically import 3D component with no SSR to avoid hydration issues
const Model3D = dynamic(() => import("./model-3d"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse-slow text-primary text-xl">Loading 3D model...</div>
    </div>
  ),
})

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [mounted, setMounted] = useState(false)

  // Only render 3D content after component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen pt-20 flex items-center hero-pattern overflow-hidden">
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6">
              <span className="block">Design It.</span>
              <span className="block">Customize It.</span>
              <span className="gradient-text">Print It.</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-md mx-auto lg:mx-0">
              Turn your creative ideas into tangible reality with our student-run 3D printing service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg">
                <Link href="/portfolio">
                  View Portfolio <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">Start Printing</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="relative h-[300px] md:h-[400px] lg:h-[500px]" ref={containerRef}>
          {mounted ? (
            <Model3D isMobile={isMobile} />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-pulse-slow text-primary text-xl">Loading 3D model...</div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowRight className="h-8 w-8 rotate-90 text-muted-foreground" />
      </div>
    </section>
  )
}
