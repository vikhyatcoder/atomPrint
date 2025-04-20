"use client"
import PortfolioGrid from "@/components/portfolio/portfolio-grid"
import PortfolioFilters from "@/components/portfolio/portfolio-filters"
import { useState } from "react"

export default function PortfolioClientPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <PortfolioFilters onFilterChange={setActiveFilter} onSearchChange={setSearchQuery} />
      <PortfolioGrid />
    </>
  )
}
