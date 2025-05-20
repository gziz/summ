"use client"

import { useAuth } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/nextjs"

interface ProtectedContentProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function ProtectedContent({
  children,
  fallback
}: ProtectedContentProps) {
  const { isSignedIn, isLoaded } = useAuth()

  // Show loading state
  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-10">
        <div className="border-primary size-10 animate-spin rounded-full border-b-2" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  // If user is not signed in, show sign-in prompt
  if (!isSignedIn) {
    return (
      fallback || (
        <div className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
          <h3 className="text-lg font-medium">
            Sign in to access this feature
          </h3>
          <p className="text-muted-foreground">
            You need to be signed in to use this feature.
          </p>
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        </div>
      )
    )
  }

  // User is signed in, show protected content
  return <>{children}</>
}
