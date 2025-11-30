// In-memory data store (replace with actual DB in production)
export const db = {
  users: [
    { id: 1, email: "student@example.com", password: "hashed_password", role: "student", name: "John Doe" },
    { id: 2, email: "admin@example.com", password: "hashed_password", role: "admin", name: "Admin User" }
  ],
  students: [
    {
      id: 1,
      name: "John Doe",
      email: "student@example.com",
      healthStatus: "good",
      lastCheckup: "2025-11-20",
      healthRecords: [
        { date: "2025-11-20", type: "checkup", notes: "Regular checkup - all good", status: "active" }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      healthStatus: "fair",
      lastCheckup: "2025-11-15",
      healthRecords: [
        { date: "2025-11-15", type: "follow-up", notes: "Follow-up needed", status: "pending" }
      ]
    }
  ],
  feedback: [
    {
      id: 1,
      studentId: 1,
      studentName: "John Doe",
      rating: 4,
      message: "Great health services!",
      date: "2025-11-25"
    }
  ]
};

// Helper functions
export const findUserByEmail = (email) => db.users.find(u => u.email === email);
export const findStudentById = (id) => db.students.find(s => s.id === id);
export const getAllStudents = () => db.students;
export const addFeedback = (feedback) => {
  const newFeedback = { ...feedback, id: db.feedback.length + 1, date: new Date().toISOString().split("T")[0] };
  db.feedback.push(newFeedback);
  return newFeedback;
};
