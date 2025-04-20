"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Loader2 } from "lucide-react"

export default function AIFeatures() {
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
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-secondary/10 rounded-full blur-xl"></div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                AI-Powered Customization
                <span className="ml-2 inline-block">
                  <Sparkles className="h-6 w-6 text-primary" />
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Describe what you want in plain language, and our AI will suggest the perfect 3D printing project for
                you.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                  placeholder="Describe what you'd like to print... (e.g., 'I need a custom keychain with my name on it')"
                  className="min-h-[120px]"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
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

              <p className="text-sm text-muted-foreground mt-4">
                Note: This is a beta feature. Our team will review all AI suggestions before printing.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>

              {result ? (
                <Card className="overflow-hidden border-2 gradient-border">
                  <div className="relative h-64 bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={result.image || "/placeholder.svg"}
                        alt={result.suggestion}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{result.suggestion}</h3>
                    <p className="text-muted-foreground mb-4">{result.description}</p>
                    <Button className="w-full">Customize This Design</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-full min-h-[400px] rounded-lg border-2 border-dashed flex items-center justify-center p-8 text-center">
                  <div>
                    <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">AI Suggestions Will Appear Here</h3>
                    <p className="text-muted-foreground">
                      Describe what you want to print, and our AI will suggest designs and templates.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
