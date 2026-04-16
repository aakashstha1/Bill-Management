import { validateAnalyticsQuery } from "../shared/analytics.utils.js";
import { getActiveUsersPaidAnalyticsService } from "./users.service.js";

//---------------------------------- Get Active Users Paid Total ------------------------------------------------
export const getActiveUsersPaidAnalytics = async (req, res, next) => {
  try {
    validateAnalyticsQuery(req.query);

    const year = req.query.year ? Number(req.query.year) : undefined;
    const month = req.query.month;

    const data = await getActiveUsersPaidAnalyticsService(year, month);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};