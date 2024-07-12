// components/CartItem.tsx
import React from 'react';
import Image from 'next/image';
import { useCartStore } from '@/stores/useCartStore';
import QuantityControl from '@/components/UI/QuestCart';
import { CartItem } from '@/types/stores/cart';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';

export default function CartListItem({ item }: { item: CartItem }) {
	const removeItem = useCartStore((state) => state.removeItem);

	return (
		<div className="flex flex-col md:flex-row items-center justify-between py-4 px-0  md:p-4 border-b border-gray-200">
			<div className="flex flex-col md:flex-row w-full md:w-auto items-center">
				<Image
					src={item.imageUrl}
					alt={item.name}
					width={96}
					height={96}
					className="rounded-lg w-full object-cover"
				/>
				<div className="md:mx-4 w-full text-left">
					<h5 className="my-2 md:my-0 text-lg font-semibold text-fta-blake1">{item.name}</h5>
					<p className="mb-2 md:mb-0 text-sm text-gray-500">{item.description}</p>
				</div>
			</div>
			<div className="flex justify-between items-end">
				<div className='md:w-28 w-36'>
					<div className="text-lg font-bold text-fta-primary-500">${item.price * item.quantity}</div>
					<div className="mt-1">
						<QuantityControl product={item} />
					</div>
				</div>
				<div className='md:w-8 w-36'>
					<div
						onClick={() => removeItem(item.id)}
						className="text-gray-500 hover:text-fta-primary-500 text-right text-3xl"
					>
						<CloseCircleOutlined />
					</div>
				</div>
			</div>
		</div>
	);
};
