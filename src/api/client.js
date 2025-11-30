// src/api/client.js
// Simple API client for frontend-backend communication

const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
    ? '/api' 
    : 'http://localhost:5000/api');

export const apiClient = {
  // Auth endpoints
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST"
    });
    return response.json();
  },

  // Student endpoints
  getStudentDashboard: async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/student/dashboard/${studentId}`);
    return response.json();
  },

  getStudentTracking: async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/student/tracking/${studentId}`);
    return response.json();
  },

  updateHealthStatus: async (studentId, status) => {
    const response = await fetch(`${API_BASE_URL}/student/health-status/${studentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    return response.json();
  },

  // Admin endpoints
  getAdminDashboard: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard`);
    return response.json();
  },

  getStudentDetails: async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/admin/student/${studentId}`);
    return response.json();
  },

  addHealthRecord: async (studentId, record) => {
    const response = await fetch(`${API_BASE_URL}/admin/student/${studentId}/health-record`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record)
    });
    return response.json();
  },

  // Feedback endpoints
  submitFeedback: async (feedback) => {
    const response = await fetch(`${API_BASE_URL}/feedback/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedback)
    });
    return response.json();
  },

  getAllFeedback: async () => {
    const response = await fetch(`${API_BASE_URL}/feedback`);
    return response.json();
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await fetch(`${API_BASE_URL.replace("/api", "")}/api/health`);
      return response.json();
    } catch (error) {
      return { status: "Backend unavailable", error: error.message };
    }
  },

  // Mood endpoints
  addMoodEntry: async (studentId, mood, notes) => {
    const response = await fetch(`${API_BASE_URL}/mood/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, mood, notes })
    });
    return response.json();
  },

  getMoodEntries: async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/mood/${studentId}`);
    return response.json();
  },

  updateMoodEntry: async (moodId, mood, notes) => {
    const response = await fetch(`${API_BASE_URL}/mood/${moodId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood, notes })
    });
    return response.json();
  },

  deleteMoodEntry: async (moodId) => {
    const response = await fetch(`${API_BASE_URL}/mood/${moodId}`, {
      method: "DELETE"
    });
    return response.json();
  }
};

export default apiClient;
