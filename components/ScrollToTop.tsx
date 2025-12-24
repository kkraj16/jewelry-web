import { useEffect } from 'react';

export const ScrollToTop: React.FC = () => {
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    // For Next.js router changes, we'll use window load event as a simple solution
    window.addEventListener('load', handleRouteChange);

    return () => {
      window.removeEventListener('load', handleRouteChange);
    };
  }, []);

  return null;
};