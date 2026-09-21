import ProductExplorer from "../Products/ProductExplorer";
import { getAllProducts } from "@/lib/products/product-select";
import { auth } from "@clerk/nextjs/server";
import { getLikedProductIds } from "@/lib/likes/like-queries";

const ExploreProducts = async () => {
	const products = await getAllProducts();

	const { userId } = await auth();
	const likedIds = userId ? await getLikedProductIds(userId) : [];

	return (
		<>
			<ProductExplorer products={products} likedIds={likedIds} />
		</>
	);
};

export default ExploreProducts;
