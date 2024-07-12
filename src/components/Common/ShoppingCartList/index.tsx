import { useState } from 'react';
import { CartItem } from '@/types/stores/cart';
import CartListItem from '../CartListItem';

type ShoppingCartListProps = {
  items: CartItem[];
};

export default function ShoppingCartList({ items }: ShoppingCartListProps) {
  const [cartItems] = useState<CartItem[]>(items);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1">
        {cartItems.map((item) => (
					<CartListItem item={item} />
        ))}
      </div>

      <div className="w-full md:w-1/3 md:ml-4 sx:ml-0 sm:ml-0 p-4 bg-fta-primary-50">
        <h2 className="text-2xl font-bold">Product Summary</h2>
        <p className="text-gray-500">No products selected</p>
        <div className="border-t mt-4 pt-4">
          <p className="flex justify-between">
            <span>Total Price</span>
            <span>${totalPrice}</span>
          </p>
          <p className="flex justify-between">
            <span>Total Price (Discount)</span>
            <span>$0</span>
          </p>
          <p className="flex justify-between">
            <span>Tax & Fee</span>
            <span>$0</span>
          </p>
          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total Price</span>
            <span>${totalPrice}</span>
          </div>
          <button className="mt-4 bg-fta-primary-500">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
