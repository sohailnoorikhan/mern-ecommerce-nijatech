// Hooks
import { useState, useMemo } from "react";

// Icons
import { SlidersHorizontal } from "lucide-react";

// Components
import { ProductCard2 } from "@/components/shared";

// RTK Query
import { useGetProductsQuery } from "@/redux/services/productApi";

export const ProductsPageProducts = ({
  searchTerm,
  selectedBrands,
  isDiscountPage,
  selectedCategory,
  openMobileFilters,
}) => {
  const { data: products = [], isLoading, error } = useGetProductsQuery();

  const [sortBy, setSortBy] = useState("popular");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;

    const matchesBrand =
      selectedBrands.length > 0
        ? selectedBrands.includes(product.brand.toLowerCase())
        : true;

    const matchesDiscount = isDiscountPage ? product.discountedPrice > 0 : true;

    const matchesSearch = searchTerm
      ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchesCategory && matchesBrand && matchesDiscount && matchesSearch;
  });

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);

      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);

      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);

      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div className="flex-1">
      <div className="bg-white max-sm:w-90 max-sm:mx-auto rounded-2xl shadow-lg p-4 mb-6 flex items-center justify-between">
        <button
          onClick={openMobileFilters}
          className="lg:hidden flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="font-medium">Filtrlər</span>
        </button>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 hidden sm:block">Sırala:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg outline-none 
            text-sm font-medium text-gray-700"
          >
            <option value="popular">Populyar</option>
            <option value="price-low">Qiymət: Aşağıdan yuxarıya</option>
            <option value="price-high">Qiymət: Yuxarıdan aşağıya</option>
            <option value="rating">Ən yüksək reytinq</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard2 key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
