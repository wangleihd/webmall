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
					<button onClick={handleRemove} className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
						<svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 124 124">
							<path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
						</svg>
					</button>
					<span className="mx-2.5 text-fta-primary-500">{quantity}</span>
					<button onClick={handleAdd} className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
						<svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 42 42">
							<path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
						</svg>

					</button>
				</div>
			)}
		</div>
	);
}