import type { Metadata } from "next"
import ModelAnalyzer from "@/components/3d-analyzer/model-analyzer"

export const metadata: Metadata = {
  title: "3D Model Analyzer | Atom Print",
  description:
    "Upload and analyze your 3D models for optimal printing. Get detailed insights on print time, material usage, and costs.",
}

export default function ModelAnalyzerPage() {
  return <ModelAnalyzer />
}
