import SectionHeader from "../common/SectionHeader";
import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import ProductsGrid from "../helper/ProductsGrid";
import { Suspense } from "react";
import ProductsSkeleton from "../skeleton/ProductsSkeleton";

const FeaturedSection = async () => {
	return (
		<div className="py-20 bg-muted/20">
			<div className="wrapper">
				<div className="flex items-center justify-between mb-2 md:mb-8">
					<SectionHeader
						title="Featured Projects"
						icon={StarIcon}
						description="Top picks from our community this week"
					/>
					<Link href="/explore">
						<Button variant="outline">
							<span className="hidden sm:flex">See All</span>
							<ArrowUpRightIcon className="size-4 ml-2" />
						</Button>
					</Link>
				</div>

				<Suspense fallback={<ProductsSkeleton />}>
					<ProductsGrid />
				</Suspense>
			</div>
		</div>
	);
};

export default FeaturedSection;
