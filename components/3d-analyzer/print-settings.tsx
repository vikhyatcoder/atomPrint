"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Loader2, Calculator } from "lucide-react"
import type { PrintSettings as PrintSettingsType } from "./types"

interface PrintSettingsProps {
  settings: PrintSettingsType
  onSettingsChange: (settings: PrintSettingsType) => void
  onAnalyze: () => void
  isAnalyzing: boolean
  disabled: boolean
}

const materials = [
  { value: "PLA", label: "PLA (1.24 g/cm³)", density: 1.24 },
  { value: "ABS", label: "ABS (1.04 g/cm³)", density: 1.04 },
  { value: "PETG", label: "PETG (1.27 g/cm³)", density: 1.27 },
  { value: "TPU", label: "TPU (1.20 g/cm³)", density: 1.2 },
  { value: "WOOD", label: "Wood PLA (1.28 g/cm³)", density: 1.28 },
]

export default function PrintSettings({
  settings,
  onSettingsChange,
  onAnalyze,
  isAnalyzing,
  disabled,
}: PrintSettingsProps) {
  const updateSetting = <K extends keyof PrintSettingsType>(key: K, value: PrintSettingsType[K]) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Print Settings</CardTitle>
        <CardDescription>Configure your 3D printing parameters for accurate analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="material">Material Type</Label>
          <Select
            value={settings.material}
            onValueChange={(value) => updateSetting("material", value)}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select material" />
            </SelectTrigger>
            <SelectContent>
              {materials.map((material) => (
                <SelectItem key={material.value} value={material.value}>
                  {material.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="scale">Model Scale</Label>
            <span className="text-sm font-medium">{(settings.scaleFactor * 100).toFixed(0)}%</span>
          </div>
          <Slider
            id="scale"
            min={0.1}
            max={3.0}
            step={0.1}
            value={[settings.scaleFactor]}
            onValueChange={(value) => updateSetting("scaleFactor", value[0])}
            disabled={disabled}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>10% (Tiny)</span>
            <span>100% (Original)</span>
            <span>300% (Large)</span>
          </div>
          <div className="text-xs text-muted-foreground">Scaling affects volume, print time, and material usage</div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="infill">Infill Percentage</Label>
            <span className="text-sm font-medium">{settings.infillPercentage}%</span>
          </div>
          <Slider
            id="infill"
            min={0}
            max={100}
            step={5}
            value={[settings.infillPercentage]}
            onValueChange={(value) => updateSetting("infillPercentage", value[0])}
            disabled={disabled}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0% (Hollow)</span>
            <span>50% (Standard)</span>
            <span>100% (Solid)</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="layer-height">Layer Height (mm)</Label>
            <span className="text-sm font-medium">{settings.layerHeight}mm</span>
          </div>
          <Slider
            id="layer-height"
            min={0.1}
            max={0.4}
            step={0.05}
            value={[settings.layerHeight]}
            onValueChange={(value) => updateSetting("layerHeight", value[0])}
            disabled={disabled}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0.1mm (Fine)</span>
            <span>0.2mm (Standard)</span>
            <span>0.4mm (Draft)</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="print-speed">Print Speed (mm/s)</Label>
          <Input
            id="print-speed"
            type="number"
            min={10}
            max={150}
            value={settings.printSpeed}
            onChange={(e) => updateSetting("printSpeed", Number(e.target.value))}
            disabled={disabled}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="supports">Support Structures</Label>
            <p className="text-sm text-muted-foreground">Enable for overhangs and bridges</p>
          </div>
          <Switch
            id="supports"
            checked={settings.supportsEnabled}
            onCheckedChange={(checked) => updateSetting("supportsEnabled", checked)}
            disabled={disabled}
          />
        </div>

        <Button onClick={onAnalyze} disabled={disabled || isAnalyzing} className="w-full" size="lg">
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Calculator className="mr-2 h-4 w-4" />
              Analyze Model
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
