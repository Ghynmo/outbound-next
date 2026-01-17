import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/images';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import SafeImage from '../ui/SafeImage';
import { storageService } from '../../services/storage';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface Review {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url?: string;
  relative_time_description?: string;
  source: 'google' | 'local';
}

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = storageService.getReviews();
        
        if (data) {
            // Filter logic: Only show Google reviews if available. 
            // If Google reviews exist (>0), ignore local.
            // If no Google reviews, show local as fallback.
            const googleReviews = data.filter((r: Review) => r.source === 'google');
            const localReviews = data.filter((r: Review) => r.source === 'local');
            
            if (googleReviews.length > 0) {
                setReviews(googleReviews);
            } else {
                setReviews(localReviews);
            }
        }
      } catch (error) {
        console.error('Failed to load reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Helper to resolve image for local reviews that might be missing URL in DB
  // In a real app, we'd store the asset path in DB. Here we map by name for backward compat
  const getAvatar = (review: Review) => {
    if (review.source === 'google' && review.profile_photo_url) {
        return review.profile_photo_url;
    }
    
    // Fallback/Local mapping
    // Random assignment based on name length if specific mapping missing to vary avatars
    const nameLen = review.author_name.length;
    if (nameLen % 3 === 0) return assets.avatar1;
    if (nameLen % 3 === 1) return assets.avatar2;
    return assets.avatar3;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-12 lg:px-16 relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-medium text-dark max-w-xs leading-tight mb-4">Apa pendapat mereka?</h2>
            {!loading && reviews.length > 0 && reviews[0].source === 'google' ? (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Image 
                        src={assets.googleLogo}
                        alt="Google" 
                        width={20} 
                        height={20} 
                    />
                    <span>Ulasan terintegrasi dari Google Maps</span>
                </div>
            ) : (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Pengalaman seru dari pengunjung kami</span>
                </div>
            )}
          </div>
          
          <div className="flex items-center space-x-12 mt-8 md:mt-0">
             <div>
                <h3 className="text-3xl font-bold text-dark">{reviews.length > 0 ? '3300+' : '...'}</h3>
                <p className="text-dark/70">Orang puas</p>
             </div>
             <div>
                <div className="flex items-center space-x-2">
                   <h3 className="text-3xl font-bold text-dark">4.8</h3>
                   <span className="text-dark/70">Rata-rata</span>
                </div>
                <Image src={assets.stars} alt="Stars" className="h-3 w-auto mt-2" />
             </div>
          </div>
        </div>

        {/* Swiper Container with Navigation Buttons */}
        <div className="relative group">
          {loading ? (
            <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            speed={800}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            loop={true}
            className="pb-12"
          >
            {reviews.map((item, index) => (
              <SwiperSlide key={item.id || index}>
                <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                             <SafeImage 
                                src={getAvatar(item)} 
                                alt={item.author_name}
                                fill
                                className="object-cover"
                             />
                        </div>
                        <div>
                            <h4 className="font-bold text-dark text-lg leading-tight">{item.author_name}</h4>
                            <p className="text-gray-500 text-sm">
                                {item.source === 'google' ? item.relative_time_description : item.relative_time_description || 'Pengunjung'}
                            </p>
                        </div>
                    </div>
                    {/* Quote Icon or Google Icon */}
                    {item.source === 'google' ? (
                        <div className="bg-blue-50 p-2 rounded-full">
                             <Image 
                                src={assets.googleLogo} 
                                alt="Google" 
                                width={20} 
                                height={20} 
                            />
                        </div>
                    ) : (
                        <Image src={assets.quoteIcon1} alt="Quote" className="w-8 h-8 opacity-20" />
                    )}
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                        <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                    {item.source === 'google' && (
                        <span className="ml-2 text-xs text-green-600 flex items-center bg-green-50 px-2 py-0.5 rounded-full">
                            <CheckCircle className="w-3 h-3 mr-1" /> Terverifikasi
                        </span>
                    )}
                  </div>

                  <p className="text-gray-600 leading-relaxed flex-grow">
                    "{item.text.length > 150 ? item.text.substring(0, 150) + '...' : item.text}"
                  </p>
                  
                  {item.source === 'google' && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                          <a 
                            href="https://maps.app.goo.gl/7WdvZZsW7mJ897hHA" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                              Lihat di Google Maps
                          </a>
                      </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          )}

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute top-1/2 -left-4 md:-left-12 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all transform -translate-y-1/2 disabled:opacity-50">
            <ChevronLeft size={24} />
          </button>
          <button className="swiper-button-next-custom absolute top-1/2 -right-4 md:-right-12 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all transform -translate-y-1/2 disabled:opacity-50">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
