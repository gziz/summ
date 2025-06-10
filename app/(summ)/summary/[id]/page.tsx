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

// Convert timestamp string (MM:SS or HH:MM:SS) to seconds
function timestampToSeconds(timestamp: string): number {
  const parts = timestamp.split(':').map(Number)
  if (parts.length === 2) {
    // MM:SS format
    return parts[0] * 60 + parts[1]
  } else if (parts.length === 3) {
    // HH:MM:SS format
    return parts[0] * 3600 + parts[1] * 60 + parts[2]
  }
  return 0
}

// Process summary text to convert timestamps to YouTube links
function processTimestamps(text: string, videoUrl: string): string {
  // Regex to match timestamps in MM:SS or HH:MM:SS format
  const timestampRegex = /\b(\d{1,2}:)?\d{1,2}:\d{2}\b/g
  
  return text.replace(timestampRegex, (match) => {
    const seconds = timestampToSeconds(match)
    const timestampUrl = `${videoUrl}&t=${seconds}s`
    return `[${match}](${timestampUrl})`
  })
}

export default async function SummaryPage({ params }: SummaryPageProps) {
  const { id } = await params
  const { isSuccess, data: video } = await getVideoAction(id)

  if (!isSuccess || !video) {
    notFound()
  }

  // Process the summary to convert timestamps to links
  const processedSummary = video.summary && video.url 
    ? processTimestamps(video.summary, video.url)
    : video.summary

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-bold">{video.title}</h2>
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

      {processedSummary ? (
        <div className="prose prose-stone dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {processedSummary}
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
