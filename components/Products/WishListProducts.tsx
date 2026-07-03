import { getLikedProductIds, getLikedProducts } from "@/lib/likes/like-queries";
import { auth } from "@clerk/nextjs/server";
import ProductCard from "./ProductCard";
import EmptyState from "../common/EmptyState";

const WishListProducts = async () => {
	const { userId } = await auth();
	const likedIds = userId ? await getLikedProductIds(userId) : [];
	const likedProducts = userId ? await getLikedProducts(userId) : [];

	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{likedProducts.length > 0 ? (
				likedProducts.map((product) => (
					<div key={product.product.id}>
						<span className="text-sm text-muted-foreground">
							Liked on: {new Date(product.likedAt).toLocaleDateString()} at{" "}
							{new Date(product.likedAt).toLocaleTimeString()}
						</span>
						<ProductCard
							product={product.product}
							initialLiked={likedIds.includes(product.product.id)}
						/>
					</div>
				))
			) : (
				<EmptyState message="You have no liked products" />
			)}
		</div>
	);
};

export default WishListProducts;
