// Hooks
import { useEffect } from "react";

// React Router
import { useLocation } from "react-router";

export const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]); 

  return null;
};
