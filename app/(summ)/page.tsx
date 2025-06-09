"use server"

import { getVideosAction } from "@/actions/db/videos-actions"
import { Suspense } from "react"
import VideoCard from "@/components/ui/video-card"

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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="bg-muted h-48 animate-pulse rounded-lg" />
                <div className="bg-muted h-4 animate-pulse rounded-lg" />
                <div className="bg-muted h-4 w-1/2 animate-pulse rounded-lg" />
              </div>
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
  const { isSuccess, data: videos } = await getVideosAction()

  if (!isSuccess || !videos || videos.length === 0) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-lg font-medium">No videos yet</h3>
        <p className="text-muted-foreground mt-1">
          There are no videos to display at the moment.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {videos.map(video => (
        <VideoCard
          key={video.id}
          id={video.id}
          title={video.title}
          thumbnailUrl={video.thumbnailUrl}
          channelName={video.channelName}
          publishedAt={video.publishedAt}
        />
      ))}
    </div>
  )
}
