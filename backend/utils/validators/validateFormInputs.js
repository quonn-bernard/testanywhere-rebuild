import asyncHandler from "express-async-handler";
import emailValidator from "email-validator";
import PasswordValidator from "password-validator";
import passwordvalidator from "password-validator";
const pwSchema = new passwordvalidator();

//requires 'fname lname' format
export const isNameInputValid = (flName) => {
  const regexName = new RegExp(/^[a-zA-Z]+ [a-zA-Z]+$/);
  return regexName.test(flName);
};

export const isEmailValid = (email) => {
  return emailValidator.validate(email);
};

// Must follow 222-055-9034, 321.789.4512 or 123 256 4587 formats
export const isPhoneNumberValid = (phone) => {
  const regexPhone = new RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  );
  return regexPhone.test(phone);
};

export const isObjectIDValid = asyncHandler(async (id) => {
  const regexObjectId = new RegExp(/^[a-fA-F0-9]{24}$/);
  if (!regexObjectId.test(id)) return false;

  return true;
});

//requires mm-dd-yyyy format
export const isDateValid = (date) => {
  const regexDate = new RegExp(
    /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/
  );
  return regexDate.test(date);
};

//requires hh:mm format
export const isTimeValid = (time) => {
  const regexTime = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);
  return regexTime.test(time);
};

export const isPasswordValid = (password) => {
  const passwordValidationSchema = pwSchema
    .is()
    .min(8)
    .is()
    .max(20)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(1)
    .has()
    .not()
    .spaces();
  return passwordValidationSchema.validate(password);
};
