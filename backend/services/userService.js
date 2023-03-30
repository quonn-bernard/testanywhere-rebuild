import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModels.js";
import PWReset from "../models/PWReset.js";
import tokenGenerator from "../utils/generators/tokenGenerator.js";
import crypto from "crypto";
import * as dotenv from "dotenv";
dotenv.config();
import { ResourceCreationError } from "../utils/customErrors/generalErrors.js";
import {
  isEmailValid,
  isPasswordValid,
  isNameInputValid,
} from "../utils/validators/validateFormInputs.js";
import {
  InputValidationError,
  ResourceDeletionError,
} from "../utils/customErrors/generalErrors.js";
import { hashedPWGenerator } from "../utils/generators/hashedPasswordGenerator.js";
import {
  ExpiredPasswordResetRequestException,
  InvalidCredentialsError,
  PasswordResetRequestException,
  PasswordResetException,
  DuplicateEmailRegistrationException,
} from "../utils/customErrors/userErrors.js";

const createUserService = asyncHandler(async ({ name, email, password }) => {
  const existingUser = await User.find({ email: email });
  if (existingUser.length !== 0)
    throw new DuplicateEmailRegistrationException(
      `Unique email required for registration!`
    );

  switch (false) {
    case isNameInputValid(name):
      throw new InputValidationError(`Invalid Input: name`);
    case isEmailValid(email):
      throw new InputValidationError(`Invalid Input: email`);
    case isPasswordValid(password):
      throw new InputValidationError(`Invalid input: (password) - must include 8 chars, be less than 20 chars, contain atleast 1 uppercase letter, 1 number, and cannot contain any spaces`);
  }

  try {
    const newUser = await User.create({
      name,
      email,
      password,
    });
    return {
      _id: newUser.id,
      email: newUser.email,
      token: tokenGenerator(newUser.id),
    };
  } catch (error) {
    throw new ResourceCreationError("Error while creating new user!");
  }
});

const loginUserService = asyncHandler(async ({ email, password }) => {
  switch (false) {
    case isEmailValid(email):
      throw new InputValidationError(`Invalid Input: email`);
    case isPasswordValid(password):
      throw new InputValidationError(`Invalid input: password`);
  }

  const user = await User.findOne({ email: email });

  try {
    await bcrypt.compare(password, user.password);
    return {
      email,
      password,
      token: tokenGenerator(user.id),
    };
  } catch (error) {
    throw new InvalidCredentialsError(
      "Email/password combo doesn't match our records!"
    );
  }
});

const deleteUserService = asyncHandler(async (id) => {
  const user = await User.findById(id);
  try {
    return await user.remove();
  } catch (error) {
    throw new ResourceDeletionError(`Error deleting ${user}!`);
  }
});

const handlePWResetRequestService = asyncHandler(async (email) => {
  if (!isEmailValid(email))
    throw new InputValidationError(`Invalid Input: email`);
  const user = await User.findOne({ email: email });
  const requestId = crypto.randomBytes(32).toString("hex");

  try {
    return await PWReset.create({
      requestId: requestId,
      email: user.email,
    });
  } catch (error) {
    throw PasswordResetRequestException(
      "Error while handling password reset request!"
    );
  }
});

const updateUserPasswordService = asyncHandler(async (requestId, password) => {
  const existingRequest = await PWReset.findOne({ requestId: requestId });
  if (!existingRequest)
    throw new ExpiredPasswordResetRequestException(
      `Password Request has expired or doesnt exist!`
    );

  if (!isPasswordValid(password))
    throw new InputValidationError(`Invalid input: password`);
  const hashedPassword = await hashedPWGenerator(password);
  try {
    return await User.findOneAndUpdate(
      { email: existingRequest.email },
      { password: hashedPassword }
    );
  } catch (error) {
    throw new PasswordResetException("Error while updating password!");
  }
});

export {
  createUserService,
  loginUserService,
  deleteUserService,
  handlePWResetRequestService,
  updateUserPasswordService,
};
