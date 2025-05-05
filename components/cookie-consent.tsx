"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookieConsent")
    if (!hasConsented) {
      // Show the consent banner after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true")
    setShowConsent(false)
  }

  const handleDecline = () => {
    // You might want to disable certain cookies/tracking here
    localStorage.setItem("cookieConsent", "false")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom-10">
      <Card className="max-w-4xl mx-auto border-primary/20">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2">Cookie Consent</h3>
          <p className="text-muted-foreground">
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By
            clicking "Accept All", you consent to our use of cookies. You can manage your preferences or learn more in
            our{" "}
            <Link href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 justify-end">
          <Button variant="outline" onClick={handleDecline}>
            Decline
          </Button>
          <Button onClick={handleAccept}>Accept All</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
