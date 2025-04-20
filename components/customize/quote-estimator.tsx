"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"

export default function QuoteEstimator() {
  const [quoteData, setQuoteData] = useState({
    baseCost: 25,
    materialCost: 15,
    complexityCost: 10,
    finishingCost: 5,
    expeditedCost: 0,
    total: 0,
  })

  useEffect(() => {
    // Calculate total whenever any cost changes
    const total =
      quoteData.baseCost +
      quoteData.materialCost +
      quoteData.complexityCost +
      quoteData.finishingCost +
      quoteData.expeditedCost

    setQuoteData((prev) => ({ ...prev, total }))
  }, [
    quoteData.baseCost,
    quoteData.materialCost,
    quoteData.complexityCost,
    quoteData.finishingCost,
    quoteData.expeditedCost,
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5" />
          Quote Estimate
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Base Cost:</span>
                <span>${quoteData.baseCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Material Cost:</span>
                <span>${quoteData.materialCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Complexity:</span>
                <span>${quoteData.complexityCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Finishing:</span>
                <span>${quoteData.finishingCost.toFixed(2)}</span>
              </div>
              {quoteData.expeditedCost > 0 && (
                <div className="flex justify-between">
                  <span>Expedited Service:</span>
                  <span>${quoteData.expeditedCost.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                <span>Estimated Total:</span>
                <span>${quoteData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Need it faster?</h3>
            <div className="flex gap-2">
              <Button
                variant={quoteData.expeditedCost === 0 ? "outline" : "default"}
                size="sm"
                className="flex-1"
                onClick={() => setQuoteData((prev) => ({ ...prev, expeditedCost: 0 }))}
              >
                Standard
              </Button>
              <Button
                variant={quoteData.expeditedCost === 15 ? "default" : "outline"}
                size="sm"
                className="flex-1"
                onClick={() => setQuoteData((prev) => ({ ...prev, expeditedCost: 15 }))}
              >
                Express (+$15)
              </Button>
              <Button
                variant={quoteData.expeditedCost === 30 ? "default" : "outline"}
                size="sm"
                className="flex-1"
                onClick={() => setQuoteData((prev) => ({ ...prev, expeditedCost: 30 }))}
              >
                Rush (+$30)
              </Button>
            </div>
          </div>

          <div className="pt-4">
            <Button className="w-full">Request Final Quote</Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              This is an estimate. Final pricing will be confirmed after review.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
