// Hooks
import { useState, useMemo } from "react";

// Redux
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useGetCategoryCountsQuery,
} from "@/redux/services/productApi";

// Swal
import Swal from "sweetalert2";

// Toast
import toast from "react-hot-toast";

// Icons
import {
  Box,
  Gem,
  Plus,
  Edit2,
  Search,
  Trash2,
  Loader2,
  LayoutGrid,
  Image as ImageIcon,
} from "lucide-react";

// Components
import { ProductModal } from "./ProductModal";

export const ProductsPage = () => {
  const { data: products, isLoading } = useGetProductsQuery();

  const { data: counts } = useGetCategoryCountsQuery();

  const [deleteProduct] = useDeleteProductMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("Bütün");

  const filteredProducts = useMemo(() => {
    return products?.filter((product) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        product.title.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower);

      const matchesCategory =
        selectedCategory === "Bütün" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Əminsiniz?",
      text: "Bu məhsul tamamilə silinəcək!",
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
        await deleteProduct(id).unwrap();
        toast.success("Məhsul uğurla silindi!");
      } catch (err) {
        toast.error("Silinmə zamanı xəta baş verdi.");
      }
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
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
          title="Toplam Məhsul"
          value={products?.length || 0}
          icon={<Box />}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Kateqoriyalar"
          value={Object.keys(counts || {}).length}
          icon={<LayoutGrid />}
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Brendlər"
          value={[...new Set(products?.map((p) => p.brand))].length}
          icon={<Gem />}
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
            placeholder="Məhsul adı, brend və ya ID ilə axtar..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600/10 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <select
            className="flex-1 lg:flex-none px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold text-slate-600 text-sm cursor-pointer hover:bg-slate-100 transition-colors"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="Bütün">Bütün Kateqoriyalar</option>
            {Object.keys(counts || {}).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className="w-px h-8 bg-slate-100 hidden lg:block" />{" "}
          <button
            onClick={handleAddNew}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all shrink-0"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Yeni Məhsul</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-[11px] font-bold uppercase text-slate-500">
            <tr>
              <th className="px-6 py-4">Məhsul / Brend</th>
              <th className="px-6 py-4">Kateqoriya</th>
              <th className="px-6 py-4">Qiymət</th>
              <th className="px-6 py-4">Reytinq</th>
              <th className="px-6 py-4 text-right">Fəaliyyət</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {filteredProducts?.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded bg-slate-100 flex items-center justify-center overflow-hidden">
                      {product.images &&
                      product.images.length > 0 &&
                      product.images[0] !== "" ? (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/150?text=No+Image";
                          }}
                        />
                      ) : (
                        <ImageIcon size={20} className="text-slate-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">
                        {product.title}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase font-mono">
                        {product.brand}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 font-medium">
                  {product.category}
                </td>
                <td className="px-6 py-4">
                  {product.discountedPrice ? (
                    <>
                      <div className="font-bold text-slate-900">
                        {product.discountedPrice} ₼
                      </div>
                      <div className="text-[10px] text-slate-400 line-through">
                        {product.price} ₼
                      </div>
                    </>
                  ) : (
                    <div className="font-bold text-slate-900">
                      {product.price} ₼
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-amber-500 font-bold">
                  ★ {product.rating}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
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
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        editData={selectedProduct}
      />
    </div>
  );
};
