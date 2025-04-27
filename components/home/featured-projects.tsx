"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Architectural Campus Model",
    category: "Architecture",
    image: "/images/3d-house.jpg",
    description:
      "A detailed architectural model of a modern minimalist house with multiple levels and open spaces. Perfect for client presentations and design visualization.",
    client: "University Design Department",
    material: "PLA, Multi-Color",
    printTime: "72 hours",
    testimonial: {
      text: "The precision and detail in this model helped us visualize our campus redesign project perfectly.",
      author: "Prof. Sarah Johnson",
    },
  },
  {
    id: 2,
    title: "Molecular Structure Set",
    category: "Education",
    image: "/images/robotic-arm.jpg",
    description: "A set of 15 different molecular structures for chemistry education, with connecting pieces.",
    client: "Chemistry Department",
    material: "PETG",
    printTime: "48 hours",
    testimonial: {
      text: "These models have transformed how our students understand complex molecular structures.",
      author: "Dr. Michael Chen",
    },
  },
  {
    id: 3,
    title: "Robotic Arm Prototype",
    category: "Prototyping",
    image: "/images/robotic-arm.jpg",
    description: "A functional prototype of a robotic arm with articulating joints and mounting hardware.",
    client: "Engineering Senior Project",
    material: "ABS",
    printTime: "36 hours",
    testimonial: {
      text: "The prototype allowed us to test our design before committing to expensive materials.",
      author: "Engineering Team Lead",
    },
  },
  {
    id: 4,
    title: "Custom Chess Set",
    category: "Art & Gifts",
    image: "/placeholder.svg?height=600&width=800",
    description: "A custom-designed chess set with pieces inspired by modern architecture.",
    client: "Chess Club",
    material: "Resin",
    printTime: "24 hours",
    testimonial: {
      text: "The detail on each piece is incredible. This is now our club's prized possession!",
      author: "Chess Club President",
    },
  },
]

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground">
              Explore some of our best work and see what we can create for you.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="mb-2">{project.category}</Badge>
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/portfolio">
              View All Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProject.title}</DialogTitle>
                <DialogDescription>
                  <Badge className="mt-2">{selectedProject.category}</Badge>
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                  <Image
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="mb-4">{selectedProject.description}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Client:</span>
                      <span className="font-medium">{selectedProject.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Material:</span>
                      <span className="font-medium">{selectedProject.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Print Time:</span>
                      <span className="font-medium">{selectedProject.printTime}</span>
                    </div>
                  </div>

                  {selectedProject.testimonial && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="italic mb-2">"{selectedProject.testimonial.text}"</p>
                      <p className="text-sm text-muted-foreground">— {selectedProject.testimonial.author}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button asChild>
                  <Link href="/services">Start Your Project</Link>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
