import FeaturedSection from "@/components/landingPage/FeaturedSection";
import HeroSection from "@/components/landingPage/HeroSection";
import RecentlyLauncedProducts from "@/components/landingPage/RecentlyLauncedProducts";

const Home = () => {
	return (
		<div>
			<HeroSection />
			<FeaturedSection />
			<RecentlyLauncedProducts />
		</div>
	);
};

export default Home;
