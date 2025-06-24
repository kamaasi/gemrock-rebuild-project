
-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('buyer', 'seller', 'administrator');

-- Create profiles table to store user information and roles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'buyer',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create auction items table
CREATE TABLE public.auction_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES public.profiles(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  images TEXT[],
  starting_bid DECIMAL(10,2),
  current_bid DECIMAL(10,2),
  buy_now_price DECIMAL(10,2),
  reserve_price DECIMAL(10,2),
  category TEXT NOT NULL,
  status TEXT DEFAULT 'draft', -- draft, active, live, ended, sold
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  bid_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bids table
CREATE TABLE public.bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_id UUID REFERENCES public.auction_items(id) NOT NULL,
  bidder_id UUID REFERENCES public.profiles(id) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create live chat messages table
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_id UUID REFERENCES public.auction_items(id) NOT NULL,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create offers table for direct offers on items
CREATE TABLE public.offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_id UUID REFERENCES public.auction_items(id) NOT NULL,
  buyer_id UUID REFERENCES public.profiles(id) NOT NULL,
  seller_id UUID REFERENCES public.profiles(id) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending', -- pending, accepted, rejected, expired
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auction_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for auction items
CREATE POLICY "Anyone can view active auction items" ON public.auction_items FOR SELECT USING (status IN ('active', 'live'));
CREATE POLICY "Sellers can view their own items" ON public.auction_items FOR SELECT USING (auth.uid() = seller_id);
CREATE POLICY "Sellers can insert their own items" ON public.auction_items FOR INSERT WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "Sellers can update their own items" ON public.auction_items FOR UPDATE USING (auth.uid() = seller_id);

-- Create RLS policies for bids
CREATE POLICY "Anyone can view bids for active auctions" ON public.bids FOR SELECT USING (true);
CREATE POLICY "Authenticated users can place bids" ON public.bids FOR INSERT WITH CHECK (auth.uid() = bidder_id);

-- Create RLS policies for chat messages
CREATE POLICY "Anyone can view chat messages" ON public.chat_messages FOR SELECT USING (true);
CREATE POLICY "Authenticated users can send messages" ON public.chat_messages FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for offers
CREATE POLICY "Sellers can view offers on their items" ON public.offers FOR SELECT USING (auth.uid() = seller_id);
CREATE POLICY "Buyers can view their own offers" ON public.offers FOR SELECT USING (auth.uid() = buyer_id);
CREATE POLICY "Buyers can create offers" ON public.offers FOR INSERT WITH CHECK (auth.uid() = buyer_id);
CREATE POLICY "Sellers can update offer status" ON public.offers FOR UPDATE USING (auth.uid() = seller_id);

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Enable realtime for chat messages
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;

-- Enable realtime for bids
ALTER TABLE public.bids REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bids;
