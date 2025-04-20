"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"
import { Loader2, AlertCircle, Image as ImageIcon, Trash2, Edit2, Plus, Users, FileText, Settings, User } from "lucide-react"
import Image from "next/image"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { Label } from "@/components/ui/label"

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [features, setFeatures] = useState<string[]>([])
  
  // State for data
  const [galleryItems, setGalleryItems] = useState<any[]>([])
  const [licPlans, setLicPlans] = useState<any[]>([])
  const [aboutData, setAboutData] = useState<any>(null)
  
  // State for forms
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: '',
    description: '',
    image_url: '',
    category: 'gallery',
    is_active: true
  })
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
  const [aboutInfo, setAboutInfo] = useState({
    name: 'Sathesan S',
    role: 'LIC Agent',
    description: '',
    image_url: '',
    achievements: '',
    experience: '',
    contact: {
      email: '',
      phone: '',
      address: ''
    }
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false)
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false)
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false)

  useEffect(() => {
    let mounted = true;

    const initializeAdmin = async () => {
      try {
        if (!mounted) return;
        
        setLoading(true);
        setError(null);

        // Check if supabaseAdmin is properly initialized
        if (!supabaseAdmin) {
          throw new Error('Supabase admin client not initialized');
        }

        // Check authentication
        const { data: { session }, error: authError } = await supabaseAdmin.auth.getSession();

        if (authError) {
          throw new Error(`Authentication error: ${authError.message}`);
        }

        if (!session) {
          router.push('/admin/login');
          return;
        }

        setIsAuthenticated(true);

        // Fetch data
        const [galleryResponse, plansResponse, aboutResponse] = await Promise.all([
          supabaseAdmin
            .from('media_files')
            .select('*')
            .eq('category', 'gallery')
            .order('created_at', { ascending: false }),
          supabaseAdmin
            .from('policies')
            .select('*')
            .order('created_at', { ascending: false }),
          supabaseAdmin
            .from('website_content')
            .select('*')
            .eq('page_name', 'about')
            .single()
        ]);

        if (galleryResponse.error) throw galleryResponse.error;
        if (plansResponse.error) throw plansResponse.error;
        if (aboutResponse.error && aboutResponse.error.code !== 'PGRST116') throw aboutResponse.error;

        if (mounted) {
          setGalleryItems(galleryResponse.data || []);
          setLicPlans(plansResponse.data || []);
          if (aboutResponse.data) {
            setAboutData(aboutResponse.data);
            setAboutInfo(prev => ({
              ...prev,
              ...aboutResponse.data.content
            }));
          }
        }
      } catch (err) {
        if (mounted) {
          console.error('Admin initialization error:', err);
          setError(err instanceof Error ? err.message : 'Failed to initialize admin dashboard');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAdmin();

    return () => {
      mounted = false;
    };
  }, [router]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  }

  const handleUpdateAbout = async () => {
    try {
      setLoading(true)
      setError(null)

      let imageUrl = aboutInfo.image_url
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop()
        const fileName = `about-${Math.random()}.${fileExt}`
        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from('media')
          .upload(fileName, selectedFile)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabaseAdmin.storage
          .from('media')
          .getPublicUrl(fileName)
        
        imageUrl = publicUrl
      }

      const aboutContent = {
        ...aboutInfo,
        image_url: imageUrl
      }

      if (aboutData) {
        // Update existing about data
        const { error } = await supabaseAdmin
          .from('website_content')
          .update({
            content: aboutContent,
            updated_at: new Date().toISOString()
          })
          .eq('id', aboutData.id)

        if (error) throw error
      } else {
        // Create new about data
        const { error } = await supabaseAdmin
          .from('website_content')
          .insert([{
            page_name: 'about',
            title: 'About Sathesan S',
            content: aboutContent
          }])

        if (error) throw error
      }

      setSelectedFile(null)
      setIsAboutDialogOpen(false)
      toast.success('About information updated successfully')
    } catch (error) {
      console.error('Error updating about info:', error)
      setError('Failed to update about information. Please try again.')
      toast.error('Failed to update about information')
    } finally {
      setLoading(false)
    }
  }

  const handleAddGalleryItem = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!selectedFile) {
        toast.error('Please select an image')
        return
      }

      // Upload image to storage
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `gallery-${Date.now()}.${fileExt}`
      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from('media')
        .upload(fileName, selectedFile)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('media')
        .getPublicUrl(fileName)

      // Create gallery item in media_files table
      const { error: insertError } = await supabaseAdmin
        .from('media_files')
        .insert([{
          name: newGalleryItem.title,
          file_url: publicUrl,
          file_type: selectedFile.type,
          category: 'gallery',
          metadata: {
            description: newGalleryItem.description,
            is_active: newGalleryItem.is_active
          }
        }])

      if (insertError) throw insertError

      // Refresh gallery items
      const { data: galleryData } = await supabaseAdmin
        .from('media_files')
        .select('*')
        .eq('category', 'gallery')
        .order('created_at', { ascending: false })

      setGalleryItems(galleryData || [])
      setSelectedFile(null)
      setIsGalleryDialogOpen(false)
      setNewGalleryItem({
        title: '',
        description: '',
        image_url: '',
        category: 'gallery',
        is_active: true
      })
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
      setLoading(true);
      setError(null);

      let imageUrl = '';
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `plan-${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from('media')
          .upload(fileName, selectedFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabaseAdmin.storage
          .from('media')
          .getPublicUrl(fileName);
        
        imageUrl = publicUrl;
      }

      const { error: insertError } = await supabaseAdmin
        .from('policies')
        .insert([{
          name: newLicPlan.name,
          description: newLicPlan.description,
          features: newLicPlan.features.split('\n').filter(Boolean),
          min_sum_assured: parseInt(newLicPlan.coverage_amount.split('-')[0]) || 0,
          max_sum_assured: parseInt(newLicPlan.coverage_amount.split('-')[1]) || 0,
          min_term: parseInt(newLicPlan.policy_term.split('-')[0]) || 0,
          max_term: parseInt(newLicPlan.policy_term.split('-')[1]) || 0,
          metadata: {
            benefits: newLicPlan.benefits,
            premium_range: newLicPlan.premium_range,
            image_url: imageUrl
          },
          is_active: newLicPlan.is_active
        }]);

      if (insertError) throw insertError;

      // Refresh LIC plans
      const { data: plansData } = await supabaseAdmin
        .from('policies')
        .select('*')
        .order('created_at', { ascending: false });

      setLicPlans(plansData || []);
      setSelectedFile(null);
      setIsPlanDialogOpen(false);
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
      });
      toast.success('LIC plan added successfully');
    } catch (error) {
      console.error('Error adding LIC plan:', error);
      setError('Failed to add LIC plan. Please try again.');
      toast.error('Failed to add LIC plan');
    } finally {
      setLoading(false);
    }
  };

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

  const handleFeatureChange = (feature: string, index: number): void => {
    const updatedFeatures = [...newLicPlan.features.split('\n')];
    updatedFeatures[index] = feature;
    setNewLicPlan(prev => ({
      ...prev,
      features: updatedFeatures.join('\n')
    }));
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
              </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading admin dashboard...</p>
              </div>
            </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Redirecting to login...</p>
            </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="about" className="space-y-4">
          <TabsList>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="media">Gallery</TabsTrigger>
            <TabsTrigger value="policies">LIC Plans</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

          <TabsContent value="about" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>About Management</CardTitle>
                <CardDescription>Manage your profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-6">
                    <div className="w-48 h-48 relative rounded-lg overflow-hidden bg-gray-100">
                      {aboutInfo.image_url ? (
                        <Image
                          src={aboutInfo.image_url}
                          alt={aboutInfo.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">{aboutInfo.name}</h3>
                        <p className="text-sm text-gray-500">{aboutInfo.role}</p>
                      </div>
                      <p className="text-sm">{aboutInfo.description}</p>
                      <Button onClick={() => setIsAboutDialogOpen(true)}>
                        Update Profile
                </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gallery Management</h2>
              <Button onClick={() => setIsGalleryDialogOpen(true)}>Add Image</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <img
                      src={item.file_url}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
              </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.metadata?.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <Switch
                        checked={item.metadata?.is_active}
                        onCheckedChange={async (checked) => {
                          const { error } = await supabaseAdmin
                            .from('media_files')
                            .update({ metadata: { ...item.metadata, is_active: checked } })
                            .eq('id', item.id)
                          
                          if (error) {
                            toast.error('Failed to update status')
                          } else {
                            setGalleryItems(galleryItems.map(gi => 
                              gi.id === item.id 
                                ? { ...gi, metadata: { ...gi.metadata, is_active: checked } }
                                : gi
                            ))
                            toast.success('Status updated')
                          }
                        }}
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={async () => {
                          try {
                            // Delete from storage
                            const fileName = item.file_url.split('/').pop()
                            if (fileName) {
                              await supabaseAdmin.storage
                                .from('media')
                                .remove([fileName])
                            }

                            // Delete from database
                            const { error } = await supabaseAdmin
                              .from('media_files')
                              .delete()
                              .eq('id', item.id)

                            if (error) throw error

                            setGalleryItems(galleryItems.filter(gi => gi.id !== item.id))
                            toast.success('Gallery item deleted')
                          } catch (error) {
                            console.error('Error deleting gallery item:', error)
                            toast.error('Failed to delete gallery item')
                          }
                        }}
                      >
                        Delete
                </Button>
                    </div>
              </CardContent>
            </Card>
              ))}
            </div>

            <Dialog open={isGalleryDialogOpen} onOpenChange={setIsGalleryDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Gallery Image</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input
                      id="picture"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newGalleryItem.title}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newGalleryItem.description}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, description: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={newGalleryItem.is_active}
                      onCheckedChange={(checked) => setNewGalleryItem({ ...newGalleryItem, is_active: checked })}
                    />
                    <Label htmlFor="active">Active</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddGalleryItem} disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Image
                </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="policies" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">LIC Plans Management</h2>
              <Button onClick={() => setIsPlanDialogOpen(true)}>Add Plan</Button>
            </div>

            <div className="grid gap-4">
              {licPlans.map((plan) => (
                <Card key={plan.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{plan.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
                      </div>
                      <Switch
                        checked={plan.is_active}
                        onCheckedChange={async (checked) => {
                          const { error } = await supabaseAdmin
                            .from('policies')
                            .update({ is_active: checked })
                            .eq('id', plan.id)
                          
                          if (error) {
                            toast.error('Failed to update status')
                          } else {
                            setLicPlans(licPlans.map(p => 
                              p.id === plan.id ? { ...p, is_active: checked } : p
                            ))
                            toast.success('Status updated')
                          }
                        }}
                      />
          </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <h4 className="font-medium">Coverage</h4>
                        <p className="text-sm">₹{plan.min_sum_assured.toLocaleString()} - ₹{plan.max_sum_assured.toLocaleString()}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Term</h4>
                        <p className="text-sm">{plan.min_term} - {plan.max_term} years</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Premium Range</h4>
                        <p className="text-sm">{plan.metadata?.premium_range}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Benefits</h4>
                        <p className="text-sm">{plan.metadata?.benefits}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium">Features</h4>
                      <ul className="list-disc list-inside text-sm mt-2">
                        {plan.features?.map((feature: string, index: number) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-end mt-4">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={async () => {
                          try {
                            // Delete plan image if exists
                            if (plan.metadata?.image_url) {
                              const fileName = plan.metadata.image_url.split('/').pop()
                              if (fileName) {
                                await supabaseAdmin.storage
                                  .from('media')
                                  .remove([fileName])
                              }
                            }

                            // Delete from database
                            const { error } = await supabaseAdmin
                              .from('policies')
                              .delete()
                              .eq('id', plan.id)

                            if (error) throw error

                            setLicPlans(licPlans.filter(p => p.id !== plan.id))
                            toast.success('Plan deleted')
                          } catch (error) {
                            console.error('Error deleting plan:', error)
                            toast.error('Failed to delete plan')
                          }
                        }}
                      >
                        Delete
                      </Button>
              </div>
            </CardContent>
          </Card>
              ))}
            </div>

            <Dialog open={isPlanDialogOpen} onOpenChange={setIsPlanDialogOpen}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Add LIC Plan</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="plan-name">Plan Name</Label>
                      <Input
                        id="plan-name"
                        value={newLicPlan.name}
                        onChange={(e) => setNewLicPlan({ ...newLicPlan, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="plan-description">Description</Label>
                      <Textarea
                        id="plan-description"
                        value={newLicPlan.description}
                        onChange={(e) => setNewLicPlan({ ...newLicPlan, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="coverage-amount">Coverage Amount (e.g., "100000-1000000")</Label>
                      <Input
                        id="coverage-amount"
                        value={newLicPlan.coverage_amount}
                        onChange={(e) => setNewLicPlan({ ...newLicPlan, coverage_amount: e.target.value })}
                        placeholder="Min-Max"
                      />
                    </div>
                    <div>
                      <Label htmlFor="policy-term">Policy Term (e.g., "5-30")</Label>
                      <Input
                        id="policy-term"
                        value={newLicPlan.policy_term}
                        onChange={(e) => setNewLicPlan({ ...newLicPlan, policy_term: e.target.value })}
                        placeholder="Min-Max years"
                      />
                    </div>
                  </div>
              <div className="space-y-4">
                    <div>
                      <Label htmlFor="premium-range">Premium Range</Label>
                      <Input
                        id="premium-range"
                        value={newLicPlan.premium_range}
                        onChange={(e) => setNewLicPlan({ ...newLicPlan, premium_range: e.target.value })}
                        placeholder="e.g., ₹1,000 - ₹10,000 per month"
                      />
                    </div>
                    <div>
                      <Label htmlFor="benefits">Benefits</Label>
                      <Textarea
                        id="benefits"
                        value={newLicPlan.benefits}
                        onChange={(e) => setNewLicPlan({ ...newLicPlan, benefits: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="features">Features (One per line)</Label>
                      <Textarea
                        id="features"
                        value={newLicPlan.features}
                        onChange={(e) => setNewLicPlan({ ...newLicPlan, features: e.target.value })}
                        placeholder="Enter each feature on a new line"
                      />
                    </div>
                    <div>
                      <Label htmlFor="plan-image">Plan Image (Optional)</Label>
                      <Input
                        id="plan-image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="plan-active"
                        checked={newLicPlan.is_active}
                        onCheckedChange={(checked) => setNewLicPlan({ ...newLicPlan, is_active: checked })}
                      />
                      <Label htmlFor="plan-active">Active</Label>
                    </div>
                  </div>
              </div>
                <DialogFooter>
                  <Button onClick={handleAddLicPlan} disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Plan
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="settings">
            {/* Settings content */}
        </TabsContent>
      </Tabs>
      </div>
    </div>
  )
}
