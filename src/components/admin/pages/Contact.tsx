import React, { useState, useEffect } from 'react';
import { useData } from '../../../context/DataContext';
import { Save, Plus, Trash2 } from 'lucide-react';

const AdminContact: React.FC = () => {
  const { contact, updateContact } = useData();
  const [formData, setFormData] = useState(contact);
  const [isDirty, setIsDirty] = useState(false);
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    setFormData(contact);
  }, [contact]);

  const handleChange = (field: keyof typeof contact, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handlePhoneAdd = () => {
    if (newPhone) {
      setFormData(prev => ({
        ...prev,
        phone: [...prev.phone, newPhone]
      }));
      setNewPhone('');
      setIsDirty(true);
    }
  };

  const handlePhoneRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      phone: prev.phone.filter((_, i) => i !== index)
    }));
    setIsDirty(true);
  };

  const handleSave = () => {
    updateContact(formData);
    setIsDirty(false);
    alert('Kontak berhasil diperbarui!');
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manajemen Kontak</h1>
          <p className="text-gray-500">Update informasi kontak dan lokasi</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={!isDirty}
          className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
            isDirty ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-primary/50 text-white cursor-not-allowed'
          }`}
        >
          <Save size={18} />
          <span>Simpan Perubahan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Kontak Utama</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon / WhatsApp</label>
            <div className="space-y-3 mb-3">
              {formData.phone.map((phone, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    value={phone}
                    readOnly
                    className="flex-1 px-4 py-2 border rounded-lg bg-gray-50"
                  />
                  <button 
                    onClick={() => handlePhoneRemove(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <input 
                type="text" 
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="Tambah nomor baru..."
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              />
              <button 
                onClick={handlePhoneAdd}
                className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
            <textarea 
              rows={4}
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Media Sosial</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
              <input 
                type="text" 
                value={formData.instagram}
                onChange={(e) => handleChange('instagram', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
              <input 
                type="text" 
                value={formData.facebook}
                onChange={(e) => handleChange('facebook', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL</label>
              <input 
                type="text" 
                value={formData.youtube}
                onChange={(e) => handleChange('youtube', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Google Maps Embed</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Embed URL</label>
              <input 
                type="text" 
                value={formData.mapsUrl}
                onChange={(e) => handleChange('mapsUrl', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              />
              <p className="text-xs text-gray-500 mt-2">Paste link src dari iframe Google Maps</p>
            </div>
            <div className="h-48 rounded-xl overflow-hidden bg-gray-100 relative">
               <iframe 
                src={
                  formData.mapsUrl && formData.mapsUrl.includes('AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8') 
                    ? formData.mapsUrl.replace('AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '')
                    : formData.mapsUrl
                }
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Map Preview"
                className="relative z-10"
              ></iframe>
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-0">
                  <span className="text-gray-400 text-xs">Preview Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContact;
