import React from "react";
import MainLayout from "../layouts/MainLayout";
import StatsCard from "../components/StatsCard";
import Badge from "../components/Badge";

const StudentDashboard = () => {
  return (
    <MainLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
              Your wellness overview
            </h2>
            <p className="text-xs text-slate-400 max-w-xl">
              Track your recent health check-ins, mood logs, medicine
              reminders and attendance at one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <Badge tone="success">Streak: 7 days symptom-free</Badge>
            <Badge tone="info">Next checkup: Mon, 10:30 AM</Badge>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard
            label="Attendance this month"
            value="92%"
            trend="+4%"
            badge="On track"
          />
          <StatsCard
            label="Wellness check-ins"
            value="18"
            trend="+6"
            badge="Consistent"
            subtle
          />
          <StatsCard
            label="Sleep & stress score"
            value="7.9 / 10"
            trend="+0.8"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.4fr,1fr]">
          <div className="glass-panel p-4 md:p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs text-slate-400 mb-1">
                  Daily health check-in
                </p>
                <p className="text-sm font-semibold">
                  How are you feeling today?
                </p>
              </div>
              <Badge tone="warn">Takes 30 seconds</Badge>
            </div>

            <div className="grid grid-cols-4 gap-2 text-[11px]">
              {[
                { emoji: "😄", label: "Great" },
                { emoji: "🙂", label: "Okay" },
                { emoji: "😐", label: "Tired" },
                { emoji: "😣", label: "Unwell" },
              ].map((mood) => (
                <button
                  key={mood.label}
                  className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-slate-900/70 border border-slate-700/80 hover:border-emerald-500/70 hover:bg-slate-900 transition-all"
                >
                  <span className="text-xl">{mood.emoji}</span>
                  <span>{mood.label}</span>
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-3 text-[11px]">
              <div className="space-y-2">
                <p className="text-xs text-slate-300">
                  Symptoms or concerns (optional)
                </p>
                <textarea
                  rows={3}
                  placeholder="E.g. mild headache, exam stress, sleep issues..."
                  className="w-full rounded-xl bg-slate-900/80 border border-slate-700/80 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/60 resize-none"
                />
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs text-slate-300">
                    Quick vitals (optional)
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      className="rounded-xl bg-slate-900/80 border border-slate-700/80 px-2 py-1.5 text-[11px] outline-none"
                      placeholder="Temp (°C)"
                    />
                    <input
                      className="rounded-xl bg-slate-900/80 border border-slate-700/80 px-2 py-1.5 text-[11px] outline-none"
                      placeholder="BP"
                    />
                    <input
                      className="rounded-xl bg-slate-900/80 border border-slate-700/80 px-2 py-1.5 text-[11px] outline-none"
                      placeholder="Pulse"
                    />
                  </div>
                </div>
                <button className="w-full mt-1 primary-gradient rounded-2xl py-2 text-xs font-medium shadow-md shadow-emerald-500/30 hover:shadow-blue-500/30 transition-all">
                  Submit today&apos;s check-in
                </button>
                <p className="text-[10px] text-slate-500">
                  Your health data is visible only to authorised college
                  health staff.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-panel p-4 space-y-3">
              <p className="text-xs text-slate-300">Upcoming medicine</p>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Vitamin D supplement</p>
                    <p className="text-slate-400">After breakfast · Daily</p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40 text-[10px]">
                    Today
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allergy tablet</p>
                    <p className="text-slate-400">Night · Only if needed</p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-700/80 text-[10px]">
                    Optional
                  </span>
                </div>
              </div>
            </div>

            <div className="glass-panel p-4 space-y-3">
              <p className="text-xs text-slate-300">Attendance summary</p>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Classes attended</span>
                  <span className="font-medium">43 / 48</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full w-[89%] primary-gradient" />
                </div>
                <p className="text-slate-400">
                  You are{" "}
                  <span className="text-emerald-300 font-medium">above</span>{" "}
                  the required attendance. Keep it going!
                </p>
              </div>
            </div>

            <div className="glass-panel p-3 flex items-center gap-3 text-[11px]">
              <div className="h-8 w-8 rounded-xl bg-sky-500/10 border border-sky-500/40 flex items-center justify-center">
                💡
              </div>
              <div>
                <p className="font-semibold text-slate-50 mb-0.5">
                  Friendly reminder
                </p>
                <p className="text-slate-400">
                  Block 15 minutes this evening for a short walk or stretch
                  break.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentDashboard;