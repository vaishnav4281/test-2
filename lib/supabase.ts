import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Client for client-side operations (uses anon key)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Types for our database tables
export type Testimonial = {
  id: string
  name: string
  role: string
  location: string
  content: string
  rating: number
  image_url: string | null
  category: string
  date: string
  created_at: string
  updated_at: string
}

export type Policy = {
  id: string
  name: string
  title: string
  content: string
  description: string
  features: string
  benefits: string
  premium_range: string
  coverage_amount: string
  policy_term: string
  category: string
  min_sum_assured: number
  max_sum_assured: number
  min_term: number
  max_term: number
  is_active: boolean
  image_url?: string | null
  created_at: string
  updated_at: string
}

export type MediaFile = {
  id: string
  name: string
  file_url: string
  file_type: string
  file_size: number
  category: string
  metadata: any
  created_at: string
  updated_at: string
}

export type WebsiteContent = {
  id: string
  section: string
  content: any // JSONB type
  created_at: string
  updated_at: string
} 