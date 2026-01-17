import React from 'react';
import { assets } from '../../assets/images';
import { Facebook, Instagram, Youtube, MessageCircle, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useData } from '../../context/DataContext';

const Footer: React.FC = () => {
  const { contact } = useData();

  return (
    <footer className="bg-primary text-white pt-10 md:pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row justify-between pb-8 border-b border-white/10">
          {/* Logo & Social */}
          <div className="mb-10 lg:mb-0">
            <Image 
              src={assets.pelitaDesaLogo} 
              alt="Pelita Desa Logo" 
              className="h-12 md:h-16 mb-6 md:mb-8 object-contain" 
              width={200}
              height={64}
            />
            <p className="text-lg font-medium mb-4">Follow Us</p>
            <div className="flex space-x-4">
               <a 
                 href={contact.facebook} 
                 target="_blank" 
                 rel="noreferrer"
                 className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300 min-h-[48px] min-w-[48px]"
                 aria-label="Facebook"
               >
                  <Facebook size={24} />
               </a>
               <a 
                 href={contact.instagram} 
                 target="_blank" 
                 rel="noreferrer"
                 className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300 min-h-[48px] min-w-[48px]"
                 aria-label="Instagram"
               >
                  <Instagram size={24} />
               </a>
               <a 
                 href={contact.youtube} 
                 target="_blank" 
                 rel="noreferrer"
                 className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300 min-h-[48px] min-w-[48px]"
                 aria-label="YouTube"
               >
                  <Youtube size={24} />
               </a>
            </div>
          </div>

          {/* Links & Form */}
          <div className="flex-1 lg:ml-20">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <div>
                   <h3 className="text-xl font-medium mb-6 text-white/60">Tautan Cepat</h3>
                   <ul className="space-y-3 text-white/80">
                      <li><Link href="/about" className="hover:text-secondary transition-colors py-1 block">Tentang Kami</Link></li>
                      <li><Link href="/packages" className="hover:text-secondary transition-colors py-1 block">Paket Outbound</Link></li>
                      <li><Link href="/gallery" className="hover:text-secondary transition-colors py-1 block">Galeri</Link></li>
                      <li><Link href="/contact" className="hover:text-secondary transition-colors py-1 block">Kontak</Link></li>
                   </ul>
                </div>
                <div>
                    <h3 className="text-xl font-medium mb-6 text-white/60">Hubungi Kami</h3>
                    <ul className="space-y-3 text-white/80">
                      <li className="py-1">{contact.email}</li>
                      {contact.phone.map((p, i) => (
                        <li key={i} className="py-1">{p}</li>
                      ))}
                    </ul>
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                   <h3 className="text-xl font-medium mb-6 text-white/60">Alamat Kami</h3>
                   <p className="text-white/80 leading-relaxed max-w-md">{contact.address}</p>
                   <div className="mt-6 rounded-xl overflow-hidden shadow-lg border border-white/10 w-full h-[250px] md:h-[300px] relative">
                     <iframe 
                       src="https://maps.google.com/maps?q=Pelita+Desa+Ciseeng&t=&z=13&ie=UTF8&iwloc=&output=embed"
                       width="100%" 
                       height="100%" 
                       style={{ border: 0 }} 
                       allowFullScreen 
                       loading="lazy" 
                       referrerPolicy="no-referrer-when-downgrade"
                       title="Lokasi Pelita Desa"
                     ></iframe>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
           <p className="text-white/60 text-sm text-center md:text-left">Copyright © 2025. Outbound Pelita Desa</p>
           <button 
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             className="w-12 h-12 bg-[#222121] rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300 min-h-[48px] min-w-[48px]"
             aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
           </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
