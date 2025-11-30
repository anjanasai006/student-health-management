import express from "express";
import Student from "../models/student.js";

const router = express.Router();

// Get all students for admin dashboard
router.get('/dashboard', async (req, res) => {
  const students = await Student.find().lean();
  res.json({
    success: true,
    data: {
      totalStudents: students.length,
      students: students.map(s => ({
        id: s._id,
        name: s.name,
        email: s.email,
        healthStatus: s.healthStatus,
        lastCheckup: s.lastCheckup,
        recordsCount: s.healthRecords.length
      })),
      stats: {
        healthyCount: students.filter(s => s.healthStatus === 'good').length,
        atRiskCount: students.filter(s => s.healthStatus === 'fair').length,
        criticalCount: students.filter(s => s.healthStatus === 'critical').length
      }
    }
  });
});

// Get detailed student info for admin
router.get('/student/:studentId', async (req, res) => {
  const student = await Student.findById(req.params.studentId).lean();
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json({ success: true, data: student });
});

// Add health record for a student
router.post('/student/:studentId/health-record', async (req, res) => {
  const student = await Student.findById(req.params.studentId);
  if (!student) return res.status(404).json({ error: 'Student not found' });

  const { type, notes, status } = req.body;
  const newRecord = { date: new Date().toISOString().split('T')[0], type: type || 'checkup', notes: notes || '', status: status || 'active' };
  student.healthRecords.push(newRecord);
  await student.save();

  res.json({ success: true, message: 'Health record added', data: newRecord });
});

// Update student health status (admin)
router.put('/student/:studentId/status', async (req, res) => {
  const student = await Student.findById(req.params.studentId);
  if (!student) return res.status(404).json({ error: 'Student not found' });

  const { healthStatus } = req.body;
  student.healthStatus = healthStatus || student.healthStatus;
  await student.save();

  res.json({ success: true, message: 'Student health status updated', data: { healthStatus: student.healthStatus } });
});

export default router;
