"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ArrowRight, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// In a real application, this would come from a CMS or API
const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Perfect 3D Prints Every Time",
    excerpt:
      "Learn the essential techniques to ensure your 3D prints come out flawless, from proper bed leveling to optimal temperature settings.",
    content: `
      <p>Getting perfect 3D prints consistently can be challenging, but with these tips, you'll be on your way to flawless results every time.</p>
      
      <h3>1. Level Your Bed Properly</h3>
      <p>A properly leveled print bed is crucial for good adhesion and print quality. Take your time with this step and check it regularly.</p>
      
      <h3>2. Optimize Temperature Settings</h3>
      <p>Different materials require different temperatures. PLA typically prints well at 190-220°C, while ABS needs 230-250°C.</p>
      
      <h3>3. Use the Right Print Speed</h3>
      <p>Printing too fast can lead to quality issues. Start slower and increase speed only after successful prints.</p>
      
      <h3>4. Choose the Appropriate Layer Height</h3>
      <p>Smaller layer heights (0.1mm) give better detail but take longer. Larger heights (0.3mm) are faster but less detailed.</p>
      
      <h3>5. Ensure Proper Filament Storage</h3>
      <p>Keep your filament in a dry environment. Moisture can affect print quality significantly.</p>
      
      <h3>6. Clean Your Nozzle Regularly</h3>
      <p>A clean nozzle ensures smooth filament flow and prevents clogs.</p>
      
      <h3>7. Use Supports When Necessary</h3>
      <p>For overhangs greater than 45 degrees, supports are usually needed for successful prints.</p>
      
      <h3>8. Optimize Cooling</h3>
      <p>Proper cooling helps with bridging and overhangs. Adjust fan speeds based on your material.</p>
      
      <h3>9. Check Your First Layer</h3>
      <p>The first layer is critical. If it's not right, consider stopping and adjusting before continuing.</p>
      
      <h3>10. Calibrate Your Extruder</h3>
      <p>Proper extrusion calibration ensures the right amount of filament is being used.</p>
    `,
    image: "/placeholder.svg?height=400&width=600",
    date: "April 15, 2025",
    readTime: "8 min read",
    category: "printing-tips",
    slug: "10-tips-for-perfect-3d-prints",
    tags: ["tips", "beginners", "quality"],
  },
  {
    id: 2,
    title: "How We Printed a Full-Scale Architectural Model in 48 Hours",
    excerpt:
      "A case study of our team's process to design, optimize, and print a complex architectural model for a tight deadline project.",
    content: `
      <p>When the Architecture Department approached us with a tight deadline for a campus redesign presentation, we knew we had to optimize our workflow to deliver on time.</p>
      
      <h3>The Challenge</h3>
      <p>The project required a detailed 1:200 scale model of the proposed campus redesign, including 15 buildings, landscape features, and infrastructure elements. And we had just 48 hours to complete it.</p>
      
      <h3>Planning Phase</h3>
      <p>We immediately divided the model into sections that could be printed simultaneously across our printer farm. The team worked on optimizing each STL file for quick printing while maintaining necessary detail.</p>
      
      <h3>Material Selection</h3>
      <p>We chose PLA for the buildings and landscape features due to its quick printing properties and good detail retention. For trees and some detailed elements, we used resin printing for higher fidelity.</p>
      
      <h3>Printing Process</h3>
      <p>We ran our printers continuously for 36 hours, with team members monitoring progress in shifts. The largest building sections were printed at 0.2mm layer height for speed, while detailed elements used 0.1mm for precision.</p>
      
      <h3>Assembly and Finishing</h3>
      <p>The final 12 hours were dedicated to assembly, painting, and finishing touches. We used a modular approach that allowed for quick assembly while maintaining structural integrity.</p>
      
      <h3>Results</h3>
      <p>We delivered the completed model with 2 hours to spare. The architecture team was thrilled with the level of detail and accuracy, and the model played a key role in securing approval for the campus redesign project.</p>
      
      <h3>Lessons Learned</h3>
      <p>This project taught us valuable lessons about workflow optimization, parallel processing, and the importance of material selection for deadline-driven projects.</p>
    `,
    image: "/placeholder.svg?height=400&width=600",
    date: "March 28, 2025",
    readTime: "12 min read",
    category: "project-stories",
    slug: "full-scale-architectural-model-case-study",
    tags: ["architecture", "case study", "large prints"],
  },
  {
    id: 3,
    title: "Sustainable Materials in 3D Printing: What You Need to Know",
    excerpt:
      "Explore eco-friendly filament options and how they're changing the landscape of sustainable manufacturing in 3D printing.",
    content: `
      <p>As 3D printing becomes more mainstream, the environmental impact of printing materials is an increasingly important consideration.</p>
      
      <h3>The Problem with Traditional Filaments</h3>
      <p>Most common 3D printing filaments like ABS are petroleum-based plastics that aren't biodegradable and can release potentially harmful fumes during printing.</p>
      
      <h3>PLA: A Step in the Right Direction</h3>
      <p>PLA (Polylactic Acid) is derived from renewable resources like corn starch or sugar cane. It's biodegradable under the right conditions and produces fewer emissions when printing.</p>
      
      <h3>Emerging Eco-Friendly Options</h3>
      <p>Several innovative materials are pushing sustainability further:</p>
      <ul>
        <li>Algae-based filaments that absorb CO2 during production</li>
        <li>Recycled plastic filaments made from water bottles or other waste</li>
        <li>Wood-based filaments that combine PLA with actual wood fibers</li>
        <li>Hemp-infused filaments that reduce plastic content</li>
      </ul>
      
      <h3>Performance Considerations</h3>
      <p>While eco-friendly options are improving, they sometimes require different print settings and may have different mechanical properties than traditional filaments.</p>
      
      <h3>End-of-Life Management</h3>
      <p>Even biodegradable filaments often require industrial composting facilities. Consider implementing a recycling program for failed prints and support material.</p>
      
      <h3>The Future of Sustainable 3D Printing</h3>
      <p>Research continues into fully biodegradable filaments with performance matching traditional options. The industry is moving toward closed-loop systems where prints can be easily recycled into new filament.</p>
    `,
    image: "/placeholder.svg?height=400&width=600",
    date: "March 10, 2025",
    readTime: "10 min read",
    category: "industry-trends",
    slug: "sustainable-materials-3d-printing",
    tags: ["sustainability", "materials", "eco-friendly"],
  },
  {
    id: 4,
    title: "From Sketch to Print: The Complete Workflow",
    excerpt:
      "Follow along as we take a simple sketch and transform it into a finished 3D printed product, with tips for each stage of the process.",
    content: `
      <p>Converting a 2D sketch into a physical 3D printed object involves several key steps. This guide walks you through our proven workflow.</p>
      
      <h3>Step 1: Refining the Concept</h3>
      <p>Start by creating detailed sketches from multiple angles. Consider functionality, aesthetics, and printability from the beginning.</p>
      
      <h3>Step  Consider functionality, aesthetics, and printability from the beginning.</p>
      
      <h3>Step 2: Digital Modeling</h3>
      <p>Transfer your sketch to 3D modeling software. For organic shapes, sculpting programs like ZBrush work well. For mechanical parts, parametric CAD software like Fusion 360 is ideal.</p>
      
      <h3>Step 3: Checking Printability</h3>
      <p>Analyze your model for potential printing issues: overhangs, thin walls, and structural integrity. Make adjustments as needed.</p>
      
      <h3>Step 4: Slicing</h3>
      <p>Use slicing software to convert your 3D model into printer instructions. This is where you'll set layer height, infill percentage, and support structures.</p>
      
      <h3>Step 5: Material Selection</h3>
      <p>Choose the right material based on your object's purpose. Consider strength, flexibility, temperature resistance, and appearance.</p>
      
      <h3>Step 6: Printing</h3>
      <p>Monitor the first few layers closely to catch any issues early. For longer prints, check periodically for filament tangles or other problems.</p>
      
      <h3>Step 7: Post-Processing</h3>
      <p>Remove supports, sand rough surfaces, and apply any finishes like paint or clear coat. This step can dramatically improve the final appearance.</p>
      
      <h3>Step 8: Testing and Iteration</h3>
      <p>Test your print for its intended purpose and make note of any improvements for the next version.</p>
    `,
    image: "/placeholder.svg?height=400&width=600",
    date: "February 22, 2025",
    readTime: "15 min read",
    category: "tutorials",
    slug: "sketch-to-print-workflow",
    tags: ["workflow", "design", "beginners"],
  },
  {
    id: 5,
    title: "Student Spotlight: 3D Printing in Engineering Projects",
    excerpt:
      "Highlighting innovative ways students are incorporating 3D printing into their engineering senior projects and research.",
    content: `
      <p>Engineering students across campus are finding creative ways to leverage 3D printing technology in their projects. Here are some standout examples from this semester.</p>
      
      <h3>Biomedical Engineering: Customized Prosthetics</h3>
      <p>Senior student Maria Chen developed a method for creating low-cost, customized prosthetic hands. Using scans of the recipient's arm and parametric design, each prosthetic is perfectly fitted to the individual.</p>
      
      <h3>Mechanical Engineering: Optimized Drone Components</h3>
      <p>The Aeronautics Club used generative design and 3D printing to create lightweight drone components that reduced their competition drone's weight by 30% while maintaining structural integrity.</p>
      
      <h3>Civil Engineering: Earthquake-Resistant Structures</h3>
      <p>A team of civil engineering students printed scale models of their novel building design to test earthquake resistance on shake tables, allowing for rapid iteration and improvement.</p>
      
      <h3>Electrical Engineering: Custom Enclosures</h3>
      <p>Senior project teams are designing and printing custom enclosures for their electronic projects, incorporating features like cooling channels and integrated wire management.</p>
      
      <h3>Materials Science: Composite Testing</h3>
      <p>Graduate researchers are using 3D printing to create test specimens with precisely controlled internal structures to study new composite materials.</p>
      
      <h3>Getting Involved</h3>
      <p>If you're a student interested in incorporating 3D printing into your projects, visit our campus makerspace for training and access to our printer farm.</p>
    `,
    image: "/placeholder.svg?height=400&width=600",
    date: "February 15, 2025",
    readTime: "7 min read",
    category: "student-projects",
    slug: "student-spotlight-engineering-projects",
    tags: ["students", "engineering", "education"],
  },
  {
    id: 6,
    title: "Troubleshooting Common 3D Printing Issues",
    excerpt:
      "Solutions for the most frequent problems encountered during 3D printing, from stringing to layer adhesion failures.",
    content: `
      <p>Even experienced makers encounter printing problems. Here's how to diagnose and fix the most common issues.</p>
      
      <h3>Stringing or Oozing</h3>
      <p><strong>Symptoms:</strong> Thin strands of filament between parts of your print.</p>
      <p><strong>Solution:</strong> Increase retraction distance and speed, lower printing temperature, or enable combing in your slicer.</p>
      
      <h3>Layer Shifting</h3>
      <p><strong>Symptoms:</strong> Layers that are misaligned horizontally.</p>
      <p><strong>Solution:</strong> Check belt tension, ensure the printer is on a stable surface, and reduce print speed.</p>
      
      <h3>Poor Layer Adhesion</h3>
      <p><strong>Symptoms:</strong> Layers that separate easily or visible gaps between layers.</p>
      <p><strong>Solution:</strong> Increase printing temperature, reduce cooling fan speed, or decrease layer height.</p>
      
      <h3>Warping</h3>
      <p><strong>Symptoms:</strong> Corners of the print lifting off the bed.</p>
      <p><strong>Solution:</strong> Use a heated bed, apply adhesives like glue stick or hairspray, or add a brim/raft.</p>
      
      <h3>Under-Extrusion</h3>
      <p><strong>Symptoms:</strong> Thin layers, gaps between perimeters and infill.</p>
      <p><strong>Solution:</strong> Check for clogs, increase flow rate, or calibrate your extruder steps.</p>
      
      <h3>Over-Extrusion</h3>
      <p><strong>Symptoms:</strong> Excess material, blobs, or rough surfaces.</p>
      <p><strong>Solution:</strong> Decrease flow rate or calibrate your extruder steps.</p>
      
      <h3>First Layer Problems</h3>
      <p><strong>Symptoms:</strong> First layer not sticking or appearing squished/stretched.</p>
      <p><strong>Solution:</strong> Re-level your bed, adjust Z-offset, or clean the print surface.</p>
    `,
    image: "/placeholder.svg?height=400&width=600",
    date: "January 30, 2025",
    readTime: "11 min read",
    category: "printing-tips",
    slug: "troubleshooting-common-3d-printing-issues",
    tags: ["troubleshooting", "tips", "quality"],
  },
]

