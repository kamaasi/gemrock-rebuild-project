
-- Create membership plans table
CREATE TABLE public.membership_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  level INTEGER NOT NULL UNIQUE,
  price DECIMAL(10,2) NOT NULL,
  monthly_item_limit INTEGER NOT NULL,
  commission_rate DECIMAL(5,2) NOT NULL, -- Percentage (e.g., 10.00 for 10%)
  features JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default membership plans
INSERT INTO public.membership_plans (name, level, price, monthly_item_limit, commission_rate, features, description) VALUES
('Basic', 1, 9.99, 5, 15.00, '["Basic listing", "Email support", "Standard analytics"]', 'Perfect for new sellers getting started'),
('Professional', 2, 29.99, 20, 12.00, '["Priority listing", "Advanced analytics", "Phone support", "Featured placement"]', 'Ideal for growing businesses'),
('Premium', 3, 79.99, 100, 8.00, '["Unlimited featured listings", "Priority support", "Advanced marketing tools", "Custom branding", "Bulk upload tools"]', 'For high-volume professional sellers');

-- Create user memberships table
CREATE TABLE public.user_memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  plan_id UUID REFERENCES public.membership_plans NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled', 'pending')),
  items_posted_this_month INTEGER DEFAULT 0,
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '1 month'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sales tracking table
CREATE TABLE public.sales (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID REFERENCES auth.users NOT NULL,
  buyer_id UUID REFERENCES auth.users,
  item_title TEXT NOT NULL,
  sale_amount DECIMAL(10,2) NOT NULL,
  commission_rate DECIMAL(5,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  seller_earnings DECIMAL(10,2) NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create commission tracking table
CREATE TABLE public.commission_payouts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID REFERENCES auth.users NOT NULL,
  total_earnings DECIMAL(10,2) NOT NULL,
  payout_status TEXT NOT NULL DEFAULT 'pending' CHECK (payout_status IN ('pending', 'processing', 'completed', 'failed')),
  payout_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_payouts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for membership_plans (public read)
CREATE POLICY "Anyone can view membership plans" 
  ON public.membership_plans 
  FOR SELECT 
  USING (is_active = true);

-- RLS Policies for user_memberships
CREATE POLICY "Users can view their own membership" 
  ON public.user_memberships 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own membership" 
  ON public.user_memberships 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own membership" 
  ON public.user_memberships 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for sales
CREATE POLICY "Users can view their own sales" 
  ON public.sales 
  FOR SELECT 
  USING (auth.uid() = seller_id OR auth.uid() = buyer_id);

CREATE POLICY "System can insert sales" 
  ON public.sales 
  FOR INSERT 
  WITH CHECK (true);

-- RLS Policies for commission_payouts
CREATE POLICY "Users can view their own payouts" 
  ON public.commission_payouts 
  FOR SELECT 
  USING (auth.uid() = seller_id);

-- Function to reset monthly item counts
CREATE OR REPLACE FUNCTION reset_monthly_item_counts()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.user_memberships 
  SET 
    items_posted_this_month = 0,
    current_period_start = now(),
    current_period_end = now() + INTERVAL '1 month',
    updated_at = now()
  WHERE current_period_end <= now();
END;
$$;

-- Function to check if user can post item
CREATE OR REPLACE FUNCTION can_user_post_item(user_id UUID)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  membership_record RECORD;
BEGIN
  SELECT 
    um.items_posted_this_month,
    mp.monthly_item_limit,
    um.status
  INTO membership_record
  FROM public.user_memberships um
  JOIN public.membership_plans mp ON um.plan_id = mp.id
  WHERE um.user_id = can_user_post_item.user_id
    AND um.status = 'active'
  ORDER BY um.created_at DESC
  LIMIT 1;
  
  IF NOT FOUND THEN
    RETURN false;
  END IF;
  
  RETURN membership_record.items_posted_this_month < membership_record.monthly_item_limit;
END;
$$;
