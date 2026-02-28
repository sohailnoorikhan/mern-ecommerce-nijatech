// Hooks
import { useState } from "react";

// React Router
import { Link } from "react-router";

// Icons
import { Mail, ArrowLeft, Loader2, Send } from "lucide-react";

// Axios
import API from "@/api/axios";

// Toast
import toast from "react-hot-toast";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/auth/forgot-password", { email });
      setIsSent(true);
      toast.success("Bərpa linki emailinizə göndərildi!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[40px] border border-gray-100 shadow-2xl shadow-blue-50">
        <Link
          to="/auth"
          className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" /> Geri qayıt
        </Link>

        {!isSent ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900">
                Şifrəni bərpa et
              </h2>
              <p className="mt-3 text-gray-500 font-medium text-sm">
                Email ünvanınızı daxil edin, sizə şifrəni yeniləmək üçün link
                göndərək.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
                  Email Ünvanı
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-blue-600 transition-colors">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-12 pr-4 py-4 text-sm bg-gray-100 border border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center py-3 px-6 rounded-2xl text-base font-bold text-white bg-slate-900 hover:bg-blue-600 transition-all shadow-lg disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Link göndər"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Email göndərildi!
            </h2>
            <p className="mt-4 text-gray-500 font-medium">
              Zəhmət olmasa <strong>{email}</strong> ünvanının gələnlər qutusunu
              (və spamı) yoxlayın.
            </p>
            <button
              onClick={() => setIsSent(false)}
              className="mt-8 text-sm font-bold text-blue-600 hover:underline"
            >
              Yenidən cəhd et
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