interface BlogGridProps {
  category?: string
  searchQuery?: string
}

export default function BlogGrid({ category = "all", searchQuery = "" }: BlogGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPost, setSelectedPost] = useState<(typeof blogPosts)[0] | null>(null)
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)
  const postsPerPage = 6

  // Filter posts based on category and search query
  useEffect(() => {
    let filtered = blogPosts

    // Apply category filter
    if (category !== "all") {
      filtered = filtered.filter((post) => post.category === category)
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    setFilteredPosts(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [category, searchQuery])

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  const handleNextPost = () => {
    if (!selectedPost) return
    const currentIndex = filteredPosts.findIndex((post) => post.id === selectedPost.id)
    if (currentIndex < filteredPosts.length - 1) {
      setSelectedPost(filteredPosts[currentIndex + 1])
    }
  }

  const handlePrevPost = () => {
    if (!selectedPost) return
    const currentIndex = filteredPosts.findIndex((post) => post.id === selectedPost.id)
    if (currentIndex > 0) {
      setSelectedPost(filteredPosts[currentIndex - 1])
    }
  }

  return (
    <>
      <div className="space-y-8">
        <AnimatePresence mode="wait">
          {currentPosts.length > 0 ? (
            <motion.div
              key="posts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {currentPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="relative h-48">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 2}
                      />
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline">{post.category.replace(/-/g, " ")}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {post.date}
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="text-left hover:underline focus:outline-none focus:underline"
                      >
                        <h3 className="font-bold text-lg">{post.title}</h3>
                      </button>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-grow">
                      <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </div>
                      <Button variant="ghost" className="p-0 h-auto" onClick={() => setSelectedPost(post)}>
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-posts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              <Button
                className="mt-4"
                onClick={() => {
                  // This would be handled by the parent component
                  // onCategoryChange("all");
                  // onSearchChange("");
                }}
              >
                View All Articles
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Blog Post Modal */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">{selectedPost.category.replace(/-/g, " ")}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {selectedPost.date}
                  </div>
                </div>
                <DialogTitle className="text-2xl mt-2">{selectedPost.title}</DialogTitle>
                <DialogDescription className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {selectedPost.readTime}
                </DialogDescription>
              </DialogHeader>

              <div className="relative h-64 md:h-80 my-4">
                <Image
                  src={selectedPost.image || "/placeholder.svg"}
                  alt={selectedPost.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />

              <div className="flex flex-wrap gap-2 mt-6">
                {selectedPost.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between mt-6 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevPost}
                  disabled={filteredPosts.findIndex((post) => post.id === selectedPost.id) === 0}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous Post
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNextPost}
                  disabled={filteredPosts.findIndex((post) => post.id === selectedPost.id) === filteredPosts.length - 1}
                >
                  Next Post
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
