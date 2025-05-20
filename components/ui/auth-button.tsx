"use client"

import { UserButton, SignInButton, SignUpButton, useAuth } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export default function AuthButton() {
  const { isSignedIn } = useAuth()
  const pathname = usePathname()

  // Don't show auth button on auth pages
  if (pathname.includes("/login") || pathname.includes("/signup")) {
    return null
  }

  if (isSignedIn) {
    return <UserButton afterSignOutUrl="/" />
  }

  return (
    <div className="flex items-center gap-4">
      <SignInButton mode="modal">
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
      </SignInButton>

      <SignUpButton mode="modal">
        <Button size="sm">Sign Up</Button>
      </SignUpButton>
    </div>
  )
}
