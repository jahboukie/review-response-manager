import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export type SentimentResult = {
  sentiment: "positive" | "neutral" | "negative"
  score: number
  topics: string[]
}

export async function analyzeSentiment(reviewText: string): Promise<SentimentResult> {
  const prompt = `
    Analyze the sentiment of the following customer review:
    
    "${reviewText}"
    
    Provide a JSON response with the following structure:
    {
      "sentiment": "positive" | "neutral" | "negative",
      "score": [number between 0 and 1, where 0 is very negative and 1 is very positive],
      "topics": [array of key topics mentioned in the review, maximum 3 topics]
    }
    
    Only return the JSON object, nothing else.
  `

  try {
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: prompt,
      temperature: 0.3,
      maxTokens: 200,
    })

    // Parse the JSON response
    const result = JSON.parse(text)
    return result as SentimentResult
  } catch (error) {
    console.error("Error analyzing sentiment:", error)
    // Return a default result in case of error
    return {
      sentiment: "neutral",
      score: 0.5,
      topics: ["general feedback"],
    }
  }
}

