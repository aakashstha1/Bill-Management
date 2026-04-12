import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const createAdmin = async () => {
  try {
    const existingAdmin = await User.exists({ role: "admin" });

    if (existingAdmin) {
      console.log("Admin already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const admin = new User({
      name: process.env.ADMIN_NAME,
      password: hashedPassword,
      contact: process.env.ADMIN_CONTACT,
      role: "admin",
    });

    await admin.save();

    console.log("Admin created successfully.");
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};
