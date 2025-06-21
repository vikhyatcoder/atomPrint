export interface ModelData {
  fileName: string
  fileSize: number
  volume: number // in cm³
  surfaceArea?: number // in cm²
  triangleCount?: number
  boundingBox: {
    min: { x: number; y: number; z: number }
    max: { x: number; y: number; z: number }
  }
  geometry: any // Three.js geometry object
  buffer: ArrayBuffer
}

export interface PrintSettings {
  material: string
  infillPercentage: number
  supportsEnabled: boolean
  layerHeight: number
  printSpeed: number
  scaleFactor: number // Add this new field for size scaling
}

export interface AnalysisResults {
  volume: number // Original volume in cm³
  effectiveVolume: number // Volume including infill and supports
  weight: number // in grams
  printTime: number // in minutes
  materialCost: number // in currency units
  surfaceArea: number // in cm²
  supportVolume: number // in cm³
  layerCount: number
}
