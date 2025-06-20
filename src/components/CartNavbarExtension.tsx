
import React from 'react';
import CartButton from './CartButton';

const CartNavbarExtension: React.FC = () => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <CartButton />
    </div>
  );
};

export default CartNavbarExtension;
