import React from 'react';
import { Diamond, Sparkles, Star, Shield, Crown, Gem, Mountain, Zap, Award, Coins, Heart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    // Precious Stones
    {
      name: 'Diamonds',
      description: 'Brilliant cut diamonds, fancy colored diamonds, and rare diamond jewelry',
      count: 234,
      icon: Diamond,
      image: 'photo-1605100804763-247f67b3557e?w=600', // Diamond jewelry
      startingPrice: '$500',
      featured: true
    },
    {
      name: 'Rubies',
      description: 'Burmese rubies, Thai rubies, and exceptional ruby jewelry pieces',
      count: 156,
      icon: Sparkles,
      image: 'photo-1515562141207-7a88fb7ce338?w=600', // Ruby gemstone
      startingPrice: '$300',
      featured: true
    },
    {
      name: 'Sapphires',
      description: 'Kashmir sapphires, Ceylon sapphires, and fancy colored varieties',
      count: 189,
      icon: Star,
      image: 'photo-1544441892-794166f1e3be?w=600', // Blue sapphire
      startingPrice: '$250',
      featured: true
    },
    {
      name: 'Emeralds',
      description: 'Colombian emeralds, Zambian emeralds, and vintage emerald jewelry',
      count: 98,
      icon: Shield,
      image: 'photo-1602173574767-37ac01994b2a?w=600', // Emerald stone
      startingPrice: '$400',
      featured: true
    },
    
    // Semi-Precious Stones
    {
      name: 'Amethyst',
      description: 'Purple quartz varieties, geodes, and carved specimens',
      count: 145,
      icon: Crown,
      image: 'photo-1518709268805-4e9042af2176?w=600', // Amethyst crystal
      startingPrice: '$50'
    },
    {
      name: 'Aquamarine',
      description: 'Blue beryl crystals and aquamarine jewelry',
      count: 87,
      icon: Mountain,
      image: 'photo-1544441893-675973e31985?w=600', // Aquamarine crystal
      startingPrice: '$75'
    },
    {
      name: 'Tourmaline',
      description: 'Multi-colored tourmaline varieties and bi-color specimens',
      count: 112,
      icon: Zap,
      image: 'photo-1509652449470-1893fd1d1ec0?w=600', // Tourmaline crystals
      startingPrice: '$80'
    },
    {
      name: 'Garnet',
      description: 'Red garnets, demantoid, and rare color varieties',
      count: 93,
      icon: Heart,
      image: 'photo-1544441892-619b37c5b5ed?w=600', // Red garnet
      startingPrice: '$40'
    },
    {
      name: 'Citrine',
      description: 'Yellow and orange quartz varieties and specimens',
      count: 76,
      icon: Coins,
      image: 'photo-1518709268805-4e9042af2176?w=600', // Yellow citrine
      startingPrice: '$30'
    },
    {
      name: 'Peridot',
      description: 'Olivine crystals and peridot jewelry pieces',
      count: 54,
      icon: Globe,
      image: 'photo-1602173574767-37ac01994b2a?w=600', // Green peridot
      startingPrice: '$45'
    },
    
    // Minerals & Rough
    {
      name: 'Minerals',
      description: 'Specimen minerals, crystals, and unique geological formations',
      count: 324,
      icon: Mountain,
      image: 'photo-1544441892-794166f1e3be?w=600', // Raw minerals
      startingPrice: '$25'
    },
    {
      name: 'Rough',
      description: 'Uncut gemstones, rough crystals, and raw mineral specimens',
      count: 287,
      icon: Gem,
      image: 'photo-1509652449470-1893fd1d1ec0?w=600', // Rough stones
      startingPrice: '$15'
    },
    
    // Quartz Varieties
    {
      name: 'Quartz',
      description: 'Clear quartz, smoky quartz, and various quartz formations',
      count: 198,
      icon: Diamond,
      image: 'photo-1518709268805-4e9042af2176?w=600', // Clear quartz
      startingPrice: '$20'
    },
    {
      name: 'Agate',
      description: 'Banded agate varieties, geodes, and polished specimens',
      count: 165,
      icon: Globe,
      image: 'photo-1544441893-675973e31985?w=600', // Agate slice
      startingPrice: '$35'
    },
    {
      name: 'Jasper',
      description: 'Picture jasper, red jasper, and ornamental varieties',
      count: 142,
      icon: Mountain,
      image: 'photo-1544441892-619b37c5b5ed?w=600', // Jasper stone
      startingPrice: '$25'
    },
    
    // Rare & Collectible
    {
      name: 'Tanzanite',
      description: 'Blue-violet zoisite crystals and tanzanite jewelry',
      count: 43,
      icon: Star,
      image: 'photo-1544441892-794166f1e3be?w=600', // Blue tanzanite
      startingPrice: '$200'
    },
    {
      name: 'Opal',
      description: 'Fire opals, black opals, and boulder opal varieties',
      count: 89,
      icon: Sparkles,
      image: 'photo-1602173574767-37ac01994b2a?w=600', // Colorful opal
      startingPrice: '$100'
    },
    {
      name: 'Jade',
      description: 'Jadeite and nephrite jade carvings and specimens',
      count: 67,
      icon: Shield,
      image: 'photo-1602173574767-37ac01994b2a?w=600', // Green jade
      startingPrice: '$150'
    },
    
    // Pearls & Organic
    {
      name: 'Pearls',
      description: 'South Sea pearls, Akoya pearls, and vintage pearl jewelry',
      count: 78,
      icon: Crown,
      image: 'photo-1605100804763-247f67b3557e?w=600', // Pearl jewelry
      startingPrice: '$100'
    },
    {
      name: 'Amber',
      description: 'Baltic amber, Dominican amber, and fossilized specimens',
      count: 56,
      icon: Coins,
      image: 'photo-1544441893-675973e31985?w=600', // Amber specimen
      startingPrice: '$75'
    },
    {
      name: 'Coral',
      description: 'Red coral, black coral, and vintage coral jewelry',
      count: 34,
      icon: Heart,
      image: 'photo-1544441892-619b37c5b5ed?w=600', // Red coral
      startingPrice: '$85'
    },
    
    // Jewelry Categories
    {
      name: 'Rings',
      description: 'Gemstone rings, vintage rings, and designer pieces',
      count: 456,
      icon: Award,
      image: 'photo-1605100804763-247f67b3557e?w=600', // Ring collection
      startingPrice: '$200'
    },
    {
      name: 'Necklaces',
      description: 'Gemstone necklaces, chains, and pendant pieces',
      count: 298,
      icon: Crown,
      image: 'photo-1515562141207-7a88fb7ce338?w=600', // Necklace jewelry
      startingPrice: '$150'
    },
    {
      name: 'Earrings',
      description: 'Stud earrings, drop earrings, and vintage pieces',
      count: 367,
      icon: Sparkles,
      image: 'photo-1605100804763-247f67b3557e?w=600', // Earring collection
      startingPrice: '$100'
    },
    {
      name: 'Bracelets',
      description: 'Tennis bracelets, bangles, and charm bracelets',
      count: 234,
      icon: Globe,
      image: 'photo-1515562141207-7a88fb7ce338?w=600', // Bracelet jewelry
      startingPrice: '$125'
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
              Explore our comprehensive collection of precious stones, minerals, rough specimens,
              and exquisite jewelry organized by category for easy discovery
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
            <p className="text-gray-600">Complete collection of gemstones, minerals, rough specimens and jewelry categories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
