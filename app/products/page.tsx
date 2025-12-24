'use client';

import React, { useState, useEffect } from 'react';
import { Layout, ProductCard, Skeleton } from '../../components';
import { api } from '../../services/api';
import { Product } from '../../types';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProducts().then(data => {
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <Layout>
      <div className="min-h-screen bg-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-900 mb-4">Our Collection</h1>
            <p className="text-neutral-500 max-w-2xl mx-auto">Discover our exquisite range of gold, silver, and diamond jewelry crafted with precision and elegance.</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-white rounded-sm overflow-hidden shadow-sm border border-neutral-100 flex flex-col h-full">
                  <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
                    <Skeleton className="w-full h-full" />
                  </div>
                  <div className="p-4 sm:p-5 flex-grow flex flex-col">
                    <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                    <div className="h-6 bg-neutral-200 rounded mb-4 flex-grow"></div>
                    <div className="flex justify-between">
                      <div className="h-4 w-1/3 bg-neutral-200 rounded"></div>
                      <div className="h-4 w-1/4 bg-neutral-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500 text-lg">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}