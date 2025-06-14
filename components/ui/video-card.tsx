"use client"

import { Card } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"
import Link from "next/link"

interface VideoCardProps {
  id: string
  title: string | null
  thumbnailUrl: string | null
  channelName: string | null | undefined
  publishedAt: Date | string | null
  duration: number | null
}

function formatDuration(durationInSeconds: number): string {
  const hours = Math.floor(durationInSeconds / 3600)
  const minutes = Math.floor((durationInSeconds % 3600) / 60)
  const seconds = Math.floor(durationInSeconds % 60)

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`
}

export default function VideoCard({
  id,
  title,
  thumbnailUrl,
  channelName,
  publishedAt,
  duration
}: VideoCardProps) {
  return (
    <Link href={`/summary/${id}`}>
      <Card className="overflow-hidden">
        <div className="relative">
          {thumbnailUrl && (
            <Image
              src={thumbnailUrl}
              alt={title || "Video thumbnail"}
              width={480}
              height={270}
              className="aspect-video w-full object-cover"
            />
          )}
          {duration != null && (
            <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-75 px-1.5 py-0.5 text-xs text-white">
              {formatDuration(duration)}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-muted-foreground text-sm">{channelName}</p>
          {publishedAt && (
            <p className="text-muted-foreground text-sm">
              {formatDistanceToNow(new Date(publishedAt), { addSuffix: true })}
            </p>
          )}
        </div>
      </Card>
    </Link>
  )
} 