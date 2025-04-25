"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

interface PortfolioFiltersProps {
  onFilterChange: (filter: string) => void
  onSearchChange: (query: string) => void
}

const filters = [
  { id: "all", label: "All Projects" },
  { id: "architecture", label: "Architecture" },
  { id: "education", label: "Education" },
  { id: "prototypes", label: "Prototypes" },
  { id: "art", label: "Art & Gifts" },
  { id: "tools", label: "Tools" },
  { id: "toys", label: "Toys & Games" },
  { id: "science", label: "Science" },
]

export default function PortfolioFilters({ onFilterChange, onSearchChange }: PortfolioFiltersProps) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId)
    onFilterChange(filterId)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    onSearchChange(e.target.value)
  }

  return (
    <div className="mb-8 space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input placeholder="Search projects..." className="pl-10" value={searchQuery} onChange={handleSearchChange} />
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Badge
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/80 transition-colors"
            onClick={() => handleFilterClick(filter.id)}
          >
            {filter.label}
          </Badge>
        ))}
      </div>
    </div>
  )
}
