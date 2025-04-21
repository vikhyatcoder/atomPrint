"use client"

import { Suspense } from "react"
import Stats from "@/components/home/stats"
import Services from "@/components/home/services"
import FeaturedProjects from "@/components/home/featured-projects"
import BlogPreview from "@/components/home/blog-preview"
import AIFeatures from "@/components/home/ai-features"
import NewsletterSignup from "@/components/newsletter-signup"
import AutoTestimonials from "@/components/home/auto-testimonials"
import dynamic from "next/dynamic"

// Use dynamic import for components that might cause hydration issues
const DynamicHero = dynamic(() => import("@/components/home/hero"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse-slow text-primary text-xl">Loading...</div>
    </div>
  ),
})

export default function HomeClient() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="min-h-screen"></div>}>
        <DynamicHero />
      </Suspense>
      <Stats />
      <Services />
      <FeaturedProjects />
      <AutoTestimonials />
      <BlogPreview />
      <AIFeatures />
      <NewsletterSignup />
    </div>
  )
}
