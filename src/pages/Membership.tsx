import React, { useState, useEffect } from 'react';
import { Check, Crown, Star, Zap, User, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Json } from '@/integrations/supabase/types';

interface MembershipPlan {
  id: string;
  name: string;
  level: number;
  price: number;
  monthly_item_limit: number;
  commission_rate: number;
  features: string[];
  description: string;
}

const Membership = () => {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [signingUp, setSigningUp] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAuthenticated(!!user);
    
    if (user) {
      fetchCurrentMembership();
    }
  };

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('membership_plans')
        .select('*')
        .eq('is_active', true)
        .order('level');

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedPlans = data?.map(plan => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features as string[] : []
      })) || [];
      
      setPlans(transformedPlans);
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast({
        title: "Error",
        description: "Failed to load membership plans",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentMembership = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_memberships')
        .select('plan_id')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      if (data) {
        setCurrentPlan(data.plan_id);
      }
    } catch (error) {
      console.error('Error fetching current membership:', error);
    }
  };

  const handlePlanSelection = (planId: string) => {
    if (!isAuthenticated) {
      setSelectedPlan(planId);
      setShowSignUp(true);
      return;
    }
    
    handleSelectPlan(planId);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (signUpData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    setSigningUp(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/membership`
        }
      });

      if (error) throw error;

      if (data.user) {
        // Automatically assign the selected plan
        if (selectedPlan) {
          await handleSelectPlan(selectedPlan);
        }
        
        toast({
          title: "Welcome to GemRock!",
          description: "Account created successfully. You can now start selling!",
        });
        
        setShowSignUp(false);
        setIsAuthenticated(true);
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Sign Up Failed",
        description: error.message || "Failed to create account",
        variant: "destructive"
      });
    } finally {
      setSigningUp(false);
    }
  };

  const handleSelectPlan = async (planId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_memberships')
        .upsert({
          user_id: user.id,
          plan_id: planId,
          status: 'active',
          items_posted_this_month: 0,
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your membership plan has been updated",
      });

      setCurrentPlan(planId);
    } catch (error) {
      console.error('Error selecting plan:', error);
      toast({
        title: "Error",
        description: "Failed to update membership plan",
        variant: "destructive"
      });
    }
  };

  const getPlanIcon = (level: number) => {
    switch (level) {
      case 1: return <Star className="h-8 w-8" />;
      case 2: return <Zap className="h-8 w-8" />;
      case 3: return <Crown className="h-8 w-8" />;
      default: return <Star className="h-8 w-8" />;
    }
  };

  const getPlanColor = (level: number) => {
    switch (level) {
      case 1: return 'border-blue-200 bg-blue-50';
      case 2: return 'border-purple-200 bg-purple-50';
      case 3: return 'border-gold-200 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Loading membership plans...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Start Selling Your Gemstones Today
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of sellers on GemRock. Choose your membership plan and start earning with lower commission rates.
          </p>
        </div>

        {!isAuthenticated && (
          <div className="text-center mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                New to GemRock?
              </h3>
              <p className="text-blue-700 mb-4">
                Select a plan below to create your seller account and start listing your gemstones
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 ${getPlanColor(plan.level)} border-2 ${
                plan.level === 3 ? 'transform scale-105' : ''
              }`}
            >
              {plan.level === 3 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="text-primary mb-4">
                  {getPlanIcon(plan.level)}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="text-4xl font-bold text-primary">
                  ${plan.price}
                  <span className="text-lg font-normal text-gray-600">/month</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span>Monthly Item Limit:</span>
                  <span className="font-semibold">{plan.monthly_item_limit}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Commission Rate:</span>
                  <span className="font-semibold">{plan.commission_rate}%</span>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Features:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button
                onClick={() => handlePlanSelection(plan.id)}
                className="w-full"
                variant={currentPlan === plan.id ? "secondary" : "default"}
                disabled={currentPlan === plan.id}
              >
                {currentPlan === plan.id ? "Current Plan" : 
                 isAuthenticated ? "Select Plan" : "Sign Up & Select Plan"}
              </Button>
            </div>
          ))}
        </div>

        {/* Sign Up Modal */}
        {showSignUp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Create Your Seller Account
                </CardTitle>
                <CardDescription>
                  Sign up to start selling on GemRock
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        className="pl-10"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        className="pl-10"
                        value={signUpData.confirmPassword}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowSignUp(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={signingUp}
                    >
                      {signingUp ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* How It Works Section */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="font-semibold mb-2">Choose Your Plan</h3>
              <p className="text-gray-600">Select a membership tier that fits your selling volume</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="font-semibold mb-2">List Your Items</h3>
              <p className="text-gray-600">Post gemstones within your monthly limit</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="font-semibold mb-2">Earn Revenue</h3>
              <p className="text-gray-600">Keep more of your earnings with lower commission rates</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Membership;
