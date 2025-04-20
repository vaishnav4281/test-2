import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, Send, ArrowRight } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="container text-center">
          <Badge className="mb-4 px-3 py-1 text-sm bg-primary/20 text-primary border-primary/20">Contact Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Ready to secure your future? Contact us today for expert financial advice and personalized solutions.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Choose the most convenient way to reach us. We're here to help you with all your insurance and loan
                needs.
              </p>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Call Us</h3>
                        <p className="text-muted-foreground mb-2">Available 24/7 for your queries</p>
                        <Link href="tel:+919447218188" className="text-primary hover:underline font-medium">
                          +91 9447218188
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Email Us</h3>
                        <p className="text-muted-foreground mb-2">Get detailed information via email</p>
                        <Link
                          href="mailto:k.satheeshclt@gmail.com"
                          className="text-primary hover:underline font-medium"
                        >
                          k.satheeshclt@gmail.com
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Visit Us</h3>
                        <p className="text-muted-foreground mb-2">Meet us at our office</p>
                        <address className="not-italic text-muted-foreground">
                          Office Address, Calicut,
                          <br />
                          Kerala, India - 673001
                        </address>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Business Hours</h3>
                        <p className="text-muted-foreground mb-2">We are available at these times</p>
                        <ul className="space-y-1 text-muted-foreground">
                          <li className="flex justify-between">
                            <span>Monday - Friday:</span>
                            <span>9:00 AM - 6:00 PM</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Saturday:</span>
                            <span>9:00 AM - 1:00 PM</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Sunday:</span>
                            <span>Closed</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Location Map</h3>
                <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1234567890123!2d75.7804!3d11.2588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDE1JzMxLjYiTiA3NcKwNDYnNDkuNCJF!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input id="name" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="What is this regarding?" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px]" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a service</option>
                    <option value="life-insurance">Life Insurance</option>
                    <option value="home-loan">Home Loan</option>
                    <option value="investment">Investment Plans</option>
                    <option value="health-insurance">Health Insurance</option>
                    <option value="property">Property Services</option>
                    <option value="consultation">Financial Consultation</option>
                  </select>
                </div>

                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 px-3 py-1 text-sm">Quick Contact</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground">
              Choose the most convenient way to reach us. We're here to help you with all your insurance and loan needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Call Now</h3>
                <p className="text-muted-foreground mb-6">
                  Speak directly with our financial advisor for immediate assistance.
                </p>
                <Button asChild className="w-full">
                  <Link href="tel:+919447218188">+91 9447218188</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">WhatsApp</h3>
                <p className="text-muted-foreground mb-6">
                  Send us a message on WhatsApp for quick responses to your queries.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="https://wa.me/919447218188">Chat on WhatsApp</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Email Us</h3>
                <p className="text-muted-foreground mb-6">
                  Send us an email with your requirements for detailed information.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="mailto:k.satheeshclt@gmail.com">Send Email</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Schedule a Free Consultation</h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-8">
            Book a free consultation session to discuss your financial goals and get personalized advice.
          </p>
          <Button asChild size="lg" className="font-semibold">
            <Link href="tel:+919447218188">
              Call Now to Schedule
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
