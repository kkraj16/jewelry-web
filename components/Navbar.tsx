'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageCircle, MapPin } from 'lucide-react';
import { SHOP_DETAILS } from '../constants';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hello, I am interested in your jewelry products.');
    window.open(`https://wa.me/${SHOP_DETAILS.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md py-2' 
        : 'bg-white shadow-md py-2'  // Changed from transparent to white
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center">
              <div className="bg-gold-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div>
                <h1 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900">Ratannam Gold</h1>
                <p className="text-xs text-neutral-500 -mt-1">Since 1995</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {[
              { name: 'Home', href: '/' },
              { name: 'Products', href: '/products' },
              { name: 'About', href: '/about' },
              { name: 'Contact', href: '/contact' }
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-gold-600'
                    : 'text-neutral-700 hover:text-gold-600'
                }`}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            <a 
              href={`tel:${SHOP_DETAILS.phone}`} 
              className="flex items-center text-sm font-medium text-neutral-700 hover:text-gold-600 transition-colors"
            >
              <Phone size={16} className="mr-1" /> {SHOP_DETAILS.phone}
            </a>
            <button 
              onClick={handleWhatsAppClick}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
            >
              <MessageCircle size={16} className="mr-1" /> WhatsApp
            </button>
            <Link 
              href="/contact" 
              className="flex items-center bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gold-600 transition-colors"
            >
              <MapPin size={16} className="mr-1" /> Store
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-md text-neutral-700 hover:text-gold-600 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {[
              { name: 'Home', href: '/' },
              { name: 'Products', href: '/products' },
              { name: 'About', href: '/about' },
              { name: 'Contact', href: '/contact' }
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? 'bg-gold-50 text-gold-600'
                    : 'text-neutral-700 hover:bg-neutral-50 hover:text-gold-600'
                }`}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Contact Options */}
            <div className="pt-4 pb-2 space-y-3 border-t border-neutral-200">
              <a 
                href={`tel:${SHOP_DETAILS.phone}`} 
                className="flex items-center px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-50 rounded-md"
              >
                <Phone size={20} className="mr-3" /> {SHOP_DETAILS.phone}
              </a>
              <button 
                onClick={handleWhatsAppClick}
                className="w-full flex items-center px-3 py-2 text-base font-medium bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                <MessageCircle size={20} className="mr-3" /> WhatsApp
              </button>
              <Link 
                href="/contact" 
                className="w-full flex items-center px-3 py-2 text-base font-medium bg-neutral-900 text-white rounded-md hover:bg-gold-600"
              >
                <MapPin size={20} className="mr-3" /> Store Location
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};