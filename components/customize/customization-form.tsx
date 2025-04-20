"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FileUpload from "@/components/file-upload"
import { Loader2 } from "lucide-react"

export default function CustomizationForm() {
  const [activeTab, setActiveTab] = useState("upload")
  const [formData, setFormData] = useState({
    material: "pla",
    size: "",
    color: "",
    finish: "matte",
    notes: "",
  })
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      // Here you would typically send the files and form data to your server
      console.log("Files:", files)
      console.log("Form data:", formData)
      alert("Form submitted successfully!")
    }, 2000)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload 3D Model</TabsTrigger>
              <TabsTrigger value="sketch">Upload Sketch</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4 pt-4">
              <FileUpload
                allowedTypes={[".stl", ".obj", ".3mf"]}
                maxSizeMB={50}
                onFilesSelected={handleFilesSelected}
              />
            </TabsContent>

            <TabsContent value="sketch" className="space-y-4 pt-4">
              <FileUpload allowedTypes={["image/*", ".pdf"]} maxSizeMB={10} onFilesSelected={handleFilesSelected} />
            </TabsContent>
          </Tabs>

          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="material" className="block text-sm font-medium mb-1">
                  Material
                </label>
                <Select value={formData.material} onValueChange={(value) => handleSelectChange("material", value)}>
                  <SelectTrigger id="material">
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pla">PLA (Standard)</SelectItem>
                    <SelectItem value="abs">ABS (Durable)</SelectItem>
                    <SelectItem value="petg">PETG (Strong & Flexible)</SelectItem>
                    <SelectItem value="tpu">TPU (Flexible)</SelectItem>
                    <SelectItem value="resin">Resin (High Detail)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="size" className="block text-sm font-medium mb-1">
                  Size (dimensions in mm)
                </label>
                <Input
                  id="size"
                  name="size"
                  placeholder="e.g., 100x50x25"
                  value={formData.size}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="color" className="block text-sm font-medium mb-1">
                  Color
                </label>
                <Input
                  id="color"
                  name="color"
                  placeholder="e.g., Red, Blue, Black"
                  value={formData.color}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="finish" className="block text-sm font-medium mb-1">
                  Finish
                </label>
                <Select value={formData.finish} onValueChange={(value) => handleSelectChange("finish", value)}>
                  <SelectTrigger id="finish">
                    <SelectValue placeholder="Select finish" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matte">Matte</SelectItem>
                    <SelectItem value="glossy">Glossy</SelectItem>
                    <SelectItem value="smooth">Smooth</SelectItem>
                    <SelectItem value="textured">Textured</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium mb-1">
                Special Instructions
              </label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Any special requirements or details about your project"
                className="min-h-[100px]"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting || files.length === 0}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit for Review"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
