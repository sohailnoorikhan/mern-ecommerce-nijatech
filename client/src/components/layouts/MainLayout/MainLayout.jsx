// React Router
import { Outlet } from "react-router";

// Toaster
import { Toaster } from "react-hot-toast";

// Components
import { Navbar } from "./Header/Navbar";
import { Footer } from "./Footer/Footer";

export const MainLayout = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
