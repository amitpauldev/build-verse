"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";

import { and, eq, sql } from "drizzle-orm";
import { productLikes, products } from "@/db/schema";

export async function toggleLike(productId: number) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("Unauthorized");
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

		return {
			liked: false,
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

	return {
		liked: true,
	};
}
