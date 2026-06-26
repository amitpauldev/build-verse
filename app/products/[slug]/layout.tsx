import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function ProductLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			{/* Back Link */}
			<Link
				href="/explore"
				className="inline-flex items-center gap-2 m-8 text-secondary hover:text-primary transition-colors"
			>
				<ArrowLeftIcon className="w-4 h-4" />
				Go to Explore
			</Link>
			{children}
		</div>
	);
}
