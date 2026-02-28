// Hooks
import { useState, useMemo } from "react";

// Redux
import {
  useGetOrdersQuery,
  useDeleteOrderMutation,
} from "@/redux/services/orderApi";

// Icons
import {
  Package,
  Truck,
  Clock,
  Search,
  Eye,
  CheckCircle2,
  Calendar,
  Loader2,
  Trash2,
} from "lucide-react";

// Swal
import Swal from "sweetalert2";

// Toast
import toast from "react-hot-toast";

// Components
import { OrderDetailsModal } from "./OrderDetailsModal";

export const OrdersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data: orders, isLoading, refetch } = useGetOrdersQuery();

  const [deleteOrder] = useDeleteOrderMutation();

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("Bütün Statuslar");

  const [dateRange, setDateRange] = useState("30");

  const stats = useMemo(() => {
    if (!orders) return { new: 0, processing: 0, shipping: 0, completed: 0 };
    return {
      new: orders.filter((o) => o.status === "processing").length,
      processing: orders.filter((o) => o.status === "processing").length,
      shipping: orders.filter((o) => o.status === "shipped").length,
      completed: orders.filter((o) => o.status === "delivered").length,
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (!orders) return [];

    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt);

      const now = new Date();

      const diffDays = (now - orderDate) / (1000 * 60 * 60 * 24);

      const matchesSearch =
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "Bütün Statuslar" ||
        (statusFilter === "Ödənilib"
          ? order.isPaid
          : order.status === statusFilter);

      const matchesDate = diffDays <= parseInt(dateRange);

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [orders, searchTerm, statusFilter, dateRange]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Silmək istəyirsiniz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#135bec",
      confirmButtonText: "Bəli",
      cancelButtonText: "Xeyr",
    });
    if (result.isConfirmed) {
      try {
        await deleteOrder(id).unwrap();
        toast.success("Sifariş silindi");
      } catch (err) {
        toast.error(err.data?.message || "Xəta");
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-[#135bec]" />
      </div>
    );

  const OrderStatCard = ({ title, value, icon, color, bg }) => (
    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
      <div>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${bg} ${color}`}>{icon}</div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OrderStatCard
          title="Yeni Sifariş"
          value={stats.new}
          icon={<Clock size={22} />}
          color="text-blue-600"
          bg="bg-blue-50"
        />
        <OrderStatCard
          title="Hazırlanır"
          value={stats.processing}
          icon={<Package size={22} />}
          color="text-amber-600"
          bg="bg-amber-50"
        />
        <OrderStatCard
          title="Yoldadır"
          value={stats.shipping}
          icon={<Truck size={22} />}
          color="text-purple-600"
          bg="bg-purple-50"
        />
        <OrderStatCard
          title="Tamamlanıb"
          value={stats.completed}
          icon={<CheckCircle2 size={22} />}
          color="text-emerald-600"
          bg="bg-emerald-50"
        />
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Sifariş ID və ya Müştəri adı..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#135bec]/10 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              className="bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold px-3 py-2 outline-none text-slate-600 cursor-pointer"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="Bütün Statuslar">Bütün Statuslar</option>
              <option value="delivered">Tamamlanıb</option>
              <option value="processing">Hazırlanır</option>
              <option value="shipped">Yoldadır</option>
            </select>

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-2">
              <Calendar size={14} className="text-slate-400 ml-2" />
              <select
                className="bg-transparent text-xs font-bold px-2 py-2 outline-none text-slate-600 cursor-pointer"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="7">Son 7 gün</option>
                <option value="30">Son 30 gün</option>
                <option value="90">Son 3 ay</option>
                <option value="365">Son 1 il</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
                <th className="px-6 py-4 border-b border-slate-50">Sifariş</th>
                <th className="px-6 py-4 border-b border-slate-50">Müştəri</th>
                <th className="px-6 py-4 border-b border-slate-50 text-center">
                  Tarix
                </th>
                <th className="px-6 py-4 border-b border-slate-50 text-center">
                  Məbləğ
                </th>
                <th className="px-6 py-4 border-b border-slate-50 text-center">
                  Status
                </th>
                <th className="px-6 py-4 border-b border-slate-50 text-right">
                  Fəaliyyət
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700">
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-[#135bec]">
                      #ORD-{order._id.slice(-4).toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-800">
                      {order.user?.name || "Qonaq"}
                    </p>
                  </td>
                  <td className="px-6 text-center py-4 text-xs font-semibold text-slate-500">
                    {new Date(order.createdAt).toLocaleDateString("az-AZ")}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-sm text-slate-900">
                    {order.totalPrice} ₼
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                        order.status === "delivered"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : order.status === "processing"
                            ? "bg-blue-50 text-blue-600 border-blue-100"
                            : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}
                    >
                      {order.status === "delivered"
                        ? "Tamamlanıb"
                        : order.status === "processing"
                          ? "Hazırlanır"
                          : "Yoldadır"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-slate-400 hover:text-[#135bec] hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {filteredOrders.length === 0 && !isLoading && (
        <div className="py-20 text-center">
          <Package className="mx-auto text-slate-200 mb-4" size={64} />
          <p className="text-slate-500 text-lg font-medium">
            Heç bir sifariş tapılmadı.
          </p>
        </div>
      )}
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
        onOrderUpdate={refetch}
      />
    </div>
  );
};
