// components/QuantityControl.tsx
import React, { useEffect, useState } from 'react';
import { useCartStore } from '@/stores/useCartStore';
import { CartItem } from '@/types/stores/cart';
import { Product } from '@/types/products';


export default function QuestCart({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const setCartQuantity = useCartStore((state) => state.setQuantity);

  useEffect(() => {
    const cartItem = useCartStore.getState().items.find(item => item.id === product.id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [product.id]);

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
    addItem({ ...product, quantity: 1 });
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
      if (quantity - 1 === 0) {
        removeItem(product.id);
      } else {
        setCartQuantity(product.id, quantity - 1);
      }
    }
  };

  return (
    <div className="flex items-center">
      {quantity === 0 ? (
        <button onClick={handleAdd} className="text-white bg-fta-primary-500 hover:bg-fta-primary-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add to cart
        </button>
      ) : (
        <div className="flex items-center">
          <button onClick={handleRemove} className="text-white bg-fta-primary-500 hover:bg-fta-primary-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            -
          </button>
          <span className="mx-2 text-fta-primary-500">{quantity}</span>
          <button onClick={handleAdd} className="text-white bg-fta-primary-500 hover:bg-fta-primary-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            +
          </button>
        </div>
      )}
    </div>
  );
}