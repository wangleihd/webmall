export default function TextPage() {
	return (
		<div className="bg-gray-50 text-gray-800">
			<header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
				<div className="flex items-center">
					<img src="/ftalogo.png" alt="FTANails Logo" className="h-10" />
					<h1 className="text-2xl font-bold ml-2 text-primarygpt-dark">FTANails</h1>
				</div>
				<nav className="space-x-4">
					<a href="#" className="text-gray-600 hover:text-primarygpt-dark">Home</a>
					<a href="#" className="text-gray-600 hover:text-primarygpt-dark">Shop</a>
					<a href="#" className="text-gray-600 hover:text-primarygpt-dark">About Us</a>
					<a href="#" className="text-gray-600 hover:text-primarygpt-dark">Contact</a>
				</nav>
			</header>
			<section className="bg-primarygpt-light text-center py-16">
				<h2 className="text-4xl font-bold text-primarygpt-dark">Discover the Latest Trends</h2>
				<p className="mt-4 text-lg text-gray-700">Explore our collection of high-quality, stylish products.</p>
				<button className="mt-8 bg-accentgtp text-white py-2 px-4 rounded hover:bg-accentgtpgtp-dark">Shop Now</button>
			</section>

			<section className="max-w-7xl mx-auto py-16">
				<h3 className="text-3xl font-bold text-center text-primarygpt-dark">Featured Products</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
					<div className="bg-white p-4 rounded-lg shadow">
						<img src="https://via.placeholder.com/300" alt="Product 1" className="w-full h-64 object-cover rounded-t-lg" />
						<h4 className="text-xl font-semibold mt-4 text-primarygpt-dark">Product Name 1</h4>
						<p className="text-gray-600 mt-2">$49.99</p>
						<button className="mt-4 bg-primarygpt text-white py-2 px-4 rounded hover:bg-primarygpt-dark">Add to Cart</button>
					</div>
					<div className="bg-white p-4 rounded-lg shadow">
						<img src="https://via.placeholder.com/300" alt="Product 2" className="w-full h-64 object-cover rounded-t-lg" />
						<h4 className="text-xl font-semibold mt-4 text-primarygpt-dark">Product Name 2</h4>
						<p className="text-gray-600 mt-2">$59.99</p>
						<button className="mt-4 bg-primarygpt text-white py-2 px-4 rounded hover:bg-primarygpt-dark">Add to Cart</button>
					</div>
					<div className="bg-white p-4 rounded-lg shadow">
						<img src="https://via.placeholder.com/300" alt="Product 3" className="w-full h-64 object-cover rounded-t-lg" />
						<h4 className="text-xl font-semibold mt-4 text-primarygpt-dark">Product Name 3</h4>
						<p className="text-gray-600 mt-2">$39.99</p>
						<button className="mt-4 bg-primarygpt text-white py-2 px-4 rounded hover:bg-primarygpt-dark">Add to Cart</button>
					</div>
				</div>
			</section>

			<section className="bg-gray-100 text-center py-16">
				<h3 className="text-3xl font-bold text-primarygpt-dark">Stay Updated</h3>
				<p className="mt-4 text-lg text-gray-700">Subscribe to our newsletter to receive the latest news and exclusive offers.</p>
				<form className="mt-8 flex justify-center">
					<input type="email" placeholder="Enter your email" className="p-2 rounded-l text-gray-800 border border-gray-300" />
					<button className="bg-accentgtp text-white py-2 px-4 rounded-r hover:bg-accentgtp-dark">Subscribe</button>
				</form>
			</section>

			{/* Footer */}
			<footer className="bg-white border-t border-gray-200 p-4 text-center">
				<p className="text-gray-600">© 2024 FTANails. All rights reserved.</p>
			</footer>
		</div>
	);
}