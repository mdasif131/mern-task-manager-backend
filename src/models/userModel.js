import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    mobile: { type: String },
    password: { type: String, required: true },
    photo: { type: String },
    createDate: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const UserModel = model('User', userSchema);
export default UserModel;
