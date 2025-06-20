
import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import CartModal from './CartModal';

const CartButton: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getItemCount } = useCart();

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsCartOpen(true)}
        className="relative"
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        Cart
        {getItemCount() > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
            {getItemCount()}
          </Badge>
        )}
      </Button>

      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  );
};

export default CartButton;
