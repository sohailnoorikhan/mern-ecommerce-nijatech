import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "@/redux/slices/wishlistSlice";
import { addToCart } from "@/redux/slices/cartSlice";
import { Trash2, ShoppingCart, HeartOff, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";

export const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleMoveToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    dispatch(removeFromWishlist(product._id));
    toast.success("Məhsul səbətə köçürüldü!", {
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

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6">
        <div className="bg-gray-50 p-10 rounded-full">
          <HeartOff size={80} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          İstək siyahınız boşdur
        </h2>
        <p className="text-gray-500">
          Bəyəndiyiniz məhsulları bura əlavə edə bilərsiniz.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
        >
          Alış-verişə başla
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          İstək Siyahısı{" "}
          <span className="text-blue-600 text-lg">
            ({wishlistItems.length})
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="group relative bg-white border border-gray-100 rounded-4xl overflow-hidden hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500"
            >
              <div className="aspect-square bg-gray-50 p-8 flex items-center justify-center relative overflow-hidden">
                <img
                  src={item.image || item.images?.[0]}
                  alt={item.title}
                  className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
                <button
                  onClick={() => dispatch(removeFromWishlist(item._id))}
                  className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-md text-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-sm"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex gap-4 items-center">
                    <p className="text-2xl font-bold text-slate-900 mt-2">
                      {item?.discountedPrice || item?.price} AZN
                    </p>
                    {item?.discountedPrice && (
                      <span className="text-sm text-gray-400 line-through pt-2">
                        {item.price} AZN
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-600 transition-all"
                  >
                    <ShoppingCart size={16} /> Səbətə at
                  </button>
                  <Link
                    to={`/product/${item._id}`}
                    className="p-3 bg-gray-100 text-slate-600 rounded-xl hover:bg-gray-200 transition-all"
                  >
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
