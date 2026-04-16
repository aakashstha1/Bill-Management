import UserBill from "../../models/userBill.model.js";
import AppError from "../../utils/AppError.js";
//-------------------------------------- Get All Users Bill ------------------------------------------------
export const getAllUsersBill = async () => {
  const usersBills = await UserBill.find({}).sort({ createdAt: -1 });
  return usersBills;
};

//-------------------------------------- Get Users All Bill By Id ---------------------------------------------
export const getUserAllBillsById = async (id) => {
  const userBills = await UserBill.find({ user: id }).sort({
    createdAt: -1,
  });
  return userBills;
};

//-------------------------------------- Get Users Bill By Id ------------------------------------------------
export const getUserBillById = async (id) => {
  const userBill = await UserBill.findById(id);
  return userBill;
};

//-------------------------------------- Create Users Bill ------------------------------------------------
export const createUserBillService = async (data) => {
  const existing = await UserBill.findOne({
    user: data.user,
    month: data.month,
    year: data.year,
  });
  if (existing) throw new AppError("Bill already exists!", 409);
  const userBill = await UserBill.create(data);
  return userBill;
};

//-------------------------------------- Update Users Bill ------------------------------------------------
export const updateUserBillService = async (id, data) => {
  const existing = await UserBill.findOne({
    user: data.user,
    month: data.month,
    year: data.year,
    _id: { $ne: id }, //exclude current document (used to prevent matching itself during update checks)
  });

  if (existing) throw new AppError("Bill already exists!", 409);
  const userBill = await UserBill.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
  if (!userBill) throw new AppError("UserBill not found!", 404);
  return userBill;
};

//-------------------------------------- Delete Users Bill ------------------------------------------------
export const deleteUserBillService = async (id) => {
  const userBill = await UserBill.findByIdAndDelete(id);
  if (!userBill) throw new AppError("UserBill not found!", 404);
  return userBill;
};

//-------------------------------------- Toggle Bill Status ------------------------------------------------
export const toggleBill = async (id) => {
  const userBill = await UserBill.findById(id);
  if (!userBill) throw new AppError("UserBill not found!", 404);
  userBill.paid = !userBill.paid;
  await userBill.save();
  return userBill.paid;
};
