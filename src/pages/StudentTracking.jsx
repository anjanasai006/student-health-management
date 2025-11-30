import React from "react";
import MainLayout from "../layouts/MainLayout";
import Badge from "../components/Badge";

const StudentTracking = () => {
  return (
    <MainLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
              Health & attendance tracking
            </h2>
            <p className="text-xs text-slate-400 max-w-xl">
              View your month-by-month attendance, recent health events, and
              any flags that could impact exam eligibility.
            </p>
          </div>
          <Badge tone="info">Exam eligibility: Safe</Badge>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.4fr,1fr]">
          <div className="glass-panel p-4 md:p-5 space-y-4">
            <div className="flex items-center justify-between gap-2 text-xs">
              <p className="font-semibold">Attendance heat map</p>
              <p className="text-slate-400">Last 4 weeks</p>
            </div>

            <div className="grid grid-cols-7 gap-1 text-[10px]">
              {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
                <span
                  key={d}
                  className="text-center text-slate-500 mb-1 mt-1.5"
                >
                  {d}
                </span>
              ))}
              {Array.from({ length: 28 }).map((_, idx) => {
                const status =
                  idx % 9 === 0
                    ? "absent"
                    : idx % 11 === 0
                    ? "medical"
                    : "present";

                return (
                  <div
                    key={idx}
                    className={[
                      "h-7 rounded-lg border",
                      status === "present"
                        ? "bg-emerald-500/15 border-emerald-500/40"
                        : status === "medical"
                        ? "bg-sky-500/10 border-sky-500/40"
                        : "bg-rose-500/10 border-rose-500/40",
                    ].join(" ")}
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-3 w-3 rounded-full bg-emerald-500/70" />
                <span>Present</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-3 w-3 rounded-full bg-sky-500/70" />
                <span>Medical leave</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-3 w-3 rounded-full bg-rose-500/70" />
                <span>Uninformed absence</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-panel p-4 space-y-3">
              <p className="text-xs text-slate-300">Recent health events</p>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-50">
                      Viral fever · Medical leave
                    </p>
                    <p className="text-slate-400">
                      3 days · Document submitted · Approved
                    </p>
                  </div>
                  <Badge tone="success">Closed</Badge>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-50">
                      Stress / anxiety check-in
                    </p>
                    <p className="text-slate-400">
                      1 counselling session completed
                    </p>
                  </div>
                  <Badge tone="info">Ongoing</Badge>
                </div>
              </div>
            </div>

            <div className="glass-panel p-4 space-y-3 text-[11px]">
              <p className="text-xs text-slate-300">Eligibility summary</p>
              <ul className="space-y-1 text-slate-300">
                <li>• Current attendance: 92% (eligible).</li>
                <li>• Max allowed medical leaves: 12 days.</li>
                <li>• Used so far: 6 days.</li>
                <li>• No disciplinary flags related to health.</li>
              </ul>
            </div>

            <div className="glass-panel p-3 flex items-start gap-3 text-[11px]">
              <div className="h-8 w-8 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center">
                ⚠️
              </div>
              <div>
                <p className="font-semibold text-slate-50 mb-0.5">
                  Need to apply for medical leave?
                </p>
                <p className="text-slate-400">
                  In a real project, this section can open a form that
                  directly submits your leave request to the admin portal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentTracking;