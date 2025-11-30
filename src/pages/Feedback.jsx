import React from "react";
import MainLayout from "../layouts/MainLayout";

const Feedback = () => {
  return (
    <MainLayout role="student">
      <div className="max-w-3xl space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            Share feedback with the health team
          </h2>
          <p className="text-xs text-slate-400">
            Tell us what is working well, what can be improved, or if you felt
            uncomfortable at any point during health support.
          </p>
        </div>

        <div className="glass-panel p-4 md:p-5 space-y-4">
          <div className="grid md:grid-cols-2 gap-3 text-[11px]">
            <div className="space-y-1">
              <p className="text-xs text-slate-300">Feedback type</p>
              <select className="w-full rounded-xl bg-slate-900/80 border border-slate-700/80 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/60">
                <option>General suggestion</option>
                <option>Health room experience</option>
                <option>Counselling support</option>
                <option>App / portal issue</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-300">Can we contact you?</p>
              <select className="w-full rounded-xl bg-slate-900/80 border border-slate-700/80 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/60">
                <option>Yes, email is okay</option>
                <option>Yes, call is okay</option>
                <option>No, keep this anonymous</option>
              </select>
            </div>
          </div>

          <div className="space-y-1 text-[11px]">
            <p className="text-xs text-slate-300">Your feedback</p>
            <textarea
              rows={5}
              placeholder="Share your experience or suggestion..."
              className="w-full rounded-xl bg-slate-900/80 border border-slate-700/80 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/60 resize-none"
            />
          </div>

          <div className="space-y-1 text-[11px]">
            <p className="text-xs text-slate-300">Optional: attach context</p>
            <textarea
              rows={3}
              placeholder="E.g. particular date, time, staff name (if you are comfortable sharing)..."
              className="w-full rounded-xl bg-slate-900/80 border border-slate-700/80 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/60 resize-none"
            />
          </div>

          <button className="w-full md:w-auto mt-1 primary-gradient rounded-2xl px-4 py-2.5 text-xs font-medium shadow-md shadow-emerald-500/30 hover:shadow-blue-500/30 transition-all">
            Submit feedback
          </button>

          <p className="text-[10px] text-slate-500">
            Your feedback is confidential and will be used only to improve
            student health services.
          </p>
        </div>

        <div className="glass-panel p-3 text-[11px] flex items-start gap-3">
          <div className="h-8 w-8 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center">
            💚
          </div>
          <div>
            <p className="font-semibold text-slate-50 mb-0.5">
              Thank you for helping us improve
            </p>
            <p className="text-slate-400">
              Real feedback from students makes the health support system more
              safe, kind and responsive.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Feedback;