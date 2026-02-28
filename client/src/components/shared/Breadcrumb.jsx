// React Router
import { Link } from "react-router";

// Icons
import { ChevronRight } from "lucide-react";

export const Breadcrumb = ({ categoryName }) => {
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
  return (
    <>
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Ana səhifə
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            {categoryName
              ? translate[categoryName] || categoryName
              : "Bütün məhsullar"}
          </div>
        </div>
      </div>
    </>
  );
};
