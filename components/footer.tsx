import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white dark:bg-slate-950">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Satheesan Koroth
            </h3>
            <p className="text-slate-300 mb-4">Senior Insurance Advisor & Home Loan Associate at LIC HFL</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-blue-400 transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white hover:text-blue-400 transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white hover:text-blue-400 transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white hover:text-blue-400 transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="animate-fade-in animate-delay-100">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-slate-300 hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-primary">›</span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-slate-300 hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-primary">›</span>
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-300 hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-primary">›</span>
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-slate-300 hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-primary">›</span>
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-slate-300 hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-primary">›</span>
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-300 hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-primary">›</span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="animate-fade-in animate-delay-200">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services#life-insurance"
                  className="text-slate-300 hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-primary">›</span>
                  Life Insurance
                </Link>
              </li>
              <li>
                <Link
                  href="/services#home-loans"
                  className="text-slate-300 hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-primary">›</span>
                  Home Loans
                </Link>
              </li>
              <li>
                <Link
                  href="/services#investment"
                  className="text-slate-300 hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-primary">›</span>
                  Investment Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/services#health"
                  className="text-slate-300 hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-primary">›</span>
                  Health Insurance
                </Link>
              </li>
              <li>
                <Link
                  href="/services#property"
                  className="text-slate-300 hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2 text-primary">›</span>
                  Property Services
                </Link>
              </li>
            </ul>
          </div>
          <div className="animate-fade-in animate-delay-300">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                <span>+91 9447218188</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                <span>k.satheeshclt@gmail.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                <span>Calicut, Kerala, India</span>
              </li>
            </ul>
            <Button asChild className="mt-4 bg-primary hover:bg-primary/90 text-black">
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>© {new Date().getFullYear()} Satheesan Koroth. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
