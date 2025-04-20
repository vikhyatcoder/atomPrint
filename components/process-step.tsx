import type { ReactNode } from "react"

interface ProcessStepProps {
  number: string
  title: string
  description: string
  icon: ReactNode
}

export default function ProcessStep({ number, title, description, icon }: ProcessStepProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-6 relative z-10">
          {icon}
        </div>
        <div className="absolute top-0 left-0 w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-green-400 opacity-20 animate-pulse"></div>
      </div>
      <div className="text-4xl font-bold text-gray-700 mb-2">{number}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}
