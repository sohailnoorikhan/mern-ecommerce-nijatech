// React router
import { Route, Routes, Navigate } from "react-router";

// Redux
import { useSelector } from "react-redux";

// Layout
import { AdminLayout } from "@/components/layouts/AdminLayout/AdminLayout";

// Pages
import { Dashboard } from "@/pages/admin/Dashboard";
import { UsersPage } from "@/pages/admin/Users/Users";
import { OrdersPage } from "@/pages/admin/Orders/Orders";
import { ProductsPage } from "@/pages/admin/Products/Products";
import { SettingsPage } from "@/pages/admin/Settings/Settings";
import { HelpCenterPage } from "@/pages/admin/HelpCenter/HelpCenter";
import { NotificationsPage } from "@/pages/admin/Notifications/Notifications";

export const AdminRouter = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="help-center" element={<HelpCenterPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
      </Route>
    </Routes>
  );
};
