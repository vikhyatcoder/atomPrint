"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, ZoomIn, ZoomOut, Move3D } from "lucide-react"
import type { ModelData } from "./types"

interface ModelViewerProps {
  modelData: ModelData
  compact?: boolean
}

declare global {
  interface Window {
    THREE: any
  }
}

export default function ModelViewer({ modelData, compact = false }: ModelViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<any>()
  const rendererRef = useRef<any>()
  const cameraRef = useRef<any>()
  const controlsRef = useRef<any>()
  const meshRef = useRef<any>()
  const [isLoading, setIsLoading] = useState(true)
  const [threeLoaded, setThreeLoaded] = useState(false)

  // Load Three.js from CDN
  useEffect(() => {
    if (window.THREE) {
      setThreeLoaded(true)
      return
    }

    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r158/three.min.js"
    script.onload = () => {
      // Load OrbitControls
      const controlsScript = document.createElement("script")
      controlsScript.src = "https://cdn.jsdelivr.net/npm/three@0.158.0/examples/js/controls/OrbitControls.js"
      controlsScript.onload = () => {
        setThreeLoaded(true)
      }
      document.head.appendChild(controlsScript)
    }
    document.head.appendChild(script)

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (!mountRef.current || !modelData.geometry || !threeLoaded || !window.THREE) return

    const THREE = window.THREE
    const mount = mountRef.current
    const width = mount.clientWidth
    const height = compact ? 300 : 500

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf5f5f5)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer

    mount.appendChild(renderer.domElement)

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    // Add model to scene
    const geometry = modelData.geometry.clone()
    geometry.computeVertexNormals()

    const material = new THREE.MeshLambertMaterial({
      color: 0x00ff88,
      side: THREE.DoubleSide,
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true
    mesh.receiveShadow = true
    meshRef.current = mesh
    scene.add(mesh)

    // Center and scale the model
    const box = new THREE.Box3().setFromObject(mesh)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())

    mesh.position.sub(center)

    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 5 / maxDim
    mesh.scale.setScalar(scale)

    // Position camera
    camera.position.set(8, 8, 8)
    camera.lookAt(0, 0, 0)

    // Controls setup
    const controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = true
    controls.enablePan = true
    controlsRef.current = controls

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      const newWidth = mount.clientWidth
      const newHeight = compact ? 300 : 500

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener("resize", handleResize)
    setIsLoading(false)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [modelData, compact, threeLoaded])

  const resetView = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(8, 8, 8)
      cameraRef.current.lookAt(0, 0, 0)
      controlsRef.current.reset()
    }
  }

  const zoomIn = () => {
    if (cameraRef.current) {
      cameraRef.current.position.multiplyScalar(0.8)
    }
  }

  const zoomOut = () => {
    if (cameraRef.current) {
      cameraRef.current.position.multiplyScalar(1.2)
    }
  }

  return (
    <div className="relative">
      <div
        ref={mountRef}
        className="w-full rounded-lg overflow-hidden border bg-gray-50 dark:bg-gray-900"
        style={{ height: compact ? 300 : 500 }}
      />

      {(isLoading || !threeLoaded) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">
              {!threeLoaded ? "Loading 3D engine..." : "Loading 3D model..."}
            </p>
          </div>
        </div>
      )}

      {!compact && threeLoaded && (
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button size="sm" variant="secondary" onClick={resetView} title="Reset View">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="secondary" onClick={zoomIn} title="Zoom In">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="secondary" onClick={zoomOut} title="Zoom Out">
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
        <div className="flex items-center gap-2">
          <Move3D className="h-3 w-3" />
          <span>Click and drag to rotate • Scroll to zoom • Right-click to pan</span>
        </div>
      </div>
    </div>
  )
}
