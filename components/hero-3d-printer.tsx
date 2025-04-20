"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Float } from "@react-three/drei"
import * as THREE from "three"

// Create a reusable function to generate gradient textures
function createGradientTexture() {
  const size = 1024
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = 1

  const context = canvas.getContext("2d")
  const gradient = context.createLinearGradient(0, 0, size, 0)

  // Add color stops to match the rainbow colors in the logo
  gradient.addColorStop(0, "#ff3d81") // pink
  gradient.addColorStop(0.2, "#ffcc00") // yellow
  gradient.addColorStop(0.4, "#00e5a0") // green
  gradient.addColorStop(0.6, "#3db4ff") // blue
  gradient.addColorStop(0.8, "#9c3dff") // purple
  gradient.addColorStop(1, "#ff3d81") // back to pink for seamless wrapping

  context.fillStyle = gradient
  context.fillRect(0, 0, size, 1)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1, 1)

  return texture
}

function Printer(props) {
  const group = useRef()
  const [gradientTexture, setGradientTexture] = useState(null)

  useEffect(() => {
    // Create the gradient texture on the client side
    setGradientTexture(createGradientTexture())
  }, [])

  // Create a stylized 3D printer using basic geometries
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (state.mouse.x * Math.PI) / 10, 0.05)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, (state.mouse.y * Math.PI) / 20, 0.05)
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Base of printer */}
      <mesh position={[0, -1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 1, 5]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Frame */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.5, 4, 4.5]} />
        <meshStandardMaterial color="#262626" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Print bed */}
      <mesh position={[0, -0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.2, 3]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Extruder arm */}
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.5, 4]} />
        <meshStandardMaterial color="#444444" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Extruder head */}
      <mesh position={[0, 1.5, 1.5]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 1, 0.8]} />
        <meshStandardMaterial color="#555555" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Colorful 3D printed object (similar to the image) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]} castShadow>
          <torusKnotGeometry args={[0.8, 0.3, 200, 32, 3, 4]} />
          {gradientTexture ? (
            <meshStandardMaterial map={gradientTexture} metalness={0.3} roughness={0.2} />
          ) : (
            <meshStandardMaterial color="#ff3d81" metalness={0.3} roughness={0.2} />
          )}
        </mesh>
      </Float>

      {/* Control panel */}
      <mesh position={[-1.8, 0.5, -1.8]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.8, 0.2]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Small LED lights */}
      <pointLight position={[-1.8, 0.5, -1.7]} intensity={0.5} color="#00e5a0" distance={1} />
      <pointLight position={[0, 1.5, 1.6]} intensity={0.5} color="#ff3d81" distance={1} />
    </group>
  )
}

// Colorful gradient background
function GradientBackground() {
  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial color="#0f0f12" />
    </mesh>
  )
}

export default function Hero3DPrinter() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="w-full h-screen bg-gray-950" />
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <GradientBackground />

        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Printer position={[0, -1, 0]} scale={0.8} />
        </Float>

        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.8}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  )
}
