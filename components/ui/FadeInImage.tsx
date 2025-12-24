import React, { useState } from 'react';

interface FadeInImageProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  width?: number | string;
  height?: number | string;
  skeletonWidth?: string | number;
  skeletonHeight?: string | number;
  loading?: 'eager' | 'lazy';
}

export const FadeInImage: React.FC<FadeInImageProps> = ({ 
  src, 
  alt, 
  className = '',
  skeletonClassName = '',
  width,
  height,
  skeletonWidth,
  skeletonHeight,
  loading = 'lazy'
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative" style={{ width: width || 'auto', height: height || 'auto' }}>
      {isLoading && (
        <div 
          className={`absolute inset-0 ${skeletonClassName}`}
          style={{ width: skeletonWidth || width, height: skeletonHeight || height }}
        >
          <div className="animate-pulse bg-neutral-200 w-full h-full rounded-sm" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleImageLoad}
        loading={loading}
        style={{
          display: 'block',
          width: width || '100%',
          height: height || '100%',
          objectFit: 'cover'
        }}
      />
    </div>
  );
};