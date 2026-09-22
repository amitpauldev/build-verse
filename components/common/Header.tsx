"use client";

import Link from "next/link";
import Logo from "./Logo";
import { CompassIcon, HeartIcon, HomeIcon, Menu, X } from "lucide-react";
import LogInSignUp from "../helper/LogInSignUp";
import { Suspense, useState } from "react";
import { Skeleton } from "../skeleton/ProductsSkeleton";

const navItems = [
	{
		href: "/",
		icon: <HomeIcon className="size-4" />,
		label: "Home",
	},
	{
		href: "/explore",
		icon: <CompassIcon className="size-4" />,
		label: "Explore",
	},
	{
		href: "/wishlist",
		icon: <HeartIcon className="size-4" />,
		label: "Wishlist",
	},
];

const Header = () => {
	const [showNav, setShowNav] = useState(false);

	const openNav = () => {
		setShowNav(true);
	};

	const closeNav = () => {
		setShowNav(false);
	};

	return (
		<header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<nav className="wrapper px-6 md:px-12">
				<div className="flex h-16 items-center justify-between">
					<Logo />

					{/* Desktop nav */}
					<div className="hidden md:flex items-center gap-1 flex-wrap">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50"
							>
								{item.icon}
								<span>{item.label}</span>
							</Link>
						))}
					</div>

					{/* Mobile nav */}
					<div
						className={`fixed z-50 h-screen right-0 top-0 w-full bg-black/30 md:hidden transition-all duration-300 ${
							showNav
								? "translate-x-0 opacity-100 visible"
								: "translate-x-full opacity-0 invisible"
						}`}
						onClick={closeNav}
					/>
					<div
						className={`fixed z-50 h-screen right-0 top-0 border-b bg-background md:hidden transition-transform duration-500 ${
							showNav
								? "translate-x-0 opacity-100 visible"
								: "translate-x-full opacity-0 invisible"
						}`}
					>
						<div className="flex justify-between wrapper pl-6 py-4">
							<div className="flex flex-col gap-1 pr-6 mt-12">
								{navItems.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										onClick={closeNav}
										className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
									>
										{item.icon}
										<span>{item.label}</span>
									</Link>
								))}
							</div>

							<button
								type="button"
								onClick={closeNav}
								className="self-start md:hidden p-2 cursor-pointer rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
								aria-label={showNav ? "Close menu" : "Open menu"}
							>
								<X />
							</button>
						</div>
					</div>

					<div className="flex items-center gap-3 flex-wrap">
						<Suspense fallback={<Skeleton className="h-10 w-32 rounded-md" />}>
							<LogInSignUp />
						</Suspense>

						{/* Mobile menu button */}
						<button
							type="button"
							onClick={showNav ? closeNav : openNav}
							className="md:hidden p-2 cursor-pointer rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
							aria-label={showNav ? "Close menu" : "Open menu"}
						>
							{showNav ? <X /> : <Menu />}
						</button>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
