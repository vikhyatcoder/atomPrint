"use client"

import { Suspense, useRef, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"

// Simplified model with reduced complexity
function Model(props) {
  const mesh = useRef()
  const { lowDetail } = props

  return (
    <mesh {...props} ref={mesh} castShadow receiveShadow>
      <torusKnotGeometry args={[1, 0.3, lowDetail ? 32 : 64, lowDetail ? 8 : 16]} />
      <meshStandardMaterial color="#ff3d81" metalness={0.5} roughness={0.2} transparent={true} opacity={1} />
    </mesh>
  )
}

// Fallback component for when 3D is loading
function ModelFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse-slow text-primary text-xl">Loading 3D model...</div>
    </div>
  )
}

export default function Model3D({ isMobile }) {
  const { isLowEndDevice } = useDeviceCapabilities()
  const [mounted, setMounted] = useState(false)

  // Only render after component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <ModelFallback />

  // Determine detail level based on device capabilities
  const lowDetail = isMobile || isLowEndDevice

  return (
    <div className="w-full h-full">
      <Canvas
        shadows={!lowDetail}
        dpr={[0.5, lowDetail ? 1 : 1.5]} // Lower DPR for low-end devices
        gl={{
          antialias: !lowDetail, // Disable antialiasing on low-end devices
          powerPreference: "high-performance",
          alpha: true, // Ensure transparency
          preserveDrawingBuffer: false, // Better performance
        }}
        style={{ background: "transparent" }} // Ensure transparent background
      >
        <color attach="background" args={["transparent"]} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={isMobile ? 50 : 40} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} castShadow={!lowDetail} />

        <Suspense fallback={null}>
          <group rotation={[0, Math.PI / 4, 0]}>
            <Model lowDetail={lowDetail} />
          </group>
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={lowDetail ? 0.3 : 0.5} // Slower rotation for low-end devices
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
