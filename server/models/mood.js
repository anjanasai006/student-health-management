import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const moodEntrySchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  mood: { type: Number, enum: [1, 2, 3, 4, 5], required: true }, // 1=Very Bad, 5=Excellent
  notes: { type: String, default: '' },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

export default model('MoodEntry', moodEntrySchema);
