"use client";

import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { InferSelectModel } from "drizzle-orm";
import { products } from "@/db/schema";

type ProductType = InferSelectModel<typeof products>;

export default function AdminActions({
	status,
	productId,
}: {
	status: string;
	productId: ProductType["id"];
}) {
	const handleApprove = async () => {
		console.log("Approve");
		// await approveProductAction(productId);
	};

	const handleReject = async () => {
		console.log("Reject");
		// await rejectProductAction(productId);
	};

	if (status !== "pending") return null;

	return (
		<div className="space-y-2">
			<div className="flex gap-2">
				<button
					type="button"
					onClick={handleApprove}
					className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black"
				>
					<CheckCircleIcon className="h-4 w-4" />
					Approve
				</button>

				<button
					type="button"
					onClick={handleReject}
					className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
				>
					<XCircleIcon className="h-4 w-4" />
					Reject
				</button>
			</div>
		</div>
	);
}
