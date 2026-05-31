import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({ subsets: ["latin"] });

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
		<html lang="en">
			<body className={`${outfit.className} antialiased`}>
				<ClerkProvider>
					<Header />
					{children}
					<Footer />
				</ClerkProvider>
			</body>
		</html>
	);
}
