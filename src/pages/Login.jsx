import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/client";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("student@example.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await apiClient.login(email, password);
      if (res.success) {
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("studentId", res.user.id);
        localStorage.setItem("token", res.token);
        
        if (res.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/student/dashboard");
        }
      } else {
        setError(res.error || "Login failed");
      }
    } catch (err) {
      setError("Failed to connect to server");
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
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          role: "student"
        })
      }).then(r => r.json());

      if (res.success) {
        setShowRegister(false);
        setEmail(registerData.email);
        setPassword(registerData.password);
        setRegisterData({ name: "", email: "", password: "", confirmPassword: "" });
        // Auto-login
        const loginRes = await apiClient.login(registerData.email, registerData.password);
        if (loginRes.success) {
          localStorage.setItem("user", JSON.stringify(loginRes.user));
          localStorage.setItem("studentId", loginRes.user.id);
          localStorage.setItem("token", loginRes.token);
          navigate("/student/dashboard");
        }
      } else {
        setError(res.error || "Registration failed");
      }
    } catch (err) {
      setError("Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Student Health</h1>
        <p className="text-center text-gray-600 mb-6">Mental Health Management System</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!showRegister ? (
          <>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                  loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-3">Demo Credentials:</p>
              <div className="bg-gray-100 p-3 rounded text-sm space-y-1">
                <p><strong>Student:</strong> student@example.com / password</p>
                <p><strong>Admin:</strong> admin@example.com / password</p>
              </div>
            </div>

            <button
              onClick={() => setShowRegister(true)}
              className="w-full mt-4 py-2 px-4 rounded-lg font-semibold text-blue-600 border border-blue-600 hover:bg-blue-50 transition"
            >
              Create New Account
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Create Account</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Password</label>
                <input
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                  loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {loading ? "Creating Account..." : "Register"}
              </button>
            </form>

            <button
              onClick={() => setShowRegister(false)}
              className="w-full mt-4 py-2 px-4 rounded-lg font-semibold text-gray-600 border border-gray-300 hover:bg-gray-50 transition"
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;