import Joi from "joi";
import AppError from "../../utils/AppError.js";

//Create user Bill Validation
export const userBillSchema = Joi.object({
  user: Joi.string().hex().length(24).required(),

  ele_units: Joi.number().min(0).required(),

  ele_amount: Joi.forbidden(),

  ele_rate: Joi.number().min(0).required(),

  water_amount: Joi.number().min(0).required(),

  room_amount: Joi.number().min(0).required(),

  final_amount: Joi.forbidden(),

  paid: Joi.forbidden(),

  month: Joi.string()
    .valid(
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
    )
    .required(),

  year: Joi.number().min(0).required(),
});

//Update User Bill Validation
export const userBillUpdateSchema = Joi.object({
  user: Joi.string().hex().length(24),

  ele_units: Joi.number().min(0),

  ele_amount: Joi.forbidden(),

  ele_rate: Joi.number().min(0),

  water_amount: Joi.number().min(0),

  room_amount: Joi.number().min(0),

  final_amount: Joi.forbidden(),

  paid: Joi.forbidden(),

  month: Joi.string().valid(
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
  ),
  year: Joi.number().min(0),
});

// ------------------------------------------------- Validate User Bill Creation ---------------------------------
export const validateCreateUserBill = (data) => {
  const { error } = userBillSchema.validate(data);

  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  return true;
};

// ------------------------------------------------- Validate User Bill Update ---------------------------------
export const validateUpdateUserBill = (data) => {
  const { error } = userBillUpdateSchema.validate(data);

  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  return true;
};
