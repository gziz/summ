"use server"

import { getUserSavedSummariesAction } from "@/actions/db/saved-summaries-actions"
import { getSummaryAction } from "@/actions/db/summaries-actions"
import { auth } from "@clerk/nextjs/server"
import { Suspense } from "react"
import SummaryCard from "@/components/ui/summary-card"
import ProtectedContent from "@/components/ui/protected-content"
import { SelectSummary } from "@/db/schema"

export default async function SavedPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Saved Summaries</h1>
        <p className="text-muted-foreground">Access your saved summaries</p>
      </header>

      <ProtectedContent>
        <Suspense
          fallback={
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-muted h-40 animate-pulse rounded-lg"
                />
              ))}
            </div>
          }
        >
          <SavedSummariesFetcher />
        </Suspense>
      </ProtectedContent>
    </div>
  )
}

async function SavedSummariesFetcher() {
  const { userId } = await auth()

  if (!userId) {
    return null
  }

  const { isSuccess, data: savedSummaries } =
    await getUserSavedSummariesAction(userId)

  if (!isSuccess || !savedSummaries || savedSummaries.length === 0) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-lg font-medium">No saved summaries</h3>
        <p className="text-muted-foreground mt-1">
          Save summaries to access them later
        </p>
      </div>
    )
  }

  // Fetch the actual summary data for each saved summary
  const summariesData: SelectSummary[] = []

  for (const saved of savedSummaries) {
    const { isSuccess, data } = await getSummaryAction(saved.summaryId)
    if (isSuccess && data) {
      summariesData.push(data)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {summariesData.map(summary => (
          <SummaryCard
            key={summary.id}
            id={summary.id}
            title={summary.title}
            snippet={summary.snippet}
            sourceName={summary.sourceName}
            sourceLogo={summary.sourceLogo || undefined}
            contentType={summary.contentType}
            userId={userId}
            isSaved={true}
          />
        ))}
      </div>
    </div>
  )
}
