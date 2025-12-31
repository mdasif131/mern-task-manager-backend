import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const dataSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    status: { type: String },
    email: { type: String },
    createDate: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const TaskModel = model('task', dataSchema);
export default TaskModel;
