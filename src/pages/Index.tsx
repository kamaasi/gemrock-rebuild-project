import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Link2, User, Eye, Link2 as LinkIcon, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OptimizedAuctionCard from '@/components/OptimizedAuctionCard';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useLocalStorage<string[]>('selectedCategories', []);
  const [priceRange, setPriceRange] = useLocalStorage('priceRange', { min: 0, max: 1000000 });
  const [isLoading, setIsLoading] = useState(false);

  const featuredAuctions = [
    {
      id: '1',
      title: 'Rare Pink Sapphire Ring - 3.45 Carats',
      image: 'photo-1515562141207-7a88fb7ce338?w=400',
      currentBid: 12500,
      buyNowPrice: 18000,
      timeLeft: '2d 14h 23m',
      bidCount: 24,
      isLive: true,
      category: 'Sapphires',
      endTime: '2024-06-20T18:00:00Z'
    },
    {
      id: '2',
      title: 'Vintage Emerald Necklace - Art Deco Period',
      image: 'photo-1506630448388-4e683c67ddb0?w=400',
      currentBid: 8750,
      buyNowPrice: 15000,
      timeLeft: '1d 8h 45m',
      bidCount: 18,
      category: 'Emeralds',
      endTime: '2024-06-19T12:30:00Z'
    },
    {
      id: '3',
      title: 'Natural Ruby Collection - Burma Origin',
      image: 'photo-1515562141207-7a88fb7ce338?w=400',
      currentBid: 22000,
      timeLeft: '4d 22h 10m',
      bidCount: 41,
      isLive: true,
      category: 'Rubies',
      endTime: '2024-06-23T20:15:00Z'
    },
    {
      id: '4',
      title: 'Diamond Tennis Bracelet - 5.2 Total Carats',
      image: 'photo-1506630448388-4e683c67ddb0?w=400',
      currentBid: 15500,
      buyNowPrice: 25000,
      timeLeft: '3d 16h 33m',
      bidCount: 33,
      category: 'Diamonds',
      endTime: '2024-06-22T14:45:00Z'
    },
    {
      id: '5',
      title: 'Vintage Opal Pendant - Ethiopian Fire Opal',
      image: 'photo-1515562141207-7a88fb7ce338?w=400',
      currentBid: 3200,
      buyNowPrice: 4800,
      timeLeft: '6h 42m',
      bidCount: 12,
      category: 'Opals',
      endTime: '2024-06-25T14:00:00Z'
    },
    {
      id: '6',
      title: 'Antique Topaz Brooch - Victorian Era',
      image: 'photo-1506630448388-4e683c67ddb0?w=400',
      currentBid: 1850,
      timeLeft: '5d 18h 30m',
      bidCount: 8,
      category: 'Topaz',
      endTime: '2024-06-28T10:30:00Z'
    }
  ];

  const categories = [
    { id: 'diamonds', label: 'Diamonds', count: 234, icon: LinkIcon, image: 'photo-1506630448388-4e683c67ddb0?w=300' },
    { id: 'rubies', label: 'Rubies', count: 156, icon: Link2, image: 'photo-1515562141207-7a88fb7ce338?w=300' },
    { id: 'sapphires', label: 'Sapphires', count: 189, icon: User, image: 'photo-1506630448388-4e683c67ddb0?w=300' },
    { id: 'emeralds', label: 'Emeralds', count: 98, icon: Eye, image: 'photo-1515562141207-7a88fb7ce338?w=300' },
    { id: 'opals', label: 'Opals', count: 45, icon: User, image: 'photo-1515562141207-7a88fb7ce338?w=300' },
    { id: 'topaz', label: 'Topaz', count: 67, icon: Eye, image: 'photo-1506630448388-4e683c67ddb0?w=300' },
  ];

  const stats = [
    { label: 'Active Auctions', value: '1,234', icon: Link2 },
    { label: 'Registered Bidders', value: '45,678', icon: UserIcon },
    { label: 'Items Sold', value: '234,567', icon: User },
    { label: 'Success Rate', value: '98.5%', icon: Eye },
  ];

  // Memoized filtered auctions for performance
  const filteredAuctions = useMemo(() => {
    return featuredAuctions.filter(auction => {
      const matchesSearch = auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          auction.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 ||
                             selectedCategories.includes(auction.category.toLowerCase());
      
      const price = auction.buyNowPrice || auction.currentBid || 0;
      const matchesPrice = price >= priceRange.min && price <= priceRange.max;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [featuredAuctions, searchQuery, selectedCategories, priceRange]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  }, [setSelectedCategories]);

  const handleClearFilters = useCallback(() => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 1000000 });
    setSearchQuery('');
  }, [setSelectedCategories, setPriceRange]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Discover Rare
              <span className="block text-white">
                Gemstones & Jewelry
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Join the world's premier auction house for authentic gemstones, 
              rare minerals, and exquisite jewelry. Bid with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3" asChild>
                <Link to="/auctions">
                  Browse Live Auctions
                  <Link2 className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/register">Register to Bid</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section - Redesigned */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our curated collection of precious stones and jewelry from around the world
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.label.toLowerCase()}`}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                {/* Image Container with Fixed Aspect Ratio */}
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <img
                    src={`https://images.unsplash.com/${category.image}`}
                    alt={category.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                
                {/* Content Container */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {category.label}
                    </h3>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {category.count}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    Discover {category.count} premium {category.label.toLowerCase()} pieces
                  </p>
                  
                  <div className="flex items-center text-primary font-medium text-sm group-hover:text-primary/80 transition-colors">
                    Explore Collection
                    <Link2 className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Auctions with Integrated Search and Filters */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Auctions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover exceptional gemstones and jewelry pieces currently up for auction
            </p>
          </div>

          {/* Search and Horizontal Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SearchBar onSearch={handleSearch} className="w-full" />
            </div>
            
            {/* Horizontal Filter Panel */}
            <div className="max-w-4xl mx-auto">
              <FilterPanel
                categories={categories}
                selectedCategories={selectedCategories}
                priceRange={priceRange}
                onCategoryChange={handleCategoryChange}
                onPriceRangeChange={setPriceRange}
                onClearFilters={handleClearFilters}
                className="w-full"
              />
            </div>

            {/* Search Results Info */}
            {searchQuery && (
              <p className="text-sm text-gray-500 text-center">
                Showing {filteredAuctions.length} results for "{searchQuery}"
              </p>
            )}
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredAuctions.map((auction) => (
                  <OptimizedAuctionCard key={auction.id} {...auction} />
                ))}
              </div>
              
              {filteredAuctions.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No auctions match your current filters.</p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </>
          )}
          
          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link to="/auctions">
                View All Auctions
                <Link2 className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose GemRock Auctions?
            </h2>
            <p className="text-xl text-gray-300">
              Trusted by collectors and dealers worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">100% Authentic</h3>
              <p className="text-gray-300">
                Every piece is authenticated by certified gemologists and comes with detailed documentation.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                <User className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Curation</h3>
              <p className="text-gray-300">
                Our team of experts carefully selects only the finest gemstones and jewelry pieces.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                <Link2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure Bidding</h3>
              <p className="text-gray-300">
                Advanced security measures and transparent bidding process ensure fair transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Latest Auctions
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Get notified about new arrivals, exclusive auctions, and special events
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
