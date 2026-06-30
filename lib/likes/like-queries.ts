import { db } from "@/db";
import { productLikes } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function hasUserLikedProduct(userId: string, productId: number) {
	const [like] = await db
		.select()
		.from(productLikes)
		.where(
			and(
				eq(productLikes.userId, userId),
				eq(productLikes.productId, productId),
			),
		)
		.limit(1);

	return !!like;
}

// this helps us get all the product ids that a user has liked
export async function getLikedProductIds(userId: string): Promise<number[]> {
	const likedProducts = await db
		.select({
			productId: productLikes.productId,
		})
		.from(productLikes)
		.where(eq(productLikes.userId, userId));

	return likedProducts.map((like) => like.productId); // [1, 5, 8,...]
}
