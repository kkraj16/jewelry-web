import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { SHOP_DETAILS } from '../constants';
import { FadeInImage } from '../components';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discountedPrice = product.price - (product.price * product.discount / 100);

  const handleEnquiry = () => {
    const message = `Hello, I'm interested in ${product.name} (ID: ${product.id}) from Ratannam Gold. Kindly share more details.`;
    const url = `https://wa.me/${SHOP_DETAILS.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-neutral-100 flex flex-col h-full">
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <FadeInImage 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-neutral-900 text-gold-400 text-xs font-bold px-3 py-1 uppercase tracking-widest">
            -{product.discount}% Off
          </div>
        )}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/70 to-transparent">
           <button 
            onClick={handleEnquiry}
            className="w-full bg-white text-neutral-900 py-3 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gold hover:text-white transition-colors"
          >
            <MessageCircle size={16} /> Enquire on WhatsApp
          </button>
        </div>
      </div>
      
      <div className="p-4 sm:p-5 flex-grow flex flex-col">
        <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">{product.category}</p>
        <h3 className="font-serif text-base sm:text-lg text-neutral-900 mb-2 group-hover:text-gold-600 transition-colors flex-grow">{product.name}</h3>
        
        <div className="flex items-center justify-center gap-3 text-sm mt-auto pt-2">
          {product.discount > 0 && (
             <span className="text-neutral-400 line-through text-xs sm:text-sm">₹{product.price.toLocaleString('en-IN')}</span>
          )}
          <span className="font-bold text-neutral-900">₹{discountedPrice.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};