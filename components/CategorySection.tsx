import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { CategoryContent } from '../types';
import { FadeInImage } from './ui/FadeInImage';
import { Skeleton } from './ui/Skeleton';
import Link from 'next/link';

export const CategorySection: React.FC = () => {
  const [categories, setCategories] = useState<CategoryContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading || categories.length === 0) {
    return (
      <section className="py-12 sm:py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <div className="w-16 sm:w-20 h-1 bg-gold-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="group relative h-64 sm:h-80 lg:h-96 overflow-hidden cursor-pointer rounded-lg">
              <Skeleton className="w-full h-full" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-2">Our Collections</h2>
        <div className="w-16 sm:w-20 h-1 bg-gold-500 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {categories.map((cat) => (
          <Link href={`/products?category=${cat.name}`} key={cat.id} className="group relative h-64 sm:h-80 lg:h-96 overflow-hidden cursor-pointer rounded-lg">
            <FadeInImage 
              src={cat.imageUrl} 
              alt={cat.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="font-serif text-xl sm:text-2xl mb-2">{cat.name}</h3>
              <span className="text-xs uppercase tracking-widest border-b border-transparent group-hover:border-white transition-all pb-1 flex items-center w-max">
                View Products <span className="ml-2">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};