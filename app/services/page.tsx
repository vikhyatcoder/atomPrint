import type { Metadata } from "next"
import ServiceCards from "@/components/services/service-cards"
export const metadata: Metadata = {
  title: "Services | Atom Print",
  description:
    "Discover our range of 3D printing services including prototyping, decor, educational models, and personalized gifts.",
}

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our Services</h1>
      <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-muted-foreground">
        We offer a wide range of 3D printing services to bring your ideas to life. From rapid prototyping to
        personalized gifts, our team is ready to help you create something amazing.
      </p>

      <ServiceCards />
    </div>
  )
}
