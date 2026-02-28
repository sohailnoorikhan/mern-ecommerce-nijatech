// Hooks
import { useState } from "react";

// React Router
import { Link } from "react-router";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { toggleWishlist } from "@/redux/slices/wishlistSlice";

// Icons
import { ShoppingCart, Check, Heart } from "lucide-react";

// Toast
import toast from "react-hot-toast";

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = useSelector((state) =>
    state.wishlist?.items?.some((item) => item._id === product._id),
  );

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

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        title: product.title,
        price: product.discountedPrice || product.price,
        image: product.images[0],
        category: product.category,
      }),
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

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

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1">
      <button
        onClick={handleWishlist}
        className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:scale-110 transition-all group/wish"
      >
        <Heart
          size={18}
          className={`${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400 group-hover/wish:text-red-500"} transition-colors`}
        />
      </button>
      <div className="aspect-square bg-linear-to-br from-gray-50 via-white to-gray-100 p-8 flex items-center justify-center relative overflow-hidden">
        {product?.discountPercentage && (
          <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
            -{product.discountPercentage}%
          </div>
        )}
        <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
        <Link to={`/product/${product._id}`}>
          <img
            src={product?.images[0]}
            alt={product?.title}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 relative z-10"
          />
        </Link>
      </div>

      <div className="p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-3 line-clamp-2 h-10 group-hover:text-blue-600 transition-colors">
          {product?.title}
        </h3>

        <div className="mb-4">
          <p className="text-xs text-gray-500 line-clamp-1 font-medium">
            {product?.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <p className="text-xl font-bold text-slate-900">
            {product?.discountedPrice || product?.price} AZN
          </p>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 
              ${isAdded ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4" />{" "}
                <span className="text-sm">Əlavə edildi</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />{" "}
                <span className="text-sm">Səbətə at</span>
              </>
            )}
          </button>

          <Link
            to={`/product/${product._id}`}
            className="px-4 py-2.5 border border-gray-300 rounded-lg font-medium hover:border-blue-500 hover:bg-blue-50 transition-colors text-sm text-gray-700"
          >
            Ətraflı
          </Link>
        </div>
      </div>
    </div>
  );
};
