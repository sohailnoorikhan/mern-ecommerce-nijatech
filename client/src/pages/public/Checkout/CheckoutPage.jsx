// Redux
import { clearCart } from "@/redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";

// React Router
import { useNavigate } from "react-router";

// Hooks
import { useState, useEffect } from "react";

// Icons
import {
  ChevronLeft,
  CreditCard,
  Truck,
  ShieldCheck,
  MapPin,
} from "lucide-react";

// Toast
import toast from "react-hot-toast";

// Axios
import API from "@/api/axios";

// Swal
import Swal from "sweetalert2";

export const CheckoutPage = () => {
  const auth = useSelector((state) => state.auth);

  const userInfo =
    auth?.userInfo || JSON.parse(localStorage.getItem("userInfo"));

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (userInfo && formData.fullName === "" && formData.phone === "") {
      setFormData({
        fullName: userInfo.name || "",
        phone: userInfo.phone || "",
        address: "",
      });
    }
  }, [userInfo, formData.fullName, formData.phone]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 500 ? 0 : 10;
  const total = subtotal + shipping;

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!formData.phone || !formData.address) {
      return toast.error("Zəhmət olmasa bütün sahələri doldurun");
    }

    Swal.fire({
      title: "Sifariş rəsmiləşdirilsin?",
      text: `Toplam ödəniş: ${total} AZN`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      confirmButtonText: "Bəli, sifariş et",
      cancelButtonText: "Geri",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const orderData = {
            orderItems: cartItems.map((item) => ({
              name: item.title,
              qty: item.quantity,
              image: item.image,
              price: item.price,
              product: item._id,
            })),
            totalPrice: total,
            shippingAddress: formData.address,
            phone: formData.phone,
          };

          const { data } = await API.post("/orders", orderData);
          dispatch(clearCart());
          toast.success("Sifarişiniz uğurla qəbul edildi!");
          navigate("/order-success", { state: { orderId: data._id } });
        } catch (error) {
          toast.error("Xəta: " + error.response?.data?.message);
        }
      }
    });
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-4 group"
        >
          <ChevronLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Səbətə qayıt</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <MapPin size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Çatdırılma Məlumatları
                </h2>
              </div>

              <form
                id="checkout-form"
                onSubmit={handleOrderSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Ad və Soyad
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Mobil nömrə
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    required
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Tam ünvan
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Məs: Bakı ş., Nəsimi ray., 28 May küç. bina 14, mənzil 5"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl placeholder:font-medium border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    required
                  ></textarea>
                </div>
              </form>
            </section>

            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <CreditCard size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Ödəniş Metodu
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="relative flex items-center p-4 border-2 border-gray-100 hover:border-blue-200 rounded-2xl cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    className="w-5 h-5 accent-blue-600"
                    defaultChecked
                  />
                  <div className="ml-4">
                    <p className="font-bold text-slate-900">Onlayn Kart ilə</p>
                    <p className="text-xs text-gray-500">
                      Visa, Mastercard, Maestro
                    </p>
                  </div>
                  <div className="ml-auto flex gap-1">
                    <div className="w-8 h-5 border border-blue-400 p-0.5 rounded">
                      <img
                        src="/images/visa-logo-png-transparent.png"
                        alt="Visa"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="w-8 h-5 border border-blue-400 p-0.5 rounded">
                      <img
                        src="/images/Mastercard-logo.svg.png"
                        alt="Mastercard"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </label>

                <label className="relative flex items-center p-4 border-2 border-gray-100 hover:border-blue-200 rounded-2xl cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="payment"
                    className="w-5 h-5 accent-blue-600"
                  />
                  <div className="ml-4">
                    <p className="font-bold text-slate-900">Qapıda Nağd</p>
                    <p className="text-xs text-gray-500">Kuryerə ödəmə</p>
                  </div>
                  <Truck className="ml-auto text-gray-300" />
                </label>
              </div>
            </section>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-50 sticky top-28">
              <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
                Sifariş Xülasəsi
              </h3>

              <div className="max-h-60 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} x {item.price} AZN
                      </p>
                    </div>
                    <p className="font-bold text-slate-900 text-sm whitespace-nowrap">
                      {item.price * item.quantity} AZN
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Məhsullar:</span>
                  <span className="font-semibold">{subtotal} AZN</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Çatdırılma:</span>
                  <span className="font-semibold text-green-600">
                    {shipping === 0 ? "Pulsuz" : `${shipping} AZN`}
                  </span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-slate-900 pt-3">
                  <span>Toplam:</span>
                  <span>{total} AZN</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="w-full bg-blue-600 text-white py-3 rounded-2xl font-bold text-lg mt-8 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
              >
                Sifarişi Təsdiqlə
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                <ShieldCheck size={18} className="text-green-500" />
                <span className="text-[11px]">256-bit SSL ilə qorunur</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
