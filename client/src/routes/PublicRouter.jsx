// React Router
import { Route, Routes } from "react-router";

// Layouts
import { MainLayout } from "@/components/layouts/MainLayout/MainLayout";

// Pages
import { FaqPage } from "@/pages/public/Faq";
import { CartPage } from "@/pages/public/Cart";
import { AuthPage } from "@/pages/public/Auth";
import { BrandsPage } from "@/pages/public/Brands";
import { Warranty } from "@/pages/public/Warranty";
import { ProfilePage } from "@/pages/public/Profile";
import { WishlistPage } from "@/pages/public/Wishlist";
import { CheckoutPage } from "@/pages/public/Checkout";
import { ProductDetails } from "@/pages/public/Product";
import { HomePage } from "@/pages/public/Home/HomePage";
import { ResetPassword } from "@/pages/public/ResetPassword";
import { ForgotPassword } from "@/pages/public/ForgotPassword";
import { OrderSuccessPage } from "@/pages/public/OrderSuccess";
import { DeliveryPayment } from "@/pages/public/DeliveryPayment";
import { ProductsPage } from "@/pages/public/Products/ProductsPage";

export const PublicRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/warranty" element={<Warranty />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/delivery-payment" element={<DeliveryPayment />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
};
