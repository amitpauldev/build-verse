import React from "react";
import SectionHeader from "../common/SectionHeader";
import { CalendarIcon, RocketIcon } from "lucide-react";
import ProductCard from "../Products/ProductCard";
import EmptyState from "../common/EmptyState";

const recentlyLauncedProducts: any[] = [
	// {
	// 	id: 1,
	// 	title: "ParityKit",
	// 	description: "A tool for creating and sharing AI prompts",
	// 	tags: ["AI", "Prompts", "Tools"],
	// 	votes: 493,
	// 	isFeatured: true,
	// },
	// {
	// 	id: 2,
	// 	title: "ParityKit",
	// 	description: "A tool for creating and sharing AI prompts",
	// 	tags: ["AI", "Prompts", "Tools"],
	// 	votes: 493,
	// 	isFeatured: true,
	// },
];

const RecentlyLauncedProducts = () => {
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
							<ProductCard key={product.id} product={product} />
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
