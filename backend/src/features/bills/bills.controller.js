import { get } from "mongoose";
import {
  createMainBill,
  deleteMainBill,
  getAllBills,
  getBillById,
  updateMainBill,
} from "./bills.service.js";
import { validateCreateBill, validateUpdateBill } from "./bills.validation.js";

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

    const { total_amount, paid_amount, service_charge = 0 } = req.body;

    const total = Number(total_amount);
    const paid = Number(paid_amount);
    const service = Number(service_charge);

    // calculate business logic
    const discount = total - paid;
    const final_amount = paid + service;

    const data = {
      ...req.body,
      createdBy: req.user.id,
      discount,
      final_amount,
    };

    const bill = await createMainBill(data);

    res.status(201).json({
      success: true,
      message: "Bill created successfully!",
      bill,
    });
  } catch (error) {
    next(error);
  }
};

// ----------------------------- Update Bill --------------------------------
export const updateBill = async (req, res, next) => {
  try {
    const data = { ...req.body };

    delete data.createdBy;
    delete data.discount;
    delete data.final_amount;

    validateUpdateBill(data);

    const existingBill = await getBillById(req.params.id);

    if (!existingBill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
      });
    }

    const total_amount = Number(data.total_amount ?? existingBill.total_amount);

    const paid_amount = Number(data.paid_amount ?? existingBill.paid_amount);

    const service_charge = Number(
      data.service_charge ?? existingBill.service_charge ?? 0,
    );

    if (paid_amount > total_amount) {
      return res.status(400).json({
        success: false,
        message: "Paid amount cannot exceed total amount",
      });
    }

    const discount = total_amount - paid_amount;
    const final_amount = paid_amount + service_charge;

    const updatedData = {
      ...data,
      discount,
      final_amount,
    };

    const bill = await updateMainBill(req.params.id, updatedData);

    res.status(200).json({
      success: true,
      message: "Bill updated successfully!",
      bill,
    });
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
