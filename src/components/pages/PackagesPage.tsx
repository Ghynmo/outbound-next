import React, { useState } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { useRouter } from 'next/navigation';
import { Check, Send, Clock, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';
import SafeImage from '../ui/SafeImage';

const PackagesPage: React.FC = () => {
  const { packages, contact } = useData();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: packages[0]?.id || '',
    date: '',
    participants: '',
    message: ''
  });

  const activePackages = packages.filter(p => p.isActive);

  const handleCardClick = (id: string) => {
    router.push(`/package/${id}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPackage = packages.find(p => p.id === formData.package);
    const packageName = selectedPackage ? selectedPackage.title : formData.package;
    
    const text = `Halo Admin Pelita Desa, saya ingin memesan paket outbound:\n\nNama: ${formData.name}\nPaket: ${packageName}\nTanggal: ${formData.date}\nJumlah Peserta: ${formData.participants}\nNo. HP: ${formData.phone}\nEmail: ${formData.email}\nPesan: ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${contact.phone[0]?.replace(/\D/g, '') || '628569005959'}?text=${encodedText}`, '_blank');
  };

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-12 lg:px-16 text-center">
            <h1 className="text-3xl md:text-5xl font-serif mb-4 pt-16 md:pt-0">Paket Outbound</h1>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
              Pilihan paket kegiatan edukatif dan rekreasi alam terbaik untuk sekolah, perusahaan, dan keluarga di Pelita Desa.
            </p>
          </div>
        </section>

        {/* Packages List */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
              {activePackages.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col hover:shadow-xl transition-shadow cursor-pointer group active:scale-[0.98] transition-transform duration-200"
                  onClick={() => handleCardClick(pkg.id)}
                >
                  <div className="relative h-56 md:h-64 overflow-hidden">
                    <SafeImage 
                      src={pkg.image} 
                      alt={pkg.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 right-4 bg-secondary text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
                      Terlaris
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <h3 className="text-xl md:text-2xl font-bold text-dark mb-2">{pkg.title}</h3>
                    <p className="text-dark/60 mb-6 text-sm leading-relaxed">{pkg.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-dark/70 text-sm">
                        <Clock className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center text-dark/70 text-sm">
                        <MapPin className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span>{pkg.location}</span>
                      </div>
                    </div>

                    <div className="mb-6 space-y-4">
                      {/* Games Section */}
                      <div>
                        <p className="text-sm font-bold text-dark/70 mb-2 flex items-center">
                          Games / Aktivitas
                        </p>
                        <ul className="space-y-1">
                          {pkg.games && pkg.games.slice(0, 5).map((game, idx) => (
                            <li key={`g-${idx}`} className="flex items-center text-dark/80 text-sm">
                              <Check className="w-3 h-3 text-orange-500 mr-2 flex-shrink-0" />
                              <span className="truncate">{game}</span>
                            </li>
                          ))}
                          {pkg.games && pkg.games.length > 5 && (
                            <li className="text-dark/50 text-xs italic ml-5">...</li>
                          )}
                        </ul>
                      </div>

                      {/* Facilities Section */}
                      <div>
                        <p className="text-sm font-bold text-dark/70 mb-2 flex items-center">
                          Fasilitas
                        </p>
                        <ul className="space-y-1">
                          {pkg.facilities && pkg.facilities.slice(0, 3).map((fac, idx) => (
                            <li key={`f-${idx}`} className="flex items-center text-dark/80 text-sm">
                              <Check className="w-3 h-3 text-blue-500 mr-2 flex-shrink-0" />
                              <span className="truncate">{fac}</span>
                            </li>
                          ))}
                          {pkg.facilities && pkg.facilities.length > 3 && (
                            <li className="text-dark/50 text-xs italic ml-5">...</li>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-xl md:text-2xl font-bold text-primary block">{pkg.price}</span>
                        <span className="text-dark/50 text-xs md:text-sm">{pkg.unit}</span>
                      </div>
                      <button className="bg-secondary text-primary px-5 py-2 md:px-6 md:py-2 rounded-full font-medium hover:bg-secondary-hover transition-colors text-sm md:text-base min-h-[44px] flex items-center">
                        Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Booking Form */}
            <div className="bg-gray-50 rounded-3xl p-6 md:p-12 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">Formulir Pemesanan</h2>
                  <p className="text-dark/70 mb-8 leading-relaxed text-sm md:text-base">
                    Silakan isi formulir di bawah ini untuk melakukan reservasi atau bertanya mengenai paket outbound. 
                    Tim kami akan segera menghubungi Anda melalui WhatsApp atau Email.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 text-dark/80">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold">Lokasi Kami</p>
                        <a 
                          href="https://maps.app.goo.gl/7WdvZZsW7mJ897hHA" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm hover:text-primary hover:underline transition-colors"
                        >
                          {contact.address}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-dark/80">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                        <Send className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold">Email</p>
                        <p className="text-sm">{contact.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm order-1 lg:order-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                    <div>
                      <label className="block text-sm font-bold text-dark mb-2">Nama Lengkap</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                        placeholder="Nama Anda"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-dark mb-2">No. WhatsApp</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                        placeholder="08..."
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                    <div>
                      <label className="block text-sm font-bold text-dark mb-2">Pilih Paket</label>
                      <select 
                        name="package"
                        value={formData.package}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                      >
                        {activePackages.map(pkg => (
                          <option key={pkg.id} value={pkg.id}>{pkg.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-dark mb-2">Tanggal Kegiatan</label>
                      <input 
                        type="date" 
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="mb-4 md:mb-6">
                    <label className="block text-sm font-bold text-dark mb-2">Jumlah Peserta (Perkiraan)</label>
                    <input 
                      type="number" 
                      name="participants"
                      required
                      value={formData.participants}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                      placeholder="Contoh: 50"
                    />
                  </div>

                  <div className="mb-6 md:mb-8">
                    <label className="block text-sm font-bold text-dark mb-2">Pesan Tambahan</label>
                    <textarea 
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                      placeholder="Tulis pertanyaan atau request khusus..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark transition flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-h-[56px]"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Kirim Pesan via WhatsApp
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PackagesPage;
