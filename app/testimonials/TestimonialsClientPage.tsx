"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the client component (no SSR)
const PortfolioClientPage = dynamic(() => import("./PortfolioClientPage"), {
  ssr: false,
  loading: () => <div>Loading portfolio...</div>,
})

export default function TestimonialsClientPage() {
  return (
    <Suspense fallback={<div>Loading portfolio...</div>}>
      <PortfolioClientPage />
    </Suspense>
  )
}
