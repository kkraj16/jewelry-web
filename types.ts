export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  featured: boolean;
  inStock: boolean;
  discount: number;
}

export enum Category {
  Gold = 'Gold',
  Silver = 'Silver',
  Diamond = 'Diamond',
  Artificial = 'Artificial'
}

export interface GoldRates {
  gold24k: number;
  gold22k: number;
  silver: number;
  lastUpdated: string;
}

// CMS Content Types
export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  ctaUrl: string;
  enabled: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryContent {
  id: string;
  name: string;
  imageUrl: string;
  enabled: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface TrendingProduct {
  productId: string;
  displayOrder: number;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AboutContent {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  bulletPoints: string[];
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactContent {
  id: string;
  address: string;
  email: string;
  phone: string;
  whatsapp: string;
  workingHours: string;
  mapEmbedUrl: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  name: string;
  comment: string;
  rating: number; // 1-5 stars
  customerType: string; // "Customer", "Loyal Customer", etc.
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CMSContent {
  banners: Banner[];
  categories: CategoryContent[];
  trendingProducts: TrendingProduct[];
  aboutContent: AboutContent | null;
  contactContent: ContactContent | null;
  reviews: Review[];
}