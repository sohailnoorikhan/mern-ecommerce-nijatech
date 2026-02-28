// Hooks
import { useEffect } from "react";

// React Router
import { Link, useLocation, useNavigate } from "react-router";

// Confetti
import confetti from "canvas-confetti";

// Icons
import {
  CheckCircle2,
  Package,
  ArrowRight,
  ShoppingBag,
  Download,
  ClipboardList,
} from "lucide-react";

export const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const realOrderId = location.state?.orderId;

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    if (!realOrderId) navigate("/");

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, [realOrderId, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-blue-100 overflow-hidden border border-gray-100 relative">
          <div className="h-3 bg-blue-600 w-full"></div>

          <div className="p-8 md:p-12 text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25"></div>
                <div className="relative bg-green-50 w-24 h-24 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <CheckCircle2 size={48} className="text-green-600" />
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Sifarişiniz Tamamlandı!
            </h1>
            <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
              Təşəkkür edirik! Sifarişiniz uğurla qəbul edildi və hazırda emal
              olunur.
            </p>

            <div className="bg-slate-50 rounded-3xl p-6 mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-100">
              <div className="text-left space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Sifariş Nömrəsi
                </p>
                <p className="text-lg font-bold text-slate-900">
                  #
                  {realOrderId
                    ? realOrderId.slice(-6).toUpperCase()
                    : "NT-YÜKLƏNİR"}
                </p>
              </div>
              <div className="text-left md:text-right space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Təxmini Çatdırılma
                </p>
                <p className="text-lg font-bold text-slate-900">
                  24-48 saat ərzində
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() =>
                  navigate("/profile", { state: { activeTab: "orders" } })
                }
                className="flex-1 bg-white border-2 border-slate-200 text-slate-700 py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all group"
              >
                <ClipboardList size={20} className="text-blue-600" />
                <span>Sifarişlərim</span>
              </button>
              <Link
                to="/products"
                className="flex-1 bg-slate-900 text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 group"
              >
                <ShoppingBag size={20} />
                <span>Alış-verişə davam</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>

          <div className="bg-slate-50 p-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Package size={16} className="text-blue-600" />
              <span>Sifariş statusunu profilinizdən izləyə bilərsiniz.</span>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-gray-400 text-sm">
          Sualınız var?{" "}
          <Link
            to="/contact"
            className="text-blue-600 font-bold hover:underline"
          >
            Dəstək komandası
          </Link>{" "}
          ilə əlaqə saxlayın.
        </p>
      </div>
    </div>
  );
};
