
import React, { useState, useEffect } from 'react';
import { Crown, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface MembershipData {
  plan_name: string;
  plan_level: number;
  monthly_item_limit: number;
  items_posted_this_month: number;
  commission_rate: number;
  current_period_end: string;
  status: string;
}

const MembershipStatus: React.FC = () => {
  const [membership, setMembership] = useState<MembershipData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembershipStatus();
  }, []);

  const fetchMembershipStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_memberships')
        .select(`
          *,
          membership_plans!inner(name, level, monthly_item_limit, commission_rate)
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setMembership({
          plan_name: data.membership_plans.name,
          plan_level: data.membership_plans.level,
          monthly_item_limit: data.membership_plans.monthly_item_limit,
          items_posted_this_month: data.items_posted_this_month,
          commission_rate: data.membership_plans.commission_rate,
          current_period_end: data.current_period_end,
          status: data.status,
        });
      }
    } catch (error) {
      console.error('Error fetching membership:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUsagePercentage = () => {
    if (!membership) return 0;
    return (membership.items_posted_this_month / membership.monthly_item_limit) * 100;
  };

  const getDaysRemaining = () => {
    if (!membership) return 0;
    const endDate = new Date(membership.current_period_end);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return <div className="bg-white p-6 rounded-lg shadow-lg border">Loading membership status...</div>;
  }

  if (!membership) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg border">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Active Membership</h3>
          <p className="text-gray-600 mb-4">You need a membership plan to start selling</p>
          <Button onClick={() => navigate('/membership')}>
            Choose a Plan
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Crown className="h-6 w-6 text-primary" />
          <div>
            <h3 className="text-lg font-semibold">{membership.plan_name} Plan</h3>
            <Badge variant="secondary">{membership.status}</Badge>
          </div>
        </div>
        <Button variant="outline" onClick={() => navigate('/membership')}>
          Upgrade Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Monthly Posts Used</span>
              <span className="text-sm font-medium">
                {membership.items_posted_this_month} / {membership.monthly_item_limit}
              </span>
            </div>
            <Progress value={getUsagePercentage()} className="h-2" />
            {getUsagePercentage() > 80 && (
              <p className="text-sm text-orange-600 mt-1">
                ⚠️ You're running low on monthly posts
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Commission Rate</span>
            <span className="font-semibold text-green-600">{membership.commission_rate}%</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Days Remaining</span>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="font-semibold">{getDaysRemaining()} days</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Plan Level</span>
            <Badge variant="outline">Level {membership.plan_level}</Badge>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span className="font-medium">Earnings Potential</span>
        </div>
        <p className="text-sm text-gray-600">
          With your {membership.plan_name} plan, you keep {100 - membership.commission_rate}% of each sale. 
          Lower commission rates mean more earnings for you!
        </p>
      </div>
    </div>
  );
};

export default MembershipStatus;
