// Hooks
import { useState, useEffect } from "react";

// Icons
import { X, Save } from "lucide-react";

// Redux
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/services/productApi";

// Toast
import toast from "react-hot-toast";

export const ProductModal = ({ isOpen, onClose, editData }) => {
  const initialState = {
    title: "",
    price: "",
    discountedPrice: "",
    description: "",
    brand: "",
    category: "",
    rating: 5,
    images: [""],
    ram: "",
    processor: "",
    screen: "",
    memory: "",
    vram: "",
    weight: "",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editData) {
      setFormData({ ...editData });
    } else {
      setFormData(initialState);
    }
  }, [editData, isOpen]);

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const [updateProduct] = useUpdateProductMutation();

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUrlChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const addImageField = () =>
    setFormData((prev) => ({ ...prev, images: [...prev.images, ""] }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      price: Number(formData.price),
      images: formData.images.filter((img) => img.trim() !== ""),
    };

    const loadingToast = toast.loading(
      editData ? "Yenilənir..." : "Yaradılır...",
    );

    try {
      if (editData) {
        await updateProduct({ id: editData._id, ...dataToSubmit }).unwrap();
        toast.success("Məhsul uğurla yeniləndi!", { id: loadingToast });
      } else {
        await createProduct(dataToSubmit).unwrap();
        toast.success("Yeni məhsul əlavə edildi!", { id: loadingToast });
      }
      onClose();
    } catch (err) {
      toast.error(err.data?.message || "Xəta baş verdi!", { id: loadingToast });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-in zoom-in duration-200">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-slate-100 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-slate-800 tracking-wide">
            {editData ? "Məhsulu Redaktə Et" : "Yeni Məhsul Əlavə Et"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-[#135bec] uppercase tracking-widest">
              Ümumi Məlumatlar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1">
                  Məhsulun Adı
                </label>
                <input
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#135bec]/10 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 ml-1">
                    Brend
                  </label>
                  <input
                    required
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#135bec]/10 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 ml-1">
                    Kateqoriya
                  </label>
                  <input
                    required
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#135bec]/10 outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1">
                  Qiymət (₼)
                </label>
                <input
                  required
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#135bec]/10 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1">
                  Endirimli Qiymət
                </label>
                <input
                  type="number"
                  name="discountedPrice"
                  value={formData.discountedPrice}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#135bec]/10 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1">
                  Reytinq (0-5)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#135bec]/10 outline-none"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 ml-1">
                Təsvir
              </label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#135bec]/10 outline-none resize-none"
                placeholder="Məhsul haqqında ətraflı məlumat..."
              ></textarea>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-widest">
              Texniki Özəlliklər
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["ram", "processor", "screen", "memory", "vram", "weight"].map(
                (spec) => (
                  <div key={spec} className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                      {spec}
                    </label>
                    <input
                      name={spec}
                      value={formData[spec]}
                      onChange={handleChange}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs outline-none focus:border-[#135bec]"
                    />
                  </div>
                ),
              )}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                Məhsul Şəkilləri (URL)
              </h3>
              <button
                type="button"
                onClick={addImageField}
                className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full hover:bg-emerald-100"
              >
                + Yeni URL
              </button>
            </div>
            <div className="space-y-2">
              {formData.images.map((url, idx) => (
                <input
                  key={idx}
                  value={url}
                  onChange={(e) => handleImageUrlChange(idx, e.target.value)}
                  placeholder={`Şəkil URL ${idx + 1}`}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-200"
                />
              ))}
            </div>
          </section>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Ləğv et
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="flex items-center gap-2 px-10 py-2.5 bg-[#135bec] text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
            >
              {isLoading ? (
                "Yadda saxlanılır..."
              ) : (
                <>
                  <Save size={18} />{" "}
                  {editData ? "Dəyişiklikləri Saxla" : "Məhsulu Yarat"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
