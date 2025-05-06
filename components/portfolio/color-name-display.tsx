interface ColorNameDisplayProps {
  colorName: string
  inStock: boolean
}

export default function ColorNameDisplay({ colorName, inStock }: ColorNameDisplayProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">{colorName}</span>
      {!inStock && (
        <span className="inline-block bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">Out of stock</span>
      )}
    </div>
  )
}
