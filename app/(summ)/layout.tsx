"use server"

import BottomNav from "@/components/ui/bottom-nav"
import { auth } from "@clerk/nextjs/server"
import AuthButton from "@/components/ui/auth-button"
import NavMenu from "@/components/ui/nav-menu"
import Link from "next/link"

export default async function SummLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  // For demo purposes, if no user is authenticated, use a demo user ID
  const actualUserId = userId || "demo-user-id"

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <header className="border-b">
        <div className="container flex max-w-4xl items-center justify-between py-4">
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-xl font-bold">
              SUMM
            </Link>
            <NavMenu />
          </div>
          <AuthButton />
        </div>
      </header>

      <main className="container max-w-4xl py-6">{children}</main>

      <BottomNav />
    </div>
  )
}
