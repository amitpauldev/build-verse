"use client";

import Link from "next/link";
import Logo from "./Logo";
import {
	CompassIcon,
	HomeIcon,
	LoaderIcon,
	SparklesIcon,
	UserIcon,
} from "lucide-react";
import { Button } from "../ui/button";

import {
	Show,
	SignUpButton,
	SignInButton,
	UserButton,
	OrganizationSwitcher,
} from "@clerk/react";
import { Suspense } from "react";
import CustomUserButton from "./CustomUserButton";

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
						<Suspense
							fallback={
								<div>
									<LoaderIcon className="size-4 animate-spin text-white" />
								</div>
							}
						>
							{/* <OrganizationSwitcher /> */}
							<Show when="signed-out">
								<SignInButton />
								<SignUpButton>
									<Button>Sign Up</Button>
								</SignUpButton>
							</Show>
							<Show when="signed-in">
								<Link href="submit">
									<Button variant="outline" size="sm">
										<SparklesIcon className="size-4 mr-2" />
										<span>Share Project</span>
									</Button>
								</Link>
								{/* <UserButton /> */}
								<CustomUserButton />{" "}
								{/* Custom user button with organization switcher and admin panel link */}
							</Show>
						</Suspense>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
