export interface PortfolioItemColor {
  id: string
  name: string
  hex: string
  image: string
  inStock: boolean
  price?: string
}

export interface PortfolioItem {
  id: number
  title: string
  category: string
  tags: string[]
  description: string
  client: string
  material: string
  printTime: string
  colors: PortfolioItemColor[]
  defaultColorId: string
}

// Sample portfolio data with color variations
export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Modern Architectural House Model",
    category: "Architecture",
    tags: ["architecture", "residential", "models"],
    description:
      "A detailed architectural model of a modern minimalist house with multiple levels and open spaces. Perfect for client presentations and design visualization.",
    client: "Architectural Design Studio",
    material: "PLA",
    printTime: "24 hours",
    defaultColorId: "white",
    colors: [
      {
        id: "white",
        name: "White",
        hex: "#ffffff",
        image: "/images/3d-house.jpg",
        inStock: true,
        price: "₹2,499",
      },
      {
        id: "gray",
        name: "Gray",
        hex: "#9ca3af",
        image: "/placeholder.svg?height=600&width=800",
        inStock: true,
        price: "₹2,499",
      },
      {
        id: "black",
        name: "Black",
        hex: "#1f2937",
        image: "/placeholder.svg?height=600&width=800",
        inStock: false,
        price: "₹2,699",
      },
    ],
  },
  {
    id: 2,
    title: "Functional Robotic Arm",
    category: "Engineering",
    tags: ["engineering", "robotics", "functional"],
    description:
      "A fully functional 3D printed robotic arm with servo motors and electronic components. Features a gripper mechanism and multiple points of articulation.",
    client: "Engineering Research Lab",
    material: "PLA, Electronic Components",
    printTime: "16 hours",
    defaultColorId: "red",
    colors: [
      {
        id: "red",
        name: "Red",
        hex: "#ef4444",
        image: "/images/robotic-arm.jpg",
        inStock: true,
        price: "₹3,999",
      },
      {
        id: "blue",
        name: "Blue",
        hex: "#3b82f6",
        image: "/placeholder.svg?height=600&width=800",
        inStock: true,
        price: "₹3,999",
      },
      {
        id: "black",
        name: "Black",
        hex: "#1f2937",
        image: "/placeholder.svg?height=600&width=800",
        inStock: true,
        price: "₹4,299",
      },
    ],
  },
  {
    id: 3,
    title: "Lord Ganesha Figurine",
    category: "Art & Gifts",
    tags: ["art", "religious", "gifts"],
    description:
      "A detailed small scale model of the printed devotee lord Ghanesha printed with high quality filament and durable in strength",
    client: "Sandeep Mishra",
    material: "PLA",
    printTime: "40 Minutes",
    defaultColorId: "blue",
    colors: [
      {
        id: "blue",
        name: "Blue",
        hex: "#3b82f6",
        image: "/images/lord-ganesha.png",
        inStock: true,
        price: "₹899",
      },
      {
        id: "gold",
        name: "Gold",
        hex: "#f59e0b",
        image: "/placeholder.svg?height=600&width=800",
        inStock: true,
        price: "₹1,099",
      },
      {
        id: "silver",
        name: "Silver",
        hex: "#94a3b8",
        image: "/placeholder.svg?height=600&width=800",
        inStock: false,
        price: "₹999",
      },
    ],
  },
  {
    id: 4,
    title: "Gradient Phone Stand",
    category: "Tools",
    tags: ["tools", "accessories", "functional"],
    description:
      "A stylish phone stand with gradient coloring, designed for optimal viewing angles and cable management.",
    client: "Tech Accessories Shop",
    material: "PLA with Gradient Effect",
    printTime: "4 hours",
    defaultColorId: "blue-purple",
    colors: [
      {
        id: "blue-purple",
        name: "Blue-Purple",
        hex: "linear-gradient(to right, #3b82f6, #8b5cf6)",
        image: "/images/phone-stand.webp",
        inStock: true,
        price: "₹599",
      },
      {
        id: "red-orange",
        name: "Red-Orange",
        hex: "linear-gradient(to right, #ef4444, #f97316)",
        image: "/placeholder.svg?height=600&width=800",
        inStock: true,
        price: "₹599",
      },
      {
        id: "green-teal",
        name: "Green-Teal",
        hex: "linear-gradient(to right, #10b981, #06b6d4)",
        image: "/placeholder.svg?height=600&width=800",
        inStock: true,
        price: "₹599",
      },
    ],
  },
  {
    id: 5,
    title: "Miniature Boat Model",
    category: "Education",
    tags: ["education", "toys", "models"],
    description:
      "Detailed model of a boat suitable for decoration and gifting purposes and also available for architectural purposes.",
    client: "Suman Bhati ",
    material: "PLA",
    printTime: "30 Minutes",
    defaultColorId: "white",
    colors: [
      {
        id: "white",
        name: "White",
        hex: "#ffffff",
        image: "/images/boat.jpg",
        inStock: true,
        price: "₹799",
      },
      {
        id: "blue",
        name: "Blue",
        hex: "#3b82f6",
        image: "/placeholder.svg?height=600&width=800",
        inStock: true,
        price: "₹799",
      },
      {
        id: "brown",
        name: "Brown",
        hex: "#92400e",
        image: "/placeholder.svg?height=600&width=800",
        inStock: false,
        price: "₹849",
      },
    ],
  },
  {
    id: 6,
    title: "Articulated Dinosaur",
    category: "Toys & Games",
    tags: ["toys", "education", "gifts"],
    description:
      "A cheerful model of a dino, expressing about the emotion of Joy optimal for giftings and décor purposes",
    client: "Mandeep Singh",
    material: "PLA",
    printTime: "1.5 hours",
    defaultColorId: "blue",
    colors: [
      {
        id: "blue",
        name: "Blue",
        hex: "#3b82f6",
        image: "/images/dinosaur.jpg",
        inStock: true,
        price: "₹699",
      },
      {
        id: "green",
        name: "Green",
        hex: "#10b981",
        image: "/placeholder.svg?height=600&width=800",
        inStock: true,
        price: "₹699",
      },
      {
        id: "red",
        name: "Red",
        hex: "#ef4444",
        image: "/placeholder.svg?height=600&width=800",
        inStock: true,
        price: "₹699",
      },
      {
        id: "yellow",
        name: "Yellow",
        hex: "#f59e0b",
        image: "/placeholder.svg?height=600&width=800",
        inStock: false,
        price: "₹699",
      },
    ],
  },
  {
    id: 7,
    title: "Spider Model",
    category: "Education",
    tags: ["education", "science", "biology"],
    description:
      "Model of a spider describing about the texture and the physical features of it best for educational purposes and demonstration",
    client: "Jatin Bansal",
    material: "PLA",
    printTime: "25 Minutes",
    defaultColorId: "white",
    colors: [
      {
        id: "white",
        name: "White",
        hex: "#ffffff",
        image: "/images/spider.jpg",
        inStock: true,
        price: "₹499",
      },
      {
        id: "black",
        name: "Black",
        hex: "#1f2937",
        image: "/placeholder.svg?height=600&width=800",
        inStock: true,
        price: "₹499",
      },
      {
        id: "brown",
        name: "Brown",
        hex: "#92400e",
        image: "/placeholder.svg?height=600&width=800",
        inStock: true,
        price: "₹499",
      },
    ],
  },
]
