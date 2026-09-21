import ProductsSkeleton, {
	Skeleton,
} from "@/components/skeleton/ProductsSkeleton";
import React from "react";

const loading = () => {
	return (
		<div className="py-20">
			<div className="wrapper">
				<div className="mb-20">
					<Skeleton className="h-8 w-64 rounded bg-gray-600" />
					<Skeleton className="mt-3 h-4 w-96 rounded bg-gray-600" />
				</div>

				<ProductsSkeleton />
			</div>
		</div>
	);
};

export default loading;
