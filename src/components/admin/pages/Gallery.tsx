import React, { useState, useRef } from 'react';
import { useData } from '../../../context/DataContext';
import { getPackageImageSrc } from '../../../utils/imageHelper';
import type { GalleryItem } from '../../../data/initialData';
import { Upload, Trash2, GripVertical, Plus } from 'lucide-react';
import SafeImage from '../../ui/SafeImage';

const AdminGallery: React.FC = () => {
  const { gallery, addGalleryItem, deleteGalleryItem, reorderGallery } = useData();
  const [draggedItem, setDraggedItem] = useState<GalleryItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragStart = (item: GalleryItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent, targetItem: GalleryItem) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetItem.id) return;

    const newGallery = [...gallery];
    const draggedIndex = newGallery.findIndex(i => i.id === draggedItem.id);
    const targetIndex = newGallery.findIndex(i => i.id === targetItem.id);

    newGallery.splice(draggedIndex, 1);
    newGallery.splice(targetIndex, 0, draggedItem);

    reorderGallery(newGallery);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      
      for (const file of files) {
        try {
          // Convert to Base64 for local storage persistence
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });

          const newItem: GalleryItem = {
            id: crypto.randomUUID(),
            src: base64,
            title: file.name.split('.')[0],
            category: 'Baru'
          };
          
          await addGalleryItem(newItem);
        } catch (error) {
          console.error('Failed to upload/add item:', error);
          alert(`Failed to upload ${file.name}`);
        }
      }
      
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manajemen Galeri</h1>
          <p className="text-gray-500">Atur koleksi foto dan video</p>
        </div>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors flex items-center space-x-2"
        >
          <Upload size={20} />
          <span>Upload Media</span>
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          multiple 
          accept="image/*"
          onChange={handleFileUpload}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <div 
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item)}
              onDragOver={(e) => handleDragOver(e, item)}
              onDragEnd={handleDragEnd}
              className={`relative group bg-gray-50 rounded-xl overflow-hidden cursor-move border-2 transition-all ${
                draggedItem?.id === item.id ? 'border-primary opacity-50' : 'border-transparent hover:border-gray-200'
              }`}
            >
              <div className="aspect-square relative">
                <SafeImage 
                  src={getPackageImageSrc(item.src)} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <GripVertical className="text-white drop-shadow-lg" size={32} />
                </div>
                <button 
                  onClick={() => deleteGalleryItem(item.id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="Hapus"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-3">
                <p className="font-bold text-gray-800 text-sm truncate">{item.title}</p>
                <p className="text-xs text-gray-500">{item.category}</p>
              </div>
            </div>
          ))}
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all"
          >
            <Plus size={32} />
            <span className="text-sm font-medium mt-2">Tambah Foto</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;
