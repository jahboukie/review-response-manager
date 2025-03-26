"use client"

import { Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Line, ComposedChart } from "recharts"

const data = [
  {
    name: "Jan",
    reviews: 45,
    rating: 4.1,
  },
  {
    name: "Feb",
    reviews: 52,
    rating: 4.0,
  },
  {
    name: "Mar",
    reviews: 61,
    rating: 3.9,
  },
  {
    name: "Apr",
    reviews: 67,
    rating: 4.2,
  },
  {
    name: "May",
    reviews: 71,
    rating: 4.3,
  },
  {
    name: "Jun",
    reviews: 80,
    rating: 4.4,
  },
  {
    name: "Jul",
    reviews: 95,
    rating: 4.5,
  },
  {
    name: "Aug",
    reviews: 110,
    rating: 4.4,
  },
  {
    name: "Sep",
    reviews: 125,
    rating: 4.6,
  },
  {
    name: "Oct",
    reviews: 142,
    rating: 4.7,
  },
  {
    name: "Nov",
    reviews: 158,
    rating: 4.8,
  },
  {
    name: "Dec",
    reviews: 175,
    rating: 4.9,
  },
]

export function Overview() {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="left"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 5]}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value, entry, index) => (
              <span className="text-sm font-medium">{value === "reviews" ? "Review Volume" : "Average Rating"}</span>
            )}
          />
          <Bar yAxisId="left" dataKey="reviews" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
          <Line yAxisId="right" type="monotone" dataKey="rating" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

