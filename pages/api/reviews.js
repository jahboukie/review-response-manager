import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const reviews = await prisma.review.findMany();
      res.status(200).json(reviews);
    } catch (error) {
      console.error('GET /api/reviews error:', error);
      res.status(500).json({ error: 'Failed to fetch reviews', details: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { platform, content, sentiment, rating } = req.body;
      const review = await prisma.review.create({
        data: { platform, content, sentiment, rating: parseFloat(rating) },
      });
      res.status(201).json(review);
    } catch (error) {
      console.error('POST /api/reviews error:', error);
      res.status(500).json({ error: 'Failed to create review', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}