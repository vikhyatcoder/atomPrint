"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/72308 24524", "_blank")
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 p-4 bg-background rounded-lg shadow-lg border animate-in fade-in slide-in-from-bottom-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Chat with us</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Have questions about our 3D printing services? Chat with us on WhatsApp!
          </p>
          <Button className="w-full" onClick={handleWhatsAppClick}>
            Start Chat
            <MessageCircle className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      <Button className="h-14 w-14 rounded-full shadow-lg" onClick={() => setIsOpen(!isOpen)}>
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  )
}
