// pages/product/[id].tsx

import React, { useEffect, useRef } from 'react';
import { ProductData } from './data';
import { Button, Carousel, InputNumber, Rate, Tag } from 'antd';
import {useProductStore} from '@/stores/useProductStore';
import { useCartStore  } from '@/stores/useCartStore';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import type { CarouselRef } from 'antd/es/carousel';

// 定义产品数据的类型
interface Product {
	id: number;
  title: string;
  price: number;
  description: string;
  gallery: { url: string }[];
	image: string;
}

export default function ProductDetail() {
	const product: Product | null = ProductData;
	const { selectedImageIndex, setSelectedImageIndex } = useProductStore();
	const { totalQuantity, setQuantity, addItem, items } = useCartStore();
	const existingItem = items.find(item => item.id === product?.id);
	const quantity = existingItem ? existingItem.quantity : 0;

	const incQuantity = () => {
		setQuantity(product?.id, quantity + 1);
	};

	const decQuantity = () => {
		if (quantity > 1) {
			setQuantity(product?.id, quantity - 1);
		} else if (quantity === 1) {
			setQuantity(product?.id, 0);
		}
	};

	const handleAddToCart = () => {
		if (existingItem) {
			setQuantity(product?.id, quantity + 1);
		} else {
			addItem({
				id: Number(product.id),
				title: product.title,
				price: product.price,
				description: product.description,
				quantity: quantity + 1,
				image: product.gallery[0].url,
				name: product.title
			});
		}
	};


	const carouselRef = useRef<CarouselRef>(null);


	useEffect(() => {
		if (carouselRef.current) {
			carouselRef.current.goTo(selectedImageIndex, false);
		}
	}, [selectedImageIndex]);

	return (
		<div className="container mx-auto">
			<div className="flex flex-col md:flex-row">
				<div className="w-full md:w-1/2">
					<Carousel ref={carouselRef} afterChange={setSelectedImageIndex}>
						{product.gallery.map((image, index) => (
							<div key={index}>
								<img src={image.url} alt={product.title} className="w-full h-auto" />
							</div>
						))}
					</Carousel>
					<div className="flex flex-wrap gap-4 mt-5 mb-5">
						{product.gallery.map((image, index) => (
							<img
								key={index}
								src={image.url}
								alt={product.title}
								className={`w-16 h-16 border-2 cursor-pointer ${selectedImageIndex === index ? 'border-green-500' : 'border-gray3'} `}
								onClick={() => setSelectedImageIndex(index)}
							/>
						))}
					</div>
				</div>
				<div className="lg:w-1/2 p-4">
					<h1 className="text-2xl font-bold">Kenmore 2-Burner Portable Tabletop Retro Gas Grill</h1>
					<div className="flex items-center my-4">
						<Rate allowHalf defaultValue={4.5} className="my-2"></Rate>
						<div className="text-gray-700 text-md ml-4">4.5</div>
						<p className="text-gray-600 text-sm ml-2">(15 ratings)</p>
					</div>
					<div className="text-xl text-red-600 font-bold my-2">-13% $173.06</div>
					<div className="text-gray-500 text-sm line-through">$199.99</div>
					<Tag color="cyan">FREE Returns</Tag>
					<Tag color="red" className="my-4">Get $10 off instantly</Tag>

					<div className="my-4">
						<div className="font-bold">Color: Turquoise</div>
						<div className="flex space-x-2 my-2">
							<Button className="w-10 h-10" style={{ backgroundColor: '#d9f7be' }} />
							<Button className="w-10 h-10" style={{ backgroundColor: '#fadb14' }} />
							<Button className="w-10 h-10" style={{ backgroundColor: '#ff85c0' }} />
							<Button className="w-10 h-10" style={{ backgroundColor: '#ff7875' }} />
						</div>
					</div>

					<div className="my-4">
						<div className="font-bold">Brand: Kenmore</div>
						<div>Product Dimensions: 17.75"D x 21.5"W x 15.25"H</div>
						<div>Special Feature: Portable, Non-Stick Surface, Removable Grease Tray, Compact, Warming Rack</div>
						<div>Color: Turquoise</div>
						<div>Fuel Type: Gas</div>
					</div>

					<div className="my-4">
						<h2 className="text-lg font-bold">About this item</h2>
						<ul className="list-disc ml-4 text-gray-700">
							<li>Fast and Easy Assembly: The new Kenmore 2-Burner Retro Portable Gas Grill arrives almost fully pre-assembled for quick setup and mainly requires installation of the side handles.</li>
							<li>Generous Cooking Surface: Two-burner propane grill with 343 sq inches of grilling area, ideal for 9 burgers.</li>
							<li>Sleek Retro Design: Portable gas grill with nostalgic design, versatile for use on tabletop surfaces.</li>
							<li>Essential Features: Comes with electronic ignition, warming rack, propane tank hose, and 14,000 BTUs of cooking power.</li>
							<li>Compact Size with Side Handles and Foldable Legs: Perfect for camping, tailgating, and more.</li>
						</ul>
					</div>


					{quantity > 0 && (
						<div className="my-4 flex flex-col justify-end md:flex-row md:items-start">
							<div className='my-4 w-full mr-8'>
								<span className="mr-2">Quantity:</span>
								<Button onClick={() => decQuantity()}>-</Button>
								<span className="mx-2">{quantity}</span>
								<Button onClick={() => incQuantity()}>+</Button>
							</div>
							<div className="my-4 md:w-full" >
								<Link href="/cart">
									<Button type="primary">Go to Cart</Button>
								</Link>
							</div>
						</div>
					)}

					{quantity <= 0 && (
						<div className="my-4">
							<Button type="primary" className="my-4 w-full" onClick={handleAddToCart}>Add to Cart</Button>
						</div>
					)}

				</div>
			</div>
		</div>
	);
}

