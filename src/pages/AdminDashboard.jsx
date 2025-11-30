import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import StatsCard from "../components/StatsCard";
import Badge from "../components/Badge";

const AdminDashboard = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setAdmin(user);

    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    return {
      date: date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      time: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    };
  };

  const { date, time } = formatDateTime(currentDateTime);

  return (
    <MainLayout role="admin">
      <div className="space-y-6">
        {/* Session & Date/Time Card */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-lg p-5">
            <p className="text-xs font-semibold text-purple-800 mb-2">👤 ADMIN SESSION</p>
            <div className="space-y-2">
              <p className="text-sm text-gray-800"><span className="font-bold">Admin Name:</span> {admin?.name || "Loading..."}</p>
              <p className="text-sm text-gray-800"><span className="font-bold">Email:</span> {admin?.email || "Loading..."}</p>
              <p className="text-sm text-gray-800"><span className="font-bold">Role:</span> <span className="text-red-600 font-bold">Administrator</span></p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-lg p-5">
            <p className="text-xs font-semibold text-blue-800 mb-2">📅 CURRENT DATE & TIME</p>
            <div className="space-y-2">
              <p className="text-lg font-bold text-gray-900">{date}</p>
              <p className="text-2xl font-bold text-blue-600 font-mono">{time}</p>
            </div>
          </div>
        </div>

        {/* Page Title */}
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

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatsCard label="Active students" value="612" trend="+8" badge="This semester" />
          <StatsCard label="Today's absenteeism" value="38" trend="-5" subtle />
          <StatsCard label="Open health alerts" value="12" trend="+3" />
          <StatsCard label="Avg. response time" value="14 min" trend="-6m" subtle />
        </div>

        {/* Admin Sessions & Virtual Therapy */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Admin Sessions */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">👥</div>
              <div>
                <h3 className="text-lg font-bold text-green-800">Admin Sessions</h3>
                <p className="text-xs text-green-700">Active management sessions</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border-l-4 border-green-500">
                <p className="text-sm font-semibold text-gray-800">Session Management</p>
                <p className="text-xs text-gray-600 mt-1">Current Active Sessions: <span className="font-bold text-green-600">12</span></p>
                <div className="mt-2 flex gap-2">
                  <button className="px-3 py-1.5 bg-green-500 text-white text-xs font-semibold rounded hover:bg-green-600 transition">✓ View All</button>
                  <button className="px-3 py-1.5 bg-blue-500 text-white text-xs font-semibold rounded hover:bg-blue-600 transition">🔄 Refresh</button>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border-l-4 border-purple-500">
                <p className="text-sm font-semibold text-gray-800">System Health</p>
                <p className="text-xs text-gray-600 mt-1">Status: <span className="font-bold text-green-600">● Online</span></p>
                <p className="text-xs text-gray-600">Uptime: <span className="font-bold">47 days 8 hrs</span></p>
              </div>
              <div className="bg-white p-3 rounded-lg border-l-4 border-orange-500">
                <p className="text-sm font-semibold text-gray-800">Recent Activity</p>
                <ul className="text-xs text-gray-600 mt-1 space-y-1">
                  <li>• 5 new registrations today</li>
                  <li>• 3 health alerts resolved</li>
                  <li>• 8 pending approvals</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Virtual Therapy */}
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-300 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">🧠</div>
              <div>
                <h3 className="text-lg font-bold text-pink-800">Virtual Therapy</h3>
                <p className="text-xs text-pink-700">Online counseling & support</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border-l-4 border-pink-500">
                <p className="text-sm font-semibold text-gray-800">Ongoing Sessions</p>
                <p className="text-xs text-gray-600 mt-1">Active Therapists: <span className="font-bold text-pink-600">5</span></p>
                <p className="text-xs text-gray-600">Students in Sessions: <span className="font-bold text-pink-600">8</span></p>
              </div>
              <div className="bg-white p-3 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm font-semibold text-gray-800">Scheduled Sessions</p>
                <p className="text-xs text-gray-600 mt-1">Today: <span className="font-bold">12 sessions</span></p>
                <p className="text-xs text-gray-600">This Week: <span className="font-bold">67 sessions</span></p>
              </div>
              <div className="bg-white p-3 rounded-lg border-l-4 border-indigo-500">
                <p className="text-sm font-semibold text-gray-800">Availability</p>
                <div className="mt-2 flex gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">Morning ✓</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">Afternoon ✓</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">Evening ~</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Students & Leave Requests */}
        <div className="grid gap-4 lg:grid-cols-[1.6fr,1.1fr]">
          <div className="glass-panel p-4 md:p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">Students requiring attention</p>
              <span className="text-[11px] text-slate-400">Sorted by risk score</span>
            </div>
            <div className="space-y-2 text-[11px]">
              {[
                { name: "Ananya Sharma", course: "CSE · 2nd Year", status: "Frequent migraines, high absence in mornings", risk: "High" },
                { name: "Rahul Verma", course: "ECE · 3rd Year", status: "Sports injury recovery, physio follow-up pending", risk: "Medium" },
                { name: "Meera N", course: "IT · 1st Year", status: "Anxiety around exams, counselling suggested", risk: "Medium" },
                { name: "Aditya Patel", course: "MECH · 4th Year", status: "Recent viral fever, follow-up check tomorrow", risk: "Low" },
              ].map((student) => (
                <div key={student.name} className="flex items-start justify-between gap-3 rounded-xl bg-slate-900/70 border border-slate-700/80 px-3 py-2.5">
                  <div>
                    <p className="font-medium text-slate-50">{student.name}</p>
                    <p className="text-slate-400">{student.course}</p>
                    <p className="text-slate-300 mt-1">{student.status}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] border ${
                      student.risk === "High" ? "bg-rose-500/10 text-rose-300 border-rose-500/40"
                      : student.risk === "Medium" ? "bg-amber-500/10 text-amber-300 border-amber-500/40"
                      : "bg-emerald-500/10 text-emerald-300 border-emerald-500/40"
                    }`}>
                      {student.risk} risk
                    </span>
                    <button className="block text-[10px] text-emerald-300 hover:text-emerald-200">View profile →</button>
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
                    <button className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40 text-[10px]">Approve</button>
                    <button className="px-2 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/40 text-[10px]">Reject</button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Short leave · Hospital visit</p>
                    <p className="text-slate-400">Submitted: Yesterday</p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-700/80 text-[10px]">Need documents</span>
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
              <div className="h-8 w-8 rounded-xl bg-violet-500/10 border border-violet-500/40 flex items-center justify-center">📊</div>
              <div>
                <p className="font-semibold text-slate-50 mb-0.5">Export reports</p>
                <p className="text-slate-400">Connect this dashboard with your backend to export PDF/Excel reports for management meetings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
