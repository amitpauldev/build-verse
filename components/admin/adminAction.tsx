"use client";

import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { InferSelectModel } from "drizzle-orm";
import { products } from "@/db/schema";
import { useTransition } from "react";
import { approveProduct, rejectProduct } from "@/lib/products/admin-actions";

type ProductType = InferSelectModel<typeof products>;

export default function AdminActions({
	status,
	productId,
	onActionSuccess,
}: {
	status: string;
	productId: ProductType["id"];
	onActionSuccess?: (newStatus: "approved" | "rejected") => void;
}) {
	const [isPending, startTransition] = useTransition();

	const handleApprove = async () => {
		startTransition(async () => {
			const result = await approveProduct(productId);
			if (result.success) {
				onActionSuccess?.("approved");
			} else {
				console.error(result.message);
			}
		});
	};

	const handleReject = async () => {
		startTransition(async () => {
			const result = await rejectProduct(productId);
			if (result.success) {
				onActionSuccess?.("rejected");
			} else {
				console.error(result.message);
			}
		});
	};

	if (status !== "pending") return null;

	return (
		<div className="space-y-2">
			<div className="flex gap-2">
				<button
					type="button"
					onClick={handleApprove}
					disabled={isPending}
					className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black disabled:opacity-50"
				>
					<CheckCircleIcon className="h-4 w-4" />
					Approve
				</button>

				<button
					type="button"
					onClick={handleReject}
					disabled={isPending}
					className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
				>
					<XCircleIcon className="h-4 w-4" />
					Reject
				</button>
			</div>
		</div>
	);
}
