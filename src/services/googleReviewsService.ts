// Google Business Profile Reviews Service
// Real reviews pulled from Miguel Perez's verified Google Business Profile via
// Google Places API on 2026-10-07. Profile: "Miguel Perez, Realtor" (Aventura, FL)
// 5.0 stars across 34 Google reviews. Place ID: ChIJYfrh4Byt2YgR6abWm-oUP9Q

export interface GoogleReview {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
  timestamp: number;
  transaction?: 'bought' | 'sold' | 'both';
  neighborhood?: string;
  featured: boolean;
}

// Verified reviews from Google (5 most relevant of 34, per Google Places API)
export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: "rev-1",
    authorName: "Olec Zeravla",
    rating: 5,
    text: "If you\u2019re looking for a top Fort Lauderdale real estate agent, Miguel Perez is the one to call! His knowledge of the local market, pricing strategy, and expert marketing approach made selling our home a smooth and profitable experience. From the first consultation to closing, Miguel guided us through every step with professionalism, clear communication, and attention to detail.\n\nHe knew exactly how to position our home to attract the right buyers and sold it quickly for top dollar. His expertise in South Florida real estate, negotiation skills, and commitment to client satisfaction are unmatched. Highly recommend Miguel Perez if you want the best Realtor in Fort Lauderdale who truly knows how to sell your home fast and for maximum value!",
    relativeTime: "11 months ago",
    timestamp: 1760688000000,
    transaction: "sold",
    neighborhood: "Fort Lauderdale",
    featured: true,
  },
  {
    id: "rev-2",
    authorName: "Claudio Puig",
    rating: 5,
    text: "Amazing Experience with Miguel Perez! I can't say enough good things about working with Miguel Perez. From start to finish, he was professional, knowledgeable, and incredibly helpful throughout the entire process of purchasing my new home. He truly went above and beyond to ensure I found the perfect house and helped me navigate every step with confidence.\n\nMiguel was always available to answer my questions, provide guidance, and made sure I understood everything along the way. His expertise in the market and attention to detail were invaluable in negotiating a great deal and closing smoothly.\n\nWhat stood out most was Miguel\u2019s genuine care and dedication to finding the right home for me\u2014not just making a sale. I always felt like a priority, and his support made this potentially stressful process feel seamless and enjoyable.\n\nIf you're looking for a real estate agent who is trustworthy, responsive, and committed to your success, I highly recommend Miguel Perez. I couldn't have asked for a better partner in this journey!\n\nThank you, Miguel, for helping me and my wife find and close on our dream home!",
    relativeTime: "a year ago",
    timestamp: 1757664000000,
    transaction: "bought",
    neighborhood: undefined,
    featured: true,
  },
  {
    id: "rev-3",
    authorName: "Michael Lungu",
    rating: 5,
    text: "Relocating from California to Miami, I found Miguel Perez to be the best real estate agent for luxury homes. Despite being far away, Miguel went the extra mile, providing a curated list of amazing waterfront properties. His virtual tours made it easy to explore homes remotely, ensuring I didn't miss any details. Miguel's expertise and commitment made my property search seamless. If you need a realtor who's professional, knowledgeable, and personal, Miguel Perez is the perfect choice for a successful real estate journey.",
    relativeTime: "2 years ago",
    timestamp: 1726128000000,
    transaction: "bought",
    neighborhood: "Miami",
    featured: true,
  },
  {
    id: "rev-4",
    authorName: "Aurora Victoria",
    rating: 5,
    text: "I had the pleasure of working with Miguel Perez as my realtor in Miami, and I can't recommend him enough. Miguel not only provided efficient advice but also consistently went above and beyond in my home search. His dedication to understanding my needs and preferences was truly exceptional, and he successfully translated them into finding my dream home.\n\nMiguel's ability to listen and deliver on my specific requirements sets him apart as the best real estate agent in Miami. If you're looking to buy or sell a home in this competitive market, I wholeheartedly recommend Miguel Perez. He's the epitome of a top-notch realtor who ensures your real estate journey is smooth and successful.",
    relativeTime: "2 years ago",
    timestamp: 1726128000000,
    transaction: "bought",
    neighborhood: "Miami",
    featured: true,
  },
  {
    id: "rev-5",
    authorName: "Jefferson Hernandez",
    rating: 5,
    text: "I am so grateful to Miguel Perez for his tremendous help in finding me a new home. He was so knowledgeable and gave me wonderful advice throughout the entire process. He was so diligent in ensuring that I found the perfect home for me, and his expertise as a Miami real estate agent and local realtor advisor was invaluable. If you're in the Miami market searching for a new home, I highly recommend Miguel!",
    relativeTime: "3 years ago",
    timestamp: 1694592000000,
    transaction: "bought",
    neighborhood: "Miami",
    featured: false,
  },
];

export function getFeaturedReviews(limit = 8): GoogleReview[] {
  return GOOGLE_REVIEWS.filter(r => r.featured).slice(0, limit);
}

export function getAllReviews(): GoogleReview[] {
  return GOOGLE_REVIEWS;
}

export function getAverageRating(): number {
  // Verified profile rating from Google
  return 5.0;
}

export function getTotalReviews(): number {
  // Total reviews on Miguel's Google Business Profile
  return 34;
}

export function getGoogleReviewLink(): string {
  return "https://search.google.com/local/reviews?placeid=ChIJYfrh4Byt2YgR6abWm-oUP9Q";
}
