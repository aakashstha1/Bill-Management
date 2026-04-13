import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters"],
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: String,
  contact: { type: String, unique: true, required: true },
  status: { type: Boolean, default: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    index: true,
  },
  refreshToken: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);
