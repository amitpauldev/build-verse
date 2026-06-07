import FeaturedSection from "@/components/landingPage/FeaturedSection";
import HeroSection from "@/components/landingPage/HeroSection";
import RecentlyLauncedProducts from "@/components/landingPage/RecentlyLauncedProducts";
import { Suspense } from "react";

const Home = () => {
	return (
		<div>
			<HeroSection />
			<FeaturedSection />

			<Suspense
				fallback={
					<div className="text-center py-20">
						Loading recently launched products...
					</div>
				}
			>
				<RecentlyLauncedProducts />
			</Suspense>
		</div>
	);
};

export default Home;
