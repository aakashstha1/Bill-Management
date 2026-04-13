import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next(new AppError("No token provided", 401));
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decode.id).select("-password");
    if (!user) {
      return next(new AppError("User not found", 401));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(new AppError("Invalid token", 401));
  }
};
