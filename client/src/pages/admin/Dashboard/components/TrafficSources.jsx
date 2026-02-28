// Hooks
import { useMemo, useState, useEffect } from "react";

export const TrafficSources = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sources = useMemo(() => {
    const defaultData = { direct: 64, social: 22, referral: 14, total: "876" };
    return data || defaultData;
  }, [data]);

  const calculateOffset = (percent) => {
    if (!isMounted) return 502;
    return 502 - (502 * percent) / 100;
  };

  return (
    <div className="col-span-12 lg:col-span-4 bg-white p-5 md:p-6 rounded-xl border border-slate-100 shadow-xs flex flex-col justify-between h-full">
      <div className="mb-6 md:mb-8">
        <h4 className="text-base md:text-lg font-bold text-slate-900 tracking-wide">
          Trafik mənbələri
        </h4>
        <p className="text-slate-400 text-sm tracking-wide">
          Mənbəyə görə qazanılmış istifadəçilər
        </p>
      </div>

      <div className="flex justify-center relative my-4 sm:my-6">
        <svg
          viewBox="0 0 192 192"
          className="w-40 h-40 md:w-48 md:h-48 -rotate-90 max-w-full"
        >
          <circle
            cx="96"
            cy="96"
            r="80"
            fill="transparent"
            stroke="#e2e8f0"
            strokeWidth="20"
          />

          <circle
            cx="96"
            cy="96"
            r="80"
            fill="transparent"
            stroke="#135bec"
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray="502"
            strokeDashoffset={calculateOffset(sources.direct)}
            style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }}
          />

          <circle
            cx="96"
            cy="96"
            r="80"
            fill="transparent"
            stroke="#8b5cf6"
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray="502"
            strokeDashoffset={calculateOffset(sources.social + 15)}
            style={{ transition: "stroke-dashoffset 1.5s ease-in-out 0.2s" }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl md:text-2xl font-bold tracking-wide">
            {sources.total}
          </span>
          <span className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Ziyarətçilər
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 md:gap-4">
        <SourceItem
          label="Birbaşa Axtarış"
          percent={sources.direct}
          color="bg-[#135bec]"
        />
        <SourceItem
          label="Sosial Media"
          percent={sources.social}
          color="bg-purple-500"
        />
        <SourceItem
          label="İstinadlar"
          percent={sources.referral}
          color="bg-slate-200"
        />
      </div>
    </div>
  );
};

const SourceItem = ({ label, percent, color }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${color} shrink-0`}></span>
      <span className="text-xs md:text-sm font-medium tracking-wide text-slate-700">
        {label}
      </span>
    </div>
    <span className="text-xs md:text-sm font-bold tracking-wide">
      {percent}%
    </span>
  </div>
);
