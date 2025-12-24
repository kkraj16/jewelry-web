import { Product, GoldRates, Banner, CategoryContent, TrendingProduct, AboutContent, ContactContent, Review, Category } from '../types';
import { INITIAL_RATES } from '../constants';
import { cmsService } from './cmsService';

// Simulate localStorage for products
const PRODUCTS_KEY = 'ratannam_products';
const RATES_KEY = 'ratannam_rates';

// Initialize with sample data if not exists
if (!localStorage.getItem(PRODUCTS_KEY)) {
  const sampleProducts: Product[] = [
    { id: '1', name: 'Gold Necklace', description: 'Beautiful gold necklace', price: 50000, category: Category.Gold, image: 'https://images.unsplash.com/photo-1602745587407-68946c0fa3d7?w=400&h=500&fit=crop', featured: true, inStock: true, discount: 5 },
    { id: '2', name: 'Silver Bangles', description: 'Elegant silver bangles', price: 8000, category: Category.Silver, image: 'https://images.unsplash.com/photo-1618508782591-9e82d593e010?w=400&h=500&fit=crop', featured: true, inStock: true, discount: 10 },
    { id: '3', name: 'Diamond Ring', description: 'Sparkling diamond ring', price: 120000, category: Category.Diamond, image: 'https://images.unsplash.com/photo-1531078700948-d82e3e0c09d2?w=400&h=500&fit=crop', featured: true, inStock: false, discount: 0 },
    { id: '4', name: 'Artificial Earrings', description: 'Designer artificial earrings', price: 1500, category: Category.Artificial, image: 'https://images.unsplash.com/photo-1611854786443-9b7bc934e4a2?w=400&h=500&fit=crop', featured: true, inStock: true, discount: 15 },
    { id: '5', name: 'Gold Bracelet', description: 'Classic gold bracelet', price: 35000, category: Category.Gold, image: 'https://images.unsplash.com/photo-1611854786443-9b7bc934e4a2?w=400&h=500&fit=crop', featured: false, inStock: true, discount: 8 },
    { id: '6', name: 'Silver Chain', description: 'Traditional silver chain', price: 12000, category: Category.Silver, image: 'https://images.unsplash.com/photo-1618508782591-9e82d593e010?w=400&h=500&fit=crop', featured: false, inStock: true, discount: 0 },
    { id: '7', name: 'Pearl Necklace', description: 'Elegant pearl necklace', price: 25000, category: Category.Diamond, image: 'https://images.unsplash.com/photo-1531078700948-d82e3e0c09d2?w=400&h=500&fit=crop', featured: false, inStock: false, discount: 12 },
    { id: '8', name: 'Gold Studs', description: 'Simple gold studs', price: 8000, category: Category.Gold, image: 'https://images.unsplash.com/photo-1602745587407-68946c0fa3d7?w=400&h=500&fit=crop', featured: false, inStock: true, discount: 0 }
  ];
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(sampleProducts));
}

export const api = {
  // Product API
  getProducts: (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = localStorage.getItem(PRODUCTS_KEY);
        resolve(products ? JSON.parse(products) : []);
      }, 500); // Simulate network delay
    });
  },

  getProduct: (id: string): Promise<Product | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = localStorage.getItem(PRODUCTS_KEY);
        const productList = products ? JSON.parse(products) : [];
        resolve(productList.find((p: Product) => p.id === id));
      }, 300);
    });
  },

  addProduct: (product: Omit<Product, 'id'>): Promise<Product> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = localStorage.getItem(PRODUCTS_KEY);
        const productList = products ? JSON.parse(products) : [];
        const newProduct = { ...product, id: Date.now().toString() };
        productList.push(newProduct);
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(productList));
        resolve(newProduct);
      }, 500);
    });
  },

  updateProduct: (id: string, updates: Partial<Product>): Promise<Product | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = localStorage.getItem(PRODUCTS_KEY);
        const productList = products ? JSON.parse(products) : [];
        const index = productList.findIndex((p: Product) => p.id === id);
        if (index !== -1) {
          productList[index] = { ...productList[index], ...updates };
          localStorage.setItem(PRODUCTS_KEY, JSON.stringify(productList));
          resolve(productList[index]);
        } else {
          resolve(null);
        }
      }, 500);
    });
  },

  deleteProduct: (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = localStorage.getItem(PRODUCTS_KEY);
        const productList = products ? JSON.parse(products) : [];
        const initialLength = productList.length;
        const filteredProducts = productList.filter((p: Product) => p.id !== id);
        if (filteredProducts.length !== initialLength) {
          localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filteredProducts));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  },

  // Rates API
  getRates: (): Promise<GoldRates> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const rates = localStorage.getItem(RATES_KEY);
        resolve(rates ? JSON.parse(rates) : INITIAL_RATES);
      }, 300);
    });
  },

  updateRates: (rates: GoldRates): Promise<GoldRates> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(RATES_KEY, JSON.stringify(rates));
        resolve(rates);
      }, 300);
    });
  },

  // CMS Content API
  getBanners: (): Promise<Banner[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cmsService.getBanners());
      }, 300);
    });
  },

  addBanner: (banner: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>): Promise<Banner> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cmsService.addBanner(banner));
      }, 300);
    });
  },

  updateBanner: (id: string, updates: Partial<Banner>): Promise<Banner | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cmsService.updateBanner(id, updates));
      }, 300);
    });
  },

  deleteBanner: (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cmsService.deleteBanner(id));
      }, 300);
    });
  },

  getCategories: (): Promise<CategoryContent[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cmsService.getCategories());
      }, 300);
    });
  },

  addCategory: (category: Omit<CategoryContent, 'id' | 'createdAt' | 'updatedAt'>): Promise<CategoryContent> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cmsService.addCategory(category));
      }, 300);
    });
  },

  updateCategory: (id: string, updates: Partial<CategoryContent>): Promise<CategoryContent | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cmsService.updateCategory(id, updates));
      }, 300);
    });
  },

  deleteCategory: (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cmsService.deleteCategory(id));
      }, 300);
    });
  },

  getTrendingProducts: (): Promise<TrendingProduct[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cmsService.getTrendingProducts());
      }, 300);
    });
  },

  addTrendingProduct: (productId: string): Promise<TrendingProduct> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cmsService.addTrendingProduct(productId));
      }, 300);
    });
  },

  updateTrendingProduct: (productId: string, updates: Partial<TrendingProduct>): Promise<TrendingProduct | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cmsService.updateTrendingProduct(productId, updates));
      }, 300);
    });
  },

  removeTrendingProduct: (productId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cmsService.removeTrendingProduct(productId));
      }, 300);
    });
  },

  getAboutContent: (): Promise<AboutContent | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cmsService.getAboutContent());
      }, 300);
    });
  },

  updateAboutContent: (updates: Partial<AboutContent>): Promise<AboutContent | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cmsService.updateAboutContent(updates));
      }, 300);
    });
  },

  getContactContent: (): Promise<ContactContent | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cmsService.getContactContent());
      }, 300);
    });
  },

  updateContactContent: (updates: Partial<ContactContent>): Promise<ContactContent | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cmsService.updateContactContent(updates));
      }, 300);
    });
  },

  getReviews: (): Promise<Review[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cmsService.getReviews());
      }, 300);
    });
  },

  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Promise<Review> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cmsService.addReview(review));
      }, 300);
    });
  },

  updateReview: (id: string, updates: Partial<Review>): Promise<Review | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cmsService.updateReview(id, updates));
      }, 300);
    });
  },

  deleteReview: (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cmsService.deleteReview(id));
      }, 300);
    });
  }
};