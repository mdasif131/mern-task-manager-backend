import asycHandler from '../middlewares/asyncHandler.js';
import UserModel from '../models/userModel.js';
import generateToken from '../utils/createToken.js';
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
      generateToken(res, existingUser._id, existingUser.email);
      const isPasswordCorrect = existingUser.password === password;
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      res.status(200).json({
        status: 'success',
        token: token || req.cookies.token,
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
