import userBill from "../../../models/userBill.model.js";
import { getCurrentBsYear } from "../shared/nepaliDate.js";
//-------------------------------------------- Get Active Users Paid Total ------------------------------------------------
export const getActiveUsersPaidAnalyticsService = async (year, month) => {
  const currentYear = getCurrentBsYear();

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
        ele_amount: { $sum: "$ele_amount" },
        water_amount: { $sum: "$water_amount" },
        room_amount: { $sum: "$room_amount" },
        total_paid: { $sum: "$final_amount" },
      },
    },

    // 5. clean output
    {
      $project: {
        _id: 0,
        userId: "$_id",
        name: 1,
        ele_amount: 1,
        water_amount: 1,
        room_amount: 1,
        total_paid: 1,
      },
    },
  ]);

  return result;
};
