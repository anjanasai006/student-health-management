import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid gap-10 lg:grid-cols-[1.2fr,1fr] items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700/80 bg-slate-900/70 text-[11px] font-medium text-slate-300">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/40 text-xs">
              ⚕️
            </span>
            Smart Student Health & Attendance Platform
          </div>

          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
            Keep every student{" "}
            <span className="primary-gradient bg-clip-text text-transparent">
              healthy, supported
            </span>{" "}
            & present.
          </h1>

          <p className="text-sm md:text-base text-slate-300 max-w-xl">
            A modern health management portal for colleges and schools.
            Track wellness check-ins, chronic conditions, leaves, and early
            risk alerts — for both students and administrators.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-4 md:px-5 py-2.5 rounded-2xl primary-gradient text-sm font-medium shadow-lg shadow-blue-500/30 hover:shadow-emerald-500/30 transition-all"
            >
              Get started
              <span className="ml-2 text-xs">→</span>
            </Link>

            <Link
              to="/student/dashboard"
              className="inline-flex items-center justify-center px-4 md:px-5 py-2.5 rounded-2xl border border-slate-700/80 text-sm font-medium hover:border-emerald-500/70 hover:text-emerald-300 transition-all"
            >
              View sample dashboard
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md text-[11px] text-slate-300">
            <div>
              <p className="text-base font-semibold text-slate-50">24/7</p>
              <p>Health patterns & absentee alerts</p>
            </div>
            <div>
              <p className="text-base font-semibold text-slate-50">3x</p>
              <p>Faster health reporting & approval</p>
            </div>
            <div>
              <p className="text-base font-semibold text-slate-50">100%</p>
              <p>Student-friendly, mobile-ready UI</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="glass-panel p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-slate-400 mb-1">Today&apos;s view</p>
                <p className="text-sm font-semibold">
                  Health & Attendance Snapshot
                </p>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40">
                Low risk
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-[11px]">
              <div className="bg-slate-900/70 rounded-xl p-3 flex flex-col gap-1">
                <p className="text-slate-400">Present today</p>
                <p className="text-lg font-semibold">428</p>
                <p className="text-emerald-400">+12 vs last week</p>
              </div>
              <div className="bg-slate-900/70 rounded-xl p-3 flex flex-col gap-1">
                <p className="text-slate-400">Health alerts</p>
                <p className="text-lg font-semibold">7</p>
                <p className="text-amber-400">3 pending checks</p>
              </div>
              <div className="bg-slate-900/70 rounded-xl p-3 flex flex-col gap-1">
                <p className="text-slate-400">Appointments</p>
                <p className="text-lg font-semibold">16</p>
                <p className="text-sky-400">5 ongoing now</p>
              </div>
            </div>

            <div className="mt-4 text-[11px] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Mental wellness</span>
                <span className="text-emerald-300">Stable</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full w-3/4 primary-gradient" />
              </div>
              <p className="text-slate-400">
                &quot;Small mood changes detected for 5 students. Suggested
                counselling slots added.&quot;
              </p>
            </div>
          </div>

          <div className="glass-panel p-3 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-lg">
              🌱
            </div>
            <div className="text-[11px]">
              <p className="font-semibold text-slate-50 mb-0.5">
                Designed for both students & admins
              </p>
              <p className="text-slate-400">
                Separate portals, one single connected health record.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;