"use server"

import { getSummariesAction } from "@/actions/db/summaries-actions"
import { auth } from "@clerk/nextjs/server"
import { Suspense } from "react"
import SummaryCard from "@/components/ui/summary-card"

export default async function ExplorePage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Explore</h1>
        <p className="text-muted-foreground">
          Discover summaries from various sources
        </p>
      </header>

      <Suspense
        fallback={
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-muted h-40 animate-pulse rounded-lg" />
            ))}
          </div>
        }
      >
        <ExploreFetcher />
      </Suspense>
    </div>
  )
}

async function ExploreFetcher() {
  const { userId } = await auth()
  const actualUserId = userId || "demo-user-id"

  const { isSuccess, data: summaries } = await getSummariesAction()

  if (!isSuccess || !summaries || summaries.length === 0) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-lg font-medium">No summaries available</h3>
        <p className="text-muted-foreground mt-1">
          Check back later or submit a URL for summarization
        </p>
      </div>
    )
  }

  // Group summaries by content type
  const groupedSummaries = summaries.reduce<Record<string, typeof summaries>>(
    (groups, summary) => {
      const group = summary.contentType
      if (!groups[group]) {
        groups[group] = []
      }
      groups[group].push(summary)
      return groups
    },
    {}
  )

  return (
    <div className="space-y-8">
      {Object.entries(groupedSummaries).map(([type, items]) => (
        <div key={type} className="space-y-4">
          <h2 className="text-xl font-semibold capitalize">{type}s</h2>

          <div className="space-y-4">
            {items.map(summary => (
              <SummaryCard
                key={summary.id}
                id={summary.id}
                title={summary.title}
                snippet={summary.snippet}
                sourceName={summary.sourceName}
                sourceLogo={summary.sourceLogo || undefined}
                contentType={summary.contentType}
                userId={actualUserId}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
