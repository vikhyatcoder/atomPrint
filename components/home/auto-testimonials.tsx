"use client"

import { useState, useEffect, useRef, memo } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

const testimonials = [
  {
    id: 1,
    name: "Sandeep Mishra",
    role: "IT Employee",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4,
    text: "I loved working with Atom Print. I just got my hands on my print and would like to say something about the quality. I would also recommend it to others.",
  },
  {
    id: 2,
    name: "Pavan Singh Sisodia",
    role: "Mechanical Engineer",
    image: "/placeholder.svg?height=200&width=200",
    rating: 5,
    text: "I customised a print of my car and got it within a few days of ordering, and the quality of the print can be seen in the details of the print are fabulous",
  },
  {
    id: 3,
    name: "Anamika Sharma",
    role: "Business Owner",
    image: "/placeholder.svg?height=200&width=200",
    rating: 3,
    text: "Ordered a custom model for gifting purposes and would recommend to all b'cuz of the personalisation and the design language",
  },
  {
    id: 4,
    name: "Sajiya Tanwar",
    role: "Mechanics Professor",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4,
    text: "Working as a professor, and had ordered a 3D model to gain a better understanding of students, and all I wanted was to say that the details just got me through, and we are going to order some more models to",
  },
]

// Memoized testimonial card for better performance
const TestimonialCard = memo(({ testimonial }) => (
  <Card className="border-none shadow-lg">
    <CardContent className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={testimonial.image || "/placeholder.svg"}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80px, 96px"
          />
        </div>
        <div className="flex-grow text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 md:h-5 md:w-5 ${
                  i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"
                }`}
              />
            ))}
          </div>
          <p className="text-base md:text-lg italic mb-4">"{testimonial.text}"</p>
          <div>
            <p className="font-semibold text-base md:text-lg">{testimonial.name}</p>
            <p className="text-muted-foreground text-sm">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
))

TestimonialCard.displayName = "TestimonialCard"

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
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-4">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

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
