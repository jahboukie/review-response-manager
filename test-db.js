const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully!');
    const review = await prisma.review.create({
      data: {
        platform: 'Google',
        content: 'Great service!',
        sentiment: 'positive',
        rating: 5.0,
      },
    });
    console.log('Inserted review:', review);
    const reviews = await prisma.review.findMany();
    console.log('All reviews:', reviews);
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();