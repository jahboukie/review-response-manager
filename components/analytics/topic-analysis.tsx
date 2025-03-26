"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const data = [
  {
    topic: "Customer Service",
    mentions: 245,
    sentiment: 0.65,
  },
  {
    topic: "Product Quality",
    mentions: 190,
    sentiment: 0.72,
  },
  {
    topic: "Value for Money",
    mentions: 170,
    sentiment: 0.45,
  },
  {
    topic: "Shipping Speed",
    mentions: 140,
    sentiment: 0.38,
  },
  {
    topic: "Website Usability",
    mentions: 120,
    sentiment: 0.58,
  },
  {
    topic: "Return Process",
    mentions: 95,
    sentiment: 0.32,
  },
  {
    topic: "Product Selection",
    mentions: 85,
    sentiment: 0.75,
  },
  {
    topic: "Packaging",
    mentions: 65,
    sentiment: 0.62,
  },
]

export function TopicAnalysis() {
  // Calculate color based on sentiment score
  const getBarColor = (sentiment) => {
    if (sentiment >= 0.7) return "#22c55e" // green for very positive
    if (sentiment >= 0.5) return "#84cc16" // lime for positive
    if (sentiment >= 0.4) return "#eab308" // yellow for neutral
    if (sentiment >= 0.3) return "#f97316" // orange for negative
    return "#ef4444" // red for very negative
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Topics mentioned in reviews, colored by sentiment score (0-1 scale)
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="topic" type="category" width={150} />
          <Tooltip
            formatter={(value, name, props) => {
              if (name === "mentions") return [`${value} mentions`, "Mentions"]
              if (name === "sentiment") return [`${(value * 100).toFixed(0)}% positive`, "Sentiment"]
              return [value, name]
            }}
          />
          <Bar
            dataKey="mentions"
            fill="#8884d8"
            radius={[0, 4, 4, 0]}
            barSize={30}
            // Use sentiment score to determine color
            fill={(entry) => getBarColor(entry.sentiment)}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

