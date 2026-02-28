// Hooks
import { useState, useMemo } from "react";

// React Router
import { Link } from "react-router";

// Icons
import { Search } from "lucide-react";

const ALL_BRANDS = [
  { name: "Acer", slogan: "Explore Beyond Limits" },
  { name: "Asus", slogan: "In Search of Incredible" },
  { name: "HP", slogan: "Keep Reinventing" },
  { name: "MSI", slogan: "True Gaming" },
  { name: "Dell", slogan: "Technology that Empowers" },
  { name: "LG", slogan: "Exceed Your Vision" },
  { name: "Logitech", slogan: "For Creators" },
  { name: "Rampage", slogan: "Gaming Gear" },
  { name: "Apple", slogan: "Think Different" },
  { name: "Lenovo", slogan: "For Those Who Do" },
  { name: "Samsung", slogan: "Imagine the Possibilities" },
  { name: "Razer", slogan: "Upgrade Your Life" },
];

export const BrandsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLetter, setActiveLetter] = useState("Hamısı");

  const alphabet = [
    "Hamısı",
    ...new Set(ALL_BRANDS.map((b) => b.name[0].toUpperCase()).sort()),
  ];

  const filteredBrands = useMemo(() => {
    return ALL_BRANDS.filter((brand) => {
      const matchesSearch = brand.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesLetter =
        activeLetter === "Hamısı" || brand.name.startsWith(activeLetter);
      return matchesSearch && matchesLetter;
    });
  }, [searchTerm, activeLetter]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-linear-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Bütün Brendlər</h1>
          <p className="text-blue-100 text-lg">
            Dünyanın aparıcı texnologiya istehsalçıları Nijatech-də
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Brend axtar..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setActiveLetter(letter)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeLetter === letter
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
          {filteredBrands.map((brand) => (
            <Link
              key={brand.name}
              to={`/products?brand=${brand.name.toLowerCase()}`}
              className="group relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-blue-500
              hover:shadow-2xl transition-all duration-500 overflow-hidden text-center"
            >
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <h3 className="sm:text-2xl text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors tracking-wider uppercase">
                  {brand.name}
                </h3>
                <p className="text-xs text-gray-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {brand.slogan}
                </p>
                <div className="mt-4 inline-block text-blue-600 font-semibold text-sm border-b border-transparent group-hover:border-blue-600 transition-all">
                  Məhsullara bax
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl italic">
              Axtarışınıza uyğun brend tapılmadı.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
