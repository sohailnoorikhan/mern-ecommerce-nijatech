// Hooks
import { useState, useMemo } from "react";

// Redux
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useToggleUserRoleMutation,
} from "@/redux/services/userApi";

// Swal
import Swal from "sweetalert2";

// Toast
import toast from "react-hot-toast";

// Icons
import {
  Users,
  ShieldCheck,
  User as UserIcon,
  Trash2,
  Search,
  Loader2,
  Mail,
  UserPlus,
  ShieldAlert,
} from "lucide-react";

export const UsersPage = () => {
  const { data: users, isLoading } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const [toggleRole] = useToggleUserRoleMutation();

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedRole, setSelectedRole] = useState("Bütün");

  const filteredUsers = useMemo(() => {
    return users?.filter((user) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower);

      const matchesRole =
        selectedRole === "Bütün" || user.role === selectedRole;

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, selectedRole]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Əminsiniz?",
      text: "Bu istifadəçi tamamilə silinəcək!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#135bec",
      cancelButtonColor: "#f43f5e",
      confirmButtonText: "Bəli, sil!",
      cancelButtonText: "Xeyr",
      background: "#fff",
      borderRadius: "16px",
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(id).unwrap();
        toast.success("İstifadəçi uğurla silindi!");
      } catch (err) {
        toast.error(err.data?.message || "Silinmə zamanı xəta baş verdi.");
      }
    }
  };

  const handleToggleRole = async (id) => {
    try {
      await toggleRole(id).unwrap();
      toast.success("İstifadəçi rolu yeniləndi!");
    } catch (err) {
      toast.error("Rol dəyişdirilə bilmədi.");
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-5 rounded-xl border border-slate-100 flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
      <div>
        <p className="text-slate-400 text-[10px] font-bold uppercase">
          {title}
        </p>
        <h3 className="text-xl font-bold text-slate-800">{value}</h3>
      </div>
    </div>
  );

  if (isLoading)
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Toplam İstifadəçi"
          value={users?.length || 0}
          icon={<Users />}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Adminlər"
          value={users?.filter((u) => u.role === "admin").length || 0}
          icon={<ShieldCheck />}
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Adi İstifadəçilər"
          value={users?.filter((u) => u.role === "user").length || 0}
          icon={<UserIcon />}
          color="bg-amber-50 text-amber-600"
        />
      </div>

      <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col lg:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Ad və ya email ilə axtar..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600/10 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <select
            className="flex-1 lg:flex-none px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold text-slate-600 text-sm cursor-pointer hover:bg-slate-100 transition-colors"
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="Bütün">Bütün Rollar</option>
            <option value="admin">Adminlər</option>
            <option value="user">İstifadəçilər</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-[11px] font-bold uppercase text-slate-500">
            <tr>
              <th className="px-6 py-4">İstifadəçi</th>
              <th className="px-6 py-4 text-center">Status / Rol</th>
              <th className="px-6 py-4 text-center">Qoşulma Tarixi</th>
              <th className="px-6 py-4 text-right">Fəaliyyət</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {filteredUsers?.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <UserIcon className="text-slate-400" size={20} />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{user.name}</p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Mail size={10} /> {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide ${
                      user.role === "admin"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : "bg-blue-50 text-blue-600 border border-blue-100"
                    }`}
                  >
                    {user.role === "admin" ? (
                      <ShieldCheck size={12} />
                    ) : (
                      <UserIcon size={12} />
                    )}
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 font-medium text-center">
                  {new Date(user.createdAt).toLocaleDateString("az-AZ")}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => handleToggleRole(user._id)}
                    title="Rolu dəyiş"
                    className="p-2 hover:bg-amber-50 text-slate-400 hover:text-amber-600 rounded-lg transition-all"
                  >
                    <ShieldAlert size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
