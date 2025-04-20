import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Award, Briefcase, GraduationCap, Target, Shield, Users, LineChart, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="px-3 py-1 text-sm bg-blue-500/20 text-blue-400 border-blue-500/20">About Us</Badge>
              <h1 className="text-4xl md:text-5xl font-bold">Satheesan Koroth</h1>
              <p className="text-xl">Senior Insurance Advisor & Home Loan Associate at LIC HFL</p>
              <p className="text-lg text-slate-300">
                With over 20 years of experience in the insurance and home loan industry, I have helped numerous
                families secure their future and achieve their dream of owning a home.
              </p>
            </div>
            <div className="relative hidden lg:block">
              <div className="w-[400px] h-[500px] relative mx-auto">
                <Image
                  src="/sathesan-profile.jpg"
                  alt="Satheesan Koroth"
                  fill
                  className="rounded-lg shadow-2xl object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 px-3 py-1 text-sm">Professional Experience</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">20+ Years of Excellence in Financial Services</h2>
            <p className="text-lg text-muted-foreground">
              My journey in the financial services industry has been dedicated to helping clients achieve their
              financial goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">LIC Housing Finance Ltd.</h3>
                    <p className="text-sm text-muted-foreground">Home Loan Associate | 2005 - Present</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Helping clients navigate the home loan process, from application to disbursement. Specializing in
                  residential property loans, plot purchases, and balance transfers.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                    Processed over ₹100 Crore in home loans
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                    Assisted over 500 families in securing their dream homes
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                    Expertise in documentation and legal verification
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Life Insurance Corporation of India</h3>
                    <p className="text-sm text-muted-foreground">Senior Insurance Advisor | 2000 - Present</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Providing comprehensive life insurance solutions to individuals and families. Specializing in
                  protection plans, savings plans, and retirement solutions.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                    Served over 1000 clients with insurance solutions
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                    Consistently ranked among top insurance advisors
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                    Expertise in policy planning and claims settlement
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Expertise & Qualifications */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <Badge className="px-3 py-1 text-sm">Expertise & Qualifications</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Professional Qualifications & Areas of Expertise</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                    Educational Qualifications
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center">
                      <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      Bachelor of Commerce, University of Calicut
                    </li>
                    <li className="flex items-center">
                      <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      Certified Insurance Professional (CIP)
                    </li>
                    <li className="flex items-center">
                      <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      Housing Finance Professional Certification
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-primary" />
                    Areas of Expertise
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center">
                      <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      Life Insurance Planning & Policy Management
                    </li>
                    <li className="flex items-center">
                      <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      Home Loan Processing & Documentation
                    </li>
                    <li className="flex items-center">
                      <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      Financial Advisory & Retirement Planning
                    </li>
                    <li className="flex items-center">
                      <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      Tax Planning & Investment Strategies
                    </li>
                    <li className="flex items-center">
                      <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      Property Valuation & Legal Verification
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-primary" />
                    Achievements & Recognition
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center">
                      <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      Top Performer Award - LIC (Multiple Years)
                    </li>
                    <li className="flex items-center">
                      <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      Excellence in Home Loan Processing - LIC HFL
                    </li>
                    <li className="flex items-center">
                      <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      Million Dollar Round Table (MDRT) Qualifier
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="w-[500px] h-[600px] relative mx-auto">
                <Image
                  src="/sathesan-office.jpg"
                  alt="Satheesan Koroth at Office"
                  fill
                  className="rounded-lg shadow-xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 px-3 py-1 text-sm">Our Mission & Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Drives Us</h2>
            <p className="text-lg text-muted-foreground">
              Our mission is to provide comprehensive financial solutions that help individuals and families achieve
              their life goals while ensuring their financial security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-12 w-12 text-blue-400 mb-4" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Trust</h3>
                <p className="text-muted-foreground">
                  Building long-term relationships based on trust and transparency with all our clients.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-blue-400 mb-4" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Client-Centric</h3>
                <p className="text-muted-foreground">
                  Putting our clients' needs first and providing personalized solutions for their unique situations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-12 w-12 text-blue-400 mb-4" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  Striving for excellence in every aspect of our service and continuous improvement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-12 w-12 text-blue-400 mb-4" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                <p className="text-muted-foreground">
                  Maintaining the highest standards of integrity and ethical conduct in all our dealings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">20+</div>
              <div className="text-lg font-medium">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1000+</div>
              <div className="text-lg font-medium">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">₹100Cr+</div>
              <div className="text-lg font-medium">Loans Processed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</div>
              <div className="text-lg font-medium">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Secure Your Financial Future?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Contact me today for a free consultation and personalized financial solutions.
          </p>
          <Button asChild size="lg" className="font-semibold bg-blue-500 hover:bg-blue-600 text-white">
            <Link href="/contact">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
