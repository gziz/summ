"use server"

import { db } from "@/db/db"
import { aiVideos, aiChannels, SelectAiVideo } from "@/db/ai-read"
import { ActionState } from "@/types"
import { eq, desc, and, or, isNull, gt } from "drizzle-orm"

export async function getVideosAction(): Promise<
  ActionState<
    (SelectAiVideo & {
      channelName: string | null
    })[]
  >
> {
  try {
    const videos = await db
      .select({
        id: aiVideos.id,
        channelId: aiVideos.channelId,
        title: aiVideos.title,
        url: aiVideos.url,
        thumbnailUrl: aiVideos.thumbnailUrl,
        publishedAt: aiVideos.publishedAt,
        durationSec: aiVideos.durationSec,
        categoryId: aiVideos.categoryId,
        tags: aiVideos.tags,
        transcript: aiVideos.transcript,
        summary: aiVideos.summary,
        isShort: aiVideos.isShort,
        processedAt: aiVideos.processedAt,
        createdAt: aiVideos.createdAt,
        channelName: aiChannels.name
      })
      .from(aiVideos)
      .leftJoin(aiChannels, eq(aiVideos.channelId, aiChannels.id))
      .where(
        and(
          gt(aiVideos.durationSec, 120),
          or(eq(aiVideos.isShort, false), isNull(aiVideos.isShort))
        )
      )
      .orderBy(desc(aiVideos.publishedAt))

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
): Promise<ActionState<SelectAiVideo>> {
  try {
    const video = await db.query.aiVideos.findFirst({
      where: eq(aiVideos.id, id)
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