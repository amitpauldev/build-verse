import SectionHeader from "../common/SectionHeader";
import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import ProductCard from "../Products/ProductCard";
import { getFeaturedProducts } from "@/lib/products/product-select";
import { getLikedProductIds } from "@/lib/likes/like-queries";
import { auth } from "@clerk/nextjs/server";

const FeaturedSection = async () => {
	const FeaturedProducts = await getFeaturedProducts();

	const { userId } = await auth();
	const likedIds = userId ? await getLikedProductIds(userId) : [];

	return (
		<div className="py-20 bg-muted/20">
			<div className="wrapper">
				<div className="flex items-center justify-between mb-8">
					<SectionHeader
						title="Featured Projects"
						icon={StarIcon}
						description="Top picks from our community this week"
					/>
					<Link href="/explore">
						<Button variant="outline" className="hidden sm:flex">
							See All
							<ArrowUpRightIcon className="size-4 ml-2" />
						</Button>
					</Link>
				</div>

				<div className="grid-wrapper">
					{FeaturedProducts.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							initialLiked={likedIds.includes(product.id)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default FeaturedSection;
