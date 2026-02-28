// Icons
import {
  Truck,
  CreditCard,
  ShieldCheck,
  Clock,
  MapPin,
  BadgeCheck,
} from "lucide-react";

export const DeliveryPayment = () => {
  const deliveryOptions = [
    {
      icon: <Clock className="text-blue-600" size={32} />,
      title: "Sürətli Çatdırılma",
      description:
        "Bakı daxili sifarişlər 24 saat ərzində, bölgələrə isə 2-3 iş günü ərzində çatdırılır.",
    },
    {
      icon: <Truck className="text-blue-600" size={32} />,
      title: "Çatdırılma Qiyməti",
      description:
        "50 AZN-dən yuxarı sifarişlər Bakı daxili pulsuzdur. Daha az məbləğlər üçün çatdırılma 5 AZN təşkil edir.",
    },
    {
      icon: <MapPin className="text-blue-600" size={32} />,
      title: "Təhvil Məntəqələri",
      description:
        "Sifarişinizi sizə yaxın olan mağazalarımızdan və ya təhvil məntəqələrindən özünüz də götürə bilərsiniz.",
    },
  ];

  const paymentMethods = [
    {
      icon: <CreditCard className="text-green-600" size={32} />,
      title: "Onlayn Ödəniş",
      description:
        "Visa və MasterCard kartları ilə saytımızda təhlükəsiz şəkildə ödəniş edə bilərsiniz.",
    },
    {
      icon: <BadgeCheck className="text-green-600" size={32} />,
      title: "Qapıda Ödəniş",
      description:
        "Sifarişinizi təhvil alan zaman nağd və ya terminal vasitəsilə kartla ödəniş etmək mümkündür.",
    },
    {
      icon: <ShieldCheck className="text-green-600" size={32} />,
      title: "Təhlükəsizlik",
      description:
        "Bütün ödənişlər 3D Secure sistemi ilə qorunur və məlumatlarınızın gizliliyinə zəmanət verilir.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-900 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Çatdırılma və Ödəniş
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Sifarişlərinizin sürətli və təhlükəsiz çatdırılması üçün bütün
            şərtləri sadələşdirdik.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        <section>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-slate-900">
              Çatdırılma Şərtləri
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deliveryOptions.map((item, index) => (
              <div
                key={index}
                className="p-8 bg-slate-50 rounded-4xl border border-slate-100 hover:border-blue-200 transition-all group"
              >
                <div className="mb-6 p-4 bg-white w-fit rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-1 bg-green-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-slate-900">
              Ödəniş Üsulları
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paymentMethods.map((item, index) => (
              <div
                key={index}
                className="p-8 bg-slate-50 rounded-4xl border border-slate-100 hover:border-green-200 transition-all group"
              >
                <div className="mb-6 p-4 bg-white w-fit rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
