import type { Metadata } from "next"
import PortfolioClientPage from "./PortfolioClientPage"
import ProjectDetailsDialogWrapper from "./ProjectDetailsDialogWrapper"

export const metadata: Metadata = {
  title: "Portfolio | Atom Print",
  description:
    "Explore our diverse portfolio of 3D printed projects including art pieces, tools, personalized gifts, and prototypes.",
}

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our Portfolio</h1>
      <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-muted-foreground">
        Browse through our collection of 3D printed projects. From artistic creations to functional prototypes, discover
        what we can bring to life for you.
      </p>

      <PortfolioClientPage />
      <ProjectDetailsDialogWrapper />
    </div>
  )
}
