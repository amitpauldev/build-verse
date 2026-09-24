"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";

type ActionResult = {
	success: boolean;
	message: string;
};

export async function approveProduct(
	productId: number,
): Promise<ActionResult> {
	try {
		const { userId } = await auth();

		if (!userId) {
			return {
				success: false,
				message: "You must be signed in to perform this action.",
			};
		}

		await db
			.update(products)
			.set({
				status: "approved",
				approvedAt: new Date(),
			})
			.where(eq(products.id, productId));

		updateTag("get-all-products");

		return {
			success: true,
			message: "Product approved successfully.",
		};
	} catch (error) {
		console.error("Error approving product:", error);
		return {
			success: false,
			message: "Failed to approve product. Please try again.",
		};
	}
}

export async function rejectProduct(
	productId: number,
): Promise<ActionResult> {
	try {
		const { userId } = await auth();

		if (!userId) {
			return {
				success: false,
				message: "You must be signed in to perform this action.",
			};
		}

		await db
			.update(products)
			.set({
				status: "rejected",
			})
			.where(eq(products.id, productId));

		updateTag("get-all-products");

		return {
			success: true,
			message: "Product rejected successfully.",
		};
	} catch (error) {
		console.error("Error rejecting product:", error);
		return {
			success: false,
			message: "Failed to reject product. Please try again.",
		};
	}
}

export async function deleteProduct(
	productId: number,
): Promise<ActionResult> {
	try {
		const { userId } = await auth();

		if (!userId) {
			return {
				success: false,
				message: "You must be signed in to perform this action.",
			};
		}

		await db.delete(products).where(eq(products.id, productId));

		updateTag("get-all-products");

		return {
			success: true,
			message: "Product deleted successfully.",
		};
	} catch (error) {
		console.error("Error deleting product:", error);
		return {
			success: false,
			message: "Failed to delete product. Please try again.",
		};
	}
}
