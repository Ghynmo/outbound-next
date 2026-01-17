import React from 'react';
import { assets } from '../../assets/images';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  {
    image: assets.heroBg,
    title: 'Outbound & Edukasi Alam',
    subtitle: 'Tempat belajar, bermain, dan membangun kerjasama melalui aktivitas alam & desa'
  },
  {
    image: assets.benefit1,
    title: 'Membangun Kerjasama Tim',
    subtitle: 'Aktivitas yang dirancang khusus untuk mempererat kekompakan dan komunikasi tim Anda'
  },
  {
    image: assets.benefit6,
    title: 'Petualangan Seru & Aman',
    subtitle: 'Nikmati wahana menantang dengan standar keamanan tinggi dan pemandu profesional'
  }
];

const Hero: React.FC = () => {
  const router = useRouter();

  return (
    <section className="relative w-full h-screen min-h-[600px] md:min-h-[800px] flex items-center overflow-hidden">
      {/* Swiper Background & Content */}
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
        }}
        loop={true}
        className="absolute inset-0 w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <Image 
                src={slide.image} 
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
                quality={90}
              />
              <div className="absolute inset-0 bg-black/40 z-10"></div>
            </div>

            {/* Content Overlay */}
            <div className="container mx-auto px-4 md:px-12 lg:px-16 relative z-10 h-full flex items-center pt-20 pb-20">
              <div className="max-w-3xl animate-fadeIn w-full">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-medium text-white leading-tight mb-4 md:mb-6">
                  {slide.title.split(' & ').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && ' & '}<br className="hidden md:block" />
                    </React.Fragment>
                  ))}
                </h1>
                
                <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-10 max-w-xl leading-relaxed">
                  {slide.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => router.push('/packages')}
                    className="flex items-center justify-between bg-secondary text-primary px-6 py-3 md:px-8 md:py-4 rounded-xl font-medium text-base md:text-lg hover:bg-secondary-hover transition min-w-[180px] min-h-[56px] group"
                  >
                    <span>Lihat Paket</span>
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button 
                    onClick={() => router.push('/contact')}
                    className="flex items-center justify-between bg-white text-primary px-6 py-3 md:px-8 md:py-4 rounded-xl font-medium text-base md:text-lg hover:bg-gray-100 transition min-w-[180px] min-h-[56px] group"
                  >
                    <span>Hubungi Kami</span>
                    <MessageCircle className="w-5 h-5 ml-2 transition-transform group-hover:scale-110" />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Container */}
      <div className="custom-pagination absolute bottom-28 md:bottom-32 left-0 right-0 z-20 flex justify-center gap-2 px-4 pointer-events-none [&>.swiper-pagination-bullet]:pointer-events-auto [&>.swiper-pagination-bullet]:w-3 [&>.swiper-pagination-bullet]:h-3 [&>.swiper-pagination-bullet]:bg-white/50 [&>.swiper-pagination-bullet-active]:bg-secondary [&>.swiper-pagination-bullet-active]:w-8 [&>.swiper-pagination-bullet]:transition-all [&>.swiper-pagination-bullet]:rounded-full"></div>

      {/* Stats Section (Floating at bottom right) */}
      <div className="absolute bottom-0 right-0 left-0 lg:left-auto lg:right-20 lg:bottom-10 z-20">
         <div 
            className="bg-white/95 backdrop-blur-sm rounded-t-2xl lg:rounded-2xl p-6 md:p-8 lg:p-12 flex flex-row justify-between items-center md:items-start gap-4 md:gap-8 lg:gap-16 shadow-2xl max-w-4xl mx-auto lg:mx-0 overflow-hidden relative"
         >
            {/* Background Image using Next.js Image */}
            <div className="absolute inset-0 z-0">
                <Image 
                    src={assets.statsBg} 
                    alt="Stats Background" 
                    fill 
                    className="object-cover opacity-20"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/70"></div>
            </div>
            
            <div className="relative z-10 flex flex-row justify-between items-center md:items-start gap-4 md:gap-8 lg:gap-16 w-full">
                <div className="text-center md:text-left min-w-[80px]">
                <h3 className="text-2xl md:text-4xl font-bold text-dark mb-1">500+</h3>
                <p className="text-dark/80 font-medium text-sm md:text-base">Sekolah</p>
                </div>
                <div className="w-px h-10 md:h-16 bg-gray-300"></div>
                <div className="text-center md:text-left min-w-[80px]">
                <h3 className="text-2xl md:text-4xl font-bold text-dark mb-1">1 Juta+</h3>
                <p className="text-dark/80 font-medium text-sm md:text-base">Pengunjung</p>
                </div>
                <div className="w-px h-10 md:h-16 bg-gray-300"></div>
                <div className="text-center md:text-left min-w-[80px]">
                <h3 className="text-2xl md:text-4xl font-bold text-dark mb-1">30+</h3>
                <p className="text-dark/80 font-medium text-sm md:text-base">jenis permainan</p>
                </div>
            </div>
         </div>
      </div>
    </section>
  );
};

export default Hero;
