import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface Testimonial {
  text: string
  author: string
}

interface GalleryItemProps {
  image: string
  title: string
  category: string
  testimonial?: Testimonial
}

export default function GalleryItem({ image, title, category, testimonial }: GalleryItemProps) {
  return (
    <Card className="overflow-hidden bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300 group">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 text-xs font-medium bg-pink-500/80 rounded-full">{category}</span>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        {testimonial && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-sm italic text-gray-400 mb-2">"{testimonial.text}"</p>
            <p className="text-sm font-medium">— {testimonial.author}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
