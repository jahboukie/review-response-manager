import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export type TopicExtractionResult = {
  topics: Array<{
    name: string
    mentions: number
    sentiment: number
  }>
}

export async function extractTopics(
  reviews: Array<{ content: string; sentiment: string }>,
): Promise<TopicExtractionResult> {
  const reviewsText = reviews.map((r) => `- Content: "${r.content}", Sentiment: ${r.sentiment}`).join("\n")

  const prompt = `
    Analyze the following customer reviews and extract the most common topics mentioned.
    For each topic, provide the number of mentions and the average sentiment score (0-1 scale).
    
    Reviews:
    ${reviewsText}
    
    Provide a JSON response with the following structure:
    {
      "topics": [
        {
          "name": "Topic name",
          "mentions": number of mentions,
          "sentiment": average sentiment score (0-1)
        },
        ...
      ]
    }
    
    Extract at most 8 topics. Only return the JSON object, nothing else.
  `

  try {
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: prompt,
      temperature: 0.3,
      maxTokens: 500,
    })

    // Parse the JSON response
    const result = JSON.parse(text)
    return result as TopicExtractionResult
  } catch (error) {
    console.error("Error extracting topics:", error)
    // Return a default result in case of error
    return {
      topics: [
        { name: "Customer Service", mentions: 0, sentiment: 0.5 },
        { name: "Product Quality", mentions: 0, sentiment: 0.5 },
        { name: "Value for Money", mentions: 0, sentiment: 0.5 },
      ],
    }
  }
}

