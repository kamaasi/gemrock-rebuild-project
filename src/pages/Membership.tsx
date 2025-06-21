
import React, { useState, useEffect } from 'react';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
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
  const { toast } = useToast();

  useEffect(() => {
    fetchPlans();
    fetchCurrentMembership();
  }, []);

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

  const handleSelectPlan = async (planId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to select a membership plan",
        });
        return;
      }

      // In a real app, this would integrate with a payment processor
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
            Choose Your Membership Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the perfect plan for your selling needs. Each plan comes with different posting limits and commission rates.
          </p>
        </div>

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
                onClick={() => handleSelectPlan(plan.id)}
                className="w-full"
                variant={currentPlan === plan.id ? "secondary" : "default"}
                disabled={currentPlan === plan.id}
              >
                {currentPlan === plan.id ? "Current Plan" : "Select Plan"}
              </Button>
            </div>
          ))}
        </div>

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
