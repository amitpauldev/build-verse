export const Skeleton = ({ className = "" }: { className?: string }) => {
	return (
		<div
			className={`relative overflow-hidden rounded bg-gray-600 ${className}`}
		>
			<div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/40 to-transparent" />
		</div>
	);
};

const ProductsSkeleton = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{Array.from({ length: 6 }).map((_, index) => (
				<div key={index} className="rounded-xl border bg-card p-6">
					<div className="space-y-4">
						{/* Title + Like Button */}
						<div className="flex items-center justify-between">
							<Skeleton className="h-5 w-1/3" />
							<Skeleton className="h-8 w-7" />
						</div>

						{/* Description */}
						<div className="space-y-2">
							<Skeleton className="h-3 w-5/6" />
							<Skeleton className="h-3 w-5/6" />
							<Skeleton className="h-3 w-2/3" />
						</div>

						{/* Tags */}
						<div className="flex gap-2 pt-2">
							<Skeleton className="h-6 w-15 rounded-full" />
							<Skeleton className="h-6 w-15 rounded-full" />
							<Skeleton className="h-6 w-15 rounded-full" />
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default ProductsSkeleton;
