
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, User, Clock, Gavel, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

interface AuctionCardProps {
  id: string;
  title: string;
  image: string;
  currentBid: number;
  buyNowPrice?: number;
  timeLeft: string;
  bidCount: number;
  isLive?: boolean;
  category: string;
  endTime: string;
}

const AuctionCard: React.FC<AuctionCardProps> = ({
  id,
  title,
  image,
  currentBid,
  buyNowPrice,
  timeLeft,
  bidCount,
  isLive,
  category,
  endTime
}) => {
  const { toast } = useToast();
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleBuyNow = () => {
    if (!buyNowPrice) return;
    
    toast({
      title: "Processing Payment",
      description: `Processing immediate purchase for ${title} at ${formatPrice(buyNowPrice)}`,
    });

    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Purchase Successful",
        description: `Successfully purchased ${title} for ${formatPrice(buyNowPrice)}!`,
      });
    }, 1500);

    console.log(`Buy Now clicked for auction ${id} - Price: ${buyNowPrice}`);
  };

  const handleAddToCart = () => {
    if (!buyNowPrice) return;

    const cartItem = {
      id,
      title,
      image,
      price: buyNowPrice,
      category,
      type: 'buy-now' as const
    };

    addToCart(cartItem);
  };

  const handleJoinLive = () => {
    if (isLive) {
      toast({
        title: "Joining Live Auction",
        description: `Redirecting to live auction for ${title}`,
      });
    } else {
      toast({
        title: "Place Bid",
        description: `Opening bid interface for ${title}`,
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative">
        <img
          src={`https://images.unsplash.com/${image}`}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          {isLive && (
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              LIVE
            </div>
          )}
        </div>
        <div className="absolute top-3 right-3 space-x-2">
          <button className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors">
            <User className="h-4 w-4 text-primary" />
          </button>
          <button className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors">
            <Eye className="h-4 w-4 text-primary" />
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/90 text-primary px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{title}</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Current Bid</p>
            <p className="text-2xl font-bold text-primary">{formatPrice(currentBid)}</p>
          </div>
          {buyNowPrice && (
            <div className="text-right">
              <p className="text-sm text-gray-500">Buy Now</p>
              <p className="text-lg font-semibold text-gray-700">{formatPrice(buyNowPrice)}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Gavel className="h-4 w-4" />
            <span>{bidCount} bids</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{timeLeft}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex space-x-2">
            <Link to={`/live-auction/${id}`} className="flex-1">
              <button 
                onClick={handleJoinLive}
                className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                {isLive ? 'Join Live' : 'Place Bid'}
              </button>
            </Link>
            {buyNowPrice && (
              <button 
                onClick={handleBuyNow}
                className="flex-1 border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors text-sm font-medium"
              >
                Buy Now
              </button>
            )}
          </div>
          
          {buyNowPrice && (
            <button 
              onClick={handleAddToCart}
              className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
