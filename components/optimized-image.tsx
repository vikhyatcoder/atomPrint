"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  onLoad?: () => void
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 75,
  onLoad,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(priority)

  useEffect(() => {
    if (!priority) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting)
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer.disconnect()
          }
        },
        { rootMargin: "200px" },
      )

      const element = document.getElementById(`image-container-${src.replace(/[^a-zA-Z0-9]/g, "")}`)
      if (element) {
        observer.observe(element)
      }

      return () => {
        if (element) {
          observer.unobserve(element)
        }
        observer.disconnect()
      }
    }
  }, [src, priority])

  const handleImageLoad = () => {
    setIsLoaded(true)
    if (onLoad) onLoad()
  }

  return (
    <div
      id={`image-container-${src.replace(/[^a-zA-Z0-9]/g, "")}`}
      className={cn("overflow-hidden", fill ? "relative w-full h-full" : "")}
      style={!fill && width && height ? { width, height } : {}}
    >
      {shouldLoad || priority ? (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          className={cn("transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0", className)}
          sizes={sizes}
          quality={quality}
          loading={priority ? "eager" : "lazy"}
          onLoad={handleImageLoad}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOQvhAAAAABJRU5ErkJggg=="
        />
      ) : (
        <div className="w-full h-full bg-gray-800 animate-pulse" aria-label={`Loading image: ${alt}`} />
      )}
    </div>
  )
}
