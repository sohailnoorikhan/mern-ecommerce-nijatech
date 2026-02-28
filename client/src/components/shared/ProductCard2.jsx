// Hooks
import { useState } from "react";

// React Router
import { Link } from "react-router";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { toggleWishlist } from "@/redux/slices/wishlistSlice";

// Icons
import { Star, ShoppingCart, Check, Heart } from "lucide-react";

// Toast
import toast from "react-hot-toast";

export const ProductCard2 = ({ product }) => {
  const dispatch = useDispatch();

  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = useSelector((state) =>
    state.wishlist?.items?.some((item) => item._id === product._id),
  );

  const handleWishlist = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    dispatch(
      addToCart({
        _id: product._id,
        title: product.title,
        price: product.discountedPrice || product.price,
        image: product.images[0],
        category: product.category,
        brand: product.brand,
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
    <div className="group max-sm:w-90 max-sm:mx-auto bg-white rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2">
      <button
        onClick={handleWishlist}
        className={`absolute top-4 right-4 z-20 p-2.5 rounded-full transition-all duration-300 ${
          isWishlisted
            ? "bg-red-50 text-red-500 shadow-md"
            : "bg-white/90 text-gray-400 hover:text-red-500 shadow-sm"
        }`}
      >
        <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
      </button>
      <div className="aspect-square bg-linear-to-br from-gray-50 via-white to-gray-100 p-8 flex items-center justify-center relative overflow-hidden">
        {product?.discountPercentage && (
          <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            -{product.discountPercentage}%
          </div>
        )}
        <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
        <img
          src={product?.images[0]}
          alt={product?.title}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 relative z-10"
        />
      </div>

      <div className="p-5">
        <div className="mb-2">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {product?.brand}
          </span>
        </div>
        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 h-10 group-hover:text-blue-600 transition-colors">
          {product?.title}
        </h3>

        <div className="flex items-center mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return ratingValue <= product?.rating ? (
                <Star
                  key={index}
                  className="text-yellow-400 fill-yellow-400 size-3.5"
                />
              ) : (
                <Star key={index} className="text-gray-300 size-3.5" />
              );
            })}
          </div>
          <span className="text-xs font-semibold text-gray-400 ml-2">
            ({product?.rating})
          </span>
        </div>

        <div className="flex items-baseline space-x-2 mb-4">
          <span className="text-2xl font-bold text-slate-900">
            {product?.discountedPrice || product?.price} AZN
          </span>
          {product?.discountedPrice && (
            <span className="text-sm text-gray-400 line-through">
              {product.price} AZN
            </span>
          )}
        </div>

        <div className="flex gap-2">
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
            Bax
          </Link>
        </div>
      </div>
    </div>
  );
};
