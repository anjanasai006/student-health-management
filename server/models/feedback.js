import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const feedbackSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  studentName: { type: String },
  rating: { type: Number, required: true },
  message: { type: String, required: true },
  date: { type: String }
}, { timestamps: true });

export default model('Feedback', feedbackSchema);
