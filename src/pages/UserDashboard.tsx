
import React, { useState, useEffect } from 'react';
import { User, Package, TrendingUp, DollarSign, Plus, Eye, Gavel } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MembershipStatus from '@/components/MembershipStatus';

interface UserProfile {
  id: string;
  role: string;
  full_name: string;
  email: string;
}

interface AuctionItem {
  id: string;
  title: string;
  current_bid: number;
  buy_now_price: number;
  status: string;
  bid_count: number;
  created_at: string;
}

interface Sale {
  id: string;
  item_title: string;
  sale_amount: number;
  seller_earnings: number;
  commission_amount: number;
  created_at: string;
}

const UserDashboard = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [userListings, setUserListings] = useState<AuctionItem[]>([]);
  const [userSales, setUserSales] = useState<Sale[]>([]);
  const [stats, setStats] = useState({
    activeListings: 0,
    totalSales: 0,
    totalViews: 0,
    profileViews: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profile) {
        setCurrentUser(profile);
      }
    } else {
      navigate('/register');
    }
  };

  const fetchUserData = async () => {
    if (!currentUser) return;

    // Fetch user's auction items
    const { data: listings } = await supabase
      .from('auction_items')
      .select('*')
      .eq('seller_id', currentUser.id)
      .order('created_at', { ascending: false });

    if (listings) {
      setUserListings(listings);
      setStats(prev => ({
        ...prev,
        activeListings: listings.filter(item => ['active', 'live'].includes(item.status)).length
      }));
    }

    // Fetch user's sales
    const { data: sales } = await supabase
      .from('sales')
      .select('*')
      .eq('seller_id', currentUser.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (sales) {
      setUserSales(sales);
      const totalSales = sales.reduce((sum, sale) => sum + Number(sale.seller_earnings), 0);
      setStats(prev => ({
        ...prev,
        totalSales: totalSales
      }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'live': return 'bg-red-100 text-red-800';
      case 'ended': return 'bg-gray-100 text-gray-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentUser.role === 'seller' ? 'Seller Dashboard' : 'Dashboard'}
              </h1>
              <p className="text-gray-600">
                Welcome back, {currentUser.full_name || currentUser.email}
              </p>
              <Badge variant="outline" className="mt-2">
                {currentUser.role}
              </Badge>
            </div>
            
            {currentUser.role === 'seller' && (
              <Button onClick={() => navigate('/list-item')}>
                <Plus className="h-4 w-4 mr-2" />
                List New Item
              </Button>
            )}
          </div>
        </div>

        {/* Membership Status for sellers */}
        {currentUser.role === 'seller' && (
          <div className="mb-8">
            <MembershipStatus />
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {currentUser.role === 'seller' ? 'Active Listings' : 'Watchlist Items'}
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeListings}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {currentUser.role === 'seller' ? 'Total Earnings' : 'Total Spent'}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalSales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,429</div>
              <p className="text-xs text-muted-foreground">
                +8% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                +3 from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content based on user role */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {currentUser.role === 'seller' ? (
            <>
              {/* Seller: Recent Listings */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Listings</CardTitle>
                  <CardDescription>Your latest gemstone listings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userListings.length === 0 ? (
                      <div className="text-center py-8">
                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No listings yet</p>
                        <Button className="mt-4" onClick={() => navigate('/list-item')}>
                          <Plus className="h-4 w-4 mr-2" />
                          Create Your First Listing
                        </Button>
                      </div>
                    ) : (
                      userListings.slice(0, 5).map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-gray-600">
                              Listed {new Date(item.created_at).toLocaleDateString()}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge className={getStatusColor(item.status)}>
                                {item.status}
                              </Badge>
                              {item.bid_count > 0 && (
                                <span className="text-sm text-gray-500">
                                  {item.bid_count} bids
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-semibold text-green-600">
                              ${(item.current_bid || item.buy_now_price || 0).toLocaleString()}
                            </span>
                            <div className="mt-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Seller: Sales Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                  <CardDescription>Your recent sales performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userSales.length === 0 ? (
                      <div className="text-center py-8">
                        <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No sales yet</p>
                      </div>
                    ) : (
                      userSales.map((sale) => (
                        <div key={sale.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                          <div>
                            <h4 className="font-medium">{sale.item_title}</h4>
                            <p className="text-sm text-gray-600">
                              Sold {new Date(sale.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="font-semibold text-green-600">
                              ${sale.seller_earnings.toLocaleString()}
                            </span>
                            <p className="text-xs text-gray-500">
                              Commission: ${sale.commission_amount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              {/* Buyer: Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bids</CardTitle>
                  <CardDescription>Your latest bidding activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <Gavel className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No recent bids</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Buyer: Watchlist */}
              <Card>
                <CardHeader>
                  <CardTitle>Watchlist</CardTitle>
                  <CardDescription>Items you're watching</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No watched items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;
