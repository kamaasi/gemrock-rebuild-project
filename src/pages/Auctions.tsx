
import React, { useState } from 'react';
import { Search, Filter, Grid, List, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuctionCard from '@/components/AuctionCard';

const Auctions = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const auctions = [
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
      title: 'Antique Pearl Brooch - Victorian Era',
      image: 'photo-1506630448388-4e683c67ddb0?w=400',
      currentBid: 1250,
      buyNowPrice: 2500,
      timeLeft: '12h 33m',
      bidCount: 7,
      category: 'Pearls',
      endTime: '2024-06-19T02:45:00Z'
    },
    {
      id: '6',
      title: 'Himalayan Quartz Crystal Formation',
      image: 'photo-1515562141207-7a88fb7ce338?w=400',
      currentBid: 850,
      timeLeft: '6d 4h 12m',
      bidCount: 12,
      category: 'Minerals',
      endTime: '2024-06-25T08:30:00Z'
    }
  ];

  const categories = ['All', 'Diamonds', 'Rubies', 'Sapphires', 'Emeralds', 'Pearls', 'Minerals'];
  const sortOptions = ['Ending Soon', 'Most Bids', 'Highest Bid', 'Lowest Bid', 'Newest'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Live Auctions</h1>
              <p className="text-gray-600 mt-2">Discover exceptional gemstones and jewelry pieces</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                {auctions.filter(a => a.isLive).length} Live Now
              </Badge>
              <Badge variant="outline">
                {auctions.length} Total Auctions
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search auctions..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <Select defaultValue="All">
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select defaultValue="Ending Soon">
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Auction Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {auctions.map((auction) => (
              <AuctionCard key={auction.id} {...auction} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Load More Auctions
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Auctions;
