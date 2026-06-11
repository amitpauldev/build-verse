import z from "zod";

export const productSchema = z.object({
	name: z
		.string()
		.min(3, { message: "Product name must be at least 3 characters" })
		.max(120, { message: "Product name must be less than 120 characters" }),

	slug: z
		.string()
		.min(5, { message: "Slug must be at least 5 characters" })
		.max(140, { message: "Slug must be less than 140 characters" })
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
			message:
				"Slug must be URL-friendly (lowercase letters, numbers, and hyphens only)",
		}),

	tagline: z
		.string()
		.max(200, { message: "Tagline must be less than 200 characters" }),

	description: z.string().optional(),

	websiteUrl: z.url({ message: "Please enter a valid URL" }).optional(),

	tags: z
		.string()
		.min(1, { message: "Please enter at least one tag" })
		.transform((str) => str.split(",").map((tag) => tag.trim().toLowerCase())),
});
