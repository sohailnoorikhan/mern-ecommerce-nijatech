// Hooks
import { useMemo } from "react";

// Redux
import { useGetOrdersQuery } from "@/redux/services/orderApi";
import { useGetProductsQuery } from "@/redux/services/productApi";
import { useGetUsersQuery } from "@/redux/services/userApi";

// Icons
import {
  Users,
  Wallet,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Loader2,
} from "lucide-react";

const StatCard = ({
  title,
  value,
  trendValue,
  trendLabel,
  icon: Icon,
  colorClass,
  bgClass,
  isUp,
}) => (
  <div className="bg-white p-5 md:p-6 rounded-xl border border-slate-100 flex items-center justify-between shadow-xs transition-all hover:shadow-md">
    <div className="flex-1 min-w-0">
      <p className="text-slate-400 text-sm font-medium tracking-wide truncate">
        {title}
      </p>
      <h3 className="text-xl md:text-2xl font-bold mt-1 tracking-wide">
        {value}
      </h3>
      <p
        className={`${isUp ? "text-emerald-500" : "text-rose-500"} text-[11px] md:text-xs font-bold mt-2 flex items-center flex-wrap gap-1`}
      >
        {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        <span className="tracking-wide">{trendValue}</span>
        <span className="text-slate-400 font-normal tracking-wide whitespace-nowrap">
          {trendLabel}
        </span>
      </p>
    </div>
    <div className={`p-3 ${bgClass} ${colorClass} rounded-xl shrink-0 ml-2`}>
      <Icon size={28} className="md:w-7.5 md:h-7.5" />
    </div>
  </div>
);

export const QuickStats = () => {
  const { data: orders, isLoading: ordersLoading } = useGetOrdersQuery();

  const { data: products, isLoading: productsLoading } = useGetProductsQuery();

  const { data: users, isLoading: usersLoading } = useGetUsersQuery();

  const dynamicStats = useMemo(() => {
    const revenue =
      orders?.reduce((acc, order) => acc + (order.totalPrice || 0), 0) || 0;

    return {
      totalRevenue: revenue.toLocaleString("az-AZ") + " ₼",
      orderCount: orders?.length || 0,
      userCount: users?.length || 0,
      productCount: products?.length || 0,
    };
  }, [orders, users, products]);

  if (ordersLoading || productsLoading || usersLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-10">
        <div className="flex items-center justify-center col-span-full">
          <Loader2 className="animate-spin text-[#135bec]" size={32} />
          <span className="ml-3 text-slate-500 font-medium">
            Məlumatlar yüklənir...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <StatCard
        title="Ümumi Gəlir"
        value={dynamicStats.totalRevenue}
        trendValue="+12.5%"
        trendLabel="vs keçən ay"
        icon={Wallet}
        colorClass="text-[#135bec]"
        bgClass="bg-blue-50"
        isUp={true}
      />

      <StatCard
        title="Ümumi İstifadəçilər"
        value={dynamicStats.userCount}
        trendValue="+5.2%"
        trendLabel="bu həftə"
        icon={Users}
        colorClass="text-indigo-600"
        bgClass="bg-indigo-50"
        isUp={true}
      />

      <StatCard
        title="Sifarişlərin Sayı"
        value={dynamicStats.orderCount}
        trendValue="-0.4%"
        trendLabel="vs dünən"
        icon={ShoppingCart}
        colorClass="text-purple-600"
        bgClass="bg-purple-50"
        isUp={false}
      />

      <StatCard
        title="Məhsulların Sayı"
        value={dynamicStats.productCount}
        trendValue="Aktiv"
        trendLabel="satışda"
        icon={ShoppingBag}
        colorClass="text-emerald-600"
        bgClass="bg-emerald-50"
        isUp={true}
      />
    </div>
  );
};
