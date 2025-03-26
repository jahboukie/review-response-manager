"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Area, AreaChart } from "recharts"

const data = [
  {
    month: "Jan",
    "Response Rate": 75,
    "Avg Response Time (hours)": 12,
  },
  {
    month: "Feb",
    "Response Rate": 78,
    "Avg Response Time (hours)": 10,
  },
  {
    month: "Mar",
    "Response Rate": 80,
    "Avg Response Time (hours)": 9,
  },
  {
    month: "Apr",
    "Response Rate": 82,
    "Avg Response Time (hours)": 8,
  },
  {
    month: "May",
    "Response Rate": 85,
    "Avg Response Time (hours)": 7,
  },
  {
    month: "Jun",
    "Response Rate": 87,
    "Avg Response Time (hours)": 6,
  },
  {
    month: "Jul",
    "Response Rate": 90,
    "Avg Response Time (hours)": 5,
  },
  {
    month: "Aug",
    "Response Rate": 92,
    "Avg Response Time (hours)": 4,
  },
  {
    month: "Sep",
    "Response Rate": 94,
    "Avg Response Time (hours)": 3.5,
  },
  {
    month: "Oct",
    "Response Rate": 95,
    "Avg Response Time (hours)": 3,
  },
  {
    month: "Nov",
    "Response Rate": 97,
    "Avg Response Time (hours)": 2.5,
  },
  {
    month: "Dec",
    "Response Rate": 98,
    "Avg Response Time (hours)": 2,
  },
]

export function ResponseMetrics() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">Response Rate</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Area type="monotone" dataKey="Response Rate" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Average Response Time</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="Avg Response Time (hours)" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

