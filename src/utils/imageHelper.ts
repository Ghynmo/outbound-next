import { assets } from '../assets/images';
import { StaticImageData } from 'next/image';

/**
 * Resolves an image path from the database to an actual image source.
 * Handles both direct URLs (legacy), asset keys (new local images), and StaticImageData objects.
 */
export const resolvePackageImage = (imagePath: string | StaticImageData | undefined): any => {
  if (!imagePath) return assets.packageImg1; // Default fallback
  
  if (typeof imagePath === 'string') {
    // Check if the string matches a key in our assets object
    if (imagePath in assets) {
      return (assets as any)[imagePath];
    }
  }
  
  // Return the original path if it's not a key (e.g. external URL or StaticImageData object)
  return imagePath;
};

/**
 * Helper to get the string URL for <img /> tags
 */
export const getPackageImageSrc = (imagePath: string | StaticImageData | undefined): string => {
  const resolved = resolvePackageImage(imagePath);
  if (typeof resolved === 'object' && resolved !== null && 'src' in resolved) {
    return resolved.src;
  }
  return resolved as string;
};
