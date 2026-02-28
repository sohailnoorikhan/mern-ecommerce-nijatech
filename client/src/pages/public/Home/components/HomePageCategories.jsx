// React Router
import { Link } from "react-router";

// Icons
import { ChevronLeft, ChevronRight } from "lucide-react";

// Hooks
import { useRef } from "react";

// RTK Query
import {
  useGetProductsQuery,
  useGetCategoryCountsQuery,
} from "@/redux/services/productApi";

// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export const HomePageCategories = () => {
  const { data: products = [], isLoading, error } = useGetProductsQuery();
  const { data: categoryCounts } = useGetCategoryCountsQuery();

  const getCount = (name) => categoryCounts?.[name] || 0;

  const getCategoryImage = (categoryName) => {
    const product = products.find((p) => p.category === categoryName);
    return product?.images[0] || "fallback-image-url.png";
  };

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const categories = [
    {
      name: "Laptops",
      title: "Noutbuklar",
      productIndex: 3,
      gradientClass: "from-blue-500 to-blue-600",
    },
    {
      name: "Monitors",
      title: "Monitorlar",
      productIndex: 11,
      gradientClass: "from-orange-500 to-orange-600",
    },
    {
      name: "Keyboards",
      title: "Klaviaturalar",
      productIndex: 21,
      gradientClass: "from-green-500 to-green-600",
    },
    {
      name: "Mouses",
      title: "Siçanlar",
      productIndex: 23,
      gradientClass: "from-purple-500 to-purple-600",
    },
    {
      name: "Headphones",
      title: "Qulaqlıqlar",
      productIndex: 25,
      gradientClass: "from-red-500 to-red-600",
    },
    {
      name: "RAM",
      title: "RAM",
      productIndex: 17,
      gradientClass: "from-teal-500 to-teal-600",
    },
    {
      name: "Graphics Cards",
      title: "Qrafik Kartlar",
      productIndex: 13,
      gradientClass: "from-pink-500 to-pink-600",
    },
    {
      name: "SSD",
      title: "SSD",
      productIndex: 15,
      gradientClass: "from-yellow-500 to-yellow-600",
    },
    {
      name: "Processors",
      title: "Prosessorlar",
      productIndex: 19,
      gradientClass: "from-cyan-500 to-cyan-600",
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;
  return (
    <>
      <div className="bg-linear-to-b from-white to-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Kateqoriyalar
              </h2>
              <p className="text-gray-600">Axtardığınızı tez tapın</p>
            </div>
            <div className="flex space-x-2">
              <button
                ref={prevRef}
                className="p-3 rounded-xl bg-white border border-gray-200 hover:bg-blue-600 hover:text-white
                hover:border-blue-600 transition-all shadow-md duration-300"
              >
                <ChevronLeft />
              </button>
              <button
                ref={nextRef}
                className="p-3 rounded-xl bg-white border border-gray-200 hover:bg-blue-600 hover:text-white
                hover:border-blue-600 transition-all shadow-md duration-300"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={5}
            loop={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {categories.map((cat) => (
              <SwiperSlide key={cat.name} className="py-4">
                <Link
                  to={`/products?category=${cat.name}`}
                  className="group relative bg-white rounded-3xl overflow-hidden cursor-pointer transform hover:-translate-y-3 transition-all duration-300"
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${cat.gradientClass} opacity-10 group-hover:opacity-15 transition-opacity duration-300 rounded-3xl overflow-hidden`}
                  ></div>

                  <div className="relative flex flex-col items-center text-center overflow-hidden p-7  rounded-3xl shadow-lg">
                    <div className="mb-6 relative rounded-3xl">
                      <span className="relative text-6xl group-hover:scale-115 transition-transform duration-300 inline-block rounded-3xl overflow-hidden">
                        <img
                          src={getCategoryImage(cat.name)}
                          alt={cat.title}
                          className="w-32 h-24 object-contain"
                        />
                      </span>
                    </div>
                    <h3
                      className="text-base font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text 
                      group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all"
                    >
                      {cat.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      {categoryCounts?.[cat.name] || 0} məhsul
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
