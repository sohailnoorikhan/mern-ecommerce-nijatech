// React Router
import { Link } from "react-router";

// Icons
import { Youtube, Instagram, Phone, Facebook } from "lucide-react";

export const Header = () => {
  return (
    <div className="bg-slate-900 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2 text-[13px]">
        <div className="flex items-center">
          <a
            href="tel:+994708928645"
            className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
          >
            <Phone size={14} />
            <span className="font-medium">+994 70 892 86 45</span>
          </a>

          <span className="w-px h-3 bg-gray-600 mx-4 hidden sm:block"></span>

          <p className="text-gray-400 hidden sm:block">
            Hər gün: 09:00 - 21:00
          </p>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <Link
              target="_blank"
              to="https://www.instagram.com"
              className="text-gray-300 hover:text-pink-500 transition-all"
            >
              <Instagram size={16} />
            </Link>
            <Link
              target="_blank"
              to="https://www.facebook.com"
              className="text-gray-300 hover:text-blue-500 transition-all"
            >
              <Facebook size={16} />
            </Link>
            <Link
              target="_blank"
              to="https://www.youtube.com"
              className="text-gray-300 hover:text-red-500 transition-all"
            >
              <Youtube size={16} />
            </Link>
          </div>

          <span className="w-px h-3 bg-gray-600 mx-1 hidden md:block"></span>

          <Link
            to="/faq"
            className="text-gray-400 hover:text-white transition-colors hidden md:block"
          >
            Yardım
          </Link>
        </div>
      </div>
    </div>
  );
};
