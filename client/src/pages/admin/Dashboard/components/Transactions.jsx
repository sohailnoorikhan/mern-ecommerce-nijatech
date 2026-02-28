// Hooks
import { useState, useMemo } from "react";

// Redux
import {
  useGetOrdersQuery,
  useDeleteOrderMutation,
} from "@/redux/services/orderApi";

// Icons
import { ExternalLink, Eye, Trash2, Loader2, Package } from "lucide-react";

// Swal
import Swal from "sweetalert2";

// Toast
import toast from "react-hot-toast";

// Components
import { OrderDetailsModal } from "../../Orders/OrderDetailsModal";

// React Router
import { useNavigate } from "react-router";

export const Transactions = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data: orders, isLoading, refetch } = useGetOrdersQuery();

  const [deleteOrder] = useDeleteOrderMutation();

  const recentOrders = useMemo(() => {
    if (!orders) return [];
    return [...orders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [orders]);

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
        toast.error(err.data?.message || "Xəta baş verdi");
      }
    }
  };

  if (isLoading)
    return (
      <div className="bg-white p-10 rounded-xl border border-slate-100 flex justify-center">
        <Loader2 className="animate-spin text-[#135bec]" />
      </div>
    );

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden col-span-12">
      <div className="p-5 md:p-6 border-b border-slate-50 flex justify-between items-center">
        <div>
          <h4 className="text-base md:text-lg font-bold text-slate-900 tracking-wide">
            Son Əməliyyatlar
          </h4>
          <p className="text-xs md:text-sm text-slate-400 tracking-wide">
            Sifarişlərin icra vəziyyəti
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/orders")}
          className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-xs md:text-sm font-bold transition-all underline-offset-4 hover:underline"
        >
          Bütün siyahı <ExternalLink size={14} />
        </button>
      </div>

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
            {recentOrders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="px-6 py-4 text-xs font-bold text-[#135bec]">
                  #ORD-{order._id.slice(-4).toUpperCase()}
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

      {recentOrders.length === 0 && (
        <div className="py-10 text-center">
          <Package className="mx-auto text-slate-200 mb-2" size={48} />
          <p className="text-slate-500 text-sm font-medium">
            Hələ ki, sifariş yoxdur.
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
