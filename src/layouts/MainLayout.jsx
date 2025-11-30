import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const MainLayout = ({ children, role = "student" }) => {
  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-50">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col">
        <Topbar role={role} />
        <main className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;