"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Upload, Plus } from "lucide-react"

interface GalleryImage {
  id: number
  src: string
  category: "events" | "awards" | "office" | "clients"
  title: string
}

// Mock data for gallery images
const mockGalleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/placeholder.svg?height=300&width=400&text=Event+1",
    category: "events",
    title: "Financial Seminar 2023",
  },
  { id: 2, src: "/placeholder.svg?height=300&width=400&text=Event+2", category: "events", title: "Client Meeting" },
  {
    id: 3,
    src: "/placeholder.svg?height=300&width=400&text=Award+1",
    category: "awards",
    title: "Top Performer Award",
  },
  { id: 4, src: "/placeholder.svg?height=300&width=400&text=Office+1", category: "office", title: "Office Space" },
  {
    id: 5,
    src: "/placeholder.svg?height=300&width=400&text=Client+1",
    category: "clients",
    title: "Client Consultation",
  },
  { id: 6, src: "/placeholder.svg?height=300&width=400&text=Event+3", category: "events", title: "Workshop 2023" },
]

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>(mockGalleryImages)
  const [selectedTab, setSelectedTab] = useState<string>("all")

  const filteredImages = selectedTab === "all" ? images : images.filter((img) => img.category === selectedTab)

  const handleDelete = (id: number) => {
    setImages(images.filter((img) => img.id !== id))
  }

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would upload the image to a server
    alert("Image upload functionality would be implemented here")
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Gallery Management
        </h1>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus className="mr-2 h-4 w-4" />
          Add New Image
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="all" onValueChange={setSelectedTab}>
            <TabsList className="mb-6 bg-slate-900 border border-blue-500/20">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                All
              </TabsTrigger>
              <TabsTrigger 
                value="events"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                Events
              </TabsTrigger>
              <TabsTrigger 
                value="awards"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                Awards
              </TabsTrigger>
              <TabsTrigger 
                value="office"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                Office
              </TabsTrigger>
              <TabsTrigger 
                value="clients"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                Clients
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredImages.map((image) => (
                  <Card 
                    key={image.id} 
                    className="overflow-hidden bg-slate-900 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    <div className="relative h-48 w-full">
                      <Image 
                        src={image.src || "/placeholder.svg"} 
                        alt={image.title} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-white">{image.title}</p>
                          <p className="text-sm text-blue-400 capitalize">{image.category}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleDelete(image.id)}
                          className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {["events", "awards", "office", "clients"].map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredImages.map((image) => (
                    <Card 
                      key={image.id} 
                      className="overflow-hidden bg-slate-900 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                    >
                      <div className="relative h-48 w-full">
                        <Image 
                          src={image.src || "/placeholder.svg"} 
                          alt={image.title} 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-white">{image.title}</p>
                            <p className="text-sm text-blue-400 capitalize">{image.category}</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleDelete(image.id)}
                            className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="bg-slate-900 border border-blue-500/20">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Upload New Image</h2>
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-blue-400">Image Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    required 
                    className="bg-slate-800 border-blue-500/50 text-white focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-blue-400">Category</Label>
                  <select
                    id="category"
                    name="category"
                    className="w-full px-3 py-2 bg-slate-800 border border-blue-500/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="events">Events</option>
                    <option value="awards">Awards</option>
                    <option value="office">Office</option>
                    <option value="clients">Clients</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-blue-400">Image File</Label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="image"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-500/50 rounded-lg cursor-pointer hover:bg-blue-500/5 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-blue-400" />
                        <p className="mb-2 text-sm text-blue-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-blue-400">PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                      <input id="image" type="file" className="hidden" accept="image/*" required />
                    </label>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
