
import { 
  initialPackages, 
  initialReviews, 
  initialGallery,
  initialAbout,
  initialContact,
  Package, 
  Review,
  GalleryItem,
  AboutContent,
  ContactInfo
} from '../data/initialData';

const STORAGE_KEYS = {
  PACKAGES: 'outbound_packages_v6',
  REVIEWS: 'outbound_reviews_v2',
  GALLERY: 'outbound_gallery_v3',
  ABOUT: 'outbound_about_v2',
  CONTACT: 'outbound_contact_v3',
};

class StorageService {
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = typeof window !== 'undefined';
  }

  // Packages
  getPackages(): Package[] {
    if (!this.isBrowser) return initialPackages;

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PACKAGES);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load packages from localStorage', e);
    }

    this.savePackages(initialPackages);
    return initialPackages;
  }

  savePackages(packages: Package[]): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
    } catch (e) {
      console.error('Failed to save packages to localStorage', e);
    }
  }

  // Reviews
  getReviews(): Review[] {
    if (!this.isBrowser) return initialReviews;

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load reviews from localStorage', e);
    }

    this.saveReviews(initialReviews);
    return initialReviews;
  }

  saveReviews(reviews: Review[]): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to save reviews to localStorage', e);
    }
  }

  // Gallery
  getGallery(): GalleryItem[] {
    if (!this.isBrowser) return initialGallery;

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.GALLERY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load gallery from localStorage', e);
    }

    this.saveGallery(initialGallery);
    return initialGallery;
  }

  saveGallery(gallery: GalleryItem[]): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
    } catch (e) {
      console.error('Failed to save gallery to localStorage', e);
    }
  }

  // About
  getAbout(): AboutContent {
    if (!this.isBrowser) return initialAbout;

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ABOUT);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load about from localStorage', e);
    }

    this.saveAbout(initialAbout);
    return initialAbout;
  }

  saveAbout(about: AboutContent): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(about));
    } catch (e) {
      console.error('Failed to save about to localStorage', e);
    }
  }

  // Contact
  getContact(): ContactInfo {
    if (!this.isBrowser) return initialContact;

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONTACT);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load contact from localStorage', e);
    }

    this.saveContact(initialContact);
    return initialContact;
  }

  saveContact(contact: ContactInfo): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(contact));
    } catch (e) {
      console.error('Failed to save contact to localStorage', e);
    }
  }

  clearAll(): void {
    if (!this.isBrowser) return;
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
}

export const storageService = new StorageService();
