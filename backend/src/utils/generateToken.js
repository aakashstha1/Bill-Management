import jwt from "jsonwebtoken";
export const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET_key, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET_KEY, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
};
