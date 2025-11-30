import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const healthRecordSchema = new Schema({
  date: { type: String },
  type: { type: String },
  notes: { type: String },
  status: { type: String }
}, { _id: false });

const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  healthStatus: { type: String, default: 'good' },
  lastCheckup: { type: String },
  healthRecords: { type: [healthRecordSchema], default: [] }
}, { timestamps: true });

export default model('Student', studentSchema);
