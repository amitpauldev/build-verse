import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
	ArrowRightIcon,
	EyeIcon,
	RocketIcon,
	SparklesIcon,
	UsersIcon,
} from "lucide-react";
import StatsCard from "./StatsCard";

export const LiveBadge = () => {
	return (
		<Badge
			variant="outline"
			className="px-4 py-3.5 mb-8 text-sm backdrop-blur-sm"
		>
			<span className="relative flex h-2 w-2 mr-1">
				<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
				<span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
			</span>
			<span className="text-muted-foreground">
				Join thousands of creators on BuildVerse
			</span>
		</Badge>
	);
};

const statsData = [
	{
		icon: RocketIcon,
		value: "1.5K+",
		label: "Projects Shared",
	},
	{
		icon: UsersIcon,
		value: "7K+",
		label: "Active Creators",
		hasBorder: true,
	},
	{
		icon: EyeIcon,
		value: "30K+",
		label: "Monthly Visitors",
	},
];

const HeroSection = () => {
	return (
		<section className="relative overflow-hidden bg-linear-to-b from-background via-background to-muted/20">
			<div className="wrapper">
				<div className="flex flex-col items-center justify-center py-12 lg:py-24 text-center">
					<LiveBadge />

					<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl">
						Show What You've <span>Built</span>, <br />
						Discover What's <span>Building</span>
					</h1>

					<p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
						BuildVerse is a community-driven platform where creators showcase
						apps, AI tools, SaaS products, startups, and creative projects.
						Launch ideas authentically, and receive meaningful feedback.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 mb-16">
						<Link href="/submit">
							<Button
								size="lg"
								className="text-base px-4 shadow-2xl cursor-pointer"
							>
								<SparklesIcon className="size-5 mr-1.5" />
								Share Your Project
							</Button>
						</Link>
						<Link href="/explore">
							<Button
								size="lg"
								className="text-base px-4 shadow-2xl cursor-pointer"
								variant="secondary"
							>
								Explore Projects
								<ArrowRightIcon className="size-5 ml-1.5" />
							</Button>
						</Link>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-2xl w-full">
						{statsData.map((stat) => (
							<StatsCard key={stat.label} {...stat} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
