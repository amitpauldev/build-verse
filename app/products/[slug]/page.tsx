"use cache";

import VotingButtons from "@/components/Products/VotingButtons";
import {
	getFeaturedProducts,
	getProductBySlug,
} from "@/lib/products/product-select";
import {
	ArrowLeftIcon,
	CalendarIcon,
	ExternalLinkIcon,
	StarIcon,
	UserIcon,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
	const products = await getFeaturedProducts();
	return products.map((product) => ({
		slug: product.slug.toString(),
	}));
};

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;

	const product = await getProductBySlug(slug);
	if (!product) {
		notFound();
	}
	const { name, description, websiteUrl, tags, voteCount, tagline } = product;

	return (
		<div className="py-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Back Link */}
				<Link
					href="/explore"
					className="inline-flex items-center gap-2 mb-8 text-secondary hover:text-primary transition-colors"
				>
					<ArrowLeftIcon className="w-4 h-4" />
					Back to Explore
				</Link>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Section */}
					<div className="lg:col-span-2 space-y-8">
						{/* Header */}
						<div>
							<div className="flex items-center gap-3 mb-3">
								<StarIcon className="w-6 h-6 text-primary" />
								<h1 className="text-3xl font-bold">{name}</h1>
							</div>

							{tagline && <p className="text-white mb-5">{tagline}</p>}

							<div className="flex flex-wrap gap-2">
								{tags?.map((tag) => (
									<span
										key={tag}
										className="px-3 py-1 text-sm rounded-full bg-primary text-white"
									>
										{tag}
									</span>
								))}
							</div>
						</div>

						{/* About */}
						<div>
							<h2 className="text-xl font-semibold mb-3">About</h2>
							<p className="leading-7 text-white">{description}</p>
						</div>

						{/* Product Details */}
						<div className="rounded-xl border border-gray-200 bg-background p-6">
							<h2 className="text-lg font-semibold mb-5">Product Details</h2>

							<div className="space-y-4">
								<div className="flex items-center gap-3 text-sm">
									<CalendarIcon className="w-4 h-4 text-gray-500" />
									<span className="text-White">Launched:</span>
									<span className="font-medium text-gray-900">
										{new Date(
											product.createdAt?.toISOString() ?? "",
										).toLocaleDateString()}
									</span>
								</div>

								<div className="flex items-center gap-3 text-sm">
									<UserIcon className="w-4 h-4 text-gray-500" />
									<span className="text-white">Submitted by:</span>
									<span className="font-medium text-gray-900">
										{product.submittedBy}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Right Sidebar */}
					<div>
						<div className="sticky top-24 space-y-4">
							{/* Voting Card */}
							<div className="rounded-xl border border-gray-200 p-6 shadow-sm">
								<div className="text-center">
									<p className="mb-4 text-sm text-gray-500">
										Support this product
									</p>

									{/* <VotingButtons
                productId={product.id}
                voteCount={voteCount}
              /> */}
								</div>

								{voteCount > 100 && (
									<div className="mt-6 border-t pt-6">
										<div className="w-full rounded-lg bg-primary py-2 text-center text-sm font-medium text-white">
											🔥 Featured Product
										</div>
									</div>
								)}
							</div>

							{/* Website Button */}
							{websiteUrl && (
								<a
									href={websiteUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex w-full items-center justify-center rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium transition hover:bg-gray-100"
								>
									Visit Website
									<ExternalLinkIcon className="ml-2 w-4 h-4" />
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
