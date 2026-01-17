import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { getPackageImageSrc } from '../../../utils/imageHelper';
import type { Package } from '../../../data/initialData';
import { Plus, Edit, Trash2, X, Check, Search } from 'lucide-react';
import { assets } from '../../../assets/images';
import SafeImage from '../../ui/SafeImage';

const AdminPackages: React.FC = () => {
  const { packages, addPackage, updatePackage, deletePackage } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPackage, setCurrentPackage] = useState<Partial<Package>>({});

  const handleEdit = (pkg: Package) => {
    setCurrentPackage(pkg);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentPackage({
      id: `pkg-${Date.now()}`,
      title: '',
      price: '',
      unit: '/orang',
      image: assets.packageImg1, // Default image
      description: '',
      features: [],
      levels: [],
      duration: '',
      location: '',
      isActive: true,
      category: 'Edukasi'
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPackage.id && packages.some(p => p.id === currentPackage.id)) {
      updatePackage(currentPackage.id, currentPackage as Package);
    } else {
      addPackage(currentPackage as Package);
    }
    setIsEditing(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus paket ini?')) {
      deletePackage(id);
    }
  };

  const filteredPackages = packages.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isEditing) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {packages.find(p => p.id === currentPackage.id) ? 'Edit Paket' : 'Tambah Paket Baru'}
          </h2>
          <button 
            onClick={() => setIsEditing(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Paket</label>
              <input 
                type="text" 
                required
                value={currentPackage.title || ''}
                onChange={e => setCurrentPackage({...currentPackage, title: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <select 
                value={currentPackage.category || 'Edukasi'}
                onChange={e => setCurrentPackage({...currentPackage, category: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              >
                <option value="Edukasi">Edukasi</option>
                <option value="Camping">Camping</option>
                <option value="Gathering">Gathering</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Harga</label>
              <input 
                type="text" 
                required
                value={currentPackage.price || ''}
                onChange={e => setCurrentPackage({...currentPackage, price: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Satuan</label>
              <input 
                type="text" 
                value={currentPackage.unit || ''}
                onChange={e => setCurrentPackage({...currentPackage, unit: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Durasi</label>
              <input 
                type="text" 
                value={currentPackage.duration || ''}
                onChange={e => setCurrentPackage({...currentPackage, duration: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
              <input 
                type="text" 
                value={currentPackage.location || ''}
                onChange={e => setCurrentPackage({...currentPackage, location: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
            <textarea 
              rows={4}
              value={currentPackage.description || ''}
              onChange={e => setCurrentPackage({...currentPackage, description: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="radio" 
                  checked={currentPackage.isActive}
                  onChange={() => setCurrentPackage({...currentPackage, isActive: true})}
                  className="text-primary focus:ring-primary"
                />
                <span>Aktif</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="radio" 
                  checked={!currentPackage.isActive}
                  onChange={() => setCurrentPackage({...currentPackage, isActive: false})}
                  className="text-primary focus:ring-primary"
                />
                <span>Non-Aktif</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
            <button 
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              Batal
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark font-medium transition-colors flex items-center space-x-2"
            >
              <Check size={18} />
              <span>Simpan Paket</span>
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manajemen Paket</h1>
          <p className="text-gray-500">Kelola daftar paket outbound</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Tambah Paket</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Cari paket..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Info Paket</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Kategori</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Harga</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-12 h-12">
                        <SafeImage 
                          src={getPackageImageSrc(pkg.image)} 
                          alt={pkg.title} 
                          className="rounded-lg object-cover" 
                          fill
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{pkg.title}</p>
                        <p className="text-xs text-gray-500">{pkg.duration}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                      {pkg.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{pkg.price}</p>
                    <p className="text-xs text-gray-500">{pkg.unit}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      pkg.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {pkg.isActive ? 'Aktif' : 'Non-Aktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleEdit(pkg)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(pkg.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPackages;
