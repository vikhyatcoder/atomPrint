"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

// In a real application, this would come from a CMS or API
const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Engineering Student",
    image: "/placeholder.svg?height=200&width=200",
    rating: 5,
    text: "Atom Print helped me bring my senior project to life. The quality of the prints exceeded my expectations, and their team was incredibly helpful throughout the process.",
    project: "Robotic Arm Prototype",
    date: "March 15, 2025",
  },
  {
    id: 2,
    name: "Dr. Sarah Williams",
    role: "Biology Professor",
    image: "/placeholder.svg?height=200&width=200",
    rating: 5,
    text: "The anatomical models printed by Atom Print have transformed how I teach complex biological structures. My students can now interact with accurate 3D representations.",
    project: "Anatomical Heart Model",
    date: "March 2, 2025",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Architecture Student",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4,
    text: "I needed a detailed model of my design project with a tight deadline. Atom Print delivered a perfect model on time, which helped me secure top marks.",
    project: "Architectural Campus Model",
    date: "February 20, 2025",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Art Major",
    image: "/placeholder.svg?height=200&width=200",
    rating: 5,
    text: "As an art student, I was looking to experiment with 3D printing for my installation. The team at Atom Print was patient and helped me translate my vision into reality.",
    project: "Abstract Art Installation",
    date: "February 12, 2025",
  },
  {
    id: 5,
    name: "David Kim",
    role: "Robotics Club President",
    image: "/placeholder.svg?height=200&width=200",
    rating: 5,
    text: "Our robotics club relies on Atom Print for custom parts and prototypes. Their quick turnaround time and precision have been crucial for our competition success.",
    project: "Drone Propeller Guards",
    date: "January 28, 2025",
  },
  {
    id: 6,
    name: "Jessica Martinez",
    role: "Chemistry Graduate Student",
    image: "/placeholder.svg?height=200&width=200",
    rating: 5,
    text: "The molecular structure models Atom Print created for my research presentation were incredibly detailed and accurate. They helped me explain complex concepts to my audience.",
    project: "Molecular Structure Set",
    date: "January 15, 2025",
  },
]

export default function TestimonialGrid() {
  const [filter, setFilter] = useState("all")

  const filteredTestimonials =
    filter === "all" ? testimonials : testimonials.filter((t) => t.rating === Number.parseInt(filter))

  return (
    <div className="space-y-8">
      <div className="flex justify-center gap-2 mb-8">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          All Reviews
        </Button>
        {[5, 4, 3].map((rating) => (
          <Button
            key={rating}
            variant={filter === rating.toString() ? "default" : "outline"}
            onClick={() => setFilter(rating.toString())}
          >
            {rating}★ & Up
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="h-full">
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
                    className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                  />
                ))}
              </div>

              <p className="text-muted-foreground mb-4">{testimonial.text}</p>

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Project: {testimonial.project}</span>
                  <span className="text-muted-foreground">{testimonial.date}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
