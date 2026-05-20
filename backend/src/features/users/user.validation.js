import Joi from "joi";
import AppError from "../../utils/AppError.js";

const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),

  contact: Joi.string()
    .pattern(/^(98|97)\d{8}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Contact must start with 98 or 97 and be 10 digits",
    }),
  email: Joi.string().email(),
});

const userUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  contact: Joi.string()
    .pattern(/^(98|97)\d{8}$/)
    .messages({
      "string.pattern.base":
        "Contact must start with 98 or 97 and be 10 digits",
    }),
  email: Joi.string().email().allow("").optional(),
}).min(1);

export const validateCreateUser = (data) => {
  const { error } = userSchema.validate(data);

  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  return true;
};

export const validateUpdateUser = (data) => {
  const { error } = userUpdateSchema.validate(data);

  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  return true;
};
