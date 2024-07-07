'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import useSWR from 'swr'
import ProductCard from '../../Common/Products/card'
import ProductSkeleton from '../../Common/Products/skeleton'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function ProductGrid() {
  const [page, setPage] = useState(1);
  // const { data, error } = useSWR(`/api/products?page=${page}`, fetcher);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);
  const productsTest = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      imageUrl: "/products/000.jpg",
      description: "Product 1 description",
      rating: 4.5,
      reviews: 100,
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      imageUrl: "/products/000.jpg",
      description: "Product 2 description",
      rating: 4.5,
      reviews: 100,
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      imageUrl: "/products/000.jpg",
      description: "Product 3 description",
      rating: 4.5,
      reviews: 100,
    },
    {
      id: 4,
      name: "Product 4",
      price: 400,
      imageUrl: "/products/000.jpg",
      description: "Product 4 description",
      rating: 4.5,
      reviews: 100,
    },
    {
      id: 5,
      name: "Product 5",
      price: 500,
      imageUrl: "/products/000.jpg",
      description: "Product 5 description",
      rating: 4.5,
      reviews: 100,
    },
		{
      id: 5,
      name: "Product 5",
      price: 500,
      imageUrl: "/products/000.jpg",
      description: "Product 5 description",
      rating: 4.5,
      reviews: 100,
    },
		{
      id: 5,
      name: "Product 5",
      price: 500,
      imageUrl: "/products/000.jpg",
      description: "Product 5 description",
      rating: 4.5,
      reviews: 100,
    },
		{
      id: 5,
      name: "Product 5",
      price: 500,
      imageUrl: "/products/000.jpg",
      description: "Product 5 description",
      rating: 4.5,
      reviews: 100,
    },
		{
      id: 5,
      name: "Product 5",
      price: 500,
      imageUrl: "/products/000.jpg",
      description: "Product 5 description",
      rating: 4.5,
      reviews: 100,
    },

  ];

  // const products = data ? [].concat(...data) : []

  const products = productsTest;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
			{/* {products && (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
						{Array.from({ length: 10 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
					</div>
				)} */}
    </>
  );
}
