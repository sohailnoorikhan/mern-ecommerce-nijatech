// Icons
import { X, Package, User, MapPin, Phone } from "lucide-react";

// Hooks
import { useState, useEffect } from "react";

// Redux
import { useUpdateStatusMutation } from "@/redux/services/orderApi";

export const OrderDetailsModal = ({ isOpen, onClose, order }) => {

  const [updateStatus, { isLoading: isUpdating }] = useUpdateStatusMutation();

  const [currentStatus, setCurrentStatus] = useState(order?.status);

  useEffect(() => {
    if (order) {
      setCurrentStatus(order.status);
    }
  }, [order]);
  
  if (!isOpen || !order) return null;

  const handleStatusChange = async (newStatus) => {
    try {
      await updateStatus({ id: order._id, status: newStatus }).unwrap();

      setCurrentStatus(newStatus);
      toast.success("Status yeniləndi!");
    } catch (error) {
      toast.error(error?.data?.message || "Xəta baş verdi");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Sifariş Detalları
            </h2>
            <p className="text-[10px] text-[#135bec] font-mono font-bold uppercase tracking-wider">
              ID: {order._id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[75vh] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
              <div className="flex items-center gap-2 mb-3 text-[#135bec]">
                <User size={16} />{" "}
                <span className="text-xs font-bold uppercase tracking-tight">
                  Müştəri Məlumatı
                </span>
              </div>
              <p className="text-sm font-bold text-slate-800">
                {order.user?.name}
              </p>
              <p className="text-xs text-slate-500 mb-2">{order.user?.email}</p>

              <div className="flex items-center gap-2 text-slate-700 mt-2 pt-2 border-t border-blue-100/50">
                <Phone size={14} className="text-[#135bec]" />
                <span className="text-xs font-bold">
                  {order.phone
                    ? order.phone
                    : order.user?.phone
                      ? order.user.phone
                      : "Nömrə yoxdur"}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
              <div className="flex items-center gap-2 mb-3 text-emerald-600">
                <MapPin size={16} />{" "}
                <span className="text-xs font-bold uppercase tracking-tight">
                  Çatdırılma Ünvanı
                </span>
              </div>
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                {order.address || "Ünvan qeyd edilməyib"}
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3 text-slate-400">
              <Package size={16} />{" "}
              <span className="text-xs font-bold uppercase tracking-widest">
                Sifariş Olunan Məhsullar
              </span>
            </div>
            <div className="space-y-3">
              {order.orderItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-14 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-[#135bec] transition-colors">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {item.qty} ədəd <span className="mx-1">×</span>{" "}
                        {item.price.toFixed(2)} ₼
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    {(item.qty * item.price).toFixed(2)} ₼
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Sifariş Statusu
              </span>
              <select
                value={currentStatus}
                disabled={isUpdating}
                onChange={(e) => handleStatusChange(e.target.value)}
                className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border outline-none transition-all cursor-pointer ${
                  currentStatus === "delivered"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                    : currentStatus === "cancelled"
                      ? "bg-red-50 text-red-600 border-red-200"
                      : "bg-amber-50 text-amber-600 border-amber-200"
                }`}
              >
                <option value="processing">Hazırlanır</option>
                <option value="shipped">Yoldadır</option>
                <option value="delivered">Çatdırıldı</option>
                <option value="cancelled">Ləğv edilib</option>
              </select>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Ümumi Məbləğ
              </p>
              <p className="text-3xl font-bold text-slate-900 tracking-tight">
                {order.totalPrice.toFixed(2)} <span className="text-lg">₼</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
