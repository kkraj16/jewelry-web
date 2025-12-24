import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { api } from '../services/api';
import { ContactContent } from '../types';

export const Footer: React.FC = () => {
  const [contactContent, setContactContent] = useState<ContactContent | null>(null);

  useEffect(() => {
    const fetchContactContent = async () => {
      try {
        const data = await api.getContactContent();
        setContactContent(data);
      } catch (error) {
        console.error('Error fetching contact content for footer:', error);
      }
    };

    fetchContactContent();
  }, []);

  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8 border-t-4 border-gold-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-gold-400">Ratannam Gold</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Crafting timeless elegance since 1995. We believe every piece of jewelry tells a story. Discover yours with us.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif mb-6 text-white">Explore</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li><Link href="/" className="hover:text-gold-400 transition-colors block py-1">Home</Link></li>
              <li><Link href="/products" className="hover:text-gold-400 transition-colors block py-1">Our Collection</Link></li>
              <li><Link href="/about" className="hover:text-gold-400 transition-colors block py-1">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-gold-400 transition-colors block py-1">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-gold-400 transition-colors block py-1">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-serif mb-6 text-white">Collections</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li><Link href="/products?category=Gold" className="hover:text-gold-400 transition-colors block py-1">Gold Jewellery</Link></li>
              <li><Link href="/products?category=Silver" className="hover:text-gold-400 transition-colors block py-1">Silver Artifacts</Link></li>
              <li><Link href="/products?category=Artificial" className="hover:text-gold-400 transition-colors block py-1">Bridal Sets</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif mb-6 text-white">Visit Us</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 text-gold-500 flex-shrink-0" />
                <span>{contactContent?.address || '123 Jewelry Street, Pali, Rajasthan 306401'}</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-gold-500 flex-shrink-0" />
                <span>{contactContent?.phone || '+91 98765 43210'}</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-gold-500 flex-shrink-0" />
                <span>{contactContent?.email || 'info@ratannamgold.com'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Ratannam Gold. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for Luxury.</p>
        </div>
      </div>
    </footer>
  );
};