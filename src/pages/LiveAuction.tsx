
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Gavel, Users, Clock, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import BuyNowHandler from '@/components/BuyNowHandler';

interface AuctionItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  current_bid: number;
  buy_now_price: number;
  starting_bid: number;
  reserve_price: number;
  category: string;
  status: string;
  bid_count: number;
  seller_id: string;
  profiles: {
    full_name: string;
    email: string;
  };
}

interface Bid {
  id: string;
  amount: number;
  created_at: string;
  profiles: {
    full_name: string;
  };
}

const LiveAuction = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [auctionItem, setAuctionItem] = useState<AuctionItem | null>(null);
  const [currentBid, setCurrentBid] = useState(0);
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 34, seconds: 45 });
  const [watchers, setWatchers] = useState(127);
  const [totalBids, setTotalBids] = useState(0);
  const [recentBids, setRecentBids] = useState<Bid[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchAuctionItem();
      fetchRecentBids();
      checkUser();
      subscribeToNewBids();
    }
  }, [id]);

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

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setCurrentUser(profile);
    }
  };

  const fetchAuctionItem = async () => {
    try {
      const { data, error } = await supabase
        .from('auction_items')
        .select(`
          *,
          profiles!auction_items_seller_id_fkey (
            full_name,
            email
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        setAuctionItem(data);
        setCurrentBid(data.current_bid || data.starting_bid || 0);
        setTotalBids(data.bid_count || 0);
      }
    } catch (error) {
      console.error('Error fetching auction item:', error);
      toast({
        title: "Error",
        description: "Failed to load auction item",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecentBids = async () => {
    try {
      const { data, error } = await supabase
        .from('bids')
        .select(`
          *,
          profiles (
            full_name
          )
        `)
        .eq('auction_id', id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setRecentBids(data || []);
    } catch (error) {
      console.error('Error fetching bids:', error);
    }
  };

  const subscribeToNewBids = () => {
    const channel = supabase
      .channel('auction-bids')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bids',
          filter: `auction_id=eq.${id}`
        },
        async (payload) => {
          // Fetch the new bid with profile data
          const { data } = await supabase
            .from('bids')
            .select(`
              *,
              profiles (
                full_name
              )
            `)
            .eq('id', payload.new.id)
            .single();

          if (data) {
            setCurrentBid(data.amount);
            setTotalBids(prev => prev + 1);
            setRecentBids(prev => [data, ...prev.slice(0, 4)]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handlePlaceBid = async () => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to place a bid",
        variant: "destructive"
      });
      return;
    }

    const bid = parseFloat(bidAmount);
    if (bid <= currentBid) {
      toast({
        title: "Invalid Bid",
        description: "Bid must be higher than current bid",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('bids')
        .insert({
          auction_id: id,
          bidder_id: currentUser.id,
          amount: bid
        });

      if (error) throw error;

      // Update auction item's current bid
      await supabase
        .from('auction_items')
        .update({ 
          current_bid: bid,
          bid_count: totalBids + 1
        })
        .eq('id', id);

      setBidAmount('');
      
      toast({
        title: "Bid Placed Successfully",
        description: `Your bid of $${bid.toLocaleString()} has been placed`,
      });

    } catch (error: any) {
      toast({
        title: "Bid Failed",
        description: error.message || "Failed to place bid",
        variant: "destructive"
      });
    }
  };

  const handlePurchaseComplete = () => {
    toast({
      title: "Purchase Complete",
      description: "Redirecting to your purchases...",
    });
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Loading auction...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!auctionItem) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Auction not found</div>
        </div>
        <Footer />
      </div>
    );
  }

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
            {auctionItem.status === 'live' ? 'LIVE AUCTION' : 'AUCTION'}
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
                    src={`https://images.unsplash.com/${auctionItem.images?.[0] || 'photo-1515562141207-7a88fb7ce338?w=600'}`}
                    alt={auctionItem.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2].map((index) => (
                    <img
                      key={index}
                      src={`https://images.unsplash.com/${auctionItem.images?.[index] || 'photo-1506630448388-4e683c67ddb0?w=600'}`}
                      alt={`${auctionItem.title} ${index + 1}`}
                      className="w-full h-44 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                  <div className="bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                    +{(auctionItem.images?.length || 2) - 2} more
                  </div>
                </div>
              </div>
            </div>

            {/* Item Details */}
            <div className="bg-white rounded-lg shadow-lg border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{auctionItem.title}</h1>
                  <p className="text-gray-600">Sold by: {auctionItem.profiles?.full_name || 'Anonymous Seller'}</p>
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

              <div className="mt-6 pt-6 border-t">
                <Badge className="bg-green-100 text-green-800 mb-2">
                  Verified Gemstone
                </Badge>
                <p className="text-sm text-gray-600">
                  Reserve price: ${auctionItem.reserve_price?.toLocaleString() || 'Not disclosed'} 
                  {currentBid >= (auctionItem.reserve_price || 0) ? ' (Met)' : ' (Not met)'}
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

                  {auctionItem.buy_now_price && (
                    <BuyNowHandler
                      auctionId={auctionItem.id}
                      buyNowPrice={auctionItem.buy_now_price}
                      itemTitle={auctionItem.title}
                      sellerId={auctionItem.seller_id}
                      onPurchaseComplete={handlePurchaseComplete}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Recent Bids */}
            <div className="bg-white rounded-lg shadow-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Bids</h3>
              <div className="space-y-3">
                {recentBids.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No bids yet</p>
                ) : (
                  recentBids.map((bid) => (
                    <div key={bid.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-semibold">{bid.profiles?.full_name || 'Anonymous'}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(bid.created_at).toLocaleString()}
                        </p>
                      </div>
                      <span className="font-bold text-primary">
                        ${bid.amount.toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Live Chat */}
            <LiveChat auctionId={auctionItem.id} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LiveAuction;
