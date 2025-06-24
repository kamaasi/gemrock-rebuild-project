
import React, { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Eye, Gavel, ShoppingCart, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import LazyImage from '@/components/LazyImage';

interface OptimizedAuctionCardProps {
  id: string;
  title: string;
  image: string;
  currentBid?: number;
  buyNowPrice?: number;
  timeLeft: string;
  bidCount?: number;
  isLive?: boolean;
  category: string;
  endTime?: string;
}

const OptimizedAuctionCard: React.FC<OptimizedAuctionCardProps> = memo(({
  id,
  title,
  image,
  currentBid,
  buyNowPrice,
  timeLeft,
  bidCount = 0,
  isLive = false,
  category,
}) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const imageUrl = useMemo(() => `https://images.unsplash.com/${image}`, [image]);
  
  const displayPrice = useMemo(() => {
    return buyNowPrice || currentBid || 0;
  }, [buyNowPrice, currentBid]);

  const handleAddToCart = React.useCallback(() => {
    const cartItem = {
      id,
      title,
      image,
      price: displayPrice,
      category,
      type: buyNowPrice ? 'buy-now' as const : 'current-bid' as const,
    };
    addToCart(cartItem);
    
    toast({
      title: "Added to Cart",
      description: `${title} has been added to your cart`,
    });
  }, [id, title, image, displayPrice, category, buyNowPrice, addToCart, toast]);

  const handleBuyNow = React.useCallback(() => {
    if (!buyNowPrice) {
      toast({
        title: "Buy Now Not Available",
        description: "This item is auction only",
      });
      return;
    }

    const cartItem = {
      id,
      title,
      image,
      price: buyNowPrice,
      category,
      type: 'buy-now' as const,
    };
    addToCart(cartItem);

    toast({
      title: "Proceeding to Checkout",
      description: `Processing payment for $${buyNowPrice.toLocaleString()}`,
    });
  }, [id, title, image, buyNowPrice, category, addToCart, toast]);

  const handleJoinLive = React.useCallback(() => {
    navigate(`/live-auction/${id}`);
  }, [navigate, id]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      <div className="relative h-48 overflow-hidden">
        <LazyImage
          src={imageUrl}
          alt={title}
          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        {isLive && (
          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
            LIVE
          </Badge>
        )}
        <Badge className="absolute top-3 right-3 bg-purple-600 hover:bg-purple-700">
          {category}
        </Badge>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">{title}</h3>
        
        <div className="space-y-2 mb-4">
          {currentBid && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Current Bid:</span>
              <span className="font-bold text-purple-600">${currentBid.toLocaleString()}</span>
            </div>
          )}
          
          {buyNowPrice && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Buy Now:</span>
              <span className="font-bold text-green-600">${buyNowPrice.toLocaleString()}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{timeLeft}</span>
            </div>
            {bidCount > 0 && (
              <div className="flex items-center space-x-1">
                <Gavel className="h-4 w-4" />
                <span>{bidCount} bids</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {buyNowPrice && (
            <Button onClick={handleBuyNow} className="w-full bg-green-600 hover:bg-green-700">
              <CreditCard className="h-4 w-4 mr-2" />
              Buy Now
            </Button>
          )}
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleAddToCart}
              className="flex-1"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            
            {isLive ? (
              <Button onClick={handleJoinLive} className="flex-1 bg-red-600 hover:bg-red-700">
                <Eye className="h-4 w-4 mr-2" />
                Join Live
              </Button>
            ) : (
              <Button variant="outline" className="flex-1">
                <Gavel className="h-4 w-4 mr-2" />
                Place Bid
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

OptimizedAuctionCard.displayName = 'OptimizedAuctionCard';

export default OptimizedAuctionCard;
