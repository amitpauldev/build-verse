import {
	pgTable,
	serial,
	text,
	varchar,
	integer,
	timestamp,
	json,
	uniqueIndex,
	index,
	unique,
} from "drizzle-orm/pg-core";

// ============= PRODUCTS =============
export const products = pgTable(
	"products",
	{
		id: serial("id").primaryKey(),

		// Core product info
		name: varchar("name", { length: 120 }).notNull(),
		slug: varchar("slug", { length: 140 }).notNull(),
		tagline: varchar("tagline", { length: 200 }),
		description: text("description"),

		// Links & media
		websiteUrl: text("website_url"),
		tags: json("tags").$type<string[]>(), // e.g. ["AI", "Productivity"]

		// Voting
		voteCount: integer("vote_count").notNull().default(0),

		// Metadata
		createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
		approvedAt: timestamp("approved_at", { withTimezone: true }),
		status: varchar("status", { length: 20 }).default("pending"), // pending | approved | rejected
		submittedBy: varchar("submitted_by", { length: 120 }).default("anonymous"),
		userId: varchar("user_id", { length: 255 }), // Clerk user ID

		// Organization reference (for backend queries only)
		organizationId: varchar("organization_id", { length: 255 }), // Clerk org ID
	},
	(table) => ({
		slugIdx: uniqueIndex("products_slug_idx").on(table.slug),
		statusIdx: index("products_status_idx").on(table.status),
		organizationIdx: index("products_organization_idx").on(
			table.organizationId,
		),
	}),
);

// ============= Product Likes =============
export const productLikes = pgTable(
	"product_likes",
	{
		id: serial("id").primaryKey(),

		userId: varchar("user_id").notNull(),

		productId: integer("product_id")
			.notNull()
			.references(() => products.id, {
				onDelete: "cascade",
			}),

		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => ({
		uniqueLike: unique().on(table.userId, table.productId),
	}),
);
