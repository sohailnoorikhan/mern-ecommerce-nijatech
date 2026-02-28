// Icons
import {
  Facebook,
  Youtube,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

// React Router
import { useNavigate } from "react-router";

export const Footer = () => {
  const navigate = useNavigate();

  const handleScrollAndNavigate = (to) => {
    navigate(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shopLinks = [
    { name: "Noutbuklar", path: "/products?category=Laptops" },
    { name: "Monitorlar", path: "/products?category=Monitors" },
    { name: "Klaviaturalar", path: "/products?category=Keyboards" },
    { name: "Siçanlar", path: "/products?category=Mouses" },
  ];

  return (
    <footer className="bg-[#0f172a] text-gray-300 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-8">
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold text-white tracking-tight">
                Nijatech
              </span>
              <span className="text-3xl font-bold text-green-500">.</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Kompüter texnikası və aksesuarları üzrə ixtisaslaşmış mağaza. Ən
              son texnologiyaları və yüksək performansı sizin üçün əlçatan
              edirik.
            </p>
            <div className="flex space-x-4">
              <a
                target="_blank"
                href="https://instagram.com"
                className="p-2 bg-white/5 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
              >
                <Instagram size={20} />
              </a>
              <a
                target="_blank"
                href="https://youtube.com"
                className="p-2 bg-white/5 rounded-lg hover:bg-red-600 hover:text-white transition-all"
              >
                <Youtube size={20} />
              </a>
              <a
                target="_blank"
                href="https://facebook.com"
                className="p-2 bg-white/5 rounded-lg hover:bg-blue-700 hover:text-white transition-all"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-6">
              Mağaza
            </h3>
            <ul className="space-y-4 text-sm">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleScrollAndNavigate(link.path)}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() =>
                    handleScrollAndNavigate("/products?discount=true")
                  }
                  className="text-red-400 hover:text-red-500 font-medium"
                >
                  Endirimlər
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-6">
              Dəstək
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <button
                  onClick={() => handleScrollAndNavigate("/faq")}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Tez-tez verilən suallar
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollAndNavigate("/delivery-payment")}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Çatdırılma və Ödəniş
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollAndNavigate("/warranty")}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Zəmanət şərtləri
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-6">
              Əlaqə
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 shrink-0" />
                <span className="text-gray-400 text-xs">
                  Bakı şəhəri, 28 Səməd Vurğun küç.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <a
                  href="tel:+994708928645"
                  className="text-gray-400 hover:text-white"
                >
                  +994 70 892 86 45
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <a
                  href="mailto:info@nijatech.az"
                  className="text-gray-400 hover:text-white"
                >
                  info@nijatech.az
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © 2026 Nijatech. Bütün hüquqlar qorunur. Hazırladı:{" "}
            <span className="text-gray-400">Nicat Allahverdiyev</span>
          </p>
          <div className="flex items-center gap-4">
            <img
              src="/images/visa-logo-png-transparent.png"
              alt="Visa"
              className="h-6"
            />
            <img
              src="/images/Mastercard-logo.svg.png"
              alt="Mastercard"
              className="h-6"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
