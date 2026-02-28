// Hooks
import React, { useState, useEffect } from "react";

// Redux
import { setUser } from "@/redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateProfileMutation } from "@/redux/services/userApi";

// Toast
import toast from "react-hot-toast";

// Icons
import {
  User,
  Camera,
  Save,
  Mail,
  Phone,
  Briefcase,
  Loader2,
} from "lucide-react";

export const SettingsPage = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [avatar, setAvatar] = useState(null);

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
      setPreview(user.avatar || null);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        return toast.error("Şəkil ölçüsü 2MB-dan çox olmamalıdır!");
      }
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    if (avatar) data.append("avatar", avatar);

    try {
      const response = await updateProfile(data).unwrap();

      dispatch(setUser(response));

      toast.success("Profil uğurla yeniləndi!");
    } catch (err) {
      toast.error(err.data?.message || "Xəta baş verdi");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-wide">
          Hesab Ayarları
        </h2>
        <p className="text-sm text-slate-500 font-medium tracking-wide">
          Profilinizi idarə edin
        </p>
      </div>

      <section className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-50 flex items-center gap-2 text-[#135bec]">
          <User size={18} />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">
            Profil Məlumatları
          </h3>
        </div>

        <div className="p-6 space-y-8">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="size-24 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img
                    src={preview}
                    className="w-full h-full object-cover"
                    alt="Profile"
                  />
                ) : (
                  <User size={36} className="text-slate-400" />
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 p-2 bg-[#135bec] text-white rounded-xl shadow-lg hover:scale-110 transition-all cursor-pointer border-2 border-white">
                <Camera size={16} />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700">Profil Şəkli</p>
              <p className="text-xs text-slate-400 font-medium mt-1">
                PNG, JPG və ya WebP, max 2MB.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
                Tam Adınız
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#135bec]/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
                E-poçt
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#135bec]/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
                Telefon
              </label>
              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#135bec]/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
                Vəzifə
              </label>
              <div className="relative">
                <Briefcase
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                />
                <input
                  type="text"
                  value={user?.role || "Admin"}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-100 rounded-xl text-sm font-semibold text-slate-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="flex items-center gap-2 px-8 py-3 bg-[#135bec] text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-md shadow-blue-100 active:scale-95 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Save size={18} />
          )}
          Dəyişiklikləri Saxla
        </button>
      </div>
    </div>
  );
};
