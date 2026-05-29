import Link from "next/link";
import Logo from "./Logo";
import { CompassIcon, HomeIcon, SparklesIcon } from "lucide-react";
import { Button } from "../ui/button";

const Header = () => {
	return (
		<header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 overflow-hidden">
			<div className="wrapper px-12">
				<div className="flex h-16 items-center justify-between">
					<Logo />

					<nav className="flex items-center gap-1">
						<Link
							href="/"
							className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50"
						>
							<HomeIcon className="size-4" />
							<span>Home</span>
						</Link>
						<Link
							href="/explore"
							className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50"
						>
							<CompassIcon className="size-4" />
							<span>Explore</span>
						</Link>
					</nav>

					<div className="flex items-center gap-3">
						<Button variant="outline" className="border-none bg-transparent">
							Sign In
						</Button>
						<Button>Sign Up</Button>

						<Button asChild>
							<Link href="/submit">
								<SparklesIcon className="size-4" />
								Submit Project
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
