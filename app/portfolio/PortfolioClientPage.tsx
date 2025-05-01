"use client"

import { useState, Suspense } from "react"
import PortfolioGrid from "@/components/portfolio/portfolio-grid"
import PortfolioFilters from "@/components/portfolio/portfolio-filters"

// Loading component for Suspense fallback
function PortfolioGridLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="h-64 rounded-lg bg-muted/30 animate-pulse"></div>
      ))}
    </div>
  )
}

export default function PortfolioClientPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <PortfolioFilters onFilterChange={setActiveFilter} onSearchChange={setSearchQuery} />
      <Suspense fallback={<PortfolioGridLoading />}>
        <PortfolioGrid activeFilter={activeFilter} searchQuery={searchQuery} />
      </Suspense>
    </>
  )
}
