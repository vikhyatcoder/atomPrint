"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, ExternalLink, Loader2 } from "lucide-react"

export default function PackingInfo() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [courierInfo, setCourierInfo] = useState<CourierInfo | null>(null)
  const [error, setError] = useState("")

  interface CourierInfo {
    courier: string
    trackingUrl: string
    estimatedDelivery: string
    status: string
  }

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()

    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      // Demo data
      if (trackingNumber === "TRK789012") {
        setCourierInfo({
          courier: "Express Delivery",
          trackingUrl: "https://example.com/track",
          estimatedDelivery: "April 20, 2025",
          status: "In Transit",
        })
      } else {
        setError("No shipping information found")
        setCourierInfo(null)
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Truck className="mr-2 h-5 w-5" />
          Shipping Information
        </CardTitle>
        <CardDescription>Track your package once it's been dispatched</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleTrack} className="space-y-4">
          <div>
            <label htmlFor="tracking-number" className="block text-sm font-medium mb-1">
              Courier Tracking Number
            </label>
            <div className="flex gap-2">
              <Input
                id="tracking-number"
                placeholder="Enter tracking number (e.g., TRK789012)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Track
              </Button>
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          {courierInfo && (
            <div className="mt-6 space-y-4 p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Courier</p>
                <p className="font-medium">{courierInfo.courier}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium">{courierInfo.status}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                <p className="font-medium">{courierInfo.estimatedDelivery}</p>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <a href={courierInfo.trackingUrl} target="_blank" rel="noopener noreferrer">
                  Track on Courier Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          )}

          <div className="pt-4">
            <h4 className="font-medium mb-2">Shipping Policy</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Orders are typically dispatched within 1-2 business days after printing is complete</li>
              <li>• Standard shipping takes 3-5 business days</li>
              <li>• Express shipping options are available at checkout</li>
              <li>• International shipping may require additional time for customs clearance</li>
            </ul>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
