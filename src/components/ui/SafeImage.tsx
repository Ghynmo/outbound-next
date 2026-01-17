"use client";
import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { ImageOff } from 'lucide-react';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  fallbackComponent?: React.ReactNode;
}

const SafeImage: React.FC<SafeImageProps> = ({ 
  src, 
  alt, 
  fallbackSrc, 
  fallbackComponent,
  className,
  ...props 
}) => {
  const [error, setError] = useState(false);

  if (error) {
    if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    }
    
    if (fallbackSrc) {
      return (
        <Image
          src={fallbackSrc}
          alt={alt}
          className={className}
          {...props}
          onError={() => {}} // Prevent infinite loop if fallback also fails
        />
      );
    }

    return (
      <div className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`} style={{ minHeight: '100px' }}>
        <div className="text-center">
          <ImageOff className="w-8 h-8 mx-auto mb-2" />
          <span className="text-xs">Image not found</span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
};

export default SafeImage;
