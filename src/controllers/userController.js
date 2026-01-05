import asycHandler from '../middlewares/asyncHandler.js';
import OTPModel from '../models/otpModel.js';
import UserModel from '../models/userModel.js';
import generateToken from '../utils/createToken.js';
import { getOTPEmailTemplate } from '../utils/getOTPEmailTemplate.js';
import { sendEmailUtility } from '../utils/sendEmailUtility.js';
export const registration = async (req, res) => {
  try {
    const { email, firstName, lastName, mobile, password, photo } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await UserModel.create({
      email,
      firstName,
      lastName,
      mobile,
      password,
      photo,
    });
    generateToken(res, user._id, user.email);
    res.status(201).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    console.error('Registration Error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
     const token = generateToken(res, existingUser._id, existingUser.email); 
      
      const isPasswordCorrect = existingUser.password === password;
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      res.status(200).json({
        status: 'success',
        token: token,
        data: {
          _id: existingUser._id,
          email: existingUser.email,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          mobile: existingUser.mobile,
          photo: existingUser.photo,
        },
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const profileDetails = asycHandler(async (req, res) => {
  const email = req.user.email || req.body.email; 
  try {
    const userDetails = await UserModel.aggregate([
      { $match: { email: email } },
      { $project: { _id: 1, email: 1, firstName: 1, lastName: 1, mobile:1, photo:1, password:1}}
    ])
    return res.status(200).json({status: 'success', data: userDetails[0]});
  } catch (error) {
    res.status(400).json({status:'fail', data: error.message});
  }
})
export const updateUserProfile = asycHandler(async (req, res) => {
  let user = await UserModel.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.email = req.body.email || user.email;
  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.mobile = req.body.mobile || user.mobile;
  user.photo = req.body.photo || user.photo;
  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    status: 'success',
    updatedUser,
  });
});


// export const recoverVerifyEmail = asycHandler(async (req, res) => {
//   const email = req.params.email;
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   try {
//     // Step 01: Email Account Query
//     // const userExists = await UserModel.findOne({ email });
//     const userExist = await UserModel.aggregate([{ $match: { email: email } },{$count:"total"}]);
//     if (userExist.length > 0) {
//       // Step 02: OTP Insert
//       await OTPModel.create({email: email, otp: otp});
//       // Step 03: Send Email with OTP
//       const sendEmail = await sendEmailUtility(email, `Your OTP is ${otp}`, 'Task Manager App PIN Verification');
//       res.status(200).json({status:'success', message: 'OTP sent to your email', data: sendEmail});
//     } else {
//       res.status(400).json({status:'fail', message: 'Email not found'});
//     }
    
//   }catch (error) {
//     res.status(400).json({status:'fail', message: error.message});
//   }
// })
// ✅ UPDATED: Now with HTML email template
export const recoverVerifyEmail = asycHandler(async (req, res) => {
  const email = req.params.email;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Step 01: Check if email exists
    const userExist = await UserModel.aggregate([
      { $match: { email: email } },
      { $count: 'total' },
    ]);

    if (userExist.length > 0) {
      // Step 02: Get user name for personalization
      const user = await UserModel.findOne({ email: email });
      const userName = user.firstName || 'User';

      // Step 03: Create OTP record
      await OTPModel.create({ email: email, otp: otp });

      // Step 04: Generate HTML email template
      const emailHTML = getOTPEmailTemplate(otp, userName);
      const emailText = `Hello ${userName}, Your OTP is ${otp}. This code will expire in 10 minutes.`;

      // Step 05: Send Email with HTML template
      const sendEmail = await sendEmailUtility(
        email,
        emailText,
        'Task Manager App PIN Verification',
        emailHTML
      );

      res.status(200).json({
        status: 'success',
        message: 'OTP sent to your email',
        data: sendEmail,
      });
    } else {
      res.status(400).json({
        status: 'fail',
        message: 'Email not found',
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
});
export const RecoverVerifyOTP = asycHandler(async (req, res) => { 
  const email = req.params.email; 
  const otpCode = req.params.otp;
  let status = 0;
  let statusUpdate = 1;
  try {
    const OTPCount = await OTPModel.aggregate([
      {$match:{email: email, otp: otpCode, status: status}},
      { $count: "total" }]) 
    if (OTPCount.length > 0) {
      const OTPUpdate = await OTPModel.updateOne(
        { email: email, otp: otpCode, status: status },
        { $set: { email: email, otp: otpCode, status: statusUpdate } }
      );
      res.status(200).json({status:'success', data: OTPUpdate});
    } else {
      res.status(404).json({status:'fail', message: "Invalid OTP Code"});
    }
  }catch (error) {
    res.status(404).json({status:'fail', message: "Invalid OTP Code"});
  }
})