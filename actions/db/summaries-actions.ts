"use server"

import { db } from "@/db/db"
import {
  InsertSummary,
  SelectSummary,
  summariesTable
} from "@/db/schema/summaries-schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"

export async function createSummaryAction(
  summary: InsertSummary
): Promise<ActionState<SelectSummary>> {
  try {
    const [newSummary] = await db
      .insert(summariesTable)
      .values(summary)
      .returning()
    return {
      isSuccess: true,
      message: "Summary created successfully",
      data: newSummary
    }
  } catch (error) {
    console.error("Error creating summary:", error)
    return { isSuccess: false, message: "Failed to create summary" }
  }
}

export async function getSummariesAction(): Promise<ActionState<SelectSummary[]>> {
  try {
    const summaries = await db.query.summaries.findMany({
      orderBy: (summaries, { desc }) => [desc(summaries.createdAt)]
    })
    return {
      isSuccess: true,
      message: "Summaries retrieved successfully",
      data: summaries
    }
  } catch (error) {
    console.error("Error getting summaries:", error)
    return { isSuccess: false, message: "Failed to get summaries" }
  }
}

export async function getUserSummariesAction(
  userId: string
): Promise<ActionState<SelectSummary[]>> {
  try {
    const summaries = await db.query.summaries.findMany({
      where: eq(summariesTable.userId, userId),
      orderBy: (summaries, { desc }) => [desc(summaries.createdAt)]
    })
    return {
      isSuccess: true,
      message: "User summaries retrieved successfully",
      data: summaries
    }
  } catch (error) {
    console.error("Error getting user summaries:", error)
    return { isSuccess: false, message: "Failed to get user summaries" }
  }
}

export async function getSummaryAction(
  id: string
): Promise<ActionState<SelectSummary>> {
  try {
    const summary = await db.query.summaries.findFirst({
      where: eq(summariesTable.id, id)
    })
    
    if (!summary) {
      return { isSuccess: false, message: "Summary not found" }
    }
    
    return {
      isSuccess: true,
      message: "Summary retrieved successfully",
      data: summary
    }
  } catch (error) {
    console.error("Error getting summary:", error)
    return { isSuccess: false, message: "Failed to get summary" }
  }
}

export async function deleteSummaryAction(
  id: string
): Promise<ActionState<void>> {
  try {
    await db.delete(summariesTable).where(eq(summariesTable.id, id))
    return {
      isSuccess: true,
      message: "Summary deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting summary:", error)
    return { isSuccess: false, message: "Failed to delete summary" }
  }
} 