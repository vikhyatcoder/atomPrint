import type { Metadata } from "next"
import TestimonialGrid from "@/components/testimonials/testimonial-grid"
import SubmitTestimonialForm from "@/components/testimonials/submit-testimonial-form"

export const metadata: Metadata = {
  title: "Testimonials | Atom Print",
  description: "Read what our customers have to say about their experience with Atom Print's 3D printing services.",
}

export default function TestimonialsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Customer Testimonials</h1>
      <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-muted-foreground">
        Read what our customers have to say about their experience with our 3D printing services.
      </p>

      <TestimonialGrid />

      <div className="mt-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Share Your Experience</h2>
        <SubmitTestimonialForm />
      </div>
    </div>
  )
}
