import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Banner as BannerType } from '../types';
import { FadeInImage } from './ui/FadeInImage';
import { Skeleton } from './ui/Skeleton';
import Link from 'next/link';

export const Banner: React.FC = () => {
  const [banners, setBanners] = useState<BannerType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await api.getBanners();
        setBanners(data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading || banners.length === 0) {
    return (
      <section className="relative h-[70vh] sm:h-[85vh] flex items-center justify-center text-center bg-neutral-900 overflow-hidden">
        <Skeleton className="w-full h-full" />
      </section>
    );
  }

  const banner = banners[0]; // Take the first enabled banner

  return (
    <section className="relative h-[70vh] sm:h-[85vh] flex items-center justify-center text-center bg-neutral-900 overflow-hidden">
      {/* Background Image with Model */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 z-10" />
        <FadeInImage 
          src={banner.imageUrl} 
          alt={banner.title} 
          className="w-full h-full object-cover object-center animate-scale-slow"
          loading="eager"
        />
      </div>
      
      <div className="relative z-20 max-w-5xl px-4 sm:px-6">
        <div className="inline-block mb-4 px-4 py-1 border border-gold-400/50 rounded-full bg-black/30 backdrop-blur-sm">
          <p className="text-gold-400 tracking-[0.2em] uppercase text-[8px] sm:text-[10px] md:text-xs font-bold">
            Ratannam Gold • Since 1995
          </p>
        </div>
        
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl text-white mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
          {banner.title}
        </h1>
        
        <p className="text-neutral-200 text-base sm:text-lg md:text-xl mb-6 sm:mb-10 max-w-2xl mx-auto font-light drop-shadow-md">
          {banner.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Link 
            href={banner.ctaUrl} 
            className="px-6 py-3 sm:px-10 sm:py-4 bg-white text-neutral-900 uppercase tracking-widest text-xs font-bold hover:bg-gold-500 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            {banner.ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
};