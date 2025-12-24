'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Skeleton } from '../../components';
import { api } from '../../services/api';
import { Product, Category, Banner, CategoryContent, TrendingProduct, AboutContent, ContactContent, Review } from '../../types';
import { Plus, Edit, Trash2, X, Save, ArrowLeft, Upload, Image, List, Star, User, Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<CategoryContent[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<TrendingProduct[]>([]);
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [contactContent, setContactContent] = useState<ContactContent | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState('products');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [currentBanner, setCurrentBanner] = useState<Banner | null>(null);
  const [currentCategory, setCurrentCategory] = useState<CategoryContent | null>(null);
  const [currentAbout, setCurrentAbout] = useState<AboutContent | null>(null);
  const [currentContact, setCurrentContact] = useState<ContactContent | null>(null);
  const [currentReview, setCurrentReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [productsData, bannersData, categoriesData, trendingData, aboutData, contactData, reviewsData] = await Promise.all([
        api.getProducts(),
        api.getBanners(),
        api.getCategories(),
        api.getTrendingProducts(),
        api.getAboutContent(),
        api.getContactContent(),
        api.getReviews()
      ]);
      
      setProducts(productsData);
      setBanners(bannersData);
      setCategories(categoriesData);
      setTrendingProducts(trendingData);
      setAboutContent(aboutData);
      setContactContent(contactData);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setCurrentProduct({
      id: Date.now().toString(),
      name: '',
      description: '',
      price: 0,
      category: Category.Gold,
      image: '',
      featured: false,
      inStock: true,
      discount: 0,
    });
    setModalType('product');
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setModalType('product');
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleAddBanner = () => {
    setCurrentBanner({
      id: Date.now().toString(),
      title: '',
      subtitle: '',
      imageUrl: '',
      ctaText: 'Shop Now',
      ctaUrl: '/products',
      enabled: true,
      displayOrder: banners.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    setModalType('banner');
    setIsModalOpen(true);
  };

  const handleEditBanner = (banner: Banner) => {
    setCurrentBanner(banner);
    setModalType('banner');
    setIsModalOpen(true);
  };

  const handleDeleteBanner = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        await api.deleteBanner(id);
        setBanners(banners.filter(b => b.id !== id));
      } catch (error) {
        console.error('Error deleting banner:', error);
      }
    }
  };

  const handleAddCategory = () => {
    setCurrentCategory({
      id: Date.now().toString(),
      name: '',
      imageUrl: '',
      enabled: true,
      displayOrder: categories.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    setModalType('category');
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: CategoryContent) => {
    setCurrentCategory(category);
    setModalType('category');
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await api.deleteCategory(id);
        setCategories(categories.filter(c => c.id !== id));
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const handleAddTrendingProduct = (productId: string) => {
    // Add product to trending
    api.addTrendingProduct(productId).then(newTrending => {
      setTrendingProducts([...trendingProducts, newTrending]);
    });
  };

  const handleRemoveTrendingProduct = (productId: string) => {
    // Remove product from trending
    api.removeTrendingProduct(productId).then(success => {
      if (success) {
        setTrendingProducts(trendingProducts.filter(tp => tp.productId !== productId));
      }
    });
  };

  const handleEditAbout = () => {
    setCurrentAbout(aboutContent || {
      id: 'about-1',
      title: 'Our Story',
      description: '',
      imageUrl: '',
      bulletPoints: [],
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    setModalType('about');
    setIsModalOpen(true);
  };

  const handleEditContact = () => {
    setCurrentContact(contactContent || {
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
    });
    setModalType('contact');
    setIsModalOpen(true);
  };

  const handleAddReview = () => {
    setCurrentReview({
      id: Date.now().toString(),
      name: '',
      comment: '',
      rating: 5,
      customerType: 'Customer',
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    setModalType('review');
    setIsModalOpen(true);
  };

  const handleEditReview = (review: Review) => {
    setCurrentReview(review);
    setModalType('review');
    setIsModalOpen(true);
  };

  const handleDeleteReview = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await api.deleteReview(id);
        setReviews(reviews.filter(r => r.id !== id));
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  const handleSave = async () => {
    if (modalType === 'product' && currentProduct) {
      try {
        if (currentProduct.id.startsWith('banner-') || currentProduct.id.startsWith('cat-')) {
          // This is a new product
          const newProduct = await api.addProduct(currentProduct);
          setProducts([...products, newProduct]);
        } else {
          // This is an existing product
          const updatedProduct = await api.updateProduct(currentProduct.id, currentProduct);
          if (updatedProduct) {
            setProducts(products.map(p => p.id === currentProduct.id ? updatedProduct : p));
          }
        }
      } catch (error) {
        console.error('Error saving product:', error);
      }
    } else if (modalType === 'banner' && currentBanner) {
      try {
        if (currentBanner.id.startsWith('banner-')) {
          // This is a new banner
          const newBanner = await api.addBanner({
            title: currentBanner.title,
            subtitle: currentBanner.subtitle,
            imageUrl: currentBanner.imageUrl,
            ctaText: currentBanner.ctaText,
            ctaUrl: currentBanner.ctaUrl,
            enabled: currentBanner.enabled,
            displayOrder: currentBanner.displayOrder
          });
          setBanners([...banners, newBanner]);
        } else {
          // This is an existing banner
          const updatedBanner = await api.updateBanner(currentBanner.id, currentBanner);
          if (updatedBanner) {
            setBanners(banners.map(b => b.id === currentBanner.id ? updatedBanner : b));
          }
        }
      } catch (error) {
        console.error('Error saving banner:', error);
      }
    } else if (modalType === 'category' && currentCategory) {
      try {
        if (currentCategory.id.startsWith('cat-')) {
          // This is a new category
          const newCategory = await api.addCategory({
            name: currentCategory.name,
            imageUrl: currentCategory.imageUrl,
            enabled: currentCategory.enabled,
            displayOrder: currentCategory.displayOrder
          });
          setCategories([...categories, newCategory]);
        } else {
          // This is an existing category
          const updatedCategory = await api.updateCategory(currentCategory.id, currentCategory);
          if (updatedCategory) {
            setCategories(categories.map(c => c.id === currentCategory.id ? updatedCategory : c));
          }
        }
      } catch (error) {
        console.error('Error saving category:', error);
      }
    } else if (modalType === 'about' && currentAbout) {
      try {
        const updatedAbout = await api.updateAboutContent(currentAbout);
        if (updatedAbout) {
          setAboutContent(updatedAbout);
        }
      } catch (error) {
        console.error('Error saving about content:', error);
      }
    } else if (modalType === 'contact' && currentContact) {
      try {
        const updatedContact = await api.updateContactContent(currentContact);
        if (updatedContact) {
          setContactContent(updatedContact);
        }
      } catch (error) {
        console.error('Error saving contact content:', error);
      }
    } else if (modalType === 'review' && currentReview) {
      try {
        if (currentReview.id.startsWith('review-')) {
          // This is a new review
          const newReview = await api.addReview({
            name: currentReview.name,
            comment: currentReview.comment,
            rating: currentReview.rating,
            customerType: currentReview.customerType,
            enabled: currentReview.enabled
          });
          setReviews([...reviews, newReview]);
        } else {
          // This is an existing review
          const updatedReview = await api.updateReview(currentReview.id, currentReview);
          if (updatedReview) {
            setReviews(reviews.map(r => r.id === currentReview.id ? updatedReview : r));
          }
        }
      } catch (error) {
        console.error('Error saving review:', error);
      }
    }
    
    setIsModalOpen(false);
    setCurrentProduct(null);
    setCurrentBanner(null);
    setCurrentCategory(null);
    setCurrentAbout(null);
    setCurrentContact(null);
    setCurrentReview(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    if (modalType === 'product' && currentProduct) {
      const newValue = type === 'checkbox' ? checked : value;
      setCurrentProduct({
        ...currentProduct,
        [name]: newValue
      });
    } else if (modalType === 'banner' && currentBanner) {
      const newValue = type === 'checkbox' ? checked : value;
      setCurrentBanner({
        ...currentBanner,
        [name]: newValue
      });
    } else if (modalType === 'category' && currentCategory) {
      const newValue = type === 'checkbox' ? checked : value;
      setCurrentCategory({
        ...currentCategory,
        [name]: newValue
      });
    } else if (modalType === 'about' && currentAbout) {
      const newValue = type === 'checkbox' ? checked : value;
      setCurrentAbout({
        ...currentAbout,
        [name]: newValue
      });
    } else if (modalType === 'contact' && currentContact) {
      const newValue = type === 'checkbox' ? checked : value;
      setCurrentContact({
        ...currentContact,
        [name]: newValue
      });
    } else if (modalType === 'review' && currentReview) {
      const newValue = type === 'checkbox' ? checked : value;
      setCurrentReview({
        ...currentReview,
        [name]: newValue
      });
    }
  };

  const handleBulletPointChange = (index: number, value: string) => {
    if (currentAbout) {
      const newBulletPoints = [...currentAbout.bulletPoints];
      newBulletPoints[index] = value;
      setCurrentAbout({
        ...currentAbout,
        bulletPoints: newBulletPoints
      });
    }
  };

  const addBulletPoint = () => {
    if (currentAbout) {
      setCurrentAbout({
        ...currentAbout,
        bulletPoints: [...currentAbout.bulletPoints, '']
      });
    }
  };

  const removeBulletPoint = (index: number) => {
    if (currentAbout) {
      const newBulletPoints = currentAbout.bulletPoints.filter((_, i) => i !== index);
      setCurrentAbout({
        ...currentAbout,
        bulletPoints: newBulletPoints
      });
    }
  };

  const renderModalContent = () => {
    if (modalType === 'product' && currentProduct) {
      return (
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={currentProduct.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              placeholder="Product name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={currentProduct.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              placeholder="Product price"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
            <select
              name="category"
              value={currentProduct.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
            >
              <option value={Category.Gold}>{Category.Gold}</option>
              <option value={Category.Silver}>{Category.Silver}</option>
              <option value={Category.Diamond}>{Category.Diamond}</option>
              <option value={Category.Artificial}>{Category.Artificial}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Image URL</label>
            <input
              type="text"
              name="image"
              value={currentProduct.image}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              placeholder="Image URL"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
            <textarea
              name="description"
              value={currentProduct.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none resize-none"
              placeholder="Product description"
            ></textarea>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={currentProduct.featured}
                onChange={handleInputChange}
                className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-neutral-300 rounded"
              />
              <label className="ml-2 block text-sm text-neutral-700">Featured Product</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="inStock"
                checked={currentProduct.inStock}
                onChange={handleInputChange}
                className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-neutral-300 rounded"
              />
              <label className="ml-2 block text-sm text-neutral-700">In Stock</label>
            </div>
          </div>
        </div>
      );
    } else if (modalType === 'banner' && currentBanner) {
      return (
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={currentBanner.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              placeholder="Banner title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={currentBanner.subtitle}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              placeholder="Banner subtitle"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={currentBanner.imageUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              placeholder="Banner image URL"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">CTA Text</label>
            <input
              type="text"
              name="ctaText"
              value={currentBanner.ctaText}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              placeholder="Call to action text"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">CTA URL</label>
            <input
              type="text"
              name="ctaUrl"
              value={currentBanner.ctaUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              placeholder="Call to action URL"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="enabled"
                checked={currentBanner.enabled}
                onChange={handleInputChange}
                className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-neutral-300 rounded"
              />
              <label className="ml-2 block text-sm text-neutral-700">Enabled</label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Display Order</label>
              <input
                type="number"
                name="displayOrder"
                value={currentBanner.displayOrder}
                onChange={handleInputChange}
                className="w-20 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>
      );
    } else if (modalType === 'category' && currentCategory) {
      return (
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={currentCategory.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              placeholder="Category name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={currentCategory.imageUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              placeholder="Category image URL"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="enabled"
                checked={currentCategory.enabled}
                onChange={handleInputChange}
                className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-neutral-300 rounded"
              />
              <label className="ml-2 block text-sm text-neutral-700">Enabled</label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Display Order</label>
              <input
                type="number"
                name="displayOrder"
                value={currentCategory.displayOrder}
                onChange={handleInputChange}
                className="w-20 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>
      );
    } else if (modalType === 'about' && currentAbout) {
      return (
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={currentAbout.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              placeholder="About section title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
            <textarea
              name="description"
              value={currentAbout.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none resize-none"
              placeholder="About section description"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={currentAbout.imageUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              placeholder="About section image URL"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Bullet Points</label>
            <div className="space-y-2">
              {currentAbout.bulletPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => handleBulletPointChange(index, e.target.value)}
                    className="flex-grow px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                    placeholder={`Bullet point ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeBulletPoint(index)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addBulletPoint}
                className="flex items-center gap-2 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50"
              >
                <Plus size={16} /> Add Bullet Point
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="enabled"
              checked={currentAbout.enabled}
              onChange={handleInputChange}
              className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-neutral-300 rounded"
            />
            <label className="ml-2 block text-sm text-neutral-700">Enabled</label>
          </div>
        </div>
      );
    } else if (modalType === 'contact' && currentContact) {
      return (
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Address</label>
            <textarea
              name="address"
              value={currentContact.address}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none resize-none"
              placeholder="Store address"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={currentContact.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              placeholder="Email address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={currentContact.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              placeholder="Phone number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">WhatsApp Number</label>
            <input
              type="text"
              name="whatsapp"
              value={currentContact.whatsapp}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              placeholder="WhatsApp number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Working Hours</label>
            <textarea
              name="workingHours"
              value={currentContact.workingHours}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none resize-none"
              placeholder="Working hours (e.g., Monday - Saturday: 10:00 AM - 8:00 PM)"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Map Embed URL</label>
            <input
              type="text"
              name="mapEmbedUrl"
              value={currentContact.mapEmbedUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              placeholder="Google Maps embed URL"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="enabled"
              checked={currentContact.enabled}
              onChange={handleInputChange}
              className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-neutral-300 rounded"
            />
            <label className="ml-2 block text-sm text-neutral-700">Enabled</label>
          </div>
        </div>
      );
    } else if (modalType === 'review' && currentReview) {
      return (
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Customer Name</label>
            <input
              type="text"
              name="name"
              value={currentReview.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              placeholder="Customer name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Customer Type</label>
            <input
              type="text"
              name="customerType"
              value={currentReview.customerType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
              placeholder="Customer type (e.g., Loyal Customer)"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Comment</label>
            <textarea
              name="comment"
              value={currentReview.comment}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none resize-none"
              placeholder="Review comment"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Rating</label>
            <select
              name="rating"
              value={currentReview.rating}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
            >
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="enabled"
              checked={currentReview.enabled}
              onChange={handleInputChange}
              className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-neutral-300 rounded"
            />
            <label className="ml-2 block text-sm text-neutral-700">Enabled</label>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap border-b border-neutral-200 mb-6 sm:mb-8">
            <button
              className={`px-4 py-2 sm:px-6 sm:py-3 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-b-2 border-gold-500 text-gold-600'
                  : 'text-neutral-500 hover:text-gold-600'
              }`}
              onClick={() => setActiveTab('products')}
            >
              <div className="flex items-center gap-2">
                <List size={18} />
                Products
              </div>
            </button>
            <button
              className={`px-4 py-2 sm:px-6 sm:py-3 font-medium text-sm ${
                activeTab === 'banners'
                  ? 'border-b-2 border-gold-500 text-gold-600'
                  : 'text-neutral-500 hover:text-gold-600'
              }`}
              onClick={() => setActiveTab('banners')}
            >
              <div className="flex items-center gap-2">
                <Image size={18} />
                Banners
              </div>
            </button>
            <button
              className={`px-4 py-2 sm:px-6 sm:py-3 font-medium text-sm ${
                activeTab === 'categories'
                  ? 'border-b-2 border-gold-500 text-gold-600'
                  : 'text-neutral-500 hover:text-gold-600'
              }`}
              onClick={() => setActiveTab('categories')}
            >
              <div className="flex items-center gap-2">
                <List size={18} />
                Categories
              </div>
            </button>
            <button
              className={`px-4 py-2 sm:px-6 sm:py-3 font-medium text-sm ${
                activeTab === 'trending'
                  ? 'border-b-2 border-gold-500 text-gold-600'
                  : 'text-neutral-500 hover:text-gold-600'
              }`}
              onClick={() => setActiveTab('trending')}
            >
              <div className="flex items-center gap-2">
                <Star size={18} />
                Trending Products
              </div>
            </button>
            <button
              className={`px-4 py-2 sm:px-6 sm:py-3 font-medium text-sm ${
                activeTab === 'about'
                  ? 'border-b-2 border-gold-500 text-gold-600'
                  : 'text-neutral-500 hover:text-gold-600'
              }`}
              onClick={() => setActiveTab('about')}
            >
              <div className="flex items-center gap-2">
                <User size={18} />
                About Content
              </div>
            </button>
            <button
              className={`px-4 py-2 sm:px-6 sm:py-3 font-medium text-sm ${
                activeTab === 'contact'
                  ? 'border-b-2 border-gold-500 text-gold-600'
                  : 'text-neutral-500 hover:text-gold-600'
              }`}
              onClick={() => setActiveTab('contact')}
            >
              <div className="flex items-center gap-2">
                <Phone size={18} />
                Contact Content
              </div>
            </button>
            <button
              className={`px-4 py-2 sm:px-6 sm:py-3 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-gold-500 text-gold-600'
                  : 'text-neutral-500 hover:text-gold-600'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              <div className="flex items-center gap-2">
                <MessageSquare size={18} />
                Customer Reviews
              </div>
            </button>
          </div>

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
                <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900">Product Management</h1>
                <button 
                  onClick={handleAddProduct}
                  className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-neutral-900 text-white rounded-lg hover:bg-gold-600 transition-colors"
                >
                  <Plus size={18} /> Add Product
                </button>
              </div>

              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-neutral-200 rounded-lg">
                    <thead>
                      <tr className="bg-neutral-50">
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Image</th>
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Name</th>
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Category</th>
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Price</th>
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Featured</th>
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">In Stock</th>
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {products.map(product => (
                        <tr key={product.id} className="hover:bg-neutral-50">
                          <td className="py-3 px-3 sm:py-4 sm:px-6">
                            <img 
                              src={product.image || 'https://placehold.co/60x60'} 
                              alt={product.name} 
                              className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                            />
                          </td>
                          <td className="py-3 px-3 sm:py-4 sm:px-6 text-sm text-neutral-900">{product.name}</td>
                          <td className="py-3 px-3 sm:py-4 sm:px-6 text-sm text-neutral-900">{product.category}</td>
                          <td className="py-3 px-3 sm:py-4 sm:px-6 text-sm text-neutral-900">₹{product.price.toLocaleString()}</td>
                          <td className="py-3 px-3 sm:py-4 sm:px-6">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              product.featured ? 'bg-green-100 text-green-800' : 'bg-neutral-100 text-neutral-800'
                            }`}>
                              {product.featured ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="py-3 px-3 sm:py-4 sm:px-6">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {product.inStock ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="py-3 px-3 sm:py-4 sm:px-6">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleEditProduct(product)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Banners Tab */}
          {activeTab === 'banners' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
                <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900">Banner Management</h1>
                <button 
                  onClick={handleAddBanner}
                  className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-neutral-900 text-white rounded-lg hover:bg-gold-600 transition-colors"
                >
                  <Plus size={18} /> Add Banner
                </button>
              </div>

              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-neutral-200 rounded-lg">
                    <thead>
                      <tr className="bg-neutral-50">
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Image</th>
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Title</th>
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Subtitle</th>
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Enabled</th>
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {banners.map(banner => (
                        <tr key={banner.id} className="hover:bg-neutral-50">
                          <td className="py-3 px-3 sm:py-4 sm:px-6">
                            <img 
                              src={banner.imageUrl || 'https://placehold.co/60x60'} 
                              alt={banner.title} 
                              className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                            />
                          </td>
                          <td className="py-3 px-3 sm:py-4 sm:px-6 text-sm text-neutral-900">{banner.title}</td>
                          <td className="py-3 px-3 sm:py-4 sm:px-6 text-sm text-neutral-900">{banner.subtitle}</td>
                          <td className="py-3 px-3 sm:py-4 sm:px-6">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              banner.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {banner.enabled ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="py-3 px-3 sm:py-4 sm:px-6">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleEditBanner(banner)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteBanner(banner.id)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
                <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900">Category Management</h1>
                <button 
                  onClick={handleAddCategory}
                  className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-neutral-900 text-white rounded-lg hover:bg-gold-600 transition-colors"
                >
                  <Plus size={18} /> Add Category
                </button>
              </div>

              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-neutral-200 rounded-lg">
                    <thead>
                      <tr className="bg-neutral-50">
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Image</th>
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Name</th>
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Enabled</th>
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {categories.map(category => (
                        <tr key={category.id} className="hover:bg-neutral-50">
                          <td className="py-3 px-3 sm:py-4 sm:px-6">
                            <img 
                              src={category.imageUrl || 'https://placehold.co/60x60'} 
                              alt={category.name} 
                              className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                            />
                          </td>
                          <td className="py-3 px-3 sm:py-4 sm:px-6 text-sm text-neutral-900">{category.name}</td>
                          <td className="py-3 px-3 sm:py-4 sm:px-6">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              category.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {category.enabled ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="py-3 px-3 sm:py-4 sm:px-6">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleEditCategory(category)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteCategory(category.id)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Trending Products Tab */}
          {activeTab === 'trending' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
                <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900">Trending Products</h1>
              </div>

              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-neutral-200 rounded-lg">
                    <thead>
                      <tr className="bg-neutral-50">
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Product</th>
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Current Trending Status</th>
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {products.map(product => {
                        const isTrending = trendingProducts.some(tp => tp.productId === product.id && tp.enabled);
                        return (
                          <tr key={product.id} className="hover:bg-neutral-50">
                            <td className="py-3 px-3 sm:py-4 sm:px-6 text-sm text-neutral-900">{product.name}</td>
                            <td className="py-3 px-3 sm:py-4 sm:px-6">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                isTrending ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {isTrending ? 'Yes' : 'No'}
                              </span>
                            </td>
                            <td className="py-3 px-3 sm:py-4 sm:px-6">
                              {isTrending ? (
                                <button 
                                  onClick={() => handleRemoveTrendingProduct(product.id)}
                                  className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                                >
                                  Remove
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handleAddTrendingProduct(product.id)}
                                  className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                                >
                                  Add
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* About Content Tab */}
          {activeTab === 'about' && (
            <div>
              <div className="flex justify-between items-center mb-6 sm:mb-8">
                <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900">About Content</h1>
                <button 
                  onClick={handleEditAbout}
                  className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-neutral-900 text-white rounded-lg hover:bg-gold-600 transition-colors"
                >
                  <Edit size={18} /> Edit About Content
                </button>
              </div>

              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : aboutContent ? (
                <div className="bg-white border border-neutral-200 rounded-lg p-6">
                  <h2 className="font-serif text-xl font-bold text-neutral-900 mb-4">{aboutContent.title}</h2>
                  <p className="text-neutral-700 mb-4">{aboutContent.description}</p>
                  <div className="mb-4">
                    <h3 className="font-medium text-neutral-900 mb-2">Bullet Points:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {aboutContent.bulletPoints.map((point, index) => (
                        <li key={index} className="text-neutral-700">{point}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      aboutContent.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {aboutContent.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-neutral-500">No about content configured yet.</p>
                  <button 
                    onClick={handleEditAbout}
                    className="mt-4 px-4 py-2 bg-neutral-900 text-white rounded hover:bg-gold-600 transition-colors"
                  >
                    Create About Content
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Contact Content Tab */}
          {activeTab === 'contact' && (
            <div>
              <div className="flex justify-between items-center mb-6 sm:mb-8">
                <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900">Contact Content</h1>
                <button 
                  onClick={handleEditContact}
                  className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-neutral-900 text-white rounded-lg hover:bg-gold-600 transition-colors"
                >
                  <Edit size={18} /> Edit Contact Content
                </button>
              </div>

              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : contactContent ? (
                <div className="bg-white border border-neutral-200 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-neutral-900 mb-2 flex items-center gap-2">
                        <MapPin size={16} className="text-neutral-500" />
                        Address
                      </h3>
                      <p className="text-neutral-700">{contactContent.address}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-900 mb-2 flex items-center gap-2">
                        <Mail size={16} className="text-neutral-500" />
                        Email
                      </h3>
                      <p className="text-neutral-700">{contactContent.email}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-900 mb-2 flex items-center gap-2">
                        <Phone size={16} className="text-neutral-500" />
                        Phone
                      </h3>
                      <p className="text-neutral-700">{contactContent.phone}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-900 mb-2 flex items-center gap-2">
                        <Clock size={16} className="text-neutral-500" />
                        Working Hours
                      </h3>
                      <p className="text-neutral-700">{contactContent.workingHours}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      contactContent.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {contactContent.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-neutral-500">No contact content configured yet.</p>
                  <button 
                    onClick={handleEditContact}
                    className="mt-4 px-4 py-2 bg-neutral-900 text-white rounded hover:bg-gold-600 transition-colors"
                  >
                    Create Contact Content
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
                <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900">Customer Reviews</h1>
                <button 
                  onClick={handleAddReview}
                  className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-neutral-900 text-white rounded-lg hover:bg-gold-600 transition-colors"
                >
                  <Plus size={18} /> Add Review
                </button>
              </div>

              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-neutral-200 rounded-lg">
                    <thead>
                      <tr className="bg-neutral-50">
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Customer</th>
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Comment</th>
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Rating</th>
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Type</th>
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Enabled</th>
                        <th className="py-3 px-3 sm:px-6 text-left text-sm font-medium text-neutral-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {reviews.map(review => (
                        <tr key={review.id} className="hover:bg-neutral-50">
                          <td className="py-3 px-3 sm:py-4 sm:px-6 text-sm text-neutral-900">{review.name}</td>
                          <td className="py-3 px-3 sm:py-4 sm:px-6 text-sm text-neutral-700 max-w-xs truncate">{review.comment}</td>
                          <td className="py-3 px-3 sm:py-4 sm:px-6 text-sm text-neutral-700">
                            {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
                          </td>
                          <td className="py-3 px-3 sm:py-4 sm:px-6 text-sm text-neutral-700">{review.customerType}</td>
                          <td className="py-3 px-3 sm:py-4 sm:px-6">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              review.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {review.enabled ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="py-3 px-3 sm:py-4 sm:px-6">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleEditReview(review)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteReview(review.id)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Product/Banner/Category Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
              onClick={() => setIsModalOpen(false)}
            ></div>
            <div className="bg-white w-full max-w-md sm:max-w-2xl relative z-10 rounded-lg shadow-2xl overflow-hidden">
              <div className="bg-neutral-900 text-white p-4 sm:p-6 flex justify-between items-center">
                <h3 className="font-serif text-lg sm:text-xl">
                  {modalType === 'product' && currentProduct?.id ? 'Edit Product' : 
                   modalType === 'product' ? 'Add New Product' :
                   modalType === 'banner' && currentBanner?.id ? 'Edit Banner' : 
                   modalType === 'banner' ? 'Add New Banner' :
                   modalType === 'category' && currentCategory?.id ? 'Edit Category' : 
                   modalType === 'category' ? 'Add New Category' :
                   modalType === 'about' ? 'Edit About Content' :
                   modalType === 'contact' ? 'Edit Contact Content' :
                   modalType === 'review' && currentReview?.id ? 'Edit Review' : 
                   modalType === 'review' ? 'Add New Review' : 'Edit Content'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-4 sm:p-8">
                {renderModalContent()}
                
                <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 sm:px-6 sm:py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-4 py-2 sm:px-6 sm:py-2 bg-neutral-900 text-white rounded-lg hover:bg-gold-600 transition-colors flex items-center gap-2"
                  >
                    <Save size={18} /> Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}