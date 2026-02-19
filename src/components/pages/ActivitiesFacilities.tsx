import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { assets } from '../../assets/images';
import SafeImage from '../ui/SafeImage';

const ActivitiesFacilities: React.FC = () => {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 md:px-12 lg:px-16 text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Aktifitas & Fasilitas</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Jelajahi berbagai permainan seru dan fasilitas lengkap yang kami sediakan.
            </p>
          </div>
        </section>

        {/* Activities Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-12 lg:px-16">
            <h2 className="text-3xl font-bold text-dark mb-12 text-center">Wahana & Permainan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold text-dark mb-4">Flying Fox</h3>
                <p className="text-dark/70 text-lg leading-relaxed mb-6">
                  Rasakan sensasi meluncur dari ketinggian dengan pemandangan sawah yang hijau. 
                  Wahana ini dilengkapi dengan peralatan keamanan standar internasional dan instruktur profesional.
                  Cocok untuk melatih keberanian dan adrenalin.
                </p>
                <ul className="space-y-2 text-dark/70">
                  <li className="flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>Panjang lintasan: 150 meter</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>Beban maksimal: 90 kg</li>
                </ul>
              </div>
              <div className="order-1 md:order-2 rounded-2xl overflow-hidden h-[300px] md:h-[400px] relative">
                <SafeImage src={assets.activity1} alt="Flying Fox" fill className="object-cover" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div className="rounded-2xl overflow-hidden h-[300px] md:h-[400px] relative">
                <SafeImage src={assets.activity2} alt="Rakit" fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-dark mb-4">Rakit & Susur Sungai</h3>
                <p className="text-dark/70 text-lg leading-relaxed mb-6">
                  Belajar bekerjasama dalam tim untuk mengendalikan rakit di sungai yang tenang. 
                  Aktivitas ini sangat baik untuk membangun kekompakan (team building) dan komunikasi antar peserta.
                </p>
                <ul className="space-y-2 text-dark/70">
                  <li className="flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>Kapasitas: 6-8 orang per rakit</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>Wajib menggunakan pelampung</li>
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold text-dark mb-4">Edukasi Pertanian</h3>
                <p className="text-dark/70 text-lg leading-relaxed mb-6">
                  Turun langsung ke sawah untuk belajar menanam padi, membajak sawah dengan kerbau, atau memanen hasil bumi.
                  Pengalaman otentik pedesaan yang jarang didapatkan di kota besar.
                </p>
              </div>
              <div className="order-1 md:order-2 rounded-2xl overflow-hidden h-[300px] md:h-[400px] relative">
                <SafeImage src={assets.activity3} alt="Pertanian" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-12 lg:px-16">
            <h2 className="text-3xl font-bold text-dark mb-12 text-center">Fasilitas Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Mushola', icon: '🕌', desc: 'Tempat ibadah yang bersih dan nyaman.' },
                { title: 'Toilet & Kamar Bilas', icon: '🚿', desc: 'Jumlah memadai, bersih, dan terawat.' },
                { title: 'Area Parkir Luas', icon: '🚗', desc: 'Aman dan bisa menampung bus besar.' },
                { title: 'Kantin & Catering', icon: '🍽️', desc: 'Menyajikan masakan khas Sunda yang lezat.' },
                { title: 'Saung Istirahat', icon: '🛖', desc: 'Tersebar di berbagai titik untuk beristirahat.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-dark mb-2">{item.title}</h3>
                  <p className="text-dark/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ActivitiesFacilities;
