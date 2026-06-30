"use client";

import React, { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import {
	ArrowDownIcon,
	ClockIcon,
	SearchIcon,
	TrendingUpIcon,
} from "lucide-react";
import { InferSelectModel } from "drizzle-orm";
import { products } from "@/db/schema";

type ProductType = InferSelectModel<typeof products>;

const ProductExplorer = ({
	products,
	likedIds,
}: {
	products: ProductType[];
	likedIds: number[];
}) => {
	const [sortBy, setSortBy] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	const filteredProductsFunc = () => {
		const allProducts = [...products];
		if (searchQuery.length > 0) {
			return allProducts.filter((product) =>
				product.name.toLowerCase().includes(searchQuery.toLowerCase()),
			);
		}

		if (sortBy === "trending") {
			return allProducts.sort((a, b) => b.voteCount - a.voteCount);
		}

		if (sortBy === "recent") {
			return allProducts.sort(
				(a, b) =>
					new Date(b.createdAt || "").getTime() -
					new Date(a.createdAt || "").getTime(),
			);
		}

		return allProducts;
	};
	const filteredProducts = filteredProductsFunc();

	return (
		<div>
			<div className="mb-8 flex flex-col gap-4 sm:flex-row">
				{/* Search Input */}
				<div className="relative flex-1">
					<SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" />

					<input
						type="text"
						placeholder="Search products..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full rounded-lg border border-gray-300 bg-gray-900 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-gray-200 focus:ring-2 focus:ring-white/10"
					/>
				</div>

				{/* Sort Buttons */}
				<div className="flex gap-2">
					<button
						onClick={() => setSortBy("all")}
						className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
							sortBy === "all"
								? "bg-black text-white dark:bg-white dark:text-black"
								: "border border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
						}`}
					>
						All
					</button>

					<button
						onClick={() => setSortBy("trending")}
						className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
							sortBy === "trending"
								? "bg-black text-white dark:bg-white dark:text-black"
								: "border border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
						}`}
					>
						<TrendingUpIcon className="h-4 w-4" />
						Trending
					</button>

					<button
						onClick={() => setSortBy("recent")}
						className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
							sortBy === "recent"
								? "bg-black text-white dark:bg-white dark:text-black"
								: "border border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
						}`}
					>
						<ClockIcon className="h-4 w-4" />
						Recent
					</button>
				</div>
			</div>

			{/* Product Count */}
			<div className="mb-6">
				<p className="text-sm text-gray-500">
					Showing {filteredProducts.length} products
				</p>
			</div>

			{/* Products Grid */}
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{filteredProducts.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						initialLiked={likedIds.includes(product.id)}
					/>
				))}
			</div>
		</div>
	);
};

export default ProductExplorer;
