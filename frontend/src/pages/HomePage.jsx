import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'> {/* Reduced from py-16 to py-8 */}
				{/* Hero Section */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-300 to-emerald-400 bg-clip-text text-transparent mb-4 pb-4'>
						Explore Our Categories
					</h1>
					<p className='text-lg text-gray-300 max-w-2xl mx-auto'>
						Discover the latest trends in eco-friendly fashion
					</p>
				</div>

				{/* Categories Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				{/* Featured Products */}
				{!isLoading && products.length > 0 && (
					<div className='mt-16'>
						<FeaturedProducts featuredProducts={products} />
					</div>
				)}
			</div>
		</div>
	);
};
export default HomePage;