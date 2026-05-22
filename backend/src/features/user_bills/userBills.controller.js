import { getUserById } from "../users/user.service.js";
import {
  createUserBillService,
  deleteUserBillService,
  getAllUsersBill,
  getUserAllBillsById,
  getUserBillById,
  getUserBillsByStatusService,
  toggleBill,
  updateUserBillService,
} from "./userBills.service.js";
import {
  validateCreateUserBill,
  validateUpdateUserBill,
} from "./userBills.validation.js";

//----------------------------------------- Get All Users Bill -------------------------------------------------
export const getUsersBill = async (req, res, next) => {
  try {
    const usersBills = await getAllUsersBill();
    res
      .status(200)
      .json({ success: true, count: usersBills.length, usersBills });
  } catch (error) {
    next(error);
  }
};

//----------------------------------------- Get User All Bill By Id --------------------------------------------
export const getUserBillsById = async (req, res, next) => {
  try {
    const userBills = await getUserAllBillsById(req.params.id);
    res.status(200).json({ success: true, count: userBills.length, userBills });
  } catch (error) {
    next(error);
  }
};

//----------------------------------------- Get User Bill By Id --------------------------------------------
export const getUserSingleBillById = async (req, res, next) => {
  try {
    const userBill = await getUserBillById(req.params.id);
    res.status(200).json({ success: true, message: "Bill found!", userBill });
  } catch (error) {
    next(error);
  }
};

//----------------------------------------- Create User Bill --------------------------------------------
export const createUserBill = async (req, res, next) => {
  try {
    validateCreateUserBill(req.body);

    const { ele_units, ele_rate, room_amount, water_amount } = req.body;

    const units = Number(ele_units);
    const rate = Number(ele_rate);
    const room = Number(room_amount);
    const water = Number(water_amount);

    const ele_amount = units * rate;
    const final_amount = ele_amount + water + room;

    const data = { ...req.body, ele_amount, final_amount };

    const bill = await createUserBillService(data);
    const tenant = await getUserById(bill.user);
    res.status(201).json({
      success: true,
      message: `Bill created successfully for ${tenant?.name}!`,
      bill,
    });
  } catch (error) {
    next(error);
  }
};

//----------------------------------------- Update User Bill By Id --------------------------------------------
export const updateUserBill = async (req, res, next) => {
  try {
    const data = { ...req.body };

    delete data.ele_amount;
    delete data.final_amount;
    // delete data.paid;

    validateUpdateUserBill(data);

    const existingBill = await getUserBillById(req.params.id);

    if (!existingBill) {
      return res.status(404).json({
        success: false,
        message: "User bill not found",
      });
    }

    const units = Number(data.ele_units ?? existingBill.ele_units);
    const rate = Number(data.ele_rate ?? existingBill.ele_rate);
    const room = Number(data.room_amount ?? existingBill.room_amount);
    const water = Number(data.water_amount ?? existingBill.water_amount);

    const ele_amount = units * rate;
    const final_amount = ele_amount + water + room;

    const updatedData = {
      ...data,
      ele_amount,
      final_amount,
    };

    const bill = await updateUserBillService(req.params.id, updatedData);
    res
      .status(200)
      .json({ success: true, message: "Bill updated successfully!", bill });
  } catch (error) {
    next(error);
  }
};

//----------------------------------------- Delete User Bill By Id --------------------------------------------
export const deleteUserBill = async (req, res, next) => {
  try {
    const bill = await deleteUserBillService(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Bill deleted successfully!", bill });
  } catch (error) {
    next(error);
  }
};

//----------------------------------------- Toggle Bill Paid/Unpaid --------------------------------------------
export const toggleBillStatus = async (req, res, next) => {
  try {
    const bill = await toggleBill(req.params.id);
    res.status(200).json({
      success: true,
      message: "Bill updated successfully!",
      paid: bill,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserBillsByStatus = async (req, res, next) => {
  try {
    const userBills = await getUserBillsByStatusService(req.params.id);
    res.status(200).json({ success: true, count: userBills.length, userBills });
  } catch (error) {
    next(error);
  }
};
