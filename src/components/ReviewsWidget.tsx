import { useState } from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { getFeaturedReviews, getAllReviews, getAverageRating, getTotalReviews, getGoogleReviewLink } from '../services/googleReviewsService';

export default function ReviewsWidget() {
  const [showAll, setShowAll] = useState(false);
  const reviews = showAll ? getAllReviews() : getFeaturedReviews(8);
  const avgRating = getAverageRating();
  const totalReviews = getTotalReviews();

  if (reviews.length === 0) return null;

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const className = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    return [1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`${className} ${
          star <= rating
            ? 'fill-[#c9a24a] text-[#c9a24a]'
            : 'fill-none text-[rgba(244,239,226,0.15)]'
        }`}
        aria-hidden="true"
      />
    ));
  };

  return (
    <section id="reviews" className="sec sec--dark border-b border-[rgba(244,239,226,0.06)]" aria-label="Client reviews">
      <div className="wrap">
        {/* Header with Google-style rating badge */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow">Google Reviews</span>
            <h2 className="h2">
              What Our <em className="it text-[#ffd9a0]">Clients Say</em>
            </h2>
          </div>

          {/* Rating badge */}
          <a
            href={getGoogleReviewLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-[#141a1d] border border-[rgba(244,239,226,0.1)] px-5 py-3 hover:border-[rgba(201,162,74,0.4)] transition-all group"
          >
            <div className="text-center">
              <div className="font-mono text-3xl font-bold text-[#f4efe2]">{avgRating.toFixed(1)}</div>
              <div className="flex items-center gap-0.5 mt-1">
                {renderStars(Math.round(avgRating), 'sm')}
              </div>
              <div className="mono-label text-[10px] text-[rgba(244,239,226,0.4)] mt-1">
                {totalReviews} reviews
              </div>
            </div>
            <div className="h-10 w-px bg-[rgba(244,239,226,0.1)]" />
            <div className="text-left">
              <div className="font-sans text-sm font-medium text-[#f4efe2]">Google</div>
              <div className="mono-label text-[10px] text-[rgba(244,239,226,0.4)] flex items-center gap-1 group-hover:text-[#c9a24a] transition-colors">
                Write a review <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </a>
        </div>

        {/* Google-style review cards */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#141a1d] border border-[rgba(244,239,226,0.08)] p-5 hover:border-[rgba(201,162,74,0.25)] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#c9a24a]/20 flex items-center justify-center font-sans text-sm font-semibold text-[#c9a24a]">
                    {review.authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-sans text-sm font-medium text-[#f4efe2]">
                      {review.authorName}
                    </div>
                    <div className="mono-label text-[10px] text-[rgba(244,239,226,0.35)]">
                      {review.relativeTime}
                    </div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {renderStars(review.rating, 'sm')}
                </div>
              </div>

              {/* Review text */}
              <p className="font-sans text-sm leading-relaxed text-[rgba(244,239,226,0.75)]">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Tags */}
              {review.neighborhood && (
                <div className="flex items-center gap-2 mt-3">
                  <span className="mono-label text-[10px] px-2 py-0.5 bg-[rgba(201,162,74,0.08)] border border-[rgba(201,162,74,0.2)] text-[#c9a24a]">
                    {review.neighborhood}
                  </span>
                  {review.transaction && (
                    <span className={`mono-label text-[10px] px-2 py-0.5 border ${
                      review.transaction === 'sold'
                        ? 'bg-[rgba(201,162,74,0.05)] border-[rgba(201,162,74,0.2)] text-[#c9a24a]'
                        : 'bg-[rgba(31,105,112,0.08)] border-[rgba(31,105,112,0.25)] text-[#4f828a]'
                    }`}>
                      {review.transaction === 'sold' ? 'SOLD' : review.transaction === 'bought' ? 'BOUGHT' : 'BOTH'}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Load more / Load less */}
        {getAllReviews().length > 8 && (
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="btn btn--sm"
            >
              {showAll ? 'Show fewer reviews' : `Load more reviews (${getAllReviews().length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
