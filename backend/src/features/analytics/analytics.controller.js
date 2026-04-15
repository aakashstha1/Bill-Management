import {
  getActiveUsersPaidAnalyticsService,
  getAllTimePaidAnalyticsService,
  getOwnerPaidAnalyticsService,
  getPaidAnalyticsService,
} from "./analytics.service.js";
import { validateAnalyticsQuery } from "./analytics.validation.js";

//---------------------------------- Get Paid Total year/month ------------------------------------------------
export const getPaidAnalytics = async (req, res, next) => {
  try {
    validateAnalyticsQuery(req.query);
    const year = req.query.year ? Number(req.query.year) : undefined;
    const month = req.query.month;

    const data = await getPaidAnalyticsService(year, month);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

//---------------------------------- Get All Time Paid Total ------------------------------------------------
export const getAllTimePaidAnalytics = async (req, res, next) => {
  try {
    const data = await getAllTimePaidAnalyticsService();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

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

//---------------------------------- Get Owner Paid Total ------------------------------------------------
export const getOwnerPaidAnalytics = async (req, res, next) => {
  try {
    validateAnalyticsQuery(req.query);

    const year = req.query.year ? Number(req.query.year) : undefined;
    const month = req.query.month;

    const data = await getOwnerPaidAnalyticsService(year, month);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
