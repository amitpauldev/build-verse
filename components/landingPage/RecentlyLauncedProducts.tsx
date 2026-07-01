import SectionHeader from "../common/SectionHeader";
import { CalendarIcon, RocketIcon } from "lucide-react";
import ProductCard from "../Products/ProductCard";
import EmptyState from "../common/EmptyState";
import { getRecentlyAddedProducts } from "@/lib/products/product-select";
import { auth } from "@clerk/nextjs/server";
import { getLikedProductIds } from "@/lib/likes/like-queries";

const RecentlyLauncedProducts = async () => {
	const recentlyLauncedProducts = await getRecentlyAddedProducts();

	const { userId } = await auth();
	const likedIds = userId ? await getLikedProductIds(userId) : [];

	return (
		<section className="py-20">
			<div className="wrapper">
				<SectionHeader
					title="Recently Launched"
					icon={RocketIcon}
					description="Discover the latest products from our community"
				/>

				{recentlyLauncedProducts.length > 0 ? (
					<div className="grid-wrapper">
						{recentlyLauncedProducts.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								initialLiked={likedIds.includes(product.id)}
							/>
						))}
					</div>
				) : (
					<EmptyState
						message="No products launched in the last week. Check back soon for new launches."
						icon={CalendarIcon}
					/>
				)}
			</div>
		</section>
	);
};

export default RecentlyLauncedProducts;
