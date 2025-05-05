"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen pt-20 flex items-center bg-[#0a0c16] overflow-hidden">
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="z-10">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-gray-200">
              <span className="block">Design It.</span>
              <span className="block">Customize It.</span>
              <span className="bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
                Print It.
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-400 max-w-md">
              Turn your creative ideas into tangible reality with our student-run 3D printing service.
            </p>
            <div className="flex flex-row gap-4">
              <Button
                asChild
                variant="default"
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
              >
                <Link href="/portfolio">
                  View Portfolio <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 rounded-full px-6"
              >
                <Link href="/services">Start Printing</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
          {mounted && (
            <Image
              src="/images/3d-house.jpg"
              alt="3D printed architectural model"
              fill
              className="object-contain"
              priority
            />
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-gray-400" />
      </div>
    </section>
  )
}
