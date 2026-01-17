import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useData } from '../../context/DataContext';
import { Gamepad2, Utensils, Ticket, Gift, ArrowRight } from 'lucide-react';
import SafeImage from '../ui/SafeImage';

const categories = ['Semua Paket', 'Play Group-TK-SD', 'SMP-SMA', 'Dewasa'];

const Packages: React.FC = () => {
  const { packages } = useData();
  const [activeCategory, setActiveCategory] = useState('Semua Paket');
  const router = useRouter();

  // Filter only active packages and first 3 for home display
  const displayPackages = packages.filter(p => p.isActive).slice(0, 3);

  const handleCardClick = (id: string) => {
    router.push(`/package/${id}`);
  };

  return (
    <section className="pb-20 bg-white" id="packages">
      <div className="container mx-auto px-4 md:px-12 lg:px-16">
        {/* CTA Banner */}
        <div className="bg-primary rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between mb-20 relative overflow-hidden">
          <div className="relative z-10 text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">Pilih paket yang cocok</h2>
            <p className="text-white/80 max-w-xl text-lg">
              Temukan berbagai pilihan paket outbound yang sesuai dengan kebutuhan dan budget Anda.
            </p>
          </div>
          <div 
            onClick={() => router.push('/packages')}
            className="relative z-10 bg-secondary rounded-xl px-8 py-4 flex items-center space-x-4 cursor-pointer hover:bg-secondary-hover transition"
          >
            <span className="text-primary font-medium text-lg">Lihat Semua Paket</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
           <h2 className="text-4xl font-medium text-dark mb-4">Paket Outbound</h2>
           <p className="text-lg text-dark/70">Pilihan paket terbaik untuk kegiatan edukasi dan rekreasi.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-[#fff8f6] border border-dark text-dark'
                  : 'text-dark/60 hover:text-dark'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPackages.map((pkg) => (
            <div 
              key={pkg.id} 
              onClick={() => handleCardClick(pkg.id)}
              className="group relative rounded-2xl overflow-hidden h-[500px] cursor-pointer"
            >
              {/* Image */}
              <SafeImage 
                src={pkg.image} 
                alt={pkg.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                {/* Top Tags */}
                <div className="flex space-x-2">
                    <span 
                      className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary text-dark"
                    >
                      Featured
                    </span>
                    <span 
                      className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary text-white"
                    >
                      {pkg.category}
                    </span>
                </div>

                {/* Bottom Info */}
                <div>
                  <h3 className="text-3xl font-medium text-white mb-4">{pkg.title}</h3>
                  
                  <div className="space-y-3 mb-6">
                    {/* Games List */}
                    <div className="flex items-start text-white/90 text-sm">
                      <Gamepad2 className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2">
                        {pkg.games && pkg.games.length > 0 
                          ? pkg.games.slice(0, 3).join(', ') + (pkg.games.length > 3 ? '...' : '')
                          : 'Beragam aktivitas seru'}
                      </span>
                    </div>

                    {/* Facility Icons */}
                    <div className="flex items-center space-x-3">
                       <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/10" title="Tiket Masuk">
                            <Ticket className="w-4 h-4 text-white" />
                          </div>
                          {(pkg.facilities?.some(f => f.toLowerCase().includes('makan') || f.toLowerCase().includes('snack'))) && (
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/10" title="Makan & Snack">
                              <Utensils className="w-4 h-4 text-white" />
                            </div>
                          )}
                           {(pkg.facilities?.some(f => f.toLowerCase().includes('gift') || f.toLowerCase().includes('aula'))) && (
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/10" title="Fasilitas Lengkap">
                              <Gift className="w-4 h-4 text-white" />
                            </div>
                          )}
                       </div>
                       <span className="text-xs text-white/80">+ Fasilitas</span>
                    </div>
                  </div>

                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-white">{pkg.price}</span>
                    <span className="text-white/80 text-sm">{pkg.unit}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
