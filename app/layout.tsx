import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "BuildVerse | Share Projects & Discover Innovation",
	description:
		"BuildVerse is a community platform where creators showcase apps, AI tools, SaaS products, startups, and creative projects. Discover launches, connect with builders, and get authentic feedback.",
	keywords: [
		"BuildVerse",
		"creator platform",
		"AI tools",
		"SaaS",
		"startup launches",
		"developer community",
		"showcase projects",
		"product discovery",
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={cn("h-full", "antialiased", inter.className, "font-sans", geist.variable)}>
			<body className="min-h-full">{children}</body>
		</html>
	);
}
