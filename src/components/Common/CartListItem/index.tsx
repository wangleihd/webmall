// components/CartItem.tsx
import React from 'react';
import Image from 'next/image';
import { useCartStore } from '@/stores/useCartStore';
import { CartItem as CartItemType } from '@/types/stores/cart';
import QuantityControl from '@/components/UI/QuestCart';
import { CartItem } from '@/types/stores/cart';

interface CartItemProps {
  item: CartItemType;
}

export default function CartListItem ({ item }: {item: CartItem}) {
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={80}
          height={80}
          className="rounded-lg"
        />
        <div className="ml-4">
          <h5 className="text-lg font-semibold text-fta-blake1">{item.name}</h5>
          <p className="text-sm t-text-fta-blake2">{item.description}</p>
          <div className="mt-2">
            <QuantityControl product={item} />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-lg font-bold text-fta-primary-500 mr-4">${item.price * item.quantity}</span>
        <button
          onClick={() => removeItem(item.id)}
          className="text-fta-blake bg-fta-accent6 hover:bg-fta-accent5 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
