import Bill from "../../models/bill.model.js";
import userBill from "../../models/userBill.model.js";

//---------------------------------------- Get Paid Total year/month ------------------------------------------------
export const getPaidAnalyticsService = async (year, month) => {
  const currentYear = new Date().getFullYear();

  const matchStage = {
    year: year || currentYear,
    ...(month && { month }), // add month only if exists
  };

  const result = await Bill.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$bill_type",
        total: { $sum: "$final_amount" },
      },
    },
  ]);

  let electricity = 0;
  let water = 0;

  result.forEach((item) => {
    if (item._id === "electricity") electricity = item.total;
    if (item._id === "water") water = item.total;
  });

  return {
    total_paid: electricity + water,
    electricity_paid: electricity,
    water_paid: water,
  };
};

//-------------------------------------------- Get All Time Paid Total ------------------------------------------------
export const getAllTimePaidAnalyticsService = async () => {
  const result = await Bill.aggregate([
    {
      $group: {
        _id: "$bill_type",
        total: { $sum: "$final_amount" },
      },
    },
  ]);

  let electricity = 0;
  let water = 0;

  result.forEach((item) => {
    if (item._id === "electricity") electricity = item.total;
    if (item._id === "water") water = item.total;
  });

  return {
    total_paid: electricity + water,
    electricity_paid: electricity,
    water_paid: water,
  };
};

//-------------------------------------------- Get Active Users Paid Total ------------------------------------------------
export const getActiveUsersPaidAnalyticsService = async (year, month) => {
  const currentYear = new Date().getFullYear();

  const matchStage = {
    paid: true,
    year: year || currentYear,
    ...(month && { month }), // add month only if exists
  };

  const result = await userBill.aggregate([
    // 1. filter bill by year/month first (optional optimization)
    { $match: matchStage },

    // 2. join user
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },

    // 3. only active users
    {
      $match: {
        "user.status": true,
      },
    },

    // 4. group by user
    {
      $group: {
        _id: "$user._id",
        name: { $first: "$user.name" },
        total_paid: { $sum: "$final_amount" },
      },
    },

    // 5. clean output
    {
      $project: {
        _id: 0,
        userId: "$_id",
        name: 1,
        total_paid: 1,
      },
    },
  ]);

  return result;
};

//-------------------------------------------- Get Owner Paid Total ------------------------------------------------
export const getOwnerPaidAnalyticsService = async (year, month) => {
  const currentYear = new Date().getFullYear();

  const matchStage = {
    year: year || currentYear,
    ...(month && { month }),
  };

  // MAIN BILL
  const main = await Bill.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$bill_type",
        total_main: { $sum: "$final_amount" },
      },
    },
  ]);

  let eleMain = 0;
  let waterMain = 0;

  main.forEach((m) => {
    if (m._id === "electricity") eleMain = m.total_main;
    if (m._id === "water") waterMain = m.total_main;
  });

  // USER BILL
  const userAgg = await userBill.aggregate([
    { $match: matchStage },

    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },

    {
      $match: {
        paid: true,
        "user.status": true,
      },
    },

    {
      $group: {
        _id: null,
        ele_user_total: { $sum: "$ele_amount" },
        water_user_total: { $sum: "$water_amount" },
      },
    },
  ]);

  const eleUser = userAgg[0]?.ele_user_total || 0;
  const waterUser = userAgg[0]?.water_user_total || 0;

  // FINAL CALCULATION
  const electricity_owner_paid = eleMain - eleUser;
  const water_owner_paid = waterMain - waterUser;

  return {
    year: matchStage.year,
    month: matchStage.month || "all",
    total_owner_paid: electricity_owner_paid + water_owner_paid,
    electricity_owner_paid,
    water_owner_paid,
  };
};