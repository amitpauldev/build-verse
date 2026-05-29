import { Ratio, VectorSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
	return (
		<Link href="/" className="flex items-center gap-2 group">
			<div className="size-7 rounded-lg bg-primary flex items-center justify-center">
				<Ratio strokeWidth={2.25} className="size-5 text-primary-foreground" />
			</div>
			<span className="text-2xl font-bold bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
				<span className="text-primary">Build</span>Verse
			</span>
		</Link>
	);
};

export default Logo;
