import Bill from "../../../models/bill.model.js";
import userBill from "../../../models/userBill.model.js";
import { getCurrentBsYear } from "../shared/nepaliDate.js";
import { getActiveUsersPaidAnalyticsService } from "../user/users.service.js";

//---------------------------------------- Get Paid Total year/month ------------------------------------------------
export const getPaidAnalyticsService = async (year, month) => {
  const currentYear = getCurrentBsYear();

  const matchStage = {
    year: year || currentYear,
    ...(month && { month }), // add month only if exists
  };

  const result = await Bill.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$bill_type",
        total: { $sum: "$paid_amount" },
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
        total: { $sum: "$paid_amount" },
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

//-------------------------------------------- Get Owner Paid Total ------------------------------------------------
export const getOwnerPaidAnalyticsService = async (year, month) => {
  const currentYear = getCurrentBsYear();

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
        total_main: { $sum: "$paid_amount" },
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

//-------------------------------------------- Get Total Bill Compare ------------------------------------------------
export const getTotalBillCompareService = async () => {
  const currentYear = getCurrentBsYear();
  const previousYear = currentYear - 1;

  const monthOrder = [
    "baisakh",
    "jestha",
    "ashadh",
    "shrawan",
    "bhadra",
    "ashwin",
    "kartik",
    "mangsir",
    "poush",
    "magh",
    "falgun",
    "chaitra",
  ];

  const result = await Bill.aggregate([
    {
      $match: {
        year: { $in: [currentYear, previousYear] },
      },
    },
    {
      $group: {
        _id: {
          year: "$year",
          month: "$month",
        },
        total: { $sum: "$paid_amount" },
      },
    },
    {
      $addFields: {
        monthNumber: {
          $indexOfArray: [monthOrder, "$_id.month"],
        },
      },
    },
    {
      $sort: {
        monthNumber: 1,
      },
    },
  ]);

  // Create fast lookup map
  const map = {};
  result.forEach((r) => {
    map[`${r._id.year}-${r._id.month}`] = r.total;
  });

  const formatted = monthOrder.map((month) => ({
    month,
    currentYear: map[`${currentYear}-${month}`] || 0,
    previousYear: map[`${previousYear}-${month}`] || 0,
  }));

  return formatted;
};

//-------------------------------------------- Get All user and owner Paid year/month ------------------------------------------------
export const getAllusersAndOwnerPaidAnalyticsService = async (year, month) => {
  const currentYear = getCurrentBsYear();

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
        total_main: { $sum: "$paid_amount" },
      },
    },
  ]);

  let eleMain = 0;
  let waterMain = 0;

  main.forEach((m) => {
    if (m._id === "electricity") eleMain = m.total_main;
    if (m._id === "water") waterMain = m.total_main;
  });

  const total_main = eleMain + waterMain;

  const allUsersPaid = await getActiveUsersPaidAnalyticsService(year, month);
  const ownerPaid = await getOwnerPaidAnalyticsService(year, month);
  // const billAmt= await

  const users = allUsersPaid.map((u) => ({
    name: u.name,
    total_paid: (u.ele_amount || 0) + (u.water_amount || 0),
  }));

  const owner = {
    name: "Owner",
    total_paid: ownerPaid.total_owner_paid,
  };

  const usersWithPercent = users.map((u) => ({
    ...u,
    percent: total_main ? +((u.total_paid / total_main) * 100).toFixed(2) : 0,
  }));

  const ownerWithPercent = {
    ...owner,
    percent: total_main
      ? +((owner.total_paid / total_main) * 100).toFixed(2)
      : 0,
  };
  return {
    users: usersWithPercent,
    owner: ownerWithPercent,
    total_main,
  };
};
