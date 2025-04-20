"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface BlogCategoriesProps {
  onCategoryChange: (category: string) => void
  onSearchChange: (search: string) => void
  activeCategory: string
}

const categories = [
  { id: "all", name: "All Posts", count: 12 },
  { id: "printing-tips", name: "Printing Tips", count: 4 },
  { id: "project-stories", name: "Project Stories", count: 3 },
  { id: "industry-trends", name: "Industry Trends", count: 2 },
  { id: "tutorials", name: "Tutorials", count: 2 },
  { id: "student-projects", name: "Student Projects", count: 1 },
]

export default function BlogCategories({ onCategoryChange, onSearchChange, activeCategory }: BlogCategoriesProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    onSearchChange(e.target.value)
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input placeholder="Search articles..." className="pl-10" value={searchQuery} onChange={handleSearchChange} />
      </div>

      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "ghost"}
              className="w-full justify-between"
              onClick={() => onCategoryChange(category.id)}
            >
              <span>{category.name}</span>
              <span className="text-xs bg-muted-foreground/20 px-2 py-0.5 rounded-full">{category.count}</span>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => onSearchChange("3D Printing")}>
            3D Printing
          </Button>
          <Button variant="outline" size="sm" onClick={() => onSearchChange("Design")}>
            Design
          </Button>
          <Button variant="outline" size="sm" onClick={() => onSearchChange("Materials")}>
            Materials
          </Button>
          <Button variant="outline" size="sm" onClick={() => onSearchChange("Tutorials")}>
            Tutorials
          </Button>
          <Button variant="outline" size="sm" onClick={() => onSearchChange("Student Projects")}>
            Student Projects
          </Button>
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <h3 className="font-medium mb-2">Subscribe to Updates</h3>
        <p className="text-sm text-muted-foreground mb-3">Get the latest articles delivered to your inbox.</p>
        <Input placeholder="Your email" className="mb-2" />
        <Button className="w-full">Subscribe</Button>
      </div>
    </div>
  )
}
