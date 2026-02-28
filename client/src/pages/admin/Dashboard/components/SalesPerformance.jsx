// Hooks
import { useMemo, useState } from "react";

// Redux
import { useGetOrdersQuery } from "@/redux/services/orderApi";

export const SalesPerformance = () => {
  const { data: orders } = useGetOrdersQuery();

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const monthlyData = useMemo(() => {
    const months = [
      "Yan",
      "Fev",
      "Mar",
      "Apr",
      "May",
      "İyn",
      "İyl",
      "Avq",
      "Sen",
      "Okt",
      "Noy",
      "Dek",
    ];

    const report = months.map((month) => ({ month, total: 0, profit: 0 }));

    if (orders) {
      orders.forEach((order) => {
        const date = new Date(order.createdAt);
        if (date.getFullYear() === Number(selectedYear)) {
          const monthIdx = date.getMonth();
          report[monthIdx].total += order.totalPrice;
          report[monthIdx].profit += order.totalPrice * 0.6;
        }
      });
    }

    const maxVal = Math.max(...report.map((o) => o.total), 1);

    return report.map((item) => ({
      ...item,
      h1: `${(item.total / maxVal) * 100}%`,
      h2: `${(item.profit / maxVal) * 100}%`,
    }));
  }, [orders, selectedYear]);

  return (
    <div className="col-span-12 lg:col-span-8 bg-white p-4 md:p-6 rounded-xl border border-slate-100 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h4 className="text-base md:text-lg font-bold text-slate-900 tracking-wide">
            Aylıq Satış Performansı
          </h4>
          <p className="text-xs md:text-sm text-slate-400 tracking-wide">
            Cari mədaxil və mənfəət analizi
          </p>
        </div>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="bg-slate-50 border-none rounded-lg text-xs font-bold px-3 py-2 outline-none cursor-pointer"
        >
          <option value="2026">2026-cı il</option>
          <option value="2025">2025-ci il</option>
        </select>
      </div>

      <div className="flex items-end justify-between h-64 px-1 md:px-4 relative">
        <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-slate-100 w-full h-0"></div>
          ))}
        </div>

        {monthlyData.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-2 group w-full z-10"
          >
            <div className="flex gap-0.5 md:gap-1 items-end h-48 w-full justify-center">
              <div
                style={{ height: item.h1 }}
                className="w-2 md:w-4 bg-[#135bec] rounded-t-sm transition-all duration-1000 ease-out hover:brightness-110 relative group/tooltip"
              >
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap">
                  {item.total.toFixed(0)} ₼
                </span>
              </div>

              <div
                style={{ height: item.h2 }}
                className="w-2 md:w-4 bg-[#135bec]/30 rounded-t-sm transition-all duration-1000 ease-out delay-100"
              ></div>
            </div>
            <span className="text-[10px] md:text-xs font-bold text-slate-400">
              {item.month}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 md:gap-6 mt-6 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#135bec]"></span>
          <span className="text-[11px] md:text-xs font-semibold text-slate-500">
            Ümumi Satış
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#135bec]/30 rounded-full"></span>
          <span className="text-[11px] md:text-xs font-semibold text-slate-500">
            Xalis Mənfəət
          </span>
        </div>
      </div>
    </div>
  );
};
