import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import Student from '../models/student.js';
import Feedback from '../models/feedback.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/studentmentalhealth';

async function seed() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB for seeding');

  // Check if data exists
  const usersCount = await User.countDocuments();
  if (usersCount === 0) {
    const hashed = await bcrypt.hash('password', 10);
    const studentUser = await User.create({ name: 'John Doe', email: 'student@example.com', password: hashed, role: 'student' });
    const adminUser = await User.create({ name: 'Admin User', email: 'admin@example.com', password: hashed, role: 'admin' });

    const student = await Student.create({ name: 'John Doe', email: 'student@example.com', healthStatus: 'good', lastCheckup: '2025-11-20', healthRecords: [{ date: '2025-11-20', type: 'checkup', notes: 'Regular checkup - all good', status: 'active' }] });

    await Feedback.create({ studentId: student._id, studentName: student.name, rating: 4, message: 'Great health services!', date: '2025-11-25' });

    console.log('Seeded initial users, students, and feedback');
  } else {
    console.log('Database already seeded');
  }

  await mongoose.disconnect();
  console.log('Seed complete and disconnected');
}

seed().catch(err => {
  console.error('Seeding failed', err);
  process.exit(1);
});
