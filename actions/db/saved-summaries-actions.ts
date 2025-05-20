"use server"

import { db } from "@/db/db"
import {
  InsertSavedSummary,
  SelectSavedSummary,
  savedSummariesTable
} from "@/db/schema/saved-summaries-schema"
import { ActionState } from "@/types"
import { and, eq } from "drizzle-orm"

export async function saveSummaryAction(
  savedSummary: InsertSavedSummary
): Promise<ActionState<SelectSavedSummary>> {
  try {
    // Check if already saved
    const existingSave = await db.query.savedSummaries.findFirst({
      where: and(
        eq(savedSummariesTable.userId, savedSummary.userId),
        eq(savedSummariesTable.summaryId, savedSummary.summaryId)
      )
    })
    
    if (existingSave) {
      return {
        isSuccess: true,
        message: "Summary already saved",
        data: existingSave
      }
    }
    
    const [newSavedSummary] = await db
      .insert(savedSummariesTable)
      .values(savedSummary)
      .returning()
    
    return {
      isSuccess: true,
      message: "Summary saved successfully",
      data: newSavedSummary
    }
  } catch (error) {
    console.error("Error saving summary:", error)
    return { isSuccess: false, message: "Failed to save summary" }
  }
}

export async function getUserSavedSummariesAction(
  userId: string
): Promise<ActionState<SelectSavedSummary[]>> {
  try {
    const savedSummaries = await db.query.savedSummaries.findMany({
      where: eq(savedSummariesTable.userId, userId),
      orderBy: (savedSummaries, { desc }) => [desc(savedSummaries.createdAt)]
    })
    return {
      isSuccess: true,
      message: "Saved summaries retrieved successfully",
      data: savedSummaries
    }
  } catch (error) {
    console.error("Error getting saved summaries:", error)
    return { isSuccess: false, message: "Failed to get saved summaries" }
  }
}

export async function checkSummaryIsSavedAction(
  userId: string,
  summaryId: string
): Promise<ActionState<boolean>> {
  try {
    const savedSummary = await db.query.savedSummaries.findFirst({
      where: and(
        eq(savedSummariesTable.userId, userId),
        eq(savedSummariesTable.summaryId, summaryId)
      )
    })
    
    return {
      isSuccess: true,
      message: "Checked if summary is saved",
      data: !!savedSummary
    }
  } catch (error) {
    console.error("Error checking if summary is saved:", error)
    return { isSuccess: false, message: "Failed to check if summary is saved" }
  }
}

export async function unsaveSummaryAction(
  userId: string,
  summaryId: string
): Promise<ActionState<void>> {
  try {
    await db
      .delete(savedSummariesTable)
      .where(
        and(
          eq(savedSummariesTable.userId, userId),
          eq(savedSummariesTable.summaryId, summaryId)
        )
      )
    
    return {
      isSuccess: true,
      message: "Summary unsaved successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error unsaving summary:", error)
    return { isSuccess: false, message: "Failed to unsave summary" }
  }
} 