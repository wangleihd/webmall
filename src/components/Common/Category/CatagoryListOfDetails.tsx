import type { Category } from "@/types/products";

export default function CatagoryListOfDetails() {

	const categories = [
		{
			id: 1,
			name: 'Electronics',
			products: [
				{ id: 1, title: 'Laptop', price: 999.99, imageUrl: '/products/laptop.jpg' },
				{ id: 2, title: 'Smartphone', price: 699.99, imageUrl: '/products/smartphone.jpg' },
				{ id: 3, title: 'Tablet', price: 499.99, imageUrl: '/products/tablet.jpg' },
			],
		},
		{
			id: 2,
			name: 'Home Appliances',
			products: [
				{ id: 4, title: 'Vacuum Cleaner', price: 199.99, imageUrl: '/products/001.jpg' },
				{ id: 5, title: 'Microwave', price: 89.99, imageUrl: '/products/002.jpg' },
				{ id: 6, title: 'Refrigerator', price: 599.99, imageUrl: '/products/003.jpg' },
			],
		},
		{
			id: 3,
			name: 'Furniture',
			products: [
				{ id: 7, title: 'Sofa', price: 799.99, imageUrl: '/products/003.jpg' },
				{ id: 8, title: 'Dining Table', price: 399.99, imageUrl: '/products/004.jpg' },
				{ id: 9, title: 'Chair', price: 99.99, imageUrl: '/products/005.jpg' },
			],
		},
	];

	
	return (
		<div className="border-2 border-fta-primary-300 rounded-md p-6 my-8 ml-8">
			<div className="container mx-auto py-2">
      {categories.map(category => (
        <div key={category.id} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.products.map(product => (
              <div key={product.id} className="border p-4 rounded shadow">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="w-full h-auto"
                />
                <h3 className="text-xl font-semibold mt-2">{product.title}</h3>
                <p className="text-lg text-green-600">${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

		</div>
	)
}