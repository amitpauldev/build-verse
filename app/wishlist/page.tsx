import SectionHeader from "@/components/common/SectionHeader";
import WishListProducts from "@/components/Products/WishListProducts";
import ProductsSkeleton from "@/components/skeleton/ProductsSkeleton";
import { HeartIcon } from "lucide-react";
import { Suspense } from "react";

export default function WishList() {
	return (
		<div className="wrapper py-20">
			<SectionHeader
				title="Wishlist"
				icon={HeartIcon}
				description="Your favorite products"
			/>
			<Suspense fallback={<ProductsSkeleton />}>
				<WishListProducts />
			</Suspense>
		</div>
	);
}
