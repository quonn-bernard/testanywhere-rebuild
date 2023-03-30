import asyncHandler from "express-async-handler";
import {
  createUserService,
  loginUserService,
  deleteUserService,
  handlePWResetRequestService,
  updateUserPasswordService,
} from "../services/userService.js";
import * as dotenv from "dotenv";
dotenv.config();

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name);
  try {
    const user = await createUserService({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginUserService({ email, password });
    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    await deleteUserService(id);
    res.status(200).json({ message: `${id} deleted successfully!` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const handlePWResetRequest = asyncHandler(async (req, res) => {
  try {
    await handlePWResetRequestService(req.body.email);
    res
      .status(200)
      .json({ message: `password reset link sent to ${req.body.email}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateUserPassword = asyncHandler(async (req, res) => {
  try {
    const user = await updateUserPasswordService(
      req.params.requestId,
      req.body.password
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  registerUser,
  loginUser,
  deleteUser,
  handlePWResetRequest,
  updateUserPassword,
};
