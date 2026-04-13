import AppError from "../../utils/AppError.js";
import { loginUser, refreshAccessToken, logoutUser } from "./auth.service.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

// --------------------------------------------------- Login --------------------------------------------------
export const login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await loginUser(req.body);
    //set access_token
    res.cookie("accessToken", accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    // set refresh_token 
    res.cookie("refreshToken", refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ success: true, message: "Login successful!" });
  } catch (error) {
    next(error);
  }
};

// --------------------------------------------------- Refresh Token --------------------------------------------------
export const refreshToken = async (req, res, next) => {
  try {
    //Get refresh_token from cookies
    const { refreshToken } = req.cookies;

    const newAccessToken = await refreshAccessToken(refreshToken);

    res.cookie("accessToken", newAccessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.status(200).json({ success: true, message: "Token refreshed!" });
  } catch (error) {
    next(error);
  }
};

// --------------------------------------------------- Logout --------------------------------------------------
export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    await logoutUser(refreshToken);

    res.clearCookie("accessToken", COOKIE_OPTIONS);
    res.clearCookie("refreshToken", COOKIE_OPTIONS);

    res.status(200).json({ success: true, message: "Logout successful!" });
  } catch (error) {
    next(error);
  }
};
