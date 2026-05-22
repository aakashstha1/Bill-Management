import {
  createUserService,
  getAllUsers,
  getUserById,
  toogleStatusService,
  updateUserService,
} from "./user.service.js";
import { validateCreateUser, validateUpdateUser } from "./user.validation.js";

// ---------------------------------------- Create User -------------------------------------------
export const createUser = async (req, res, next) => {
  try {
    validateCreateUser(req.body);
    const user = await createUserService(req.body);
    res
      .status(201)
      .json({ success: true, message: "User created successfully!", user });
  } catch (error) {
    next(error);
  }
};

// ------------------------------------------------ Update User -------------------------------------------
export const updateUser = async (req, res, next) => {
  try {
    validateUpdateUser(req.body);
    const user = await updateUserService(req.params.id, req.body);
    res
      .status(200)
      .json({ success: true, message: "User updated successfully!", user });
  } catch (error) {
    next(error);
  }
};

// --------------------------------------------- Toogle status --------------------------------------------
export const toogleStatus = async (req, res, next) => {
  try {
    const userStatus = await toogleStatusService(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Status updated!", userStatus });
  } catch (error) {
    next(error);
  }
};

// --------------------------------------------------- Get All users -------------------------------------------
export const getUsers = async (req, res, next) => {
  try {
    const status =
      req.query.status !== undefined ? req.query.status === "true" : undefined;

    const users = await getAllUsers(status);

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// --------------------------------------------------- Get User By ID -------------------------------------------
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).json({ success: true, message: "User found!", user });
  } catch (error) {
    next(error);
  }
};
