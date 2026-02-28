// Icons
import {
  X, 
  Users,
  Settings,
  LayoutGrid,
  ShoppingBag,
  Grid2X2Plus,
  ShoppingCart,
  MessageCircleQuestionMark,
} from "lucide-react";

// React Router
import { NavLink } from "react-router";

// Redux
import { useGetProductsQuery } from "@/redux/services/productApi";

export const Sidebar = ({ isOpen, onClose }) => {
  const { data: products = [] } = useGetProductsQuery();

  const limit = 200;
  const currentCount = products.length;
  const percentage = Math.min((currentCount / limit) * 100, 100);

  const barColor = percentage > 80 ? "bg-rose-500" : "bg-blue-600";
  const bgColor = percentage > 80 ? "bg-rose-50" : "bg-gray-50";

  return (
    <>
      <aside
        className={`
          bg-white w-60 h-full border-r border-[#e7ebf3] fixed z-60 flex-col flex
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0
        `}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-blue-500 rounded-lg flex items-center justify-center text-white shrink-0">
              <Grid2X2Plus size={24} />
            </div>
            <div>
              <h1 className="text-base font-bold leading-none tracking-wide">
                Admin Panel
              </h1>
              <p className="text-slate-500 text-xs mt-1 font-normal tracking-wide">
                Business Manager
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 flex flex-col gap-1 overflow-y-auto">
          <NavLink
            to="/admin"
            end
            onClick={() => window.innerWidth < 1024 && onClose()} // Mobildə linkə basanda menyunu bağla
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                isActive
                  ? "bg-blue-500/10 text-blue-600"
                  : "text-slate-500 hover:bg-gray-100"
              }`
            }
          >
            <LayoutGrid size={22} />
            <span className="text-sm font-semibold tracking-wide">
              Dashboard
            </span>
          </NavLink>

          <NavLink
            to="/admin/users"
            end
            onClick={() => window.innerWidth < 1024 && onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                isActive
                  ? "bg-blue-500/10 text-blue-600"
                  : "text-slate-500 hover:bg-gray-100"
              }`
            }
          >
            <Users size={22} />
            <span className="text-sm font-semibold tracking-wide">
              İstifadəçilər
            </span>
          </NavLink>

          <NavLink
            to="/admin/products"
            end
            onClick={() => window.innerWidth < 1024 && onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                isActive
                  ? "bg-blue-500/10 text-blue-600"
                  : "text-slate-500 hover:bg-gray-100"
              }`
            }
          >
            <ShoppingBag size={22} />
            <span className="text-sm font-semibold tracking-wide">
              Məhsullar
            </span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            end
            onClick={() => window.innerWidth < 1024 && onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                isActive
                  ? "bg-blue-500/10 text-blue-600"
                  : "text-slate-500 hover:bg-gray-100"
              }`
            }
          >
            <ShoppingCart size={22} />
            <span className="text-sm font-medium tracking-wide">
              Sifarişlər
            </span>
          </NavLink>

          <div className="mt-8 mb-2 px-3 text-[10px] uppercase tracking-widest font-bold text-slate-500">
            System
          </div>

          <NavLink
            to="/admin/settings"
            end
            onClick={() => window.innerWidth < 1024 && onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                isActive
                  ? "bg-blue-500/10 text-blue-600"
                  : "text-slate-500 hover:bg-gray-100"
              }`
            }
          >
            <Settings size={22} />
            <span className="text-sm font-medium tracking-wide">Ayarlar</span>
          </NavLink>

          <NavLink
            to="/admin/help-center"
            end
            onClick={() => window.innerWidth < 1024 && onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                isActive
                  ? "bg-blue-500/10 text-blue-600"
                  : "text-slate-500 hover:bg-gray-100"
              }`
            }
          >
            <MessageCircleQuestionMark size={22} />
            <span className="text-sm font-medium tracking-wide">
              Yardım Mərkəzi
            </span>
          </NavLink>
        </nav>

        <div className="p-4 border-t border-[#e7ebf3]">
          <div
            className={`${bgColor} rounded-xl p-4 transition-colors duration-500`}
          >
            <div className="flex justify-between items-center mb-1">
              <p className="text-[10px] font-bold text-[#0d121b] tracking-wider">
                Məhsul Portfeli
              </p>
              <span
                className={`text-[10px] font-bold ${percentage > 80 ? "text-rose-600" : "text-blue-600"}`}
              >
                {Math.round(percentage)}%
              </span>
            </div>

            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mb-2">
              <div
                className={`${barColor} h-full transition-all duration-700 ease-out`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                {currentCount} / {limit} aktiv
              </p>
              {percentage >= 100 && (
                <div className="size-2 bg-rose-500 rounded-full animate-ping"></div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
