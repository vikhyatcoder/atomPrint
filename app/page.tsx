import Hero from "@/components/home/hero"
import Stats from "@/components/home/stats"
import Services from "@/components/home/services"
import FeaturedProjects from "@/components/home/featured-projects"
import BlogPreview from "@/components/home/blog-preview"
import AIFeatures from "@/components/home/ai-features"
import NewsletterSignup from "@/components/newsletter-signup"
import AutoTestimonials from "@/components/home/auto-testimonials"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
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
