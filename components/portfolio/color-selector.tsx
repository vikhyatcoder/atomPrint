"use client"

import type { PortfolioItemColor } from "./portfolio-data"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

interface ColorSelectorProps {
  colors: PortfolioItemColor[]
  selectedColorId: string
  onColorSelect: (colorId: string) => void
  className?: string
}

export default function ColorSelector({ colors, selectedColorId, onColorSelect, className }: ColorSelectorProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <div className="flex items-center mr-2">
        <span className="text-sm font-medium">Color:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => {
          const isSelected = color.id === selectedColorId
          const isOutOfStock = !color.inStock

          return (
            <button
              key={color.id}
              type="button"
              onClick={() => onColorSelect(color.id)}
              disabled={isOutOfStock}
              className={cn(
                "relative w-8 h-8 rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isSelected
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-gray-300 dark:border-gray-600",
                isOutOfStock ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-110",
              )}
              aria-label={`${color.name}${isOutOfStock ? " (Out of Stock)" : ""}`}
              aria-pressed={isSelected}
            >
              <span
                className="absolute inset-0.5 rounded-full"
                style={{
                  background: color.hex.startsWith("#") ? color.hex : color.hex,
                  boxShadow: color.hex === "#ffffff" ? "inset 0 0 0 1px rgba(0,0,0,0.1)" : undefined,
                }}
              />
              {isSelected && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Check
                    className={cn(
                      "h-4 w-4",
                      color.hex === "#ffffff" || color.hex.includes("linear-gradient") ? "text-black" : "text-white",
                    )}
                  />
                </span>
              )}
              {isOutOfStock && (
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-1.5 py-0.5 rounded whitespace-nowrap">
                  Out of stock
                </span>
              )}
              <VisuallyHidden>
                {color.name}
                {isOutOfStock ? " (Out of Stock)" : ""}
              </VisuallyHidden>
            </button>
          )
        })}
      </div>
    </div>
  )
}
