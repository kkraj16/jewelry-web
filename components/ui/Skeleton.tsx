import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  rounded?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  width, 
  height, 
  circle = false, 
  rounded = false 
}) => {
  const style = {
    width: width || '100%',
    height: height || '1rem',
  };

  const classes = [
    'animate-pulse',
    'bg-neutral-200',
    circle ? 'rounded-full' : rounded ? 'rounded' : 'rounded-sm',
    className
  ].join(' ');

  return <div style={style} className={classes} />;
};