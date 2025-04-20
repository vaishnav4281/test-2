import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Best LIC Agent in Kozhikode | LIC Policy Premium Calculator | Insurance Advisor",
  description: "Top-rated LIC agent in Kozhikode offering expert policy guidance, premium calculation, and personalized insurance solutions. Get the best LIC policies with premium discounts in Kozhikode.",
  keywords: [
    "best lic agent in kozhikode",
    "lic agent in kozhikode",
    "lic policy premium calculator",
    "lic agent near me",
    "lic policy comparison",
    "lic premium payment",
    "lic policy benefits",
    "lic premium rates",
    "lic policy maturity",
    "lic agent contact number",
    "lic policy details",
    "lic premium discount",
    "lic policy types",
    "lic agent office",
    "lic policy surrender value",
    "lic premium due date",
    "lic policy status",
    "lic agent services",
    "lic policy documents",
    "top lic agent in kozhikode",
    "best insurance advisor in kozhikode",
    "lic agent in calicut",
    "lic agent in kerala"
  ],
  authors: [{ name: "Satheesan Koroth" }],
  openGraph: {
    title: "Best LIC Agent in Kozhikode | LIC Policy Premium Calculator",
    description: "Expert LIC agent in Kozhikode offering policy premium calculation, comparison, and personalized insurance solutions.",
    url: "https://yourdomain.com",
    siteName: "Satheesan Koroth - LIC Agent",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best LIC Agent in Kozhikode | LIC Policy Premium Calculator",
    description: "Expert LIC agent in Kozhikode offering policy premium calculation, comparison, and personalized insurance solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://yourdomain.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "Satheesan Koroth - Insurance Advisor",
              "description": "Expert insurance advisor offering LIC policies, financial planning, and investment advice in Kerala and Calicut.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Calicut",
                "addressRegion": "Kerala",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "11.2588",
                "longitude": "75.7804"
              },
              "url": "https://yourdomain.com",
              "telephone": "+91-XXXXXXXXXX",
              "openingHours": "Mo-Fr 09:00-18:00",
              "priceRange": "$$",
              "image": "https://yourdomain.com/logo.jpg",
              "sameAs": [
                "https://www.facebook.com/yourpage",
                "https://www.linkedin.com/in/yourprofile"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
