import { Suspense } from "react";
import MyProductsHeader from "./components/MyProductsHeader";
import MyProductsList from "./components/MyProductsList";
import ProductsSkeleton from "@/components/skeleton/ProductsSkeleton";

export default function MyProductsPage() {
	return (
		<main className="py-20">
			<div className="wrapper">
				<MyProductsHeader />
				<Suspense fallback={<ProductsSkeleton />}>
					<MyProductsList />
				</Suspense>
			</div>
		</main>
	);
}
