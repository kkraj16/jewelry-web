'use client';

import React, { useState, useEffect } from 'react';
import { Layout, ContactSection, ContactSectionSkeleton } from '../../components';
import { api } from '../../services/api';
import { ContactContent } from '../../types';

export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  const [contactContent, setContactContent] = useState<ContactContent | null>(null);

  useEffect(() => {
    const fetchContactContent = async () => {
      try {
        const data = await api.getContactContent();
        setContactContent(data);
      } catch (error) {
        console.error('Error fetching contact content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactContent();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        
        {/* Contact Section - CMS Controlled */}
        {loading ? (
          <ContactSectionSkeleton />
        ) : (
          <ContactSection />
        )}
      </div>
    </Layout>
  );
}