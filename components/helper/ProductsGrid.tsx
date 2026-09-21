import { getFeaturedProducts } from "@/lib/products/product-select";
import ProductCard from "../Products/ProductCard";
import { getLikedProductIds } from "@/lib/likes/like-queries";
import { auth } from "@clerk/nextjs/server";

const ProductsGrid = async () => {
	const FeaturedProducts = await getFeaturedProducts();

	const { userId } = await auth();
	const likedIds = userId ? await getLikedProductIds(userId) : [];
	return (
		<div className="grid-wrapper">
			{FeaturedProducts.map((product) => (
				<ProductCard
					key={product.id}
					product={product}
					initialLiked={likedIds.includes(product.id)}
				/>
			))}
		</div>
	);
};

export default ProductsGrid;
