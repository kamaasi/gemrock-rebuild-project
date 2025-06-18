
import React, { useState, useEffect } from 'react';
import { Gavel, Users, Clock, DollarSign, Eye, Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const LiveAuction = () => {
  const [currentBid, setCurrentBid] = useState(15750);
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 34, seconds: 45 });
  const [watchers, setWatchers] = useState(127);
  const [totalBids, setTotalBids] = useState(34);

  const auctionItem = {
    id: 1,
    title: 'Exceptional Pink Sapphire Ring - 4.23 Carats',
    description: 'A magnificent pink sapphire ring featuring a cushion-cut Ceylon sapphire of exceptional clarity and color. The stone displays a vivid pink hue with excellent transparency. Set in 18k white gold with accent diamonds totaling 0.85 carats.',
    images: [
      'photo-1515562141207-7a88fb7ce338?w=600',
      'photo-1506630448388-4e683c67ddb0?w=600',
      'photo-1515562141207-7a88fb7ce338?w=600'
    ],
    seller: 'Premium Gemstones Ltd.',
    startingBid: 8000,
    buyNowPrice: 25000,
    reserve: 12000,
    category: 'Sapphires',
    certification: 'GIA Certified',
    specifications: {
      weight: '4.23 carats',
      cut: 'Cushion',
      color: 'Vivid Pink',
      clarity: 'VS1',
      origin: 'Ceylon (Sri Lanka)',
      treatment: 'Heat only'
    }
  };

  const recentBids = [
    { id: 1, bidder: 'Collector***', amount: 15750, time: '30 seconds ago' },
    { id: 2, bidder: 'GemLover**', amount: 15500, time: '2 minutes ago' },
    { id: 3, bidder: 'DiamondD***', amount: 15250, time: '4 minutes ago' },
    { id: 4, bidder: 'Investor*', amount: 15000, time: '6 minutes ago' },
    { id: 5, bidder: 'RubyRed**', amount: 14750, time: '8 minutes ago' }
  ];

  const chatMessages = [
    { id: 1, user: 'GemExpert', message: 'Beautiful color saturation!', time: '1m' },
    { id: 2, user: 'Collector', message: 'Is this heated or natural?', time: '2m' },
    { id: 3, user: 'Auctioneer', message: 'Heat treated only, as stated in description', time: '2m' },
    { id: 4, user: 'PinkLover', message: 'Stunning piece!', time: '3m' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePlaceBid = () => {
    const bid = parseFloat(bidAmount);
    if (bid > currentBid) {
      setCurrentBid(bid);
      setTotalBids(prev => prev + 1);
      setBidAmount('');
    }
  };

  const suggestedBids = [
    currentBid + 250,
    currentBid + 500,
    currentBid + 1000
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Live Indicator */}
        <div className="mb-6">
          <Badge className="bg-red-500 hover:bg-red-600 text-white text-lg px-4 py-2">
            <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></div>
            LIVE AUCTION
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Item Images */}
            <div className="bg-white rounded-lg shadow-lg border p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={`https://images.unsplash.com/${auctionItem.images[0]}`}
                    alt={auctionItem.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {auctionItem.images.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={`https://images.unsplash.com/${image}`}
                      alt={`${auctionItem.title} ${index + 2}`}
                      className="w-full h-44 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                  <div className="bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                    +5 more
                  </div>
                </div>
              </div>
            </div>

            {/* Item Details */}
            <div className="bg-white rounded-lg shadow-lg border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{auctionItem.title}</h1>
                  <p className="text-gray-600">Sold by: {auctionItem.seller}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{auctionItem.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(auctionItem.specifications).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500 capitalize">{key}</p>
                    <p className="font-semibold">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <Badge className="bg-green-100 text-green-800 mb-2">
                  {auctionItem.certification}
                </Badge>
                <p className="text-sm text-gray-600">
                  Reserve price: ${auctionItem.reserve.toLocaleString()} (Met)
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Auction Status */}
            <div className="bg-white rounded-lg shadow-lg border p-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Clock className="h-5 w-5 text-red-500" />
                  <span className="text-lg font-semibold">Time Remaining</span>
                </div>
                <div className="text-3xl font-bold text-red-500">
                  {String(timeLeft.hours).padStart(2, '0')}:
                  {String(timeLeft.minutes).padStart(2, '0')}:
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Bid</span>
                  <span className="text-2xl font-bold text-primary">
                    ${currentBid.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {watchers} watching
                  </span>
                  <span className="flex items-center">
                    <Gavel className="h-4 w-4 mr-1" />
                    {totalBids} bids
                  </span>
                </div>

                <div className="space-y-3">
                  <Input
                    type="number"
                    placeholder="Enter bid amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    min={currentBid + 100}
                  />
                  
                  <div className="grid grid-cols-3 gap-2">
                    {suggestedBids.map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setBidAmount(amount.toString())}
                      >
                        ${amount.toLocaleString()}
                      </Button>
                    ))}
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={handlePlaceBid}
                    disabled={!bidAmount || parseFloat(bidAmount) <= currentBid}
                  >
                    <Gavel className="h-4 w-4 mr-2" />
                    Place Bid
                  </Button>

                  <Button variant="outline" className="w-full">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Buy Now - ${auctionItem.buyNowPrice.toLocaleString()}
                  </Button>
                </div>
              </div>
            </div>

            {/* Recent Bids */}
            <div className="bg-white rounded-lg shadow-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Bids</h3>
              <div className="space-y-3">
                {recentBids.map((bid) => (
                  <div key={bid.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-semibold">{bid.bidder}</p>
                      <p className="text-sm text-gray-500">{bid.time}</p>
                    </div>
                    <span className="font-bold text-primary">
                      ${bid.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Chat */}
            <div className="bg-white rounded-lg shadow-lg border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Live Chat
              </h3>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {chatMessages.map((message) => (
                  <div key={message.id} className="text-sm">
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-primary">{message.user}:</span>
                      <span className="text-gray-400 text-xs">{message.time}</span>
                    </div>
                    <p className="text-gray-700">{message.message}</p>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input placeholder="Type a message..." className="flex-1" />
                <Button size="sm">Send</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LiveAuction;
