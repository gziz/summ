"use server"

import { getSummaryAction } from "@/actions/db/summaries-actions"
import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import FullSummary from "@/components/ui/full-summary"

interface SummaryPageProps {
  params: Promise<{ id: string }>
}

export default async function SummaryPage({ params }: SummaryPageProps) {
  const { userId } = await auth()
  const actualUserId = userId || "demo-user-id"

  const { id } = await params
  const { isSuccess, data: summary } = await getSummaryAction(id)

  if (!isSuccess || !summary) {
    notFound()
  }

  return (
    <FullSummary
      id={summary.id}
      title={summary.title}
      content={summary.content}
      sourceName={summary.sourceName}
      sourceLogo={summary.sourceLogo || undefined}
      sourceUrl={summary.sourceUrl}
      contentType={summary.contentType}
      userId={actualUserId}
    />
  )
}
