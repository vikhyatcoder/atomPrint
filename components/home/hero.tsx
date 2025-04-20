"use client"

import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei"

function Model(props) {
  // This is a placeholder for a 3D model
  // In a real implementation, you would use useGLTF to load a 3D model
  return (
    <mesh {...props} castShadow receiveShadow>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial color="#ff3d81" metalness={0.5} roughness={0.2} />
    </mesh>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative min-h-screen pt-20 flex items-center hero-pattern overflow-hidden">
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block">Design It.</span>
              <span className="block">Customize It.</span>
              <span className="gradient-text">Print It.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
              Turn your creative ideas into tangible reality with our student-run 3D printing service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/portfolio">
                  View Portfolio <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">Start Printing</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="relative h-[400px] lg:h-[600px]" ref={containerRef}>
          <div className="absolute inset-0">
            <Canvas shadows dpr={[1, 2]}>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />
              <ambientLight intensity={0.4} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

              <motion.group
                animate={{
                  rotateY: [0, Math.PI * 2],
                }}
                transition={{
                  duration: 20,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <Model />
              </motion.group>

              <Environment preset="city" />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
            </Canvas>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowRight className="h-8 w-8 rotate-90 text-muted-foreground" />
      </div>
    </section>
  )
}
