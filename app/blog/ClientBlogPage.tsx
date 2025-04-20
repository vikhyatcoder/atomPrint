"use client"
import BlogGrid from "@/components/blog/blog-grid"
import BlogCategories from "@/components/blog/blog-categories"
import { useState } from "react"

export default function ClientBlogPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our Blog</h1>
      <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-muted-foreground">
        Stay updated with the latest 3D printing tips, project stories, industry trends, and student projects.
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <BlogCategories
            onCategoryChange={setActiveCategory}
            onSearchChange={setSearchQuery}
            activeCategory={activeCategory}
          />
        </div>
        <div className="md:w-3/4">
          <BlogGrid category={activeCategory} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  )
}
