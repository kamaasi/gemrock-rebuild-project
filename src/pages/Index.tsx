
import React from 'react';
import { Link } from 'react-router-dom';
import { Link2, User, Eye, Link2 as LinkIcon, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuctionCard from '@/components/AuctionCard';

const Index = () => {
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
    }
  ];

  const categories = [
    { name: 'Diamonds', count: 234, icon: LinkIcon, image: 'photo-1506630448388-4e683c67ddb0?w=300' },
    { name: 'Rubies', count: 156, icon: Link2, image: 'photo-1515562141207-7a88fb7ce338?w=300' },
    { name: 'Sapphires', count: 189, icon: User, image: 'photo-1506630448388-4e683c67ddb0?w=300' },
    { name: 'Emeralds', count: 98, icon: Eye, image: 'photo-1515562141207-7a88fb7ce338?w=300' },
  ];

  const stats = [
    { label: 'Active Auctions', value: '1,234', icon: Link2 },
    { label: 'Registered Bidders', value: '45,678', icon: UserIcon },
    { label: 'Items Sold', value: '234,567', icon: User },
    { label: 'Success Rate', value: '98.5%', icon: Eye },
  ];

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

      {/* Featured Auctions */}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredAuctions.map((auction) => (
              <AuctionCard key={auction.id} {...auction} />
            ))}
          </div>
          
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

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600">
              Explore our curated collection of precious stones and jewelry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.name.toLowerCase()}`}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={`https://images.unsplash.com/${category.image}`}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <category.icon className="h-6 w-6 text-white" />
                    <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                  </div>
                  <p className="text-gray-200">{category.count} items</p>
                </div>
              </Link>
            ))}
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
