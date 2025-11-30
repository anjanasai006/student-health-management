import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("student@example.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  // Update email when toggling between student and admin
  const handleToggleRole = (adminMode) => {
    setIsAdmin(adminMode);
    if (adminMode) {
      setEmail("admin@example.com");
    } else {
      setEmail("student@example.com");
    }
    setPassword("password");
    setError("");
    setShowRegister(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Demo mode: Accept any email/password
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
      
      const user = {
        id: "demo-" + Date.now(),
        email: email,
        name: email.split("@")[0],
        role: isAdmin ? "admin" : "student"
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("studentId", user.id);
      localStorage.setItem("token", "demo-token-" + Date.now());
      
      if (isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading

      // Demo mode: Accept any registration
      const user = {
        id: "demo-" + Date.now(),
        email: registerData.email,
        name: registerData.name,
        role: "student"
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("studentId", user.id);
      localStorage.setItem("token", "demo-token-" + Date.now());
      
      navigate("/student/dashboard");
    } catch (err) {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏥 Student Health</h1>
          <p className="text-gray-600">Mental Health Management System</p>
        </div>

        {/* Role Toggle Button */}
        <div className="flex gap-2 mb-8 bg-gray-100 rounded-lg p-2">
          <button
            type="button"
            onClick={() => handleToggleRole(false)}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
              !isAdmin
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:text-gray-900"
            }`}
          >
            👤 Student
          </button>
          <button
            type="button"
            onClick={() => handleToggleRole(true)}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
              isAdmin
                ? "bg-red-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:text-gray-900"
            }`}
          >
            👨‍💼 Admin
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            <p className="font-bold">❌ Error</p>
            <p>{error}</p>
            <p className="text-xs mt-2">Make sure the backend server is running on http://localhost:5000</p>
          </div>
        )}

        {!showRegister ? (
          <>
            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 text-gray-800 placeholder-gray-400 transition ${
                    isAdmin
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-blue-300 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 text-gray-800 placeholder-gray-400 transition ${
                    isAdmin
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-blue-300 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-bold text-lg transition ${
                  loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : isAdmin
                    ? "bg-red-500 text-white hover:bg-red-600 active:bg-red-700"
                    : "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700"
                }`}
              >
                {loading ? "⏳ Logging in..." : isAdmin ? "🔐 Admin Login" : "🔓 Login"}
              </button>
            </form>

            {/* Demo Credentials Card */}
            <div className={`mt-6 p-4 rounded-lg border-2 ${
              isAdmin
                ? "bg-red-50 border-red-300"
                : "bg-blue-50 border-blue-300"
            }`}>
              <p className={`text-sm font-bold mb-2 ${isAdmin ? "text-red-800" : "text-blue-800"}`}>
                📋 Demo Credentials:
              </p>
              <div className="bg-white p-3 rounded text-sm space-y-1 font-mono">
                <p className="text-gray-700">
                  Email: <span className={`font-bold ${isAdmin ? "text-red-600" : "text-blue-600"}`}>
                    {isAdmin ? "admin@example.com" : "student@example.com"}
                  </span>
                </p>
                <p className="text-gray-700">
                  Password: <span className={`font-bold ${isAdmin ? "text-red-600" : "text-blue-600"}`}>
                    password
                  </span>
                </p>
              </div>
            </div>

            {/* Create Account Button - Only for Student */}
            {!isAdmin && (
              <button
                onClick={() => setShowRegister(true)}
                className="w-full mt-6 py-2 px-4 rounded-lg font-semibold text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition"
              >
                ✏️ Create New Account
              </button>
            )}
          </>
        ) : (
          <>
            {/* Registration Form */}
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Student Account</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Full Name</label>
                <input
                  type="text"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Email Address</label>
                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Password</label>
                <input
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                  placeholder="Enter password"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Confirm Password</label>
                <input
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                  placeholder="Confirm password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-bold text-lg transition ${
                  loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600 active:bg-green-700"
                }`}
              >
                {loading ? "⏳ Creating Account..." : "✅ Register"}
              </button>
            </form>

            <button
              onClick={() => setShowRegister(false)}
              className="w-full mt-4 py-2 px-4 rounded-lg font-semibold text-gray-600 border-2 border-gray-300 hover:bg-gray-50 transition"
            >
              ← Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;