'use client';

import React, { useState, useEffect } from 'react';
import { Layout, AboutSection, AboutSectionSkeleton } from '../../components';
import { api } from '../../services/api';
import { AboutContent } from '../../types';

export default function AboutPage() {
  const [loading, setLoading] = useState(true);
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);

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

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {loading ? (
          <AboutSectionSkeleton />
        ) : (
          <AboutSection />
        )}
      </div>
    </Layout>
  );
}