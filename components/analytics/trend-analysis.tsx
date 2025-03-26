"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const data = [
  {
    month: "Jan",
    "Average Rating": 4.1,
    "Review Volume": 42,
  },
  {
    month: "Feb",
    "Average Rating": 4.0,
    "Review Volume": 45,
  },
  {
    month: "Mar",
    "Average Rating": 3.9,
    "Review Volume": 50,
  },
  {
    month: "Apr",
    "Average Rating": 4.2,
    "Review Volume": 55,
  },
  {
    month: "May",
    "Average Rating": 4.3,
    "Review Volume": 58,
  },
  {
    month: "Jun",
    "Average Rating": 4.4,
    "Review Volume": 62,
  },
  {
    month: "Jul",
    "Average Rating": 4.5,
    "Review Volume": 68,
  },
  {
    month: "Aug",
    "Average Rating": 4.4,
    "Review Volume": 75,
  },
  {
    month: "Sep",
    "Average Rating": 4.6,
    "Review Volume": 82,
  },
  {
    month: "Oct",
    "Average Rating": 4.7,
    "Review Volume": 90,
  },
  {
    month: "Nov",
    "Average Rating": 4.8,
    "Review Volume": 95,
  },
  {
    month: "Dec",
    "Average Rating": 4.9,
    "Review Volume": 105,
  },
]

export function TrendAnalysis() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="Average Rating" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line yAxisId="right" type="monotone" dataKey="Review Volume" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}

