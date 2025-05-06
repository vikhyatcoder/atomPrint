"use client"
import PortfolioGrid from "@/components/portfolio/portfolio-grid"
import PortfolioFilters from "@/components/portfolio/portfolio-filters"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function PortfolioClientPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <Alert className="mb-6 bg-muted/50 border-primary/20">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription>
          Click on any item to view details and explore available color options. Select different colors to see how the
          product looks in each variation.
        </AlertDescription>
      </Alert>

      <PortfolioFilters onFilterChange={setActiveFilter} onSearchChange={setSearchQuery} />
      <PortfolioGrid activeFilter={activeFilter} searchQuery={searchQuery} />
    </>
  )
}
