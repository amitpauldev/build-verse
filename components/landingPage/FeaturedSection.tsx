"use cache";

import SectionHeader from "../common/SectionHeader";
import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import ProductCard from "../Products/ProductCard";
import { getFeaturedProducts } from "@/lib/products/product-select";

// const FeaturedProducts = [
// 	{
// 		id: 1,
// 		title: "ParityKit",
// 		description: "A tool for creating and sharing AI prompts",
// 		tags: ["AI", "Prompts", "Tools"],
// 		votes: 493,
// 		isFeatured: true,
// 	},
// 	{
// 		id: 2,
// 		title: "ParityKit",
// 		description: "A tool for creating and sharing AI prompts",
// 		tags: ["AI", "Prompts", "Tools"],
// 		votes: 493,
// 		isFeatured: true,
// 	},
// 	{
// 		id: 3,
// 		title: "ParityKit",
// 		description: "A tool for creating and sharing AI prompts",
// 		tags: ["AI", "Prompts", "Tools"],
// 		votes: 493,
// 		isFeatured: true,
// 	},
// 	{
// 		id: 4,
// 		title: "ParityKit",
// 		description: "A tool for creating and sharing AI prompts",
// 		tags: ["AI", "Prompts", "Tools"],
// 		votes: 493,
// 		isFeatured: true,
// 	},
// ];

const FeaturedSection = async () => {
	const FeaturedProducts = await getFeaturedProducts();
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
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</div>
	);
};

export default FeaturedSection;
