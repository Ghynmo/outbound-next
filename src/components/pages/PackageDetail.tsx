'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Users, MessageCircle, Gamepad2, CheckCircle2, Coffee, Check, Utensils, Backpack } from 'lucide-react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { useData } from '../../context/DataContext';
import ErrorBoundary from '../common/ErrorBoundary';

/**
 * PackageDetail Component
 * 
 * Displays detailed information about a specific outbound package.
 * Implements specific logic for three main package types:
 * 1. Edu 1: Focused on basic education (TK/SD) - Uses data from initialData.ts
 * 2. Edu 2: Focused on advanced activities (SMP/SMA/General) - Uses data from initialData.ts
 * 3. Camping Ground: Focused on camping experience - Uses images from images/index.ts
 * 
 * Features:
 * - Dynamic data loading based on ID
 * - Data validation to ensure information completeness
 * - Specific gallery rendering for each package type
 * - Responsive layout with sticky sidebar
 * - Error handling via ErrorBoundary and internal checks
 * - Optimized image loading with caching (via Next.js Image)
 */
const PackageDetailContent: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { packages, contact, gallery } = useData();
  
  const data = packages.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Validation Logic
  // Check if data exists and has essential fields
  const isValidPackage = (pkg: typeof data) => {
    if (!pkg) return false;
    // Essential fields for all packages
    if (!pkg.title || !pkg.description || !pkg.price) return false;
    
    // Specific validation for Edu packages
    if (pkg.category === 'Edukasi') {
      if (!pkg.features || pkg.features.length === 0) console.warn(`Package ${pkg.id} missing features`);
    }
    
    return true;
  };

  if (!isValidPackage(data)) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col bg-gray-50">
        <h2 className="text-2xl font-bold mb-4 text-dark">Paket tidak ditemukan atau Data Tidak Lengkap</h2>
        <p className="text-dark/60 mb-6">Maaf, informasi paket yang Anda cari tidak tersedia atau sedang dalam perbaikan.</p>
        <button 
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition font-medium"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  // Safe to assert data is defined here due to check above
  const pkg = data!;

  const handleBooking = () => {
    const message = `Halo Admin, saya ingin booking ${pkg.title}.\n\nTanggal:\nJumlah Peserta:\n\nMohon infonya. Terima kasih.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${contact.phone[0]?.replace(/\D/g, '') || '628569005959'}?text=${encodedMessage}`, '_blank');
  };

  const handleConsultation = () => {
    const message = `Halo Admin, saya ingin bertanya mengenai ${pkg.title}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${contact.phone[0]?.replace(/\D/g, '') || '628569005959'}?text=${encodedMessage}`, '_blank');
  };

  // Use package-specific gallery if available, otherwise fallback to global gallery
  // This implements the requirement to use specific data for Edu 1, Edu 2, and Camping Ground
  let packageGallery: (string | import('next/image').StaticImageData)[] = [];
  
  // Data from initialData.ts now includes gallery populated from assets/images/index.ts
  if (pkg.gallery && pkg.gallery.length > 0) {
    packageGallery = pkg.gallery;
  } else {
    // Fallback logic kept just in case, but primary data source is now pkg.gallery
    if (pkg.id === 'paket-edu-1') {
      packageGallery = gallery.slice(0, 6).map(g => g.src);
    } else if (pkg.id === 'paket-edu-2') {
      packageGallery = gallery.slice(6, 12).map(g => g.src);
    } else {
      packageGallery = gallery.slice(0, 6).map(g => g.src);
    }
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 md:px-12 lg:px-16">
          
          {/* Breadcrumb / Back Button */}
          <div className="mb-8">
            <Link href="/packages" className="inline-flex items-center text-dark/60 hover:text-primary transition font-medium">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Kembali ke Paket Outbound
            </Link>
          </div>

          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            {/* Hero Banner for Detail */}
            <div className="relative h-[300px] md:h-[400px]">
              <Image 
                src={pkg.image} 
                alt={pkg.title} 
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white relative z-10 p-4">
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">{pkg.title}</h1>
                  <p className="text-xl md:text-2xl font-medium">{pkg.price} <span className="text-sm font-normal">{pkg.unit}</span></p>
                  
                  {/* Additional Info Badges */}
                  <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {pkg.levels && pkg.levels.length > 0 && (
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                        {pkg.levels.join(', ')}
                      </span>
                    )}
                    {pkg.duration && (
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                        {pkg.duration}
                      </span>
                    )}
                    {pkg.location && (
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                        {pkg.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* Description */}
                <section>
                  <h2 className="text-2xl font-bold text-dark mb-6">Tentang Paket</h2>
                  <div className="prose prose-lg text-dark/80 whitespace-pre-line">
                    {pkg.description || 'Deskripsi belum tersedia.'}
                  </div>
                </section>

                {/* Gallery - Uses specific data as requested */}
                <section>
                  <h2 className="text-2xl font-bold text-dark mb-6">Galeri Kegiatan</h2>
                  {packageGallery.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {packageGallery.map((img, idx) => (
                        <div key={idx} className="rounded-xl overflow-hidden h-32 md:h-40 group cursor-pointer relative">
                          <Image 
                            src={img} 
                            alt={`Gallery ${pkg.title} ${idx + 1}`} 
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-dark/60 italic">Belum ada foto kegiatan untuk paket ini.</p>
                  )}
                </section>

                {/* Games / Activities Section */}
                <section className="bg-orange-50 p-6 md:p-8 rounded-3xl border border-orange-100 transition-all hover:shadow-md">
                  <div className="flex items-center mb-6">
                    <div className="bg-orange-100 p-3 rounded-xl mr-4 text-orange-600 shadow-sm">
                      <Gamepad2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-dark">Games & Aktivitas Seru</h2>
                      <p className="text-sm text-dark/60 mt-1">Kegiatan seru yang akan dimainkan</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {pkg.games && pkg.games.length > 0 ? (
                      pkg.games.map((game, idx) => (
                        <div key={`game-${idx}`} className="flex items-start group">
                          <CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <span className="text-dark/80 font-medium group-hover:text-orange-700 transition-colors">{game}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-dark/60 italic col-span-2">Detail games akan diinformasikan lebih lanjut.</p>
                    )}
                  </div>
                </section>

                {/* Facilities Section */}
                <section className="bg-blue-50 p-6 md:p-8 rounded-3xl border border-blue-100 transition-all hover:shadow-md">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-xl mr-4 text-blue-600 shadow-sm">
                      <Coffee className="w-6 h-6" /> 
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-dark">Fasilitas Lengkap</h2>
                      <p className="text-sm text-dark/60 mt-1">Kenyamanan yang anda dapatkan</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {pkg.facilities && pkg.facilities.length > 0 ? (
                      pkg.facilities.map((facility, idx) => (
                        <div key={`fac-${idx}`} className="flex items-start group">
                          <Check className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <span className="text-dark/80 font-medium group-hover:text-blue-700 transition-colors">{facility}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-dark/60 italic col-span-2">Detail fasilitas akan diinformasikan lebih lanjut.</p>
                    )}
                  </div>
                </section>

                {/* Menu Section - Handles specific data structure for menus */}
                {pkg.menu && Object.keys(pkg.menu).length > 0 && (
                  <section className="bg-green-50 p-6 md:p-8 rounded-3xl border border-green-100 transition-all hover:shadow-md">
                    <div className="flex items-center mb-6">
                      <div className="bg-green-100 p-3 rounded-xl mr-4 text-green-600 shadow-sm">
                        <Utensils className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-dark">Menu Makanan</h2>
                        <p className="text-sm text-dark/60 mt-1">Hidangan lezat yang disajikan</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {pkg.menu.welcome && (
                        <div className="flex items-start">
                          <div className="min-w-[140px] font-bold text-dark/80">Welcome Drink:</div>
                          <div className="text-dark/70">{pkg.menu.welcome}</div>
                        </div>
                      )}
                      {pkg.menu.snack && (
                        <div className="flex items-start">
                          <div className="min-w-[140px] font-bold text-dark/80">Snack:</div>
                          <div className="text-dark/70">{pkg.menu.snack}</div>
                        </div>
                      )}
                      {pkg.menu.makan_siang_anak && (
                        <div className="flex items-start">
                          <div className="min-w-[140px] font-bold text-dark/80">Makan Siang (Anak):</div>
                          <div className="text-dark/70">{pkg.menu.makan_siang_anak}</div>
                        </div>
                      )}
                      {pkg.menu.makan_siang_dewasa && (
                        <div className="flex items-start">
                          <div className="min-w-[140px] font-bold text-dark/80">Makan Siang (Dewasa):</div>
                          <div className="text-dark/70">{pkg.menu.makan_siang_dewasa}</div>
                        </div>
                      )}
                      {pkg.menu.makan_malam && (
                        <div className="flex items-start">
                          <div className="min-w-[140px] font-bold text-dark/80">Makan Malam:</div>
                          <div className="text-dark/70">{pkg.menu.makan_malam}</div>
                        </div>
                      )}
                      {pkg.menu.sarapan && (
                        <div className="flex items-start">
                          <div className="min-w-[140px] font-bold text-dark/80">Sarapan:</div>
                          <div className="text-dark/70">{pkg.menu.sarapan}</div>
                        </div>
                      )}
                    </div>
                  </section>
                )}

                {/* Requirements Section */}
                {pkg.requirements && pkg.requirements.length > 0 && (
                  <section className="bg-red-50 p-6 md:p-8 rounded-3xl border border-red-100 transition-all hover:shadow-md">
                    <div className="flex items-center mb-6">
                      <div className="bg-red-100 p-3 rounded-xl mr-4 text-red-600 shadow-sm">
                        <Backpack className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-dark">Perlengkapan & Persyaratan</h2>
                        <p className="text-sm text-dark/60 mt-1">Yang perlu dipersiapkan</p>
                      </div>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 list-disc pl-5">
                      {pkg.requirements.map((req, idx) => (
                        <li key={`req-${idx}`} className="text-dark/80 pl-2">
                          {req}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
                
                {/* Notes Section - Additional info like Camping Ground specifics */}
                {pkg.notes && pkg.notes.length > 0 && (
                  <section className="bg-gray-100 p-6 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-dark mb-2">Catatan Tambahan:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {pkg.notes.map((note, idx) => (
                        <li key={`note-${idx}`} className="text-dark/70 text-sm">{note}</li>
                      ))}
                    </ul>
                  </section>
                )}

              </div>

              {/* Sidebar / Sticky CTA */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-dark mb-6">Booking Sekarang</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-dark/70">
                      <Calendar className="w-5 h-5 mr-3 text-primary" />
                      <span>Tentukan tanggal sesukamu</span>
                    </div>
                    <div className="flex items-center text-dark/70">
                      <Users className="w-5 h-5 mr-3 text-primary" />
                      <span>Cocok untuk grup besar</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleBooking}
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center mb-4"
                  >
                    Booking via WhatsApp
                  </button>

                  <button 
                    onClick={handleConsultation}
                    className="w-full bg-white border-2 border-primary text-primary font-bold py-4 rounded-xl hover:bg-primary/5 transition-all duration-300 flex items-center justify-center"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Tanya Dulu
                  </button>

                  <p className="text-xs text-center text-gray-400 mt-6">
                    *Harga dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

const PackageDetail: React.FC = () => {
  return (
    <ErrorBoundary>
      <PackageDetailContent />
    </ErrorBoundary>
  );
};

export default PackageDetail;
