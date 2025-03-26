import { NextResponse } from "next/server"
import { analyzeSentiment } from "@/lib/sentiment-analysis"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { reviewText } = body

    if (!reviewText) {
      return NextResponse.json({ error: "Review text is required" }, { status: 400 })
    }

    const result = await analyzeSentiment(reviewText)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in analyze-sentiment route:", error)
    return NextResponse.json({ error: "Failed to analyze sentiment" }, { status: 500 })
  }
}

