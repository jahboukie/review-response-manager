import { NextResponse } from 'next/server';

// Mock data for reviews
const reviews = [
  {
    id: 1,
    platform: 'Google',
    content: 'Great service!',
    sentiment: 'positive',
    rating: 5,
    date: '2025-03-26',
  },
  {
    id: 2,
    platform: 'Yelp',
    content: 'Good job!',
    sentiment: 'positive',
    rating: 4,
    date: '2025-03-26',
  },
];

// Handle GET requests to /api/reviews
export async function GET() {
  return NextResponse.json(reviews);
}

// Handle POST requests to /api/reviews (for adding a new review)
export async function POST(request: Request) {
  const newReview = await request.json();
  const reviewWithId = { id: reviews.length + 1, ...newReview, date: new Date().toISOString().split('T')[0] };
  reviews.push(reviewWithId); // In a real app, save to a database
  return NextResponse.json(reviewWithId, { status: 201 });
}