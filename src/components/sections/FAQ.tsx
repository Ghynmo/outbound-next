import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, MapPin } from 'lucide-react';

const faqs = [
  { question: 'Apakah ada minimal jumlah peserta?', answer: 'Ya, minimal pemesanan untuk paket outbound adalah 30 peserta.' },
  { question: 'Apakah bisa refund jika batal?', answer: 'Kebijakan refund berlaku sesuai dengan syarat dan ketentuan yang disepakati saat booking (biasanya H-7).' },
  { question: 'Apakah menyediakan transportasi?', answer: 'Kami tidak menyediakan transportasi, namun kami memiliki area parkir yang luas untuk bus besar.' },
  { question: 'Apakah makanan halal?', answer: 'Tentu saja, semua menu makanan yang kami sajikan dijamin 100% Halal dan higienis.' },
  { question: 'Bagaimana jika hujan?', answer: 'Kami memiliki aula semi-outdoor yang besar (Pendopo) sehingga kegiatan tetap bisa berlangsung dengan nyaman.' },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-20 bg-white" id="faq">
      <div className="container mx-auto px-4 md:px-12 lg:px-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-dark mb-4">Orang-orang sering menanyakan ini</h2>
          <p className="text-base md:text-lg text-dark/70">Jawaban untuk pertanyaan umum seputar Pelita Desa Outbound.</p>
        </div>

        <div className="max-w-3xl mx-auto mb-16 md:mb-20">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border border-gray-100 rounded-lg overflow-hidden">
              <button
                className={`w-full flex items-center justify-between p-4 md:p-6 text-left transition-colors min-h-[60px] ${
                  openIndex === index ? 'bg-[#f9f9f9]' : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg md:text-xl font-medium text-dark pr-4">{faq.question}</span>
                {openIndex === index ? <ChevronUp className="text-dark flex-shrink-0" /> : <ChevronDown className="text-dark flex-shrink-0" />}
              </button>
              {openIndex === index && (
                <div className="p-4 md:p-6 bg-[#f9f9f9] text-dark/70 border-t border-gray-100 text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
           {/* Card 1 - Survey */}
           <div className="bg-[#f9f9f9] rounded-2xl p-6 md:p-12 flex items-center justify-between relative overflow-hidden group hover:shadow-md transition-all min-h-[250px]">
              <div className="relative z-10 w-full md:w-auto">
                 <h3 className="text-2xl md:text-3xl font-medium text-dark mb-4 md:mb-6">Mau survey dulu?<br/>Ini lokasinya</h3>
                 <p className="text-dark/70 mb-6 md:mb-8 max-w-xs text-sm md:text-base">Datang langsung untuk melihat fasilitas dan area outbound kami.</p>
                 <a 
                   href="https://maps.app.goo.gl/7WdvZZsW7mJ897hHA" 
                   target="_blank" 
                   rel="noreferrer"
                   className="bg-primary text-white px-6 py-3 md:px-8 md:py-3 rounded-xl font-medium hover:bg-primary-dark transition flex items-center w-fit min-h-[48px]"
                 >
                    Lihat di Maps
                    <MapPin className="w-4 h-4 ml-2" />
                 </a>
              </div>
              <div className="absolute right-0 bottom-0 w-32 h-32 md:w-48 md:h-48 flex items-end justify-end opacity-80 group-hover:scale-105 transition-transform duration-300 pointer-events-none">
                  <MapPin className="w-full h-full text-primary/10 -mb-6 -mr-6 md:-mb-8 md:-mr-8" />
              </div>
           </div>

           {/* Card 2 - Contact */}
           <div className="bg-[#fff8f6] rounded-2xl p-6 md:p-12 flex items-center justify-between relative overflow-hidden group hover:shadow-md transition-all min-h-[250px]">
              <div className="relative z-10 w-full md:w-auto">
                 <h3 className="text-2xl md:text-3xl font-medium text-dark mb-4 md:mb-6">Masih bingung?<br/>Langsung tanya aja</h3>
                 <p className="text-dark/70 mb-6 md:mb-8 max-w-xs text-sm md:text-base">Tim marketing kami siap membantu menjawab semua pertanyaan Anda.</p>
                 <a 
                   href="https://wa.me/628569005959"
                   target="_blank" 
                   rel="noreferrer"
                   className="bg-primary text-white px-6 py-3 md:px-8 md:py-3 rounded-xl font-medium hover:bg-primary-dark transition flex items-center w-fit min-h-[48px]"
                 >
                    Chat WhatsApp
                    <MessageCircle className="w-4 h-4 ml-2" />
                 </a>
              </div>
              <div className="absolute right-0 bottom-0 w-32 h-32 md:w-48 md:h-48 flex items-end justify-end opacity-80 group-hover:scale-105 transition-transform duration-300 pointer-events-none">
                  <MessageCircle className="w-full h-full text-secondary/20 -mb-6 -mr-6 md:-mb-8 md:-mr-8" />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
