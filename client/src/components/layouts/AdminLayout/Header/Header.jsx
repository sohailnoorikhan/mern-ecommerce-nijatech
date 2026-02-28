// Hooks
import { useState, useEffect, useRef } from "react";

// Redux
import { logout } from "@/redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useGetUsersQuery } from "@/redux/services/userApi";
import { useGetOrdersQuery } from "@/redux/services/orderApi";
import { useGetProductsQuery } from "@/redux/services/productApi";

// React Router
import { useNavigate } from "react-router";

// Icons
import {
  Bell,
  Clock,
  Search,
  LogOut,
  Package,
  ShoppingCart,
  User as UserIcon,
} from "lucide-react";

// Swal
import Swal from "sweetalert2";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const bellRef = useRef(null);

  const { user: currentUser } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");

  const [isBellOpen, setIsBellOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: products = [], isLoading: pLoading } = useGetProductsQuery();

  const { data: users = [] } = useGetUsersQuery(undefined, {
    pollingInterval: 15000,
  });
  const { data: orders = [] } = useGetOrdersQuery(undefined, {
    pollingInterval: 15000,
  });

  const notifications = [
    ...orders.slice(0, 3).map((o) => ({
      id: o._id,
      title: "Yeni Sifariş",
      desc: `${o.user?.name || "Müştəri"} tərəfindən #${o._id.slice(-5)} nömrəli sifariş`,
      time: "Yeni",
      type: "order",
      link: "/admin/orders",
    })),
    ...users.slice(0, 3).map((u) => ({
      id: u._id,
      title: "Yeni İstifadəçi",
      desc: `${u.name} sistemə qoşuldu`,
      time: "Yeni",
      type: "user",
      link: "/admin/users",
    })),
  ]
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 3);

  const [filteredResults, setFilteredResults] = useState({
    products: [],
    users: [],
    orders: [],
  });

  useEffect(() => {
    if (searchTerm.trim().length > 1) {
      const term = searchTerm.toLowerCase();

      const pResults = products.filter((p) => {
        const productName = p?.name || p?.title || "";
        return productName.toLowerCase().includes(term);
      });

      const uResults = users.filter(
        (u) =>
          (u?.name || "").toLowerCase().includes(term) ||
          (u?.email || "").toLowerCase().includes(term),
      );

      const oResults = orders.filter(
        (o) =>
          (o?._id || "").toLowerCase().includes(term) ||
          (o?.user?.name || "").toLowerCase().includes(term),
      );

      setFilteredResults({
        products: pResults,
        users: uResults,
        orders: oResults,
      });
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [searchTerm, products, users, orders]);

  useEffect(() => {
    const close = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setIsDropdownOpen(false);
      if (bellRef.current && !bellRef.current.contains(e.target))
        setIsBellOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Çıxış edilsin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Bəli",
      cancelButtonText: "Xeyr",
      confirmButtonColor: "#3b82f6",
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(logout());
        navigate("/auth");
      }
    });
  };

  const hasResults =
    filteredResults.products.length > 0 ||
    filteredResults.users.length > 0 ||
    filteredResults.orders.length > 0;

  return (
    <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1" ref={searchRef}>
        <div className="relative max-w-md w-full">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="Məhsul, istifadəçi və ya sifariş..."
          />

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-2xl max-h-110 overflow-y-auto z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
              {filteredResults.products.length > 0 && (
                <div className="mb-2">
                  <div className="px-4 py-1 text-[10px] font-bold text-blue-500 uppercase tracking-wider">
                    Məhsullar
                  </div>
                  {filteredResults.products.slice(0, 5).map((p) => (
                    <button
                      key={p._id}
                      onClick={() => {
                        navigate(`/admin/products`);
                        setIsDropdownOpen(false);
                        setSearchTerm("");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-left transition-colors"
                    >
                      <div className="size-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                        {p.images?.[0] || p.image ? (
                          <img
                            src={p.images?.[0] || p.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package size={18} className="text-slate-400" />
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-slate-700 truncate">
                          {p.name || p.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold">
                          {p.price} AZN
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {filteredResults.users.length > 0 && (
                <div className="mb-2 border-t border-slate-50 pt-2">
                  <div className="px-4 py-1 text-[10px] font-bold text-purple-500 uppercase tracking-wider">
                    İstifadəçilər
                  </div>
                  {filteredResults.users.slice(0, 5).map((u) => (
                    <button
                      key={u._id}
                      onClick={() => {
                        navigate(`/admin/users`);
                        setIsDropdownOpen(false);
                        setSearchTerm("");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-left transition-colors"
                    >
                      <div className="size-10 rounded-full bg-indigo-50 border border-indigo-100 overflow-hidden shrink-0 flex items-center justify-center">
                        {u.avatar ? (
                          <img
                            src={u.avatar}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs font-bold text-indigo-500">
                            {u.name?.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-slate-700 truncate">
                          {u.name}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate">
                          {u.email}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {filteredResults.orders.length > 0 && (
                <div className="mb-2 border-t border-slate-50 pt-2">
                  <div className="px-4 py-1 text-[10px] font-bold text-orange-500 uppercase tracking-wider">
                    Sifarişlər
                  </div>
                  {filteredResults.orders.slice(0, 5).map((o) => (
                    <button
                      key={o._id}
                      onClick={() => {
                        navigate(`/admin/orders`);
                        setIsDropdownOpen(false);
                        setSearchTerm("");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-left transition-colors"
                    >
                      <div className="size-10 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                        <ShoppingCart size={18} className="text-orange-500" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-slate-700">
                          Sifariş #{o._id.slice(-6).toUpperCase()}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">
                          {o.user?.name || "Qonaq"}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {!hasResults && !pLoading && (
                <div className="px-4 py-6 text-center">
                  <p className="text-sm text-slate-400">
                    Uyğun nəticə tapılmadı
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative" ref={bellRef}>
          <button
            onClick={() => setIsBellOpen(!isBellOpen)}
            className={`p-2 rounded-lg transition-colors relative group ${isBellOpen ? "bg-gray-100" : "hover:bg-gray-100"}`}
          >
            <Bell
              className={`${isBellOpen ? "text-blue-500" : "text-slate-500"} group-hover:text-blue-500 transition-colors`}
              size={24}
            />
            {notifications.length > 0 && (
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>

          {isBellOpen && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center bg-slate-50/50">
                <span className="text-sm font-bold text-slate-700">
                  Bildirişlər
                </span>
                <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">
                  {notifications.length} Aktiv
                </span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        navigate(n.link);
                        setIsBellOpen(false);
                      }}
                      className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                    >
                      <div className="flex gap-3">
                        <div
                          className={`size-8 rounded-full shrink-0 flex items-center justify-center ${n.type === "order" ? "bg-orange-100 text-orange-600" : "bg-purple-100 text-purple-600"}`}
                        >
                          {n.type === "order" ? (
                            <ShoppingCart size={14} />
                          ) : (
                            <UserIcon size={14} />
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-slate-700">
                            {n.title}
                          </span>
                          <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                            {n.desc}
                          </p>
                          <div className="flex items-center gap-1 mt-1.5 text-slate-400">
                            <Clock size={10} />
                            <span className="text-[10px] font-medium">
                              {n.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-10 text-center text-sm text-slate-400">
                    Yeni bildiriş yoxdur
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  navigate("/admin/notifications");
                  setIsBellOpen(false);
                }}
                className="w-full py-2.5 text-center text-xs font-bold text-blue-500 hover:bg-slate-50 border-t border-gray-50 transition-colors"
              >
                Hamısına bax
              </button>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-gray-200 mx-1"></div>
        <div className="flex items-center gap-3 ml-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-[#0d121b]">
              {currentUser?.name}
            </p>
            <p className="text-[11px] text-slate-500 capitalize">
              {currentUser?.role}
            </p>
          </div>
          <button
            onClick={() => {
              navigate(`/admin/settings`);
              setIsDropdownOpen(false);
            }}
            className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <div
              className="size-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold shadow-sm overflow-hidden"
              style={
                currentUser?.avatar
                  ? {
                      backgroundImage: `url(${currentUser.avatar})`,
                      backgroundSize: "cover",
                    }
                  : {}
              }
            >
              {!currentUser?.avatar &&
                currentUser?.name?.charAt(0).toUpperCase()}
            </div>
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="p-1.5 hover:text-red-500 transition-colors"
        >
          <LogOut size={22} />
        </button>
      </div>
    </header>
  );
};
