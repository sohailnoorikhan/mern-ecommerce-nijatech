// Components
import { ProductCard } from "@/components/shared";

// RTK Query
import { useGetProductsQuery } from "@/redux/services/productApi";

// Hooks
import { useMemo, useState } from "react";

// React Router
import { Link } from "react-router";

export const HomePageProducts = () => {
  const [activeTab, setActiveTab] = useState("discount");

  const { data: products = [], isLoading, error } = useGetProductsQuery();

  const filteredProducts = useMemo(() => {
    if (!products.length) return [];

    switch (activeTab) {
      case "discount":
        return products.filter((p) => p.discountedPrice).slice(0, 8);
      case "week":
        return [...products].reverse().slice(0, 8);
      case "popular":
        return products.slice(0, 8);
      default:
        return products.slice(0, 8);
    }
  }, [products, activeTab]);

  if (isLoading) return <div className="py-20 text-center">Yüklənir...</div>;
  if (error) return null;

  const tabs = [
    { id: "discount", label: "Endirimlər" },
    { id: "week", label: "Həftənin təklifləri" },
    { id: "popular", label: "Populyar məhsullar" },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex justify-center sm:justify-start">
          <div className="inline-flex bg-gray-200/50 p-1 rounded-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-xl font-bold text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div
          key={activeTab}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-400 italic">
              Hazırda bu bölmədə məhsul tapılmadı.
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-block px-8 py-3 border-2 border-gray-200 rounded-xl font-bold text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
          >
            Bütün məhsullara bax
          </Link>
        </div>
      </div>
    </div>
  );
};
