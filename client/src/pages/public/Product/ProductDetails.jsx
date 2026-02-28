// Hooks
import { useState } from "react";

// React Router
import { useParams, useNavigate } from "react-router";

// Icons
import {
  Star,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RefreshCcw,
  ChevronLeft,
  Minus,
  Plus,
  Heart,
} from "lucide-react";

// Redux
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { toggleWishlist } from "@/redux/slices/wishlistSlice";

// Toast
import toast from "react-hot-toast";

// RTK Query
import { useGetProductByIdQuery } from "@/redux/services/productApi";

export const ProductDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: product, isLoading, error } = useGetProductByIdQuery(id);

  const [quantity, setQuantity] = useState(1);

  const [activeImage, setActiveImage] = useState(0);

  const SpecRow = ({ label, value }) => (
    <div className="flex items-center justify-between py-4 border border-gray-200 group hover:bg-gray-50/50 px-4 transition-colors rounded-xl">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="text-slate-900 font-bold">{value}</span>
    </div>
  );

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        title: product.title,
        price: product.discountedPrice || product.price,
        image: product.images[0],
        quantity: quantity,
      }),
    );

    toast.success(`${product.title} səbətə əlavə edildi!`, {
      style: {
        borderRadius: "6px",
        background: "#4caf50",
        color: "#fff",
        padding: "12px",
      },
      iconTheme: {
        primary: "#3b82f6",
        secondary: "#fff",
      },
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));

    if (!isWishlisted) {
      toast.success("İstək siyahısına əlavə edildi", {
        style: {
          borderRadius: "6px",
          background: "#4caf50",
          color: "#fff",
          padding: "12px",
        },
        iconTheme: {
          primary: "#3b82f6",
          secondary: "#fff",
        },
      });
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">
            Məhsul yüklənir...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-bold">
          Xəta baş verdi: Məhsul tapılmadı.
        </p>
      </div>
    );

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-8 group font-semibold"
        >
          <ChevronLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Geri
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 xl:col-span-7 space-y-6">
            <div className=" bg-[#F9FAFB] rounded-[40px] overflow-hidden border border-gray-100 flex items-center justify-center p-8 md:p-16 relative">
              <img
                src={product?.images[activeImage]}
                alt={product?.title}
                className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-500"
              />
              {product?.discountPercentage > 0 && (
                <div className="absolute top-8 left-8 bg-green-500 text-white font-bold px-3 py-1 text-sm rounded-2xl shadow-xl shadow-red-100">
                  -{product.discountPercentage}%
                </div>
              )}
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              {product?.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-24 h-24 shrink-0 rounded-2xl border-2 transition-all p-2 bg-gray-50 ${
                    activeImage === index
                      ? "border-blue-600 shadow-lg shadow-blue-50"
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-start">
            <div className="mb-6">
              <span className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest mb-4">
                {product?.brand}
              </span>
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 leading-[1.1] mb-4">
                {product?.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
                  <Star size={18} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-slate-900 font-black">
                    {product?.rating}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 border-l-4 border-blue-600 pl-6 bg-blue-50/30 py-4 rounded-r-2xl">
              {product?.description}
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-12">
                <div className="flex flex-col">
                  {product?.discountedPrice && (
                    <span className="text-gray-400 line-through text-sm font-bold">
                      {product.price} AZN
                    </span>
                  )}
                  <span className="text-4xl font-bold text-slate-900 tracking-tighter">
                    {product?.discountedPrice || product?.price}{" "}
                    <span className="text-2xl">AZN</span>
                  </span>
                </div>

                <div className="flex items-center bg-white p-1.5 rounded-xl border border-gray-200">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-all"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-bold text-base text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((q) => Math.min(product?.stock || 10, q + 1))
                    }
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-3 h-12 bg-blue-600 text-white rounded-3xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-700 hover:-translate-y-1 transition-all shadow-2xl shadow-blue-200"
                >
                  <ShoppingCart size={24} />
                  Səbətə əlavə et
                </button>
                <button
                  onClick={handleWishlist}
                  className="flex-1 h-12 bg-white border-2 border-gray-100 text-slate-900 rounded-3xl font-bold flex items-center justify-center hover:bg-red-50 hover:border-red-100 hover:text-red-500 transition-all"
                >
                  <Heart size={28} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-green-200 rounded-2xl flex items-center justify-center text-slate-900 border border-slate-100">
                    <Truck size={22} />
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Sürətli Karqo
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-blue-200 rounded-2xl flex items-center justify-center text-slate-900 border border-slate-100">
                    <ShieldCheck size={22} />
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Orijinal Məhsul
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-purple-200 rounded-2xl flex items-center justify-center text-slate-900 border border-slate-100">
                    <RefreshCcw size={22} />
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    14 Gün İadə
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-gray-200 pt-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">
              Texniki Xüsusiyyətlər
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {product?.brand && <SpecRow label="Brend" value={product.brand} />}
            {product?.processor && (
              <SpecRow label="Prosessor" value={product.processor} />
            )}
            {product?.ram && <SpecRow label="RAM" value={product.ram} />}
            {product?.memory && (
              <SpecRow label="Yaddaş" value={product.memory} />
            )}
            {product?.screen && (
              <SpecRow label="Ekran" value={product.screen} />
            )}
            {product?.vram && (
              <SpecRow label="Video Kart (VRAM)" value={product.vram} />
            )}
            {product?.weight && (
              <SpecRow label="Çəki" value={`${product.weight} kq`} />
            )}
            {product?.category && (
              <SpecRow label="Kateqoriya" value={product.category} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
