// Hooks
import { useState } from "react";

// Icons
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Send,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export const HelpCenterPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const [msgSent, setMsgSent] = useState(false);

  const faqs = [
    {
      question: "Sistemdə məlumatlar necə yenilənir?",
      answer:
        "Bütün dəyişikliklər dərhal bazada yadda saxlanılır. Profil bölməsində etdiyiniz dəyişikliklər isə avtomatik olaraq sessiyanıza tətbiq edilir.",
    },
    {
      question: "Təhlükəsizlik qaydaları nələrdir?",
      answer:
        "Şifrənizi mütəmadi olaraq dəyişməyiniz və hesabınızı digər şəxslərlə paylaşmamağınız tövsiyə olunur. Sistem hər bir girişi izləyir.",
    },
    {
      question: "Xəta ilə qarşılaşsam nə etməliyəm?",
      answer:
        "Əgər sistemdə gözlənilməz bir xəta baş verərsə, səhifəni yeniləyin. Problem davam edərsə, aşağıdakı mesaj bölməsindən bizə bildirin.",
    },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();

    setMsgSent(true);

    setTimeout(() => setMsgSent(false), 3000);
  };

  return (
    <div className="max-w-4xl mt-20 mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">
          Sizə necə kömək edə bilərik?
        </h2>

        <p className="text-slate-500 text-sm">
          Sistemlə bağlı suallar və birbaşa dəstək xətti
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4 text-slate-800 font-bold text-sm uppercase tracking-wider">
            <HelpCircle size={18} className="text-[#135bec]" />
            Tez-tez Verilən Suallar
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-semibold text-slate-700">
                    {faq.question}
                  </span>

                  {openFaq === index ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {openFaq === index && (
                  <div className="px-4 pb-4 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-3 bg-slate-50/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4 text-slate-800 font-bold text-sm uppercase tracking-wider">
            <Send size={18} className="text-emerald-500" />
            Birbaşa Mesaj
          </div>

          <form
            onSubmit={handleSendMessage}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4"
          >
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">
                Mövzu
              </label>

              <input
                type="text"
                placeholder="Nə ilə bağlıdır?"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#135bec]/10 transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">
                Mesajınız
              </label>

              <textarea
                rows="4"
                placeholder="Problemi və ya sualınızı qısa izah edin..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#135bec]/10 transition-all resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                msgSent
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              {msgSent ? (
                <>
                  <CheckCircle2 size={18} /> Göndərildi!
                </>
              ) : (
                <>
                  <Send size={16} /> Mesajı Göndər
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="flex items-start gap-4 p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
        <AlertCircle className="text-blue-500 shrink-0" size={20} />

        <div className="space-y-1">
          <p className="text-sm font-bold text-blue-900">
            Sistem Dəstəyi Haqqında
          </p>

          <p className="text-xs text-blue-700/80 leading-relaxed">
            Yardım mərkəzi vasitəsilə göndərilən mesajlara 24 saat ərzində
            baxılır. Təcili texniki xətalar zamanı sistem administratoruna
            birbaşa müraciət etməyiniz xahiş olunur.
          </p>
        </div>
      </div>
    </div>
  );
};
