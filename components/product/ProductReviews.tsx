import { Star } from "lucide-react";

export default function ProductReviews({
  rating,
  reviews,
}: {
  rating: number;
  reviews: number;
}) {
  return (
    <div className="border-t border-gray-200 py-8">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-100">
        Customer Reviews
      </h2>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          {[0, 1, 2, 3, 4].map((ratingg) => (
            <Star
              key={rating}
              className={`h-5 w-5 flex-shrink-0 ${
                rating < Math.round(rating)
                  ? "text-yellow-400"
                  : "text-gray-400"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="ml-4 text-sm text-gray-200">Based on {reviews} reviews</p>
      </div>
    </div>
  );
}
