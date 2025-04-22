import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CuboidIcon as Cube, Lightbulb, Gift, GraduationCap, Factory, Building2, Palette, Cog } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Custom Model Printing",
    description: "A lot of options are available for printing with multiple qualities of PLA/Filament, giving a wholesome experience for your custom printings",
    icon: Cube,
    color: "text-primary",
    bgColor: "bg-primary/10",
    popular: false,
    features: [
      "High-quality STL/OBJ uploads!"
    	"Scale and size alterations"
  	  "Industrial-grade printing quality"
      "Multiple finishing options available"

    ],
  },
  {
    id: 2,
    title: "Prototyping for Startups",
    description: "Rapid prototyping solutions to bring your product ideas to life quickly.",
    icon: Lightbulb,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    popular: true,
    features: [
      "Quick turnaround times",
      "Iterative design support",
      "Functional prototypes",
      "Material recommendations",
      "Design consultation",
    ],
  },
  {
    id: 3,
    title: "Personalized Gifts & Decor",
    description: "Create unique, personalized items for special occasions or home decor.",
    icon: Gift,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    popular: false,
    features: ["Custom text and designs", "Photo-based models", "Gift packaging available", "Various color options"],
  },
  {
    id: 4,
    title: "Educational Models",
    description: "Detailed anatomical, molecular, or conceptual models for educational purposes.",
    icon: GraduationCap,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    popular: false,
    features: [
      "Anatomically correct models",
      "Molecular structures",
      "Geographic models",
      "Historical replicas",
      "Bulk discounts for classrooms",
    ],
  },
  {
    id: 5,
    title: "Industrial & Functional Parts",
    description: "Durable, precise components for industrial applications and replacements.",
    icon: Factory,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    popular: false,
    features: [
      "High-strength materials",
      "Precise tolerances",
      "Replacement parts",
      "Custom fixtures and tools",
      "Heat-resistant options",
    ],
  },
  {
    id: 6,
    title: "Architectural Models",
    description: "Detailed scale models of buildings, landscapes, and urban designs.",
    icon: Building2,
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
    popular: false,
    features: [
      "Accurate scaling",
      "Landscape integration",
      "Multiple building sets",
      "Color-coded sections",
      "Display bases available",
    ],
  },
  {
    id: 7,
    title: "Art & Sculptures",
    description: "Turn digital art into physical sculptures and artistic pieces.",
    icon: Palette,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    popular: false,
    features: [
      "High-detail printing",
      "Artist collaborations",
      "Custom finishes",
      "Exhibition-ready pieces",
      "Limited edition options",
    ],
  },
  {
    id: 8,
    title: "Design Services",
    description: "Don't have a 3D model? Our team can design one based on your specifications.",
    icon: Cog,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    popular: false,
    features: [
      "Concept sketches",
      "3D modeling",
      "Design revisions",
      "Technical specifications",
      "File preparation for printing",
    ],
  },
]

export default function ServiceCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
      {services.map((service) => (
        <Card key={service.id} className="h-full flex flex-col relative overflow-hidden">
          {service.popular && (
            <div className="absolute top-0 right-0">
              <Badge className="rounded-tl-none rounded-tr-none rounded-br-none bg-secondary text-secondary-foreground">
                Popular
              </Badge>
            </div>
          )}
          <CardHeader>
            <div className={`p-3 rounded-lg inline-block ${service.bgColor} ${service.color} mb-4`}>
              <service.icon className="h-6 w-6" />
            </div>
            <CardTitle>{service.title}</CardTitle>
            <CardDescription>{service.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Get Started</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
