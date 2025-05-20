"use server"

import { getSummariesAction } from "@/actions/db/summaries-actions"
import { auth } from "@clerk/nextjs/server"
import { Suspense } from "react"
import SummaryCard from "@/components/ui/summary-card"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function HomePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">SUMM</h1>
      </div>

      {/* <div className="flex justify-center">
        <Button asChild className="flex items-center gap-1">
          <Link href="/submit">
            Summarize a URL <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div> */}

      <Suspense
        fallback={
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-muted h-40 animate-pulse rounded-lg" />
            ))}
          </div>
        }
      >
        <FeedFetcher />
      </Suspense>
    </div>
  )
}

async function FeedFetcher() {
  const { userId } = await auth()
  const actualUserId = userId || "demo-user-id"

  const { isSuccess, data: summaries } = await getSummariesAction()

  if (!isSuccess || !summaries || summaries.length === 0) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-lg font-medium">No summaries yet</h3>
        <p className="text-muted-foreground mt-1">
          Be the first to submit a URL for summarization
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recent Summaries</h2>

      <div className="space-y-4">
        {summaries.map(summary => (
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
  )
}
