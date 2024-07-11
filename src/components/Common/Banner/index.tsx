import { Button } from "antd";
import Image from "next/image";
type Banner = {
	imageUrl: string,
	title: string,
	description: string,
}
export default function BannerInIndex({ banners }: { banners: Banner[] }) {

	return (
		<div className="relative w-full h-auto bg-fta-primary-50 flex flex-col md:flex-row">
			<div className="md:w-3/5 relative h-64 md:h-auto">
				<Image
					src="/products/banner.jpg"
					alt="Upgrade Your Wardrobe"
					layout="fill"
					objectFit="cover"
					className="z-0"
				/>
			</div>
			{/* 文字和按钮 */}
			<div className="md:w-2/5 p-4 lg:p-24 flex flex-col z-10">
				<h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
					Upgrade Your Wardrobe With Our Collection
				</h1>
				<p className="text-base md:text-lg lg:text-xl mb-4">
					Discover the latest trends and styles to enhance your fashion sense. Browse through our exclusive collection and find the perfect fit for every occasion.
				</p>
				<div className="space-x-4">
					<button className="text-white w-full lg:w-1/3 bg-fta-primary-400 hover:bg-fta-primary-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-2 text-center">
						Sign Up
					</button>
				</div>
			</div>
		</div>
	)
}