import React from "react";
import MainLayout from "../layouts/MainLayout";
import StatsCard from "../components/StatsCard";
import Badge from "../components/Badge";

const AdminDashboard = () => {
  return (
    <MainLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
              Health & attendance control center
            </h2>
            <p className="text-xs text-slate-400 max-w-xl">
              Quickly view risk alerts, absentee trends and pending approvals
              for medical leaves across all students.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <Badge tone="danger">7 high-priority alerts</Badge>
            <Badge tone="info">3 pending leave approvals</Badge>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatsCard
            label="Active students"
            value="612"
            trend="+8"
            badge="This semester"
          />
          <StatsCard
            label="Today's absenteeism"
            value="38"
            trend="-5"
            subtle
          />
          <StatsCard
            label="Open health alerts"
            value="12"
            trend="+3"
          />
          <StatsCard
            label="Avg. response time"
            value="14 min"
            trend="-6m"
            subtle
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.6fr,1.1fr]">
          <div className="glass-panel p-4 md:p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">
                Students requiring attention
              </p>
              <span className="text-[11px] text-slate-400">
                Sorted by risk score
              </span>
            </div>

            <div className="space-y-2 text-[11px]">
              {[
                {
                  name: "Ananya Sharma",
                  course: "CSE · 2nd Year",
                  status: "Frequent migraines, high absence in mornings",
                  risk: "High",
                },
                {
                  name: "Rahul Verma",
                  course: "ECE · 3rd Year",
                  status: "Sports injury recovery, physio follow-up pending",
                  risk: "Medium",
                },
                {
                  name: "Meera N",
                  course: "IT · 1st Year",
                  status: "Anxiety around exams, counselling suggested",
                  risk: "Medium",
                },
                {
                  name: "Aditya Patel",
                  course: "MECH · 4th Year",
                  status: "Recent viral fever, follow-up check tomorrow",
                  risk: "Low",
                },
              ].map((student) => (
                <div
                  key={student.name}
                  className="flex items-start justify-between gap-3 rounded-xl bg-slate-900/70 border border-slate-700/80 px-3 py-2.5"
                >
                  <div>
                    <p className="font-medium text-slate-50">
                      {student.name}
                    </p>
                    <p className="text-slate-400">{student.course}</p>
                    <p className="text-slate-300 mt-1">{student.status}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <span
                      className={[
                        "inline-flex px-2 py-0.5 rounded-full text-[10px] border",
                        student.risk === "High"
                          ? "bg-rose-500/10 text-rose-300 border-rose-500/40"
                          : student.risk === "Medium"
                          ? "bg-amber-500/10 text-amber-300 border-amber-500/40"
                          : "bg-emerald-500/10 text-emerald-300 border-emerald-500/40",
                      ].join(" ")}
                    >
                      {student.risk} risk
                    </span>
                    <button className="block text-[10px] text-emerald-300 hover:text-emerald-200">
                      View profile →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-panel p-4 space-y-3">
              <p className="text-xs text-slate-300">Pending leave requests</p>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Medical leave · 3 days</p>
                    <p className="text-slate-400">Submitted: 9:12 AM today</p>
                  </div>
                  <div className="flex gap-1.5">
                    <button className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40 text-[10px]">
                      Approve
                    </button>
                    <button className="px-2 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/40 text-[10px]">
                      Reject
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Short leave · Hospital visit</p>
                    <p className="text-slate-400">Submitted: Yesterday</p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-700/80 text-[10px]">
                    Need documents
                  </span>
                </div>
              </div>
            </div>

            <div className="glass-panel p-4 space-y-3">
              <p className="text-xs text-slate-300">Health trend highlights</p>
              <ul className="space-y-2 text-[11px] text-slate-300">
                <li>• Slight increase in flu-like symptoms in 1st year.</li>
                <li>• Stress & anxiety reports higher near exam weeks.</li>
                <li>• Hostellers show better check-in consistency.</li>
                <li>• Average sleep hours improving after awareness drive.</li>
              </ul>
            </div>

            <div className="glass-panel p-3 flex items-center gap-3 text-[11px]">
              <div className="h-8 w-8 rounded-xl bg-violet-500/10 border border-violet-500/40 flex items-center justify-center">
                📊
              </div>
              <div>
                <p className="font-semibold text-slate-50 mb-0.5">
                  Export reports
                </p>
              <p className="text-slate-400">
                  Connect this dashboard with your backend to export PDF/Excel
                  reports for management meetings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;