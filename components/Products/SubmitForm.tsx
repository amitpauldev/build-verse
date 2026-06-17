"use client";

import React, { useActionState, useEffect, useState } from "react";
import FormField from "./FormField";
import { addProductAction } from "@/lib/products/product-actions";

const initialState = {
	message: "",
	errors: undefined,
	success: false,
};

type FormState = {
	success: boolean;
	errors?: Record<string, string[]>;
	message: string;
};

const SubmitForm = () => {
	const [state, action, pending] = useActionState(
		addProductAction,
		initialState,
	);
	const { message, success, errors }: FormState = state;

	// Uncontrolled inputs always return empty string when the form is submitted. For preserve values, we need to control input values
	const [formState, setFormState] = useState<Record<string, string>>({});
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormState((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	// Clear form values after successful submission
	useEffect(() => {
		if (success) {
			setFormState({});
		}
	}, [success]);

	return (
		<form action={action} className="bg-muted p-6 rounded-lg shadow-md">
			<FormField
				label="Product Name"
				name="name"
				id="name"
				placeholder="Enter your product name"
				required={true}
				onChange={handleChange}
				value={formState.name || ""}
				error={errors?.name || []}
				helperText="This will be the title of your product listing."
			/>

			<FormField
				label="Slug"
				name="slug"
				id="slug"
				placeholder="my-product-slug"
				required={true}
				onChange={handleChange}
				value={formState.slug || ""}
				error={errors?.slug || []}
				helperText="A unique slug will be used in the URL"
			/>

			<FormField
				label="TagLine"
				name="tagline"
				id="tagline"
				placeholder="Enter a catchy tagline for your product"
				required={true}
				onChange={handleChange}
				value={formState.tagline || ""}
				error={errors?.tagline || []}
				helperText="A short and engaging tagline to describe your product."
			/>

			<FormField
				label="Description"
				name="description"
				id="description"
				placeholder="Describe your product in detail"
				required={true}
				onChange={handleChange}
				value={formState.description || ""}
				error={errors?.description || []}
				helperText="Provide a detailed description."
				textarea={true}
			/>

			<FormField
				label="Website URL"
				name="websiteUrl"
				id="websiteUrl"
				placeholder="https://www.yourproduct.com"
				required={true}
				onChange={handleChange}
				value={formState.websiteUrl || ""}
				error={errors?.websiteUrl || []}
				helperText="The official website for your product."
			/>

			<FormField
				label="Tags"
				name="tags"
				id="tags"
				placeholder="AI, Productivity, SaaS"
				required={true}
				onChange={handleChange}
				value={formState.tags || ""}
				error={errors?.tags || []}
				helperText="Comma-separated list of tags."
			/>

			<button
				type="submit"
				className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold py-3 cursor-pointer"
				disabled={pending}
			>
				{pending ? "Submitting..." : "Submit"}
			</button>

			{success && <p className="text-green-500 mt-4">{message}</p>}
			{success === false && <p className="text-red-500 mt-4">{message}</p>}
		</form>
	);
};

export default SubmitForm;
