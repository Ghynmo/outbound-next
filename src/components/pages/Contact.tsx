import React, { useState } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useData } from '../../context/DataContext';

const Contact: React.FC = () => {
  const { contact } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Admin Pelita Desa, saya ingin bertanya:\n\nNama: ${formData.name}\nEmail: ${formData.email}\nNo. HP: ${formData.phone}\nPesan: ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${contact.phone[0]?.replace(/\D/g, '') || '6285732466895'}?text=${encodedText}`, '_blank');
  };

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 md:px-12 lg:px-16 text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Hubungi Kami</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Punya pertanyaan atau ingin reservasi? Tim kami siap membantu Anda.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-medium text-dark mb-8">Informasi Kontak</h2>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/10 p-3 rounded-full text-primary">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-dark mb-2">Alamat</h3>
                      <p className="text-dark/70 whitespace-pre-line">
                        {contact.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/10 p-3 rounded-full text-primary">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-dark mb-2">Telepon / WhatsApp</h3>
                      {contact.phone.map((p, i) => (
                        <p key={i} className="text-dark/70">{p}</p>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/10 p-3 rounded-full text-primary">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-dark mb-2">Email</h3>
                      <p className="text-dark/70">{contact.email}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 h-64 rounded-2xl overflow-hidden shadow-lg bg-gray-100 relative">
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

              {/* Form */}
              <div className="bg-gray-50 p-8 md:p-10 rounded-3xl shadow-sm">
                <h2 className="text-2xl font-bold text-dark mb-6">Kirim Pesan</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-dark font-medium mb-2">Nama Lengkap</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                      placeholder="Masukkan nama Anda"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-dark font-medium mb-2">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                        placeholder="email@contoh.com"
                      />
                    </div>
                    <div>
                      <label className="block text-dark font-medium mb-2">No. Telepon</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                        placeholder="0812..."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-dark font-medium mb-2">Pesan</label>
                    <textarea 
                      rows={5}
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                      placeholder="Tulis pesan Anda di sini..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark transition flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Kirim Pesan
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

export default Contact;
