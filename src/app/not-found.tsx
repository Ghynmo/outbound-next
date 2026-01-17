import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-lg">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-lg text-dark/70 mb-8">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
          Mari kembali ke halaman utama untuk melihat aktivitas seru lainnya.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg"
        >
          <ArrowLeft className="mr-2" size={20} />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
