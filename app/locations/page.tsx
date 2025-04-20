import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Phone, Mail, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Best Insurance Advisor in Calicut | LIC Agent in Kerala | Local Services",
  description: "Find the best insurance advisor in Calicut and Kerala. Expert LIC agent offering personalized insurance solutions and financial planning services in your local area.",
}

const locations = [
  {
    city: "Calicut",
    address: "123 Main Street, Calicut, Kerala",
    phone: "+91-XXXXXXXXXX",
    email: "contact@yourdomain.com",
    hours: "Mon-Sat: 9:00 AM - 6:00 PM",
    image: "/calicut-office.jpg",
    description: "Our main office in Calicut serves clients across the city with expert insurance and financial planning services."
  },
  {
    city: "Kochi",
    address: "456 Business Avenue, Kochi, Kerala",
    phone: "+91-XXXXXXXXXX",
    email: "kochi@yourdomain.com",
    hours: "Mon-Sat: 9:00 AM - 6:00 PM",
    image: "/kochi-office.jpg",
    description: "Serving clients in Kochi with comprehensive insurance solutions and financial advisory services."
  }
]

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="container relative text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Best Insurance Advisor in Calicut & Kerala
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Find expert LIC agents and insurance advisors near you in Calicut and across Kerala. Get personalized financial solutions in your local area.
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {locations.map((location) => (
              <Card key={location.city} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={location.image}
                    alt={`Insurance Advisor Office in ${location.city}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {location.city} Office
                  </CardTitle>
                  <CardDescription>
                    {location.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Address</p>
                        <p className="text-gray-600">{location.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <p className="text-gray-600">{location.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">{location.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Working Hours</p>
                        <p className="text-gray-600">{location.hours}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">
            Looking for Insurance Advisor in Your Area?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Contact us to find the nearest insurance advisor in Calicut or Kerala. Get expert guidance on LIC policies and financial planning.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <Link href="/contact">
              Find Your Local Advisor
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
} 