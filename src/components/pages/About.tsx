import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { assets } from '../../assets/images';
import { Users, Target, Heart } from 'lucide-react';
import { useData } from '../../context/DataContext';
import SafeImage from '../ui/SafeImage';

const About: React.FC = () => {
  const { about } = useData();

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        {/* Page Title */}
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 md:px-12 lg:px-16 text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">{about.title}</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              {about.subtitle}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="relative h-[400px] w-full">
                <SafeImage 
                  src={assets.heroBg} 
                  alt="About Us" 
                  fill
                  className="rounded-3xl shadow-xl object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-medium text-dark mb-6">Siapa Kami?</h2>
                <div className="text-dark/80 text-lg leading-relaxed mb-6 whitespace-pre-line">
                  {about.whoWeAre}
                </div>
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target size={32} />
                </div>
                <h3 className="text-xl font-bold text-dark mb-4">Visi Kami</h3>
                <p className="text-dark/70">
                  {about.vision}
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-bold text-dark mb-4">Misi Kami</h3>
                <p className="text-dark/70">
                  {about.mission}
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart size={32} />
                </div>
                <h3 className="text-xl font-bold text-dark mb-4">Nilai Kami</h3>
                <p className="text-dark/70">
                  {about.values}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
