import express from 'express';
import MoodEntry from '../models/mood.js';
import Student from '../models/student.js';

const router = express.Router();

// Add mood entry
router.post('/add', async (req, res) => {
  try {
    const { studentId, mood, notes } = req.body;
    if (!studentId || !mood) return res.status(400).json({ error: 'Student ID and mood are required' });
    if (mood < 1 || mood > 5) return res.status(400).json({ error: 'Mood must be between 1 and 5' });

    const student = await Student.findById(studentId).lean();
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const moodEntry = await MoodEntry.create({ studentId, mood, notes: notes || '' });
    res.status(201).json({ success: true, data: moodEntry });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add mood entry', message: err.message });
  }
});

// Get all mood entries for a student
router.get('/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const moodEntries = await MoodEntry.find({ studentId }).sort({ date: -1, createdAt: -1 }).lean();
    res.json({ success: true, data: moodEntries });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch mood entries', message: err.message });
  }
});

// Update mood entry
router.put('/:moodId', async (req, res) => {
  try {
    const { mood, notes } = req.body;
    if (!mood) return res.status(400).json({ error: 'Mood is required' });
    if (mood < 1 || mood > 5) return res.status(400).json({ error: 'Mood must be between 1 and 5' });

    const moodEntry = await MoodEntry.findByIdAndUpdate(req.params.moodId, { mood, notes }, { new: true });
    if (!moodEntry) return res.status(404).json({ error: 'Mood entry not found' });

    res.json({ success: true, data: moodEntry });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update mood entry', message: err.message });
  }
});

// Delete mood entry
router.delete('/:moodId', async (req, res) => {
  try {
    const moodEntry = await MoodEntry.findByIdAndDelete(req.params.moodId);
    if (!moodEntry) return res.status(404).json({ error: 'Mood entry not found' });

    res.json({ success: true, message: 'Mood entry deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete mood entry', message: err.message });
  }
});

export default router;
