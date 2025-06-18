
import React, { useState } from 'react';
import { Users, Package, Gavel, Settings, BarChart3, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const adminTabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'categories', name: 'Categories', icon: Package },
    { id: 'auctions', name: 'Live Auctions', icon: Gavel },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', joined: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Seller', status: 'Active', joined: '2024-02-20' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Admin', status: 'Active', joined: '2024-01-10' },
  ];

  const mockCategories = [
    { id: 1, name: 'Diamonds', count: 45, status: 'Active' },
    { id: 2, name: 'Rubies', count: 32, status: 'Active' },
    { id: 3, name: 'Sapphires', count: 28, status: 'Active' },
    { id: 4, name: 'Emeralds', count: 19, status: 'Active' },
  ];

  const mockAuctions = [
    { id: 1, title: 'Diamond Ring 3.5ct', seller: 'John Doe', currentBid: 15000, bids: 23, status: 'Live', endTime: '2h 30m' },
    { id: 2, title: 'Ruby Necklace', seller: 'Jane Smith', currentBid: 8500, bids: 12, status: 'Scheduled', endTime: '1d 5h' },
    { id: 3, title: 'Sapphire Earrings', seller: 'Bob Wilson', currentBid: 3200, bids: 8, status: 'Live', endTime: '45m' },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-primary">1,234</p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Auctions</p>
              <p className="text-3xl font-bold text-primary">56</p>
            </div>
            <Gavel className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-primary">$89,450</p>
            </div>
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Categories</p>
              <p className="text-3xl font-bold text-primary">12</p>
            </div>
            <Package className="h-8 w-8 text-primary" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg border">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span>New user registered: John Smith</span>
            <span className="text-sm text-gray-500">2 minutes ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span>Auction ended: Diamond Bracelet - Winner: Jane Doe</span>
            <span className="text-sm text-gray-500">15 minutes ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span>New item listed: Ruby Ring by Mike Wilson</span>
            <span className="text-sm text-gray-500">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="flex gap-4">
        <Input placeholder="Search users..." className="max-w-sm" />
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="seller">Seller</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg shadow-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.joined}</TableCell>
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

  const renderCategories = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Category Management</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead>Items Count</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.count}</TableCell>
                <TableCell>
                  <Badge variant="default">{category.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
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
        <h2 className="text-2xl font-bold">Live Auction Management</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Auction
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Current Bid</TableHead>
              <TableHead>Bids</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time Left</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAuctions.map((auction) => (
              <TableRow key={auction.id}>
                <TableCell className="font-medium">{auction.title}</TableCell>
                <TableCell>{auction.seller}</TableCell>
                <TableCell>${auction.currentBid.toLocaleString()}</TableCell>
                <TableCell>{auction.bids}</TableCell>
                <TableCell>
                  <Badge variant={auction.status === 'Live' ? 'default' : 'secondary'}>
                    {auction.status}
                  </Badge>
                </TableCell>
                <TableCell>{auction.endTime}</TableCell>
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

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">System Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <h3 className="text-lg font-semibold mb-4">Auction Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Default Auction Duration (hours)</label>
              <Input type="number" defaultValue="72" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Minimum Bid Increment (%)</label>
              <Input type="number" defaultValue="5" />
            </div>
            <Button>Save Changes</Button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <h3 className="text-lg font-semibold mb-4">Platform Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Commission Rate (%)</label>
              <Input type="number" defaultValue="10" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Payment Processing Fee (%)</label>
              <Input type="number" defaultValue="2.9" />
            </div>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'users':
        return renderUserManagement();
      case 'categories':
        return renderCategories();
      case 'auctions':
        return renderAuctions();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
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
              <h2 className="text-lg font-semibold mb-4 text-primary">Admin Panel</h2>
              <nav className="space-y-2">
                {adminTabs.map((tab) => (
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

export default AdminPanel;
