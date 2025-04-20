"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, ImageIcon, FileText, MessageSquare, Users, Settings, LogOut } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Gallery",
    href: "/admin/gallery",
    icon: ImageIcon,
  },
  {
    name: "Policies",
    href: "/admin/policies",
    icon: FileText,
  },
  {
    name: "Testimonials",
    href: "/admin/testimonials",
    icon: Users,
  },
  {
    name: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    router.push("/admin/login")
  }

  return (
    <div className="w-64 bg-slate-900 dark:bg-black text-white min-h-screen p-4 hidden md:block">
      <div className="mb-8 pt-4">
        <h1 className="text-xl font-bold px-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Admin Panel
        </h1>
      </div>
      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                isActive ? "bg-blue-500 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-blue-400",
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-slate-400")} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
      <div className="absolute bottom-4 left-4 right-4 space-y-2">
        <div className="px-3 py-2">
          <ThemeToggle />
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:bg-slate-800 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}
