import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { InferSelectModel } from "drizzle-orm";
import { products } from "@/db/schema";
import LikeButton from "./LikeButton";

// type Props = {
// 	id: number;
// 	name: string;
// 	description: string;
// 	tags: string[];
// 	votes: number;
// 	isFeatured: boolean;
// };

type product = InferSelectModel<typeof products>;

export default function ProductCard({
	product,
	initialLiked,
}: {
	product: product;
	initialLiked: boolean;
}) {
	// const initialLiked = await getInitialLiked(product.id);

	return (
		<Link href={`/products/${product.slug}`}>
			<Card className="group card-hover hover:bg-primary-foreground/10 border-solid border-gray-400 min-h-50">
				<CardHeader className="flex-1">
					<div className="flex items-start gap-4">
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2">
								<CardTitle className="text-lg group-hover:text-primary transition-colors">
									{product.name}
								</CardTitle>
								{product.voteCount > 100 && (
									<Badge className="gap-1 bg-primary text-primary-foreground">
										<StarIcon className="size-3 fill-current" />
										Featured
									</Badge>
								)}
							</div>
							<CardDescription>{product.description}</CardDescription>
						</div>
						{/** Voting buttons */}
						<LikeButton
							initialLiked={initialLiked}
							productId={product.id}
							voteCount={product.voteCount}
						/>
					</div>
				</CardHeader>
				<CardFooter>
					<div className="flex items-center gap-2">
						{product.tags?.map((tag) => (
							<Badge variant="secondary" key={tag}>
								{tag}
							</Badge>
						))}
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
}
