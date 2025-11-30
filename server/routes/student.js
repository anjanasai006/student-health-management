import express from "express";
import Student from "../models/student.js";

const router = express.Router();

// Get student dashboard data
router.get('/dashboard/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId).lean();
  if (!student) return res.status(404).json({ error: 'Student not found' });

  res.json({
    success: true,
    data: {
      student: { id: student._id, name: student.name, email: student.email },
      healthStatus: student.healthStatus,
      lastCheckup: student.lastCheckup,
      upcomingAppointments: [
        { id: 1, date: '2025-12-05', type: 'Annual Checkup' },
        { id: 2, date: '2025-12-10', type: 'Vaccination' }
      ],
      stats: {
        totalCheckups: student.healthRecords.length,
        activeIssues: 0,
        pendingFollowUps: 1
      }
    }
  });
});

// Get student tracking/health records
router.get('/tracking/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId).lean();
  if (!student) return res.status(404).json({ error: 'Student not found' });

  res.json({
    success: true,
    data: {
      studentName: student.name,
      healthRecords: student.healthRecords,
      timeline: [
        { date: '2025-11-20', event: 'Regular Checkup', status: 'completed', notes: 'All vitals normal' },
        { date: '2025-11-15', event: 'Lab Tests', status: 'completed', notes: 'Results pending review' }
      ]
    }
  });
});

// Update student health status
router.put('/health-status/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const { status } = req.body;
  const student = await Student.findById(studentId);
  if (!student) return res.status(404).json({ error: 'Student not found' });

  student.healthStatus = status || student.healthStatus;
  await student.save();

  res.json({ success: true, message: 'Health status updated', data: { healthStatus: student.healthStatus } });
});

export default router;
