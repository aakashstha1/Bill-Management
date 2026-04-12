// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  // Default status code if not provided
  const statusCode = err.statusCode || 500;

  // Default message if not provided
  const message = err.message || "Internal Server Error";

  // Send response
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
