import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Simple login endpoint (no JWT yet) - compare plaintext for demo
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const user = await User.findOne({ email }).lean();

  if (!user) return res.status(401).json({ error: "Invalid email or password" });

  // For demo, allow any password if stored password is 'password' or compare bcrypt if hashed
  const isPlainPassword = user.password === 'password' && password === 'password';
  const isBcryptMatch = await bcrypt.compare(password, user.password).catch(() => false);

  if (!isPlainPassword && !isBcryptMatch) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  res.json({
    success: true,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    token: `mock_token_${user._id}`
  });
});

// Register endpoint: creates a User and Student (if role === 'student')
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    const existing = await User.findOne({ email }).lean();
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: role || 'student' });

    // Create a Student document for UI if role is student
    if ((role || 'student') === 'student') {
      // lazy import to avoid circular issues
      const Student = (await import('../models/student.js')).default;
      await Student.create({ name, email, healthStatus: 'good', lastCheckup: new Date().toISOString().split('T')[0] });
    }

    return res.status(201).json({ success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error('Register error', err);
    return res.status(500).json({ error: 'Registration failed', message: err.message });
  }
});

router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out' });
});

export default router;
