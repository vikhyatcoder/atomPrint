"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import non-critical components with a delay
const WhatsAppButton = dynamic(
  () =>
    new Promise((resolve) => {
      // Delay loading by 2 seconds after page load
      setTimeout(() => resolve(import("@/components/whatsapp-button")), 2000)
    }),
  {
    ssr: false,
    loading: () => null,
  },
)

export default function WhatsAppButtonWrapper() {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    // Only render the WhatsApp button after user has been on the page for a while
    const timer = setTimeout(() => {
      setShouldRender(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!shouldRender) return null

  return <WhatsAppButton />
}
