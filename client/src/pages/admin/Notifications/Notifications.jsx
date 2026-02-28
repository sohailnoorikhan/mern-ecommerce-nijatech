// Redux
import { useGetUsersQuery } from "@/redux/services/userApi";
import { useGetOrdersQuery } from "@/redux/services/orderApi";

// Icons
import {
  Bell,
  Clock,
  ArrowRight,
  ShoppingCart,
  User as UserIcon,
} from "lucide-react";

// React Router
import { useNavigate } from "react-router";

export const NotificationsPage = () => {
  const navigate = useNavigate();

  const { data: orders = [] } = useGetOrdersQuery();
  const { data: users = [] } = useGetUsersQuery();

  const allNotifications = [
    ...orders.map((o) => ({
      id: o._id,
      title: "Yeni Sifariş daxil oldu",
      desc: `${o.user?.name || "Müştəri"} tərəfindən #${o._id.slice(-6).toUpperCase()} nömrəli sifariş`,
      time: "Bu gün",
      type: "order",
      link: "/admin/orders",
      color: "bg-orange-100 text-orange-600",
    })),
    ...users.map((u) => ({
      id: u._id,
      title: "Yeni İstifadəçi qeydiyyatı",
      desc: `${u.name} (${u.email}) platformaya qoşuldu.`,
      time: "Yeni",
      type: "user",
      link: "/admin/users",
      color: "bg-purple-100 text-purple-600",
    })),
  ].sort((a, b) => b.id.localeCompare(a.id));

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Bell className="text-blue-500" /> Bildirişlər
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Sistemdə baş verən ən son yeniliklər və fəaliyyətlər.
          </p>
        </div>
        <span className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full">
          Cəmi {allNotifications.length} bildiriş
        </span>
      </div>

      <div className="space-y-4">
        {allNotifications.length > 0 ? (
          allNotifications.map((n) => (
            <div
              key={n.id}
              onClick={() => navigate(n.link)}
              className="group bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`size-12 rounded-full shrink-0 flex items-center justify-center ${n.color}`}
                >
                  {n.type === "order" ? (
                    <ShoppingCart size={20} />
                  ) : (
                    <UserIcon size={20} />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                    {n.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">{n.desc}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                      <Clock size={12} /> {n.time}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-slate-300 group-hover:text-blue-500 transition-colors">
                <ArrowRight size={20} />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <div className="size-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Bell className="text-slate-300" size={30} />
            </div>
            <p className="text-slate-500 font-medium">
              Hələ ki, heç bir bildiriş yoxdur.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
