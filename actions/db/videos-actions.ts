"use server"

import { db } from "@/db/db"
import { SelectVideo, videosTable, channelsTable } from "@/db/schema"
import { ActionState } from "@/types"
import { eq, desc } from "drizzle-orm"

export async function getVideosAction(): Promise<
  ActionState<
    (SelectVideo & {
      channelName: string | null
    })[]
  >
> {
  try {
    const videos = await db
      .select({
        id: videosTable.id,
        channelId: videosTable.channelId,
        title: videosTable.title,
        url: videosTable.url,
        thumbnailUrl: videosTable.thumbnailUrl,
        publishedAt: videosTable.publishedAt,
        durationSec: videosTable.durationSec,
        categoryId: videosTable.categoryId,
        tags: videosTable.tags,
        transcript: videosTable.transcript,
        summary: videosTable.summary,
        isShort: videosTable.isShort,
        processedAt: videosTable.processedAt,
        createdAt: videosTable.createdAt,
        channelName: channelsTable.name
      })
      .from(videosTable)
      .leftJoin(channelsTable, eq(videosTable.channelId, channelsTable.id))
      .orderBy(desc(videosTable.publishedAt))

    return {
      isSuccess: true,
      message: "Videos retrieved successfully",
      data: videos
    }
  } catch (error) {
    console.error("Error getting videos:", error)
    return { isSuccess: false, message: "Failed to get videos" }
  }
}

export async function getVideoAction(
  id: string
): Promise<ActionState<SelectVideo>> {
  try {
    const video = await db.query.videos.findFirst({
      where: eq(videosTable.id, id)
    })
    if (!video) {
      return { isSuccess: false, message: "Video not found" }
    }
    return {
      isSuccess: true,
      message: "Video retrieved successfully",
      data: video
    }
  } catch (error) {
    console.error("Error getting video:", error)
    return { isSuccess: false, message: "Failed to get video" }
  }
} 