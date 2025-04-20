"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Package, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function OrderTracker() {
  const [trackingMethod, setTrackingMethod] = useState("order")
  const [trackingInput, setTrackingInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null)
  const [error, setError] = useState("")

  interface OrderResult {
    id: string
    status: "in_queue" | "printing" | "post_processing" | "dispatched" | "delivered"
    createdAt: string
    estimatedCompletion: string
    items: {
      name: string
      quantity: number
    }[]
  }

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()

    if (!trackingInput.trim()) {
      setError("Please enter a tracking number or email")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      // Demo data
      if (trackingInput === "ORD12345" || trackingInput === "user@example.com") {
        setOrderResult({
          id: "ORD12345",
          status: "printing",
          createdAt: "2025-04-15",
          estimatedCompletion: "2025-04-18",
          items: [
            { name: "Custom Keychain", quantity: 1 },
            { name: "Architectural Model", quantity: 1 },
          ],
        })
      } else {
        setError("No order found with the provided information")
        setOrderResult(null)
      }
      setIsLoading(false)
    }, 1500)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_queue":
        return "bg-amber-500 text-amber-50"
      case "printing":
        return "bg-blue-500 text-blue-50"
      case "post_processing":
        return "bg-purple-500 text-purple-50"
      case "dispatched":
        return "bg-green-500 text-green-50"
      case "delivered":
        return "bg-green-700 text-green-50"
      default:
        return "bg-gray-500 text-gray-50"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "in_queue":
        return "In Queue"
      case "printing":
        return "Printing"
      case "post_processing":
        return "Post-Processing"
      case "dispatched":
        return "Dispatched"
      case "delivered":
        return "Delivered"
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Package className="mr-2 h-5 w-5" />
          Order Tracker
        </CardTitle>
        <CardDescription>Track the status of your 3D printing order</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={trackingMethod} onValueChange={setTrackingMethod}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="order">Track by Order ID</TabsTrigger>
            <TabsTrigger value="email">Track by Email</TabsTrigger>
          </TabsList>

          <form onSubmit={handleTrack}>
            <div className="flex gap-2 mb-4">
              <div className="relative flex-grow">
                <Input
                  placeholder={trackingMethod === "order" ? "Enter order ID (e.g., ORD12345)" : "Enter your email"}
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  className="pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Track
              </Button>
            </div>
          </form>

          {error && <p className="text-sm text-destructive mb-4">{error}</p>}

          {orderResult && (
            <div className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-medium">{orderResult.id}</p>
                </div>
                <Badge className={getStatusColor(orderResult.status)}>{getStatusText(orderResult.status)}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p>{orderResult.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Completion</p>
                  <p>{orderResult.estimatedCompletion}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Items</p>
                <ul className="space-y-1">
                  {orderResult.items.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>x{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Order Progress</h4>
                  <span className="text-sm text-muted-foreground">
                    {orderResult.status === "in_queue"
                      ? "0%"
                      : orderResult.status === "printing"
                        ? "25%"
                        : orderResult.status === "post_processing"
                          ? "50%"
                          : orderResult.status === "dispatched"
                            ? "75%"
                            : "100%"}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{
                      width:
                        orderResult.status === "in_queue"
                          ? "0%"
                          : orderResult.status === "printing"
                            ? "25%"
                            : orderResult.status === "post_processing"
                              ? "50%"
                              : orderResult.status === "dispatched"
                                ? "75%"
                                : "100%",
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>In Queue</span>
                  <span>Printing</span>
                  <span>Processing</span>
                  <span>Dispatched</span>
                  <span>Delivered</span>
                </div>
              </div>
            </div>
          )}
        </Tabs>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <p>For demo, try "ORD12345" or "user@example.com"</p>
      </CardFooter>
    </Card>
  )
}
