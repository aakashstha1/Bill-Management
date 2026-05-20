import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateToken,
  generateRefreshToken,
} from "../../utils/generateToken.js";
import AppError from "../../utils/AppError.js";

// --------------------------------------------------- Login --------------------------------------------------
export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("All fields are required!", 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const accessToken = generateToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  const safeUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  return { accessToken, refreshToken, user: safeUser };
};

// --------------------------------------------------- Refresh Token --------------------------------------------------
export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    return null; // no token provided, treat as not logged in
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
  } catch {
    return null;
  }

  const user = await User.findById(decoded.id);
  if (!user || user.refreshToken !== refreshToken) {
    return null;
  }

  const newAccessToken = generateToken(user);
  return newAccessToken;
};

// --------------------------------------------------- Logout --------------------------------------------------
export const logoutUser = async (refreshToken) => {
  if (!refreshToken) return; // already logged out, do nothing

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
  } catch {
    return; // token invalid/expired — still clear cookies in controller
  }

  await User.findByIdAndUpdate(decoded.id, { refreshToken: null });
};

// --------------------------------------------------- Get Me --------------------------------------------------
export const getMeService = async (userId) => {
  const admin = await User.findById(userId).select(
    "-password -refreshToken -status -contact",
  );
  if (!admin) {
    throw new AppError("Admin not found", 404);
  }
  return admin;
};
