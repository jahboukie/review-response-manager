import { ReviewCard } from './review-card'; // Adjust based on your actual imports

export function ReviewsList({ reviews, filter }: { reviews: any[]; filter: string }) {
  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !review.respondedAt;
    if (filter === 'responded') return !!review.respondedAt;
    return true;
  });

  return (
    <div className="space-y-4">
      {filteredReviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        filteredReviews.map(review => (
          <div key={review.id} className="border p-4 rounded-lg">
            <h3 className="font-semibold">{review.platform}</h3>
            <p>{review.content}</p>
            <p className="text-sm text-gray-500">
              {review.sentiment}, {review.rating} - {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}