import React from "react";

const StatsCard = ({ label, value, trend, badge, subtle }) => {
  return (
    <div
      className={[
        "glass-panel p-4 md:p-5 flex flex-col gap-3 relative overflow-hidden group",
        subtle ? "bg-slate-900/60" : "",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[11px] font-medium text-slate-400 mb-1 uppercase tracking-[0.16em]">
            {label}
          </p>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight">
            {value}
          </p>
        </div>
        {badge && (
          <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40">
            {badge}
          </span>
        )}
      </div>
      {trend && (
        <p className="text-[11px] text-slate-400">
          <span
            className={
              trend.startsWith("+")
                ? "text-emerald-400 font-medium mr-1"
                : "text-rose-400 font-medium mr-1"
            }
          >
            {trend}
          </span>
          vs last week
        </p>
      )}

      <div className="absolute -right-3 -bottom-4 h-16 w-16 rounded-full bg-emerald-500/10 blur-2xl group-hover:bg-emerald-400/15 transition-all" />
      <div className="absolute right-2 -top-3 h-10 w-10 rounded-full border border-slate-700/60" />
    </div>
  );
};

export default StatsCard;