"use client";

import { Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { InferSelectModel } from "drizzle-orm";
import { products } from "@/db/schema";
import AdminActions from "./adminAction";
import { deleteProduct } from "@/lib/products/admin-actions";
import { useTransition } from "react";

type ProductType = InferSelectModel<typeof products>;

export default function AdminProductCard({
	product,
	onStatusChange,
	onDelete,
}: {
	product: ProductType;
	onStatusChange?: (productId: number, newStatus: "approved" | "rejected") => void;
	onDelete?: (productId: number) => void;
}) {
	const [isPending, startTransition] = useTransition();

	const handleDelete = () => {
		if (!window.confirm("Are you sure you want to delete this product?"))
			return;

		startTransition(async () => {
			const result = await deleteProduct(product.id);
			if (result.success) {
				onDelete?.(product.id);
			} else {
				console.error(result.message);
			}
		});
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-background p-6 transition-shadow hover:shadow-md text-white">
			<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
				<div className="min-w-0 flex-1 space-y-4">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-semibold">{product.name}</h2>

						<span
							className={cn(
								"rounded-full border px-2.5 py-1 text-xs font-medium capitalize",
								product.status === "pending" &&
									"border-yellow-600 bg-yellow-600/10 text-yellow-600",
								product.status === "approved" &&
									"border-green-500 bg-green-500/10 text-green-600",
								product.status === "rejected" &&
									"border-red-500 bg-red-500/10 text-red-500",
							)}
						>
							{product.status}
						</span>
					</div>

					<p className="text-sm">{product.tagline}</p>

					<div className="flex flex-wrap gap-2">
						{product.tags?.map((tag) => (
							<span
								key={tag}
								className="rounded-full bg-primary px-2.5 py-1 text-xs font-medium"
							>
								{tag}
							</span>
						))}
					</div>

					<div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
						<p>
							<span className="font-semibold">By:</span> {product.submittedBy}
						</p>

						<p>
							{product.createdAt
								? new Intl.DateTimeFormat("en-US", {
										year: "numeric",
										month: "short",
										day: "numeric",
									}).format(new Date(product.createdAt.toISOString()))
								: ""}
						</p>

						<a
							href={product.websiteUrl ?? "#"}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:underline"
						>
							Visit Website
						</a>
					</div>

					<div>
						<button
							onClick={handleDelete}
							disabled={isPending}
							className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-red-500 cursor-pointer disabled:opacity-50"
						>
							<Trash2Icon className="h-4 w-4" />
							Delete
						</button>
					</div>
				</div>

				<div className="lg:shrink-0">
					<AdminActions
						status={product.status ?? ""}
						productId={product.id}
						onActionSuccess={(newStatus) =>
							onStatusChange?.(product.id, newStatus)
						}
					/>
				</div>
			</div>
		</div>
	);
}
