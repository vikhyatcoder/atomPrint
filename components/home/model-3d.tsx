"use client"

import { Suspense, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei"

// Simplified model with reduced complexity
function Model(props) {
  const mesh = useRef()

  return (
    <mesh {...props} ref={mesh} castShadow receiveShadow>
      <torusKnotGeometry args={[1, 0.3, 64, 16]} />
      <meshStandardMaterial color="#ff3d81" metalness={0.5} roughness={0.2} />
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
  return (
    <div className="w-full h-full">
      <Canvas
        shadows={!isMobile}
        dpr={[0.5, 1.5]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        <color attach="background" args={["transparent"]} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={isMobile ? 50 : 40} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} castShadow={!isMobile} />

        <Suspense fallback={null}>
          <group rotation={[0, Math.PI / 4, 0]}>
            <Model />
          </group>
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
