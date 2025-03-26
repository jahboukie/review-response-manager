"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"

const data = [
  {
    name: "Google Business",
    "Your Business": 4.5,
    "Competitor A": 4.2,
    "Competitor B": 3.9,
    "Industry Average": 4.1,
  },
  {
    name: "Yelp",
    "Your Business": 4.3,
    "Competitor A": 4.0,
    "Competitor B": 4.1,
    "Industry Average": 3.9,
  },
  {
    name: "TripAdvisor",
    "Your Business": 4.7,
    "Competitor A": 4.3,
    "Competitor B": 4.2,
    "Industry Average": 4.2,
  },
  {
    name: "Facebook",
    "Your Business": 4.6,
    "Competitor A": 4.4,
    "Competitor B": 4.0,
    "Industry Average": 4.3,
  },
]

export function CompetitorComparison() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 5]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Your Business" fill="#0ea5e9" />
        <Bar dataKey="Competitor A" fill="#8884d8" />
        <Bar dataKey="Competitor B" fill="#82ca9d" />
        <Bar dataKey="Industry Average" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  )
}

