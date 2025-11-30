import React from "react";
import { Link } from "react-router-dom";

const Topbar = ({ role }) => {
  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl flex items-center">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 gap-4">
        <div className="flex flex-col gap-0.5">
          <p className="text-xs text-slate-400">Welcome back 👋</p>
          <h2 className="text-sm md:text-base font-semibold tracking-tight">
            {role === "admin" ? "Admin Health Control Center" : "Student Wellness Dashboard"}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Health support is online</span>
          </div>
          <Link
            to="/login"
            className="text-[11px] sm:text-xs px-3 py-1.5 rounded-xl border border-slate-700/80 hover:border-emerald-500/70 hover:text-emerald-300 transition-all"
          >
            Switch account
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Topbar;