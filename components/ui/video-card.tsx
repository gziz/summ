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
}

export default function VideoCard({
  id,
  title,
  thumbnailUrl,
  channelName,
  publishedAt
}: VideoCardProps) {
  return (
    <Link href={`/summary/${id}`}>
      <Card className="overflow-hidden">
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt={title || "Video thumbnail"}
            width={480}
            height={270}
            className="aspect-video w-full object-cover"
          />
        )}
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