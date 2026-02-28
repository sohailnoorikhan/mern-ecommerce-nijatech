// Icons
import { X, Save } from "lucide-react";

export const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData.entries());
    onSave(updatedData);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-[2px] animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-4xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-xl font-bold text-slate-900">
            Məlumatları Redaktə Et
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-red-500"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">
              Ad və Soyad
            </label>
            <input
              name="name"
              defaultValue={user.name}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-purple-400 focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">
              Telefon
            </label>
            <input
              name="phone"
              defaultValue={user.phone}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-purple-400 focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">
              Ünvan
            </label>
            <input
              name="address"
              defaultValue={user.address}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-purple-400 focus:bg-white transition-all"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-2xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
            >
              Ləğv et
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 rounded-2xl font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-100 transition-all flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Yadda saxla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
