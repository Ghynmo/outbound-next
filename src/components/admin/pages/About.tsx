import React, { useState, useEffect } from 'react';
import { useData } from '../../../context/DataContext';
import { Save, RefreshCw } from 'lucide-react';

const AdminAbout: React.FC = () => {
  const { about, updateAbout } = useData();
  const [formData, setFormData] = useState(about);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setFormData(about);
  }, [about]);

  const handleChange = (field: keyof typeof about, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSave = () => {
    updateAbout(formData);
    setIsDirty(false);
    alert('Perubahan berhasil disimpan!');
  };

  const handleReset = () => {
    setFormData(about);
    setIsDirty(false);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Edit Halaman Tentang Kami</h1>
          <p className="text-gray-500">Sesuaikan konten profil perusahaan</p>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={handleReset}
            disabled={!isDirty}
            className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              isDirty ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-50 text-gray-300 cursor-not-allowed'
            }`}
          >
            <RefreshCw size={18} />
            <span>Reset</span>
          </button>
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
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Informasi Umum</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Judul Halaman</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sub-Judul</label>
              <textarea 
                rows={2}
                value={formData.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Konten Utama</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Siapa Kami (Deskripsi Lengkap)</label>
              <textarea 
                rows={6}
                value={formData.whoWeAre}
                onChange={(e) => handleChange('whoWeAre', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Visi, Misi & Nilai</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Visi</label>
              <textarea 
                rows={3}
                value={formData.vision}
                onChange={(e) => handleChange('vision', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Misi</label>
              <textarea 
                rows={3}
                value={formData.mission}
                onChange={(e) => handleChange('mission', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nilai-Nilai</label>
              <textarea 
                rows={3}
                value={formData.values}
                onChange={(e) => handleChange('values', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;
