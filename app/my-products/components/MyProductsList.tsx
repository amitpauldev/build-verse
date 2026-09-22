import EmptyState from "@/components/common/EmptyState";
import { getLikedProductIds } from "@/lib/likes/like-queries";
import { getUserProducts } from "@/lib/products/product-select";
import { auth } from "@clerk/nextjs/server";
import { InboxIcon } from "lucide-react";
import MyProductsGrid from "./MyProductsGrid";

const MyProductsList = async () => {
	const { userId } = await auth();

	if (!userId) {
		return (
			<EmptyState
				icon={InboxIcon}
				message="Sign in to view and manage your products"
			/>
		);
	}

	const [products, likedIds] = await Promise.all([
		getUserProducts(userId),
		getLikedProductIds(userId),
	]);

	if (products.length === 0) {
		return (
			<EmptyState
				icon={InboxIcon}
				message="You have not submitted any products yet"
			/>
		);
	}

	return <MyProductsGrid products={products} likedIds={likedIds} />;
};

export default MyProductsList;
