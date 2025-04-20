"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"
import { Loader2, AlertCircle, Image as ImageIcon, Trash2, Edit2, Plus } from "lucide-react"
import Image from "next/image"
import { supabaseAdmin } from "@/lib/supabase-admin"

export default function ManageContent() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // State for gallery
  const [galleryItems, setGalleryItems] = useState<any[]>([])
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: '',
    description: '',
    image_url: '',
    category: 'gallery',
    is_active: true
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false)
  
  // State for LIC plans
  const [licPlans, setLicPlans] = useState<any[]>([])
  const [newLicPlan, setNewLicPlan] = useState({
    name: '',
    description: '',
    features: '',
    benefits: '',
    premium_range: '',
    coverage_amount: '',
    policy_term: '',
    category: 'life_insurance',
    is_active: true,
    image_url: ''
  })
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false)

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch gallery items
        const { data: galleryData, error: galleryError } = await supabaseAdmin
          .from('media_files')
          .select('*')
          .eq('category', 'gallery')
          .order('created_at', { ascending: false })

        if (galleryError) throw galleryError
        setGalleryItems(galleryData || [])

        // Fetch LIC plans
        const { data: plansData, error: plansError } = await supabaseAdmin
          .from('policies')
          .select('*')
          .order('created_at', { ascending: false })

        if (plansError) throw plansError
        setLicPlans(plansData || [])

      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load content. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleAddGalleryItem = async () => {
    try {
      setLoading(true)
      setError(null)

      let imageUrl = newGalleryItem.image_url
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from('media')
          .upload(fileName, selectedFile)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabaseAdmin.storage
          .from('media')
          .getPublicUrl(fileName)
        
        imageUrl = publicUrl
      }

      const { data, error } = await supabaseAdmin
        .from('media_files')
        .insert([{
          name: newGalleryItem.title,
          file_url: imageUrl,
          file_type: 'image',
          category: 'gallery',
          metadata: {
            description: newGalleryItem.description,
            is_active: newGalleryItem.is_active
          }
        }])
        .select()
        .single()

      if (error) throw error

      setGalleryItems([data, ...galleryItems])
      setNewGalleryItem({
        title: '',
        description: '',
        image_url: '',
        category: 'gallery',
        is_active: true
      })
      setSelectedFile(null)
      setIsGalleryDialogOpen(false)
      toast.success('Gallery item added successfully')
    } catch (error) {
      console.error('Error adding gallery item:', error)
      setError('Failed to add gallery item. Please try again.')
      toast.error('Failed to add gallery item')
    } finally {
      setLoading(false)
    }
  }

  const handleAddLicPlan = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabaseAdmin
        .from('policies')
        .insert([newLicPlan])
        .select()
        .single()

      if (error) throw error

      setLicPlans([data, ...licPlans])
      setNewLicPlan({
        name: '',
        description: '',
        features: '',
        benefits: '',
        premium_range: '',
        coverage_amount: '',
        policy_term: '',
        category: 'life_insurance',
        is_active: true,
        image_url: ''
      })
      setIsPlanDialogOpen(false)
      toast.success('LIC plan added successfully')
    } catch (error) {
      console.error('Error adding LIC plan:', error)
      setError('Failed to add LIC plan. Please try again.')
      toast.error('Failed to add LIC plan')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteItem = async (id: string, table: 'media_files' | 'policies', fileUrl?: string) => {
    try {
      setLoading(true)
      setError(null)

      if (fileUrl) {
        const fileName = fileUrl.split('/').pop()
        if (fileName) {
          const { error: storageError } = await supabaseAdmin.storage
            .from('media')
            .remove([fileName])
          
          if (storageError) throw storageError
        }
      }

      const { error } = await supabaseAdmin
        .from(table)
        .delete()
        .eq('id', id)

      if (error) throw error

      if (table === 'media_files') {
        setGalleryItems(galleryItems.filter(item => item.id !== id))
      } else {
        setLicPlans(licPlans.filter(plan => plan.id !== id))
      }

      toast.success('Item deleted successfully')
    } catch (error) {
      console.error('Error deleting item:', error)
      setError('Failed to delete item. Please try again.')
      toast.error('Failed to delete item')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading content...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="gallery" className="space-y-4">
          <TabsList>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="lic-plans">LIC Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gallery Management</CardTitle>
                <CardDescription>Manage your gallery images</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button onClick={() => setIsGalleryDialogOpen(true)}>
                    Add New Image
                  </Button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryItems.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="aspect-video relative mb-4">
                            {item.file_url ? (
                              <Image
                                src={item.file_url}
                                alt={item.name}
                                fill
                                className="object-cover rounded-md"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center">
                                <ImageIcon className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.metadata?.description}</p>
                          <div className="flex justify-end gap-2 mt-4">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteItem(item.id, 'media_files', item.file_url)}
                            >
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lic-plans" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>LIC Plans Management</CardTitle>
                <CardDescription>Manage your LIC insurance plans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button onClick={() => setIsPlanDialogOpen(true)}>
                    Add New Plan
                  </Button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {licPlans.map((plan) => (
                      <Card key={plan.id}>
                        <CardContent className="p-4">
                          <h3 className="font-semibold">{plan.name}</h3>
                          <p className="text-sm text-gray-500">{plan.description}</p>
                          <div className="mt-2">
                            <p className="text-sm"><strong>Premium Range:</strong> {plan.premium_range}</p>
                            <p className="text-sm"><strong>Coverage Amount:</strong> {plan.coverage_amount}</p>
                            <p className="text-sm"><strong>Policy Term:</strong> {plan.policy_term}</p>
                          </div>
                          <div className="flex justify-end gap-2 mt-4">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteItem(plan.id, 'policies')}
                            >
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Gallery Dialog */}
        <Dialog open={isGalleryDialogOpen} onOpenChange={setIsGalleryDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Gallery Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={newGalleryItem.title}
                  onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newGalleryItem.description}
                  onChange={(e) => setNewGalleryItem({ ...newGalleryItem, description: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsGalleryDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddGalleryItem}>
                  Add Image
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* LIC Plan Dialog */}
        <Dialog open={isPlanDialogOpen} onOpenChange={setIsPlanDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New LIC Plan</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Plan Name</label>
                <Input
                  value={newLicPlan.name}
                  onChange={(e) => setNewLicPlan({ ...newLicPlan, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newLicPlan.description}
                  onChange={(e) => setNewLicPlan({ ...newLicPlan, description: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Features</label>
                <Textarea
                  value={newLicPlan.features}
                  onChange={(e) => setNewLicPlan({ ...newLicPlan, features: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Benefits</label>
                <Textarea
                  value={newLicPlan.benefits}
                  onChange={(e) => setNewLicPlan({ ...newLicPlan, benefits: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Premium Range</label>
                <Input
                  value={newLicPlan.premium_range}
                  onChange={(e) => setNewLicPlan({ ...newLicPlan, premium_range: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Coverage Amount</label>
                <Input
                  value={newLicPlan.coverage_amount}
                  onChange={(e) => setNewLicPlan({ ...newLicPlan, coverage_amount: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Policy Term</label>
                <Input
                  value={newLicPlan.policy_term}
                  onChange={(e) => setNewLicPlan({ ...newLicPlan, policy_term: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsPlanDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddLicPlan}>
                  Add Plan
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 