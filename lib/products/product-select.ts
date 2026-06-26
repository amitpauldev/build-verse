import { db } from "@/db";
import { products } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { connection } from "next/server";

export async function getFeaturedProducts() {
	const productsData = await db
		.select()
		.from(products)
		.where(eq(products.status, "approved"))
		.orderBy(desc(products.voteCount))
		.limit(6);

	return productsData;
}

export async function getAllProducts() {
	"use cache";
	const productsData = await db.select().from(products);
	// .where(eq(products.status, "approved"));
	return productsData;
}

export async function getRecentlyAddedProducts() {
	await connection(); // Ensure the database connection is established before querying
	const productsData = await getAllProducts();

	const oneWeekAgo = new Date();
	oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

	const recentlyAddedProducts = productsData.filter(
		(product) =>
			product.createdAt &&
			new Date(product.createdAt.toISOString()) >= oneWeekAgo,
	);

	return recentlyAddedProducts;
}

export async function getProductBySlug(slug: string) {
	// "use cache";
	const productData = await db
		.select()
		.from(products)
		.where(eq(products.slug, slug))
		.limit(1);

	console.log(productData);

	return productData?.[0] ?? null;
}
