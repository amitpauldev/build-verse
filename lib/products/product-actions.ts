"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { error } from "console";
import { productSchema } from "./validation-product";
import { db } from "@/db";
import { products } from "@/db/schema";
import z from "zod";

type FormState = {
	success: boolean;
	errors?: Record<string, string[]>;
	message: string;
};
//useActionState always calls the action like: action(prevState, formData)
export async function addProductAction(
	_prevState: FormState,
	formData: FormData,
) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return {
				success: false,
				message: "You must be logged in to submit a product.",
			};
		}

		const user = await currentUser();
		const userEmail = user?.emailAddresses?.[0]?.emailAddress || "anonymous";
		// console.log("Current user email:", user);

		const rawFormData = Object.fromEntries(formData.entries());

		// Validate the form data using Zod schema
		const validatedData = productSchema.safeParse(rawFormData);
		if (!validatedData.success) {
			return {
				success: false,
				errors: validatedData.error.flatten().fieldErrors, // Zod error from validation-field of productSchema
				message: "Invalid form data. Please try again.",
			};
		}

		const { name, slug, tagline, description, websiteUrl, tags } =
			validatedData.data;

		const tagsArray = tags ? tags.filter((tag) => typeof tag === "string") : []; // Ensure tags is an array of strings

		await db.insert(products).values({
			name,
			slug,
			tagline,
			description,
			websiteUrl,
			tags: tagsArray,

			userId: userId,
			submittedBy: userEmail,
			status: "pending",
		});

		return {
			success: true,
			message: "Product submitted successfully! It will be reviewed shortly.",
		};
	} catch (error) {
		// console.error("Error adding product:", error);
		if (error instanceof z.ZodError) {
			return {
				success: false,
				errors: error.flatten().fieldErrors,
				message: "Validation error. Please check your input.",
			};
		}
	}

	return {
		success: false,
		errors: undefined,
		message: "An error occurred while adding the product. Please try again.",
	};
}

// before submitting the form we need to:
// 1. check if the user is authenticated
// 2. extract the form data
// 3. validate the form data by Zod schema (optional but recommended)
// 4. transform the form data to match the database schema
// 5. create product in the database using drizzle-orm
// 6. revalidate the path to show the new product in the list
