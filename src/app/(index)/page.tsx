import Category from "@/components/Common/Category";
import NewsLists from "@/components/Layout/NewsLists";
import ProductsLists from "@/components/Layout/ProductsLists";

export default function Home() {
  return (
    <main className="relative mx-auto max-w-c-1440 mt-5 mb-10 items-center justify-between align-items:flex-end px-4 md:px-8 2xl:px-0">
			{/* <Category />
			<ProductsLists /> */}

			<Category />
			<NewsLists />
    </main>
  );
}
