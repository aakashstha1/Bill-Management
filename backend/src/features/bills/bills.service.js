import Bill from "../../models/bill.model.js";

// ----------------------------- Get All Bill --------------------------------
export const getAllBills = async () => {
  const bills = await Bill.find({}).sort({ createdAt: -1 });
  return bills;
};

// ----------------------------- Get Bill By Id --------------------------------
export const getBillById = async (id) => {
  const bill = await Bill.findById(id);
  if (!bill) throw new AppError("Bill not found!", 404);
  return bill;
};

// ----------------------------- Create Main Bill --------------------------------
export const createMainBill = async (data) => {
  const bill = await Bill.create(data);
  const existing = await Bill.findOne({
    bill_type: data.bill_type,
    month: data.month,
    year: data.year,
  });

  if (existing) throw new AppError("Bill already exists!", 409);

  return bill;
};

// ----------------------------- Update Main Bill --------------------------------
export const updateMainBill = async (id, data) => {
  const bill = await Bill.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });

  if (!bill) throw new AppError("Bill not found!", 404);

  const existing = await Bill.findOne({
    bill_type: data.bill_type,
    month: data.month,
    year: data.year,
  });

  if (existing) throw new AppError("Bill already exists!", 409);

  return bill;
};

// ----------------------------- Delete Main Bill --------------------------------\
export const deleteMainBill = async (id) => {
  const bill = await Bill.findByIdAndDelete(id);
  if (!bill) throw new AppError("Bill not found!", 404);
  return bill;
};
