import SectionHeader from "@/components/common/SectionHeader";
import { CompassIcon } from "lucide-react";
import ExploreProducts from "@/components/helper/ExploreProducts";
import { Suspense } from "react";
import ProductsSkeleton from "@/components/skeleton/ProductsSkeleton";

const ExplorePage = async () => {
	return (
		<div className="py-20">
			<div className="wrapper">
				<div className="mb-12">
					<SectionHeader
						title="Explore All Products"
						icon={CompassIcon}
						description="Browse and discover amazing projects from our community"
					/>
				</div>
				<Suspense fallback={<ProductsSkeleton />}>
					<ExploreProducts />
				</Suspense>
			</div>
		</div>
	);
};

export default ExplorePage;
