"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useLazyLoad } from "@/hooks/use-lazy-load"

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  priority = false,
  sizes = "100vw",
  quality = 75,
  placeholder = "empty",
  blurDataURL,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [ref, inView] = useLazyLoad({ enabled: !priority })
  const [shouldLoad, setShouldLoad] = useState(priority)

  // Start loading when in view or if priority
  useEffect(() => {
    if (inView && !shouldLoad) {
      setShouldLoad(true)
    }
  }, [inView, shouldLoad])

  return (
    <div
      ref={priority ? null : (ref as any)}
      className={`relative overflow-hidden ${fill ? "w-full h-full" : ""}`}
      style={fill ? {} : { width, height }}
    >
      {shouldLoad ? (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
          sizes={sizes}
          quality={quality}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setIsLoaded(true)}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
        />
      ) : (
        <div
          className="w-full h-full bg-muted/30 animate-pulse"
          style={fill ? {} : { width, height }}
          aria-label={`Loading image: ${alt}`}
        />
      )}
    </div>
  )
}
