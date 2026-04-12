import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  password: String,
  contact: { type: Number, unique: true, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    index: true,
  },
});

export default mongoose.model("User", userSchema);
