
import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface BuyNowHandlerProps {
  auctionId: string;
  buyNowPrice: number;
  itemTitle: string;
  sellerId: string;
  onPurchaseComplete?: () => void;
}

const BuyNowHandler: React.FC<BuyNowHandlerProps> = ({
  auctionId,
  buyNowPrice,
  itemTitle,
  sellerId,
  onPurchaseComplete
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleBuyNow = async () => {
    try {
      setIsProcessing(true);

      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to purchase this item",
          variant: "destructive"
        });
        return;
      }

      // Get user's membership for commission rate
      const { data: membership } = await supabase
        .from('user_memberships')
        .select(`
          *,
          membership_plans!inner(commission_rate)
        `)
        .eq('user_id', sellerId)
        .eq('status', 'active')
        .single();

      const commissionRate = membership?.membership_plans?.commission_rate || 15;
      const commissionAmount = (buyNowPrice * commissionRate) / 100;
      const sellerEarnings = buyNowPrice - commissionAmount;

      // Create sale record
      const { error: saleError } = await supabase
        .from('sales')
        .insert({
          seller_id: sellerId,
          buyer_id: user.id,
          item_title: itemTitle,
          sale_amount: buyNowPrice,
          commission_rate: commissionRate,
          commission_amount: commissionAmount,
          seller_earnings: sellerEarnings,
          payment_status: 'completed'
        });

      if (saleError) throw saleError;

      // Update auction item status to sold
      const { error: updateError } = await supabase
        .from('auction_items')
        .update({ 
          status: 'sold',
          updated_at: new Date().toISOString()
        })
        .eq('id', auctionId);

      if (updateError) throw updateError;

      toast({
        title: "Purchase Successful!",
        description: `You have successfully purchased ${itemTitle} for $${buyNowPrice.toLocaleString()}`,
      });

      onPurchaseComplete?.();

    } catch (error: any) {
      console.error('Purchase error:', error);
      toast({
        title: "Purchase Failed",
        description: error.message || "There was an error processing your purchase",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button 
      onClick={handleBuyNow}
      className="w-full bg-green-600 hover:bg-green-700"
      disabled={isProcessing}
    >
      <CreditCard className="h-4 w-4 mr-2" />
      {isProcessing ? 'Processing...' : `Buy Now - $${buyNowPrice.toLocaleString()}`}
    </Button>
  );
};

export default BuyNowHandler;
