import FeaturedSection from "@/components/landingPage/FeaturedSection";
import HeroSection from "@/components/landingPage/HeroSection";
import RecentlyLauncedProducts from "@/components/landingPage/RecentlyLauncedProducts";
import ProductsSkeleton from "@/components/skeleton/ProductsSkeleton";
import { Suspense } from "react";

const Home = () => {
	return (
		<div>
			<HeroSection />
			<FeaturedSection />

			<Suspense fallback={<ProductsSkeleton />}>
				<RecentlyLauncedProducts />
			</Suspense>
		</div>
	);
};

export default Home;
