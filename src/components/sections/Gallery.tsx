import React from 'react';
import { assets } from '../../assets/images';
import Image from 'next/image';

const items = [
  { image: assets.benefit1, title: 'Bangun Kerjasama Tim', count: '8 Properties', span: 'col-span-1 md:col-span-2' },
  { image: assets.benefit2, title: 'Melatih Kreativitas', count: '2 Properties', span: 'col-span-1 md:col-span-1' },
  { image: assets.benefit3, title: 'Menumbuhkan Keberanian', count: '1 Property', span: 'col-span-1 md:col-span-1' },
  { image: assets.benefit4, title: 'Bersahabat dengan Alam', count: '0 Properties', span: 'col-span-1 md:col-span-1' },
  { image: assets.benefit5, title: 'Pengetahuan Seru', count: '3 Properties', span: 'col-span-1 md:col-span-1' },
  { image: assets.benefit6, title: 'Menantang tapi tetap aman', count: '2 Properties', span: 'col-span-1 md:col-span-2' },
];

const Gallery: React.FC = () => {
  return (
    <section className="py-20 bg-white" id="gallery">
      <div className="container mx-auto px-4 md:px-12 lg:px-16">
        <h2 className="text-4xl font-medium text-dark mb-4">Semua perlu Outbound</h2>
        <p className="text-lg text-dark/70 mb-12">Ini berbagai manfaat kalau kita ikutan Outbound</p>

        {/* 
          Grid Layout:
          - Mobile: 1 column
          - Tablet/Desktop: 4 columns
          - Gap: 30px (approx to SCSS)
        */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div 
              key={index} 
              className={`relative rounded-2xl overflow-hidden h-[395px] group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 ${item.span}`}
            >
              <Image 
                src={item.image} 
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay: Top-to-bottom dark fade */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent" />
              
              {/* Content Positioned at Top Left */}
              <div className="absolute top-0 left-0 p-8 w-full z-10">
                <h3 className="text-2xl font-medium text-white leading-tight">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
