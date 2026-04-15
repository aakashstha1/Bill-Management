import Joi from "joi";
import AppError from "../../utils/AppError.js";

// CREATE
const billSchema = Joi.object({
  createdBy: Joi.string().length(24).hex().required(),

  units: Joi.number().min(0).required(),

  total_amount: Joi.number().min(0).required(),

  paid_amount: Joi.number().min(0).required(),

  final_amount: Joi.number().min(0).required(),

  discount: Joi.number().min(0).optional(),

  service_charge: Joi.number().min(0).optional(),

  month: Joi.string()
    .valid(
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
    )
    .required(),

  year: Joi.number().required(),

  paid_date: Joi.date().required(),

  bill_type: Joi.string().valid("electricity", "water").required(),
});

//Update
const billUpdateSchema = Joi.object({
  createdBy: Joi.string().length(24).hex(),

  units: Joi.number().min(0),

  total_amount: Joi.number().min(0),

  paid_amount: Joi.number().min(0),

  final_amount: Joi.number().min(0),

  discount: Joi.number().min(0),

  service_charge: Joi.number().min(0),

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

  year: Joi.number(),

  paid_date: Joi.date(),

  bill_type: Joi.string().valid("electricity", "water"),
}).min(1);


// ------------------------------------------------- Validate Bill Creation ---------------------------------
export const validateCreateBill = (data) => {
  const { error } = billSchema.validate(data);

  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  return true;
};

// ------------------------------------------------- Validate Bill Update ---------------------------------
export const validateUpdateBill = (data) => {
  const { error } = billUpdateSchema.validate(data);

  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  return true;
};
