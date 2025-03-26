import { NextResponse } from "next/server"
import { generateReviewResponse } from "@/lib/ai-response"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { review } = body

    if (!review) {
      return NextResponse.json({ error: "Review data is required" }, { status: 400 })
    }

    const response = await generateReviewResponse(review)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error in generate-response route:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}

