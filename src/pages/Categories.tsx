
import React from 'react';
import { Diamond, Sparkles, Star, Shield, Crown, Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      name: 'Diamonds',
      description: 'Brilliant cut diamonds, fancy colored diamonds, and rare diamond jewelry',
      count: 234,
      icon: Diamond,
      image: 'photo-1506630448388-4e683c67ddb0?w=600',
      startingPrice: '$500',
      featured: true
    },
    {
      name: 'Rubies',
      description: 'Burmese rubies, Thai rubies, and exceptional ruby jewelry pieces',
      count: 156,
      icon: Sparkles,
      image: 'photo-1515562141207-7a88fb7ce338?w=600',
      startingPrice: '$300',
      featured: true
    },
    {
      name: 'Sapphires',
      description: 'Kashmir sapphires, Ceylon sapphires, and fancy colored varieties',
      count: 189,
      icon: Star,
      image: 'photo-1506630448388-4e683c67ddb0?w=600',
      startingPrice: '$250'
    },
    {
      name: 'Emeralds',
      description: 'Colombian emeralds, Zambian emeralds, and vintage emerald jewelry',
      count: 98,
      icon: Shield,
      image: 'photo-1515562141207-7a88fb7ce338?w=600',
      startingPrice: '$400'
    },
    {
      name: 'Pearls',
      description: 'South Sea pearls, Akoya pearls, and vintage pearl jewelry',
      count: 67,
      icon: Crown,
      image: 'photo-1506630448388-4e683c67ddb0?w=600',
      startingPrice: '$100'
    },
    {
      name: 'Rare Minerals',
      description: 'Specimen minerals, crystals, and unique geological formations',
      count: 124,
      icon: Gem,
      image: 'photo-1515562141207-7a88fb7ce338?w=600',
      startingPrice: '$50'
    }
  ];

  const featuredCategories = categories.filter(cat => cat.featured);
  const regularCategories = categories.filter(cat => !cat.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Browse by Category
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Explore our curated collection of precious stones, jewelry, and minerals 
              organized by category for easy discovery
            </p>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Categories</h2>
            <p className="text-gray-600">Our most popular and sought-after gemstone categories</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {featuredCategories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.name.toLowerCase()}`}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2">
                    <img
                      src={`https://images.unsplash.com/${category.image}`}
                      alt={category.name}
                      className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-purple-100 p-3 rounded-full">
                        <category.icon className="h-6 w-6 text-purple-600" />
                      </div>
                      <Badge className="bg-purple-600 hover:bg-purple-700">Featured</Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.name}</h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm text-gray-500">{category.count} items available</span>
                      <span className="text-lg font-semibold text-purple-600">From {category.startingPrice}</span>
                    </div>
                    <Button className="w-full group-hover:bg-purple-700 transition-colors">
                      Explore Category
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Categories Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Categories</h2>
            <p className="text-gray-600">Complete collection of gemstones and jewelry categories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.name.toLowerCase()}`}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={`https://images.unsplash.com/${category.image}`}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    {category.featured && (
                      <Badge className="bg-purple-600 hover:bg-purple-700">Featured</Badge>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <category.icon className="h-6 w-6 text-white" />
                      <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{category.count} items</span>
                    <span className="text-lg font-semibold text-purple-600">From {category.startingPrice}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Benefits */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Shop by Category?</h2>
            <p className="text-xl text-gray-300">Streamlined browsing for better discovery</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-6">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Curation</h3>
              <p className="text-gray-300">
                Each category is carefully curated by our gemstone experts to ensure quality and authenticity.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Detailed Information</h3>
              <p className="text-gray-300">
                Access comprehensive details about each gemstone type, including origin, characteristics, and value.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-6">
                <Diamond className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Easy Comparison</h3>
              <p className="text-gray-300">
                Compare similar items within each category to make informed bidding decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Categories;
