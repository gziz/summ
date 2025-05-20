"use server"

import UrlSubmitForm from "@/components/ui/url-submit-form"
import { auth } from "@clerk/nextjs/server"
import ProtectedContent from "@/components/ui/protected-content"

export default async function SubmitPage() {
  const { userId } = await auth()
  const actualUserId = userId || "demo-user-id"

  return (
    <div className="space-y-8">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Submit URL</h1>
        <p className="text-muted-foreground">
          Get a concise summary of any article, video, or newsletter
        </p>
      </header>

      <div className="mx-auto max-w-md">
        <ProtectedContent>
          <UrlSubmitForm userId={actualUserId} />
        </ProtectedContent>
      </div>
    </div>
  )
}
