
import React from 'react';
import { useParams } from 'react-router-dom';
import { Search, Filter, Grid, List, Star, Diamond, Sparkles, Shield, Crown, Mountain, Zap, Award, Coins, Heart, Globe, Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuctionCard from '@/components/AuctionCard';

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  
  const categoryData: { [key: string]: any } = {
    diamonds: {
      name: 'Diamonds',
      description: 'Brilliant cut diamonds, fancy colored diamonds, and rare diamond jewelry',
      icon: Diamond,
      image: 'photo-1605100804763-247f67b3557e?w=600',
      items: [
        {
          id: 'dia-1',
          title: 'Round Brilliant Diamond - 2.5 Carats GIA Certified',
          image: 'photo-1605100804763-247f67b3557e?w=400',
          currentBid: 8500,
          buyNowPrice: 12000,
          timeLeft: '2d 14h 23m',
          bidCount: 18,
          isLive: true,
          category: 'Diamonds',
          endTime: '2024-06-20T18:00:00Z'
        },
        {
          id: 'dia-2',
          title: 'Princess Cut Diamond Ring - 1.8 Carats',
          image: 'photo-1605100804763-247f67b3557e?w=400',
          currentBid: 6200,
          buyNowPrice: 9500,
          timeLeft: '1d 8h 45m',
          bidCount: 12,
          category: 'Diamonds',
          endTime: '2024-06-19T12:30:00Z'
        }
      ]
    },
    rubies: {
      name: 'Rubies',
      description: 'Burmese rubies, Thai rubies, and exceptional ruby jewelry pieces',
      icon: Sparkles,
      image: 'photo-1515562141207-7a88fb7ce338?w=600',
      items: [
        {
          id: 'ruby-1',
          title: 'Burmese Ruby - 3.2 Carats Pigeon Blood Red',
          image: 'photo-1515562141207-7a88fb7ce338?w=400',
          currentBid: 15000,
          timeLeft: '3d 22h 10m',
          bidCount: 28,
          isLive: true,
          category: 'Rubies',
          endTime: '2024-06-23T20:15:00Z'
        }
      ]
    },
    sapphires: {
      name: 'Sapphires',
      description: 'Kashmir sapphires, Ceylon sapphires, and fancy colored varieties',
      icon: Star,
      image: 'photo-1544441892-794166f1e3be?w=600',
      items: [
        {
          id: 'sap-1',
          title: 'Kashmir Sapphire - 4.1 Carats Royal Blue',
          image: 'photo-1544441892-794166f1e3be?w=400',
          currentBid: 22000,
          buyNowPrice: 35000,
          timeLeft: '5d 16h 33m',
          bidCount: 41,
          category: 'Sapphires',
          endTime: '2024-06-25T14:45:00Z'
        }
      ]
    },
    emeralds: {
      name: 'Emeralds',
      description: 'Colombian emeralds, Zambian emeralds, and vintage emerald jewelry',
      icon: Shield,
      image: 'photo-1602173574767-37ac01994b2a?w=600',
      items: [
        {
          id: 'em-1',
          title: 'Colombian Emerald - 2.8 Carats Minor Oil',
          image: 'photo-1602173574767-37ac01994b2a?w=400',
          currentBid: 8750,
          buyNowPrice: 15000,
          timeLeft: '2d 8h 45m',
          bidCount: 19,
          category: 'Emeralds',
          endTime: '2024-06-21T12:30:00Z'
        }
      ]
    },
    minerals: {
      name: 'Minerals',
      description: 'Specimen minerals, crystals, and unique geological formations',
      icon: Mountain,
      image: 'photo-1544441892-794166f1e3be?w=600',
      items: [
        {
          id: 'min-1',
          title: 'Himalayan Quartz Crystal Formation - Large Specimen',
          image: 'photo-1544441892-794166f1e3be?w=400',
          currentBid: 850,
          timeLeft: '6d 4h 12m',
          bidCount: 12,
          category: 'Minerals',
          endTime: '2024-06-25T08:30:00Z'
        },
        {
          id: 'min-2',
          title: 'Amethyst Geode - Cathedral Formation',
          image: 'photo-1518709268805-4e9042af2176?w=400',
          currentBid: 1200,
          buyNowPrice: 2000,
          timeLeft: '4d 2h 15m',
          bidCount: 8,
          category: 'Minerals',
          endTime: '2024-06-23T06:15:00Z'
        }
      ]
    },
    rough: {
      name: 'Rough',
      description: 'Uncut gemstones, rough crystals, and raw mineral specimens',
      icon: Gem,
      image: 'photo-1509652449470-1893fd1d1ec0?w=600',
      items: [
        {
          id: 'rough-1',
          title: 'Rough Sapphire Lot - 25 Carats Total Weight',
          image: 'photo-1509652449470-1893fd1d1ec0?w=400',
          currentBid: 450,
          timeLeft: '3d 12h 30m',
          bidCount: 15,
          category: 'Rough',
          endTime: '2024-06-22T18:30:00Z'
        }
      ]
    }
  };

  const currentCategory = categoryData[categoryName || ''] || {
    name: 'Category Not Found',
    description: 'This category does not exist',
    icon: Diamond,
    image: 'photo-1506630448388-4e683c67ddb0?w=600',
    items: []
  };

  const IconComponent = currentCategory.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Category Header */}
      <section className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
            <div className="lg:w-1/2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-white/20 p-4 rounded-full">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <Badge className="bg-purple-600 hover:bg-purple-700">
                  {currentCategory.items.length} Items Available
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {currentCategory.name}
              </h1>
              <p className="text-xl text-gray-200 mb-6">
                {currentCategory.description}
              </p>
              <div className="flex space-x-4">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
                  View All Items
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900">
                  Create Alert
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <img
                src={`https://images.unsplash.com/${currentCategory.image}`}
                alt={currentCategory.name}
                className="w-full h-64 lg:h-80 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder={`Search ${currentCategory.name.toLowerCase()}...`}
                className="pl-10"
              />
            </div>
            <Select defaultValue="price-low">
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="ending-soon">Ending Soon</SelectItem>
                <SelectItem value="most-bids">Most Bids</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Items Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentCategory.items.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Available {currentCategory.name}
                </h2>
                <p className="text-gray-600">
                  Showing {currentCategory.items.length} of {currentCategory.items.length} items
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentCategory.items.map((item) => (
                  <AuctionCard key={item.id} {...item} />
                ))}
              </div>

              <div className="text-center mt-12">
                <Button size="lg" variant="outline">
                  Load More Items
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <IconComponent className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Items Available</h2>
              <p className="text-gray-600 mb-8">
                There are currently no items available in this category. Check back soon for new listings!
              </p>
              <Button>
                Create Alert for New Items
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
