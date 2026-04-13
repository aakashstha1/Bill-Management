import AppError from "../utils/AppError.js";

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError("Unauthorized: User Not Found", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("Forbidden: You are not authorized", 403));
    }

    next();
  };
};
