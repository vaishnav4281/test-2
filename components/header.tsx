"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    title: "Financial Planning",
    link: "/services#financial-planning",
    description: "Comprehensive financial planning for your future goals"
  },
  {
    title: "Investment Advisory",
    link: "/services#investment-advisory",
    description: "Expert guidance for your investment decisions"
  },
  {
    title: "Insurance Solutions",
    link: "/services#insurance-solutions",
    description: "Tailored insurance plans for your needs"
  },
  {
    title: "Retirement Planning",
    link: "/services#retirement-planning",
    description: "Secure your golden years with proper planning"
  },
  {
    title: "Tax Planning",
    link: "/services#tax-planning",
    description: "Optimize your tax liabilities efficiently"
  },
  {
    title: "Wealth Management",
    link: "/services#wealth-management",
    description: "Professional management of your wealth"
  }
]

const policies = [
  {
    title: "LIC Jeevan Anand",
    link: "/services#jeevan-anand",
    description: "Endowment plan with life cover"
  },
  {
    title: "LIC Tech Term",
    link: "/services#tech-term",
    description: "Pure protection plan with high coverage"
  },
  {
    title: "LIC Jeevan Labh",
    link: "/services#jeevan-labh",
    description: "Limited premium payment endowment plan"
  },
  {
    title: "PMJJBY",
    link: "/services#pmjjby",
    description: "Government-backed life insurance scheme"
  },
  {
    title: "LIC Jeevan Akshay VII",
    link: "/services#jeevan-akshay",
    description: "Immediate annuity plan"
  },
  {
    title: "PMVVY",
    link: "/services#pmvvy",
    description: "Pension scheme for senior citizens"
  }
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md border-b shadow-sm" : "bg-transparent border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              Satheesan Koroth
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600",
                pathname === "/" ? "text-blue-600" : "text-gray-600",
              )}
            >
              Home
            </Link>
            <Link
              href="/services"
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600",
                pathname === "/services" ? "text-blue-600" : "text-gray-600",
              )}
            >
              Services
            </Link>
            <Link
              href="/policies"
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600",
                pathname === "/policies" ? "text-blue-600" : "text-gray-600",
              )}
            >
              LIC Policies
            </Link>
            <Link
              href="/about"
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600",
                pathname === "/about" ? "text-blue-600" : "text-gray-600",
              )}
            >
              About
            </Link>
            <Link
              href="/gallery"
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600",
                pathname === "/gallery" ? "text-blue-600" : "text-gray-600",
              )}
            >
              Gallery
            </Link>
            <Link
              href="/testimonials"
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600",
                pathname === "/testimonials" ? "text-blue-600" : "text-gray-600",
              )}
            >
              Testimonials
            </Link>
            <Link
              href="/contact"
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600",
                pathname === "/contact" ? "text-blue-600" : "text-gray-600",
              )}
            >
              Contact
            </Link>
          </div>
          <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <Link href="/contact">
              <Phone className="mr-2 h-4 w-4" />
              Get Free Consultation
            </Link>
          </Button>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-blue-600",
                    pathname === "/" ? "text-blue-600" : "text-gray-600",
                  )}
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-blue-600",
                    pathname === "/services" ? "text-blue-600" : "text-gray-600",
                  )}
                >
                  Services
                </Link>
                <Link
                  href="/policies"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-blue-600",
                    pathname === "/policies" ? "text-blue-600" : "text-gray-600",
                  )}
                >
                  LIC Policies
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-blue-600",
                    pathname === "/about" ? "text-blue-600" : "text-gray-600",
                  )}
                >
                  About
                </Link>
                <Link
                  href="/gallery"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-blue-600",
                    pathname === "/gallery" ? "text-blue-600" : "text-gray-600",
                  )}
                >
                  Gallery
                </Link>
                <Link
                  href="/testimonials"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-blue-600",
                    pathname === "/testimonials" ? "text-blue-600" : "text-gray-600",
                  )}
                >
                  Testimonials
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-blue-600",
                    pathname === "/contact" ? "text-blue-600" : "text-gray-600",
                  )}
                >
                  Contact
                </Link>
                <Button asChild className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Phone className="mr-2 h-4 w-4" />
                    Get Free Consultation
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
