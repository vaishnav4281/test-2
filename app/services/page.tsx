"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Calculator, TrendingUp, Shield, Heart, LineChart, Building } from "lucide-react"
import Link from "next/link"
import ScrollReveal from "@/components/scroll-reveal"

const services = [
  {
    title: "Life Insurance",
    description: "Comprehensive life insurance solutions to protect your family's future",
    icon: Shield,
    color: "text-blue-600"
  },
  {
    title: "Health Insurance",
    description: "Protect yourself and your family with comprehensive health coverage",
    icon: Heart,
    color: "text-red-600"
  },
  {
    title: "Investment Plans",
    description: "Secure your financial future with our investment solutions",
    icon: LineChart,
    color: "text-green-600"
  },
  {
    title: "Property Services",
    description: "Complete assistance for all your property-related needs",
    icon: Building,
    color: "text-purple-600"
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our Services
            </h1>
            <p className="text-xl text-blue-100">
              Comprehensive insurance and financial solutions tailored to your needs in Kozhikode.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Services</h2>
            <p className="text-lg text-gray-600">
              Explore our comprehensive range of insurance and financial services
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="h-full hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                    <div className={`w-12 h-12 rounded-full ${service.color} bg-opacity-10 flex items-center justify-center mb-4`}>
                      <service.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-gray-900">{service.title}</CardTitle>
                    <CardDescription className="text-gray-700">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                    <div className="space-y-4">
                <Button asChild variant="outline" className="w-full">
                        <Link href={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                      <Button asChild variant="ghost" className="w-full text-blue-600 hover:text-blue-700">
                        <Link href="/policies">
                          View LIC Policies
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Need Expert Guidance?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get personalized advice from our experienced LIC agents in Kozhikode
            </p>
            <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold">
            <Link href="/contact">
                Contact Us Now
                <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
