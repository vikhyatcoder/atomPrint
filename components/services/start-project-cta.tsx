import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Upload, FileUp, MessageSquare } from "lucide-react"

export default function StartProjectCTA() {
  return (
    <section className="py-12 px-4 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
        <p className="text-lg mb-8 text-muted-foreground">
          Choose the option that works best for you to begin your 3D printing journey with us.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <div className="p-3 rounded-full bg-primary/10 text-primary inline-block mb-4">
              <Upload className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Upload STL File</h3>
            <p className="text-muted-foreground mb-4">
              Already have a 3D model? Upload your STL file and we'll print it for you.
            </p>
            <Button asChild className="w-full">
              <Link href="/customize">Upload File</Link>
            </Button>
          </div>

          <div className="bg-background p-6 rounded-lg shadow-sm">
            <div className="p-3 rounded-full bg-secondary/10 text-secondary inline-block mb-4">
              <FileUp className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Request Design</h3>
            <p className="text-muted-foreground mb-4">
              Need a custom design? Our team can create a 3D model based on your specifications.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/customize">Request Design</Link>
            </Button>
          </div>

          <div className="bg-background p-6 rounded-lg shadow-sm">
            <div className="p-3 rounded-full bg-blue-500/10 text-blue-500 inline-block mb-4">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Contact Us</h3>
            <p className="text-muted-foreground mb-4">
              Have questions or need guidance? Reach out to our team for personalized assistance.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
