"use client"

import { motion } from "framer-motion"

export default function Fallback3D() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-900/50 to-gray-950/50 rounded-lg backdrop-blur-sm">
      <div className="text-center p-6">
        <motion.div
          animate={{
            rotateY: [0, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
          className="w-24 h-24 mx-auto mb-6 rounded-xl bg-primary/20 flex items-center justify-center"
        >
          <span className="text-4xl">🖨️</span>
        </motion.div>
        <h3 className="text-xl font-bold mb-2">3D Printing Excellence</h3>
        <p className="text-muted-foreground max-w-xs mx-auto">
          Turn your ideas into reality with our premium 3D printing services
        </p>
      </div>
    </div>
  )
}
