import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Review } from '../types';
import { Skeleton } from './ui/Skeleton';
import { Star } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await api.getReviews();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading || reviews.length === 0) {
    return (
      <section className="py-12 sm:py-20 max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center mb-4 sm:mb-6">
          <Skeleton className="w-8 h-8" />
        </div>
        <Skeleton className="h-8 w-96 mx-auto mb-6 sm:mb-8" />
        <Skeleton className="h-4 w-64 mx-auto mb-4" />
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="w-12 h-12 bg-neutral-200 rounded-full overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="text-left">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </section>
    );
  }

  const review = reviews[0]; // Take the first enabled review

  return (
    <section className="py-12 sm:py-20 max-w-4xl mx-auto px-4 text-center">
      <Star size={28} className="text-gold-500 mx-auto mb-4 sm:mb-6" fill="currentColor" />
      <h2 className="font-serif text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8 text-neutral-900">
        "{review.comment}"
      </h2>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-3">
        <div className="w-12 h-12 bg-neutral-200 rounded-full overflow-hidden">
          <img 
            src={`https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 50) + 1}.jpg`} 
            alt={review.name} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="text-left">
          <p className="font-bold text-neutral-900">{review.name}</p>
          <p className="text-xs text-neutral-500 uppercase tracking-wide">{review.customerType}</p>
        </div>
      </div>
    </section>
  );
};