import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Feedback from "./pages/Feedback";
import StudentTracking from "./pages/StudentTracking";
import MoodTracker from "./pages/MoodTracker";
import TherapySession from "./pages/TherapySession";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/student/tracking" element={<StudentTracking />} />
      <Route path="/mood" element={<MoodTracker />} />
      <Route path="/student/mood" element={<MoodTracker />} />
      <Route path="/therapy" element={<TherapySession />} />
      <Route path="/student/therapy" element={<TherapySession />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default App;