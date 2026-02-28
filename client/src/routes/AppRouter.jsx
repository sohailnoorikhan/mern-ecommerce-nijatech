// React Router
import { Route, Routes, BrowserRouter } from "react-router";

// Routers
import { PublicRouter } from "./PublicRouter";
import { AdminRouter } from "./AdminRouter";

// Utils
import { ScrollToTop } from "@/utils";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/*" element={<PublicRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
    </BrowserRouter>
  );
};
