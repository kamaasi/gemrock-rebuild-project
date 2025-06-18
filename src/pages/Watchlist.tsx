
import React from 'react';
import { Eye, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuctionCard from '@/components/AuctionCard';

const Watchlist = () => {
  const watchlistItems = [
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
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-primary p-3 rounded-lg">
            <Eye className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Watchlist</h1>
            <p className="text-gray-600">Keep track of items you're interested in</p>
          </div>
        </div>

        {watchlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {watchlistItems.map((item) => (
              <AuctionCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your watchlist is empty</h3>
            <p className="text-gray-600 mb-6">Start adding items to your watchlist to keep track of them</p>
            <Button asChild>
              <Link2 to="/auctions">Browse Auctions</Link2>
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Watchlist;
