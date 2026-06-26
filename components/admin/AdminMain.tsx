"use client";

import AdminProductCard from "@/components/admin/AdminProductCard";
import EmptyState from "@/components/common/EmptyState";
import { ProductType } from "@/types";
import { InboxIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

const AdminMain = ({ products }: { products: ProductType[] }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState("pending");

	const pendingProducts = products.filter(
		(product) => product.status === "pending",
	);

	const filteredProducts = () => {
		const allProducts = [...products];
		if (searchQuery.length > 0) {
			return allProducts.filter((product) =>
				product.name.toLowerCase().includes(searchQuery.toLowerCase()),
			);
		}

		if (sortBy === "pending") {
			return allProducts.filter((product) => product.status === "pending");
		}

		if (sortBy === "all") {
			return allProducts;
		}

		return allProducts;
	};
	return (
		<div className="flex flex-col gap-4 mt-5">
			<div className="flex flex-col md:flex-row gap-2">
				{/* Search Bar */}
				<div className="relative flex-1">
					<SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" />

					<input
						type="text"
						placeholder="Search products..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full rounded-lg border border-gray-300 bg-gray-900 py-4 pl-10 pr-4 text-sm outline-none transition focus:border-gray-200 focus:ring-2 focus:ring-white/10"
					/>
				</div>

				<div className="flex gap-2">
					{/* Sort Buttons */}
					<button
						onClick={() => setSortBy("pending")}
						className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium cursor-pointer transition ${
							sortBy === "pending"
								? "bg-white text-gray-900 "
								: "border border-gray-300 bg-gray-900 text-white hover:bg-black"
						}`}
					>
						Pending Products ({pendingProducts.length})
					</button>
					<button
						onClick={() => setSortBy("all")}
						className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium cursor-pointer transition ${
							sortBy === "all"
								? "bg-white text-gray-900 "
								: "border border-gray-300 bg-gray-900 text-white hover:bg-black"
						}`}
					>
						All Products ({products.length})
					</button>
				</div>
			</div>

			{filteredProducts().length > 0 ? (
				<div className="space-y-4">
					{filteredProducts().map((product) => (
						<AdminProductCard key={product.id} product={product} />
					))}
				</div>
			) : (
				<EmptyState icon={InboxIcon} message="No products found" />
			)}
		</div>
	);
};

export default AdminMain;
