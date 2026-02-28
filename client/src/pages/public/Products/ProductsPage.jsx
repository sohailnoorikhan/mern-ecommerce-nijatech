// Hooks
import { useState, useEffect } from "react";

// React Router
import { useSearchParams } from "react-router";

// Components
import {
  ProductsPageBanner,
  ProductsPageFilters,
  ProductsPageProducts,
} from "./components";

// Shared Components
import { Breadcrumb } from "@/components/shared";

// RTK Query
import { useGetProductsQuery } from "@/redux/services/productApi";

export const ProductsPage = () => {
  const [searchParams] = useSearchParams();

  const searchFromUrl = searchParams.get("search");

  const isDiscountPage = searchParams.get("discount") === "true";

  const brandFromUrl = searchParams.get("brand");

  const categoryFromUrl = searchParams.get("category");

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [selectedBrands, setSelectedBrands] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data: products = [], isLoading, error } = useGetProductsQuery();

  const filteredCount = products.filter((p) => {
    const matchesCat = selectedCategory
      ? p.category === selectedCategory
      : true;

    const matchesBrand =
      selectedBrands.length > 0
        ? selectedBrands.includes(p.brand.toLowerCase())
        : true;

    const matchesDisc = isDiscountPage ? p.discountedPrice > 0 : true;

    const matchesSearch = searchFromUrl
      ? p.title.toLowerCase().includes(searchFromUrl.toLowerCase())
      : true;

    return matchesCat && matchesBrand && matchesDisc && matchesSearch;
  }).length;
  useEffect(() => {
    if (brandFromUrl) {
      setSelectedBrands([brandFromUrl.toLowerCase()]);
    } else {
      setSelectedBrands([]);
    }

    if (categoryFromUrl) setSelectedCategory(categoryFromUrl);
  }, [brandFromUrl, categoryFromUrl]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <>
      <Breadcrumb
        categoryName={isDiscountPage ? "Endirimlər" : selectedCategory}
      />
      <ProductsPageBanner
        categoryName={isDiscountPage ? "Möhtəşəm Endirimlər" : selectedCategory}
        count={filteredCount}
        isDiscountPage={isDiscountPage}
        brandName={brandFromUrl}
        searchFromUrl={searchFromUrl}
      />
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            <ProductsPageFilters
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <div
              className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${
                mobileFiltersOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <div
                onClick={() => setMobileFiltersOpen(false)}
                className="absolute inset-0 bg-black/40"
              />

              <div
                className={`relative bg-white w-full h-full shadow-xl transform transition-transform duration-300 ${
                  mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <ProductsPageFilters
                  selectedBrands={selectedBrands}
                  setSelectedBrands={(brands) => {
                    setSelectedBrands(brands);
                    setMobileFiltersOpen(false);
                  }}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={(cat) => {
                    setSelectedCategory(cat);
                    setMobileFiltersOpen(false);
                  }}
                  isMobile
                />
              </div>
            </div>
            <ProductsPageProducts
              selectedBrands={selectedBrands}
              selectedCategory={selectedCategory}
              isDiscountPage={isDiscountPage}
              searchTerm={searchFromUrl}
              openMobileFilters={() => setMobileFiltersOpen(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
