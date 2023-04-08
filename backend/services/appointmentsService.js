import asyncHandler from "express-async-handler";
import Appointment from "../models/appointmentsModel.js";
import {
  isNameInputValid,
  isEmailValid,
  isPhoneNumberValid,
  isObjectIDValid,
  isDateValid,
  isTimeValid,
} from "../utils/validators/validateFormInputs.js";
import {
  InputValidationError,
  ResourceRetrievalError,
} from "../utils/customErrors/generalErrors.js";
import { isAppointmentInputValid } from "../utils/validators/validateFormInputs.js";
// import sendEmail from "../utils/sendEmail/sendEmail.js";
import * as dotenv from "dotenv";
dotenv.config();
import { generateApptTimes } from "../utils/generators/availableTimesGenerator.js";

const createAppointment = asyncHandler(
  async ({ fname, lname, email, phone, service, date, time }) => {
    isAppointmentInputValid({
      fname,
      lname,
      email,
      phone,
      service,
      date,
      time,
    });

    try {
      const newAppointment = await Appointment.create({
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        service: service,
        date: date,
        time: time,
      });
      //   sendEmail("quonn.bernard@gmail.com", "Appointment", "bkbzabaxedadsrjv");
      return newAppointment;
    } catch (error) {
      throw new Error("Bad email");
    }
  }
);

const getAllAppointments = asyncHandler(async () => {
  return await Appointment.find();
});

const updateAppointment = asyncHandler(
  async (id, { name, email, phone, service, date, time }) => {
    switch (false) {
      case isNameInputValid(name):
        throw new InputValidationError(`Invalid input: name`);
      case isEmailValid(email):
        throw new InputValidationError(`Invalid input: email`);
      case isPhoneNumberValid(phone):
        throw new InputValidationError(`Invalid input: phone number`);
      // case await isObjectIDValid(service):
      //   throw new InputValidationError(`Invalid input: service id`);
      case isDateValid(date):
        throw new InputValidationError(`Invalid input: date`);
      case isTimeValid(time):
        throw new InputValidationError(`Invalid input: time`);
    }

    return await Appointment.findByIdAndUpdate(
      { _id: id },
      { name, email, phone, service, date, time },
      { new: true }
    );
  }
);

const getAvailableTimes = asyncHandler(async (date) => {
  console.log(date)
  const times = generateApptTimes(1000, 1600, 30)
  const appointments = await Appointment.find({ date: date });
  let availableTimes;
  const excludedTimes = appointments.map((appt) => {
    return appt.time;
  });
  if (appointments.length === 0) {
    return times;
  } else {
    availableTimes = times.filter(
      (time) => !excludedTimes.some((extime) => time === extime)
    );
    return availableTimes;
  }
});

const deleteAppointment = asyncHandler(async (appointment) => {
  return await appointment.remove();
});

const getUnavailableDates = asyncHandler(async (month) => {
  console.log(month)
  const appointments = await Appointment.find({ slug: slug });
})

export {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  getAvailableTimes,
  getUnavailableDates
};
