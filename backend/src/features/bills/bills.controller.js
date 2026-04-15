import {
  createMainBill,
  deleteMainBill,
  getAllBills,
  getBillById,
  updateMainBill,
} from "./bills.service";
import { validateCreateBill, validateUpdateBill } from "./bills.validation";

// ----------------------------- Get All Bill --------------------------------
export const getBills = async (req, res, next) => {
  try {
    const bills = await getAllBills();
    res.status(200).json({ success: true, count: bills.length, bills });
  } catch (error) {
    next(error);
  }
};

// ----------------------------- Get Bill By Id --------------------------------
export const getSingleBill = async (req, res, next) => {
  try {
    const bill = await getBillById(req.params.id);
    res.status(200).json({ success: true, message: "Bill found!", bill });
  } catch (error) {
    next(error);
  }
};

// ----------------------------- Create Bill --------------------------------
export const createBill = async (req, res, next) => {
  try {
    validateCreateBill(req.body);
    const bill = await createMainBill(req.body);
    res
      .status(201)
      .json({ success: true, message: "Bill created successfully!", bill });
  } catch (error) {
    next(error);
  }
};

// ----------------------------- Update Bill --------------------------------
export const updateBill = async (req, res, next) => {
  try {
    validateUpdateBill(req.body);
    const bill = await updateMainBill(req.params.id, req.body);
    res
      .status(200)
      .json({ success: true, message: "Bill updated successfully!", bill });
  } catch (error) {
    next(error);
  }
};

// ----------------------------- Delete Main Bill --------------------------------
export const deleteBill = async (req, res, next) => {
  try {
    const bill = await deleteMainBill(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Bill deleted successfully!", bill });
  } catch (error) {
    next(error);
  }
};
