"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Float, Loader } from "@react-three/drei"
import * as THREE from "three"
import { useMediaQuery } from "@/hooks/use-media-query"

// Simplified printer model
function PrinterModel(props) {
  const group = useRef()
  const { isMobile } = props

  // Simplified animation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (state.mouse.x * Math.PI) / 15, 0.03)
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Base of printer */}
      <mesh position={[0, -1.5, 0]} receiveShadow>
        <boxGeometry args={[5, 1, 5]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Frame */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[4.5, 4, 4.5]} />
        <meshStandardMaterial color="#262626" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Print bed */}
      <mesh position={[0, -0.8, 0]} receiveShadow>
        <boxGeometry args={[3, 0.2, 3]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Extruder arm */}
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry args={[0.5, 0.5, 4]} />
        <meshStandardMaterial color="#444444" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Extruder head */}
      <mesh position={[0, 1.5, 1.5]} castShadow>
        <boxGeometry args={[0.8, 1, 0.8]} />
        <meshStandardMaterial color="#555555" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Colorful 3D printed object */}
      <mesh position={[0, 0, 0]} castShadow>
        <torusKnotGeometry args={[0.8, 0.3, isMobile ? 64 : 128, isMobile ? 16 : 32]} />
        <meshStandardMaterial color="#ff3d81" metalness={0.3} roughness={0.2} />
      </mesh>

      {/* Control panel */}
      <mesh position={[-1.8, 0.5, -1.8]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.2]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Small LED lights */}
      <pointLight position={[-1.8, 0.5, -1.7]} intensity={0.3} color="#00e5a0" distance={1} />
      <pointLight position={[0, 1.5, 1.6]} intensity={0.3} color="#ff3d81" distance={1} />
    </group>
  )
}

export default function Hero3DPrinter() {
  const [isMounted, setIsMounted] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="w-full h-screen bg-transparent" />
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-transparent">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          </div>
        }
      >
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
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={isMobile ? 50 : 40} />
          <ambientLight intensity={0.3} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} castShadow={!isMobile} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />

          <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
            <PrinterModel position={[0, -1, 0]} scale={isMobile ? 0.6 : 0.8} isMobile={isMobile} />
          </Float>

          <Environment preset="city" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.8}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Canvas>
      </Suspense>

      <Loader
        containerStyles={{
          background: "rgba(15, 15, 18, 0.5)",
          backdropFilter: "blur(10px)",
        }}
        innerStyles={{
          backgroundColor: "rgba(255, 61, 129, 0.2)",
        }}
        barStyles={{
          backgroundColor: "rgba(255, 61, 129, 1)",
        }}
      />
    </div>
  )
}
