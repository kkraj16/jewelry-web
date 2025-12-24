import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Skeleton } from './ui/Skeleton';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const TrendingProducts: React.FC = () => {
  const [trendingProductIds, setTrendingProductIds] = useState<string[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        // Get trending product IDs from CMS
        const trendingData = await api.getTrendingProducts();
        const ids = trendingData.map(tp => tp.productId);
        setTrendingProductIds(ids);

        // Get actual product data
        const allProducts = await api.getProducts();
        const trending = allProducts.filter(p => ids.includes(p.id));
        
        // Sort by display order from CMS
        const sortedTrending = trending.sort((a, b) => {
          const orderA = ids.indexOf(a.id);
          const orderB = ids.indexOf(b.id);
          return orderA - orderB;
        });
        
        setTrendingProducts(sortedTrending);
      } catch (error) {
        console.error('Error fetching trending products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  if (loading || trendingProducts.length === 0) {
    return (
      <section className="bg-neutral-50 py-12 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 gap-4">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-6 w-24 hidden md:block" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-sm overflow-hidden shadow-sm border border-neutral-100 flex flex-col h-full">
                <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
                  <Skeleton className="w-full h-full" />
                </div>
                <div className="p-4 sm:p-5 flex-grow flex flex-col">
                  <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                  <div className="h-6 bg-neutral-200 rounded mb-4 flex-grow"></div>
                  <div className="flex justify-between">
                    <div className="h-4 w-1/3 bg-neutral-200 rounded"></div>
                    <div className="h-4 w-1/4 bg-neutral-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 md:hidden text-center">
            <Skeleton className="h-6 w-24 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-neutral-50 py-12 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-2">Trending Now</h2>
            <p className="text-neutral-500">Handpicked favorites just for you.</p>
          </div>
          <Link href="/products" className="hidden md:flex items-center text-gold-700 hover:text-gold-900 font-medium transition-colors">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-8 md:hidden text-center">
          <Link href="/products" className="inline-flex items-center text-gold-700 font-medium">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};