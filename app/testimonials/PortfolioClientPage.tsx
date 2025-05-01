"use client"

import TestimonialGrid from "@/components/testimonials/testimonial-grid"
import SubmitTestimonialForm from "@/components/testimonials/submit-testimonial-form"

export default function PortfolioClientPage() {
  return (
    <div className="space-y-16">
      <TestimonialGrid />

      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Share Your Experience</h2>
        <SubmitTestimonialForm />
      </div>
    </div>
  )
}
