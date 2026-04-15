import User from "../../models/user.model.js";
import AppError from "../../utils/AppError.js";
// -------------------------------------------- create User --------------------------------------------
export const createUserService = async ({ name, email, contact }) => {
  if (!name || !contact)
    throw new AppError("Name & Contact are required!", 400);
  if (email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new AppError("Email already exists!", 409);
  }

  const existingUser = await User.findOne({ contact });
  if (existingUser) throw new AppError("Contact already exists!", 409);

  const user = await User.create({ name, email, contact });
  return user;
};

// ------------------------------------------------ Update User --------------------------------------------
export const updateUserService = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
  if (!user) throw new AppError("User not found!", 404);
  return user;
};

// --------------------------------------------- Toogle Status --------------------------------------------
export const toogleStatusService = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new AppError("User not found!", 404);
  user.status = !user.status;
  await user.save();
  return user.status;
};

// --------------------------------------------------- Get All Users -------------------------------------------
export const getAllUsers = async () => {
  const users = await User.find({ role: "user" }).sort({ createdAt: -1 });
  return users;
};

// --------------------------------------------------- Get User By ID -------------------------------------------
export const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new AppError("User not found!", 404);
  return user;
};
