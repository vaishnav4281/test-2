"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Shield, Home, FileText, Image, Star, Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth") === "true"
    setIsAuthenticated(auth)
    
    if (!auth && pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }, [pathname, router])

  if (!isAuthenticated && pathname !== "/admin/login") {
    return null
  }

  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
