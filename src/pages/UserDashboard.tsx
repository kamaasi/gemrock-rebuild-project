
import React, { useState } from 'react';
import { Upload, Package, Gavel, Eye, Edit, Trash2, Plus, DollarSign, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const dashboardTabs = [
    { id: 'overview', name: 'Overview', icon: Package },
    { id: 'upload', name: 'Upload Item', icon: Upload },
    { id: 'items', name: 'My Items', icon: Package },
    { id: 'auctions', name: 'My Auctions', icon: Gavel },
    { id: 'bids', name: 'My Bids', icon: DollarSign },
  ];

  const mockItems = [
    { id: 1, title: 'Diamond Ring 2.5ct', category: 'Diamonds', price: 12000, status: 'Active', views: 45, created: '2024-06-15' },
    { id: 2, title: 'Ruby Pendant', category: 'Rubies', price: 3500, status: 'Sold', views: 23, created: '2024-06-10' },
    { id: 3, title: 'Sapphire Earrings', category: 'Sapphires', price: 1800, status: 'Pending', views: 12, created: '2024-06-18' },
  ];

  const mockAuctions = [
    { id: 1, title: 'Emerald Necklace', currentBid: 5500, startingBid: 3000, bids: 15, status: 'Live', endTime: '2d 5h', watchers: 28 },
    { id: 2, title: 'Pearl Bracelet', currentBid: 0, startingBid: 800, bids: 0, status: 'Scheduled', endTime: '1d 12h', watchers: 8 },
    { id: 3, title: 'Opal Ring', currentBid: 2200, startingBid: 1500, bids: 8, status: 'Ended', endTime: 'Ended', watchers: 15 },
  ];

  const mockBids = [
    { id: 1, title: 'Diamond Tennis Bracelet', myBid: 8500, currentBid: 9200, status: 'Outbid', timeLeft: '1d 8h' },
    { id: 2, title: 'Ruby Ring Vintage', myBid: 3200, currentBid: 3200, status: 'Winning', timeLeft: '3h 22m' },
    { id: 3, title: 'Sapphire Pendant', myBid: 1800, currentBid: 2100, status: 'Lost', timeLeft: 'Ended' },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-3xl font-bold text-primary">12</p>
            </div>
            <Package className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Auctions</p>
              <p className="text-3xl font-bold text-primary">3</p>
            </div>
            <Gavel className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Earnings</p>
              <p className="text-3xl font-bold text-primary">$15,750</p>
            </div>
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Bids</p>
              <p className="text-3xl font-bold text-primary">5</p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span>New bid on Diamond Ring</span>
              <span className="text-sm text-gray-500">5 minutes ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span>Item approved: Sapphire Earrings</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span>Auction started: Emerald Necklace</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <h3 className="text-lg font-semibold mb-4">Performance Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Success Rate</span>
              <span className="font-semibold">85%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Sale Price</span>
              <span className="font-semibold">$2,850</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Views</span>
              <span className="font-semibold">1,245</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Rating</span>
              <span className="font-semibold">4.8/5.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Upload New Item</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg border">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Item Title</label>
              <Input placeholder="Enter item title..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diamonds">Diamonds</SelectItem>
                  <SelectItem value="rubies">Rubies</SelectItem>
                  <SelectItem value="sapphires">Sapphires</SelectItem>
                  <SelectItem value="emeralds">Emeralds</SelectItem>
                  <SelectItem value="pearls">Pearls</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={4}
              placeholder="Describe your item in detail..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Starting Price ($)</label>
              <Input type="number" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Buy Now Price ($)</label>
              <Input type="number" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Listing Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auction">Auction</SelectItem>
                  <SelectItem value="fixed">Fixed Price</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Drag and drop images here, or click to browse</p>
              <Button variant="outline" className="mt-4">
                Choose Files
              </Button>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button className="flex-1">
              Save as Draft
            </Button>
            <Button className="flex-1">
              Submit for Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderItems = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Items</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Item
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>${item.price.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={item.status === 'Active' ? 'default' : item.status === 'Sold' ? 'secondary' : 'outline'}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.views}</TableCell>
                <TableCell>{item.created}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  const renderAuctions = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Auctions</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Start New Auction
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Current Bid</TableHead>
              <TableHead>Starting Bid</TableHead>
              <TableHead>Bids</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time Left</TableHead>
              <TableHead>Watchers</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAuctions.map((auction) => (
              <TableRow key={auction.id}>
                <TableCell className="font-medium">{auction.title}</TableCell>
                <TableCell>
                  {auction.currentBid > 0 ? `$${auction.currentBid.toLocaleString()}` : 'No bids'}
                </TableCell>
                <TableCell>${auction.startingBid.toLocaleString()}</TableCell>
                <TableCell>{auction.bids}</TableCell>
                <TableCell>
                  <Badge variant={auction.status === 'Live' ? 'default' : auction.status === 'Ended' ? 'secondary' : 'outline'}>
                    {auction.status}
                  </Badge>
                </TableCell>
                <TableCell>{auction.endTime}</TableCell>
                <TableCell>{auction.watchers}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  const renderBids = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Bids</h2>

      <div className="bg-white rounded-lg shadow-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>My Bid</TableHead>
              <TableHead>Current Bid</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time Left</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBids.map((bid) => (
              <TableRow key={bid.id}>
                <TableCell className="font-medium">{bid.title}</TableCell>
                <TableCell>${bid.myBid.toLocaleString()}</TableCell>
                <TableCell>${bid.currentBid.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={bid.status === 'Winning' ? 'default' : bid.status === 'Outbid' ? 'outline' : 'secondary'}>
                    {bid.status}
                  </Badge>
                </TableCell>
                <TableCell>{bid.timeLeft}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {bid.status !== 'Lost' && bid.timeLeft !== 'Ended' && (
                      <Button size="sm">
                        Place Bid
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'upload':
        return renderUpload();
      case 'items':
        return renderItems();
      case 'auctions':
        return renderAuctions();
      case 'bids':
        return renderBids();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-lg border p-4">
              <h2 className="text-lg font-semibold mb-4 text-primary">Dashboard</h2>
              <nav className="space-y-2">
                {dashboardTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;
