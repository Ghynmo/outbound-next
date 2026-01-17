"use client";

import React from 'react';
import { assets } from '../../assets/images';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const SecondHero: React.FC = () => {
  const router = useRouter();

  const handleExplore = () => {
    try {
      router.push('/gallery');
    } catch (error) {
      console.error('Navigation error:', error);
      toast.error('Gagal memuat halaman galeri');
    }
  };

  return (
    <section className="relative w-full h-[600px] md:h-[750px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image 
          src={assets.secondHeroBg} 
          alt="Outbound Activity" 
          fill 
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-medium text-white mb-8 max-w-4xl mx-auto leading-tight">
          Temukan Keseruan Belajar di Alam Terbuka
        </h2>
        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Permainan, edukasi, dan kebersamaan dalam satu pengalaman outbound
        </p>
        
        <button 
          onClick={handleExplore}
          className="inline-flex items-center bg-secondary px-8 py-4 rounded-xl font-medium text-lg text-primary transition-all duration-300 transform hover:bg-secondary-hover hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-4 focus:ring-secondary/50"
        >
          <span>Jelajahi Aktivitas</span>
          <Image src={assets.exploreIcon} alt="Explore" className="w-4 h-4 ml-3" width={16} height={16} />
        </button>
      </div>
    </section>
  );
};

export default SecondHero;
