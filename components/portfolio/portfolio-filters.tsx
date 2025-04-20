"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const filters = [
  { id: "all", label: "All Projects" },
  { id: "architecture", label: "Architecture" },
  { id: "education", label: "Education" },
  { id: "prototypes", label: "Prototypes" },
  { id: "art", label: "Art & Decor" },
  { id: "gifts", label: "Gifts" },
  { id: "tools", label: "Tools & Accessories" },
  { id: "engineering", label: "Engineering" },
]

interface PortfolioFiltersProps {
  onFilterChange: (filter: string) => void
  onSearchChange: (search: string) => void
}

export default function PortfolioFilters({ onFilterChange, onSearchChange }: PortfolioFiltersProps) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    onFilterChange(filter)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    onSearchChange(e.target.value)
  }

  return (
    <div className="space-y-4 mb-8">
      <div className="relative max-w-md mx-auto mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input placeholder="Search projects..." className="pl-10" value={searchQuery} onChange={handleSearchChange} />
      </div>

      <div className={`flex ${isMobile ? "flex-wrap" : "flex-nowrap overflow-x-auto"} gap-2 justify-center pb-2`}>
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange(filter.id)}
            className={isMobile ? "mb-2" : ""}
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
