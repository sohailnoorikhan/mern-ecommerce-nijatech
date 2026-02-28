// Hooks
import { useState, useEffect } from "react";

// Redux
import { useSelector } from "react-redux";

// Icons
import {
  Heart,
  User,
  ShoppingCart,
  Search,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

// React Router
import { Link, useNavigate, useLocation } from "react-router";

// Components
import { Header } from "./Header";

export const Navbar = () => {
  const navigate = useNavigate();

  const { search: currentSearch, pathname } = useLocation();

  const [searchValue, setSearchValue] = useState("");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setIsMenuOpen(false);
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [pathname, currentSearch]);

  const navLinks = [
    { name: "Noutbuklar", path: "/products?category=Laptops" },
    { name: "Monitorlar", path: "/products?category=Monitors" },
    { name: "Klaviaturalar", path: "/products?category=Keyboards" },
    { name: "Siçanlar", path: "/products?category=Mouses" },
    { name: "Qulaqlıqlar", path: "/products?category=Headphones" },
  ];

  const handleSearch = (e) => {
    if ((e.key === "Enter" || e.type === "click") && searchValue.trim()) {
      navigate(`/products?search=${searchValue.trim()}`);
      setSearchValue("");
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <div className="border-b border-gray-200 sticky top-0 z-100 shadow-md">
        <Header />
        <div className="bg-white h-20 flex items-center justify-between">
          <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 mx-auto flex items-center justify-between gap-8">
            <div className="flex items-center">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <span className="font-semibold text-3xl">Nijatech</span>
                <span className="font-semibold text-3xl text-green-600">.</span>
              </Link>
            </div>

            <div className="items-center gap-8 text-[14px] font-medium hidden lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative group transition-all duration-300 ${
                    currentSearch.includes(link.path.split("?")[1])
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-300 ${
                      currentSearch.includes(link.path.split("?")[1])
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              ))}
              <Link
                to="/products?discount=true"
                className="relative group text-gray-600 hover:text-red-600 transition-all"
              >
                Endirimlər
                <span className="absolute -top-1 -right-4 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-64 px-4 border border-gray-200 bg-gray-50 rounded-lg hidden xl:flex items-center text-[14px] gap-2.5 h-10">
                <Search className="text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Axtar..."
                  className="outline-none bg-transparent w-full"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </div>

              <div className="flex items-center gap-4 sm:gap-6">
                <Link to="/wishlist" className="relative hidden sm:block">
                  <Heart className="hover:text-red-500 transition-all duration-200" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link to="/cart" className="relative">
                  <ShoppingCart className="hover:text-blue-500 transition-all duration-200" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {isAuthenticated ? (
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 group px-2 py-1 bg-gray-50 rounded-full pr-3 hover:bg-blue-100 transition-all duration-300"
                  >
                    <span className="hidden sm:block text-xs font-bold text-slate-700 ml-1">
                      {user?.name.split(" ")[0]}
                    </span>

                    <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-100 overflow-hidden">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <span>{user?.name?.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                  </Link>
                ) : (
                  <Link
                    to="/auth"
                    className="p-2 text-slate-700 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-all"
                  >
                    <User size={24} />
                  </Link>
                )}

                <button
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <Menu size={28} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-200 transition-visibility duration-300 ${isMenuOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMenuOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-full w-full md:w-100 bg-white shadow-2xl transition-transform duration-300 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <span className="text-xl font-bold">Menyu</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 md:hidden">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Məhsul axtar..."
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleSearch}
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-lg"
                >
                  <Search size={18} />
                </button>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-6 space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Kateqoriyalar
              </p>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all font-semibold"
                >
                  {link.name}
                  <ArrowRight
                    size={18}
                    className="opacity-0 group-hover:opacity-100"
                  />
                </Link>
              ))}
              <Link
                to="/products?discount=true"
                className="flex items-center justify-between p-4 bg-red-50 text-red-600 rounded-2xl font-bold"
              >
                Endirimlər
                <span className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
              </Link>
            </nav>

            <div className="p-6 border-t border-gray-100 bg-gray-50 grid grid-cols-2 gap-4">
              <Link
                to="/wishlist"
                className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 gap-2"
              >
                <Heart size={20} className="text-red-500" />
                <span className="text-xs font-bold">İstəklər</span>
              </Link>
              <Link
                to="/profile"
                className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 gap-2 overflow-hidden"
                onClick={() => setIsMenuOpen(false)}
              >
                {isAuthenticated && user?.avatar ? (
                  <img
                    src={user.avatar}
                    className="w-6 h-6 rounded-full object-cover"
                    alt="Profile"
                  />
                ) : (
                  <User size={20} className="text-blue-500" />
                )}
                <span className="text-xs font-bold">
                  {isAuthenticated ? "Profil" : "Giriş"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
