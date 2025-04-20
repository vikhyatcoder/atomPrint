import { CuboidIcon as Cube, Lightbulb, Gift, GraduationCap, Factory, Building2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  color: string
}

export default function ServiceCard({ title, description, icon, color }: ServiceCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "Custom":
        return <Cube className="h-10 w-10" />
      case "Prototype":
        return <Lightbulb className="h-10 w-10" />
      case "Gift":
        return <Gift className="h-10 w-10" />
      case "Education":
        return <GraduationCap className="h-10 w-10" />
      case "Industrial":
        return <Factory className="h-10 w-10" />
      case "Architecture":
        return <Building2 className="h-10 w-10" />
      default:
        return <Cube className="h-10 w-10" />
    }
  }

  const getColorClass = () => {
    switch (color) {
      case "pink":
        return "bg-pink-500/10 text-pink-500 border-pink-500/20"
      case "green":
        return "bg-green-400/10 text-green-400 border-green-400/20"
      case "blue":
        return "bg-blue-400/10 text-blue-400 border-blue-400/20"
      case "yellow":
        return "bg-yellow-400/10 text-yellow-400 border-yellow-400/20"
      case "purple":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "cyan":
        return "bg-cyan-400/10 text-cyan-400 border-cyan-400/20"
      default:
        return "bg-pink-500/10 text-pink-500 border-pink-500/20"
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color)]/10 group">
      <CardHeader>
        <div className={`p-3 rounded-lg inline-block ${getColorClass()}`}>{getIcon()}</div>
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-3 text-xl group-hover:text-[var(--color)]">{title}</CardTitle>
        <p className="text-gray-400">{description}</p>
      </CardContent>
    </Card>
  )
}
