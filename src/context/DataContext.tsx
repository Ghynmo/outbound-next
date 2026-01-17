"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { 
  initialPackages, initialReviews, initialGallery, initialAbout, initialContact
} from '../data/initialData';
import type { 
  Package, Review, GalleryItem, AboutContent, ContactInfo 
} from '../data/initialData';
import { storageService } from '../services/storage';

interface DataContextType {
  packages: Package[];
  reviews: Review[];
  gallery: GalleryItem[];
  about: AboutContent;
  contact: ContactInfo;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  // Admin methods
  addPackage: (pkg: Package) => Promise<void>;
  updatePackage: (id: string, pkg: Partial<Package>) => Promise<void>;
  deletePackage: (id: string) => Promise<void>;
  updateAbout: (data: AboutContent) => void;
  updateContact: (data: ContactInfo) => void;
  // Gallery methods
  addGalleryItem: (item: GalleryItem) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  reorderGallery: (items: GalleryItem[]) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const AUTH_KEY = 'outbound_admin_auth';

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<Package[]>(initialPackages);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [about, setAbout] = useState<AboutContent>(initialAbout);
  const [contact, setContact] = useState<ContactInfo>(initialContact);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load all data from storage service
    const loadedPackages = storageService.getPackages();
    const loadedReviews = storageService.getReviews();
    const loadedGallery = storageService.getGallery();
    const loadedAbout = storageService.getAbout();
    const loadedContact = storageService.getContact();

    setPackages(loadedPackages);
    setReviews(loadedReviews);
    setGallery(loadedGallery);
    setAbout(loadedAbout);
    setContact(loadedContact);
    
    // Auth check
    if (typeof window !== 'undefined') {
      const authSaved = localStorage.getItem(AUTH_KEY);
      if (authSaved === 'true') {
        setIsAuthenticated(true);
      }
    }
    
    setIsInitialized(true);
  }, []);

  const login = (password: string) => {
    // Hardcoded password for demo purposes
    if (password === 'admin123') {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem(AUTH_KEY, 'true');
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_KEY);
    }
  };

  // Data Methods
  const addPackage = async (pkg: Package) => {
    const newPackages = [...packages, pkg];
    setPackages(newPackages);
    storageService.savePackages(newPackages);
  };

  const updatePackage = async (id: string, pkg: Partial<Package>) => {
    const newPackages = packages.map(p => p.id === id ? { ...p, ...pkg } : p);
    setPackages(newPackages);
    storageService.savePackages(newPackages);
  };

  const deletePackage = async (id: string) => {
    const newPackages = packages.filter(p => p.id !== id);
    setPackages(newPackages);
    storageService.savePackages(newPackages);
  };

  const updateAbout = (data: AboutContent) => {
    setAbout(data);
    storageService.saveAbout(data);
  };

  const updateContact = (data: ContactInfo) => {
    setContact(data);
    storageService.saveContact(data);
  };

  const addGalleryItem = async (item: GalleryItem) => {
    const newGallery = [item, ...gallery];
    setGallery(newGallery);
    storageService.saveGallery(newGallery);
  };

  const deleteGalleryItem = async (id: string) => {
    const newGallery = gallery.filter(g => g.id !== id);
    setGallery(newGallery);
    storageService.saveGallery(newGallery);
  };

  const reorderGallery = (items: GalleryItem[]) => {
    setGallery(items);
    storageService.saveGallery(items);
  };

  return (
    <DataContext.Provider value={{
      packages,
      reviews,
      gallery,
      about,
      contact,
      isAuthenticated,
      login,
      logout,
      addPackage,
      updatePackage,
      deletePackage,
      updateAbout,
      updateContact,
      addGalleryItem,
      deleteGalleryItem,
      reorderGallery
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
