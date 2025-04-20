import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar } from "lucide-react"

// In a real application, this would come from a CMS or API
const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Perfect 3D Prints Every Time",
    excerpt:
      "Learn the essential techniques to ensure your 3D prints come out flawless, from proper bed leveling to optimal temperature settings.",
    image: "/placeholder.svg?height=400&width=600",
    date: "April 15, 2025",
    category: "Printing Tips",
    slug: "10-tips-for-perfect-3d-prints",
  },
  {
    id: 2,
    title: "How We Printed a Full-Scale Architectural Model in 48 Hours",
    excerpt:
      "A case study of our team's process to design, optimize, and print a complex architectural model for a tight deadline project.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 28, 2025",
    category: "Project Stories",
    slug: "full-scale-architectural-model-case-study",
  },
  {
    id: 3,
    title: "Sustainable Materials in 3D Printing: What You Need to Know",
    excerpt:
      "Explore eco-friendly filament options and how they're changing the landscape of sustainable manufacturing in 3D printing.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 10, 2025",
    category: "Industry Trends",
    slug: "sustainable-materials-3d-printing",
  },
]

export default function BlogPreview() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest from Our Blog</h2>
          <p className="text-lg text-muted-foreground">
            Stay updated with the latest 3D printing tips, project stories, and industry trends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden h-full flex flex-col">
              <div className="relative h-48">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.date}
                  </div>
                </div>
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  <h3 className="font-bold text-lg">{post.title}</h3>
                </Link>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <p className="text-muted-foreground text-sm">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild variant="ghost" className="p-0 h-auto">
                  <Link href={`/blog/${post.slug}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild>
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
