import ProductCard from "@/components/Products/ProductCard";
import type { ProductType } from "@/types";

const MyProductsGrid = ({
	products,
	likedIds,
}: {
	products: ProductType[];
	likedIds: number[];
}) => {
	return (
		<div className="grid-wrapper">
			{products.map((product) => (
				<ProductCard
					key={product.id}
					product={product}
					initialLiked={likedIds.includes(product.id)}
				/>
			))}
		</div>
	);
};

export default MyProductsGrid;
