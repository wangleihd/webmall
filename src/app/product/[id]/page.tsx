"use client"
import ProductDetailPage from "@/components/Layout/ProductDetail";
import { useParams, useRouter } from "next/navigation";



export default function Detail({ params }: { params: { id: string } }) {
	const router = useRouter();
	const { id } = useParams();

	return (
		<div className="relative mx-auto max-w-c-1440 mt-25 items-center justify-between align-items:flex-end px-4 md:px-8 2xl:px-0">
			<ProductDetailPage />
		</div>
	);
}