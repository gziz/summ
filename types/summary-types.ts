export interface SummarizationRequest {
  url: string
  userId: string
}

export interface SummaryCardProps {
  id: string
  title: string
  snippet: string
  sourceName: string
  sourceLogo?: string
  contentType: string
  userId: string
  isSaved?: boolean
  onClick?: () => void
}

export interface FullSummaryProps {
  id: string
  title: string
  content: string
  sourceName: string
  sourceLogo?: string
  sourceUrl: string
  contentType: string
  userId: string
  isSaved?: boolean
}
