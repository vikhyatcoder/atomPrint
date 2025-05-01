"use client"

import { useState } from "react"
import PortfolioGrid from "@/components/portfolio/portfolio-grid"
import PortfolioFilters from "@/components/portfolio/portfolio-filters"

export default function PortfolioClientPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <PortfolioFilters onFilterChange={setActiveFilter} onSearchChange={setSearchQuery} />
      <PortfolioGrid activeFilter={activeFilter} searchQuery={searchQuery} />
    </>
  )
}
