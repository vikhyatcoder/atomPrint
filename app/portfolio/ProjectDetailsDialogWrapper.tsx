"use client"

import dynamic from "next/dynamic"

// Dynamically import the component that uses useSearchParams
const ProjectDetailsDialog = dynamic(() => import("@/components/portfolio/project-details-dialog"), {
  ssr: false,
})

export default function ProjectDetailsDialogWrapper() {
  return <ProjectDetailsDialog />
}
