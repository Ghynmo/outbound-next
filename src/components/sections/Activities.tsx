import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/images';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import SafeImage from '../ui/SafeImage';

interface ActivityItem {
  title: string;
  category: string;
  subtitle: string;
  image: string | StaticImageData;
  isMoreCard?: boolean;
}

const allActivities: ActivityItem[] = [
  // Edu 1
  { title: 'Sapi Perah', category: 'Paket Edu1', subtitle: 'Edu 1', image: assets.activitySapiPerah },
  { title: 'Tanah Liat', category: 'Paket Edu1', subtitle: 'Edu 1', image: assets.activityTanahLiat },
  { title: 'Tangkap Ikan', category: 'Paket Edu1', subtitle: 'Edu 1', image: assets.activityTangkapIkan },
  { title: 'Pipa Bocor', category: 'Paket Edu1', subtitle: 'Edu 1', image: assets.activityPipaBocor },
  { title: 'Program Pak Tani', category: 'Paket Edu1', subtitle: 'Edu 1', image: assets.activityMenanamPadi },
  { title: 'Rakit Kita', category: 'Paket Edu1', subtitle: 'Edu 1', image: assets.activityRakitKita },
  // Edu 2
  { title: 'Membatik', category: 'Paket Edu2', subtitle: 'Edu 2', image: assets.activityMembatik },
  { title: 'Tower Champion', category: 'Paket Edu2', subtitle: 'Edu 2', image: assets.activityTowerChampion },
  { title: 'Jamu Tradisional', category: 'Paket Edu2', subtitle: 'Edu 2', image: assets.activityJamu },
  { title: 'Tank Gulung', category: 'Paket Edu2', subtitle: 'Edu 2', image: assets.activityTankGulung },
  { title: 'Memanah', category: 'Paket Edu2', subtitle: 'Edu 2', image: assets.activityMemanah },
  { title: 'Pengolahan Tahu', category: 'Paket Edu2', subtitle: 'Edu 2', image: assets.activityPengolahanTahu },
];

// Validation to ensure no duplicate images are used
if (process.env.NODE_ENV === 'development') {
  const images = allActivities.map(a => a.image);
  const uniqueImages = new Set(images);
  if (images.length !== uniqueImages.size) {
    console.warn('Warning: Duplicate images detected in Activities list. Each activity should have a unique image.');
  }
}

const filters = ['Semua', 'Paket Edu1', 'Paket Edu2'];

const Activities: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  // Determine items per page based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setItemsPerPage(4);
      else if (window.innerWidth >= 1024) setItemsPerPage(3);
      else if (window.innerWidth >= 768) setItemsPerPage(2);
      else setItemsPerPage(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter logic
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentIndex(0);
  };

  const filteredItems = activeFilter === 'Semua'
    ? allActivities
    : allActivities.filter(item => item.category === activeFilter);

  // Prepare display items including the "More" card
  const displayItems = [...filteredItems];
  
  // Add "More" card to all tabs (Semua, Edu 1, Edu 2)
  displayItems.push({
    title: '20+ jenis permainan',
    category: 'Special',
    subtitle: 'Lihat Galeri',
    image: assets.benefit1, // Changed to a generic 'benefit' image (Human Tower) to be distinct
    isMoreCard: true
  });

  const totalPages = Math.ceil(displayItems.length / itemsPerPage);

  // Auto-play
  useEffect(() => {
    if (totalPages <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalPages]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleItems = displayItems.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section className="py-20 bg-white overflow-hidden" id="activities">
      <div className="container mx-auto px-4 md:px-12 lg:px-16 mb-12">
        <h2 className="text-4xl font-medium text-dark mb-4">Aktifitas Seru & Edukatif</h2>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <p className="text-lg text-dark/70 max-w-lg">
            Berbagai kegiatan seru yang dirancang untuk edukasi, kerjasama tim, dan petualangan tak terlupakan.
          </p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-secondary text-primary shadow-md'
                    : 'bg-gray-100 text-dark/60 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Content */}
      <div className="container mx-auto px-4 md:px-12 lg:px-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode='wait'>
            {visibleItems.map((item, index) => (
              <motion.div
                key={`${item.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  fill
                  className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
                    // @ts-ignore
                    item.isMoreCard ? 'brightness-50' : ''
                  }`}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-secondary text-primary text-xs font-bold rounded-full mb-3">
                    {item.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                    {item.title}
                  </h3>
                  
                  {item.isMoreCard ? (
                    <Link href="/gallery" className="inline-flex items-center text-white font-medium hover:text-secondary transition-colors mt-2 group/link">
                      Lihat Semua <ArrowRight size={18} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <div className="w-8 h-1 bg-secondary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  )}
                </div>

                {/* Link for More Card */}
                {item.isMoreCard && (
                    <Link href="/gallery" className="absolute inset-0 z-10" aria-label="Lihat Galeri" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-dark hover:bg-secondary hover:text-primary hover:border-secondary transition-all shadow-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-secondary' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-dark hover:bg-secondary hover:text-primary hover:border-secondary transition-all shadow-sm"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
        
        {/* Selengkapnya Button */}
        <div className="flex justify-center mt-12">
             <Link 
                href="/gallery"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary rounded-full hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
             >
                Selengkapnya
                <ArrowRight className="ml-2 h-5 w-5" />
             </Link>
        </div>

      </div>
    </section>
  );
};

export default Activities;
