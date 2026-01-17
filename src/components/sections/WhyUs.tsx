import React from 'react';
import { assets } from '../../assets/images';
import SafeImage from '../ui/SafeImage';

const features = [
  {
    icon: assets.whyIcon1,
    title: 'Biaya Sangat Terjangkau',
    description: 'Hanya dengan Rp. 150.000 sudah bisa merasakan serunya Outbound & berbagai fasilitas.'
  },
  {
    icon: assets.whyIcon2,
    title: 'Instruktur Berpengalaman',
    description: 'Instruktur kami sudah berpengalaman 3 tahun+ di bidangnya.'
  },
  {
    icon: assets.whyIcon3,
    title: 'Aman Untuk Semua Umur',
    description: 'Tempat & aktivitas kami dirancang agar aman untuk anak-anak & semua umur.'
  }
];

const WhyUs: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-12 lg:px-16 text-center">
        <h2 className="text-4xl font-medium text-dark mb-4">Kenapa Memilih Pelita Desa?</h2>
        <p className="text-lg text-dark/70 max-w-2xl mx-auto mb-16">
          Pengalaman outbound edukatif yang seru, aman, dan terjangkau untuk semua kalangan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-8 relative h-40 w-full flex items-center justify-center">
                <SafeImage 
                  src={feature.icon} 
                  alt={feature.title} 
                  className="object-contain" 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                />
              </div>
              <h3 className="text-2xl font-medium text-dark mb-4">{feature.title}</h3>
              <p className="text-dark/70 leading-relaxed max-w-xs mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
