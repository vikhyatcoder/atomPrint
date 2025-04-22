"use client"

import dynamic from "next/dynamic"

// Dynamically import non-critical components
const WhatsAppButton = dynamic(() => import("@/components/whatsapp-button"), {
  ssr: false,
  loading: () => null,
})

export default function WhatsAppButtonWrapper() {
  return <WhatsAppButton />
}
