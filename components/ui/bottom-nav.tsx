"use client"

import { cn } from "@/lib/utils"
import { Home, Search, Plus, Bookmark } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BottomNav() {
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
    <div className="bg-background fixed bottom-0 left-0 z-40 h-16 w-full border-t md:hidden">
      <div className="grid h-full grid-cols-3">
        {navItems.map(item => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center space-y-1 text-xs font-medium transition-colors",
              item.active
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon
              className={cn("size-5", item.active && "text-primary")}
            />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
