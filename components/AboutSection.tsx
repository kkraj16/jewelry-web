import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { AboutContent } from '../types';
import { FadeInImage } from './ui/FadeInImage';
import { Skeleton } from './ui/Skeleton';
import { Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const data = await api.getAboutContent();
        setAboutContent(data);
      } catch (error) {
        console.error('Error fetching about content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, []);

  if (loading || !aboutContent || !aboutContent.enabled) {
    return null; // Don't render if loading or disabled
  }

  return (
    <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-20">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-900 mb-4">{aboutContent.title}</h1>
        <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto">
          {aboutContent.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 mb-4 sm:mb-6">Crafting Excellence Since 1995</h2>
          <div className="space-y-4 sm:space-y-6">
            {aboutContent.bulletPoints.map((point, index) => (
              <p key={index} className="text-neutral-600 text-base leading-relaxed">
                {point}
              </p>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <FadeInImage 
              src={aboutContent.imageUrl} 
              alt={aboutContent.title} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-gold-500 rounded-full flex items-center justify-center shadow-xl">
            <Sparkles className="text-white" size={20} />
          </div>
        </div>
      </div>
    </section>
  );
};

export const AboutSectionSkeleton: React.FC = () => {
  return (
    <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-20">
        <Skeleton className="h-10 w-80 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
        <div>
          <Skeleton className="h-8 w-64 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
};