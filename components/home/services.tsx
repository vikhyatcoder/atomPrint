"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CuboidIcon as Cube, Lightbulb, Gift, GraduationCap, Factory, Building2 } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Custom Model Printing",
    description: "Turn your 3D models into physical objects with precision and quality.",
    icon: Cube,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 2,
    title: "Prototyping for Startups",
    description: "Rapid prototyping solutions to bring your product ideas to life quickly.",
    icon: Lightbulb,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    id: 3,
    title: "Personalized Gifts & Decor",
    description: "Create unique, personalized items for special occasions or home decor.",
    icon: Gift,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    id: 4,
    title: "Educational Models",
    description: "Detailed anatomical, molecular, or conceptual models for educational purposes.",
    icon: GraduationCap,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 5,
    title: "Industrial & Functional Parts",
    description: "Durable, precise components for industrial applications and replacements.",
    icon: Factory,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    id: 6,
    title: "Architectural Models",
    description: "Detailed scale models of buildings, landscapes, and urban designs.",
    icon: Building2,
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
  },
]

export default function Services() {
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground">
              We offer a wide range of 3D printing services to bring your ideas to life.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                <CardHeader>
                  <div className={`p-3 rounded-lg inline-block ${service.bgColor} ${service.color} mb-4`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="mt-2">
                    <Link href="/services">Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
