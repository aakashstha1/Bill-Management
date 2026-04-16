import Joi from "joi";
import AppError from "../../../utils/AppError.js";

const analyticsSchema = Joi.object({
  year: Joi.number().integer().min(2000).max(2100),
  month: Joi.string().valid(
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ),
});

export const validateAnalyticsQuery = (query) => {
  const { error } = analyticsSchema.validate(query);

  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  return true;
};
