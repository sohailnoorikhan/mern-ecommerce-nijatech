// React Rourter
import { Link, useNavigate } from "react-router";

// Swal
import Swal from "sweetalert2";

// Icons
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

// Redux
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/redux/slices/cartSlice";

import { useSelector, useDispatch } from "react-redux";

// Components
import { ProductCard2 } from "@/components/shared";

// RTX Query
import { useGetProductsQuery } from "@/redux/services/productApi";

// Toast
import toast from "react-hot-toast";

export const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const { data: products = [], isLoading } = useGetProductsQuery();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      toast.error("Sifarişi tamamlamaq üçün giriş etməlisiniz!");
      navigate("/auth");
    }
  };

  const handleRemove = (id, title) => {
    Swal.fire({
      title: "Əminsiniz?",
      text: `${title} səbətdən silinəcək!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Bəli, sil!",
      cancelButtonText: "Ləğv et",
      background: "#ffffff",
      borderRadius: "20px",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(id));
        toast.error("Məhsul silindi");
      }
    });
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 500 || cartItems.length === 0 ? 0 : 10;
  const total = subtotal + shipping;

  const recommendations = products
    .filter((p) => !cartItems.find((item) => item._id === p._id))
    .slice(0, 4);

  if (isLoading) return <div className="py-20 text-center">Yüklənir...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {cartItems.length > 0 ? (
          <>
            <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              Səbətim{" "}
              <span className="text-gray-400 text-lg font-normal">
                ({cartItems.length})
              </span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6"
                  >
                    <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 text-lg">
                        {item.title}
                      </h3>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            onClick={() => dispatch(decreaseQuantity(item._id))}
                            className="p-2 max-sm:p-1 hover:text-blue-600"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 text-center font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => dispatch(increaseQuantity(item._id))}
                            className="p-2 max-sm:p-1 hover:text-blue-600"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemove(item._id, item.title)}
                          className="text-gray-400 max-sm:pl-5 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-slate-900 text-xl">
                        {item.price * item.quantity} AZN
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-3xl shadow-lg sticky top-24">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Sifariş xülasəsi
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Cəmi:</span>
                      <span className="font-bold">{subtotal} AZN</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Çatdırılma:</span>
                      <span className="text-green-600 font-bold">
                        {shipping === 0 ? "Pulsuz" : `${shipping} AZN`}
                      </span>
                    </div>
                    <div className="border-t pt-4 flex justify-between text-2xl font-bold">
                      <span>Toplam:</span>
                      <span>{total} AZN</span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-blue-600 text-white py-3 rounded-2xl font-bold mt-4 hover:bg-blue-700 transition-all"
                    >
                      Sifarişi Tamamla
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold mb-12">
              Səbətiniz hazırda boşdur
            </h2>
            <Link
              to="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl"
            >
              Alış-verişə başla
            </Link>
          </div>
        )}

        <div className="mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Sizin üçün tövsiyə olunur
            </h2>
            <Link
              to="/products"
              className="text-blue-600 font-semibold hover:underline"
            >
              Hamısına bax
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((product) => (
              <ProductCard2 key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
