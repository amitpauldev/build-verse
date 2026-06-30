import SectionHeader from "@/components/common/SectionHeader";
import { CompassIcon } from "lucide-react";
import { getAllProducts } from "@/lib/products/product-select";
import ProductExplorer from "@/components/Products/ProductExplorer";
import { getLikedProductIds } from "@/lib/likes/like-queries";
import { auth } from "@clerk/nextjs/server";

const ExplorePage = async () => {
	const products = await getAllProducts();

	const { userId } = await auth();
	const likedIds = userId ? await getLikedProductIds(userId) : [];

	return (
		<div className="py-20">
			<div className="wrapper">
				<div className="mb-12">
					<SectionHeader
						title="Explore All Products"
						icon={CompassIcon}
						description="Browse and discover amazing projects from our community"
					/>
				</div>
				<ProductExplorer products={products} likedIds={likedIds} />
			</div>
		</div>
	);
};

export default ExplorePage;
