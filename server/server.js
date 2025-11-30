import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/student.js";
import adminRoutes from "./routes/admin.js";
import feedbackRoutes from "./routes/feedback.js";
import moodRoutes from "./routes/mood.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/student-health-management";

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests from any origin (Vercel deployment)
    if (!origin) return callback(null, true);
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running", timestamp: new Date().toISOString() });
});

// Connect to MongoDB then register routes
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");

  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/student", studentRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/feedback", feedbackRoutes);
  app.use("/api/mood", moodRoutes);

  // 404 fallback
  app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
  });

  // Error handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error", message: err.message });
  });

  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
    console.log(`CORS enabled for: http://localhost:5173`);
  });

}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

export default app;
