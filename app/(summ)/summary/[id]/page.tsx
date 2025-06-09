"use server"

import { getVideoAction } from "@/actions/db/videos-actions"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { ExternalLink } from "lucide-react"

interface SummaryPageProps {
  params: Promise<{ id: string }>
}

export default async function SummaryPage({ params }: SummaryPageProps) {
  const { id } = await params
  const { isSuccess, data: video } = await getVideoAction(id)

  if (!isSuccess || !video) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">{video.title}</h1>
          {video.url && (
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Watch on YouTube"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>

      {video.summary ? (
        <div className="prose prose-stone dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {video.summary}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="py-10 text-center">
          <h3 className="text-lg font-medium">No summary available</h3>
          <p className="text-muted-foreground mt-1">
            This video hasn't been summarized yet.
          </p>
        </div>
      )}
    </div>
  )
}
