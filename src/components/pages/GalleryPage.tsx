import React, { useState } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import SafeImage from '../ui/SafeImage';
import { assets } from '../../assets/images';
import { resolvePackageImage } from '../../utils/imageHelper';
import { useData } from '../../context/DataContext';

const facilitiesData = [
  { id: 'f1', title: 'Aula Luas', description: 'Ruang serbaguna kapasitas besar', image: assets.gallery1 },
  { id: 'f2', title: 'Mushola', description: 'Tempat ibadah yang nyaman', image: assets.gallery2 },
  { id: 'f3', title: 'Toilet Bersih', description: 'Fasilitas sanitasi terawat', image: assets.gallery3 },
  { id: 'f4', title: 'Makan Siang', description: 'Menu prasmanan lezat', image: assets.gallery4 },
  { id: 'f5', title: 'Bakso', description: 'Jajanan bakso segar', image: assets.gallery5 },
  { id: 'f6', title: 'Welcome Drink', description: 'Minuman penyambut segar', image: assets.gallery6 },
  { id: 'f7', title: 'Instruktur Berpengalaman', description: 'Pemandu profesional & ramah', image: assets.helpImg1 },
  { id: 'f8', title: 'Souvenir', description: 'Oleh-oleh khas Pelita Desa', image: assets.gallery7 },
];

const GalleryPage: React.FC = () => {
  const { gallery } = useData();
  const [activeTab, setActiveTab] = useState<'activities' | 'facilities'>('activities');

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 md:px-12 lg:px-16 text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Galeri & Fasilitas</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Jelajahi keseruan aktivitas dan fasilitas lengkap di Pelita Desa.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 md:px-12 lg:px-16">
            
            {/* Main Tabs (Activities vs Facilities) */}
            <div className="flex justify-center gap-6 mb-12">
                <button
                    onClick={() => setActiveTab('activities')}
                    className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
                        activeTab === 'activities'
                        ? 'bg-secondary text-primary shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                >
                    Aktifitas
                </button>
                <button
                    onClick={() => setActiveTab('facilities')}
                    className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
                        activeTab === 'facilities'
                        ? 'bg-secondary text-primary shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                >
                    Fasilitas
                </button>
            </div>

            {/* Content Based on Tab */}
          {activeTab === 'activities' ? (
              <>
                  {/* Activity Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {gallery.map((item) => (
                <div key={item.id} className="group relative rounded-2xl overflow-hidden aspect-[4/3] w-full cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                  <SafeImage 
                    src={resolvePackageImage(item.src)} 
                    alt={item.title} 
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-center p-4">
                              <h3 className="text-white text-xl font-bold">{item.title}</h3>
                              <p className="text-white/80 text-sm">{item.category}</p>
                          </div>
                          </div>
                      </div>
                      ))}
                  </div>
              </>
          ) : (
                /* Facilities Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {facilitiesData.map((item) => (
                        <div key={item.id} className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                            {/* Image Area */}
                            <div className="relative h-56 overflow-hidden">
                                <SafeImage 
                                    src={item.image} 
                                    alt={item.title} 
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                            </div>
                            
                            {/* Content Area */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default GalleryPage;
