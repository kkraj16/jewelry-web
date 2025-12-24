import { 
  Banner, 
  CategoryContent, 
  TrendingProduct, 
  AboutContent, 
  ContactContent, 
  CMSContent,
  Review
} from '../types';

// In-memory storage for CMS content (in production, this would be a database)
let cmsContent: CMSContent = {
  banners: [
    {
      id: 'banner-1',
      title: 'Timeless Beauty, Crafted for You',
      subtitle: 'Experience the finest collection of Hallmark Gold, Diamond & Polki Jadau Jewellery in Pali.',
      imageUrl: 'https://images.unsplash.com/photo-1602751584552-8ba43dcb13be?q=80&w=2000&auto=format&fit=crop',
      ctaText: 'Explore Collection',
      ctaUrl: '/products',
      enabled: true,
      displayOrder: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  categories: [
    {
      id: 'cat-1',
      name: 'Gold Jewellery',
      imageUrl: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800',
      enabled: true,
      displayOrder: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'cat-2',
      name: 'Silver Artifacts',
      imageUrl: 'https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?q=80&w=800',
      enabled: true,
      displayOrder: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'cat-3',
      name: 'Bridal Sets',
      imageUrl: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=800',
      enabled: true,
      displayOrder: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  trendingProducts: [
    { productId: '1', displayOrder: 1, enabled: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { productId: '2', displayOrder: 2, enabled: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { productId: '3', displayOrder: 3, enabled: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { productId: '4', displayOrder: 4, enabled: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  ],
  aboutContent: {
    id: 'about-1',
    title: 'Our Story',
    description: 'For over 30 years, Ratannam Gold has been crafting timeless jewelry pieces that celebrate life\'s most precious moments.',
    imageUrl: 'https://images.unsplash.com/photo-1581044777552-2176120200c3?q=80&w=800&auto=format&fit=crop',
    bulletPoints: [
      'Quality Craftsmanship',
      'Trusted Legacy',
      'Timeless Designs'
    ],
    enabled: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  contactContent: {
    id: 'contact-1',
    address: '123 Jewelry Street, Pali, Rajasthan 306401',
    email: 'info@ratannamgold.com',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    workingHours: 'Monday - Saturday: 10:00 AM - 8:00 PM\nSunday: 11:00 AM - 6:00 PM',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3567.234567890123!2d73.3398456!3d25.7678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f17568e55e555%3A0x8e6a0c8f0c0f0c0f!2sPali%2C%20Rajasthan%2C%20India!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin',
    enabled: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  reviews: [
    {
      id: 'review-1',
      name: 'Priya Sharma',
      comment: 'The quality of gold and the intricacy of design at Ratannam is unmatched in Pali. Truly a luxury experience.',
      rating: 5,
      customerType: 'Loyal Customer',
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
};

export const cmsService = {
  // Banner Management
  getBanners: (): Banner[] => {
    return cmsContent.banners.filter(banner => banner.enabled).sort((a, b) => a.displayOrder - b.displayOrder);
  },

  getBanner: (id: string): Banner | undefined => {
    return cmsContent.banners.find(banner => banner.id === id);
  },

  addBanner: (banner: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>): Banner => {
    const newBanner: Banner = {
      ...banner,
      id: `banner-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    cmsContent.banners.push(newBanner);
    return newBanner;
  },

  updateBanner: (id: string, updates: Partial<Banner>): Banner | null => {
    const index = cmsContent.banners.findIndex(banner => banner.id === id);
    if (index !== -1) {
      cmsContent.banners[index] = {
        ...cmsContent.banners[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      return cmsContent.banners[index];
    }
    return null;
  },

  deleteBanner: (id: string): boolean => {
    const initialLength = cmsContent.banners.length;
    cmsContent.banners = cmsContent.banners.filter(banner => banner.id !== id);
    return cmsContent.banners.length !== initialLength;
  },

  // Category Management
  getCategories: (): CategoryContent[] => {
    return cmsContent.categories.filter(cat => cat.enabled).sort((a, b) => a.displayOrder - b.displayOrder);
  },

  getCategory: (id: string): CategoryContent | undefined => {
    return cmsContent.categories.find(cat => cat.id === id);
  },

  addCategory: (category: Omit<CategoryContent, 'id' | 'createdAt' | 'updatedAt'>): CategoryContent => {
    const newCategory: CategoryContent = {
      ...category,
      id: `cat-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    cmsContent.categories.push(newCategory);
    return newCategory;
  },

  updateCategory: (id: string, updates: Partial<CategoryContent>): CategoryContent | null => {
    const index = cmsContent.categories.findIndex(cat => cat.id === id);
    if (index !== -1) {
      cmsContent.categories[index] = {
        ...cmsContent.categories[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      return cmsContent.categories[index];
    }
    return null;
  },

  deleteCategory: (id: string): boolean => {
    const initialLength = cmsContent.categories.length;
    cmsContent.categories = cmsContent.categories.filter(cat => cat.id !== id);
    return cmsContent.categories.length !== initialLength;
  },

  // Trending Products Management
  getTrendingProducts: (): TrendingProduct[] => {
    return cmsContent.trendingProducts.filter(tp => tp.enabled).sort((a, b) => a.displayOrder - b.displayOrder);
  },

  addTrendingProduct: (productId: string): TrendingProduct => {
    const existing = cmsContent.trendingProducts.find(tp => tp.productId === productId);
    if (existing) {
      // Update existing
      existing.enabled = true;
      existing.updatedAt = new Date().toISOString();
      return existing;
    }
    
    const newTrending: TrendingProduct = {
      productId,
      displayOrder: cmsContent.trendingProducts.length + 1,
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    cmsContent.trendingProducts.push(newTrending);
    return newTrending;
  },

  updateTrendingProduct: (productId: string, updates: Partial<TrendingProduct>): TrendingProduct | null => {
    const index = cmsContent.trendingProducts.findIndex(tp => tp.productId === productId);
    if (index !== -1) {
      cmsContent.trendingProducts[index] = {
        ...cmsContent.trendingProducts[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      return cmsContent.trendingProducts[index];
    }
    return null;
  },

  removeTrendingProduct: (productId: string): boolean => {
    const initialLength = cmsContent.trendingProducts.length;
    cmsContent.trendingProducts = cmsContent.trendingProducts.filter(tp => tp.productId !== productId);
    return cmsContent.trendingProducts.length !== initialLength;
  },

  // About Content Management
  getAboutContent: (): AboutContent | null => {
    return cmsContent.aboutContent && cmsContent.aboutContent.enabled ? cmsContent.aboutContent : null;
  },

  updateAboutContent: (updates: Partial<AboutContent>): AboutContent | null => {
    if (!cmsContent.aboutContent) {
      cmsContent.aboutContent = {
        id: 'about-1',
        title: 'About Us',
        description: '',
        imageUrl: '',
        bulletPoints: [],
        enabled: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    
    cmsContent.aboutContent = {
      ...cmsContent.aboutContent,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    return cmsContent.aboutContent;
  },

  // Contact Content Management
  getContactContent: (): ContactContent | null => {
    return cmsContent.contactContent && cmsContent.contactContent.enabled ? cmsContent.contactContent : null;
  },

  updateContactContent: (updates: Partial<ContactContent>): ContactContent | null => {
    if (!cmsContent.contactContent) {
      cmsContent.contactContent = {
        id: 'contact-1',
        address: '',
        email: '',
        phone: '',
        whatsapp: '',
        workingHours: '',
        mapEmbedUrl: '',
        enabled: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    
    cmsContent.contactContent = {
      ...cmsContent.contactContent,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    return cmsContent.contactContent;
  },

  // Review Management
  getReviews: (): Review[] => {
    return cmsContent.reviews.filter(review => review.enabled);
  },

  getReview: (id: string): Review | undefined => {
    return cmsContent.reviews.find(review => review.id === id);
  },

  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Review => {
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    cmsContent.reviews.push(newReview);
    return newReview;
  },

  updateReview: (id: string, updates: Partial<Review>): Review | null => {
    const index = cmsContent.reviews.findIndex(review => review.id === id);
    if (index !== -1) {
      cmsContent.reviews[index] = {
        ...cmsContent.reviews[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      return cmsContent.reviews[index];
    }
    return null;
  },

  deleteReview: (id: string): boolean => {
    const initialLength = cmsContent.reviews.length;
    cmsContent.reviews = cmsContent.reviews.filter(review => review.id !== id);
    return cmsContent.reviews.length !== initialLength;
  },

  // Get all CMS content
  getAllContent: (): CMSContent => {
    return cmsContent;
  }
};