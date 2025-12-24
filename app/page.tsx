'use client';

import React, { useState } from 'react';
import { Layout, LiveRates, Banner, CategorySection, TrendingProducts, ReviewsSection } from '../components';
import Link from 'next/link';
import { ArrowRight, Star, X, Calendar } from 'lucide-react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your appointment request has been received. We will call you shortly.');
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <LiveRates />

        {/* Booking Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
              onClick={() => setIsModalOpen(false)}
            ></div>
            <div className="bg-white w-full max-w-md relative z-10 overflow-hidden shadow-2xl animate-fade-in-up">
              <div className="bg-neutral-900 text-white p-4 sm:p-6 flex justify-between items-center">
                <h3 className="font-serif text-lg sm:text-xl">Book an Appointment</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-4 sm:p-8">
                <p className="text-neutral-500 text-sm mb-6 text-center">
                  Visit our showroom for a personalized viewing experience of our premium collection.
                </p>
                
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-neutral-500 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full border-b border-neutral-300 py-2 text-neutral-900 focus:border-gold-500 outline-none transition-colors bg-transparent" 
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-neutral-500 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      className="w-full border-b border-neutral-300 py-2 text-neutral-900 focus:border-gold-500 outline-none transition-colors bg-transparent" 
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wide text-neutral-500 mb-1">Date</label>
                      <input 
                        type="date" 
                        required 
                        className="w-full border-b border-neutral-300 py-2 text-neutral-900 focus:border-gold-500 outline-none transition-colors bg-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wide text-neutral-500 mb-1">Time</label>
                      <select className="w-full border-b border-neutral-300 py-2 text-neutral-900 focus:border-gold-500 outline-none transition-colors bg-transparent">
                        <option>Morning (10am - 1pm)</option>
                        <option>Afternoon (1pm - 5pm)</option>
                        <option>Evening (5pm - 8pm)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="submit" 
                      className="w-full bg-gold-500 text-white py-3 uppercase tracking-widest text-xs font-bold hover:bg-gold-600 transition-colors shadow-lg"
                    >
                      Confirm Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Banner - CMS Controlled */}
        <Banner />

        {/* Categories Grid - CMS Controlled */}
        <CategorySection />

        {/* Featured Products - CMS Controlled */}
        <TrendingProducts />

        {/* Discount/Sale Banner */}
        <section className="py-12 sm:py-16 bg-neutral-900 text-white text-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
          <div className="relative z-10">
            <span className="text-gold-500 tracking-widest uppercase text-sm font-bold">Special Offer</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl my-3 sm:my-4">Flat 20% Off Making Charges</h2>
            <p className="text-neutral-400 mb-6 sm:mb-8 max-w-lg mx-auto">Visit our store today to experience the finest craftsmanship with exclusive seasonal offers.</p>
            <Link href="/contact" className="inline-block px-6 py-2 sm:px-8 sm:py-3 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-neutral-900 transition-all duration-300 uppercase tracking-wider text-sm font-bold">
              Locate Store
            </Link>
          </div>
        </section>
        
         {/* Reviews Section - CMS Controlled */}
        <ReviewsSection />
      </div>
    </Layout>
  );
}