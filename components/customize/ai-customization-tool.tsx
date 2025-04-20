"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Loader2 } from "lucide-react"

export default function AICustomizationTool() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      setResult({
        suggestion: "Custom Keychain with Geometric Pattern",
        description:
          "A modern keychain with an intricate geometric pattern that can be customized with initials or a short name.",
        image: "/placeholder.svg?height=300&width=300",
      })
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Describe what you'd like to print</label>
            <Textarea
              placeholder="E.g., 'I need a custom keychain with my name on it' or 'I want a desk organizer with compartments for pens and sticky notes'"
              className="min-h-[120px]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={!prompt.trim() || isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Suggestions...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Suggestions
              </>
            )}
          </Button>
        </form>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="relative h-64 bg-muted rounded-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={result.image || "/placeholder.svg"}
                  alt={result.suggestion}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{result.suggestion}</h3>
              <p className="text-muted-foreground mb-4">{result.description}</p>
              <Button className="w-full">Customize This Design</Button>
            </div>
          </div>
        )}

        <p className="text-sm text-muted-foreground mt-4">
          Note: This is a beta feature. Our team will review all AI suggestions before printing.
        </p>
      </CardContent>
    </Card>
  )
}
