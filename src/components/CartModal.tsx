
import React from 'react';
import { X, Trash2, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart Empty",
        description: "Please add items to your cart before checkout",
      });
      return;
    }

    toast({
      title: "Proceeding to Checkout",
      description: `Processing payment for $${getTotalPrice().toLocaleString()}`,
    });

    // Simulate payment process
    setTimeout(() => {
      clearCart();
      onClose();
      toast({
        title: "Payment Successful",
        description: "Your order has been processed successfully!",
      });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 max-h-96 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <img
                    src={`https://images.unsplash.com/${item.image}`}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="font-bold text-purple-600">
                      ${item.price.toLocaleString()}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {item.type === 'buy-now' ? 'Buy Now' : 'Current Bid'}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-lg font-bold text-purple-600">
                ${getTotalPrice().toLocaleString()}
              </span>
            </div>
            <div className="space-y-2">
              <Button onClick={handleCheckout} className="w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                Proceed to Checkout
              </Button>
              <Button variant="outline" onClick={clearCart} className="w-full">
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
