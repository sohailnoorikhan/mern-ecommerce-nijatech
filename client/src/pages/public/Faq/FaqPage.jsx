// Hooks
import { useState } from "react";

// Components
import { Breadcrumb } from "@/components/shared";

// Icons
import { ChevronDown, MessageCircle, Mail, Phone } from "lucide-react";

const faqData = [
  {
    id: 1,
    question: "Məhsullara zəmanət verilirmi?",
    answer:
      "Bəli, Nijatech-dən alınan bütün rəsmi məhsullara 1 ildən 3 ilə qədər istehsalçı zəmanəti verilir. Zəmanət talonu məhsulla birlikdə təqdim olunur.",
  },
  {
    id: 2,
    question: "Çatdırılma neçə gün çəkir?",
    answer:
      "Bakı daxili çatdırılma eyni gündə, bölgələrə isə 1-3 iş günü ərzində həyata keçirilir. 500 AZN-dən yuxarı sifarişlər ödənişsiz çatdırılır.",
  },
  {
    id: 3,
    question: "Sifarişi necə qaytara bilərəm?",
    answer:
      "İstehlakçı hüquqlarının müdafiəsi haqqında qanuna əsasən, məhsul zədələnməyibsə və qablaşdırması pozulmayıbsa, 14 gün ərzində qaytarıla və ya dəyişdirilə bilər.",
  },
  {
    id: 4,
    question: "Kreditlə satış mümkündür?",
    answer:
      "Bəli, Birkart, Tamkart və daxili kredit şərtlərimiz mövcuddur. Onlayn və ya mağazamıza yaxınlaşaraq rəsmiləşdirə bilərsiniz.",
  },
];

export const FaqPage = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Breadcrumb categoryName="Tez-tez verilən suallar" />

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Sizə necə kömək edə bilərik?
          </h1>
          <p className="text-gray-600">
            Axtardığınız sualın cavabını aşağıdakı bölmələrdən tapa bilərsiniz.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-slate-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`text-gray-500 transition-transform duration-300 ${openId === faq.id ? "rotate-180" : ""}`}
                  size={20}
                />
              </button>

              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openId === faq.id
                    ? "max-h-40 py-5 border-t border-gray-100"
                    : "max-h-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-slate-900 rounded-3xl p-8 text-center text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-2">Hələ də sualınız var?</h2>
          <p className="text-slate-400 mb-8">
            Dəstək komandamız sizə kömək etməyə hazırdır.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <Phone className="text-blue-500 mb-3" size={24} />
              <span className="text-sm font-medium">+994 70 892 86 45</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <Mail className="text-blue-500 mb-3" size={24} />
              <span className="text-sm font-medium">info@nijatech.az</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <MessageCircle className="text-blue-500 mb-3" size={24} />
              <span className="text-sm font-medium">Canlı Dəstək</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
