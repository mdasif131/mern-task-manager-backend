import jwt from 'jsonwebtoken'
import UserModel from '../models/userModel.js'
import asycHandler from './asyncHandler.js';
export const authenticate = asycHandler(async (req, res, next) => {
  let token;
  //Read token from cookies
  token = req.cookies?.token 
 
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, no token' });

    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});
