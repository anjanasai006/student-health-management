import express from "express";
import Feedback from "../models/feedback.js";
import Student from "../models/student.js";

const router = express.Router();

// Get all feedback
router.get('/', async (req, res) => {
  const feedback = await Feedback.find().lean();
  const avgRating = feedback.length ? (feedback.reduce((s, f) => s + f.rating, 0) / feedback.length).toFixed(1) : 0;
  res.json({ success: true, data: { totalFeedback: feedback.length, feedback, avgRating } });
});

// Submit feedback
router.post('/submit', async (req, res) => {
  const { studentId, studentName, rating, message } = req.body;
  if (!studentId || !rating || !message) return res.status(400).json({ error: 'Student ID, rating, and message are required' });
  if (rating < 1 || rating > 5) return res.status(400).json({ error: 'Rating must be between 1 and 5' });

  const student = await Student.findById(studentId).lean();
  if (!student) return res.status(400).json({ error: 'Student not found' });

  const feedback = await Feedback.create({ studentId, studentName: studentName || student.name, rating, message, date: new Date().toISOString().split('T')[0] });
  res.json({ success: true, message: 'Feedback submitted successfully', data: feedback });
});

// Get feedback by student
router.get('/student/:studentId', async (req, res) => {
  const studentFeedback = await Feedback.find({ studentId: req.params.studentId }).lean();
  res.json({ success: true, data: studentFeedback });
});

export default router;
