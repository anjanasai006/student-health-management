import React from "react";
import { NavLink } from "react-router-dom";

const navItemBase =
  "flex items-center gap-3 px-4 py-2.5 text-sm rounded-xl transition-all duration-200";
const iconBase =
  "flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/70";

const Sidebar = ({ role }) => {
  const isAdmin = role === "admin";

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-slate-950 border-r border-slate-800/80 px-4 py-6 gap-6">
      <div className="flex items-center gap-3 px-2">
        <div className="h-9 w-9 rounded-2xl primary-gradient flex items-center justify-center shadow-lg shadow-blue-500/30">
          <span className="text-xs font-bold text-white">SH</span>
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-tight">
            Student Health
          </h1>
          <p className="text-[11px] text-slate-400">
            Wellness & Attendance Hub
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-1">
        <p className="text-[11px] font-medium text-slate-500 px-2 mb-1 uppercase tracking-[0.12em]">
          Main
        </p>

        <NavLink
          to={isAdmin ? "/admin/dashboard" : "/student/dashboard"}
          className={({ isActive }) =>
            [
              navItemBase,
              isActive
                ? "bg-slate-900 text-slate-50 border border-slate-700 shadow-md shadow-slate-900/70"
                : "text-slate-300 hover:bg-slate-900/70 hover:text-white",
            ].join(" ")
          }
        >
          <span className={iconBase}>
            <span className="i-ph-pulse text-xs">📊</span>
          </span>
          <div>
            <p className="text-xs font-medium leading-none">Dashboard</p>
            <p className="text-[11px] text-slate-400">Overview & insights</p>
          </div>
        </NavLink>

        {!isAdmin && (
          <NavLink
            to="/student/tracking"
            className={({ isActive }) =>
              [
                navItemBase,
                isActive
                  ? "bg-slate-900 text-slate-50 border border-slate-700 shadow-md shadow-slate-900/70"
                  : "text-slate-300 hover:bg-slate-900/70 hover:text-white",
              ].join(" ")
            }
          >
            <span className={iconBase}>
              <span>📍</span>
            </span>
            <div>
              <p className="text-xs font-medium leading-none">
                Health Tracking
              </p>
              <p className="text-[11px] text-slate-400">
                Check-ins & attendance
              </p>
            </div>
          </NavLink>
        )}

        <NavLink
          to="/feedback"
          className={({ isActive }) =>
            [
              navItemBase,
              isActive
                ? "bg-slate-900 text-slate-50 border border-slate-700 shadow-md shadow-slate-900/70"
                : "text-slate-300 hover:bg-slate-900/70 hover:text-white",
            ].join(" ")
          }
        >
          <span className={iconBase}>
            <span>💬</span>
          </span>
          <div>
            <p className="text-xs font-medium leading-none">Feedback</p>
            <p className="text-[11px] text-slate-400">
              Share wellness experience
            </p>
          </div>
        </NavLink>

        {isAdmin && (
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              [
                navItemBase,
                isActive
                  ? "bg-slate-900 text-slate-50 border border-slate-700 shadow-md shadow-slate-900/70"
                  : "text-slate-300 hover:bg-slate-900/70 hover:text-white",
              ].join(" ")
            }
          >
            <span className={iconBase}>
              <span>🧑‍⚕️</span>
            </span>
            <div>
              <p className="text-xs font-medium leading-none">
                Admin Overview
              </p>
              <p className="text-[11px] text-slate-400">
                Risk alerts & stats
              </p>
            </div>
          </NavLink>
        )}
      </div>

      <div className="mt-2 px-2">
        <div className="glass-panel px-3 py-3 flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center">
            <span className="text-xs">⚕️</span>
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-semibold text-emerald-300">
              Wellness Tip
            </p>
            <p className="text-[11px] text-slate-300 line-clamp-2">
              Take a 2-minute stretch break between long study sessions.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;