import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateReviewResponse(review: {
  customer: string
  platform: string
  rating: number
  content: string
  sentiment: string
}) {
  const prompt = `
    Generate a personalized response to a customer review with the following details:
    
    Customer Name: ${review.customer}
    Platform: ${review.platform}
    Rating: ${review.rating} out of 5 stars
    Review Content: "${review.content}"
    Sentiment: ${review.sentiment}
    
    The response should:
    1. Address the customer by name
    2. Thank them for their feedback
    3. Acknowledge specific points from their review
    4. If the review is negative (3 stars or less), apologize and offer to make things right
    5. If the review is positive (4-5 stars), express appreciation
    6. Include a reference to the platform they posted on
    7. End with a professional sign-off
    
    Keep the tone professional but warm, and the length moderate (3-5 sentences).
  `

  try {
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 300,
    })

    return text
  } catch (error) {
    console.error("Error generating AI response:", error)
    return "An error occurred while generating the response. Please try again."
  }
}

