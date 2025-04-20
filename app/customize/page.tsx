import type { Metadata } from "next"
import AICustomizationTool from "@/components/customize/ai-customization-tool"
import CustomizationForm from "@/components/customize/customization-form"
import LivePreview from "@/components/customize/live-preview"
import QuoteEstimator from "@/components/customize/quote-estimator"

export const metadata: Metadata = {
  title: "Customize Your Print | Atom Print",
  description:
    "Use our AI-powered customization tools to personalize your 3D prints with custom designs, materials, and finishes.",
}

export default function CustomizePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Customize Your Print</h1>
      <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-muted-foreground">
        Use our customization tools to personalize your 3D prints. Upload sketches, select materials, and get a preview
        of your finished product.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">AI-Powered Customization (Beta)</h2>
          <AICustomizationTool />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">Manual Customization</h2>
          <CustomizationForm />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LivePreview />
        <QuoteEstimator />
      </div>
    </div>
  )
}
