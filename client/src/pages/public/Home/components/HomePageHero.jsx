// Icons
import { ChevronLeft, ChevronRight } from "lucide-react";

//React Router
import { Link } from "react-router";

// Hooks
import { useRef, useState } from "react";

// RTK Query
import { useGetProductsQuery } from "@/redux/services/productApi";

// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const HomePageHero = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: products, isLoading, error } = useGetProductsQuery();

  const slideStyles = [
    "bg-linear-to-r from-red-600 via-red-700 to-red-900",
    "bg-linear-to-r from-purple-600 via-purple-700 to-purple-900",
    "bg-linear-to-r from-blue-600 via-blue-700 to-blue-900",
  ];

  const heroProducts = products?.slice(2, 5) || [];

  if (isLoading)
    return (
      <div className="h-125 flex items-center justify-center">Yüklənir...</div>
    );
  if (error) return null;

  return (
    <div className="relative overflow-hidden group">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          setTimeout(() => {
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          });
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="mySwiper"
      >
        {heroProducts.map((product, index) => (
          <SwiperSlide key={product._id}>
            <div
              className={`relative ${slideStyles[index]} transition-all duration-700 min-h-125 flex items-center`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="text-white space-y-6 animate-in fade-in slide-in-from-left duration-700">
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                      🔥 Yeni Təklif
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
                      {product.title}
                    </h1>
                    <p className="text-xl text-white/80 max-w-lg line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center space-x-4">
                      <span className="text-5xl font-bold text-green-400">
                        {product.discountedPrice || product.price} AZN
                      </span>
                      {product.discountedPrice && (
                        <span className="text-2xl text-white/50 line-through decoration-red-500">
                          {product.price} AZN
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-4 pt-4">
                      <Link
                        to={`/product/${product._id}`}
                        className="bg-white text-gray-900 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-white/20 hover:shadow-2xl transition-all active:scale-95"
                      >
                        İndi Al
                      </Link>
                      <Link
                        to={`/product/${product._id}`}
                        className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
                      >
                        Ətraflı
                      </Link>
                    </div>
                  </div>

                  <Link to={`/product/${product._id}`}>
                    <div className="flex justify-center animate-in zoom-in duration-1000">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/10 blur-[100px] rounded-full"></div>
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="relative z-10 w-112.5 object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transform hover:rotate-3 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <button
          ref={prevRef}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white p-4 rounded-full transition-all z-30 opacity-0 group-hover:opacity-100 duration-300"
        >
          <ChevronLeft size={30} />
        </button>
        <button
          ref={nextRef}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white p-4 rounded-full transition-all z-30 opacity-0 group-hover:opacity-100 duration-300"
        >
          <ChevronRight size={30} />
        </button>

        <div className="absolute left-1/2 bottom-10 -translate-x-1/2 flex space-x-3 z-30">
          {heroProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => swiperInstance?.slideToLoop(index)}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                activeIndex === index
                  ? "bg-white w-7"
                  : "bg-white/30 w-3 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </Swiper>
    </div>
  );
};
