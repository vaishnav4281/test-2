import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Heart, Target, LineChart, Award, Info, ChevronRight } from "lucide-react"
import Link from "next/link"

const policies = [
  {
    title: "LIC Jeevan Anand",
    description: "Endowment plan with life cover",
    icon: Shield,
    features: [
      "Life cover throughout the policy term",
      "Maturity benefit at the end of the term",
      "Bonus additions to enhance returns",
      "Flexible premium payment options"
    ],
    details: {
      minAge: "18 years",
      maxAge: "50 years",
      minSumAssured: "₹1,00,000",
      policyTerm: "15 to 35 years",
      premiumPaymentTerm: "Same as policy term",
      taxBenefits: "Section 80C & 10(10D)",
      bonus: "Simple Reversionary Bonus"
    },
    link: "/services#jeevan-anand"
  },
  {
    title: "LIC Tech Term",
    description: "Pure protection plan with high coverage",
    icon: Target,
    features: [
      "High life cover at affordable premiums",
      "Option to increase cover at life stages",
      "Tax benefits under section 80C",
      "Online purchase and management"
    ],
    details: {
      minAge: "18 years",
      maxAge: "65 years",
      minSumAssured: "₹50,00,000",
      policyTerm: "10 to 40 years",
      premiumPaymentTerm: "Same as policy term",
      taxBenefits: "Section 80C & 10(10D)",
      bonus: "Not applicable"
    },
    link: "/services#tech-term"
  },
  {
    title: "LIC Jeevan Labh",
    description: "Limited premium payment endowment plan",
    icon: Heart,
    features: [
      "Limited premium payment term",
      "Guaranteed additions",
      "Loyalty additions",
      "Maturity benefit"
    ],
    details: {
      minAge: "8 years",
      maxAge: "59 years",
      minSumAssured: "₹2,00,000",
      policyTerm: "16, 21, 25 years",
      premiumPaymentTerm: "10, 15, 16 years",
      taxBenefits: "Section 80C & 10(10D)",
      bonus: "Guaranteed & Loyalty Additions"
    },
    link: "/services#jeevan-labh"
  },
  {
    title: "PMJJBY",
    description: "Government-backed life insurance scheme",
    icon: Award,
    features: [
      "Affordable premium of ₹330 per year",
      "Life cover of ₹2 lakh",
      "No medical examination required",
      "Auto-debit facility available"
    ],
    details: {
      minAge: "18 years",
      maxAge: "50 years",
      sumAssured: "₹2,00,000",
      policyTerm: "1 year (renewable)",
      premiumPaymentTerm: "Annual",
      taxBenefits: "Section 80C",
      bonus: "Not applicable"
    },
    link: "/services#pmjjby"
  },
  {
    title: "LIC Jeevan Akshay VII",
    description: "Immediate annuity plan",
    icon: LineChart,
    features: [
      "Immediate pension from the next day",
      "Multiple annuity options",
      "Guaranteed returns",
      "Tax benefits under section 80C"
    ],
    details: {
      minAge: "30 years",
      maxAge: "85 years",
      minPurchasePrice: "₹1,00,000",
      policyTerm: "Life long",
      premiumPaymentTerm: "Single premium",
      taxBenefits: "Section 80C & 10(10D)",
      bonus: "Not applicable"
    },
    link: "/services#jeevan-akshay"
  },
  {
    title: "PMVVY",
    description: "Pension scheme for senior citizens",
    icon: Award,
    features: [
      "Guaranteed pension for 10 years",
      "Return of purchase price on maturity",
      "Pension payable monthly/quarterly/half-yearly/yearly",
      "Government-backed security"
    ],
    details: {
      minAge: "60 years",
      maxAge: "No limit",
      maxInvestment: "₹15,00,000",
      policyTerm: "10 years",
      premiumPaymentTerm: "Single premium",
      taxBenefits: "Section 80C & 10(10D)",
      bonus: "Not applicable"
    },
    link: "/services#pmvvy"
  }
]

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="container relative text-center">
          <Badge variant="outline" className="mb-4 bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors">
            Popular Plans
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            Our Most Popular LIC Plans
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Choose from our range of trusted LIC policies designed to secure your future and protect your loved ones.
          </p>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {policies.map((policy) => {
              const Icon = policy.icon
              return (
                <Card key={policy.title} className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-100">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {policy.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-600">
                      {policy.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                          Key Features
                        </h3>
                        <ul className="space-y-2.5">
                          {policy.features.map((feature, index) => (
                            <li key={index} className="flex items-start group/item">
                              <span className="text-blue-500 mr-2 group-hover/item:translate-x-1 transition-transform">✓</span>
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 group-hover:bg-blue-100 transition-colors">
                        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                          <Info className="h-4 w-4 mr-2 text-blue-600" />
                          Plan Details
                        </h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="text-gray-500">Entry Age</div>
                          <div className="text-gray-900 font-medium">{policy.details.minAge} - {policy.details.maxAge}</div>
                          
                          <div className="text-gray-500">Sum Assured</div>
                          <div className="text-gray-900 font-medium">{policy.details.minSumAssured || policy.details.sumAssured}</div>
                          
                          <div className="text-gray-500">Policy Term</div>
                          <div className="text-gray-900 font-medium">{policy.details.policyTerm}</div>
                          
                          <div className="text-gray-500">Premium Term</div>
                          <div className="text-gray-900 font-medium">{policy.details.premiumPaymentTerm}</div>
                          
                          <div className="text-gray-500">Tax Benefits</div>
                          <div className="text-gray-900 font-medium">{policy.details.taxBenefits}</div>
                          
                          <div className="text-gray-500">Bonus</div>
                          <div className="text-gray-900 font-medium">{policy.details.bonus}</div>
                        </div>
                      </div>

                      <Link
                        href={policy.link}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-1 transition-transform"
                      >
                        Learn more
                        <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              Need Help Choosing a Plan?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our expert advisors are here to help you choose the right plan based on your needs and financial goals.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
              <Link href="/contact" className="flex items-center">
                Get Free Consultation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 