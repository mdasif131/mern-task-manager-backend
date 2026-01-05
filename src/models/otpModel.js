import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const otpSchema = new Schema(
  {
    email: { type: String },
    otp: { type: String },
    status: { type: Number, default: 0 },
    createDate: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const OTPModel = model('otp', otpSchema);
export default OTPModel;
