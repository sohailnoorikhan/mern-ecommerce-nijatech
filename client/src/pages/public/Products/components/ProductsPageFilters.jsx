// Hooks
import { useState, useEffect } from "react";

// Icons
import { Funnel, ChevronDown } from "lucide-react";

// RTK Query
import { useGetProductsQuery } from "@/redux/services/productApi";

export const ProductsPageFilters = ({
  selectedBrands,
  setSelectedBrands,
  selectedCategory,
  setSelectedCategory,
  isMobile = false,
}) => {
  const [openCategory, setOpenCategory] = useState(null);
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  const categories = [
    "Laptops",
    "Monitors",
    "Graphics Cards",
    "Processors",
    "Keyboards",
    "SSD",
    "RAM",
    "Mouses",
    "Headphones",
  ];

  const translate = {
    Laptops: "Noutbuklar",
    Monitors: "Monitorlar",
    "Graphics Cards": "Grafik Kartlar",
    Processors: "Prosessorlar",
    Keyboards: "Klaviaturalar",
    SSD: "SSD",
    RAM: "RAM",
    Mouses: "Siçanlar",
    Headphones: "Qulaqlıqlar",
  };

  const getBrandsByCategory = (category) => {
    const filtered = products.filter((p) => p.category === category);
    return [...new Set(filtered.map((p) => p.brand))];
  };

  const handleBrandChange = (brand) => {
    const normalized = brand.toLowerCase();

    let updated;

    if (selectedBrands.includes(normalized)) {
      updated = selectedBrands.filter((b) => b !== normalized);
    } else {
      updated = [...selectedBrands, normalized];
    }

    setSelectedBrands(updated);
  };

  useEffect(() => {
    if (selectedCategory) {
      setOpenCategory(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <div
      className={`${isMobile ? "block pt-32 w-full" : "hidden md:block w-64 shrink-0"}`}
    >
      <div
        className={`bg-white rounded-2xl shadow-lg p-6 ${!isMobile && "sticky top-24"}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center">
            <Funnel className="h-5 w-5 mr-2 text-blue-600" />
            Filtrlər
          </h2>
        </div>

        <div className="space-y-4">
          {categories.map((category) => {
            const brands = getBrandsByCategory(category);
            const isOpen = openCategory === category;

            return (
              <div key={category} className="border-b border-gray-300 pb-4">
                <button
                  onClick={() => {
                    setOpenCategory(isOpen ? null : category);
                    setSelectedCategory(category);
                    setSelectedBrands([]);
                  }}
                  className={`w-full flex items-center justify-between text-sm font-semibold transition ${
                    selectedCategory === category
                      ? "text-blue-600"
                      : "text-gray-900"
                  } hover:text-blue-600`}
                >
                  {translate[category] || category}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="mt-3 space-y-2">
                    {brands.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.toLowerCase())}
                          onChange={() => handleBrandChange(brand)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 group-hover:text-blue-600 transition">
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
