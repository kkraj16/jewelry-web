import React, { useEffect, useState } from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';
import { api } from '../services/api';
import { GoldRates } from '../types';
import { INITIAL_RATES } from '../constants';

export const LiveRates: React.FC = () => {
  const [rates, setRates] = useState<GoldRates>(INITIAL_RATES);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const fetchRates = async () => {
    setLoading(true);
    const data = await api.getRates();
    setRates(data);
    setLoading(false);
  };

  useEffect(() => {
    // Set isClient to true on mount to ensure client-side rendering
    setIsClient(true);
    fetchRates();
    // Auto refresh every 60 seconds
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, []);

  // Format time consistently for both server and client
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    // Use consistent formatting that works on both server and client
    return date.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-neutral-900 text-gold-100 py-3 px-4 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm">
        
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <TrendingUp size={14} className="text-green-400" />
          <span className="uppercase tracking-widest font-bold text-white text-[10px] sm:text-xs">Live Market Rates</span>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
          <div className="flex flex-col items-center">
            <span className="text-neutral-400 uppercase text-[8px] sm:text-xs">Gold 24K (10g)</span>
            <span className="font-mono font-bold text-sm sm:text-lg text-gold-400">₹{rates.gold24k.toLocaleString()}</span>
          </div>
          
          <div className="flex flex-col items-center">
             <span className="text-neutral-400 uppercase text-[8px] sm:text-xs">Gold 22K (10g)</span>
             <span className="font-mono font-bold text-sm sm:text-lg text-gold-400">₹{rates.gold22k.toLocaleString()}</span>
          </div>

          <div className="flex flex-col items-center">
             <span className="text-neutral-400 uppercase text-[8px] sm:text-xs">Silver (1kg)</span>
             <span className="font-mono font-bold text-sm sm:text-lg text-white">₹{rates.silver.toLocaleString()}</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center text-xs text-neutral-500 ml-4">
           Updated: {isClient ? formatTime(rates.lastUpdated) : '00:00 AM'}
           <button onClick={fetchRates} className="ml-2 hover:text-white" aria-label="Refresh rates">
             <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
           </button>
        </div>

      </div>
    </div>
  );
};