// React Router
import { Link } from "react-router";

export const HomePageBrands = () => {
  return (
    <>
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Brendlər
            </h2>
            <p className="text-gray-600">Dünya brendləri ilə tanış olun</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6">
            <Link
              to="/products?brand=acer"
              className="group relative bg-linear-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500
              hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100
                transition-opacity duration-300"
              ></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-white/30 
                  to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"
                ></div>
              </div>
              <div className="relative flex flex-col items-center justify-center text-center min-h-30">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors tracking-wider">
                  ACER
                </h3>
                <p className="text-xs text-gray-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Explore Beyond Limits
                </p>
                <div
                  className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100
                  transition-opacity duration-200"
                ></div>
                <div
                  className="absolute bottom-2 left-2 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100
                  transition-opacity duration-200"
                ></div>
              </div>
            </Link>
            <Link
              to="/products?brand=asus"
              className="group relative bg-linear-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500
              hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100
                transition-opacity duration-300"
              ></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-white/30 
                  to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"
                ></div>
              </div>
              <div className="relative flex flex-col items-center justify-center text-center min-h-30">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors tracking-wider">
                  ASUS
                </h3>
                <p className="text-xs text-gray-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  In Search of Incredible
                </p>
                <div
                  className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100
                  transition-opacity duration-200"
                ></div>
                <div
                  className="absolute bottom-2 left-2 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100
                  transition-opacity duration-200"
                ></div>
              </div>
            </Link>
            <Link
              to="/products?brand=hp"
              className="group relative bg-linear-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500
              hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100
                transition-opacity duration-300"
              ></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-white/30 
                  to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"
                ></div>
              </div>
              <div className="relative flex flex-col items-center justify-center text-center min-h-30">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors tracking-wider">
                  HP
                </h3>
                <p className="text-xs text-gray-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Keep Reinventing
                </p>
                <div
                  className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100
                  transition-opacity duration-200"
                ></div>
                <div
                  className="absolute bottom-2 left-2 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100
                  transition-opacity duration-200"
                ></div>
              </div>
            </Link>
            <Link
              to="/products?brand=msi"
              className="group relative bg-linear-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500
              hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100
                transition-opacity duration-300"
              ></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-white/30 
                  to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"
                ></div>
              </div>
              <div className="relative flex flex-col items-center justify-center text-center min-h-30">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors tracking-wider">
                  MSI
                </h3>
                <p className="text-xs text-gray-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  True Gaming
                </p>
                <div
                  className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100
                  transition-opacity duration-200"
                ></div>
                <div
                  className="absolute bottom-2 left-2 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100
                  transition-opacity duration-200"
                ></div>
              </div>
            </Link>
            <Link
              to="/products?brand=dell"
              className="group relative bg-linear-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500
              hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100
                transition-opacity duration-300"
              ></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-white/30 
                  to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"
                ></div>
              </div>
              <div className="relative flex flex-col items-center justify-center text-center min-h-30">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors tracking-wider">
                  DELL
                </h3>
                <p className="text-xs text-gray-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Technology that Empowers
                </p>
                <div
                  className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100
                  transition-opacity duration-200"
                ></div>
                <div
                  className="absolute bottom-2 left-2 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100
                  transition-opacity duration-200"
                ></div>
              </div>
            </Link>
            <Link
              to="/products?brand=lenovo"
              className="group relative bg-linear-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500
              hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100
                transition-opacity duration-300"
              ></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-white/30 
                  to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"
                ></div>
              </div>
              <div className="relative flex flex-col items-center justify-center text-center min-h-30">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors tracking-wider">
                  LENOVO
                </h3>
                <p className="text-xs text-gray-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Exceed Your Vision
                </p>
                <div
                  className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100
                  transition-opacity duration-200"
                ></div>
                <div
                  className="absolute bottom-2 left-2 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100
                  transition-opacity duration-200"
                ></div>
              </div>
            </Link>
            <Link
              to="/products?brand=logitech"
              className="group relative bg-linear-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500
              hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100
                transition-opacity duration-300"
              ></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-white/30 
                  to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"
                ></div>
              </div>
              <div className="relative flex flex-col items-center justify-center text-center min-h-30">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors tracking-wider">
                  LOGİTECH
                </h3>
                <p className="text-xs text-gray-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  For Creators
                </p>
                <div
                  className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100
                  transition-opacity duration-200"
                ></div>
                <div
                  className="absolute bottom-2 left-2 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100
                  transition-opacity duration-200"
                ></div>
              </div>
            </Link>
            <Link
              to="/products?brand=rampage"
              className="group relative bg-linear-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500
              hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100
                transition-opacity duration-300"
              ></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-white/30 
                  to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"
                ></div>
              </div>
              <div className="relative flex flex-col items-center justify-center text-center min-h-30">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors tracking-wider">
                  RAMPAGE
                </h3>
                <p className="text-xs text-gray-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Gaming Gear
                </p>
                <div
                  className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100
                  transition-opacity duration-200"
                ></div>
                <div
                  className="absolute bottom-2 left-2 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100
                  transition-opacity duration-200"
                ></div>
              </div>
            </Link>
          </div>
          <div className="text-center mt-10">
            <Link to="/brands">
              <button
                className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold
              hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Bütün Brendlər
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
