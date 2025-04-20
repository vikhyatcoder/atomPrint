"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"

export default function PricingEstimates() {
  const [size, setSize] = useState(50) // Size in cubic cm
  const [material, setMaterial] = useState("pla")
  const [quality, setQuality] = useState("standard")
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState(0)

  // Calculate estimated price and time whenever parameters change
  useEffect(() => {
    const basePricePerCm = {
      pla: 0.1,
      abs: 0.12,
      petg: 0.15,
      tpu: 0.18,
      resin: 0.25,
    }

    const qualityMultiplier = {
      draft: 0.8,
      standard: 1.0,
      high: 1.3,
      ultra: 1.6,
    }

    const basePrice = size * basePricePerCm[material]
    const finalPrice = basePrice * qualityMultiplier[quality]
    const price = Math.max(10, Math.round(finalPrice))

    const time = Math.round(
      size * 0.1 * (quality === "ultra" ? 2 : quality === "high" ? 1.5 : quality === "standard" ? 1 : 0.7),
    )

    setEstimatedPrice(price)
    setEstimatedTime(time)
  }, [size, material, quality])

  const materialInfo = {
    pla: "PLA is biodegradable, easy to print with, and comes in many colors. Great for decorative items and low-stress applications.",
    abs: "ABS is durable and heat-resistant. Ideal for functional parts that need to withstand stress or higher temperatures.",
    petg: "PETG combines strength and flexibility with good chemical resistance. Great for mechanical parts and water-resistant applications.",
    tpu: "TPU is highly flexible and durable. Perfect for items that need to bend, stretch, or compress.",
    resin:
      "Resin provides the highest detail and smoothest finish. Ideal for intricate models, jewelry, and miniatures.",
  }

  return (
    <section className="mb-16">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h2 className="text-2xl font-bold mb-2">Pricing Estimates</h2>
        <p className="text-muted-foreground">
          Get an idea of costs based on size, material, and quality. Final pricing may vary based on specific
          requirements.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="mr-2 h-5 w-5" />
            Price Calculator
          </CardTitle>
          <CardDescription>Adjust the parameters to see estimated pricing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Size Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Print Size</h3>
                <p className="text-sm text-muted-foreground">
                  Adjust the slider to estimate the volume of your print in cubic centimeters.
                </p>

                <div className="space-y-4">
                  <Slider value={[size]} min={10} max={500} step={10} onValueChange={(value) => setSize(value[0])} />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Small</span>
                    <span className="font-medium">{size} cm³</span>
                    <span className="text-sm text-muted-foreground">Large</span>
                  </div>
                </div>
              </div>

              {/* Material Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Material Type</h3>
                <p className="text-sm text-muted-foreground">Select the material you'd like to use for your print.</p>

                <Select value={material} onValueChange={setMaterial}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pla">PLA (Standard)</SelectItem>
                    <SelectItem value="abs">ABS (Durable)</SelectItem>
                    <SelectItem value="petg">PETG (Strong & Flexible)</SelectItem>
                    <SelectItem value="tpu">TPU (Flexible)</SelectItem>
                    <SelectItem value="resin">Resin (High Detail)</SelectItem>
                  </SelectContent>
                </Select>

                <div className="p-4 bg-muted rounded-md">
                  <h4 className="font-medium mb-2">Material Properties:</h4>
                  <p className="text-sm text-muted-foreground">{materialInfo[material]}</p>
                </div>
              </div>

              {/* Quality Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Print Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Select the level of detail and finish quality for your print.
                </p>

                <Select value={quality} onValueChange={setQuality}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft (0.3mm layer height)</SelectItem>
                    <SelectItem value="standard">Standard (0.2mm layer height)</SelectItem>
                    <SelectItem value="high">High (0.1mm layer height)</SelectItem>
                    <SelectItem value="ultra">Ultra (0.05mm layer height)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="p-6 bg-muted/50 rounded-lg mb-6">
                <h3 className="text-xl font-bold mb-4">Your Estimate</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-medium">{size} cm³</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Material:</span>
                    <span className="font-medium capitalize">{material.toUpperCase()}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Quality:</span>
                    <span className="font-medium capitalize">{quality}</span>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-medium">Estimated Price:</span>
                      <span className="text-2xl font-bold">${estimatedPrice}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-medium">Estimated Print Time:</span>
                      <span className="font-medium">{estimatedTime} hours</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button className="w-full">Get Exact Quote</Button>
                <p className="text-xs text-center text-muted-foreground">
                  This is an estimate. Final pricing will be confirmed after review.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
