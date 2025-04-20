import { supabase } from './supabase'
import type { Testimonial, Policy, MediaFile, WebsiteContent } from './supabase'

// Testimonials
export const getTestimonials = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('date', { ascending: false })
  
  if (error) throw error
  return data as Testimonial[]
}

export const addTestimonial = async (testimonial: Omit<Testimonial, 'id'>) => {
  const { data, error } = await supabase
    .from('testimonials')
    .insert([testimonial])
    .select()
  
  if (error) throw error
  return data[0] as Testimonial
}

export const updateTestimonial = async (id: number, testimonial: Partial<Testimonial>) => {
  const { data, error } = await supabase
    .from('testimonials')
    .update(testimonial)
    .eq('id', id)
    .select()
  
  if (error) throw error
  return data[0] as Testimonial
}

export const deleteTestimonial = async (id: number) => {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Policies
export const getPolicies = async () => {
  const { data, error } = await supabase
    .from('policies')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data as Policy[]
}

export const addPolicy = async (policy: Omit<Policy, 'id'>) => {
  const { data, error } = await supabase
    .from('policies')
    .insert([policy])
    .select()
  
  if (error) throw error
  return data[0] as Policy
}

export const updatePolicy = async (id: number, policy: Partial<Policy>) => {
  const { data, error } = await supabase
    .from('policies')
    .update(policy)
    .eq('id', id)
    .select()
  
  if (error) throw error
  return data[0] as Policy
}

export const deletePolicy = async (id: number) => {
  const { error } = await supabase
    .from('policies')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Media Files
export const getMediaFiles = async (category?: string) => {
  let query = supabase
    .from('media_files')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (category) {
    query = query.eq('category', category)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data as MediaFile[]
}

export const uploadMediaFile = async (file: File, category: string) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `${category}/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('media')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(filePath)

  const { data, error } = await supabase
    .from('media_files')
    .insert([{
      name: file.name,
      url: publicUrl,
      type: file.type,
      size: file.size,
      category
    }])
    .select()
  
  if (error) throw error
  return data[0] as MediaFile
}

export const deleteMediaFile = async (id: number) => {
  const { data: file, error: fetchError } = await supabase
    .from('media_files')
    .select('url')
    .eq('id', id)
    .single()
  
  if (fetchError) throw fetchError

  const filePath = file.url.split('/').pop()
  const { error: deleteError } = await supabase.storage
    .from('media')
    .remove([filePath])

  if (deleteError) throw deleteError

  const { error } = await supabase
    .from('media_files')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Website Content
export const getWebsiteContent = async (page: string) => {
  const { data, error } = await supabase
    .from('website_content')
    .select('*')
    .eq('page', page)
    .single()
  
  if (error) throw error
  return data as WebsiteContent
}

export const updateWebsiteContent = async (page: string, content: Partial<WebsiteContent>) => {
  const { data, error } = await supabase
    .from('website_content')
    .update(content)
    .eq('page', page)
    .select()
  
  if (error) throw error
  return data[0] as WebsiteContent
}

// Database Backup
export const exportDatabase = async () => {
  const { data, error } = await supabase
    .from('backups')
    .insert([{ type: 'export' }])
    .select()
  
  if (error) throw error
  return data[0]
}

export const importDatabase = async (backupId: string) => {
  const { data, error } = await supabase
    .from('backups')
    .update({ status: 'restoring' })
    .eq('id', backupId)
    .select()
  
  if (error) throw error
  return data[0]
} 