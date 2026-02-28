// Hooks
import { useState } from "react";

// React Router
import { useParams, useNavigate } from "react-router";

// Icons
import { Lock, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";

// Axios
import API from "@/api/axios";

// Toast
import toast from "react-hot-toast";

export const ResetPassword = () => {
  const { token } = useParams(); 

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Şifrələr üst-üstə düşmür!");
    }

    setLoading(true);
    try {
      await API.post(`/auth/reset-password/${token}`, {
        password: formData.password,
      });
      toast.success("Şifrəniz uğurla yeniləndi!");
      navigate("/auth"); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[40px] border border-gray-100 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Yeni Şifrə</h2>
          <p className="text-gray-500 mt-2">
            Zəhmət olmasa yeni şifrənizi təyin edin.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <label className="text-xs font-semibold text-gray-400 uppercase ml-1 mb-2 block">
              Yeni Şifrə
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="block w-full pl-6 pr-12 py-4 bg-gray-100 border border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="relative group">
            <label className="text-xs font-semibold text-gray-400 uppercase ml-1 mb-2 block">
              Şifrəni Təsdiqlə
            </label>
            <input
              type={showPassword ? "text" : "password"}
              required
              className="block w-full px-6 py-4 bg-gray-100 border border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all disabled:opacity-70 flex justify-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Şifrəni Yenilə"}
          </button>
        </form>
      </div>
    </div>
  );
};
