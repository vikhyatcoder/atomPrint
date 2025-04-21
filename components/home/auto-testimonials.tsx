"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Engineering Student",
    image: "/placeholder.svg?height=200&width=200",
    rating: 5,
    text: "Atom Print helped me bring my senior project to life. The quality of the prints exceeded my expectations, and their team was incredibly helpful throughout the process.",
  },
  {
    id: 2,
    name: "Dr. Sarah Williams",
    role: "Biology Professor",
    image: "/placeholder.svg?height=200&width=200",
    rating: 5,
    text: "The anatomical models printed by Atom Print have transformed how I teach complex biological structures. My students can now interact with accurate 3D representations.",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Architecture Student",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4,
    text: "I needed a detailed model of my design project with a tight deadline. Atom Print delivered a perfect model on time, which helped me secure top marks.",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Art Major",
    image: "/placeholder.svg?height=200&width=200",
    rating: 5,
    text: "As an art student, I was looking to experiment with 3D printing for my installation. The team at Atom Print was patient and helped me translate my vision into reality.",
  },
  {
    id: 5,
    name: "David Kim",
    role: "Robotics Club President",
    image: "/placeholder.svg?height=200&width=200",
    rating: 5,
    text: "Our robotics club relies on Atom Print for custom parts and prototypes. Their quick turnaround time and precision have been crucial for our competition success.",
  },
]

export default function AutoTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Auto-scroll functionality with reduced frequency for performance
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      }, 6000) // Increased from 5000 to 6000ms for better performance
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused])

  // Pause on hover or touch
  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  // Simplified animation for mobile
  const animationProps = isMobile
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 },
      }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.5 },
      }

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">What Our Clients Say</h2>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseEnter}
          onTouchEnd={handleMouseLeave}
        >
          <AnimatePresence mode="wait">
            <motion.div key={activeIndex} {...animationProps} className="relative">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonials[activeIndex].image || "/placeholder.svg"}
                        alt={testimonials[activeIndex].name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 80px, 96px"
                        priority
                      />
                    </div>
                    <div className="flex-grow text-center md:text-left">
                      <div className="flex justify-center md:justify-start mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 md:h-5 md:w-5 ${
                              i < testimonials[activeIndex].rating ? "text-yellow-500 fill-yellow-500" : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-base md:text-lg italic mb-4">"{testimonials[activeIndex].text}"</p>
                      <div>
                        <p className="font-semibold text-base md:text-lg">{testimonials[activeIndex].name}</p>
                        <p className="text-muted-foreground text-sm">{testimonials[activeIndex].role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                  index === activeIndex ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
