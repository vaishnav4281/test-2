"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, Users, Star, CheckCircle2, Building, Heart, LineChart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
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

const stats = [
  { label: "LIC Policies Sold", value: "1000+" },
  { label: "Years Experience", value: "20+" },
  { label: "Claims Settled", value: "₹100Cr+" },
  { label: "Happy Clients", value: "5000+" }
]

const popularPolicies = [
  {
    name: "LIC Jeevan Anand",
    description: "A participating non-linked plan that offers financial protection against death throughout the lifetime of the policyholder.",
    features: [
      "Death Benefit",
      "Maturity Benefit",
      "Bonus",
      "Loan Facility"
    ],
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "LIC Tech Term",
    description: "A pure term insurance plan that provides financial protection to your family at an affordable premium.",
    features: [
      "High Sum Assured",
      "Affordable Premium",
      "Flexible Term",
      "Tax Benefits"
    ],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "LIC Jeevan Labh",
    description: "A limited premium paying, non-linked, with-profits endowment plan that offers a combination of protection and savings.",
    features: [
      "Limited Premium Payment",
      "Guaranteed Additions",
      "Maturity Benefit",
      "Death Benefit"
    ],
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                Best LIC Agent in Kozhikode
            </h1>
              <p className="text-xl text-blue-100 mb-8">
                Get expert guidance for your LIC policies and personalized insurance solutions in Kozhikode.
            </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold">
                <Link href="/services">
                    View Our Services
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
                <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-700 font-semibold">
                <Link href="/contact">
                    Get Expert Advice
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
                src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="LIC Agent in Kozhikode"
                fill
                className="object-cover"
              priority
            />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-4xl font-bold text-blue-900 mb-2">{stat.value}</div>
                  <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Services</h2>
            <p className="text-lg text-gray-700">
              Comprehensive insurance and financial solutions tailored to your needs.
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
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Policies Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Popular LIC Policies</h2>
            <p className="text-lg text-gray-700">
              Choose from our range of popular LIC policies designed to meet your financial goals.
                    </p>
                  </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularPolicies.map((policy, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow bg-white">
                  <div className="relative h-48">
                    <Image
                      src={policy.image}
                      alt={policy.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-gray-900">{policy.name}</CardTitle>
                    <CardDescription className="text-gray-700">{policy.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {policy.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                          {feature}
                      </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Link href="/contact">
                        Get Quote
                        <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
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
              Ready to Secure Your Future?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get expert guidance from the best LIC agent in Kozhikode. Compare policies and make informed decisions.
            </p>
            <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold">
              <Link href="/contact">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  )
}
