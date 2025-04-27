'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@/hooks/use-media-query'
import dynamic from 'next/dynamic'
import { useDeviceCapabilities } from '@/hooks/use-device-capabilities'
import ErrorBoundary from '@/components/error-boundary'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import Image from 'next/image'

// Dynamically import 3D component

// Auto image carousel fallback
const AutoImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const images = [
    '/images/3d-house.jpg',
    '/images/boat.jpg',
    '/images/dinosaur.jpg',
    '/images/robotic-arm.jpg',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, 3000) // Change every 5s
    return () => clearInterval(interval)
  }, [])

  const animationProps = isMobile
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 },
      }
    : {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        transition: { duration: 0.5 },
      }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <AnimatePresence mode="wait">
        <Motion.div key={activeIndex} {...animationProps} className="absolute w-full h-full">
          <Image
            src={images[activeIndex]}
            alt={`Hero Image ${activeIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 640px"
            priority
          />
        </Motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function Hero() {
  const containerRef = useRef(null)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [mounted, setMounted] = useState(false)
  const { isLowEndDevice, effectiveType } = useDeviceCapabilities()
  const [modelError, setModelError] = useState(false)

  const useStaticHero = isLowEndDevice || effectiveType === 'slow-2g' || effectiveType === '2g' || modelError

  useEffect(() => {
    setMounted(true)
  }, [])

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: isMobile ? 'easeOut' : 'easeInOut' },
    },
  }

  return (
    <section className="relative min-h-screen pt-20 flex items-center hero-pattern overflow-hidden">
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="z-10">
          <motion.div initial="hidden" animate="visible" variants={textVariants} className="text-center lg:text-left">
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
            useStaticHero ? (
              <AutoImageCarousel />
            ) : (
              <div className="relative w-full h-full">
                <ErrorBoundary fallback={<AutoImageCarousel />} onError={() => setModelError(true)}>
                  <Model3D isMobile={isMobile} />
                </ErrorBoundary>

                {/* Interactive hint */}
                <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-md flex items-center gap-2 text-xs text-muted-foreground">
                  <RotateCcw className="h-4 w-4" />
                  <span>Drag to rotate</span>
                </div>
              </div>
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-pulse text-primary text-xl">Loading...</div>
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
