"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ScrollReveal from "@/components/scroll-reveal"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import type { Testimonial } from "@/lib/supabase"

const categories = [
  { id: "all", label: "All Testimonials" },
  { id: "premium", label: "Premium Payment" },
  { id: "comparison", label: "Policy Comparison" },
  { id: "claim", label: "Claim Settlement" },
  { id: "renewal", label: "Policy Renewal" },
  { id: "calculator", label: "Premium Calculator" },
  { id: "family", label: "Family Planning" },
  { id: "retirement", label: "Retirement Planning" },
  { id: "tax", label: "Tax Planning" },
  { id: "business", label: "Business Protection" },
  { id: "health", label: "Health Insurance" },
  { id: "education", label: "Education Planning" },
  { id: "loan", label: "Loan Protection" },
  { id: "investment", label: "Investment Planning" },
  { id: "group", label: "Group Insurance" },
  { id: "pension", label: "Pension Planning" }
]

export default function TestimonialsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoading(true)
        setError(null)
        
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setTestimonials(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch testimonials')
        console.error('Error fetching testimonials:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const filteredTestimonials = selectedCategory === "all" 
    ? testimonials 
    : testimonials.filter(t => t.category === selectedCategory)

  if (loading) {
    return (
      <div className="container py-20">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Testimonials</h2>
          <p className="text-gray-600">{error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (testimonials.length === 0) {
    return (
      <div className="container py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Testimonials Yet</h2>
          <p className="text-gray-600">Check back later for customer testimonials.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <section className="py-20">
        <div className="container">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                {category.label}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.id} delay={index * 100}>
                <Card className="h-full border-t-4 border-t-blue-500">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image_url || "/placeholder.svg"}
                          alt={`${testimonial.name} - LIC Policyholder in Kozhikode`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{testimonial.name}</CardTitle>
                        <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.location}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">{testimonial.content}</p>
                    <div className="text-sm text-gray-500">
                      <p>Date: {new Date(testimonial.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Satheesan Koroth - LIC Agent",
            "image": "https://yourdomain.com/advisor-image.jpg",
            "description": "Best LIC Agent in Kozhikode offering premium calculation, policy comparison, and personalized insurance solutions.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kozhikode",
              "addressRegion": "Kerala",
              "addressCountry": "IN"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": testimonials.length
            },
            "review": testimonials.map(testimonial => ({
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": testimonial.rating
              },
              "author": {
                "@type": "Person",
                "name": testimonial.name
              },
              "datePublished": testimonial.created_at,
              "reviewBody": testimonial.content
            }))
          })
        }}
      />
    </div>
  )
}
