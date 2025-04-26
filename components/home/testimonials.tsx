"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

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

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 3 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 3 : prevIndex - 1))
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground">
              Don't just take our word for it. Here's what students and faculty have to say about our services.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-[100%] md:min-w-[50%] lg:min-w-[33.33%] px-4">
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>

                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-muted-foreground">{testimonial.text}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
