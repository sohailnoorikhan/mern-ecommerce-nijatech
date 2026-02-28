export const ProductsPageBanner = ({
  categoryName,
  count,
  isDiscountPage,
  brandName,
  searchFromUrl,
}) => {
  const translate = {
    Laptops: "Noutbuklar",
    Monitors: "Monitorlar",
    "Graphics Cards": "Grafik Kartlar",
    SSD: "SSD",
    RAM: "RAM",
    Processors: "Prosessorlar",
    Keyboards: "Klaviaturalar",
    Mouses: "Siçanlar",
    Headphones: "Qulaqlıqlar",
  };

  let title = "Bütün məhsullar";

  if (isDiscountPage) {
    title = "Endirimlər";
  } else if (brandName) {
    title = brandName.toUpperCase();
  } else if (categoryName) {
    title = translate[categoryName] || categoryName;
  } else if (searchFromUrl) {
    title = searchFromUrl.toUpperCase();
  }

  return (
    <>
      <div
        className={`py-12 transition-all duration-500 ${
          isDiscountPage
            ? "bg-linear-to-r from-red-600 to-orange-600"
            : "bg-linear-to-r from-blue-600 to-purple-600"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold text-white mb-2">{title}</h1>
          <p className="text-blue-100">{count} məhsul tapıldı</p>
        </div>
      </div>
    </>
  );
};
