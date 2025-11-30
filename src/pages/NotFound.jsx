import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="glass-panel max-w-md w-full p-6 space-y-4 text-center">
        <div className="h-12 w-12 rounded-2xl bg-rose-500/10 border border-rose-500/40 flex items-center justify-center mx-auto text-xl">
          404
        </div>
        <h1 className="text-xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="text-xs text-slate-400">
          The page you are looking for does not exist or might be moved. Use
          the button below to go back to the main portal.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <Link
            to="/"
            className="primary-gradient px-4 py-2 rounded-2xl font-medium shadow-md shadow-emerald-500/30 hover:shadow-blue-500/30 transition-all"
          >
            Back to home
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 rounded-2xl border border-slate-700/80 text-slate-200 hover:border-emerald-500/70 hover:text-emerald-300 transition-all"
          >
            Go to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;