// Create a custom error class by extending the built-in Error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Call the constructor of the parent class (i.e. Error)

    this.statusCode = statusCode; // Custom property to store HTTP status code (e.g., 404, 500)
  }
}

export default AppError;
