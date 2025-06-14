"use client"

import { cn } from "@/lib/utils"
import { Home, Search, Plus, Bookmark } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavMenu() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
      active: pathname === "/"
    },
    {
      name: "Submit",
      href: "/submit",
      icon: Plus,
      active: pathname === "/submit"
    },
    // {
    //   name: "Explore",
    //   href: "/explore",
    //   icon: Search,
    //   active: pathname === "/explore"
    // },
    {
      name: "Saved",
      href: "/saved",
      icon: Bookmark,
      active: pathname === "/saved"
    }
  ]

  return (
    <nav className="hidden md:block">
      <ul className="flex items-center space-x-4">
        {navItems.map(item => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="size-4" />
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
