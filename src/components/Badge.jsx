import React from "react";

const Badge = ({ children, tone = "info" }) => {
  const tones = {
    info: "bg-sky-500/10 text-sky-300 border-sky-500/40",
    success: "bg-emerald-500/10 text-emerald-300 border-emerald-500/40",
    warn: "bg-amber-500/10 text-amber-300 border-amber-500/40",
    danger: "bg-rose-500/10 text-rose-300 border-rose-500/40",
  };

  return (
    <span
      className={[
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-medium",
        tones[tone] || tones.info,
      ].join(" ")}
    >
      {children}
    </span>
  );
};

export default Badge;