"use client"

import { Suspense, useRef, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"

// 3D model component
function Model({ lowDetail }) {
  const modelRef = useRef()
  const { scene } = useGLTF("/models/3d-print-model.glb")

  // Simple gentle rotation animation
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  // Apply materials optimization based on device capabilities
  useEffect(() => {
    if (scene) {
      scene.traverse((node) => {
        if (node.isMesh) {
          // Optimize materials for low-end devices
          if (lowDetail) {
            node.material.roughness = 0.7
            node.material.metalness = 0.3
            node.castShadow = false
            node.receiveShadow = false
          } else {
            node.castShadow = true
            node.receiveShadow = true
          }
        }
      })
    }
  }, [scene, lowDetail])

  return <primitive ref={modelRef} object={scene} scale={1.5} position={[0, -0.5, 0]} />
}

// Fallback component for when 3D is loading
function ModelFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse text-primary text-xl">Loading 3D model...</div>
    </div>
  )
}

export default function Model3D({ isMobile }) {
  const { isLowEndDevice } = useDeviceCapabilities()
  const [mounted, setMounted] = useState(false)
  const [modelError, setModelError] = useState(false)

  // Only render after component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true)

    // Preload the model
    try {
      useGLTF.preload("/models/3d-print-model.glb")
    } catch (error) {
      console.error("Failed to preload 3D model:", error)
      setModelError(true)
    }
  }, [])

  if (!mounted || modelError) return <ModelFallback />

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
        onError={() => setModelError(true)}
      >
        <color attach="background" args={["transparent"]} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={isMobile ? 50 : 40} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} castShadow={!lowDetail} />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.4} castShadow={false} />

        <Suspense fallback={null}>
          <Model lowDetail={lowDetail} />
          <Environment preset="studio" />
        </Suspense>

        <OrbitControls
          enableZoom={true}
          zoomSpeed={0.5}
          minZoom={0.5}
          maxZoom={2}
          enablePan={false}
          autoRotate={false}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
