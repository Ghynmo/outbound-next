import React from 'react';
import { assets } from '../../assets/images';
import SafeImage from '../ui/SafeImage';

const facilities = [
  { 
    image: assets.facilityImgAula, 
    title: 'Tempat Istirahat',
    description: 'Area luas dan nyaman untuk beristirahat dan berkumpul bersama rombongan.'
  },
  { 
    image: assets.facilityImgMakan, 
    title: 'Makan Siang', 
    description: 'Sajian menu khas pedesaan yang lezat dan higienis.'
  },
  { 
    image: assets.facilityImgSnack, 
    title: 'Welcome Drink & Snack', 
    description: 'Nikmati jajanan tradisional (Bakso) dan minuman hangat saat kedatangan.'
  },
  { 
    image: assets.facilityImgSafe, 
    title: 'Standar Keamanan', 
    description: 'Peralatan dan prosedur keamanan standar tinggi untuk setiap aktivitas.'
  },
  // Using other images for remaining cards to fill the grid if needed, or stick to 4 key facilities
];

const Facilities: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-12 lg:px-16 text-center">
        <h2 className="text-4xl font-medium text-dark mb-4">Fasilitas Lengkap</h2>
        <p className="text-lg text-dark/70 max-w-2xl mx-auto mb-12">
           Kami menyediakan berbagai fasilitas pendukung untuk memastikan kenyamanan dan keamanan kegiatan Anda.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((facility, index) => (
            <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="relative h-[250px] w-full overflow-hidden">
                <SafeImage 
                   src={facility.image} 
                   alt={facility.title}
                   fill
                   className="object-cover transition-transform duration-700 group-hover:scale-110"
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>
              <div className="p-6 text-left flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-dark mb-2">{facility.title}</h3>
                <p className="text-dark/70 text-sm leading-relaxed">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
