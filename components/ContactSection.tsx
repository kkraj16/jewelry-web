import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ContactContent } from '../types';
import { FadeInImage } from './ui/FadeInImage';
import { Skeleton } from './ui/Skeleton';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [contactContent, setContactContent] = useState<ContactContent | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading || !contactContent || !contactContent.enabled) {
    return null; // Don't render if loading or disabled
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hello, I am interested in your jewelry products.');
    window.open(`https://wa.me/${contactContent.whatsapp}?text=${message}`, '_blank');
  };

  return (

    <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-6 sm:mb-8">Contact Information</h2>
      </div>

      {/* Contact Information Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 mb-16 sm:mb-20">
        {/* Text Information Section */}
        <div>
          <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 mb-8">Get In Touch</h3>
          
          <div className="space-y-6 sm:space-y-8">
            {contactContent.address && (
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="text-neutral-900" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 mb-1">Visit Our Store</h3>
                  <p className="text-neutral-600">{contactContent.address}</p>
                </div>
              </div>
            )}

            {contactContent.phone && (
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Phone className="text-neutral-900" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 mb-1">Call Us</h3>
                  <p className="text-neutral-600">{contactContent.phone}</p>
                </div>
              </div>
            )}

            {contactContent.email && (
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Mail className="text-neutral-900" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 mb-1">Email Us</h3>
                  <p className="text-neutral-600">{contactContent.email}</p>
                </div>
              </div>
            )}

            {contactContent.workingHours && (
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="text-neutral-900" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 mb-1">Business Hours</h3>
                  <p 
                    className="text-neutral-600 whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: contactContent.workingHours.replace(/\n/g, '<br />') }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* WhatsApp Button */}
          <div className="mt-8 sm:mt-12">
            <h3 className="font-medium text-neutral-900 mb-4">Connect via WhatsApp</h3>
            <button
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </button>
          </div>
        </div>

        {/* Map Section */}
        <div>
          <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 mb-8">Visit Our Store</h3>
          
          {/* Store Image */}
          <div className="bg-neutral-100 rounded-2xl h-48 sm:h-64 mb-6 sm:mb-8 flex items-center justify-center">
            <FadeInImage 
              src="https://images.unsplash.com/photo-1591702011437-4e3b352e5e9e?q=80&w=800&auto=format&fit=crop" 
              alt="Ratannam Gold Store" 
              className="w-full h-full object-cover rounded-2xl"
              loading="lazy"
            />
          </div>
          
          {/* Embedded Google Map */}
          {contactContent.mapEmbedUrl && (
            <div className="bg-neutral-100 rounded-2xl h-48 sm:h-64 mb-4">
              <iframe 
                src={contactContent.mapEmbedUrl} 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '0.5rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ratannam Gold Store Location"
              ></iframe>
            </div>
          )}
          <p className="text-neutral-600 text-sm mt-4">
            Experience our collection in person at our beautiful store in Pali. Our experts are ready to assist you with personalized service.
          </p>
        </div>
      </div>
    </section>
  );
};

export const ContactSectionSkeleton: React.FC = () => {
  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <Skeleton className="h-8 w-64 mx-auto mb-6 sm:mb-8" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 mb-16 sm:mb-20">
        {/* Text Information Section Skeleton */}
        <div>
          <Skeleton className="h-6 w-32 mb-8" />
          
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1"></div>
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>

            <div className="flex items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1"></div>
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>

            <div className="flex items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1"></div>
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-12 w-full sm:w-48 rounded-lg" />
          </div>
        </div>

        {/* Map Section Skeleton */}
        <div>
          <Skeleton className="h-6 w-32 mb-8" />
          <Skeleton className="w-full h-48 sm:h-64 mb-6 sm:mb-8 rounded-2xl" />
          <Skeleton className="w-full h-48 sm:h-64 mb-4 rounded-2xl" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
    </div>
  );
};