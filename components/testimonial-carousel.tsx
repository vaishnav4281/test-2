"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Business Owner",
    content:
      "Mr. Satheesan helped me secure a home loan with the best interest rates. His guidance throughout the process was invaluable.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "IT Professional",
    content:
      "The life insurance policy recommended by Satheesan sir perfectly matches my family's needs. Very professional service!",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Mohammed Ali",
    role: "Doctor",
    content:
      "Excellent financial planning advice. He helped me plan my retirement with the right mix of investments and insurance.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Anita Nair",
    role: "Teacher",
    content:
      "I was confused about which health insurance to choose, but Mr. Satheesan explained everything clearly and helped me make the right decision.",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "Suresh Menon",
    role: "Entrepreneur",
    content:
      "The property services provided by Satheesan sir were exceptional. He helped me with all the documentation and legal verification.",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleTestimonials, setVisibleTestimonials] = useState<typeof testimonials>([])
  const [itemsPerView, setItemsPerView] = useState(3)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const endIndex = currentIndex + itemsPerView
    let items = []

    if (endIndex > testimonials.length) {
      // Wrap around to the beginning
      items = [...testimonials.slice(currentIndex), ...testimonials.slice(0, endIndex - testimonials.length)]
    } else {
      items = testimonials.slice(currentIndex, endIndex)
    }

    setVisibleTestimonials(items)
  }, [currentIndex, itemsPerView])

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        <div className="flex gap-6 transition-transform duration-300 w-full">
          {visibleTestimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className="flex-1 min-w-0 testimonial-card">
              <CardContent className="p-6">
                <Quote className="h-10 w-10 text-primary/20 mb-4" />
                <p className="mb-6 text-muted-foreground">{testimonial.content}</p>
                <div className="flex items-center">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8 gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="rounded-full hover:bg-primary/10 hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="rounded-full hover:bg-primary/10 hover:text-primary"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  )
}
