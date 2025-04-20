'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: 'general'
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError(null)

    try {
      // Store in Supabase
      const { error: dbError } = await supabase
        .from('inquiries')
        .insert([{
          ...formData,
          created_at: new Date().toISOString()
        }])

      if (dbError) throw dbError

      // Send email notification
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send email')
      }

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        service: 'general'
      })
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'An error occurred while sending your message')
      console.error('Error in form submission:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name
          </label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </label>
          <Input
            id="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="service" className="text-sm font-medium">
            Service Interested In
          </label>
          <select
            id="service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="general">General Inquiry</option>
            <option value="life">Life Insurance</option>
            <option value="health">Health Insurance</option>
            <option value="investment">Investment Planning</option>
            <option value="retirement">Retirement Planning</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <Textarea
          id="message"
          placeholder="How can we help you?"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="min-h-[150px]"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={status === 'loading'}>
        {status === 'loading' ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending Message...
          </>
        ) : (
          'Send Message'
        )}
      </Button>

      {status === 'success' && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 text-green-400 mr-2" />
            <p className="text-sm text-green-700">
              Thank you for your message! We have received it and will get back to you soon. A confirmation email has been sent to your email address.
            </p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <p className="text-sm text-red-700">
              {error || 'Failed to send message. Please try again.'}
            </p>
          </div>
        </div>
      )}
    </form>
  )
} 