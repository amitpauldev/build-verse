import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

const StatsCard = ({
	icon: Icon,
	value,
	label,
	hasBorder,
}: {
	icon: LucideIcon;
	value: string;
	label: string;
	hasBorder?: boolean;
}) => {
	return (
		<div className={cn("space-y-2", hasBorder && "border-x border-border")}>
			<div className="flex items-center justify-center gap-2">
				<Icon className="size-5 text-primary/70" />
				<p className="text-3xl sm:text-4xl font-bold">{value}</p>
			</div>
			<p className="text-sm text-muted-foreground">{label}</p>
		</div>
	);
};

export default StatsCard;
