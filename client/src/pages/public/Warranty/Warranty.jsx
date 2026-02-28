// Icons
import {
  ShieldCheck,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";

export const Warranty = () => {
  const warrantySteps = [
    {
      icon: <Clock className="text-blue-600" size={28} />,
      title: "Zəmanət Müddəti",
      description:
        "Bütün texnoloji məhsullarımıza istehsalçı tərəfindən 12 aydan 24 aya qədər rəsmi zəmanət verilir.",
    },
    {
      icon: <FileText className="text-blue-600" size={28} />,
      title: "Zəmanət Talonu",
      description:
        "Məhsul çatdırılan zaman sizə rəsmi zəmanət talonu və elektron qaimə təqdim olunur. Bu sənədləri qoruyub saxlamalısınız.",
    },
    {
      icon: <ShieldCheck className="text-blue-600" size={28} />,
      title: "Rəsmi Servis",
      description:
        "Təmir və texniki baxış yalnız rəsmi servis mərkəzlərində, orijinal ehtiyat hissələri ilə həyata keçirilir.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-50 border-b border-slate-100 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl mb-6">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Zəmanət Şərtləri
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Biz satdığımız hər bir məhsulun keyfiyyətinə cavabdehik.
            Alış-verişinizdən sonra da yanınızdayıq.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {warrantySteps.map((step, index) => (
            <div
              key={index}
              className="p-8 border bg-slate-100 border-gray-200 rounded-4xl hover:shadow-xl hover:shadow-blue-50 transition-all duration-300"
            >
              <div className="mb-6">{step.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {step.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-slate-900 rounded-[40px] p-10 text-white">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <CheckCircle2 className="text-green-400" /> Zəmanət Nələri Əhatə
              Edir?
            </h2>
            <ul className="space-y-4 text-sm">
              {[
                "İstehsal qüsurları və zavod defektləri",
                "Məhsulun daxili hissələrində yaranan texniki nasazlıqlar",
                "Proqram təminatı ilə bağlı olan (istehsalçı qaynaqlı) xətalar",
                "Zəmanət müddəti ərzində pulsuz diaqnostika",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <div className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 rounded-[40px] p-10">
            <h2 className="text-2xl font-bold text-red-900 mb-8 flex items-center gap-3">
              <AlertCircle className="text-red-600" /> Hansı Hallarda
              Keçərsizdir?
            </h2>
            <ul className="space-y-4 text-sm font-medium">
              {[
                "Mexaniki zədələr (düşmə, qırılma, əzilmə)",
                "Məhsulun daxilinə maye tökülməsi",
                "Rəsmi olmayan servisdə müdaxilə edilməsi",
                "Gərginlik dəyişməsi nəticəsində yaranan yanmalar",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-red-800/80">
                  <div className="mt-1.5 w-1.5 h-1.5 bg-red-600 rounded-full shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 p-10 bg-blue-500 rounded-4xl">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2 text-center">
              14 Gün İçində İadə
            </h2>
            <p className="text-blue-100 text-center">
              Məhsulun qablaşdırması pozulmadığı halda, fikrinizi dəyişsəniz 14
              gün ərzində qaytara bilərsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
