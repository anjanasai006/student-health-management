import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";

const TherapySession = () => {
  const [sessions, setSessions] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [activeSessions, setActiveSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [bookingData, setBookingData] = useState({ date: "", time: "", therapist: "", type: "" });

  useEffect(() => {
    // Mock data for therapy sessions
    const mockActiveSessions = [
      {
        id: 1,
        therapist: "Dr. Sarah Johnson",
        specialization: "Anxiety & Stress",
        status: "LIVE",
        startTime: "10:30 AM",
        endTime: "11:30 AM",
        participants: 2,
        platform: "Zoom",
        avatar: "👩‍⚕️"
      },
      {
        id: 2,
        therapist: "Dr. Michael Chen",
        specialization: "Depression Support",
        status: "LIVE",
        startTime: "11:00 AM",
        endTime: "12:00 PM",
        participants: 3,
        platform: "Google Meet",
        avatar: "👨‍⚕️"
      }
    ];

    const mockUpcomingSessions = [
      {
        id: 3,
        therapist: "Dr. Emily Davis",
        specialization: "Stress Management",
        date: "Today",
        time: "2:00 PM - 3:00 PM",
        status: "CONFIRMED",
        platform: "Zoom",
        avatar: "👩‍⚕️"
      },
      {
        id: 4,
        therapist: "Dr. James Wilson",
        specialization: "Behavioral Therapy",
        date: "Tomorrow",
        time: "10:00 AM - 11:00 AM",
        status: "CONFIRMED",
        platform: "Teams",
        avatar: "👨‍⚕️"
      },
      {
        id: 5,
        therapist: "Dr. Lisa Anderson",
        specialization: "Mindfulness Coaching",
        date: "Dec 3, 2025",
        time: "3:30 PM - 4:30 PM",
        status: "PENDING",
        platform: "Zoom",
        avatar: "👩‍⚕️"
      }
    ];

    setActiveSessions(mockActiveSessions);
    setUpcomingSessions(mockUpcomingSessions);
  }, []);

  const handleJoinSession = (session) => {
    alert(`Joining session with ${session.therapist}...`);
  };

  const handleCancelSession = (sessionId) => {
    alert(`Session ${sessionId} has been cancelled`);
    setUpcomingSessions(upcomingSessions.filter(s => s.id !== sessionId));
  };

  const handleBookSession = () => {
    if (bookingData.date && bookingData.time && bookingData.therapist && bookingData.type) {
      const newSession = {
        id: upcomingSessions.length + 4,
        therapist: bookingData.therapist,
        specialization: bookingData.type,
        date: bookingData.date,
        time: bookingData.time,
        status: "PENDING",
        platform: "Zoom",
        avatar: "👩‍⚕️"
      };
      setUpcomingSessions([...upcomingSessions, newSession]);
      setShowBookModal(false);
      setBookingData({ date: "", time: "", therapist: "", type: "" });
      alert("Session booked successfully!");
    }
  };

  return (
    <MainLayout role="student">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">🧠 Therapy Sessions</h1>
            <p className="text-gray-600 text-sm mt-1">Manage your online therapy and counseling sessions</p>
          </div>
          <button
            onClick={() => setShowBookModal(true)}
            className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition shadow-lg"
          >
            + Book New Session
          </button>
        </div>

        {/* Active Sessions */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-2xl">🟢</div>
            <h2 className="text-xl font-bold text-green-800">Live Sessions</h2>
            <span className="ml-auto bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">LIVE NOW</span>
          </div>

          {activeSessions.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {activeSessions.map((session) => (
                <div key={session.id} className="bg-white rounded-lg p-4 shadow-lg border-2 border-green-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{session.avatar}</div>
                      <div>
                        <p className="font-bold text-gray-800">{session.therapist}</p>
                        <p className="text-xs text-green-600 font-semibold">{session.specialization}</p>
                      </div>
                    </div>
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">LIVE</span>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <p className="text-gray-600">
                      <span className="font-semibold">🕐 Time:</span> {session.startTime} - {session.endTime}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">👥 Participants:</span> {session.participants} in session
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">📱 Platform:</span> {session.platform}
                    </p>
                  </div>

                  <button
                    onClick={() => handleJoinSession(session)}
                    className="w-full py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
                  >
                    ▶️ Join Now
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-4">No active sessions at the moment</p>
          )}
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-2xl">📅</div>
            <h2 className="text-xl font-bold text-blue-800">Upcoming Sessions</h2>
            <span className="ml-auto bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">{upcomingSessions.length}</span>
          </div>

          {upcomingSessions.length > 0 ? (
            <div className="space-y-3">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="bg-white rounded-lg p-4 border-l-4 border-blue-500 shadow-md hover:shadow-lg transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-3xl">{session.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-gray-800">{session.therapist}</p>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            session.status === "CONFIRMED"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {session.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">{session.specialization}</p>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                          <p className="text-gray-600"><span className="font-semibold">📅 Date:</span> {session.date}</p>
                          <p className="text-gray-600"><span className="font-semibold">🕐 Time:</span> {session.time}</p>
                          <p className="text-gray-600"><span className="font-semibold">📱 Platform:</span> {session.platform}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedSession(session)}
                        className="px-3 py-2 bg-blue-500 text-white text-xs font-semibold rounded hover:bg-blue-600 transition"
                      >
                        ℹ️ Details
                      </button>
                      <button
                        onClick={() => handleCancelSession(session.id)}
                        className="px-3 py-2 bg-red-500 text-white text-xs font-semibold rounded hover:bg-red-600 transition"
                      >
                        ✕ Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-4">No upcoming sessions. Book one now!</p>
          )}
        </div>

        {/* Session Statistics */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-lg p-5">
            <p className="text-4xl font-bold text-purple-600">12</p>
            <p className="text-sm text-gray-700 mt-1">Total Sessions Completed</p>
            <p className="text-xs text-gray-600 mt-2">Avg. rating: 4.8/5 ⭐</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-5">
            <p className="text-4xl font-bold text-green-600">{upcomingSessions.length}</p>
            <p className="text-sm text-gray-700 mt-1">Upcoming Sessions</p>
            <p className="text-xs text-gray-600 mt-2">Next: {upcomingSessions[0]?.date}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-lg p-5">
            <p className="text-4xl font-bold text-blue-600">8</p>
            <p className="text-sm text-gray-700 mt-1">Available Therapists</p>
            <p className="text-xs text-gray-600 mt-2">All verified & certified</p>
          </div>
        </div>

        {/* Therapist Recommendations */}
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-300 rounded-lg p-6">
          <h2 className="text-lg font-bold text-orange-800 mb-4">👨‍⚕️ Recommended Therapists</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { name: "Dr. Sarah Johnson", specialty: "Anxiety & Stress", rating: "4.9", avatar: "👩‍⚕️", availability: "Today 2 PM" },
              { name: "Dr. Michael Chen", specialty: "Depression Support", rating: "4.8", avatar: "👨‍⚕️", availability: "Tomorrow 10 AM" },
              { name: "Dr. Emily Davis", specialty: "Stress Management", rating: "4.7", avatar: "👩‍⚕️", availability: "Dec 3 3 PM" }
            ].map((therapist, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-orange-200 text-center">
                <div className="text-4xl mb-2">{therapist.avatar}</div>
                <p className="font-bold text-gray-800">{therapist.name}</p>
                <p className="text-xs text-gray-600 mb-2">{therapist.specialty}</p>
                <p className="text-sm font-semibold text-yellow-600 mb-3">⭐ {therapist.rating}/5</p>
                <p className="text-xs text-gray-600 mb-3">Available: {therapist.availability}</p>
                <button className="w-full px-3 py-2 bg-orange-500 text-white text-xs font-semibold rounded hover:bg-orange-600 transition">
                  Book Session
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Book Session Modal */}
      {showBookModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">📅 Book Session</h2>
              <button
                onClick={() => setShowBookModal(false)}
                className="text-2xl text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Therapist</label>
                <select
                  value={bookingData.therapist}
                  onChange={(e) => setBookingData({ ...bookingData, therapist: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Choose a therapist...</option>
                  <option value="Dr. Sarah Johnson">Dr. Sarah Johnson - Anxiety & Stress</option>
                  <option value="Dr. Michael Chen">Dr. Michael Chen - Depression Support</option>
                  <option value="Dr. Emily Davis">Dr. Emily Davis - Stress Management</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Session Type</label>
                <select
                  value={bookingData.type}
                  onChange={(e) => setBookingData({ ...bookingData, type: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select session type...</option>
                  <option value="Anxiety & Stress">Anxiety & Stress</option>
                  <option value="Depression Support">Depression Support</option>
                  <option value="Stress Management">Stress Management</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                <select
                  value={bookingData.time}
                  onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select time slot...</option>
                  <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                  <option value="10:30 AM - 11:30 AM">10:30 AM - 11:30 AM</option>
                  <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                  <option value="03:30 PM - 04:30 PM">03:30 PM - 04:30 PM</option>
                </select>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setShowBookModal(false)}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookSession}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default TherapySession;
