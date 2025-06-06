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
    name: "Sandeep Mishra",
    role: "IT Employee",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4,
    text: "I loved working with Atom Print. I just got my hands on my print and would like to say something about the quality. I would also recommend it to others.",
    project: "Robotic Arm Prototype",
    date: "April 25, 2025",
  },
  {
    id: 2,
    name: "Pavan Singh Sisodia",
    role: "Mechanical Engineer",
    image: "/placeholder.svg?height=200&width=200",
    rating: 5,
    text: "I customised a print of my car and got it within a few days of ordering, and the quality of the print can be seen in the details of the print are fabulous",
    project: "Custom Car Model",
    date: "March 15, 2025",
  },
  {
    id: 3,
    name: "Anamika Sharma",
    role: "Business Owner",
    image: "/placeholder.svg?height=200&width=200",
    rating: 3,
    text: "Ordered a custom model for gifting purposes and would recommend to all b'cuz of the personalisation and the design language",
    project: "Personalized Gift Model",
    date: "March 2, 2025",
  },
  {
    id: 4,
    name: "Sajiya Tanwar",
    role: "Mechanics Professor",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4,
    text: "Working as a professor, and had ordered a 3D model to gain a better understanding of students, and all I wanted was to say that the details just got me through, and we are going to order some more models too",
    project: "Educational Model Set",
    date: "February 20, 2025",
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
