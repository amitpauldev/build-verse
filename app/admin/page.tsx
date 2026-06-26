import AdminMain from "@/components/admin/AdminMain";
import StatsCard from "@/components/admin/stats-card";
import SectionHeader from "@/components/common/SectionHeader";
import { getAllProducts } from "@/lib/products/product-select";
import { ShieldIcon } from "lucide-react";

export default async function AdminPage() {
	const allProducts = await getAllProducts();

	const approvedProducts = allProducts.filter(
		(product) => product.status === "approved",
	);

	const pendingProducts = allProducts.filter(
		(product) => product.status === "pending",
	);

	const rejectedProducts = allProducts.filter(
		(product) => product.status === "rejected",
	);

	return (
		<div className="py-20">
			<div className="wrapper">
				<div className="mb-12">
					<SectionHeader
						title="Product Admin"
						icon={ShieldIcon}
						description="Review and manage submitted products"
					/>
				</div>

				<StatsCard
					approved={approvedProducts.length}
					pending={pendingProducts.length}
					rejected={rejectedProducts.length}
					all={allProducts.length}
				/>

				<AdminMain products={allProducts} />
			</div>
		</div>
	);
}
