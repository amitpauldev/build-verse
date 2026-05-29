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
import VotingButtons from "./VotingButtons";

type Props = {
	id: number;
	title: string;
	description: string;
	tags: string[];
	votes: number;
	isFeatured: boolean;
};

export default function ProductCard({ product }: { product: Props }) {
	const hasVoted = false;
	return (
		<Link href={`/products/${product.id}`}>
			<Card className="group card-hover hover:bg-primary-foreground/10 border-solid border-gray-400 min-h-50">
				<CardHeader className="flex-1">
					<div className="flex items-start gap-4">
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2">
								<CardTitle className="text-lg group-hover:text-primary transition-colors">
									{product.title}
								</CardTitle>
								{product.votes > 100 && (
									<Badge className="gap-1 bg-primary text-primary-foreground">
										<StarIcon className="size-3 fill-current" />
										Featured
									</Badge>
								)}
							</div>
							<CardDescription>{product.description}</CardDescription>
						</div>
						{/** Voting buttons */}
						<VotingButtons
							hasVoted={hasVoted}
							voteCount={product.votes}
							productId={product.id}
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
