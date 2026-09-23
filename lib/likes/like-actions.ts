"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";

import { and, eq, sql } from "drizzle-orm";
import { productLikes, products } from "@/db/schema";
import { updateTag } from "next/cache";

export async function toggleLike(productId: number) {
	const { userId } = await auth();

	if (!userId) {
		return {
			liked: false,
			error: "You must be signed in to like a product",
		};
	}

	const [existingLike] = await db
		.select()
		.from(productLikes)
		.where(
			and(
				eq(productLikes.userId, userId),
				eq(productLikes.productId, productId),
			),
		)
		.limit(1);

	if (existingLike) {
		// Unlike
		await db.delete(productLikes).where(eq(productLikes.id, existingLike.id));

		await db
			.update(products)
			.set({
				voteCount: sql`${products.voteCount} - 1`,
			})
			.where(eq(products.id, productId));

		updateTag(`liked-products-${userId}`);
		updateTag(`your-liked-products-${userId}`);
		updateTag("get-all-products");
		updateTag("featured-products");
		return {
			liked: false,
			error: null,
		};
	}

	// Like
	await db.insert(productLikes).values({
		userId,
		productId,
	});

	await db
		.update(products)
		.set({
			voteCount: sql`${products.voteCount} + 1`,
		})
		.where(eq(products.id, productId));

	updateTag(`liked-products-${userId}`);
	updateTag(`your-liked-products-${userId}`);
	updateTag("get-all-products");
	updateTag("featured-products");
	return {
		liked: true,
		error: null,
	};
}
